(function API(global, document, factoryFn) {

    if (global.define) {
        //提供CommonJS规范的接口
        define(factoryFn);
    } else {
        //提供window.UI的接口
        global.utils = global.utils || {};
        global.utils.API = factoryFn();
    }

}
(global, null, function () {
    var HOST = "https://guozhuoqiang.top:8443";


    return {
        login: HOST + "/login",
        register: HOST + "/register",
        getCourse: HOST + "/common/course",
        getCourseFile: HOST + "/common/file",
        postCourseFile: match(HOST + "/common/file/${courseId}"),
        downloadCourseFile:match(HOST+"/common/file/download/${fileId}"),
        getNotice:match(HOST+"/common/notice/${courseId}"),
        createCourse:HOST+"/teacher/course"

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
