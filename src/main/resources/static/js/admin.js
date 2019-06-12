/**
 * tab菜单
 * */

layui.use(['element', 'layer', 'jquery'], function(){
    var element = layui.element;
    var $ = layui.$;
    CustomRightClick(); //给tab绑定右击事件

    //触发事件
    var active = {
        //在这里给active绑定几项事件，后面可通过active调用这些事件
        tabAdd: function(url,id,name) {
            //新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
            //关于tabAdd的方法所传入的参数可看layui的开发文档中基础方法部分
            element.tabAdd('demo', {
                title: name,
                content: '<iframe data-frameid="'+id+'" scrolling="auto" frameborder="0" src="'+url+'" style="width:100%;height:99%;"></iframe>',
                id: id //规定好的id
            });
            CustomRightClick(); //给tab绑定右击事件
            FrameWH();  //计算ifram层的大小
        },
        tabChange: function(id) {
            //切换到指定Tab项
            element.tabChange('demo', id); //根据传入的id传入到指定的tab项
        },
        tabDelete: function (id) {
            element.tabDelete("demo", id);//删除
        }
        , tabDeleteAll: function (ids) {//删除所有
            $.each(ids, function (i,item) {
                element.tabDelete("demo", item); //ids是一个数组，里面存放了多个id，调用tabDelete方法分别删除
            })
        }
    };

    //当点击有site-demo-active属性的标签时，即左侧菜单栏中内容 ，触发点击事件
    $(document).on('click','.site-demo-active', function() {
        var dataid = $(this);
        //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
        if ($(".layui-tab-title li[lay-id]").length <= 0) {
            //如果比零小，则直接打开新的tab项
            active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"),dataid.attr("data-title"));
        } else {
            //否则判断该tab项是否以及存在

            var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
            $.each($(".layui-tab-title li[lay-id]"), function () {
                //如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
                if ($(this).attr("lay-id") == dataid.attr("data-id")) {
                    isData = true;
                }
            });
            if (isData == false) {
                //标志为false 新增一个tab项
                active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"),dataid.attr("data-title"));
            }
        }
        //最后不管是否新增tab，最后都转到要打开的选项页面上
        active.tabChange(dataid.attr("data-id"));
    });

    //lay绑定右键插件
    function CustomRightClick() {
        $(".demo").remove();
        layui.config({
            base: 'module/',
        }).use(['tabrightmenu'], function () {
            var rightmenu_ = layui.tabrightmenu;

            // 默认方式渲染全部：关闭当前（closethis）、关闭所有（closeall）、关闭其它（closeothers）、关闭左侧所有（closeleft）、关闭右侧所有（closeright）、刷新当前页（refresh）
            rightmenu_.render({
                container: '#nav1',
                filter: 'demo',
            });
        });
    }

    // $(".rightmenu li").click(function () {
    //
    //     //右键菜单中的选项被点击之后，判断type的类型，决定关闭所有还是关闭当前。
    //     if ($(this).attr("data-type") == "closethis") {
    //         //如果关闭当前，即根据显示右键菜单时所绑定的id，执行tabDelete
    //         active.tabDelete($(this).attr("data-id"))
    //     } else if ($(this).attr("data-type") == "closeall") {
    //         var tabtitle = $(".layui-tab-title li");
    //         var ids = new Array();
    //         $.each(tabtitle, function (i) {
    //             ids[i] = $(this).attr("lay-id");
    //         })
    //         //如果关闭所有 ，即将所有的lay-id放进数组，执行tabDeleteAll
    //         active.tabDeleteAll(ids);
    //     }
    //
    //     $('.rightmenu').hide(); //最后再隐藏右键菜单
    // });
    function FrameWH() {
        var h = $(window).height() -41- 10 - 60 -10-44 -10;
        $("iframe").css("height",h+"px");
    }

    $(window).resize(function () {
        FrameWH();
    });

    //监听选项卡切换
    element.on('tab(demo)', function(data){
        // console.log(this); //当前Tab标题所在的原始DOM元素
        // console.log(data.index); //得到当前Tab的所在下标
        // console.log(data.elem); //得到当前的Tab大容器
        // console.log($(this).attr("lay-id"));
        var id = $(this).attr("lay-id");
        $(".site-demo-active").each(function(index,e){

            if ($(this).hasClass("layui-nav-itemed")){
                $(this).removeClass("layui-nav-itemed");
                $(this).parent().removeClass("layui-this");
            }
            if (id == $(e).attr("data-id")){
                console.log($(".site-demo-active").hasClass("layui-nav-itemed"));
                $(this).addClass("layui-nav-itemed");
                $(this).parent().addClass("layui-this");
                $(this).parent().parent().parent().addClass("layui-nav-itemed");
            }
        });

    });
});





