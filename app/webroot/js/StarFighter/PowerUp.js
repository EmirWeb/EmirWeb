/**
 *	By Emir Hasanbegovic
 */ 
var powerUps = {
	'size': 3,
	'0': {
		'type': 'Speed',
		'height': 32,
		'width': 32,
		'speed': 2
	},
	'1': {
		'type': 'Bomb',
		'height': 32,
		'width': 32,
		'speed': 2
	},
	'2': {
		'type': 'Fire',
		'height': 32,
		'width': 32,
		'speed': 2
	}
};

function PowerUp (x, y){
	
	var me = this;
	var data = powerUps[Math.floor(Math.random() * powerUps['size'])];
	var x = parseInt(x);
	var y = parseInt(y);
	var powerUp = $('<div class="PowerUp"><img src="' + URL + 'PowerUp' +  data.type + '.png" width="' + data.width + '" height="' + data.height + '" /></div>');
	var visible = true;
	
	(function (){
		 
		powerUp.css('position', 'absolute');
		powerUp.css('left', x);
		powerUp.css('top', y);
		powerUp.css('width', data.width);
		powerUp.css('height', data.height);
	})();
	
	this.animate = function (){
		x -= data.speed;
		if (x < 0)
			remove();
		else
			powerUp.css('left', x);
	};
	
	var remove = function (){
		powerUp.remove();
		visible = false;
	};
	
	this.kill = remove;
	
	this.destroy = remove;
	
	this.isVisible = function(){
		return visible;
	};
	
	this.getType = function (){
		return 'PowerUp';
	};
	
	this.getDomObject = function (){
		return powerUp;
	};
	
	this.getPowerUpType = function (){
		return data.type;
	};
	
	this.getDimensions = function (){
		return {
			'0' : new Circle ( new Point ( Math.floor(x + data.width/2), Math.floor(y + data.height)), Math.ceil(data.width / 2))
		};
	};
}
