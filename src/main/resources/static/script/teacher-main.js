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
    teacherClient.on("loginsuccess",function () {


        // window.console.log = function () {
        //     var text = '';
        //     for (var i in arguments){
        //         text+=" " + arguments[i];
        //     }
        //     var tmp = document.createElement("DIV");
        //     tmp.appendChild(document.createTextNode(text));
        //     document.body.appendChild(tmp)
        // }

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

        // teacherClient.uploadNotice(8,{
        //     content:"first notice yeah~~"
        // });
        // teacherClient.on("uploadnoticesuccess",function () {
        //     console.log("uploadnoticesuccess")
        // });
        //***********************************************************!!!!!!!!!!!!!!****
        // teacherClient.getNotice(8)


        /****************************************************************/
        /*                       文件上上传下载                          */
        /****************************************************************/
        //****!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        var fileInput = document.getElementById("file-input");
        var fileBtn = document.getElementById("file-btn");
        fileBtn.onclick = function () {
            if (fileInput.files[0]) {
                teacherClient.uploadCourseFile(8, fileInput.files[0])
            }
        }


        /****************************************************************/
        /*                       开始上课部分                          */
        /****************************************************************/

        // teacherClient.endLesson(8,5);
    })










})