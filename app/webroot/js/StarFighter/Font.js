/**
 *	By Emir Hasanbegovic
 */ 
function Font (point, string, fontSize, css, onClick){
	var css = css;
	var onClick = onClick;
	var fontSize = fontSize;
	var point = point;
	var string = string;
	var font = $('<div class="Font"></div>');

	(function (){
		if (typeof(onClick) != "function")
			onClick = function (){};
		
			
		font.html(string);
		font.css("top", point.getY());
		font.css("left", point.getX());
		font.css("line-height", fontSize + "px");
		font.css("font-size", fontSize + "px");

		for (var index in css)
			font.css(index, css[index]);

		font.css("position","absolute");
		font.css("cursor", "pointer");
		font.click(onClick);
	})();
	
	this.isVisible = function (){
		return true;
	};
		
	this.animate = function (){
		
	};
	
	var remove = function (){
		font.remove();
		font = null;	
	}
	
	this.kill = remove; 

	this.destroy = remove;

	
	this.getType = function (){
		return "Font";
	};

	this.animate = function (){
	};
			
	this.getDomObject = function (){
		return font;
	};
		
}
