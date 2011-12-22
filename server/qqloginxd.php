<!DOCTYPE HTML>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<title>qq登录中转页面</title>
</head>
<body>
	<script>
		var accessToken;
		function callback(user){
			//console.log(user);
			window.location.href="chrome-extension://epljikhhgnnoknfpdklhobnhcapljlom/temp/qqlogin.html#openid="+user.openid+"&client_id="+user.client_id+"&accessToken="+accessToken.split("=")[1];
		};
		
		
		if(window.location.hash.length > 1){
			accessToken = window.location.hash.substring(1);
			var path = "https://graph.qq.com/oauth2.0/me?";
			var queryParams = [accessToken, 'callback=callback'];
			var query = queryParams.join('&');
			var url = path + query;
			var script = document.createElement('script');
			script.src = url;
			document.body.appendChild(script);
		}
		//
	</script>
</body>
</html>