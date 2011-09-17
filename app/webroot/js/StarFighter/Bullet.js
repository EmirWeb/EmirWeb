/**
 *	By Emir Hasanbegovic
 */ 
var sides = {
	'StarFighter' : 0,
	'Enemy' : 1
};

function Bullet (x, y, xSpeed, ySpeed, type, damage, side){
	var side = side;
	var damage = damage;
	var type = type;
	var xSpeed = parseInt(xSpeed);
	var ySpeed = parseInt(ySpeed);
	var me = this;
	var isEnemy = isEnemy;
	var visible = true;
	var width = 5;
	var height = 1;
	var x = parseInt(x);
	var y = Math.floor(parseInt(y)  - height / 2);
	var bullet = $('<div class="Bullet"></div>');
	var sinCounter = Math.ceil(Math.random() * 100);

	(function (){
		if (type == 1 || type == 2)
			height = 5;
		if (xSpeed > 0)
			x += width + Math.ceil(xSpeed / 4);
		else
			x -= width + Math.ceil(xSpeed / 4);
			
		if (side == sides['StarFighter'])
			bullet.css("background-color", "#AAFF11");
		else
			bullet.css("background-color", "#f11226");
			
		bullet.css("width", width);
		bullet.css("height", height);
		bullet.css("top", y);
		bullet.css("left", x);
	})();

	this.animate = function (){

		x += xSpeed;
		y += ySpeed;
	
		if (x < 0 || x > canvas.getWidth()){
			remove();
			return;
		}
		if (y < 0 || y > canvas.getHeight()){
			remove();
			return;
		}
		if (type == 0 || type == 2 ){
			bullet.css("top", y);
		}else if (type == 1 ){
			sinCounter = (sinCounter + 1) % 100; 
			bullet.css("top", y + 20 * Math.sin(sinCounter));
		}

		bullet.css("left",x);
		
	};
	
	this.isVisible = function(){
		return visible;
	};				
	
	this.getDomObject = function (){
		return bullet;
	};
	
	this.getType = function (){
		return 'Bullet';
	};

    var remove = function (){
		bullet.remove();
		visible = false;	
	};

	this.kill = remove;
	
	this.destroy = remove;
	
	
	
	this.getDimensions = function (){
		return {                      
			'0' : new Rectangle (y, y + height, x, x + width)
		};
	};
	
	this.getDamage = function (){
		return damage;
	};
	
	this.getSide = function (){
		return side;
	};						
};