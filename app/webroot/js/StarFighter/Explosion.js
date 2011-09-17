function Explosion (x, y, callBack){
	var callBack = callBack;
	var me = this;
	var x = parseInt(x);
	var y = parseInt(y);
	var height = 32;
	var width = 32;
	var animation = 0;
	var explosion = $('<div class="Explosion"></div>');
	var speed = 2;
	
	var images = {
		'0' : $('<img src="' + URL + 'Explosion1.png" width="' + width + '" height="' + height + '" />'),
		'1' : $('<img src="' + URL + 'Explosion2.png" width="' + width + '" height="' + height + '" />'),
		'2' : $('<img src="' + URL + 'Explosion3.png" width="' + width + '" height="' + height + '" />')
	};
	
	var visible = true;
	
	(function (){
		if (typeof(callBack) != "function")
			callBack = function (x,y){};

		// Caches images
		for (var index in images){
			images[index].css("display","none");
			explosion.append(images[index]);
		}

		explosion.css('position', 'absolute');
		explosion.css('left', x);
		explosion.css('top', y);
		explosion.css('width', width);
		explosion.css('height', height);
	})();
	
	this.animate = function (){
		animation++;
		for (var index in images)
			if (index == Math.floor(animation/10) % 3)
				images[index].css('display','block');
			else
				images[index].css('display','none');

		x -= speed;
		if (x < 0)
			remove();
		else if (animation > 30){
			remove();
			callBack(x,y);			
		}else
			explosion.css('left', x);
		
	};
	
	this.kill = function (){	
		remove();
	};
	
	var remove = function (){
		explosion.remove();
		explosion = null;
		visible = false;		
	};
	
	this.destroy = remove;
	
	this.isVisible = function(){
		return visible;
	};
	
	this.getType = function (){
		return 'Explosion';
	};
	
	this.getDomObject = function (){
		return explosion;
	};
		
	this.getDimensions = function (){
		return {
			'0' : new Circle ( new Point ( Math.floor(x + width/2), Math.floor(y + height)), Math.ceil(width / 2))
		};
	};
}
