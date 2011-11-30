/*
 * Jun.ajax
 * by Jun Lu 2011-02-09 15:30
 */
 
 Jun.ajax = {
 	createXMLHTTP:function(){
		return window.ActiveXObject ? new window.ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest;
	},
	
	/*
	 * json map = {
	 *	type:,
	 *  dataType:[get|type],
	 *	url:,
	 *	data:,
	 *	error,
	 *	success
	 * }
	 */

	ajax:function(json){
		var xmlhttp = Jun.ajax.createXMLHTTP(),
			dataArr = [];
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var dataString = xmlhttp.responseText;
				if(json.dataType == 'json'){
					try{
						dataString = new Function("return "+ dataString)();
					}catch(e){
						throw "dataType is not json";
					}
				}
                json.success && json.success(dataString);
            }
        }
        var arr = [];
		for( var e in json.data ){
			arr.push(e + '=' + encodeURIComponent(json.data[e]));
		}
		
		if(json.data != undefined && json.type == 'get'){
            url += '?' + dataArr.join('&');
        }
        xmlhttp.open(json.type, json.url, true);
        xmlhttp.send(json.type == 'post' ? dataArr.join('&') : null);
	},
	getJSON:function(url, callBack, data){
		Jun.ajax.ajax({
			type:'get',
			dataType:'json',
			url:url,
			data:data,
			error:function(){},
			success:callBack
		})
	},
	
	getScript:function(url, callBack){
		var script = Jun.dom.create('script');
		if(callBack){
			// 这里加上浏览器的判断更好些
			// 测试不加也行
			script.onreadystatechange = function(){
				if (script.readyState == "loaded" || script.readyState == "complete") callBack()
			}
			script.onload = callBack;
		}
		script.type = "text/javascript";
		script.src = url;
		Jun.dom.getTG(document,'head')[0].appendChild(script);
	}
 }