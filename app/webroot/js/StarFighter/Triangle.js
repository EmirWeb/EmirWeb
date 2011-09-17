/**
 *	By Emir Hasanbegovic
 */ 
function Triangle (point1, point2, point3){
	var me = this;
	var point1 = point1;
	var point2 = point2;
	var point3 = point3;
	
	var isColiding = function (shape){
		var type = shape.getType();
		
		if (type != "Point"){
			var points = getPoints();
			
			for (var point in points)
				if (shape.intersects(points[point]))
					return true;
		}
				
		if (type == "Rectangle" || type == "Triangle"){
			var points = shape.getPoints();
			
			for (var point in points)
				if (isColiding(points[point]))
					return true;
		} else if (type == "Cricle")  
			return shape.intersects(me);
		else if (type == "Point"){
			var points = getPoints();
			
			for (var origin in points){
				var o = parseInt(origin); 
				var pointA = (o + 1) % 3;
				var pointB = (o + 2) % 3;
				 
				var a1 = points[o].getX() - points[pointA].getX();
				var a2 = points[o].getY() - points[pointA].getY(); 			
				var a = new Vector(a1, a2, 0);
				
				var b1 = points[o].getX() - points[pointB].getX();
				var b2 = points[o].getY() - points[pointB].getY(); 			
				var b = new Vector(b1, b2, 0);
				
				var c1 = points[o].getX() - shape.getX();
				var c2 = points[o].getY() - shape.getY(); 			
				var c = new Vector(c1, c2, 0);
				
				var directionAB = getNormalDirection(a,b);
				var directionAC = getNormalDirection(a,c);

				if (directionAC != directionAB)
					return false;										
			}
			
			return true;
		}
		
		return false;	
	};
	
	this.intersects = isColiding;
		
	this.getType = function (){
		return 'Triangle';
	};
	var getPoints = function (){
		return {
			'0' : point1,
			'1' : point2,
			'2' : point3
		};
	};
	this.getPoints = getPoints; 
}
