$(function(){
	
	//动态创建节点
	$.get("php/json/goods.json",function(data){		
		
		
//		JSON.parse(data);
//		goodsArr = JSON.parse(data);
		goodsArr = data;
		//新品
		for(var i=0;i<goodsArr.length;i++){
			var obj = data[i];
			var li = $("<li></li>");
			li.appendTo(".maybe_love_list");
			var div1 = $("<div><img src="+obj.img[0]+"/></div>");
			div1.addClass("goods_img");
			var div2 = $("<div></div>");
			div2.addClass("p_info");
			var p1 = $("<p></p>");
			p1.html(obj.title);
			p1.addClass("info_title");
			var p2 = $("<p></p>");
			p2.addClass("info_price");
			p2.html("￥"+obj.price);
			div1.appendTo(li);
			div2.appendTo(li);
			p1.appendTo(div2);
			p2.appendTo(div2);
			$("<a href='#'>加入购物车</a>").appendTo(div2);
	
		}	
	})
	

	$(".maybe_love_list").on("click","li",function(){
		
		var index = $(this).index(".maybe_love_list li");

		//获取到点击的商品
		var obj = goodsArr[index];		

//		location.href = "details.html?" + obj.id;
		window.open("details.html?" + obj.id,'target','');

	})


	$(".maybe_love_list").on("click","a",function(e){
		var addCart_num = 0;
		e.stopPropagation();
		var index = $(this).index(".maybe_love_list a");
		console.log(index);
		
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
	
		//重新将数组arr保存到cookie中
		$.cookie("cart", JSON.stringify(cartarr), {expires:30, path:"/"} );
//		console.log( $.cookie("cart") );
		refresh();
	})




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
		
		var cartsArr = $.cookie("cart")?JSON.parse($.cookie("cart")):[];
		if (cartsArr.length!=0) {
	
			$(".cart_none").css("display","none");
			$(".cart_main").css("display","block");
//			cartsArr = JSON.parse(cartsArr); //json解析	
			//清除旧的节点
			$(".goods_cart tbody").empty();	
			//添加新的节点
			//遍历cartsArr
			var total = 0; //总价
			for (var i=0; i<cartsArr.length; i++) {
				var obj = cartsArr[i];
				//创建节点
				var tr = $("<tr></tr>").appendTo(".goods_cart tbody");
				var td1 = $("<td></td>").appendTo(tr);
				var td2 = $("<td colspan='2'></td>").appendTo(tr);
				var td3 = $("<td></td>").appendTo(tr);
				var td4 = $("<td></td>").appendTo(tr);
				var td5 = $("<td></td>").appendTo(tr);
				var td6 = $("<td></td>").appendTo(tr);
				var td7 = $("<td></td>").appendTo(tr);
				var td8 = $("<td></td>").appendTo(tr);
				//根据checkArr来判断当前的勾选状态
				if (checkArr[i]) {
					$("<input class='cart_check' type='checkbox' checked='checked'/>").appendTo(td1);
					total += obj.price * obj.num;
					var p3 = $("<p>"+obj.unit+(obj.price-0)*obj.num+".00</p>").appendTo(td6);
				}
				else {
					$("<input class='cart_check' type='checkbox'/>").appendTo(td1);
					var p3 = $("<p>￥0.00</p>").appendTo(td6);
				}
				var div1 = $("<div><img src="+obj.img[0]+"></div>").appendTo(td2);
				div1.addClass("cart_goods_img");
				var div2 = $("<div><a herf='#'>"+obj.title+"</a></div>").appendTo(td2);
				div2.addClass("cart_goods_title");
				var p1 = $("<p>"+obj.unit+obj.price+".00</p>").appendTo(td3);
				p1.addClass("cart_goods_price");
				var p2 = $("<p>￥0.00</p>").appendTo(td4);
				p2.addClass("cart_goods_disprice");
				var div3 = $("<div></div>").appendTo(td5);
				div3.addClass("cart_num_box");
				var div4 = $("<div><a class='num_sub' href='#'>-</a><input type='text' value="+obj.num+"><a class='num_add' href='#'>+</a></div>").appendTo(div3);
				div4.addClass("cart_goods_num");
				$("<span>有货</span>").appendTo(div3);
				
				p3.addClass("cart_goods_addprice");
				var p4 = $("<p>-</p>").appendTo(td7);
				p4.addClass("cart_goods_jf");
				$("<div class='cart_play'><a class='addlove' href='#'>收藏</a>|<a class='delcart' href='#'>删除</a></div>").appendTo(td8);
				
			
				
			}
			
			$(".all_num").html(cartsArr.length);
			
			var cart_checkNum = 0;
			for(var j=0;j<checkArr.length;j++){
				if(checkArr[j]==true){
					cart_checkNum++;
//					console.log(cart_checkNum);
				}							
			}
					
			$(".check_num").html(cart_checkNum);
			//显示总价
			$(".total_price").html("￥"+total+".00");

		}else{
			$(".cart_none").css("display","block");
			$(".cart_main").css("display","none");
		}
	}

	
	//勾选
	$(".goods_cart").on("click", ".cart_check", function(){
		var index = $(this).index(".cart_check");
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
	$(".allCheck").click(function(){
//		console.log( $(this).prop("checked") );
		
		//全选
		if ( $(this).prop("checked") ){
			$.each(checkArr, function(i) {    
				 checkArr[i] = true;                          
			});
			$(".allCheck").prop("checked",true)
		}
		else {
			$.each(checkArr, function(i) {    
				 checkArr[i] = false;                          
			});
			$(".allCheck").prop("checked",false)
		}
		
		//刷新
		refresh();
	})

	
	//删除选中
	$("#delSelect").click(function(){
		
		//获取cookie
		var arr = JSON.parse( $.cookie("cart") );
		
		var newArr = []; //保存不删除的商品
		var newCheckArr = []; //保存不删除的商品对应的选中状态
		for (var i=0; i<arr.length; i++){
			if (!checkArr[i]) { //如果不选中
				newArr.push(arr[i]);
				newCheckArr.push(checkArr[i]);
			}
		}
		checkArr = newCheckArr;
		
		//重新存储到cookie
		$.cookie("cart", JSON.stringify(newArr), {expires:30, path:"/"});
		
		//刷新
		refresh();
	})
	
	
	//-
	$(".goods_cart").on("click", ".num_sub",function(){
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
	$(".goods_cart").on("click", ".num_add", function(){
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
	$(".goods_cart").on("click", ".delcart", function(){
		var index = $(this).index(".delcart");
		
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
			$(".allCheck").prop("checked", true); //全选
		}
		else {
			$(".allCheck").prop("checked", false); //不全选
		}
	}

	
	
	
	
	
	
	
})
