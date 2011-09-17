/**
 *	By Emir Hasanbegovic
 */ 
var titleBarHeight = 32;

function TitleBar (){
	var titleBar = $("<div class='TitleBar'></div>");
	var score = $("<div class='Score'></div>");
	var health = $("<div class='Health'></div>");
	var visible = false;

	var currentScore = 0;
	var currentHealth = 100;	

	(function (){
		visible = true;
		titleBar.css("position", "relative");
		titleBar.css("clear", "both");
		titleBar.css("background", "url('" + URL + "TitleBar.png')");
		titleBar.css("width", canvas.getWidth() + "px");
		titleBar.css("height", titleBarHeight + "px");

		score.css("font-size","20px");
		score.css("line-height", titleBarHeight + "px");
		score.css("height", titleBarHeight + "px");
		score.css("float","left");
		score.css("width", "200px");

		health.css("font-size","20px");
		health.css("line-height", titleBarHeight + "px");
		health.css("float","left");
		health.css("height", titleBarHeight + "px");
		health.css("width", "200px");

		titleBar.append(score);
		titleBar.append(health);
		
		$('body').prepend(titleBar);
	})();
	
	
	this.animate = function (){
		var starFighter = canvas.getObject("StarFighter");
		if (starFighter == null){
			health.html("Health: 0%");
			return;
		}
		
		currentScore = starFighter.getScore();
		currentHealth = starFighter.getHealthAsPercentage();
		
		score.html("Score: " + currentScore);
		health.html("Health: " + currentHealth + "%");
	}
	
	var remove = function (){
		visible = false;
		score.remove();
		score = null;
		health.remove();
		health = null;
		titleBar.remove();
		titleBar = null;		
	};
	
	this.getDomObject = function (){
		return titleBar;
	};
	
	this.isVisible = function (){
		return visible;
	};

	this.getType = function (){
		return "TitleBar";
	};
	
	this.destroy = remove;		
}