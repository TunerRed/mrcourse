/**
 * 讨论
 */
define(function (require) {


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
                    events[eventName][fn].call(null, Array.prototype.slice.call(arguments, 1));
                }
            }
        }

        return new emit();
    }


    var webSocket = require("webSocketChannel");
    var isOpen = false;

    function ChatHandler() {
        var that = this;

        // 收到消息
        webSocket.addEventListener("message",function (e) {
            var message = e.data;
            switch (message.type){
                case "send-message":
                case "chat-open":
                case "chat-closed":
                    that.trigger(message.type);
                    break;
            }
        });
    }
    ChatHandler.prototype = new Emit();
    ChatHandler.prototype.send = function (bundle,success,failed) {
        success = typeof success === "function"?success:new Function();
        failed = typeof failed === "function"?failed:new Function();

        if (webSocket.readyState === webSocket.OPEN){
            webSocket.send(JSON.stringify({
                type:"send-message",
                name:bundle.name,
                data:bundle.data
            }));
            success();
        }else {
            failed(new Error("websocket未打开"))
        }
    }


    function init() {


        // 获取初始chat状态
        var $ = require("jquery");
        require("jquery.cookie");
        var userHandler = new require("userHandler").UserHandler();

        if ($.cookie("courseId")){
            userHandler.getCourse($.cookie("courseId"),function (data) {
                isOpen = data.chat;
            });
        }


    }



    init();
    return new ChatHandler();






})