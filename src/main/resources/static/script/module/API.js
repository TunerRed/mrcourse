define(function (require) {

    var HOST = "guozhuoqiang.top:8443/mrcourse";
    var HTTPS_ADDRESS = "https://" + HOST;
    var WSS_ADDRESS = "wss://" + HOST+"/websocket";

    return {
        login: HTTPS_ADDRESS + "/login",
        register: HTTPS_ADDRESS + "/register",

        //common
        logout:HTTPS_ADDRESS + "/common/logout",
        getUserInfo:match(HTTPS_ADDRESS + "/common/user/${userId}"),
        updateUserInfo:match(HTTPS_ADDRESS + "/common/user"),
        getCourse:match(HTTPS_ADDRESS + "/common/course/${courseId}"),
        getAllCourse: HTTPS_ADDRESS + "/common/course",
        getCourseFile: match(HTTPS_ADDRESS + "/common/file/${courseId}"),
        uploadCourseFile: match(HTTPS_ADDRESS + "/common/file/${courseId}"),
        downloadCourseFile:match(HTTPS_ADDRESS+"/common/file/download/${fileId}"),
        getNotice:match(HTTPS_ADDRESS+"/common/notice/${courseId}"),
        // teacher
        createCourse:HTTPS_ADDRESS+"/teacher/course",
        updateCourse:match(HTTPS_ADDRESS + "/teacher/course/${courseId}"),
        uploadNotice:match(HTTPS_ADDRESS+"/teacher/notice/${courseId}"),
        deleteNotice:match(HTTPS_ADDRESS + "/teacher/notice/delete/${noticeId}"),
        getCourseMember:match(HTTPS_ADDRESS + "/teacher/member"),
        deleteCourseMember:match(HTTPS_ADDRESS + "/teacher/member/delete/${courseId}/${studentId}"),
        startCourse:match(HTTPS_ADDRESS + "/teacher/course/start/${courseId}"),
        endCourse:match(HTTPS_ADDRESS + "/teacher/course/end/${courseId}"),
        startLive:match(HTTPS_ADDRESS + "/teacher/course/start/live/${courseId}"),
        endLive:match(HTTPS_ADDRESS + "/teacher/course/end/live/${courseId}"),
        startChat:match(HTTPS_ADDRESS + "/teacher/course/start/chat/${courseId}"),
        endChat:match(HTTPS_ADDRESS + "/teacher/course/end/chat/${courseId}"),
        startVote:match(HTTPS_ADDRESS + "/teacher/course/start/vote/${courseId}"),
        endVote:match(HTTPS_ADDRESS + "/teacher/course/end/vote/${courseId}"),
        // student
        searchCourse:match(HTTPS_ADDRESS+"/student/search/${keyWord}"),
        searchAllCourse:match(HTTPS_ADDRESS+"/student/course/all"),
        joinCourse:match(HTTPS_ADDRESS+"/student/course/join/${courseId}"),
        quitCourse:match(HTTPS_ADDRESS+"/student/course/quit/${courseId}"),
        checkIn:match(HTTPS_ADDRESS+"/student/checkIn/${courseId}"),
        // websocket
        webSocketServer:match(WSS_ADDRESS + "?room=${courseId}")
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
})