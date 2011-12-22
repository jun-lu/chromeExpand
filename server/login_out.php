<?php

	$result = array();
	$result["code"] = 200;
	SetCookie("mail", "", time()-1);
	echo json_encode($result); 
?>