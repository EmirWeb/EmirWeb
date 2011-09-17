function cross (u, v){
	var u1 = u.getX();
	var u2 = u.getY();
	var u3 = u.getZ();
	var v1 = v.getX();
	var v2 = v.getY();
	var v3 = v.getZ();
			 
	return new Vector (u2 * v3 - u3 * v2, u3 * v1 - u1 * v3, u1 * v2 - u2 * v1);
}

function getNormalDirection (u, v){
	var u1 = u.getX();
	var u2 = u.getY();
	var v1 = v.getX();
	var v2 = v.getY();
	
	return u1 * v2 - u2 * v1 >= 0;
}

function Vector (x, y, z){
	var x = x;
	var y = y;
	var z = 0;
	
	this.getType = function (){
		return 'Vector';
	};
	
	this.getX = function (){
		return x;
	};
	
	this.getY = function (){
		return y;
	};

   	this.getZ = function (){
		return z;
	};
	
	this.toString = function (){
		return "\nVector:\n \tx: " +  x + " y: " + y + " z: " + z;
	};

}


