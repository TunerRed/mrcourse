require.config({
    baseUrl:"script/module"
})
require(['userHandler'],function (userHandlerModule) {
    var StudentHandler = userHandlerModule.StudentHandler;

    var studentClient = new StudentHandler();

    var info = {
        username:"test",
        password:"test"
    }

    studentClient.login(info,function () {
        console.log("success")
    },function () {
        console.log("failed")
    })




})