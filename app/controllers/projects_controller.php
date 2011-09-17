<?php
	class ProjectsController extends AppController {
		var $name = 'Projects';
		
		function view(){
			$this->set("projects", $this->Project->getProjects());
		}
	}
?>
