Common.page = {
	pageIndex :0,//标识被激活的页面 0:addpage 1:viewPage
	focusIndex:-1,
	isInitViewPage:0,//判断list页面是否已经被初始化过
	pageIds:"#addPage,#viewPage",
	menuIds:"#showAddPage,#showViewPage",
	addPage:function(){
		this.pageIndex = 0;
		var word = Common.getItem("tem_word");
		var des = Common.getItem("tem_des");
		
		if(word){
			$('#keyword').val(word);
		}
		
		if(des){
			$('#description').val(des);
		}
		
		$(this.pageIds).addClass("hide");
		$("#addPage").removeClass("hide");
		$(Common.page.menuIds).removeClass("active");
		$("#showAddPage").addClass("active");
		$('#keyword').focus();
	},
	viewPage:function(dayTime){
		this.pageIndex = 1;
		$(this.pageIds).addClass("hide");
		$("#viewPage").removeClass("hide");
		$(Common.page.menuIds).removeClass("active");
		$("#showViewPage").addClass("active");
		
		if(dayTime){
			this.chageViewPageList(dayTime);
		}
	},
	chageViewPageList:function(dayTime){
		Common.page.isInitViewPage = 1;//页面已经被激活过
		Common.page.focusIndex = -1;//归零当前激活的item
		var bg = Common.getBackground();
		var time = dayTime || Common.getDayTime();
		var dayData = bg.UserData[time];
		var html = "";
		
		$('#yesterday').text(Common.sortFormat(time*1000 - 86400000));
		$('#tomorrow').text(Common.sortFormat(time*1000 + 86400000));
		$('#today').text(Common.sortFormat(time*1000));
		
		$('#yesterday').unbind('click').bind('click', function(){
			Common.page.viewPage((time * 1000 - 86400000) / 1000);
		});
		$('#tomorrow').unbind('click').bind('click', function(){
			Common.page.viewPage((time * 1000 + 86400000) / 1000);
		});
		$('#reloadData').unbind('click').bind('click', function(){
			Common.getDayData(time, function(data){
				Common.page.viewPage(time);
			}, true);
		});
		
		if(dayData && dayData.length){
			for(var i=dayData.length-1; i>=0; i--){
				html += Common.tmpl(Common.item, dayData[i]);
			}
		}else if(dayData && dayData.length == 0){
			Common.showTip({code:410});
		}else{//当天数据不存在 就请求数据
			Common.getDayData(time, function(data){
				Common.page.viewPage(time);
			});
		}
		
		$('#viewList').html(html);
	},
	regEvent:function(){//导航按钮
		$(this.menuIds).each(function(i){
			var i = i;
			$(this).click(function(){
				var time = Common.getDayTime();
				if(i == 0){
					Common.page.addPage();
				}else if(i == 1){
					var time = Common.page.isInitViewPage ? undefined : Common.getDayTime();//每次不进行页面初始化
					Common.page.viewPage( time );
				}
			});
		});
		$('#goSettingPage').click(function(){
			chrome.tabs.create({url:'temp/options_page.html'});
		});
		
		$(document).keyup(function(event){
			//console.log(event.keyCode);
			//k =75 j=74 l=76  上38 下40 左37 右39 tab=9
			var keyCode = event.keyCode;
			//alert(keyCode);
			var pageIndex = Common.page.pageIndex;
			if(pageIndex == 1){
				if(keyCode == 74 || keyCode == 40){
					Common.page.nextFocus();
					event.preventDefault();
					event.stopPropagation();
				}else if(keyCode == 75 || keyCode == 38){
					Common.page.prevFocus();
					event.preventDefault();
					event.stopPropagation();
				}else if(keyCode == 37){
					$('#yesterday').click();
				}else if(keyCode == 39){
					$('#tomorrow').click();
				}
			}
			
		});
		
	},
	prevFocus:function(){
		this.focusIndex = this.focusIndex - 1 <0 ? 0 : this.focusIndex - 1;
		$('#viewList .item').eq(this.focusIndex).focus();
	},
	nextFocus:function(){
		var list = $('#viewList .item');
		this.focusIndex = this.focusIndex + 1 > list.length-1 ? list.length-1 : this.focusIndex + 1;
		list.eq(this.focusIndex).focus();;
	},
	addReg:function(){ // 添加form
		$('#addAndSaveForm').submit(function(){
			var word = $('#keyword').val();
			var des = $('#description').val();
			var url = config.host+"server/add.php";
			if(word){
				Common.post(url, {word:word, des:des}, function(data){
					if(data.code == 200){
						var bg = Common.getBackground();
						var userData = bg.UserData;
						var dayTime = Common.getDayTime();
						
						Common.removeItem("tem_word");//删除临时存储
						Common.removeItem("tem_des");//删除临时存储
						
						if(userData && userData[dayTime]){
							console.log(data.result);
							Common.addData([data.result], dayTime);
							
						}
						Common.page.viewPage(dayTime);
					}
				});
			}else{
				$('#keyword').focus();
			}
			return false;
		});
	}
};