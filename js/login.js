$(function () {
	// alert(1);
	$('#loginBtn').on('click', function () {
		var result = $('#loginForm').serializeToJson();
		console.log(result);
		if (!$.trim(result.username)) {
			alert('用户名不能为空');
			return;
		}
		if (!$.trim(result.password)) {
			alert('请输入密码');
			return;
		}
		// 发送请求
		$.ajax ({
			type: 'post',
			url: `${app.baseUrl}/employee/employeeLogin`,
			data: result,
			// dataType:
			success: function (response) {
				if (response.success) {
					location.href = 'user.html';
				} else {
					alert(response.message)
				}
			}

		})
	})
})