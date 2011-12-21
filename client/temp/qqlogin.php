<!DOCTYPE HTML>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<title>Hello Jun</title>
</head>
<body>
	<script>
	
		function callback(user){
			console.log(user);
			window.opener.location.reload();
		};
		
		if(window.location.hash.length > 1){
			var accessToken = window.location.hash.substring(1);
			var path = "https://graph.qq.com/oauth2.0/me?";
			var queryParams = [accessToken, 'callback=callback'];
			var query = queryParams.join('&');
			var url = path + query;
			var script = document.createElement('script');
			script.src = url;
			document.body.appendChild(script);
		}
		
		callback();
	</script>
</body>
</html>