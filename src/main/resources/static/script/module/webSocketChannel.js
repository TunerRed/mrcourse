define(function (require) {
    var $ = require("jquery");
    require("jquery.cookie")
    return new WebSocket(require("API").webSocketServer($.cookie("courseId")));
})