/**
 * Created by Administrator on 2017/7/28.
 */
require.config({
    baseUrl:"script/module"
})

require(["userHandler",'API'],function (userHandler,API) {

    var UserHandler = userHandler.UserHandler;
    

    var user = new UserHandler();
    user.login({
        username:"test2",
        name:"教师测试账号",
        password:"test2",
        "type":"student"
    });
    user.on("loginsuccess",function () {
        
    })
})