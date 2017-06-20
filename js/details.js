$(function(){

	/*----------子导航栏----------*/
	$(".list-item").mouseenter(function(){
		$(this).find(".more-list-main").css("display","block");
		$("#nav-box").css("display","block");
	})
	$(".list-item").mouseleave(function(){
		$(this).find(".more-list-main").css("display","none");
		$("#nav-box").css("display","none");
	})
	


	//放大镜
	var smallImg  = $(".smallImg");
	var smallArea  = $(".smallArea");
	var bigImg  = $(".bigImg");
	var bigArea  = $(".bigArea");
	
	smallArea.width( smallImg.width()/bigImg.width() * bigArea.width() );
	smallArea.height( smallImg.height()/bigImg.height() * bigArea.height() );
	
	//放大系数/放大倍数
	var scale = bigImg.width()/smallImg.width(); 
	//4
	
	
	//mousemove
	smallImg.mousemove(function(e){
		
		smallArea.show(); //显示小区域
		bigArea.show();
		var x = e.pageX - smallImg.offset().left -smallArea.width()/2;
		var y = e.pageY - smallImg.offset().top -smallArea.height()/2;
		
		//判断不超出左边界
		if (x <= 0) {
			x = 0;
		}
		else if (x >= smallImg.width()-smallArea.width()){ //不超出右边界
			x = smallImg.width()-smallArea.width();
		}
		//判断不超出上边界
		if (y <= 0) {
			y = 0;
		}
		else if (y >= smallImg.height()-smallArea.height()) {
			y = smallImg.height()-smallArea.height();
		}
		 
		smallArea.css({left:x, top:y}); //移动小区域
		
		//移动大图
		bigImg.css({left:-scale*x, top:-scale*y});
	})
	
	//mouseleave
	smallImg.mouseleave(function(){
		smallArea.hide(); //隐藏小区域
		bigArea.hide();
	})

	


	//得到从index页面传入的商品id
	var goodsId = location.search.slice(1);

	//获取本地的goods.json中所有商品数据

	$.get("php/json/goods.json", function(data){

		var arr = data;
		for (var i=0; i<arr.length; i++){
			var obj = arr[i]; //每个商品的数据
			if (goodsId == obj.id) {
				showInfo(obj);
			}
		}
	})


	function showInfo(obj){
		$(".thisGoods").html(obj.title);
		$("title").html(obj.title)
		var imgArr = obj.img;
		$(".smallImg").find("img").attr("src",imgArr[0]);
		$(".bigImg").attr("src",imgArr[0]);
		for(var i = 0;i<imgArr.length;i++){
			
			$("<li><div class='imgActive'><img src="+imgArr[i]+"/></div></li>").appendTo(".goodsImgs");
		
		}
		$(".goodsId").find("span").html(obj.id);
		$(".this_title").html(obj.title);
		$(".this_price").find("span").html(obj.price);
		$(".goods_about").html(obj.details);
	}

	$(".goodsImgs").on("mouseenter","li",function(){
		
		var imgsrc = $(this).find("img").attr("src");
		
		$(".smallImg").find("img").attr("src",imgsrc);
		$(".bigImg").attr("src",imgsrc);
		
	})

		/*-------------------------------------------------
	 ------侧边栏购物车------*/
		//数组checkArr: 保存每个商品的选中状态
	var checkArr = []; //元素如果是true则表示选中, false则表示未选中
	
	//初始化checkArr
	var arr2 = $.cookie("cart");
	if (arr2){
		arr2 = JSON.parse(arr2);
		$.each(arr2, function() {    
			 checkArr.push(true); //默认都是选中状态                                                    
		});
	}
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
					
					total += obj.price * obj.num;
				}
			}
			
			
			
			
			var cart_checkNum = 0;
			for(var j=0;j<checkArr.length;j++){
				if(checkArr[j]==true){
					cart_checkNum++;
//					console.log(cart_checkNum);
				}							
			}
					
			$(".bottom_total p").find("b").html(cart_checkNum);
			//显示总价
			$(".bottom_total p").find("i").html("￥"+total+".00");

		}else{
			$(".my-cart ul").empty();
		}
		$(".fix-main-car-num").html(cartTotalNum);
	
	}

	
	//勾选
	$(".my-cart ul").on("click", ".fix_check", function(){
		var index = $(this).index(".fix_check");
//					console.log(index);
		
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
	

	$(".add-cart").click(function(){
		$.get("php/json/goods.json", function(data){
			var arr = data;
			for (var i=0; i<arr.length; i++){
				var obj = arr[i]; //每个商品的数据
				if (goodsId == obj.id) {
					//使用cookie保存购物车商品信息
					var cartarr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];		
					//判断购物车中是否存在该商品, 如果存在则把数量增加, 否则添加该新商品
					var isExist = false; //表示是否存在相同商品
					for (var i=0; i<cartarr.length; i++){
						if (obj.id == cartarr[i].id) { //存在相同的商品			
							cartarr[i].num +=($("#thisNum").val()-0); //将数量++
							isExist = true;			
							break;
						}
					}
			
					//如果不存在, 否则添加该新商品
					if (!isExist) {
						//将新商品加入数组中
						obj.num = ($("#thisNum").val()-0); //商品数量			
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
			
					//判断是否全选
					updateAllCheked();
					
					//刷新
					refresh();
				}
			}
		})

		
	})


	$(".buy_conutie,.close_box").click(function(){
		
		$(".index_cart_box").css("display","none");
		
	})

	$(".count_sub").click(function(e){
		e.preventDefault();
		var nowNum = $("#thisNum").val()-0;
		if(nowNum<=1){
			nowNum = 1;
		}else{
			nowNum--;
		}
		$("#thisNum").val(nowNum);
	})
	
	$(".count_add").click(function(e){
		e.preventDefault();
		var nowNum = $("#thisNum").val()-0;
		nowNum++;
		$("#thisNum").val(nowNum);
	})

})