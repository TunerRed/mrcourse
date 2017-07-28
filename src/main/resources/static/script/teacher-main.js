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
    // teacherClient.createCourse({
    //     name:"高数",
    //     introduce:"hahaha高数啊"
    // })
    teacherClient.getCourse();

    teacherClient.on("createcoursesuccess",function (data) {
        console.log(typeof data,data)
    })
    teacherClient.on("getcoursesuccess",function (data) {
        console.log(typeof data,data)
    })

})