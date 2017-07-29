require.config({
    baseUrl:"script/module"
})
require(['userHandler'],function (userHandlerModule) {
    var TeacherHandler = userHandlerModule.TeacherHandler;

    var teacherClient = new TeacherHandler();

    var info = {
        username:"test2",
        password:"test2"
    }

    teacherClient.login(info);

    window.console.log = function () {
        var text = '';
        for (var i in arguments){
            text+=" " + arguments[i];
        }
        var tmp = document.createElement("DIV");
        tmp.appendChild(document.createTextNode(text));
        document.body.appendChild(tmp)
    }

    /****************************************************************/
    /*                       创建课程                                */
    /****************************************************************/

    // teacherClient.createCourse({
    //     name:"高数",
    //     introduce:"hahaha高数啊"
    // })
    // teacherClient.on("createcoursesuccess",function (data) {
    //     console.log(typeof data,data)
    // })


    /****************************************************************/
    /*                       获取课程                                */
    /****************************************************************/
    teacherClient.getCourse();
    teacherClient.on("getcoursesuccess",function (data) {
        console.log(typeof data,data)
    })


    /****************************************************************/
    /*                       公告部分                          */
    /****************************************************************/

    teacherClient.uploadNotice(1,{
        content:"first notice"
    });
    teacherClient.on("uploadnoticesuccess",function () {
        console.log("uploadnoticesuccess")
    });










})