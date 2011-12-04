<?php

	
	//$_POST["email"] = "idche1@qq.com";
	//$_POST["pwd"] = "l1234556";
	//---上面是测试数据
	$email = $_POST["email"];
	$pwd = $_POST["pwd"];
	
	$result = array();
	
	if($email!="" && $pwd != ""){
		include "file.php";
		$file = new File();
		$folder = MD5($email);
		
		if($file->is_dir($folder)){//目录存在
			$config = $file->read($folder."/config.json");
			$pwd2 = json_decode($config)->pwd;
			if($pwd2 == $pwd){
				$result["code"] = 200;
				$result["result"] = array();
				$result["result"]["md5"] = $folder;
				SetCookie("mail", $email, time()+3600*24*7);
				//echo "----".$HTTP_COOKIE_VARS["mail"];
			}else{
				SetCookie("mail", "", time()-1);
				$result["code"] = 402;//密码错误
			}
		}else{
			SetCookie("mail", "", time()-1);
			$result["code"] = 404;//email错误
		}
		
	}else{
		SetCookie("mail", "", time()-1);
		$result["code"] = -1;//输入错误
	}
	echo json_encode($result); 
?>