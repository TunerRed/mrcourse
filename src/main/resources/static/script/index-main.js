require.config({
    baseUrl: "script/module"
});
require(["jquery", "indexFrameInit","webSocketChannel", 'jquery.cookie'], function ($, FrameInit,webSocket) {

    console.log(typeof webSocket)


//    先获取cookie中的信息
    var bundle = {
        username: $.cookie("username"),
        name: $.cookie("name"),
        type: $.cookie("type")
    }


    // 根据用户类型(教师或学生)初始化框架内容(文本\样式初始化 控件初始化)
    if (bundle.type === "teacher" || bundle.type === "student") {

        FrameInit.initHTML(bundle);
        FrameInit.initComponents(bundle);

    } else {
        throw new Error("参数错误")
    }



    //Page 1





})