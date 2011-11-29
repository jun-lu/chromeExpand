// JavaScript Document

 Jun.string = {
	 trim:function(string){
	 	return string.replace(/^\s+|\s+$/g, '');
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
	 indexOf:function(string, str){
		
	 }
 }