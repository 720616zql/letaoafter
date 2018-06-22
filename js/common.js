$(function(){

	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});
$.ajaxSetup({crossDomain: true, xhrFields: {withCredentials: true}});

var app = {
	baseUrl:'http://fullstack.net.cn:3000'
}

$.fn.serializeToJson = function () {

  var formAry = this.serializeArray();

  // var result = {username:'zhangsan', password:123123}
  var result = {};

  formAry.forEach(function (item) {
    result[item.name] = item.value;
  });

  return result;
}

//封装获取浏览器地址栏数据函数  
function getUrlParams () {
  //获取哈希值 浏览器？后面的内容  并截取？后面 
    var search = location.search.slice(1);
  //?id=123&name=zhangsan&age=21
    var arr1 = search.split('&');
  // 数组形式 内存在多个数据
  for (var i = 0; i<arr1.length; i++) {
    var arr2 = arr1[i].split('=');
    if (arr2[0]== name) {
      return arr2[1];
    } 
  }
  return -1;
}