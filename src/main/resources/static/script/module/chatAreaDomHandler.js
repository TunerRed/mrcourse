/**
 * Created by Administrator on 2017/9/3.
 */
/**
 * 聊天区域Dom层管理
 */
define(function (require) {
    function execute() {


        var chatHandler = require("chatHandler"),
            messageBlockDiv = document.getElementById("message-block");

        chatHandler.on("send-message", function (data) {

            var personMessage = document.createElement("DIV"),
                personMessageInfo = document.createElement("DIV"),
                personMessageContent = document.createElement("DIV"),
                portrait = document.createElement("IMG"),
                name = document.createElement("SPAN");
            personMessage.classList.add("person-message");
            personMessageInfo.classList.add("person-message__info");
            personMessageContent.classList.add("person-message__content");
            portrait.src = "image/portrait.png";
            portrait.classList.add("portrait");
            name.innerText = data.name;
            personMessageContent.innerText = data.data;
            personMessageInfo.appendChild(portrait);
            personMessageInfo.appendChild(name);
            personMessage.appendChild(personMessageInfo);
            personMessage.appendChild(personMessageContent);

            messageBlockDiv.appendChild(personMessage);

        });
        chatHandler.on("chat-open", function () {
            messageBlockDiv.innerHTML +=
                '<div class="system-message">' +
                '<div class="system-message__content">' +
                '<p>已关闭实时讨论</p>' +
                '<p>请在上方开启</p>' +
                '</div>' +
                '</div>';
        });
        chatHandler.on("chat-closed", function () {
            messageBlockDiv.innerHTML +=
                '<div class="system-message">' +
                '<div class="system-message__content">' +
                '<p>已开启实时讨论</p>' +
                '</div>' +
                '</div>';
        });

    }
    return {
        execute:execute
    }
})