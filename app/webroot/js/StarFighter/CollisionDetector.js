/**
 *	By Emir Hasanbegovic
 */ 
function CollisionDetector (canvasWidth, canvasHeight) {
	var gridFactor = 20;
	var height = Math.ceil(canvasHeight / gridFactor); 
	var width = Math.ceil(canvasWidth / gridFactor);
	
	var grid;
	
	this.handleCollisions = function (objects){
		grid = {};	
		
		for (var object in objects){
			var shapes = {};
			var objectType = objects[object].getType(); 
			if (objectType == "StarFighter" || objectType == "Enemy" || objectType == "Bullet" || objectType == "PowerUp")
				shapes = objects[object].getDimensions();
			
			for (var shape in shapes){
				var type = shapes[shape].getType();
				if (type == "Rectangle"){
					var rectangle = shapes[shape];
					var top = Math.floor(rectangle.getTop() / gridFactor);
					var bottom = Math.floor(rectangle.getBottom() / gridFactor);
					var left = Math.floor(rectangle.getLeft() / gridFactor);
					var right = Math.floor(rectangle.getRight() / gridFactor);
					
					var x;
					var y;
					
					for (x = Math.max(0,left); x <= Math.min(width, right); x++)
						for (y = Math.max(0,top); y <= Math.min(height, bottom); y++)
							setGrid(x,y,object,objects[object]);
						
				}else if (type == "Triangle"){
					var triangle = shapes[shape];
					var points = triangle.getPoints();
					var smallestX = canvas.getWidth();
					var largestX = 0;
					var smallestY = canvas.getHeight();
					var largestY = 0;
					for (var point in points){
						smallestX = Math.min(points[point].getX(), smallestX);
						largestX = Math.max(points[point].getX(), largestX);
						smallestY = Math.min(points[point].getY(), smallestY);
						largestY = Math.max(points[point].getY(), largestY);
					}
					
					smallestX = Math.max(0, Math.floor(smallestX / gridFactor));
					largestX = Math.min(Math.floor(largestX / gridFactor), width);
					smallestY = Math.max(0, Math.floor(smallestY / gridFactor));
					largestY = Math.min(Math.floor(largestY / gridFactor), height);
					
					
					var x;
					var y;
					
					for (x = smallestX; x <= largestX; x++)
						for (y = smallestY; y <= largestY; y++)
							setGrid(x,y,object,objects[object]);
				}else if (type == "Circle"){
					var circle = shapes[shape];
					var center = circle.getCenter();
					var centerX = center.getX();
					var centerY = center.getY();
					var radius = circle.getRadius();
					var top = Math.floor((centerY - radius) / gridFactor);
					var bottom = Math.floor((centerY + radius) / gridFactor);
					var left = Math.floor((centerX - radius) / gridFactor);
					var right = Math.floor((centerX + radius) / gridFactor);
					var x;
					var y;

					for (x = Math.max(0,left); x < Math.min(width, right); x++)
						for (y = Math.max(0,top); y < Math.min(height, bottom); y++)  
							if (circle.intersects(new Rectangle(top * gridFactor, bottom * gridFactor, left * gridFactor, right * gridFactor)))
								setGrid(x,y,object,objects[object]);
				}
			}
		}
	
		for (var x in grid)
			for (var y in grid[x])
				colide (grid[x][y]);
	};
	
	var setGrid = function (x, y, key, value){
		if (x < 0 || y < 0 || x > width || y > height)
			return;

		if (typeof(grid[x]) == 'undefined'){
			grid[x] = {};
			grid[x][y] = {};
		}else if (typeof(grid[x][y]) == 'undefined'){
			grid[x][y] = {};
		}
		
		grid[x][y][key] = value;
		
	};
	
	var colide = function (objects){
		var starFighter = getObject(objects, 'StarFighter');
		var enemies = getObjects(objects, 'Enemy');
		var bullets = getObjects(objects, 'Bullet');
		var powerUps = getObjects(objects, 'PowerUp');
			

		for (var index in enemies){
			var enemy = enemies[index];
			
			if (starFighter != null && isColiding(enemy, starFighter)){				
				starFighter.kill();
				enemy.kill();
			}
			
			for (var bullet in bullets)
				if (bullets[bullet].getSide() == sides['StarFighter'] && isColiding(bullets[bullet], enemy)){
					enemy.damage(bullets[bullet].getDamage());
					bullets[bullet].kill();
				}
		}
		
		if (starFighter == null)
			return;
			
		for (var index in bullets){
			var bullet = bullets[index];
			if (bullet.getSide() == sides['Enemy'] && isColiding(bullet, starFighter)){
				starFighter.damage(bullet.getDamage());
				bullet.kill();
			}
		} 
		
		for (var index in powerUps){
			var powerUp = powerUps[index];
			if (isColiding(powerUp, starFighter)){
				starFighter.setPowerUp(powerUp);
				powerUp.kill();
			}
		}
	};
	
	var isColiding = function(object1, object2){
		if (!object1.isVisible() || !object2.isVisible())
			return false;
		var dim1 = object1.getDimensions();
		var dim2 = object2.getDimensions();
		
		for (var o1 in dim1)
			for (var o2 in dim2)
				if (dim1[o1].intersects(dim2[o2]) || dim2[o2].intersects(dim1[o1]))
					return true;

		return false;
	};
	
	var getObject = function (objects, type){		
		for (var index in objects)
			if (objects[index].getType() == type)
				return objects[index];
	
		return null;
	}; 
		
	var getObjects = function (objects, type){
		var ret = {};		
		for (var index in objects)
			if (objects[index].getType() == type || typeof(type) =='undefined')
				ret[index] = objects[index];
	
		return ret;
	};
	
}

