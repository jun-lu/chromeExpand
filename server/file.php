<?php
	class File{
		public function is_dir($folder){ //判断是否存在文件夹
			return is_dir($folder);
		}
		
		public function mk_dir($folder){
			$create =  @mkdir($folder, 0777); 
            if(!$create){
              //throw new BusinessException("建立文件夹{$folder}失败");
			  return false;
            }
            return true;
		}
		
		public function read($filename){
			if (file_exists($filename) && is_readable ($filename)) {
				$fp=fopen($filename,"r"); 
				$content=fread($fp,filesize($filename));//读文件 
				fclose($fp);
			}else{
				return "101";//错误  读取文件错误
			}
			return $content;
		}
		
		public function readFiles($files){
			$len = count($files);
			$i = 0;
			$content;
			for(;$i < $len; $i++){
				$content .= $this->read($files[$i]);
			}
			return $content;
		}
		
		
		
		public function write($file, $data){
			return file_put_contents($file, $data);
			// if( file_exists($file) ){
				// if (!$handle = fopen($file, 'w')) {
					 // return 2;
					 // exit;
				// }
				// if (fwrite($handle, ($data)) === FALSE) {
					// return 3;
					// exit;
				// }
				// fclose($handle);
				// return 1;
			// }else{
				// $cFile = fopen($file, 'w');
				// $this->write($cFile, $data);
			// };
		}
	}
?>