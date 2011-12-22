<?php

	$result = array();
	$result["code"] = 200;
	setcookie("mail", "", time()-1);
	echo json_encode($result); 
?>