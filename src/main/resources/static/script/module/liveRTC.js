/**
 * Created by Liu Penghao on 2017/7/19.
 */
(function (global,document,factoryFunc){
    if (global.define) {
        global.define(factoryFunc)
    } else {
        global.utils = global.utils || {};
        global.utils.liveRTC = factoryFunc();
    }
}(window,null, function () {

    /***
     * 事件触发器
     * @returns {emit}
     * @constructor
     */
    function Emit() {
        var events = {};


        function emit() {

        }
        emit.prototype = {
            on:function (eventName, eventFn) {
                events[eventName] = events[eventName] || [];
                events[eventName].push(eventFn);
            },
            trigger:function (eventName,_) {
                for(var fn in events[eventName]){
                    fn.call(null,arguments.slice(1));
                }
            }
        }

        return new emit();
    }





    //直播端
    /**
     * 首先需要打开摄像头，然后添加websocket
     * @param config 配置参数(必须有name(唯一标志符)、可包含iceConfig)
     * @returns {rtcRoom}RtcRoom对象
     * @constructor
     */
    function RtcRoom(config) {


        /****************************************************************/
        /*                         私有变量                              */
        /****************************************************************/

        var webSocket = null;

        var mediaStream = null;

        var pcPool = [];

        var name = null;

        // 事件集合
        var events = {}


        /****************************************************************/
        /*                   构造函数，负责初始化变量                       */
        /****************************************************************/
        function rtcRoom() {
            config.iceConfig = config.iceConfig || {
                    iceServers: [
                        {
                            url: "stun:stun.l.google.com:19302"
                        }
                    ]
                };
            name = config.name;
            navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia || navigator.msGetUserMedia);
            window.URL = (window.URL || window.webkitURL || window.msURL || window.oURL);
        }


        /****************************************************************/
        /*                           成员变量、方法                       */
        /****************************************************************/
        rtcRoom.prototype = Emit();
        rtcRoom.prototype.openUserMedia = function (videoElement, config) {

            // 默认配置，以后可能添加修改的接口
            config = config || {
                    vide: true,
                    audio: true
                };

            navigator.getUserMedia(config,
                function (stream) {
                    if (mediaStream !== null) {
                        mediaStream.stop();
                    }
                    mediaStream = stream;
                    videoElement.src = window.URL.createObjectURL(mediaStream);
                    videoElement.autoplay = "autoplay";
                },
                function (error) {
                    console.log(error)
                });
        };
        rtcRoom.prototype.setWebSocketChannel = function (ws) {

            webSocket = ws;
            webSocket.addEventListener("message", function (e) {
                var message = e.data;
                switch (message.type) {
                    case "new-ice-candidate":
                        handleNewIceCandidate(message);
                        break;
                    case "video-offer":
                        handleVideoOffer(message);
                        break;
                }
            })
        };


        return new rtcRoom();


        function handleNewIceCandidate(message) {
            var pc = null;
            for (var obj in pcPool) {
                if (pcPool[obj].name === message.name) {
                    pc = pcPool[obj].peer;
                    break;
                }
            }
            if (pc === null) {
                return;
            }
            pc.addIceCandidate(new RTCIceCandidate(message.data));
        }

        function handleVideoOffer(message) {
            console.log("receive video offer");

            var pc = new RTCPeerConnection(config.iceConfig);
            pc.onicecandidate = function (e) {
                if (e.candidate === null) {
                    return;
                }
                webSocket.send(JSON.stringify({
                    type: "new-ice-candidate",
                    name: name,
                    target: message.name,
                    data: e.candidate
                }))
            };
            pc.onclose = function () {
                for (var obj in pcPool) {
                    if (pcPool[obj].peer === pc) {
                        pcPool.splice(Number(obj));
                    }
                }
            };

            if (mediaStream !== null) {
                pc.addStream(mediaStream);
            }
            pc.setRemoteDescription(message.data);
            pc.createAnswer(
                function (desc) {
                    pc.setLocalDescription(desc);
                    webSocket.send(JSON.stringify({
                        type: "video-answer",
                        name: name,
                        target: message.name,
                        data: desc
                    }));
                },
                function (error) {
                    console.log(error)
                }
            );

            pcPool.push({
                name: message.name,
                peer: pc
            });
        }
    }

    // 收看端
    /**
     * 首先需注册stream事件，返回mediastream。然后添加websocket
     * @param config 配置参数(必须有name、老师的名字、可包含iceConfig)
     * @returns {rtcClient}RtcClient对象
     * @constructor
     */
    function RtcClient(config) {


        /****************************************************************/
        /*                         私有变量                              */
        /****************************************************************/

        var webSocket = null;

        var pc;

        // 姓名
        var name;

        // 直播源的姓名
        var videoSourceName = null;

        // 用户注册的事件集合
        var events = {};

        /****************************************************************/
        /*                   构造函数，负责初始化变量                       */
        /****************************************************************/
        function rtcClient() {
            config.iceConfig = config.iceConfig || {
                    iceServers: [
                        {
                            url: "stun:stun.l.google.com:19302"
                        }
                    ]
                };
            name = config.name;
            videoSourceName = config.videoSourceName;
            window.RTCPeerConnection = (window.PeerConnection || window.webkitPeerConnection00
            || window.webkitRTCPeerConnection || window.mozRTCPeerConnection);
        }


        /****************************************************************/
        /*                           成员变量、方法                       */
        /****************************************************************/

        // 注册时间的函数
        rtcClient.prototype.on = function (event, fn) {
            events[event] = events[event] || [];
            events[event].push(fn);
        };
        rtcClient.prototype.setWebSocketChannel = function (ws) {

            webSocket = ws;

            pc = new RTCPeerConnection(config.iceConfig);
            pc.onicecandidate = function (e) {
                if (e.candidate === null) {
                    return;
                }
                webSocket.send(JSON.stringify({
                    type: "new-ice-candidate",
                    name: name,
                    target: videoSourceName,
                    data: {
                        candidate: e.candidate
                    }
                }));
            };
            pc.onaddStream = function (mediaStream) {
                for (var fn in events["stream"]) {
                    fn.call(null, mediaStream);
                }
            };

            pc.createOffer(
                function (desc) {
                    pc.setLocalDescription(desc);
                    webSocket.send(JSON.stringify({
                        type: "video-offer",
                        name: name,
                        data: {
                            sdp: desc
                        }
                    }));
                },
                function (error) {
                    console.log(error)
                });

            webSocket.addEventListener("message", function (e) {
                var message = e.data;
                switch (message.type) {
                    case "new-ice-candidate":
                        handleNewIceCandidate(message);
                        break;
                    case "video-answer":
                        handleVideoAnswer(message);
                        break;
                }
            })
        };


        return new rtcClient();


        function handleNewIceCandidate(message) {
            pc.addIceCandidate(new RTCIceCandidate(message.data.candidate));
        }

        function handleVideoAnswer(message) {
            console.log("recieve an answer");

            pc.setRemoteDescription(message.data.sdp);
        }
    }

    return{
        RtcRoom:RtcRoom,
        RtcClient:RtcClient,
        Emit:Emit
    }
}))