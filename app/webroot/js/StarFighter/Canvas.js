/**
 *	By Emir Hasanbegovic
 */ 
var RESOLUTION_WIDTH = 800;
var RESOLUTION_HEIGHT = 500;
function Canvas (width, height){	
	var width = parseInt(width);
	var height = parseInt(height);	
	var objects = {};
	var size = 0;
	var canvas = $('<div class="Canvas"></div>');
	var desiredFps = 60;
	var fps = 0;
	var fpsDisplay = $('<div class="Fps"></div>');
	var collisionDetector = new CollisionDetector(width, height);
	var me = this;
	var date = new Date(); 
	  
	var displayFps = function (){
		fpsDisplay.html('FPS: ' + fps);
		fps = 0;
		setTimeout(displayFps, 1000);
	};
	
	var animate = function (){
		var startTime = date.getTime();
	
		for (var index in objects){
			if (objects[index].isVisible())
				objects[index].animate();
			else
				delete objects[index];
		}

		collisionDetector.handleCollisions(objects);

		fps++;
		var endTime = date.getTime();
		var elapsedTime = endTime - startTime;
		var delayTime = Math.max(0, 1000/desiredFps - elapsedTime);
		
		setTimeout(animate, delayTime);
	};								
	
	(function (){
		canvas.css('width',width);
		canvas.css('height',height);				
		$('body').append(canvas);
		$('body').append(fpsDisplay);
		animate();
		
		if (navigator.appName == "Microsoft Internet Explorer")
			desiredFps = desiredFps * 2;
			
		displayFps();
	})();
	
	this.getCanvas = function(){
		return canvas;
	};
	
	this.getWidth = function (){
		return width;
	};
	
	this.getHeight = function (){
		return height;
	};
	
	this.setWidth = function (value){
		width = value;
	};
	
	this.setHeight= function (value){
		height = value;
	};
	
	this.append = function (object){
		objects[size] = object;
		canvas.append(object.getDomObject());
		return size++;
	};
	
	this.setTitleBar = function (object){
		objects[size] = object;
		$('body').prepend(object.getDomObject);
		return size++;
	};

	this.getType = function (){
		return 'Canvas';
	};

	this.getObject = function (type){		
		for (var index in objects)
			if (objects[index].getType() == type)
				return objects[index];
	
		return null;
	}; 
		
	this.getObjects = function (type){
		var ret = {};		
		for (var index in objects)
			if (objects[index].getType() == type || typeof(type) =='undefined')
				ret[index] = objects[index];
	
		return ret;
	};

	this.killAll = function (){
		for (var index in objects)
			if (objects[index].isVisible())
				objects[index].destroy();
	};
				
}                    
