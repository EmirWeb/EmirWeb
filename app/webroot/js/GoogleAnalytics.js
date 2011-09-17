var _gaq = _gaq || [];

function GoogleAnalytics (){
	var CATEGORY = "INTERNAL";
	var LOAD = "LOAD";
	var CLICK = "CLICK";
	var LINK = "LINK";
	var MOUSE_OVER = "MOUSE_OVER";
	var TRACK_EVENT = "_trackEvent";
					
	/**
	 * Sets the category for the class 
	 * @param category
	 */
	var setLocation = function (category){
		CATEGORY = category;
	};
	
	/**
	 * @param category
	 * @param action
	 * @param opt_label
	 * @param opt_value
	 */
	var track = function (category, action, label, value){
		if (typeof(category) == 'undefined')
			throw ("GoogleAnalytics - Category is undefined.");
		else if (typeof(category) != 'string')
			throw ("GoogleAnalytics - Category must be a string.");
		else if (typeof(action) == 'undefined')
			throw ("GoogleAnalytics - Action is undefined.");
		else if (typeof(action) != 'string')
			throw ("GoogleAnalytics - Action must be a string.");

		if ( typeof(label) == 'undefined')
			_gaq.push([TRACK_EVENT, category, action]);
		else if (typeof(label) != 'string')
			throw ("GoogleAnalytics - Label must be a string.");
		else if ( typeof(value) == 'undefined')
			_gaq.push([TRACK_EVENT, category, action, label]);
		else if (typeof(value) != 'string')
			throw ("GoogleAnalytics - Value must be a string.");
		else
			_gaq.push([TRACK_EVENT, category, action, label, value]);
		
	};
	
	/**
	 * Click event
	 * @param category
	 * @param object
	 * @param value
	 */
	var click = function (object, value){
		track(CATEGORY, CLICK, object, value);
	};
	
	/**
	 * Specifically for links
	 * @param jQueryObject
	 */
	var link = function (hyperLink){
		track(CATEGORY, LINK, hyperLink);
	};
	
	/**
	 * Mouseover event
	 * @param category
	 * @param object
	 * @param value
	 */
	var mouseOver = function (object, value){
		track(CATEGORY, MOUSE_OVER, object, value);
	};
	
	/**
	 * Tracks a page load
	 */
	var load = function (){
		track(CATEGORY, LOAD);
	};
	
	/**
	 * Finds all the a tags on the page and tracks their clicks
	 */
	var setLinkAnalytics = function (){
		$('a').click(function (){
			var hyperLink = $(this).attr('href');

			if (hyperLink)
				link(hyperLink);
		});
	};
		
	/**
	 *	Adds google analytics script to head.
	 */			 			
	(function() {
		_gaq.push(['_setAccount', 'UA-19112615-1']);
		_gaq.push(['_trackPageview']);
		
		var script = DomManager.createScript(('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js');
		DomManager.add(DomManager.getHead(), script);
	})();
	
	this.link = link;
	this.track = track;
	this.click = click;
	this.load = load;
	this.setLocation = setLocation;
	this.setLinkAnalytics = setLinkAnalytics;
	this.mouseOver = mouseOver;
} 

var GoogleAnalytics = new GoogleAnalytics();