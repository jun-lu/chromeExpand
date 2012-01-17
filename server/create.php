<?php

	
	//$_POST["email"] = "idche1@qq.com";
	//$_POST["pwd"] = "l1234556";
	$email = $_POST["email"];
	$pwd = $_POST["pwd"];
	
	$result = array();
	
	if($email!="" && $pwd != ""){
		include "file.php";
		include "USER.php";
		// $file = new File();
		// $folder = MD5($email);
		
		
		// if($file->is_dir($folder)){
			// $result["code"] = 401;//用户名已经存在
		// }else{
			// if($file->mk_dir($folder, 0777)){
				// $result["code"] = 200;//创建成功
				// $result["result"] = array();
				// $result["result"]["md5"] = $folder;
				
				// $config = array("email"=>$email, "pwd"=>$pwd, "time"=>strtotime("now"));//创建用户信息配置文件
				// $file->write($folder."/config.json", json_encode($config));
				
			// };
		// }
		$user = new UserSystem();
		$result["code"] = $user->createUser($email, $pwd);
		if($result["code"] == 200){
			$result["result"] = array();
			$result["result"]["md5"] = MD5($email);
		}
	}else{
		$result["code"] = -1;//输入错误
	}
	
	echo json_encode($result); 
?>