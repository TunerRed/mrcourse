/**
 * Created by Administrator on 2017/7/27.
 */
require.config({
    baseUrl:"script/module",
    paths:{
        userHandler:"userHandler"
    }
})
require(["userHandler"],function (userHandler) {

    var UserHandler = userHandler.UserHandler;

    var test = new UserHandler();
    console.log(test)
    test.register({
        username:"lph",
        name:"liupenghao",
        password:"password",
        "type":"student"
    })
})