<?php
	function getTodayTime(){
		ini_set('date.timezone','Asia/Shanghai');
		return strtotime((date("Y-m-d")." 00:00:00"));
	}
?>