<!-- 
	All code by Emir Hasanbegovic, not for resale, the creators of the 
	images have not provided consent for the images' use and should not 
	be used or reproduced. 
-->
<?php
	$this->Html->css('views/pages/star_fighter.css',null, array('inline' => false));
	$this->Html->scriptBlock(
		'var URL = "http://' . $_SERVER['HTTP_HOST']. '/img/StarFighter/";',
		array('safe' => false,'inline' => false)
	); 
	$this->element('GoogleAnalytics');
	$this->Html->script(array(
			"jquery-1.4.2.min.js",
			"StarFighter/StarFighter.js",
			"StarFighter/CollisionDetector.js",
			"StarFighter/Bullet.js",
			"StarFighter/Star.js",
			"StarFighter/Rectangle.js",
			"StarFighter/Circle.js",
			"StarFighter/Point.js",
			"StarFighter/Canvas.js",
			"StarFighter/Enemy.js",
			"StarFighter/enemyList.js",
			"StarFighter/PowerUp.js",
			"StarFighter/Scroller.js",
			"StarFighter/Explosion.js",
			"StarFighter/Game.js",
			"StarFighter/TitleScreen.js",
			"StarFighter/TitleBar.js",
			"StarFighter/Font.js",
			"StarFighter/Vector.js",
			"StarFighter/Triangle.js",
			"StarFighter/Constructor.js"
		),
		array('inline' => false)
	);
?>