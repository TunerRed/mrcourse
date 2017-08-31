require.config({
    baseUrl:"script/module"
})
require(['userHandler'],function (userHandlerModule) {
    var StudentHandler = userHandlerModule.StudentHandler;

    var studentClient = new StudentHandler();

    var info = {
        username:"test2",
        password:"test2",
        name:"刘鹏昊",
        type:"student"
    }





})