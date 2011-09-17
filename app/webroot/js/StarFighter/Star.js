/**
 *	By Emir Hasanbegovic
 */ 
function Stars (canvas){
	var canvas = canvas;
	
	(function (){
		var i = 0;
		while (i++ < 50)
			canvas.append(new Star());
	})();	

	function Star (){
		var maxSpeed = 25;
		var x = Math.floor(Math.random() * canvas.getWidth());
		var y;
		var speed;
		var star = $('<div class="Star"></div>');
		var visible = true;	 
		
		var newY = function (){ 
			return Math.floor(Math.random() * canvas.getHeight()); 
		};
		
		var newSpeed = function (){
			if (speed >  maxSpeed * 2 / 3){
				star.css('width', 3);
				star.css('height', 3);
			}else if (speed > maxSpeed /3){
				star.css('width', 2);
				star.css('height', 2);
			}else{
				star.css('width', 1);
				star.css('height', 1);
			}	
			return Math.ceil(Math.random() * maxSpeed);
		};					
		
		(function  () {
			y = newY();
			speed = newSpeed ();	
			star.css('top', y);
			star.css('left', x);	
		})();										
							
		this.animate = function (){
			x -= speed;
			if (x < 0){
				x = canvas.getWidth();
				y = newY();
				speed = newSpeed();
				star.css('top', y);
			}
			star.css('left', x);
		};
		
		this.getDomObject = function () {
			return star;
		};
			
		this.isVisible = function (){
			return visible;
		};				
		
		this.getType = function (){
			return 'Star';
		};
		
		this.destroy = function (){
			star.remove();
			star = null;
			visible = false; 
		};
	}
}