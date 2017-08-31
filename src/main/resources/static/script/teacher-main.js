require.config({
    baseUrl:"script/module"
})
require(['userHandler','API'],function (userHandlerModule,API) {
    var TeacherHandler = userHandlerModule.TeacherHandler;

    var teacherClient = new TeacherHandler();

    var info = {
        username:"test",
        password:"test"
    }





})