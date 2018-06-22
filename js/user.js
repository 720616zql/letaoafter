//判断是否登录
$.ajax({
	type:'get',
	asynx:false,
	url:`${app.baseUrl}/employee/checkRootLogin`,
	success: function (response) {
		if (response.error) {
			location.href = 'login.html';
		}
	}
})
$(function () {
	// alert(1);
	//查询用户 并展示
	$.ajax({
		type:'get',
		url: `${app.baseUrl}/user/queryUser`,
		data: {
			page:1,
			pageSize:100
		},
		success: function (response) {
			console.log(response);
			var html = template('userTpl', response);
			$('#userBox').html(html);
		}	
	})
	$('#userBox').on('click', '.changeStatus', function () {
		var id = $(this).data('user-id');
		// var isdelete = $(this).attr('data-user-isdelete');
		var isDelete = $(this).data('user-isdelete');
		console.log(id);
		console.log(isDelete);
		$.ajax({
			type: 'post',
			url: `${app.baseUrl}/user/updateUser`,
			data: {
				id: id,
				isDelete: isDelete == 1 ? 0 : 1
			},
			success: function (response) {
				console.log(response);
				console.log(isDelete);
				if (response.success) {
					location.reload();
				}else {
					alert(response.message);
				}
			}
		})
	})
})