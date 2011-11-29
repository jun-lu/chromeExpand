Jun.event = {
	preventDefault:function (event) {
	   if (event.preventDefault) {
		   event.preventDefault();
	   } else {
		   event.returnValue = false;
	   }
	},
	stopPropagation:function (event) {  
	   if (event.stopPropagation) {
		   event.stopPropagation();
	   } else {
		   event.cancelBubble = true;
	   }
	},
	stop : function (event) {
		this.stopPropagation(event);
		this.preventDefault(event);
	}
};

Jun.event.initEvent = function(event){
	this.je = Jun.event;
	this.event = event || window.event;
};
Jun.event.initEvent.prototype = {
	constructor:Jun.event.initEvent,
	target:function(){
		return this.event.target || this.event.srcElement;
	},
	preventDefault:function(){
		this.je.preventDefault(this.event);
	},
	stopPropagation:function(){
		this.je.stopPropagation(this.event);
	},
	stop:function(){
		this.je.stop(this.event);
	}
};