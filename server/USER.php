<?php
	class UserSystem{
		public function createUser($email, $pwd){//op是要写入配置文件的一些其他信息
			
			$file = new File();
			$folder = MD5($email);
			
			
			if($file->is_dir($folder)){
				return 401;
			}else{
				if($file->mk_dir($folder, 0777)){
					$config = array("email"=>$email, "pwd"=>$pwd, "time"=>strtotime("now"));//创建用户信息配置文件
					$file->write($folder."/config.json", json_encode($config));
					return 200;
				}else{
					return 500;
				};
			}
		}
		public function isSignUp($email){
			$file = new File();
			$folder = MD5($email);
			if( $file->is_dir($folder) ){
				return true;
			}
			return false;
		}
	}
?>