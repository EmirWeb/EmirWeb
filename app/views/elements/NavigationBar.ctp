<?php
/**
 * Navigation bar
 * @var $buttons
 * Array of Buttons, each button has $LINK, $TEXT and $TITLE keys.
 * Default buttons
 * $buttons = array(
 *		array(
 *			$LINK => "http://www.emirweb.com/pages/Scholastic",
 *			$TEXT => "Scholastic",
 *			$TITLE => "University of Toronto Class Websites"
 *		),
 *		array(
 *			$LINK => "http://www.emirweb.com/files/Resume.pdf",
 *			$TEXT => "Resume",
 *			$TITLE => "Online Resume"
 *		),
 *		array(
 *			$LINK => "http://www.emirweb.com",
 *			$TEXT => "Home",
 *			$TITLE => "Main Page"
 *		)
 * );
 */

	$TEXT = "Text";
	$LINK = "Link";
	$TITLE = "Title";
	
	$this->Html->css('Elements/NavigationBar.css', null, array('inline' => false));
?>
<div class="NavigationBar">	
	<?php 
		if (empty($buttons)){
			$buttons = array(
				array(
					$LINK => "http://" . $_SERVER['HTTP_HOST'] . "/pages/Scholastic",
					$TEXT => "Scholastic",
					$TITLE => "University of Toronto Class Websites"
				),
				array(
					$LINK => "http://" . $_SERVER['HTTP_HOST'] . "/files/Resume.pdf",
					$TEXT => "Resume",
					$TITLE => "Online Resume"
				),
				array(
					$LINK => "http://" . $_SERVER['HTTP_HOST'],
					$TEXT => "Home",
					$TITLE => "Main Page"
				)
			);
		} 
		
		foreach ($buttons as $button){
			echo '
				<a href="' . $button[$LINK] . '">
					<div class="Button" title="' . $button[$TITLE] . '">
						' . $button[$TEXT] . '
					</div>
				</a>
			';
		}
	?>
</div>