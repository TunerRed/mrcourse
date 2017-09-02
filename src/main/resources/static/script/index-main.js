require.config({
    baseUrl: "script/module"
});
require(["jquery", "indexFrameInit", 'jquery.cookie'], function ($, FrameInit) {

//    先获取cookie中的信息
    var bundle = {
        username: $.cookie("username"),
        name: $.cookie("name"),
        type: $.cookie("type")
    }


    // 根据用户类型(教师或学生)初始化框架内容
    if (bundle.type === "teacher") {
        FrameInit.initializeAsTeacher();
    }
    else if (bundle.type === "student") {
        FrameInit.initializeAsStudent();
    } else {
        throw new Error("参数错误")
    }



    //Page 1





})