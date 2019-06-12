/**
 * 菜单
 * */
//获取路径uri
var pathUri=window.location.href;

// console.log("pathUrl:"+pathUri);
$(function(){
    layui.use(['element', 'layer', 'jquery'], function(){
        var element = layui.element;
        var $ = layui.$;

        // 左侧导航区域（可配合layui已有的垂直导航）
        $.get("/auth/getUserPerms",function(data){
            if(data!=null){
                getMenus(data);
                element.render('nav');
            }else{
                layer.alert("权限不足，请联系管理员",function () {
                    //退出
                    window.location.href="/logout";
                });
            }
        });


    });
});

function getMenus(data){
    //回显选中
    var ul=$("<ul class='layui-nav layui-nav-tree' lay-filter='test'></ul>");
    for(var i=0;i < data.length;i++){
        var node=data[i];
        if( node.istype==0){
            if(node.pId==0){
                var li=$("<li class='layui-nav-item' flag='"+node.id+"'></li>");
                //父级无page
                var a=$("<a class='' href='javascript:;'><i class='layui-icon "+node.icon+"'></i><cite style='margin-left:10px;'>"+node.name+"</cite></a>");
                li.append(a);
                //获取子节点
                var childArry = getParentArry(node.id, data);
                if(childArry.length>0){
                    a.append("<span class='layui-nav-more'></span>");
                    var dl=$("<dl class='layui-nav-child'></dl>");
                    for (var y in childArry) {
                        var dd=$("<dd><a href='javascript:;' data-id='"+childArry[y].id+"' data-title='"+childArry[y].name+
                            "' data-url='"+childArry[y].page+"' class='site-demo-active' data-type='tabAdd'  style='padding-left: 40px;'>" +
                            "<i class='layui-icon "+childArry[y].icon+"'><cite style='margin-left:10px;'>"+childArry[y].name+"</cite></a></dd>");
                        //判断选中状态
                        // if(pathUri.indexOf(childArry[y].page)>0){
                        //     li.addClass("layui-nav-itemed");
                        //     dd.addClass("layui-this")
                        // }
                        if (0 == i) {
                            li.addClass("layui-nav-itemed");
                            dd.addClass("layui-this")
                        }
                        //TODO 由于layui菜单不是规范统一的，多级菜单需要手动更改样式实现；
                        dl.append(dd);
                    }
                    li.append(dl);
                }
                ul.append(li);
            }
        }
    }
    $(".layui-side-scroll").append(ul);
};

//根据菜单主键id获取下级菜单
//id：菜单主键id
//arry：菜单数组信息
function getParentArry(id, arry) {
    var newArry = new Array();
    for (var x in arry) {
        if (arry[x].pId == id)
            newArry.push(arry[x]);
    }
    return newArry;
}


var isShow = true;  //定义一个标志位
$('.layadmin-flexible').click(function(){
    alert();
    //选择出所有的span，并判断是不是hidden
    $('.layui-nav-item span').each(function(){
        if($(this).is(':hidden')){
            $(this).show();
        }else{
            $(this).hide();
        }
    });
    //判断isshow的状态
    if(isShow){
        $('.layui-side.layui-bg-black').width(60); //设置宽度
        $('.kit-side-fold i').css('margin-right', '70%');  //修改图标的位置
        //将footer和body的宽度修改
        $('.layui-body').css('left', 60+'px');
        $('.layui-footer').css('left', 60+'px');
        //将二级导航栏隐藏
        $('dd span').each(function(){
            $(this).hide();
        });
        //修改标志位
        isShow =false;
    }else{
        $('.layui-side.layui-bg-black').width(200);
        $('.kit-side-fold i').css('margin-right', '10%');
        $('.layui-body').css('left', 200+'px');
        $('.layui-footer').css('left', 200+'px');
        $('dd span').each(function(){
            $(this).show();
        });
        isShow =true;
    }
});

function updateUsePwd(){
    layer.open({
        type:1,
        title: "修改密码",
        fixed:false,
        resize :false,
        shadeClose: true,
        area: ['450px'],
        content:$('#useDetail')
    });
}
