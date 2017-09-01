require.config({
    baseUrl:"script/module"
})
require(['userHandler'],function (userHandlerModule) {

    var studentHandler = new userHandlerModule.StudentHandler();

    var info = {
        username:"test2",
        password:"test2"
    }

    //
    // var fileInput = document.getElementById("file");
    // fileInput.onchange = function () {
    //
    //
    //     teacherHandler.login(info, function () {
    //         var formdata = new FormData(fileInput.files[0])
    //         teacherHandler.uploadCourseFile(1,formdata,function () {
    //             console.log("OK")
    //         })
    //
    //     })
    // }
})