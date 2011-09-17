<?php 
	$this->Html->css(array('views/pages/home.css'), null, array('inline' => false));
	$this->element('GoogleAnalytics');
	$this->Html->script('views/pages/home.js', array('inline' => false));

	$groups = array(
		array(
			'Title' => 'Current News',
			'Row' => array (
				array(
					'Label' => 'October 12, 2010:',
					'Text' => '<a href="/pages/StarFighter">StarFighter (JavaScript)</a> available online for first time.'				
				),
				array(
					'Label' => 'October 12, 2010:',
					'Text' => 'New website layout!'				
				)				
			)
		)
	);
	echo $this->element('NavigationBar');
?>
<div class="Content">
 	<?php echo $this->element('Group', array('groups' =>$groups)); ?>
</div>