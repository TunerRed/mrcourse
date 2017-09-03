require.config({
    baseUrl: "script/module"
});
require(["jquery", "indexFrameInit", "webSocketChannel", 'jquery.cookie', 'userHandler'],
    function ($, FrameInit, webSocket, cookie, userHandler) {

        var userHandler = new userHandler.UserHandler();
        userHandler.login({
            username: "test",
            password: "test"
        }, function () {
            console.log("success");


//    先获取cookie中的信息
            var bundle = {
                username: $.cookie("username"),
                name: $.cookie("name"),
                type: $.cookie("type"),
                webSocket: webSocket,
                courseId: $.cookie("courseId")
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
    })