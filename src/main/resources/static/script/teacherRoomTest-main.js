require.config({
    baseUrl:"script/module"
})
require(['userHandler','liveRTC','API'],function (userHandlerModule,liveRTCModule,API) {

    var teacherHandler = new userHandlerModule.TeacherHandler();

    var info = {
        username:"test",
        password:"test"
    }

    teacherHandler.login(info,function () {

        var liveRoom = new liveRTCModule.RtcRoom()
        var ws = new WebSocket(API.webSocketServer(1))

        liveRoom.openUserMedia(document.getElementById("my-video"));


        liveRoom.setWebSocketChannel(ws);










    })
})