require.config({
    baseUrl:"script/module"
})
require(['userHandler','liveRTC'],function (userHandlerModule,liveRTCModule) {

    var teacherHandler = new userHandlerModule.TeacherHandler();

    var info = {
        username:"test",
        password:"test"
    }

    teacherHandler.login(info,function () {

        var liveRoom = new liveRTCModule.RtcRoom()

        liveRoom.openUserMedia(document.getElementById("my-video"));













    })
})