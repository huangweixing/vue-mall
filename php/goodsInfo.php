<?php

//服务器支持跨域
header('Access-Control-Allow-Origin: *');

//从前端获取到商品id
$goodsId = $_GET["goodsId"];

//获取goods.json中的内容
$goodsContents = file_get_contents("json/goods.json");


$arr = json_decode($goodsContents); //json解析, 把json格式的字符串转换成对象(数组)
//json_encode(); //json序列化

for ($i=0; $i<count($arr); $i++){
    $obj = $arr[$i]; //每个商品的数据
    if ($goodsId == $obj->id){
        echo json_encode($obj); //返回对应的商品信息
    }
}


