<?php
	function curl_get($community, $host = ''){
		global $_SC;
		$host = empty($host)?$_SC['Game_Server']:$host;
		$url = $host.$_GET['target'].'.aspx';
		$params = array();
		foreach ($_GET as $key=>$value){
			if(strtolower($key) == 'target') continue;
			if(strtolower($key) == 'uid') continue;
			if(gettype($value)=='array')
			{
				foreach($value as $item)
					array_push($params,$key.'='.$item);
			}
			else
			{
				array_push($params,$key.'='.$value);
			}
		}
		array_push($params,'uid='.$community->UcenterId);
		array_push($params,'ssid='.$community->SessionId);
		
		$url = $url.'?'.implode('&',$params);
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPGET, 1);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
		$output = curl_exec($ch);
		curl_close($ch);
		
		return $output;
	}

	function curl_post($community, $host = '')
	{
		global $_SC;		
		$host = empty($host)?$_SC['Game_Server']:$host;
		$url = $host.$_POST['target'].'.aspx';
		$params = array();
		foreach ($_POST as $key=>$value){
			if(strtolower($key) == 'target') continue;
			if(strtolower($key) == 'uid') continue;
			array_push($params,$key.'='.$value);
		}
		array_push($params,'uid='.$community->UcenterId);
		array_push($params,'ssid='.$community->SessionId);
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST,1);
		curl_setopt($ch, CURLOPT_POSTFIELDS,implode('&',$params));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		$result = curl_exec($ch);
		curl_close($ch);
		return $result;
	}
?>