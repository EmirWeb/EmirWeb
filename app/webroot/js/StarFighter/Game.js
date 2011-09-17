/**
 *	By Emir Hasanbegovic
 */ 
var canvas = null;
var collisionDetector = null;
var titleBar = null;

function Game(){
	
	(function (){
		if (canvas != null)
			canvas.killAll();
		canvas = new Canvas(RESOLUTION_WIDTH,RESOLUTION_HEIGHT);

		new Stars(canvas);

		canvas.append(new StarFighter());
		canvas.append(new Scroller());
		canvas.setTitleBar(new TitleBar());
	}());
};
