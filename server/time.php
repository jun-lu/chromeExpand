<?php
	
	ini_set('date.timezone','Asia/Shanghai');
	echo date("Y-m-d")."<br/>";
	echo strtotime((date("Y-m-d")." 00:00:00"))."<br/>";
	echo strtotime((date("Y-m-d")."00:00:01"))."<br/>";
	echo strtotime('today')."<br/>";
	echo mktime(0, 0, 0, date('m'), date('d'), date('Y'));
	
?>