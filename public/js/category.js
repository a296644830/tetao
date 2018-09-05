$(function(){
    var letao=new Letao();
    //调用初始化区域的方法
    letao.initScroll();
    letao.getCategory();
    letao.getBrand();
    letao.getBrandData(1);



})



var Letao=function(){

};

Letao.prototype={
      //初始化区域滚动
      initScroll: function() {
        //获取区域滚动的父容器调用初始化方法  里面可以传一些配置参数
        mui('.mui-scroll-wrapper').scroll({
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: true, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
        });
    },

    //获取左边导航数据
    getCategory:function(){
        $.ajax({
            url:'/category/queryTopCategory',
            success:function(obj){
                // console.log(obj)
                var html=template('tep',obj);
                $('.variety').html(html);

            }
        })
    },
    

    // 点击左侧分类 获取分类的品牌数据
    getBrand:function(){
        var that=this;
        // console.log(that)

        $('.variety').on('tap','li a',function(){
            console.log(this)
            var id=$(this).data('id');
            console.log(id)
            that.getBrandData(id);
            $(this).parent().addClass('active').siblings().removeClass('active');
            
        })

    },

    //获取品牌数据
    getBrandData:function (id) {
        // 4. 调用ajax根据分类的id去获取品牌的数据
        $.ajax({
            url:'/category/querySecondCategory',
            data:{'id':id},//这个API需要传参数
            success:function (data) {
                console.log(data)
                // 5. 调用模板刷新右侧品牌的数据
                var html = template('brandTmp',data);
                // 6. 把生成的模板放到右侧的品牌的mui-row容器里面
                $('.naike').html(html);
            }
        })
    }
    
   
}

