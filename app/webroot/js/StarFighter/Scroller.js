/**
 *	By Emir Hasanbegovic
 */ 
function Scroller (){
	var x = 0;
	var speed = 3;
	var size = 0;
	var visible = true;
	
	this.animate = function (){
		x += speed;

		while (enemyList[size] != null && enemyList[size]['x'] <= x){
			var data = enemyList[size++];
			canvas.append(new Enemy(data['y'], data['type']));
		}
	};
	
	this.destroy = function (){
		size = 0;
		x = 0;
		visible = false;
	}; 
	
	this.getDomObject = function(){
		return null;
	};
	
	this.isVisible = function(){
		return visible;
	};
		
	this.getType = function (){
		return 'Scroller';
	};
}
