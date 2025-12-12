//====初始化脚本 开始====
$(document).ready(function(){
    $('ul.navigationlist li').mousemove(function(){
		$(this).find('ul').slideDown(280);//you can give it a speed
    });
    $('ul.navigationlist li').mouseleave(function(){
		$(this).find('ul').slideUp(280);
    });
	
	//固定导航条
    $("#logo_main").scrollFix({zIndex:1000});
	
	setImageEffect();
	setClass();
	setElevator();
	setSideBar();
});
//====初始化脚本 结束====

//====公共函数 开始====
function showMessage(title, content, icon){
	//icon 1:勾 、2:叉、3:问号 、4:锁、5:气
	if(icon == undefined ) icon = 0;
	layer.alert(content,  {icon:icon, title: title});	
}

//设置图片效果
function setImageEffect(type){
	var selector = ".gridlist2 > li > a > img, .gridlist > li > a > img, .special > a > img, .all_body img";
	var time = 500;
	$(selector).hover(function(){
		$(this).animate({opacity: "0.5"}, time);
	},function(){
		$(this).animate({opacity: "1"}, time);
	});
}

//以HTML的方式显示登录状态
function ShowLoginBar(params){
		if( params.EnableHtml == 1 ){
			$.get(params.JsonUrl, {type:1}, function(data){
				params.MemberID = data['MemberID'];
				params.MemberName = data['MemberName'];
				params.TotalItemCount = data["TotalItemCount"];
				SetLoginBar(params);
			},"json");
		}else{
			SetLoginBar(params);
		}
}

//设置登录状态
function SetLoginBar(params){
	var html = "";
	if( params.MemberID ){
		html += "<span class='MemberName'>"+params.MemberName+"&nbsp;&nbsp;</span>";
		html += "<a href='"+params.MemberUrl+"' target='_blank'>"+params.MemberCenter+"&nbsp;&nbsp;</a>";
		html += "<a href='"+params.MemberLogoutUrl+"' target='_self'>"+params.MemberQuit+"</a>";
	}else{
		html += "<a onclick='ShowLogin()' href='javascript:;'>"+params.Login+"&nbsp;&nbsp;</a>";
		html += "<a onclick='ShowReg()' href='javascript:;'>"+params.Reg+"&nbsp;&nbsp;</a>";
	}
	$("#top_1").html( html );
	setTotalItemCount(params.TotalItemCount);
	setEmptyText(params.TotalItemCount);
	ComputeOrderTotalPrice();
}

//历史记录
function setHistory(params){
	$(".ClearHistory").click(function(){
		$.get(params.ClearHistoryUrl, null, function(data){
				$("ul.historylist").remove();
		},"json");
	});
}

//图片延时加载
function LazyLoad(params){
	$("img.lazyimg").lazyload({ placeholder : params.Images+"grey.gif", effect : "fadeIn"}); 
}

//设置产品分类列表
function setClass(){
	if( $(".navigationlist #classlist").length <= 0 ){
		 var gIsFirstOver = 0;
		 $('.navigationlist li.first').mousemove(function(){
				gIsFirstOver = 1;
				var obj = $(this).find(".classlist");
				if( obj.is(":hidden") ) obj.show();
		  });
		  
		  $('ul.navigationlist li').mouseleave(function(){
			  gIsFirstOver = 0;
			  setTimeout( function () { 
					if( $("#navigation .classlist li.on").length <= 0 && gIsFirstOver == 0) {
						$("#navigation .classlist").hide(); 
					}
			  }, 500 );
		  });
	}
	$(".classlist").slide({type:"menu", titCell:".classitem", targetCell:".subclass", delayTime:0, triggerTime:0, defaultPlay:false, returnDefault:true});
}

//右侧栏
function setSideBar(){
	if( $("#sidebar").length > 0 ){
		$("#sidebar_main").animate({right:0},800);
		$("#sidebar .gotop").click(function(){
			$('html, body').animate({scrollTop:0}, 'slow');
		});
		$("#sidebar_3 a").hover(function(){
			$(this).find("p").show();
			$(this).find("p").animate({right:35}, 'slow');
		},function(){
			$(this).find("p").animate({right:60}, 'slow');
			$(this).find("p").hide();
		});
	}
}

//设置电梯楼层
function setElevator(){
		if( $("#elevator").length > 0 ){ //只有首页才运行
			createElevator();
			$(window).scroll(function(e) { setElevatorPos(); });
			setElevatorPos();
			$('.elevatorlist').onePageNav({currentClass: 'current', changeHash: false, scrollSpeed: 750, scrollThreshold: 0.3});
	}
}

//创建楼层：格式：<li><a href="#floor_1"><span class="floorid">1F</span><span class="floorname">家电</span></a></li>
function createElevator(){
	var html = "";
	$(".floor").each(function(index) {
		var anthor = $(this).attr("id");  //#floor_1
		var id = $(this).find("h2 i").text();  //1F
		var title = $(this).attr("title");  //家电
		var n = index + 1;
		html += "<li><a class='n"+n+"' href='#"+anthor+"'><span class='floorid'>"+id+"</span><span class='floorname'>"+title+"</span></a></li>"
	});
	$("#elevator ul").append( html );
}

//自适应楼层位置
function setElevatorPos(){
	var offsetY = $("#floor_1").position().top - $(document).scrollTop();
	if( offsetY < 270 ){
		$("#elevator").show();
		var windowHeight = $(window).height();
		var wrapHeight = $("#elevator").height();
		var elevatorTop = (windowHeight-wrapHeight)/2+$(document).scrollTop();
		var elevatorLeft = $("#floor_1").offset().left - $("#elevator").width() - 10;
		$('#elevator').css({"left":elevatorLeft+"px", "top":elevatorTop+"px"});  
	}else{
		$("#elevator").hide();	
	}
}

//登录
function _showLogin(params){
	location.href = params.LoginUrl;
	/*
	layer.open({
		type: 2,  title: params.UserLogin, area: '450px', id:"dlgLogin",
		shift: -1, shade: 0.3,  skin: 'layui-layer-rim', content: [params.MemberLoginUrl,'no'],
		success: function(layero, index){ layer.iframeAuto(index); }
	});	
	*/
}

//注册
function _showReg(params){
	location.href = params.RegUrl;
	/*
	layer.open({
	     type: 2, title: params.UserReg,  area: '450px',
		 shift: -1, shade: 0.3,skin: 'layui-layer-rim', content: [params.MemberRegUrl,'no'],
		 success: function(layero, index){ layer.iframeAuto(index); }
	});	
	*/
}

//忘记密码
function _showForget(params){
	location.href = params.LoginUrl;
	/*
	parent.layer.open({
		type: 2, title: params.ForgetPassword, area: ['450px','280px'],
		shift: -1, shade: 0.3, skin: 'layui-layer-rim', content: params.MemberForgetUrl
	});	
	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index);
	*/
}
//====公共函数 结束====

//====购物车 开始====
//加入购物车(type:1 立即购买，2：加入购物车)
function _addCart(id, params, type){
	var url = params.AddCartUrl;
	var quantity = parseInt( $("#num"+id).val() );
	var valueid = "";
	$(".TypeAttribute .row .current").each(function() {
			valueid += $(this).attr("id")+",";
	});
	if( valueid != "") valueid = valueid.substr(0, valueid.length-1); 
	var p = {id:id, quantity: quantity, valueid: valueid};
	$.post(url, p, function(data){
		if(data.status == 1){
			setTotalItemCount(data.data["TotalItemCount"]);
			icon = 1;
			var content = "<div style='font-size:18px;'>"+data.info+"</div>";
		}else{
			icon = 0;
			var content = "<div style='font-size:18px;color:red;'>"+data.info+"</div>";
		}
		if(type==1){
			window.location.href = params.CartUrl;
		}else{
			layer.open({ type: 0, icon: icon, skin: 'layui-layer-rim', area: ['350px'], title: params.AddCart,
				  shade: 0.3, moveType: 1, shift: -1, content: content,
				  btn: [params.ViewCart, params.CartContinue],
				  yes: function(index, layero){
					  location.href = params.CartUrl;
				  },cancel: function(index){
					  layer.close(index);
				  }
			});
		}
	},"json");
}

//删除购物车产品
function _deleteCart(id, params){
	if( !confirm(params.DeleteConfirm)) return false;
	var p = {id:id};
	$(".cart"+id).remove();
	$.post(params.DeleteCartUrl, p, function(data){
		if(data.status==1){
			setTotalItemCount( data.data["TotalItemCount"]);
			setTotalPrice( data.data["TotalPrice"] );
			setEmptyText(data.data["TotalItemCount"]);
		}
	},"json");
}

//清空购物车
function _clearCart(params){
	$.post(params.ClearCartUrl, null, function(data){
		setTotalItemCount(0);
		setTotalPrice(0);
		setEmptyText(0);
	},"json");
}

//开始结算
function _startCheckout(params){
	$.get(params.JsonUrl, null, function(data){
			if( data['MemberID'] ){
				location.href = params.CheckoutUrl;
			}else{
				location.href = params.LoginUrl;
				//ShowLogin();
			}
	},"json");
}

//点击配送方式
function Shipping(price, cod){ SetShippingPrice(price); }

//设置配送费用
function SetShippingPrice(price){
	var Threshold = parseFloat( $(".ShippingPrice").attr("FreeShippingThreshold") ); 
	var TotalPrice = parseFloat($(".TotalPrice").text());  //商品总额
	if( Threshold > 0 && TotalPrice >= Threshold){  //免运费
		 $(".ShippingPrice").text("0.00");
	 }else{
		$(".ShippingPrice").text( toMoney(price) ); 
	 }
	ComputeOrderTotalPrice(); 
}

//支付手续费
function SetPayPrice(rate){  
	var total = parseFloat( $(".TotalPrice").text() );  //商品总额
	var shippingPrice = parseFloat( $(".ShippingPrice").text() );  //配送费用
	var PayPrice = toMoney(( total + shippingPrice ) * rate);  //支付手续费 = ( 商品总额 + 配送费用 ) * 支付比例
	$(".PayPrice").text( PayPrice ); 
	ComputeOrderTotalPrice(); 
}

//计算订单总额
function ComputeOrderTotalPrice(){
	var total = parseFloat($(".TotalPrice").text());  //商品总额
	var shippingPrice = parseFloat($(".ShippingPrice").text());  //配送费用
	var payPrice = parseFloat($(".PayPrice").text());  //支付手续费
	var couponPrice = parseFloat($(".CouponPrice").text());  //支付手续费
	var pointPrice = parseFloat($(".PointPrice").text());  //积分兑换减免
	
	if( isNaN(total) ) total = 0.0;
	if( isNaN(shippingPrice) ) shippingPrice = 0.0;
	if( isNaN(payPrice) ) payPrice = 0.0;
	if( isNaN(couponPrice) ) couponPrice = 0.0;
	if( isNaN(pointPrice) ) pointPrice = 0.0;
	var orderTotalPrice = toMoney(total + shippingPrice + payPrice + couponPrice + pointPrice);
	$(".OrderTotalPrice").text( orderTotalPrice );
}

//设置数量
function _quantity(id, n, type, params){
	var url = "";
	var p = ""; 
	switch(type){
		case 2:
			url = params.IncQuantityUrl;  p = {id:id};
			break;
		case 3:
			var quan = $("#Quantity"+id).val();
			if( quan <= 1 ) return;
			url = params.DecQuantityUrl;  p = {id:id};
			break;
		default:
			n = parseInt(n);
			if( isNaN(n) || n <= 0 ) return;
			url = params.SetQuantityUrl;  p = {id:id, quantity:n};
	}
	$.post(url, p, function(data){
		if(data.status==1){
			setQuantity(id, data.data["ProductQuantity"] );
			setTotalItemPrice(id, data.data["TotalItemPrice"] );
			setTotalItemCount( data.data["TotalItemCount"] );
			setTotalPrice( data.data["TotalPrice"] );
		}
	},"json");
}
function IncQuantity(id){  Quantity(id, 0, 2); }
function DecQuantity(id){ Quantity(id, 0, 3); }
function SetQuantity(id){  Quantity(id, $(".Quantity"+id).val(), 1); }
function DecNum(id){ 
	var stockCount = parseInt( $("#num"+id).attr("stockcount") );
	var n = parseInt( $("#num"+id).val() ); 
	n--; 
	if( n < 1 ) n = 1;
	if(n > stockCount) n = stockCount;
	$("#num"+id).val( n ); 
}
function IncNum(id){ 
	var stockCount = parseInt( $("#num"+id).attr("stockcount") );
	var n = parseInt( $("#num"+id).val() ); 
	n++; 
	if(n > stockCount) n = stockCount;
	$("#num"+id).val( n ); 
}

//设置商品种类数量
function setTotalItemCount(n){ $(".TotalItemCount").text( n ); }
//设置总金额
function setTotalPrice(n){  $(".TotalPrice").text( n ); }
//设置小计
function setTotalItemPrice(id, n){  $(".TotalItemPrice"+id).text( n ); }
//设置数量
function setQuantity(id, n){  $(".Quantity"+id).val( n ); }
//购物车为空时显示提示文字
function setEmptyText(total){
	if( total <= 0 ){
		$(".cart_table tbody tr").remove();
		$(".CartEmptyText").show();
		$(".cart_table tbody").hide(); //兼容firefox
	}else{
		$(".CartEmptyText").hide();
		$(".cart_table tbody").show(); //兼容firefox
	}
}
//4舍5入，转化为2位货币小数，不能直接使用toFixed，存在兼容性问题
function toMoney(num){
	var n = Math.round(num*100)/100;
	return n.toFixed(2);
}
//====购物车 结束====

//====jQZoom Version 2.2开始====
(function($){$.fn.jqueryzoom=function(options){var settings={xzoom:200,yzoom:200,offset:10,position:"right",lens:1,preload:1};if(options){$.extend(settings,options)}var noalt='';$(this).hover(function(){var imageLeft=$(this).offset().left;var imageTop=$(this).offset().top;var imageWidth=$(this).children('img').get(0).offsetWidth;var imageHeight=$(this).children('img').get(0).offsetHeight;noalt=$(this).children("img").attr("alt");var bigimage=$(this).children("img").attr("jqimg");$(this).children("img").attr("alt",'');if($("div.zoomdiv").get().length==0){$(this).after("<div class='zoomdiv'><img class='bigimg' src='"+bigimage+"'/></div>");$(this).append("<div class='jqZoomPup'>&nbsp;</div>")}if(settings.position=="right"){if(imageLeft+imageWidth+settings.offset+settings.xzoom>screen.width){leftpos=imageLeft-settings.offset-settings.xzoom}else{leftpos=imageLeft+imageWidth+settings.offset}}else{leftpos=imageLeft-settings.xzoom-settings.offset;if(leftpos<0){leftpos=imageLeft+imageWidth+settings.offset}}$("div.zoomdiv").css({top:imageTop,left:leftpos});$("div.zoomdiv").width(settings.xzoom);$("div.zoomdiv").height(settings.yzoom);$("div.zoomdiv").show();if(!settings.lens){$(this).css('cursor','crosshair')}$(document.body).mousemove(function(e){mouse=new MouseEvent(e);var bigwidth=$(".bigimg").get(0).offsetWidth;var bigheight=$(".bigimg").get(0).offsetHeight;var scaley='x';var scalex='y';if(isNaN(scalex)|isNaN(scaley)){var scalex=(bigwidth/imageWidth);var scaley=(bigheight/imageHeight);$("div.jqZoomPup").width((settings.xzoom)/scalex);$("div.jqZoomPup").height((settings.yzoom)/scaley);if(settings.lens){$("div.jqZoomPup").css('visibility','visible')}}xpos=mouse.x-$("div.jqZoomPup").width()/2-imageLeft;ypos=mouse.y-$("div.jqZoomPup").height()/2-imageTop;if(settings.lens){xpos=(mouse.x-$("div.jqZoomPup").width()/2<imageLeft)?0:(mouse.x+$("div.jqZoomPup").width()/2>imageWidth+imageLeft)?(imageWidth-$("div.jqZoomPup").width()-2):xpos;ypos=(mouse.y-$("div.jqZoomPup").height()/2<imageTop)?0:(mouse.y+$("div.jqZoomPup").height()/2>imageHeight+imageTop)?(imageHeight-$("div.jqZoomPup").height()-2):ypos}if(settings.lens){$("div.jqZoomPup").css({top:ypos,left:xpos})}scrolly=ypos;$("div.zoomdiv").get(0).scrollTop=scrolly*scaley;scrollx=xpos;$("div.zoomdiv").get(0).scrollLeft=(scrollx)*scalex})},function(){$(this).children("img").attr("alt",noalt);$(document.body).unbind("mousemove");if(settings.lens){$("div.jqZoomPup").remove()}$("div.zoomdiv").remove()});count=0;if(settings.preload){$('body').append("<div style='display:none;' class='jqPreload"+count+"'>sdsdssdsd</div>");$(this).each(function(){var imagetopreload=$(this).children("img").attr("jqimg");var content=jQuery('div.jqPreload'+count+'').html();jQuery('div.jqPreload'+count+'').html(content+'<img src=\"'+imagetopreload+'\">')})}}})(jQuery);function MouseEvent(e){this.x=e.pageX;this.y=e.pageY}
//====jQZoom Version 2.2 结束====

//====SuperSlide v2.1.1 开始====
!function(a){a.fn.slide=function(b){return a.fn.slide.defaults={type:"slide",effect:"fade",autoPlay:!1,delayTime:500,interTime:2500,triggerTime:150,defaultIndex:0,titCell:".hd li",mainCell:".bd",targetCell:null,trigger:"mouseover",scroll:1,vis:1,titOnClassName:"on",autoPage:!1,prevCell:".prev",nextCell:".next",pageStateCell:".pageState",opp:!1,pnLoop:!0,easing:"swing",startFun:null,endFun:null,switchLoad:null,playStateCell:".playState",mouseOverStop:!0,defaultPlay:!0,returnDefault:!1},this.each(function(){var c=a.extend({},a.fn.slide.defaults,b),d=a(this),e=c.effect,f=a(c.prevCell,d),g=a(c.nextCell,d),h=a(c.pageStateCell,d),i=a(c.playStateCell,d),j=a(c.titCell,d),k=j.size(),l=a(c.mainCell,d),m=l.children().size(),n=c.switchLoad,o=a(c.targetCell,d),p=parseInt(c.defaultIndex),q=parseInt(c.delayTime),r=parseInt(c.interTime);parseInt(c.triggerTime);var Q,t=parseInt(c.scroll),u=parseInt(c.vis),v="false"==c.autoPlay||0==c.autoPlay?!1:!0,w="false"==c.opp||0==c.opp?!1:!0,x="false"==c.autoPage||0==c.autoPage?!1:!0,y="false"==c.pnLoop||0==c.pnLoop?!1:!0,z="false"==c.mouseOverStop||0==c.mouseOverStop?!1:!0,A="false"==c.defaultPlay||0==c.defaultPlay?!1:!0,B="false"==c.returnDefault||0==c.returnDefault?!1:!0,C=0,D=0,E=0,F=0,G=c.easing,H=null,I=null,J=null,K=c.titOnClassName,L=j.index(d.find("."+K)),M=p=-1==L?p:L,N=p,O=p,P=m>=u?0!=m%t?m%t:t:0,R="leftMarquee"==e||"topMarquee"==e?!0:!1,S=function(){a.isFunction(c.startFun)&&c.startFun(p,k,d,a(c.titCell,d),l,o,f,g)},T=function(){a.isFunction(c.endFun)&&c.endFun(p,k,d,a(c.titCell,d),l,o,f,g)},U=function(){j.removeClass(K),A&&j.eq(N).addClass(K)};if("menu"==c.type)return A&&j.removeClass(K).eq(p).addClass(K),j.hover(function(){Q=a(this).find(c.targetCell);var b=j.index(a(this));I=setTimeout(function(){switch(p=b,j.removeClass(K).eq(p).addClass(K),S(),e){case"fade":Q.stop(!0,!0).animate({opacity:"show"},q,G,T);break;case"slideDown":Q.stop(!0,!0).animate({height:"show"},q,G,T)}},c.triggerTime)},function(){switch(clearTimeout(I),e){case"fade":Q.animate({opacity:"hide"},q,G);break;case"slideDown":Q.animate({height:"hide"},q,G)}}),B&&d.hover(function(){clearTimeout(J)},function(){J=setTimeout(U,q)}),void 0;if(0==k&&(k=m),R&&(k=2),x){if(m>=u)if("leftLoop"==e||"topLoop"==e)k=0!=m%t?(0^m/t)+1:m/t;else{var V=m-u;k=1+parseInt(0!=V%t?V/t+1:V/t),0>=k&&(k=1)}else k=1;j.html("");var W="";if(1==c.autoPage||"true"==c.autoPage)for(var X=0;k>X;X++)W+="<li>"+(X+1)+"</li>";else for(var X=0;k>X;X++)W+=c.autoPage.replace("$",X+1);j.html(W);var j=j.children()}if(m>=u){l.children().each(function(){a(this).width()>E&&(E=a(this).width(),D=a(this).outerWidth(!0)),a(this).height()>F&&(F=a(this).height(),C=a(this).outerHeight(!0))});var Y=l.children(),Z=function(){for(var a=0;u>a;a++)Y.eq(a).clone().addClass("clone").appendTo(l);for(var a=0;P>a;a++)Y.eq(m-a-1).clone().addClass("clone").prependTo(l)};switch(e){case"fold":l.css({position:"relative",width:D,height:C}).children().css({position:"absolute",width:E,left:0,top:0,display:"none"});break;case"top":l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+u*C+'px"></div>').css({top:-(p*t)*C,position:"relative",padding:"0",margin:"0"}).children().css({height:F});break;case"left":l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+u*D+'px"></div>').css({width:m*D,left:-(p*t)*D,position:"relative",overflow:"hidden",padding:"0",margin:"0"}).children().css({"float":"left",width:E});break;case"leftLoop":case"leftMarquee":Z(),l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+u*D+'px"></div>').css({width:(m+u+P)*D,position:"relative",overflow:"hidden",padding:"0",margin:"0",left:-(P+p*t)*D}).children().css({"float":"left",width:E});break;case"topLoop":case"topMarquee":Z(),l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+u*C+'px"></div>').css({height:(m+u+P)*C,position:"relative",padding:"0",margin:"0",top:-(P+p*t)*C}).children().css({height:F})}}var $=function(a){var b=a*t;return a==k?b=m:-1==a&&0!=m%t&&(b=-m%t),b},_=function(b){var c=function(c){for(var d=c;u+c>d;d++)b.eq(d).find("img["+n+"]").each(function(){var b=a(this);if(b.attr("src",b.attr(n)).removeAttr(n),l.find(".clone")[0])for(var c=l.children(),d=0;d<c.size();d++)c.eq(d).find("img["+n+"]").each(function(){a(this).attr(n)==b.attr("src")&&a(this).attr("src",a(this).attr(n)).removeAttr(n)})})};switch(e){case"fade":case"fold":case"top":case"left":case"slideDown":c(p*t);break;case"leftLoop":case"topLoop":c(P+$(O));break;case"leftMarquee":case"topMarquee":var d="leftMarquee"==e?l.css("left").replace("px",""):l.css("top").replace("px",""),f="leftMarquee"==e?D:C,g=P;if(0!=d%f){var h=Math.abs(0^d/f);g=1==p?P+h:P+h-1}c(g)}},ab=function(a){if(!A||M!=p||a||R){if(R?p>=1?p=1:0>=p&&(p=0):(O=p,p>=k?p=0:0>p&&(p=k-1)),S(),null!=n&&_(l.children()),o[0]&&(Q=o.eq(p),null!=n&&_(o),"slideDown"==e?(o.not(Q).stop(!0,!0).slideUp(q),Q.slideDown(q,G,function(){l[0]||T()})):(o.not(Q).stop(!0,!0).hide(),Q.animate({opacity:"show"},q,function(){l[0]||T()}))),m>=u)switch(e){case"fade":l.children().stop(!0,!0).eq(p).animate({opacity:"show"},q,G,function(){T()}).siblings().hide();break;case"fold":l.children().stop(!0,!0).eq(p).animate({opacity:"show"},q,G,function(){T()}).siblings().animate({opacity:"hide"},q,G);break;case"top":l.stop(!0,!1).animate({top:-p*t*C},q,G,function(){T()});break;case"left":l.stop(!0,!1).animate({left:-p*t*D},q,G,function(){T()});break;case"leftLoop":var b=O;l.stop(!0,!0).animate({left:-($(O)+P)*D},q,G,function(){-1>=b?l.css("left",-(P+(k-1)*t)*D):b>=k&&l.css("left",-P*D),T()});break;case"topLoop":var b=O;l.stop(!0,!0).animate({top:-($(O)+P)*C},q,G,function(){-1>=b?l.css("top",-(P+(k-1)*t)*C):b>=k&&l.css("top",-P*C),T()});break;case"leftMarquee":var c=l.css("left").replace("px","");0==p?l.animate({left:++c},0,function(){l.css("left").replace("px","")>=0&&l.css("left",-m*D)}):l.animate({left:--c},0,function(){l.css("left").replace("px","")<=-(m+P)*D&&l.css("left",-P*D)});break;case"topMarquee":var d=l.css("top").replace("px","");0==p?l.animate({top:++d},0,function(){l.css("top").replace("px","")>=0&&l.css("top",-m*C)}):l.animate({top:--d},0,function(){l.css("top").replace("px","")<=-(m+P)*C&&l.css("top",-P*C)})}j.removeClass(K).eq(p).addClass(K),M=p,y||(g.removeClass("nextStop"),f.removeClass("prevStop"),0==p&&f.addClass("prevStop"),p==k-1&&g.addClass("nextStop")),h.html("<span>"+(p+1)+"</span>/"+k)}};A&&ab(!0),B&&d.hover(function(){clearTimeout(J)},function(){J=setTimeout(function(){p=N,A?ab():"slideDown"==e?Q.slideUp(q,U):Q.animate({opacity:"hide"},q,U),M=p},300)});var bb=function(a){H=setInterval(function(){w?p--:p++,ab()},a?a:r)},cb=function(a){H=setInterval(ab,a?a:r)},db=function(){z||(clearInterval(H),bb())},eb=function(){(y||p!=k-1)&&(p++,ab(),R||db())},fb=function(){(y||0!=p)&&(p--,ab(),R||db())},gb=function(){clearInterval(H),R?cb():bb(),i.removeClass("pauseState")},hb=function(){clearInterval(H),i.addClass("pauseState")};if(v?R?(w?p--:p++,cb(),z&&l.hover(hb,gb)):(bb(),z&&d.hover(hb,gb)):(R&&(w?p--:p++),i.addClass("pauseState")),i.click(function(){i.hasClass("pauseState")?gb():hb()}),"mouseover"==c.trigger?j.hover(function(){var a=j.index(this);I=setTimeout(function(){p=a,ab(),db()},c.triggerTime)},function(){clearTimeout(I)}):j.click(function(){p=j.index(this),ab(),db()}),R){if(g.mousedown(eb),f.mousedown(fb),y){var ib,jb=function(){ib=setTimeout(function(){clearInterval(H),cb(0^r/10)},150)},kb=function(){clearTimeout(ib),clearInterval(H),cb()};g.mousedown(jb),g.mouseup(kb),f.mousedown(jb),f.mouseup(kb)}"mouseover"==c.trigger&&(g.hover(eb,function(){}),f.hover(fb,function(){}))}else g.click(eb),f.click(fb)})}}(jQuery),jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return 0==b?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(2==(b/=e/2))return c+d;if(g||(g=e*.3*1.5),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return 1>b?-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c:.5*h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),(b/=e/2)<1?d/2*b*b*(((f*=1.525)+1)*b-f)+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*7.5625*b*b+c:2/2.75>b?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:2.5/2.75>b?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(a,b,c,d,e){return e/2>b?.5*jQuery.easing.easeInBounce(a,2*b,0,d,e)+c:.5*jQuery.easing.easeOutBounce(a,2*b-e,0,d,e)+.5*d+c}});
//====SuperSlide v2.1.1 结束====

//====Lazy Load 1.9.1 开始====
/*! Lazy Load 1.9.1 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);
//====Lazy Load 1.9.1 结束====

//====jQuery One Page Nav Plugin version 3.0.0 开始====
!function(a,b,c){var e=function(d,e){this.elem=d,this.$elem=a(d),this.options=e,this.metadata=this.$elem.data("plugin-options"),this.$win=a(b),this.sections={},this.didScroll=!1,this.$doc=a(c),this.docHeight=this.$doc.height()};e.prototype={defaults:{navItems:"a",currentClass:"current",changeHash:!1,easing:"swing",filter:"",scrollSpeed:750,scrollThreshold:.5,begin:!1,end:!1,scrollChange:!1},init:function(){return this.config=a.extend({},this.defaults,this.options,this.metadata),this.$nav=this.$elem.find(this.config.navItems),""!==this.config.filter&&(this.$nav=this.$nav.filter(this.config.filter)),this.$nav.on("click.onePageNav",a.proxy(this.handleClick,this)),this.getPositions(),this.bindInterval(),this.$win.on("resize.onePageNav",a.proxy(this.getPositions,this)),this},adjustNav:function(a,b){a.$elem.find("."+a.config.currentClass).removeClass(a.config.currentClass),b.addClass(a.config.currentClass)},bindInterval:function(){var b,a=this;a.$win.on("scroll.onePageNav",function(){a.didScroll=!0}),a.t=setInterval(function(){b=a.$doc.height(),a.didScroll&&(a.didScroll=!1,a.scrollChange()),b!==a.docHeight&&(a.docHeight=b,a.getPositions())},250)},getHash:function(a){return a.attr("href").split("#")[1]},getPositions:function(){var c,d,e,b=this;b.$nav.each(function(){c=b.getHash(a(this)),e=a("#"+c),e.length&&(d=e.offset().top,b.sections[c]=Math.round(d))})},getSection:function(a){var b=null,c=Math.round(this.$win.height()*this.config.scrollThreshold);for(var d in this.sections)this.sections[d]-c<a&&(b=d);return b},handleClick:function(c){var d=this,e=a(c.currentTarget),f=e.parent(),g="#"+d.getHash(e);f.hasClass(d.config.currentClass)||(d.config.begin&&d.config.begin(),d.adjustNav(d,f),d.unbindInterval(),d.scrollTo(g,function(){d.config.changeHash&&(b.location.hash=g),d.bindInterval(),d.config.end&&d.config.end()})),c.preventDefault()},scrollChange:function(){var c,a=this.$win.scrollTop(),b=this.getSection(a);null!==b&&(c=this.$elem.find('a[href$="#'+b+'"]').parent(),c.hasClass(this.config.currentClass)||(this.adjustNav(this,c),this.config.scrollChange&&this.config.scrollChange(c)))},scrollTo:function(b,c){var d=a(b).offset().top;a("html, body").animate({scrollTop:d},this.config.scrollSpeed,this.config.easing,c)},unbindInterval:function(){clearInterval(this.t),this.$win.unbind("scroll.onePageNav")}},e.defaults=e.prototype.defaults,a.fn.onePageNav=function(a){return this.each(function(){new e(this,a).init()})}}(jQuery,window,document);
//====jQuery One Page Nav Plugin version 3.0.0 结束====

//====jqPaginator-1.2.0 开始====
!function(a){"use strict";a.jqPaginator=function(b,c){if(!(this instanceof a.jqPaginator))return new a.jqPaginator(b,c);var d=this;return d.$container=a(b),d.$container.data("jqPaginator",d),d.init=function(){(c.first||c.prev||c.next||c.last||c.page)&&(c=a.extend({},{first:"",prev:"",next:"",last:"",page:""},c)),d.options=a.extend({},a.jqPaginator.defaultOptions,c),d.verify(),d.extendJquery(),d.render(),d.fireEvent(this.options.currentPage,"init")},d.verify=function(){var a=d.options;if(!d.isNumber(a.totalPages))throw new Error("[jqPaginator] type error: totalPages");if(!d.isNumber(a.totalCounts))throw new Error("[jqPaginator] type error: totalCounts");if(!d.isNumber(a.pageSize))throw new Error("[jqPaginator] type error: pageSize");if(!d.isNumber(a.currentPage))throw new Error("[jqPaginator] type error: currentPage");if(!d.isNumber(a.visiblePages))throw new Error("[jqPaginator] type error: visiblePages");if(!a.totalPages&&!a.totalCounts)throw new Error("[jqPaginator] totalCounts or totalPages is required");if(!a.totalPages&&!a.totalCounts)throw new Error("[jqPaginator] totalCounts or totalPages is required");if(!a.totalPages&&a.totalCounts&&!a.pageSize)throw new Error("[jqPaginator] pageSize is required");if(a.totalCounts&&a.pageSize&&(a.totalPages=Math.ceil(a.totalCounts/a.pageSize)),a.currentPage<1||a.currentPage>a.totalPages)throw new Error("[jqPaginator] currentPage is incorrect");if(a.totalPages<1)throw new Error("[jqPaginator] totalPages cannot be less currentPage")},d.extendJquery=function(){a.fn.jqPaginatorHTML=function(b){return b?this.before(b).remove():a("<p>").append(this.eq(0).clone()).html()}},d.render=function(){d.renderHtml(),d.setStatus(),d.bindEvents()},d.renderHtml=function(){for(var b=[],c=d.getPages(),e=0,f=c.length;f>e;e++)b.push(d.buildItem("page",c[e]));d.isEnable("prev")&&b.unshift(d.buildItem("prev",d.options.currentPage-1)),d.isEnable("first")&&b.unshift(d.buildItem("first",1)),d.isEnable("statistics")&&b.unshift(d.buildItem("statistics")),d.isEnable("next")&&b.push(d.buildItem("next",d.options.currentPage+1)),d.isEnable("last")&&b.push(d.buildItem("last",d.options.totalPages)),d.options.wrapper?d.$container.html(a(d.options.wrapper).html(b.join("")).jqPaginatorHTML()):d.$container.html(b.join(""))},d.buildItem=function(b,c){var e=d.options[b].replace(/{{page}}/g,c).replace(/{{totalPages}}/g,d.options.totalPages).replace(/{{totalCounts}}/g,d.options.totalCounts);return a(e).attr({"jp-role":b,"jp-data":c}).jqPaginatorHTML()},d.setStatus=function(){var b=d.options;d.isEnable("first")&&1!==b.currentPage||a("[jp-role=first]",d.$container).addClass(b.disableClass),d.isEnable("prev")&&1!==b.currentPage||a("[jp-role=prev]",d.$container).addClass(b.disableClass),(!d.isEnable("next")||b.currentPage>=b.totalPages)&&a("[jp-role=next]",d.$container).addClass(b.disableClass),(!d.isEnable("last")||b.currentPage>=b.totalPages)&&a("[jp-role=last]",d.$container).addClass(b.disableClass),a("[jp-role=page]",d.$container).removeClass(b.activeClass),a("[jp-role=page][jp-data="+b.currentPage+"]",d.$container).addClass(b.activeClass)},d.getPages=function(){var a=[],b=d.options.visiblePages,c=d.options.currentPage,e=d.options.totalPages;b>e&&(b=e);var f=Math.floor(b/2),g=c-f+1-b%2,h=c+f;1>g&&(g=1,h=b),h>e&&(h=e,g=1+e-b);for(var i=g;h>=i;)a.push(i),i++;return a},d.isNumber=function(a){var b=typeof a;return"number"===b||"undefined"===b},d.isEnable=function(a){return d.options[a]&&"string"==typeof d.options[a]},d.switchPage=function(a){d.options.currentPage=a,d.render()},d.fireEvent=function(a,b){return"function"!=typeof d.options.onPageChange||d.options.onPageChange(a,b)!==!1},d.callMethod=function(b,c){switch(b){case"option":d.options=a.extend({},d.options,c),d.verify(),d.render();break;case"destroy":d.$container.empty(),d.$container.removeData("jqPaginator");break;default:throw new Error('[jqPaginator] method "'+b+'" does not exist')}return d.$container},d.bindEvents=function(){var b=d.options;d.$container.off(),d.$container.on("click","[jp-role]",function(){var c=a(this);if(!c.hasClass(b.disableClass)&&!c.hasClass(b.activeClass)){var e=+c.attr("jp-data");d.fireEvent(e,"change")&&d.switchPage(e)}})},d.init(),d.$container},a.jqPaginator.defaultOptions={wrapper:"",first:'<li class="first"><a href="javascript:;">First</a></li>',prev:'<li class="prev"><a href="javascript:;">Previous</a></li>',next:'<li class="next"><a href="javascript:;">Next</a></li>',last:'<li class="last"><a href="javascript:;">Last</a></li>',page:'<li class="page"><a href="javascript:;">{{page}}</a></li>',totalPages:0,totalCounts:0,pageSize:0,currentPage:1,visiblePages:7,disableClass:"disabled",activeClass:"active",onPageChange:null},a.fn.jqPaginator=function(){var b=this,c=Array.prototype.slice.call(arguments);if("string"==typeof c[0]){var d=a(b).data("jqPaginator");if(d)return d.callMethod(c[0],c[1]);throw new Error("[jqPaginator] the element is not instantiated")}return new a.jqPaginator(this,c[0])}}(jQuery);
//====jqPaginator-1.2.0 结束====

/*====scrool插件 开始====*/
;(function($) {
	$.fn.scrollFix = function(options) {
		return this.each(function() {
			var opts = $.extend({}, $.fn.scrollFix.defaultOptions, options);
			var obj = $(this),
				base = this,
				selfTop = 0,
				selfLeft = 0,
				toTop = 0,
				parentOffsetLeft = 0,
				parentOffsetTop = 0,
				outerHeight,
				outerWidth,
				objWidth = 0,
				placeholder = jQuery('<div>'), //创建一个jquery对象
				optsTop = opts.distanceTop, //定义到顶部的高度
				endfix = 0; //开始停止固定的位置

			var originalPosition;
			var originalOffsetTop;
			var originalZIndex;
			var lastOffsetLeft = -1;
			var isUnfixed = true;
			//如果没有找到节点，不进行处理
			if (obj.length <= 0) {
				return;
			}
			if (lastOffsetLeft == -1) {
				originalZIndex = obj.css('z-index');
				position = obj.css('position');
				originalPosition = obj.css('position');

				originalOffsetTop = obj.css('top');
			}

			var zIndex = obj.css('zIndex');
			if (opts.zIndex != 0) {
				zIndex = opts.zIndex;
			}
			//获取相对定位或者绝对定位的父类
			var parents = obj.parent();
			var Position = parents.css('position');
			while (!/^relative|absolute$/i.test(Position)) { //检测浮动元素的父类元素定位为'relative'或者'absolute',是的话退出，否则的话，执行循环，继续寻找它的父类
				parents = parents.parent();
				Position = parents.css('position');
				if (/^body|html$/i.test(parents[0].tagName)) break; //假如父类元素的标签为body或者HTML，说明没有找到父类为以上的定位，退出循环
			}

			var ie6 = !-[1, ] && !window.XMLHttpRequest; //兼容IE6
			var resizeWindow = false;

			function resetScroll() {
				setUnfixed();
				selfTop = obj.offset().top; //对象距离顶部高度
				selfLeft = obj.offset().left; //对象距离左边宽度
				outerHeight = obj.outerHeight(); //对象高度
				outerHeight = parseFloat(outerHeight) + parseFloat(obj.css('marginBottom').replace(/auto/, 0));
				outerWidth = obj.outerWidth(); //对象外宽度
				objWidth = obj.width();
				var documentHeight = $(document).height(); //文档高度
				var startTop = $(opts.startTop), //开始浮动固定对象
					startBottom = $(opts.startBottom),
					toBottom, //停止滚动位置距离底部的高度
					ScrollHeight; //对象滚动的高度

				//计算父类偏移值
				if (/^body|html$/i.test(parents[0].tagName)) { //当父类元素非body或者HTML时，说明找到了一个父类为'relative'或者'absolute'的元素，得出它的偏移高度
					parentOffsetTop = 0, parentOffsetLeft = 0;
				} else {
					parentOffsetLeft = parents.offset().left, parentOffsetTop = parents.offset().top;
				}

				// 计算父节点的上边到顶部距离
				// 如果 body 有 top 属性, 消除这些位移
				var bodyToTop = parseInt(jQuery('body').css('top'), 10);
				if (!isNaN(bodyToTop)) {
					optsTop += bodyToTop;
				}
				//计算停在底部的距离
				if (!isNaN(opts.endPos)) {
					toBottom = opts.endPos;
				} else {
					toBottom = parseFloat(documentHeight - $(opts.endPos).offset().top);
				}
				//计算需要滚动的高度以及停止滚动的高度
				ScrollHeight = parseFloat(documentHeight - toBottom - optsTop), endfix = parseFloat(ScrollHeight - outerHeight);
				//计算顶部的距离值
				if (startTop[0]) {
					var startTopOffset = startTop.offset(),
						startTopPos = startTopOffset.top;
					selfTop = startTopPos;
				}
				if (startBottom[0]) {
					var startBottomOffset = startBottom.offset(),
						startBottomPos = startBottomOffset.top,
						startBottomHeight = startBottom.outerHeight();
					selfTop = parseFloat(startBottomPos + startBottomHeight);
				}

				toTop = selfTop - optsTop;
				toTop = (toTop > 0) ? toTop : 0;

				var selfBottom = documentHeight - selfTop - outerHeight;
				//如果滚动停在底部的值不为0，并且自身到底部的高度小于上面这个值，不执行浮动固定
				if ((toBottom != 0) && (selfBottom <= toBottom)) {
					return;
				}

			}
			function setUnfixed() {
				if (!isUnfixed) {
					lastOffsetLeft = -1;
					placeholder.css("display", "none");
					obj.css({
						'z-index': originalZIndex,
						'width': '',
						'position': originalPosition,
						'left': '',
						'top': originalOffsetTop,
						'margin-left': ''
					});
					obj.removeClass('scrollfixed');
					isUnfixed = true;
				}
			}

			function onScroll() {
				lastOffsetLeft = 1;
				var ScrollTop = $(window).scrollTop();
				if (opts.bottom != -1) {
					ScrollTop = ScrollTop + $(window).height() - outerHeight - opts.bottom;
				}
				if (ScrollTop > toTop && (ScrollTop < endfix)) {
					if (ie6) { //IE6则使用这个样式
						obj.addClass(opts.baseClassName).css({
							"z-index": zIndex,
							"position": "absolute",
							"top": opts.bottom == -1 ? ScrollTop + optsTop - parentOffsetTop : ScrollTop - parentOffsetTop,
							"bottom": 'auto',
							"left": selfLeft - parentOffsetLeft,
							'width': objWidth
						})
					} else {
						obj.addClass(opts.baseClassName).css({
							"z-index": zIndex,
							"position": "fixed",
							"top": opts.bottom == -1 ? optsTop : '',
							"bottom": opts.bottom == -1 ? '' : opts.bottom,
							"left": selfLeft,
							"width": objWidth
						});
					}
					placeholder.css({
						'height': outerHeight,
						'width': outerWidth,
						'display': 'block'
					}).insertBefore(obj);
				} else if (ScrollTop >= endfix) {
					obj.addClass(opts.baseClassName).css({
						"z-index": zIndex,
						"position": "absolute",
						"top": endfix - parentOffsetTop + optsTop,
						'bottom': '',
						"left": selfLeft - parentOffsetLeft,
						"width": objWidth
					});
					placeholder.css({
						'height': outerHeight,
						'width': outerWidth,
						'display': 'block'
					}).insertBefore(obj)
				} else {
					obj.removeClass(opts.baseClassName).css({
						"z-index": originalZIndex,
						"position": "static",
						"top": "",
						"bottom": "",
						"left": ""
					});
					placeholder.remove()
				}
			}
			var Timer = 0;
			// if (isUnfixed) {
			resetScroll();
			// }
			$(window).on("scroll", function() {
				if (Timer) {
					clearTimeout(Timer);
				}
				Timer = setTimeout(onScroll, 0);
			});
			// 当发现调整屏幕大小时，重新执行代码
			$(window).on("resize", function() {
				if (Timer) {
					clearTimeout(Timer);
				}
				Timer = setTimeout(function() {
					isUnfixed = false;
					resetScroll();
					onScroll();
				}, 0);
			});
		})
	}
	$.fn.scrollFix.defaultOptions = {
		startTop: null, //滑到这个位置顶部时开始浮动，默认为空
		startBottom: null, //滑到这个位置末端开始浮动，默认为空
		distanceTop: 0, //固定在顶部的高度
		endPos: 0, //停靠在底部的位置，可以为jquery对象
		bottom: -1, //底部位置
		zIndex: 0, //z-index值
		baseClassName: 'scrollfixed' //开始固定时添加的类
	};
})(jQuery);
/*====scrool插件 结束====*/

