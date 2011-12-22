<?php
	//QQ 授权完成登录程序
	/*
		首先判断是否已经存在该用户
		存在就直接登录，不存在就创建新用户
	*/
	
	include "file.php";
	include "USER.php";
	
	$email = $_POST["email"];//实际使用openid
	$access_token = $_POST["access_token"];//作为密码
	$folder = MD5($email);
	$result = array();
	
	$user = new UserSystem();
	if( $user->isSignUp($email) ){//已经登录过
	
		$result["code"] = 200;
		
	}else{//新用户
		$result["code"] = $user->createUser($email, $access_token);
		
	};
	
	if($result["code"] == 200){
			
		$result["result"] = array();
		$result["result"]["md5"] = $folder;
		SetCookie("mail", $email, time()+3600*24*7);
			
	}
	
	echo json_encode($result); 
?>