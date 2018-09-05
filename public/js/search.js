$(function () {
    var letao = new Letao();
    //调用添加搜索历史记录的方法
    letao.addHistory();
    // 调用查询搜索记录方法
    letao.queryHistory();
    //调用删除历史记录的方法
    letao.removeHistory();
    //调用清空历史记录的方法
    letao.clearHistory();

})



var Letao = function () {

}
Letao.prototype = {
    //添加搜索记录
    addHistory: function () {
        var that = this;
        //1.给按钮添加点击事件
        $('.btn').on('tap', function () {
            //2.获取当前输入的搜索文本
            var search = $('.inp').val();
            // console.log(word)

            //点击搜索时清空输入框
            $('.inp').val("")
            //3.如果输入为空提示用户输入
            if (!search) {
                alert('请输入搜索内容')
            }

            //定义一个对象保存当前储存的搜索记录
            var searchObj = {
                id: 1,
                search: search,
            }

            var historyList = JSON.parse(localStorage.getItem('historyList')) || [];
            if (historyList.length > 0) {
                searchObj.id = historyList[historyList.length - 1].id + 1;
            }
            historyList.push(searchObj);
            localStorage.setItem('historyList', JSON.stringify(historyList));

            that.queryHistory();

        })

    },
    //查询搜索历史记录
    queryHistory:function () {
		// 1. 获取本地存储的数组 如果本地存储没有值就默认为空
		var historyList = JSON.parse(localStorage.getItem('historyList')) || [];
		// 如果需要按照最新的搜索的内容在最前面显示
		historyList = historyList.reverse();
		// 2. 调用模板生成html
        var html = template('tmp',{'rows':historyList});
        console.log(html)
		// 3. 把生成 html放到历史记录的ul里面
		$('.zzzz').html(html);
    },


    	//删除搜索历史记录
	removeHistory:function () {
		var that = this;
		// 1. 给所有的x添加点击事件
		$('.zzzz').on('tap','.del',function () {
			// 2. 获取当前点击的x对应要删除的id
			var id = $(this).data('id');
			// 3. 获取本地存储的数组
			var historyList = JSON.parse(localStorage.getItem('historyList')) || [];
			// 4. 从数组中删除id和当前点击x的id一致的值
			//5. 循环变量这个数组
			for (var i = 0; i < historyList.length; i++) {
				// 6. 判断数组的每一个值的id 和 当前要删除的id一致的值
				if(historyList[i].id == id){
					// 7. 从数组中删除这个值 splice是删除数组中的一个值 第一个参数是删除的索引第二个参数是往后删几个
					historyList.splice(i,1);
				}
			}
			// 8. 删除完成后要把删除后的数组保存到本地存储中
			localStorage.setItem('historyList',JSON.stringify(historyList));
			// 9.删除后如果需要刷新列表 调用查询方法
			that.queryHistory();
		})
    },

    	//清空历史记录
	clearHistory:function () {
		var that = this;
		// 1. 给清空按钮添加单击事件
		$('.empty').on('tap',function () {
			// 2. 给本地存储的值清空 删除掉整个历史记录的键
			localStorage.removeItem('historyList');
			// 3. 清空完成调用查询刷新页面
			that.queryHistory();
		});
	}

}