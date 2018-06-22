$(function () {
	// alert(1)
	var page = 1;
	var pagesize = 10;
	var toalsize = 0;
	sendajax();
	$('#prveBtn').on('click', function () {
		// alert(1);
		page--;
		if (page < 1) {
			page = 1;
			alert('第一页');
			return;
		}
		sendajax();
	})
	$('#nextBtn').on('click', function () {
		// alert(1);
		page++;

		if (page > toalsize) {
			page = toalsize;
			alert('已经到底了');
			return;
		}
		sendajax();
	})

	// 发送请求  获取数据
	function sendajax() {
		$.ajax({
			type:'get',
			url:`${app.baseUrl}/category/queryTopCategoryPaging`,
			data: {
				page:page,
				pageSize:pagesize
			},
			success :function (response) {
				console.log(response);
				if (response.error) {
					location.href='login.html';
				} else {
					var html = template('categroyFirstTpl', response);
					$('#categroyFirstBox').html(html);
				}
				
				toalsize = Math.ceil(response.total/pagesize);
			}
		})
	}

	$('#baocun').on('click', function () {
		// alert(1);
		var categoryName = $.trim($('#categoryName').val());
		if (!categoryName) {
			alert('请添加内容');
			return;
		} else {
			$.ajax({
				type:'post',
				url:`${app.baseUrl}/category/addTopCategory`,
				data: {
					categoryName
				},
				success: function (response) {
					if (response.success) {
						location.reload();
					} else {
						alert(response.message);
					}
				}
			})
		}

	})
})

