<?php
	if (empty($groups))
		return;
		
	$this->Html->css('Elements/Group.css', null, array('inline' => false));
	
	$TITLE = "Title";
	$ROW = "Row";	
	$GROUP = "Group";
	$LABEL = "Label";
	$TEXT = "Text";
	
	foreach ($groups as $key => $group){
		if (isset($group[$TITLE]))
			$title = $group[$TITLE];
			
		if (isset($group[$ROW]))
			$rows = $group[$ROW];
			
		$groupToEcho = '';
		
		if (!empty($title))
			$groupToEcho = '<div class="' . $TITLE . '">' . $title . '</div>';
			
		if (!empty($rows))
			foreach ($rows as $key => $row){
				if (isset($row[$LABEL]))
					$label = $row[$LABEL];
				if (isset($row[$TEXT]))					
					$text = $row[$TEXT];
				$rowToEcho = '';
				
				if (!empty($label))
					$rowToEcho = '<div class="' . $LABEL . '">' . $label . '</div>';
									
				if (!empty($text))
					$rowToEcho .= $text;
					
				if (!empty($rowToEcho))
					$groupToEcho .= '<div class="' . $ROW . '">' . $rowToEcho . '</div>';				
			}
			
		if (!empty($groupToEcho))
			echo '<div class="' . $GROUP . '">' . $groupToEcho . '</div>';
	} 
?>
