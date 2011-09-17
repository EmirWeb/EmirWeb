<?php
	class Project extends AppModel {
		var $name = 'Project';
		
		function getProjects (){
			return $this->find('all');
		}
	}
?>