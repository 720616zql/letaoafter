$(function () {
	$.ajax({
		type:'get',
		url:`${app.baseUrl}/category/querySecondCategoryPaging`,
		data: {
			page: 1,
			pageSize: 10
		},
		success: function (response) {
			// console.log(response);
			var html = template('categorySecondTpl', {
				list:response,
				api:app.baseUrl
			});
			$('#categorySecondBox').html(html);
		}		
	})
	// 添加二级分类  根据一级分类的id 发送并渲染
	$.ajax({
		type:'get',
		url:`${app.baseUrl}/category/queryTopCategoryPaging`,
		data: {
			page: 1,
			pageSize: 1010000
		},
		success: function (response) {
			console.log(response);
			var html = template('categoryFirstTpl', response);
			$('#categoryFirstBox').html(html);
		}		
	})

	//引爆第三步
	var brandLogo = '';
	$('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {
	    	console.log(data);
	    	// 存储图片地址
	    	brandLogo = data._response.result.picAddr;
	    	// 拼接图片url
	    	var imgUrl= app.baseUrl + data._response.result.picAddr;
	    	// 将图片渲染到页面中
	     	$("#imgPreview").attr("src",imgUrl);
	    }
	});


	// 点击保存 发送数据当前二级页面数据和一级页面对应id   刷新
	$('#seave').on('click', function () {
		// alert(1);
		var brandName = $('#erji').val();
		console.log(brandName);
		var categoryId = $('#categoryFirstBox').val();
		console.log(categoryId);
		console.log(brandLogo);
		var hot = 1;
		$.ajax({
			type:'post',
			url:`${app.baseUrl}/category/addSecondCategory`,
			data: {
				brandName,
				categoryId,
				hot,
				brandLogo
			},
			success:function (response) {
				console.log(response);
				if (response.success) {
					location.reload();
				} else {
					alert(response.message);
				}
			}
		})
	})
})
