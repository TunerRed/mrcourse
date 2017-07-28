/**
 * Created by Administrator on 2017/7/28.
 */
require.config({
    baseUrl:"script/module"
})


require(["userHandler"],function (userHandler) {

    var UserHandler = userHandler.UserHandler;

    var test = new UserHandler();
    test.login({
        username:"test",
        name:"学生测试账号",
        password:"test",
        "type":"student"
    })
})