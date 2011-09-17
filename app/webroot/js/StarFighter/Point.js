/**
 *	By Emir Hasanbegovic
 */ 
function distance (point1, point2){
	var x1 = point1.getX();
	var y1 = point1.getY();
	
	var x2 = point1.getX();
	var y2 = point1.getY();	
	
	var x = (x1 - x2);
	var y = (y1 - y1);

	return x * x + y * y; 
}

function Point (x, y) {
	var x = Math.floor(x);
	var y = Math.floor(y);
	
	this.getX = function (){
		return x;
	};

	this.getY = function (){
		return y;
	};
	
	this.getType = function (){
		return 'Point';
	};	
};
