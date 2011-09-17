/**
 *	By Emir Hasanbegovic
 */ 
function Rectangle (top, bottom, left, right){
	var me = this;
	var top = top;
	var bottom = bottom;
	var right = right;
	var left = left;
	
	var topLeft = new Point (left, top);
	var topRight = new Point (right, top);
	var bottomLeft = new Point (left, bottom);
	var bottomRight = new Point (right, bottom);
	
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
			var x = shape.getX();
			var y = shape.getY();

			return left <= x && right >= x && top <= y && bottom >= y;		
		}
		
		return false;	
	};
	
	this.intersects = isColiding;
	
	this.getType = function (){
		return 'Rectangle';
	};
	var getPoints = function (){
		return {
			'0' : topLeft,
			'1' : topRight,
			'2' : bottomLeft,
			'3' : bottomRight
		};
	};
	this.getPoints = getPoints;
	
	this.getTop = function (){
		return top;
	};
	
	this.getBottom = function (){
		return bottom;
	};
	
	this.getLeft = function (){
		return left;
	};
	
	this.getRight = function (){
		return right;
	};
}
