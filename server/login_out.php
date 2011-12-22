<?php

	$result = array();
	$result["code"] = 200;
	setcookie("mail", "", time() - 3600);
	echo json_encode($result); 
?>