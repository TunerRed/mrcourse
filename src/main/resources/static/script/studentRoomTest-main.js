require.config({
    baseUrl:"script/module"
})
require(['userHandler','liveRTC','API'],function (userHandlerModule,liveRTCModule,API) {
    var StudentHandler = userHandlerModule.StudentHandler;

    var studentClient = new StudentHandler();

    var info = {
        username:"test2",
        password:"test2"
    }

    studentClient.login(info,function () {

        var ws = new WebSocket(API.webSocketServer(1));

        var liveClient = new liveRTCModule.RtcClient({
            name:"xiaoming",
            videoSourceName:"teacher"
        });
        liveClient.on("steam",function (mediaStream) {
            console.log("onstraewm")
            document.getElementById("my-video").src = URL.createObjectURL(mediaStream);
        });


        ws.onopen = function () {
            liveClient.setWebSocketChannel(ws)

        }




    })




})