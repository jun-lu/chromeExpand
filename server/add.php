<?php

	//$_POST["word"] = "hello world";
	//$_POST["des"] = "l1234556";
	
	$word = $_POST["word"];
	$des = $_POST["des"];
	
	//$mail = $HTTP_COOKIE_VARS["mail"];
	$mail = $_COOKIE['mail'];
	
	$result = array();
	if(!$mail){
		$result["code"] = 405;//没有登录
		echo json_encode($result);
		exit;
	}
	
	$mail = MD5($mail);
	
	if($word!="" && $des != ""){
		include "file.php";
		$file = new File();
		$folder = $mail;
		$time = time();
		
		
		if($file->is_dir($folder)){
			$dataFile = strtotime(date("Y-m-d"));
			$filePath = $folder."/".$dataFile.".json";
			$item = array("word"=>$word, "des"=>$des, "time"=>$time);
			//if( is_writable($filePath) ){
				if( file_exists($filePath)){//今天的已经存在
					
					$data = json_decode($file->read($filePath));
					array_push($data, $item);
					$file->write($filePath, json_encode($data));
					$result["code"] = 200;//
				}else{
					$data = array();
					array_push($data, $item);
					$file->write($filePath, json_encode($data));
					$result["code"] = 200;//
				};
				
				//$result["code"] = 200;//
				$result["result"] = array();
				$result["result"]["word"] = $word;
				$result["result"]["des"] = $des;
				$result["result"]["time"] = $time;
				
			//}else{
			//	$result["code"] = 407;//没有
			//}			
		}else{
			$result["code"] = 406;//用户不存在
		}
	}else{
		$result["code"] = -1;//输入错误
	}
	echo json_encode($result); 
?>