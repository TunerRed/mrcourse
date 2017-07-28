(function API(global, document, factoryFn) {

    if (global.define) {
        //CMD接口
        define(factoryFn);
    } else {
        //window.UI的接口
        global.utils = global.utils || {};
        global.utils.API = factoryFn();
    }

}
(window, null, function () {

    var HOST = "guozhuoqiang.top:8443/mrcourse";
    var HTTPS_ADDRESS = "https://" + HOST;
    var WSS_ADDRESS = "wss://" + HOST;

    return {
        login: HTTPS_ADDRESS + "/login",
        register: HTTPS_ADDRESS + "/register",
        
        //common
        getCourse: HTTPS_ADDRESS + "/common/course",
        getCourseFile: match(HTTPS_ADDRESS + "/common/file/${courseId}"),
        postCourseFile: match(HTTPS_ADDRESS + "/common/file/${courseId}"),
        downloadCourseFile:match(HTTPS_ADDRESS+"/common/file/download/${fileId}"),
        getNotice:match(HTTPS_ADDRESS+"/common/notice/${courseId}"),
        // teacher
        createCourse:HTTPS_ADDRESS+"/teacher/course",
        uploadNotice:match(HTTPS_ADDRESS+"/teacher/notice/${courseId}"),
        startLesson:HTTPS_ADDRESS+"/teacher/lesson/start",
        endLesson:HTTPS_ADDRESS+"/teacher/lesson/end",
        // student
        searchCourse:match(HTTPS_ADDRESS+"/student/search/${keyWord}"),
        joinCourse:match(HTTPS_ADDRESS+"/student/course/join/${courseId}"),
        // websocket
        webSocketServer:match(WSS_ADDRESS + "/?room=${courseId}&${lessonId}")
    }

    // curry参数模板替换
    function match(s) {

        var targetStrings;

        function _match() {

            targetStrings = Array.prototype.slice.call(arguments);
            for (var arg in targetStrings) {
                s = s.replace(/\$\{\w+}/, targetStrings[arg]);
            }

            if (s.match(/\$\{\w+}/) !== null) {
                return _match;
            } else {
                return s;
            }
        }
        _match.valueOf = function () {
            return s.match(/\$\{\w+}/g).join(",")
        }

        return _match.apply(null,Array.prototype.slice.call(arguments,1));
    }
}))
