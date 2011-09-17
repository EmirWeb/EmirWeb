/**
 *	By Emir Hasanbegovic
 */ 
function Circle (center, radius){
	var center = center;
	var radius = Math.ceil(radius);
	
	var isColiding = function (shape){
		var type = shape.getType();
		
		if (type == 'Rectangle' || type == 'Triangle'){
			var points = shape.getPoints();

			for (var point in points)
				if (isColiding(points[point]))
					return true;
		}else if (type == "Circle")
			return distance(center, shape.getCenter()) <= radius + shape.getRadius();
		else if (type == "Point")
			return distance(center, shape) <= radius;
			
		return false;
	};
	
	this.intersects = isColiding;
	
	this.getRadius = function (){
		return radius;
	};
	
	this.getCenter = function () {
		return center;
	};
	
	this.getType = function (){
		return 'Circle';
	};
}