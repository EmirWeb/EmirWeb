/**
 *	By Emir Hasanbegovic
 */ 
function TitleScreen (){
	(function (){
		$('body').html('');
		if (canvas != null)
			canvas.killAll();
		canvas = new Canvas(RESOLUTION_WIDTH,RESOLUTION_HEIGHT + titleBarHeight);
		new Stars(canvas);
		
		canvas.append(new Font(new Point(200,100), "Star Fighter (JavaScript)", 30, {"color": "#FFFFFF", "font-weight": "bold"}));
		canvas.append(new Font(new Point(250,200), "New Game", 15, {"color": "#FFFFFF"}, function () {$('body').html('');new Game();GoogleAnalytics.click("TITLE_SCREEN","START");}));
		//canvas.append(new Font(new Point(250,250), "Options", 15, {"color": "#FFFFFF"}));
		canvas.append(new Font(new Point(250,300), "Quit", 15, {"color": "#FFFFFF"}, function () {GoogleAnalytics.link("http://www.emirweb.com/");}));
	})();	
};
