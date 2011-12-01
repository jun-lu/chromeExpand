var config = {
	//host:"http://192.168.1.101:9030/"
	host:"http://localhost/chrome/"
};

var Common = {
	item:'<div class="item" tabindex="1" data-word="<%=word%>" >\
		<strong class="word"><%=word%> <span title="'+ TipData["1003"] +'" class="read"  data-word="<%=word%>" ></span></strong>\
		<p class="des"><%=des%></p>\
		<p class="help-block"><%=time%></p>\
	</div>',
	tmpl : function tmpl(str, data){
			var fn = !/\W/.test(str) ?
			  cache[str] = cache[str] ||
				tmpl(document.getElementById(str).innerHTML) :
			  
			  new Function("obj",
				"var p=[],print=function(){p.push.apply(p,arguments);};" +
				"with(obj){p.push('" +
				
				str
				  .replace(/[\r\t\n]/g, " ")
				  .split("<%").join("\t")
				  .replace(/((^|%>)[^\t]*)'/g, "$1\r")
				  .replace(/\t=(.*?)%>/g, "',$1,'")
				  .split("\t").join("');")
				  .split("%>").join("p.push('")
				  .split("\r").join("\\'")
			  + "');}return p.join('');");
			  
			return data ? fn( data ) : fn;
	},
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
		var msg = TipData[data.code] || TipData["1000"]+data.code;
		this.tip(msg);
	},
	showTip:function(data){
		var msg = TipData[data.code] || TipData["1000"]+data.code;
		this.tip(msg);
	},
	read:function(word){
		$('#playVodeo').attr("src", "http://translate.google.com/translate_tts?ie=UTF-8&q="+ word +"&tl=en&prev=input");
	},
	get:function(url, data, success){
		Common.tip(TipData["1001"], 0);
		$.ajax({
			url:url,
			type:"get",
			data:data,
			dataType:"json",
			error:function(){
				Common.tip(TipData["1002"]);
			},
			success:function(data){
				if(data && data.code != 200){
					Common.showError(data);
				}else{
					Common.hideTip();
				}
				success && success(data);
			}
		});
	},
	post:function(url, data, success){
		Common.tip(TipData["1001"], 0);
		$.ajax({
			url:url,
			type:"post",
			data:data,
			dataType:"json",
			error:function(){
				Common.tip(TipData["1002"]);
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
	pad:function(string, length, pad){
		var len = length - String(string).length
		if(len < 0){
			return string;
		}
		var arr = new Array( length - String(string).length || 0 )
		arr.push(string); 
		return arr.join(pad || '0');
	},
	// Jun.com.format(new Date(),"yyyy-MM-dd hh:mm:ss");
	format:function(source, pattern){
		// Jun.com.format(new Date(),"yyyy-MM-dd hh:mm:ss");
		//Jun.com.format(new Date(),"yyyy年MM月dd日 hh时:mm分:ss秒");
		source = new Date(source);
		var pad = this.pad,
			date = {
			yy		: String(source.getFullYear()).slice(-2),
			yyyy	: source.getFullYear(),
			M		: source.getMonth() + 1,
			MM		: pad(source.getMonth() + 1, 2, '0'),
			d		: source.getDate(),
			dd		: pad(source.getDate(), 2, '0'),
			h		: source.getHours(),
			hh		: pad(source.getHours(), 2, '0'),
			m		: source.getMinutes(),
			mm		: pad(source.getMinutes(), 2, '0'),
			s		: source.getSeconds(),
			ss		: pad(source.getSeconds(), 2, '0')
			};
		return (pattern || "yyyy-MM-dd hh:mm:ss").replace(/yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s/g, function(v){ return date[v];});
			
	},
	sortFormat:function(date){
		return this.format(date, "MM-dd");
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
			return this.set(key, '', {"expires":new Date(0)});
		}
	},
	getItem:function(key){//本地存储
		return localStorage.getItem(key);
	},
	setItem:function(key, value){
		return localStorage.setItem(key,value);
		//localStorage[key] = value;
	},
	removeItem:function(key){
		localStorage.removeItem(key);
	},
	getBackground:function(){//后台数据
		return chrome.extension.getBackgroundPage();
	},
	getDayTime:function(){//今天的时间戳
	//php 里面默认去了当天8点整的时间戳
		return new Date(Common.format(new Date(), "yyyy-M-d")+" 08:00:00").getTime() / 1000;
	},
	addData:function(data, time){//向JS内存加入一条信息
		var bg = this.getBackground();
		var time = time || Common.getDayTime();
		var userdata = bg.UserData[time];
		if(userdata){
			for(var i=0; i<data.length; i++){
				userdata.push(data[i]);
			}
		}else{
			bg.UserData[time] = [];
			for(var i=0;i < data.length; i++){
				bg.UserData[time].push(data[i]);
			}
		}
	},
	getDayData:function(daytime, callback){//获取某一天的数据
		var time = daytime || this.getDayTime();
		var url = config.host+"server/select.php";
		this.get(url,{time:time}, function(data){
			if(data && data.code == 200){
				Common.addData(data.result, time);
				callback && callback(data);
			}
		});
	}
};