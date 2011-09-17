/**
 *	Dom manipulation class	    
 */ 
function DomManager (){
	var head = $('head');   
	var body = $('body');

	/**
	 * @return head object
	 */
	var getHead = function(){
		return head;
	};
	
	/**
	 * @returns body object
	 */
	var getBody = function(){
		return body;
	};
	
	/**
	 *	Adds child to parent object
	 *	@param Parent object that will be added to			 			 			
	 *	@param Child object that will be added
	 */			 
	var add = function (parent, child){
		child.appendTo(parent);
	};

	/**
	 *	Creates a new script object
	 *	
	 *	@param source
	 *	@return script object	 	 
	 */	 	
	var createScript = function(src) {
		var script = '<script type="text/javascript" async="true" src="' + src + '"></script>';
		return $(script);
	};
	
	this.add = add;
	this.createScript = createScript;
	this.getHead = getHead;
	this.getBody = getBody;
}

var DomManager = new DomManager();