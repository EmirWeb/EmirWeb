/**
 *	By Emir Hasanbegovic
 */ 
var enemies = {
	'0' : {
		'width': 40,
		'height': 29,
		'type': 'Basic',
		'speed': 2,
		'health': 10,
		'damage': 5,
		'points': 5
	},
	'1' : {
		'width': 64,
		'height': 15,
		'type': '2',
		'speed': 4,
		'health': 20,
		'damage': 10,
		'points': 10
	},
	'2' : {
		'width': 64,
		'height': 15,
		'type': '2',
		'speed': 5,
		'health': 30,
		'damage': 15,
		'points': 20
	}		
};
function Enemy (y, type){

	var getTimeout = function (){
		return Math.floor(Math.random() * 5000) + 1000;
	};
 	
	
 	var side = 1;
	var firingTimeout = getTimeout();
	var data = enemies[type];
	var maxHealth = data['health'];
	var health = maxHealth;	
	var width = data['width'];
	var points = data['points'];
	var damage = data['damage'];
	var height = data['height'];
	var x = canvas.getWidth();
	var y = parseInt(y);
	var type = data['type'];
	var speed = data['speed'];
	var visible = true;
	var enemy = $('<div class="Enemy"></div>');
	var image = $('<img src="' + URL + 'Enemy' + type + '.png" width="' + width + 'px" height="' + height + 'px" />');
	
	var fire = function (){
		if (!visible)
			return;
		firingTimeout = getTimeout();
		
		var starFighter = canvas.getObject('StarFighter');
		
		if (starFighter == null)			
			return;
		
		var xTarget;
		var yTarget;	
		var starFighterDimensions = starFighter.getDimensions();
		for (var shape in starFighterDimensions){
			var rectangle = starFighterDimensions[shape];
			var type = rectangle.getType();
			if (type == "Rectangle"){
				xTarget = (rectangle.getLeft() + rectangle.getRight()) / 2;
				yTarget = (rectangle.getTop() + rectangle.getBottom()) / 2;
			}			
		}
		
		var xSource = x;
		var ySource = y + Math.ceil(height/2);
		var rise = ySource - yTarget;
		var run = xSource - xTarget;
		var bulletSpeed =  Math.floor(- 1.5 * speed);
		var slope = 0;
		
		if (run != 0 && Math.abs(rise/run) < .75)
			slope = Math.ceil(bulletSpeed * rise/run);
		
		canvas.append(new Bullet (x, y + Math.floor(width /2), bulletSpeed, slope, 2, damage, side));
	
		setTimeout(fire,firingTimeout);
	};
	
	(function (){
		setTimeout(fire,firingTimeout);
		enemy.append(image);
		enemy.css("height", height);
		enemy.css("width", width);
		enemy.css("left", x);
		enemy.css("top", y);
	})();
	
	this.getBullets = function (){
		return {};
	};
	
	this.animate = function (){
		x -= speed;
		if (x < 0){
			visible = false;
			enemy.remove();
			return;
		}
		enemy.css("left", x);
	};
	
	this.getDomObject = function (){
		return enemy;
	};
	
	this.isVisible = function (){
		return visible;
	};
	
	this.getType = function (){
		return 'Enemy';		
	};

	var remove = function (){
		enemy.remove();
		visible = false;	
	};

	var kill  = function (){
		remove();
		var starFighter = canvas.getObject('StarFighter');
		
		if (starFighter != null)
			starFighter.addScore(points);
			
		canvas.append(
			new Explosion(
				x,
				y, 
				function (x,y) { 	
					var powerUpRate = 6;
					if (Math.floor(Math.random() * powerUpRate) == 0)
						canvas.append(new PowerUp(x,y));
	 			}
	 		)
		);
 		
	};
	
	this.kill = kill;
	 
	this.destroy = remove;
	
	this.getDimensions = function (){
		return {                     
			'0' : new Rectangle (y, y + height, x, x + width)
		};
	};
	
	this.damage = function (damage){
		health -= damage;
		if (health <= 0 )
			kill();
	};
	
	this.getSide = function (){
		return side;
	};
			
}