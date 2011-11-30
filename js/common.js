var config = {
	host:"http://192.168.1.101:9030/"
};

var Common = {
	tip:function(msg, time){
		$('#msg').text(msg).removeClass("hide");
		if(time != 0){
			setTimeout(function(){
				$('#msg').addClass("hide");
			}, time || 3000);
		}
	},
	hideTip:function(){
		$('#msg').addClass("hide")
	},
	showError:function(data){
		var msg = ErrorData[data.code];
		this.tip(msg);
	},
	get:function(url, data, success){
		Common.tip("请等待...", 0);
		$.ajax({
			url:url,
			type:"get",
			data:data,
			dataType:"json",
			error:function(){
				Common.tip("请求出现一些错误！");
			},
			success:function(data){
				if(data.code != 200){
					Common.showError(data);
				}else{
					Common.hideTip();
				}
				success && success(data);
			}
		});
	},
	post:function(url, data, success){
		Common.tip("请等待...", 0);
		$.ajax({
			url:url,
			type:"post",
			data:data,
			dataType:"json",
			error:function(){
				Common.tip("请求出现一些错误！");
			},
			success:function(data){
			
				if(data.code != 200){
					Common.showError(data);
				}else{
					Common.hideTip();
				}
				
				success && success(data);
			}
		});
	},
	trim:function(string){
		return string.replace(/^\s+|\s+$/g, '');
	},
	now:function(){
		return this.format(new Date());
	},
	// Jun.com.format(new Date(),"yyyy-MM-dd hh:mm:ss");
	format:function(source, pattern){
		// Jun.com.format(new Date(),"yyyy-MM-dd hh:mm:ss");
		//Jun.com.format(new Date(),"yyyy年MM月dd日 hh时:mm分:ss秒");
		source = new Date(source);
		var pad = Jun.string.pad,
			date = {
			yy		: String(source.getFullYear()).slice(-2),
			yyyy	: source.getFullYear(),
			M		: source.getMonth() + 1,
			MM		: pad(source.getMonth(), 2, '0'),
			d		: source.getDay(),
			dd		: pad(source.getDay(), 2, '0'),
			h		: source.getHours(),
			hh		: pad(source.getHours(), 2, '0'),
			m		: source.getMinutes(),
			mm		: pad(source.getMinutes(), 2, '0'),
			s		: source.getSeconds(),
			ss		: pad(source.getSeconds(), 2, '0')
			};
		return (pattern || "yyyy-MM-dd hh:mm:ss").replace(/yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s/g, function(v){ return date[v];});
			
	},
	cookie : {
		set:function(key, value, jsonMap){
				// .path .expires .domain .secure
				jsonMap = jsonMap || {};
				return document.cookie = key + "=" + value
										+ (jsonMap.path ? "; path=" + jsonMap.path : "")
										+ (jsonMap.expires ? "; expires=" + jsonMap.expires.toGMTString() : "")
										+ (jsonMap.domain ? "; domain=" + jsonMap.domain : "")
										+ (jsonMap.secure ? "; secure" : ''); 
		},
		get:function(key){
			var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
				result = reg.exec(document.cookie);
			if (result) {
				return result[2] || null;
			}
		},
		del:function(key){
			return this.set(key, '', {"expires":new Date(0)})
		}
	},
	getItem:function(key){//本地存储
		localStorage.getItem(key);
	},
	setItem:function(key, value){
		localStorage.setItem(key,value);
	},
	removeItem:function(key){
		localStorage.removeItem(key);
	}
};