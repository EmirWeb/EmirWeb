/**
 * Asynchronous class
 */
function Async (){
	/**
	 *	Waits until conditionFunction returns true, then runs callbackFunction			 
	 *
	 *	@param	Function that returns whether the condition has been met or not
	 *	@param	Function that is called upon meeting condition
	 *	@param	(Optional) timeout interval, default 500
	 *	@param 	boolean type of loop true = loop, false = while	, default = false		 
	 *	@return	null upon success, error message otherwise
	 */			 			 						
	var async = function(conditionFunction, callbackFunction, timeout, type){
		//	Checks to see if variables are expected types			
		if (typeof(conditionFunction) != 'function')
			return 'Condition is not a function';
		else if (typeof(callbackFunction) != 'function')
			return 'Callback is not a function';
		else if (typeof(timeout) == 'undefined')
			timeout = 500; 
		else if (typeof(timeout) != 'number')
			return 'Timeout is not an integer';
	
		//	Initializes functions												
		try{	
			var tempFinal;
			if (type){
				tempFinal = function(){
					if (conditionFunction())
						callbackFunction();
					else
						setTimeout(tempFinal,timeout);																	
				};
			}else{			
				tempFinal = function(){
					if (conditionFunction()){
						callbackFunction();			
						setTimeout(tempFinal, timeout);
					}																	
				};
			}
		}catch(err){
			return 'Could not initialize functions: ' + err;
		}
	
		//	Runs initialized function				
		try{
			tempFinal();
		}catch(err){
			return 'Could not run function: ' + err;
		}
	
		return null;
	};
	
	/**
	 *	Waits until conditionFunction returns true, then runs callbackFunction			 
	 *
	 *	@param	Function that returns whether the condition has been met or not
	 *	@param	Function that is called upon meeting condition
	 *	@param	(Optional) timeout interval, default 500
	 *	@param 	boolean type of loop true = loop, false = while			 
	 *	@return	null upon success, error message otherwise
	 */			 			 							
	var aLoop = function (conditionFunction, callbackFunction, timeout){
		return async(conditionFunction, callbackFunction, timeout, true)
	};
	
	/**
	 *	Waits until conditionFunction returns true, then runs callbackFunction			 
	 *
	 *	@param	Function that returns whether the condition has been met or not
	 *	@param	Function that is called upon meeting condition
	 *	@param	(Optional) timeout interval, default 500
	 *	@param 	boolean type of loop true = loop, false = while			 
	 *	@return	null upon success, error message otherwise
	 */			 			 							
	var aWhile = function (conditionFunction, callbackFunction, timeout){
		return async(conditionFunction, callbackFunction, timeout, false)
	};
	
	this.aLoop = aLoop;
	this.aWhile = aWhile;
}

var Async = new Async();