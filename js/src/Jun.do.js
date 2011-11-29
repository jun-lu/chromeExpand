
/*动态JS加载*/
/*
  var script  = document.createElement('script');
								IE6        IE7        IE8   IE9   Chrome     Firefox    Opera				
  script.onreadystatechange     null       null       --    null  undefined  undefined  undefined
  script.onload                 undefined  undefined  --    null  null       undefined  null
 */	
/*
   全局命名空间WW
   主要方法
   WW = {
	 add:fucntion(namespace, url){}
	 use:fucntion(namespaces, callback){}
   }
   
   方法 add(namespace, url, isOkay)
   说明 注册一个JS模块
   参数 namespace String
   参数 url String
   参数 isOkay Boolean 是否已经加载成功 可选 这个主要用于测试环境下很多文件，上线以合并成一个文件后注册空间不够
   
   方法 use(namespaces, callback);
   参数 namespaces String 可以是多个 namespace 使用逗号分割
   参数 callback Function JS全部加载完成回调方法
   
 */ 
var WW = {
	support:document.dispatchEvent ? 'onload' : 'onreadystatechange', 
	query:{/*队列*/},
	module:{/*成功注册的模块*/},
	add:function(namespace, url, isOkay){//注册一个命名空间
		var module = this.module;
		
		if(module[namespace]){
			throw namespace+ " is being";
		}
		
		module[namespace] = {};
		module[namespace].url = url;
		module[namespace].isOkay = isOkay || false;
	},
	use:function(namespaces, callback){//使用一个命名空间

		var task = {};
		var key;
		
		task.namespaces = namespaces.split(',');
		task.callback = callback || function(){};
		task.complet = 0;//已完成
		task.total = task.namespaces.length;//总量
		key = task.namespaces.join('');// 任务的KAY;
		
		this.query[ key ] = task;
		this.start(task, key );
		
	},
	start:function(task, key){//内部 开始加载一个任务
	
		var i = 0;
		var len = task.namespaces.length;
		var model;
		var modelKey;
		
		for(i; i<len; i++){
			modelKey = task.namespaces[i].replace(/^\s+|\s+$/g,'');
			model = this.module[ modelKey ];
			
			if(model === undefined){
				throw modelKey+' is undefined';
			}
			
			if(model.isOkay === false){
				model.isOkay = 1;
				this.load(model.url, modelKey, key);
			}else if(model.isOkay === true){
				this.checkBack(modelKey, key);
			}else{
				this.wait(model, modelKey, key);
			}
		}
		
	},
	wait:function(model, modelKey, key){// 处理，后一个任务包含前一个正在进行中的任务，而导致的重复加载问题
		var _this = this;
		var a = setInterval(function(){
			if(model.isOkay === true){
				clearInterval(a);
				_this.checkBack(modelKey, key);	
			}
		}, 500);
	},
	checkBack:function(modelKey, key, isOkey){//内部
		this.module[modelKey].isOkay = isOkey;
		var query = this.query[key];
		if(++(query.complet) === query.total){
			query.callback();//回调函数
			delete this.query[key];
		}
	},
	load:function(url, modelKey, key){//内部 加载一个JS
		var _this = this;
		var script = document.createElement('script');
		
		script.async = false;
		script[this.support] = function(){
			if ( /undefined|loaded|complete/.test(script.readyState) ){
				script[_this.support] = null;
				_this.checkBack(modelKey, key, true);
			}
		};
		
		script.onerror = function(e){
			window.console && window.console.log(e);
			_this.checkBack(modelKey, key, false);
		};

		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', url);
		
		document.getElementsByTagName('head')[0].appendChild(script);
	}
};

