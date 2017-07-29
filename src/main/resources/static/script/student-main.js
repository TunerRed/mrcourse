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

    studentClient.login(info);
    studentClient.on("loginsuccess",function () {


        studentClient.joinCourse(8)

        /****************************************************************/
        /*                       获取课程                                */
        /****************************************************************/
        studentClient.getCourse();
        studentClient.on("getcoursesuccess",function (data) {
            console.log(typeof data,data)
        })


        /****************************************************************/
        /*                       公告部分                          */
        /****************************************************************/

        // studentClient.uploadNotice(8,{
        //     content:"first notice yeah~~"
        // });
        // studentClient.on("uploadnoticesuccess",function () {
        //     console.log("uploadnoticesuccess")
        // });
        //***********************************************************!!!!!!!!!!!!!!****
        // studentClient.getNotice(8)


    })










})