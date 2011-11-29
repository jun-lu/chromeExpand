/*
 * Jun.com
 * by Jun Lu 2011-02-09 12:59
 */
 
 Jun.com = {
 	trim:function(string){
		return string.replace(/^\s+|\s+$/g, '');
	},
	now:function(){
		return Jun.com.format(new Date());
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
			var reg = new RegExp(key+"=(\\w+)");
			var result = document.cookie.match(reg);
			if(result){
				return decodeURIComponent( result[1] );
			}
			return null;
		},
		del:function(key){
			return Cookie.set(key, '', {"expires":new Date(0)})
		}
	}
 }
 
