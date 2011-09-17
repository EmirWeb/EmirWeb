/**
 *	By Emir Hasanbegovic
 */ 
function StarFighter (){
	var score = 0;
	var damage = 15;
	var visible = true;
	var fireDelay = 150;
	var width = 64;
	var height = 64;
	var x = 0;
	var y = Math.floor((canvas.getHeight() - height) / 2);
	var speed = 3;							
	var fighter = $('<div class="StarFighter"></div>');
	var image = $('<img class="StarFighter" width="' + width + 'px" height="' + height + 'px" src="' + URL + 'StarFighter.png" />');
	var firing = false;
	var bullets = {};
	var size = 0;
	var fireType = 0;
	var maxHealth = 25;
	var health = maxHealth;
	var side = 0;								
	
	var keys = {
		13: false,
		37: false,
		38: false,
		39: false,
		40: false
	};

	var fire = function(){
		if (firing)
			return;
		firing = true;

		if (fireType == 0){				
			bullets[size] = new Bullet(x + width, Math.floor(y + height / 2), speed * 3, 0, 0, damage, side);		 
			canvas.append(bullets[size++]);
		}else if (fireType == 1){
			bullets[size] = new Bullet(x + width, Math.floor(y + height / 2) + 3, speed * 3, 0, 0, damage,side);
			canvas.append(bullets[size++]);
			bullets[size] = new Bullet(x + width, Math.floor(y + height / 2) - 3, speed * 3, 0, 0, damage, side);		 
			canvas.append(bullets[size++]);					
		}else if (fireType == 2){
			bullets[size] = new Bullet(x + width, Math.floor(y + height / 2), speed * 3, -5, 0, damage, side);		 
			canvas.append(bullets[size++]);                                                   
			bullets[size] = new Bullet(x + width, Math.floor(y + height / 2), speed * 3, 5, 0, damage, side);		 
			canvas.append(bullets[size++]);		
		}else if (fireType == 3){
			bullets[size] = new Bullet(x + width, Math.floor(y + height / 2), speed * 3, -5, 0, damage, side);		 
			canvas.append(bullets[size++]);
			bullets[size] = new Bullet(x + width, Math.floor(y + height / 2), speed * 3, 0, 0, damage, side);		 
			canvas.append(bullets[size++]);
			bullets[size] = new Bullet(x + width, Math.floor(y + height / 2), speed * 3, 5, 0, damage, side);		 
			canvas.append(bullets[size++]);		
		}else if (fireType == 4){
			bullets[size] = new Bullet(x + width, Math.floor(y + height / 2), speed * 3, -5, 0, damage, side);		 
			canvas.append(bullets[size++]);
            bullets[size] = new Bullet(x + width, Math.floor(y + height / 2) + 3, speed * 3, 0, 0, damage, side);		 
			canvas.append(bullets[size++]);
			bullets[size] = new Bullet(x + width, Math.floor(y + height / 2) - 3, speed * 3, 0, 0, damage, side);		 
			canvas.append(bullets[size++]);
			bullets[size] = new Bullet(x + width, Math.floor(y + height / 2), speed * 3, 5, 0, damage, side);		 
			canvas.append(bullets[size++]);		
		}else if (fireType == 5){
			bullets[size] = new Bullet(x + width, Math.floor(y + height / 2), speed * 3, -5, 1, damage, side);		 
			canvas.append(bullets[size++]);
            bullets[size] = new Bullet(x + width, Math.floor(y + height / 2) + 3, speed * 3, 0, 1, damage, side);		 
			canvas.append(bullets[size++]);
			bullets[size] = new Bullet(x + width, Math.floor(y + height / 2) - 3, speed * 3, 0, 1, damage, side);		 
			canvas.append(bullets[size++]);
			bullets[size] = new Bullet(x + width, Math.floor(y + height / 2), speed * 3, 5, 1, damage, side);		 
			canvas.append(bullets[size++]);		
		}
		
								
		setTimeout(
			function (){
				firing = false;
			},
			fireDelay
		);						
	};
	
	var keyHandler = function (){	
		if (keys[13]) // enter
			fire();
		if (keys[37]) // left
			x = Math.max(0,x - speed);
		if (keys[38]) // up
			y = Math.max(0,y - speed); 
		if (keys[39]) // right
			x = Math.min(canvas.getWidth() - width, x + speed);
		if (keys[40]) // down
			y = Math.min(canvas.getHeight() - height, y + speed);
	};				

	(function (){
		fighter.append(image);
		fighter.css('left',x);
		fighter.css('top',y);
		
		$(document).keydown(function(event) {
			keys[event.keyCode] = true;
		});

		$(document).keyup(function(event) {
			keys[event.keyCode] = false;
		});								
	})();
	
	this.animate = function(){
		for (var index in bullets)
			if (!bullets[index].isVisible())
				delete bullets[index];
		keyHandler();
		fighter.css('top',y);
		fighter.css('left',x);
	};				
	
	this.getDomObject = function () {
		return fighter;
	};
	
	this.isVisible = function (){
		return visible;
	};
	
	this.getType = function (){
		return 'StarFighter';
	};
	
	var kill = function (){
		fighter.remove();
		visible = false;
		canvas.append( 
			new Explosion(
				x + Math.floor(width / 2) - 16,
				y + Math.floor(height / 2) - 16, 
				function () { 	
					new TitleScreen();
	 			}
	 		)
		);
	};
	
	this.kill = kill; 
	
	this.getDimensions = function (){ 
		return {                      
			'0' : new Rectangle (y, y + height, x, x + width /3),
			'1' : new Triangle (new Point(x + width / 3, y), new Point(x + width, y + height /2), new Point(x + width/3, y + height))
		};
	};
	
	this.getBullets = function (){
		return bullets;
	};
	
	this.setPowerUp = function (powerUp){
		if (powerUp.getPowerUpType() == 'Speed')
			speed = Math.min(speed + 1, 10);
		else if (powerUp.getPowerUpType() == 'Bomb'){
			var enemies = canvas.getObjects('Enemy');
			for (var index in enemies)
				enemies[index].kill();
		}
		else if (powerUp.getPowerUpType() == 'Fire')
			fireType = (fireType + 1) % 6;
	};
	
	this.damage = function (damage){
		health -= damage;
		if (health <= 0)
			kill();
	};
	
	this.getSide = function (){
		return side;
	};
	
	this.addScore = function (points){
		score += points;
	};
	
	this.getScore = function (){
		return score;
	};
	
	this.getHealthAsPercentage = function (){
		return Math.floor( (health/parseFloat(maxHealth)) * 100);
	};	

};