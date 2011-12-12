<?php
	
	$time = $_GET["time"];
	$mail = $_COOKIE['mail'];
	//$mail = $HTTP_COOKIE_VARS["mail"];
	//echo "mail:".$mail;
	$result = array();
	
	if(!$mail){
		$result["code"] = 405;//没有登录
		echo json_encode($result);
		exit;
	}
	
	$mail = MD5($mail);
	
	if($time != "" ){
		include "file.php";
		$file = new File();
		$folder = $mail;
		
		
		if($file->is_dir($folder)){
			$dataFile = $time;//strtotime(date("Y-m-d"));
			$filePath = $folder."/".$dataFile.".json";
			$item = array("word"=>$word, "des"=>$des);
			
			if( file_exists($filePath) ){//
				$result["code"] = 200;//
				$result["result"] = json_decode($file->read($filePath));
			}else{
				$result["code"] = 410;//当前没有数据
			};
		}else{
			$result["code"] = 406;//用户不存在
		}
	}else{
		$result["code"] = 102;//输入错误
	}
	echo json_encode($result); 
?>