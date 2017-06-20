$(function(){
	
	
	var goodsArr = [];
	
	$(".clickDetaile").on("click",".hoveract",function(){
		
		var index = $(this).index(".hoveract");

		//获取到点击的商品
		var obj = goodsArr[index];		

//		location.href = "details.html?" + obj.id;
		window.open("details.html?" + obj.id,'target','');
		
	})
	
	
	
	$(".buy_conutie,.close_box").click(function(){
		
		$(".index_cart_box").css("display","none");
		
	})


	
	
	//动态创建节点
	$.get("php/json/goods.json",function(data){		
		
		
//		JSON.parse(data);
//		goodsArr = JSON.parse(data);
		goodsArr = data;
		//新品
		for(var i=0;i<4;i++){
			var obj = data[i];
			var li = $("<li></li>");
			$(".news-main").append(li);
			li.addClass("hoveract");
			var div1 = $("<div></div>");
			div1.addClass("news-main-thing");
			li.append(div1);
			div1.append("<a href='#'><img src="+obj.img[0]+"/></a>")
			var h4 = $("<h4>"+obj.title+"</h4>");
			div1.append(h4);
			var p =  $("<p>"+obj.details+"</p>");
			div1.append(p);
			var div2 = $("<div>￥"+obj.price+".00</div>");
			div2.addClass("price");
			div1.append(div2);
			var div3 = $("<div>加入购物车</div>");
			div3.addClass("add-cart");			
			div1.append(div3);	
		}
		
		//四季1
		for(var i=4;i<6;i++){
			var obj = data[i];
			var li = $("<li></li>");
			$(".season-right ul").append(li);
			li.addClass("season-item hoveract");
			var div1 = $("<div></div>");
			div1.addClass("news-main-thing");
			li.append(div1);
			div1.append("<a href='#'><img src="+obj.img[0]+"/></a>")
			var h4 = $("<h4>"+obj.title+"</h4>");
			div1.append(h4);
			var p =  $("<p>"+obj.details+"</p>");
			div1.append(p);
			var div2 = $("<div>￥"+obj.price+".00</div>");
			div2.addClass("price");
			div1.append(div2);
			var div3 = $("<div>加入购物车</div>");
			div3.addClass("add-cart");			
			div1.append(div3);
		}
		
		//四季2
		for(var i=6;i<10;i++){
			var obj = data[i];
			var li = $("<li></li>");
			$(".season-list").append(li);
			li.addClass("season-item hoveract");
			var div1 = $("<div></div>");
			div1.addClass("news-main-thing");
			li.append(div1);
			div1.append("<a href='#'><img src="+obj.img[0]+"/></a>")
			var h4 = $("<h4>"+obj.title+"</h4>");
			div1.append(h4);
			var p =  $("<p>"+obj.details+"</p>");
			div1.append(p);
			var div2 = $("<div>￥"+obj.price+".00</div>");
			div2.addClass("price");
			div1.append(div2);
			var div3 = $("<div>加入购物车</div>");
			div3.addClass("add-cart");			
			div1.append(div3);
		}
		
		
		//特价
		for(var i=10;i<15;i++){
			var obj = data[i];
			var li = $("<li></li>");
			$(".sales-list").append(li);
			li.addClass("sales-item hoveract");
			var div1 = $("<div></div>");
			div1.addClass("sales-thing");
			li.append(div1);
			div1.append("<a href='#'><img src="+obj.img[0]+"/></a>")
			var h4 = $("<h4>"+obj.title+"</h4>");
			div1.append(h4);			
			var div2 = $("<div>￥"+obj.price+".00</div>");
			div2.addClass("price");
			div1.append(div2);
			var div3 = $("<div>加入购物车</div>");
			div3.addClass("add-cart");			
			div1.append(div3);	
		}
		
	
	})
	




	/*----------banner轮播----------*/
	$.get("php/json/index_banner.json",function(data){
		for(var i = 0;i<data.length;i++){
			var obj = data[i];
			var li= $("<li></li>");
			var li2= $("<li>"+(i+1)+"</li>");
			
			$(".banner-list").append(li);
			$(".banner-list-point").append(li2);
			$(li).append("<img src="+obj.src+" alt="+"/>");						
		}
		$(".banner-list-point li").eq(0).addClass("active");
		$(".banner-list").append($(".banner-list li").eq(0).clone(true));
		$(".banenr-list").width(data.length*$(".banner-list li").width());
		var list_point_width = $(".banner-list-point").width();
		
		$(".banner-list-point").css("left",(1366-list_point_width)/2);
		var i = 0;
		var timer = setInterval(function(){
			i++;
			moveImg();				
		},3000)
		
		function moveImg(){
			if(i<0){
				$(".banner-list").css("left",-($(".banner-list li").size()-1)*$(".banner-list li").width())
				i = $(".banner-list li").size()-2;
			}
			if(i>$(".banner-list li").size()-1){
				$(".banner-list").css("left",0);
				i=1;
			}
			$(".banner-list").stop().animate({"left":-i*$(".banner-list li").width()});	
			$(".banner-list-point li").eq(i).addClass("active").siblings().removeClass("active");
			if(i==$(".banner-list li").size()-1){
				$(".banner-list-point li").eq(0).addClass("active").siblings().removeClass("active");
			}
		}				
		
		$(".banner-list-point li").mouseenter(function(){
			var index = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			i = index;
			moveImg();
		})
		
		$(".index-banenr").mouseenter(function(){
			clearInterval(timer);
		})
		$(".index-banenr").mouseleave(function(){
			timer = setInterval(function(){
				i++;
				moveImg();				
			},3000)
		})
		
	})
	
	
	/*----------子导航栏----------*/
	$(".list-item").mouseenter(function(){
		$(this).find(".more-list-main").css("display","block");
		$("#nav-box").css("display","block");
	})
	$(".list-item").mouseleave(function(){
		$(this).find(".more-list-main").css("display","none");
		$("#nav-box").css("display","none");
	})
	

	/*----------sales特价前一个后一个----------*/
	$(".sales-prev").click(function(e){
		e.preventDefault();
		var x= $(".sales-item").width()+10;		
		var li = $(".sales-item").eq(4).clone();
		$(".sales-list").stop().animate({left:x},1000,function(){
			$(".sales-item").eq(4).detach();
			$(".sales-list").css("left",0);			
			$(".sales-list").prepend(li);
		});		
	})
	$(".sales-next").click(function(e){
		e.preventDefault();
		var x= -($(".sales-item").width()+10);		
		var li = $(".sales-item").eq(0).clone();
		$(".sales-list").stop().animate({left:x},1000,function(){
			$(".sales-item").eq(0).detach();
			$(".sales-list").css("left",0);			
			$(".sales-list").append(li);
		});		
	})


	/*----------注册框获取焦点----------*/
	$(".signup-zc input").focus(function(){
		$(this).css("border","1px solid #00bad6")
	})
	$(".signup-zc input").blur(function(){
		$(this).css("border","1px solid #e1e1e1")
	})


	/*----------随机验证码----------*/
	function yzmF(){
		var num = 0;
		var str = "";
		for(i=0;i<4;i++){
			var n = parseInt(Math.random()*100000)%3;
			switch(n){
				case 0:
				num = parseInt(Math.random()*100000)%10+48;
				break;
				case 1:
				num = parseInt(Math.random()*100000)%26+65;
				break;
				case 2:
				num = parseInt(Math.random()*100000)%26+97;
				break;
			}
			str = str.concat(String.fromCharCode(num));
		}
		$(".yanzm i").html(str);
	}
	yzmF();	
	$(".yanzm i,.yanzm a").click (function(){
		yzmF();
	});
	
	
	//用户名验证方法
	function checkName(){
		var nameFlag = false;
		var username = $(".username input").val();
		var reg = /^([a-zA-z]\w{3,15})|(1\d{10})|(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
		var reg1 = /^([a-zA-z]\w{3,15})$/;
		var reg2 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		var reg3 = /^(1\d{10})$/;
		if(reg.test(username)){
			$(".username p").css("display","none");
			return nameFlag = true;
		}else{			
			$(".username p").css("display","block");
			return nameFlag;
		}
	}
	//验证码核对方法
	function checkYzm(){
		var yzmFlag = false;
		var yzminput = $(".yanzm input").val().toLowerCase();
		var yzmval = $(".yanzm i").html().toLowerCase();
		if(yzminput==yzmval){
			$(".yanzm p").css("display","none");
			return yzmFlag = true;
		}else{
			$(".yanzm p").css("display","block");
			return yzmFlag;
		}
	}
	
	
	//支付密码验证方法
	/*
	function checkPaypwd(){
		var payFlag = false;
		var paypassword = $(this).val();
		var reg = /^(1\d{5})$/;
		if(reg.test(paypassword)){
			$(".pay-password p").css("display","none");
			return payFlag = true;
		}else{
			$(".pay-password p").css("display","block");
			return payFlag;
		}
	}
	*/
	
	
	//登入密码验证方法
	function checkPwd(){
		var pwdFlag = false;
		var psword = $(".password input").val();
		var reg = /^[a-zA-Z0-9]{6,20}$/;
		if(reg.test(psword)){
			$(".password p").css("display","none");
			return pwdFlag = true;
		}else{
			$(".password p").css("display","block");
			return pwdFlag;
		}
	}
	//确认登入密码验证方法
	function checkRepwd(){
		var repwdFlag = false;
		var repsword = $(".re-password input").val();
		var psword = $(".password input").val();
		if(repsword ==psword){
			$(".re-password p").css("display","none");
			return repwdFlag = true;
		}else{
			$(".re-password p").css("display","block");
			return repwdFlag;
		}
	}
	
	/*----------注册验证----------*/
	
	//用户名验证
	$(".username input").blur(function(){
		
		checkName();
	})
	
	/*----------验证码核对----------*/
	$(".yanzm input").blur(function(){
		
		checkYzm();
	})
	
	/*----------支付密码验证----------*/
//	$(".pay-password input").blur(function(){
//		checkPaypwd();
//	})
	
	/*----------登入密码验证----------*/
	$(".password input").blur(function(){
		
		checkPwd();
	})
	
		
	/*----------确认登入密码验证----------*/
	$(".re-password input").blur(function(){
		checkRepwd();
	})
	
	/*----------确认注册----------*/
	$(".signup-submit").click(function(e){
		nameFlag = checkName();
		yzmFlag = checkYzm();
		pwdFlag = checkPwd();
		repwdFlag = checkRepwd();
		e.preventDefault();
		if($("#checki").prop("checked")){
			$(".checkinfo p").css("display","none");
			if(nameFlag&&yzmFlag&&pwdFlag&&repwdFlag){
//				console.log("所有通过验证");
				//获取输入框中的用户名和密码
				var username = $(".username input").val();
				var pwd = $(".password input").val();
				
				//第一次获取"users"的cookie值会是undefined
				var arr = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
//				console.log(arr);
				
				//遍历arr
				var isExist = false; //表示是否存在相同的用户名
				for (var i=0; i<arr.length; i++){
					//如果存在相同的用户名
					if(username == arr[i].username){
						$(".haveinfo").css("display","block");						
						isExist = true; //存在相同用户名
					}
				}
				
				//如果不存在相同的用户名, 则可以注册
				if (!isExist){
					$(".haveinfo").css("display","none")
					yzmF();	
					var obj = {
						username: username,
						pwd: pwd
					};		
					arr.push(obj);
					
					$.cookie("users", JSON.stringify(arr), {expires:30, path:"/"});
//					console.log( $.cookie("users") );
				}			
			}
			else{				
				checkName();
				checkYzm();
				checkPwd();			
			}
		}else{
			$(".checkinfo p").css("display","block");
			checkName();
			checkYzm();
			checkPwd();
		}
		
	})
	/*----------登录----------*/
	$(".login-submit").click(function(e){
		e.preventDefault();
		//登录
		
		var username = $(".login-username input").val();
		var pwd = $(".login-password input").val();
		
		//获取cookie中的users(注册的所有用户)
		var users = $.cookie("users");
		
		//如果存在已经注册的用户
		if (users) {
			users = JSON.parse(users); //json解析
			if($(".yanzm input").val()==$(".yanzm i").html().toLowerCase()){
				//遍历数组users
				var isLoginSuccess = false; //是否登录成功
				for (var i=0; i<users.length; i++){
					//如果用户名和密码都匹配成功, 则表示登录成功
			
					if (username==users[i].username && pwd==users[i].pwd) {
						
						$(".login-erro .erro").css("background","#0ee975");
						$(".login-erro .erro").html("√");
						$(".login-erro p").html("登录成功，欢迎"+username+"！");
						$(".login-erro").fadeIn();
						var timer = setInterval(function(){
							$(".login-erro").fadeOut();
							yzmF();
							clearInterval(timer);						
							
							$(window).load(index.html);
						},3000);
						isLoginSuccess = true; //表示登录成功
						location.href = "index.html";
					}
				}
				//没有找到匹配的用户名和密码, 登录不成功
				if (!isLoginSuccess){
					$(".login-erro .erro").css("background","#e44d10");
					$(".login-erro .erro").html("!");
					$(".erro-box p").html("用户名或密码输入有误!");
					$(".login-erro").fadeIn();
					var timer = setInterval(function(){
						$(".login-erro").fadeOut();
						yzmF();
						clearInterval(timer);						
						$(".login-username input").focus();
						
					},3000);
				}
			}else{
				$(".login-erro .erro").css("background","#e44d10");
				$(".login-erro .erro").html("!");
				$(".erro-box p").html("验证码不正确");
				$(".login-erro").fadeIn();
				var timer = setInterval(function(){
					$(".login-erro").fadeOut();
					clearInterval(timer);
					$(".yanzm input").focus();
				},3000)
				
			}
		}
		else {
			console.log("你还没有注册过用户, 请先注册一个");
		}
	})
	
	/*----------侧边栏----------
	 -------------------------------------------------*/
	
	$(".fix-main-car").click(function(){
		var x = parseInt($("#fix-main").css("right"));
		$(".fix-main-love").css("background-color","#000");
		if(x==0){
			x = -320;
			console.log(x);
			$(this).css("background-color","#000");
		}else{
			x = 0;
			$(this).css("background-color","#00BBD7");
		}
		$("#fix-main").stop().animate({right:x})
	})
	
	$(".fix-main-love").click(function(){
		var x = parseInt($("#fix-main").css("right"));
		$(".fix-main-car").css("background-color","#000");
		if(x==0){
			x = -320;
			console.log(x);
			$(this).css("background-color","#000");
		}else{
			x = 0;
			$(this).css("background-color","#00BBD7");
		}
		$("#fix-main").stop().animate({right:x})
	})

	$(".fix-com").hover(
		function(){
			$(this).css("background-color","#00BBD7")
	},
		function(){
			$(this).css("background-color","#000")
	})
	
	

	//侧边导航--楼梯
	var isMoving = false;
	$("#louti li").click(function(){
		$(this).css("background","#00BBD7").siblings().css("background","#626262");
		var index = $(this).index();
		var y = $(".main-common").eq(index).offset().top;
		isMoving = true;
		$("html,body").stop().animate({"scrollTop":y},500,function(){
			isMoving = false;
		});					
	});
	
	
	//top点击回到顶部
	$(window).scroll(function(){
		var yScroll = $(window).scrollTop();
		if(isMoving == false){
			var index = 0;
			$(".main-common").each(function(){
				var yTop = $(this).offset().top-80;				
				if(yScroll>=yTop){
					index = $(this).index();
				}							
			})
			$("#louti li").eq(index).css("background","#00BBD7").siblings().css("background","#626262");						
		}
		if(yScroll>$(".main-common").eq(0).offset().top-201){
			$("#louti").show();
		}else{
			$("#louti").hide();			
		}
	});

	$(".fix-main-top").click(function(){
		
		$("html,body").stop().animate({"scrollTop":0},1000);
		
	})
	
	//点击跳转购物车
	$(".car-bar,.go_cart").click(function(){	
		window.open("myCart.html",'target','');	
	})
	
	/*-------------------------------------------------
	 ------侧边栏购物车------*/
	//数组checkArr: 保存每个商品的选中状态
	var checkArr = []; //元素如果是true则表示选中, false则表示未选中
	
	//初始化checkArr
	var arr2 = $.cookie("cart");

//	console.log(checkArr);


	refresh();
	updateAllCheked();


	//刷新购物车数据
	function refresh(){
		
		//获取cookie中购物车的商品
		var cartTotalNum = 0;
		var cartsArr = $.cookie("cart")?JSON.parse($.cookie("cart")):[];
		if (cartsArr.length!=0) {
	
//			cartsArr = JSON.parse(cartsArr); //json解析	
			//清除旧的节点
			$(".my-cart ul").empty();	
			//添加新的节点
			//遍历cartsArr
			var total = 0; //总价
			var cart_checkNum = 0;
			for (var i=0; i<cartsArr.length; i++) {
				var obj = cartsArr[i];
				cartTotalNum += (obj.num-0)
				//创建节点
				var li = $("<li></li>").appendTo(".my-cart ul");
				$("<div class='cart_title'><p>"+obj.title+"</p></div>").appendTo(li);
				
				//根据checkArr来判断当前的勾选状态
				if (checkArr[i]) {
					$("<input class='fix_check' type='checkbox' checked='checked'/>").appendTo(li);
				}
				else {
					$("<input class='fix_check' type='checkbox'/>").appendTo(li);
				}
				
				var div = $("<div class='about_goods'><img src="+obj.img[0]+"/></div>").appendTo(li);
				$("<div class='about_p'></div>").appendTo(div);
				$("<div class='goods_num'><a class='num_sub' href='#'>-</a><input type='text' value="+obj.num+"><a class='num_add' href='#'>+</a></div>").appendTo(div);
				$("<div class='goods_price'>"+(obj.price-0)*obj.num+".00</div>").appendTo(div);
				$("<div class='del_goods'></div>").appendTo(li);				
				
				
				//计算总价
				if (checkArr[i]){ //如果是选中的
					cart_checkNum++;
					total += obj.price * obj.num;
				}
			}
			
			
			
			
//			for(var j=0;j<arr2.length;j++){
//				if(arr2[j]==true){
//					cart_checkNum++;
//				}							
//			}
					
			$(".bottom_total p").find("b").html(cart_checkNum);
			//显示总价
			$(".bottom_total p").find("i").html("￥"+total+".00");

		}else{
			$(".my-cart ul").empty();
			$(".bottom_total p").find("b").html("0");
			//显示总价
			$(".bottom_total p").find("i").html("￥0.00");
		}
		$(".fix-main-car-num").html(cartTotalNum);
	
	}

	
	//勾选
	$(".my-cart ul").on("click", ".fix_check", function(){
		var index = $(this).index(".fix_check");
//		console.log(index);
		
		//切换选中状态
		checkArr[index] = !checkArr[index];
		console.log(checkArr);
		
		//判断是否全选
		updateAllCheked();
		
		//刷新
		refresh();
	})
	
	//全选
	$(".all_chose").click(function(){
//		console.log( $(this).prop("checked") );
		
		//全选
		if ( $(this).prop("checked") ){
			$.each(checkArr, function(i) {    
				 checkArr[i] = true;                          
			});
			$(".all_chose").prop("checked",true)
		}
		else {
			$.each(checkArr, function(i) {    
				 checkArr[i] = false;                          
			});
			$(".all_chose").prop("checked",false)
		}
		
		//刷新
		refresh();
	})

	
	
	
	//-
	$(".my-cart").on("click", ".num_sub",function(){
		//对应'-'按钮的下标
		var index = $(this).index(".num_sub");
//		console.log("- :" + index);
		
		//获取cookie
		var arr = JSON.parse( $.cookie("cart") );
		arr[index].num--; //把数组中的第index个商品的num--
		
		//如果数量小于等于0, 则删除该商品
		if (arr[index].num <= 0) {
			arr.splice(index, 1); //删除
			checkArr.splice(index, 1); //删除checkArr中对应的数据
			updateAllCheked(); //更改全选按钮的状态
		}
		
		//重新把数组arr保存到cookie中
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
//		console.log( $.cookie("cart") );
		
		//刷新
		refresh();
	})
	
	//+ 
	$(".my-cart").on("click", ".num_add", function(){
		var index = $(this).index(".num_add");
		
		//获取cookie
		var arr = JSON.parse( $.cookie("cart") );
		arr[index].num++;
		
		//重新把数组arr保存到cookie中
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
//		console.log( $.cookie("cart") );
		
		//刷新
		refresh();
	})
	
	//删除
	$(".my-cart").on("click", ".del_goods", function(){
		var index = $(this).index(".del_goods");
		
		//获取cookie
		var arr = JSON.parse( $.cookie("cart") );
		arr.splice(index, 1); //删除
		checkArr.splice(index, 1); //删除checkArr中对应的数据
		updateAllCheked(); //更改全选按钮的状态
		
		//重新把数组arr保存到cookie中
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
//		console.log( $.cookie("cart") );
		
		//刷新
		refresh();
	})
	

	
	
	
	
	
	//更改全选状态
	function updateAllCheked(){
		var sum = 0;
		$.each(checkArr, function(index, value) {    
			sum += value;                                                  
		});
		
		if (sum == checkArr.length) {
			$(".all_chose").prop("checked", true); //全选
		}
		else {
			$(".all_chose").prop("checked", false); //不全选
		}
	}
 

	$(".clickDetaile").on("click",".add-cart",function(e){
		
		e.stopPropagation();	
		var index = $(this).index(".add-cart");
//		console.log(index);
		
		//获取到点击的商品		
		var obj = goodsArr[index];		
		//使用cookie保存购物车商品信息
		var cartarr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];		
		//判断购物车中是否存在该商品, 如果存在则把数量增加, 否则添加该新商品
		var isExist = false; //表示是否存在相同商品
		for (var i=0; i<cartarr.length; i++){
			if (obj.id == cartarr[i].id) { //存在相同的商品			
				cartarr[i].num++; //将数量++
				isExist = true;			
				break;
			}
		}

		//如果不存在, 否则添加该新商品
		if (!isExist) {
			//将新商品加入数组中
			obj.num = 1; //商品数量			
			cartarr.push(obj);			
		}
		
		console.log(cartarr);
//		$(".fix-main-car-num").html(addCart_num);
		
		//重新将数组arr保存到cookie中
		$.cookie("cart", JSON.stringify(cartarr), {expires:30, path:"/"} );
//		console.log( $.cookie("cart") );
		
		$(".about_add_goods").find("img").attr("src",obj.img[0]);
		$(".about_add_goods p").find("span").html(obj.title);
		$(".about_add_goods p").find("i").html(obj.unit+obj.price);
	
		$(".index_cart_box").css("display","block");

		//初始化checkArr
		var arr2 = $.cookie("cart");
		if (arr2){
			arr2 = JSON.parse(arr2);
			$.each(arr2, function() {    
				 checkArr.push(true); //默认都是选中状态                                                    
			});
		}
		console.log(arr2.length)
		//判断是否全选
		updateAllCheked();
		
		//刷新
		refresh();

	})


})
