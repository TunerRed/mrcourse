(function (global, document, factoryFunc) {

    if (global.define) {
        //CMD接口
        define(factoryFunc);
    } else {
        //window.UI的接口
        global.utils = global.utils || {};
        global.utils.userHandler = factoryFunc();
    }

}(window, null, function (require) {

    var API = require("API");
    var Ajax = require("ajax").Ajax;


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
            on: function (eventName, eventFn) {
                events[eventName] = events[eventName] || [];
                events[eventName].push(eventFn);
            },
            trigger: function (eventName, _) {
                for (var fn in events[eventName]) {
                    fn.call(null, Array.prototype.slice.call(arguments, 1));
                }
            }
        }

        return new emit();
    }


    /***
     * Events:
     * error            call()
     * registersuccess  call()
     * registerfailed   call(message)
     *
     * @constructor
     */
    function UserHandler() {

        /****************************************************************/
        /*                           私有变量                            */
        /****************************************************************/


        /****************************************************************/
        /*                       构造函数,初始化                          */
        /****************************************************************/
        function userHandler() {
            this.test = 10;
        }

        userHandler.prototype = new Emit();
        userHandler.prototype.register = function (bundle) {
            var that = this;

            var request = new Ajax("POST", API.register);
            request.send("username=" + encodeURIComponent(bundle.username)
                + "&name=" + encodeURIComponent(bundle.name) + "&password=" + encodeURIComponent(bundle.password)
                + "&type=" + encodeURIComponent(bundle.type),
                function (response) {
                    response = JSON.parse(response);
                    if (response.status === 200) {
                        that.trigger("registersuccess");
                    } else {
                        that.trigger("registerfailed", response.message);
                    }
                },
                function () {
                    that.trigger("error")
                });


        };

        userHandler.prototype.login = function () {

            var that = this;

            var request = new Ajax("POST", API.login);
            request.send("username=" + encodeURIComponent(bundle.username)
                + "&password=" + encodeURIComponent(bundle.password),
                function (response) {
                    response = JSON.parse(response);
                    if (response.status === 200) {
                        that.trigger("loginsuccess");
                    } else {
                        that.trigger("loginfailed", response.message);
                    }
                },
                function () {
                    that.trigger("error")
                });


        };

        userHandler.prototype.logout = function () {

        };

        return new userHandler();


    }

    return {
        UserHandler: UserHandler,
        Emit: Emit
    }
}))