define(function (require) {

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
                    events[eventName][fn].call(null, Array.prototype.slice.call(arguments, 1));
                }
            }
        }

        return new emit();
    }


    /***
     * Events:
     * error            call()
     *
     * registersuccess  call()
     * registerfailed   call(message)
     *
     * loginsuccess     call()
     * loginfaild       call(message)
     *
     * getcoursesuccess call(json)
     * getcoursefailed  call(message)
     *
     * getcoursefilesuccess     call(json)
     * getcoursefilefailed      call(message)
     *
     * postcoursefilesuccess    call()
     * postcoursefilefailed     call(message)
     *
     * getnoticesuccess call(json)
     * getnoticefailed  call(message)
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

        }

        userHandler.prototype = new Emit();
        userHandler.prototype.register = function (bundle) {
            var that = this;

            var request = new Ajax("POST", API.register);
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded")
            request.send("username=" + encodeURIComponent(bundle.username)
                + "&name=" + encodeURIComponent(bundle.name) + "&password=" + encodeURIComponent(bundle.password)
                + "&type=" + encodeURIComponent(bundle.type))
                .then(
                    function (response) {

                        response = JSON.parse(response);
                        if (response.status === 200) {
                            console.log("sucess register");
                            that.trigger("registersuccess");
                        } else {
                            console.log("failed register");
                            that.trigger("registerfailed", response.message);
                        }
                    });


        };

        userHandler.prototype.login = function (bundle) {

            var that = this;

            var request = new Ajax("POST", API.login);
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded")
            request.send("username=" + encodeURIComponent(bundle.username)
                + "&password=" + encodeURIComponent(bundle.password))
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success login");
                        that.trigger("loginsuccess");
                    } else {
                        console.log("failed login");
                        that.trigger("loginfailed", response.message);
                    }
                });


        };

        userHandler.prototype.logout = function () {

        };

        userHandler.prototype.getCourse = function () {
            var that = this;

            var request = new Ajax("GET", API.getCourse);

            request.send()
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success getcourse");
                        that.trigger("getcoursesuccess", response.data);
                    } else {
                        console.log("failed getcourse");
                        that.trigger("getcoursefailed", response.message);
                    }

                });

        };

        userHandler.prototype.getCourseFile = function (courseId) {

            var that = this;

            var request = new Ajax("GET", API.getCourseFile(courseId));

            request.send()
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success getcoursefile");
                        that.trigger("getcoursefilesuccess", response.data);
                    } else {
                        console.log("failed getcoursefile");
                        that.trigger("getcoursefilefailed", response.message);
                    }

                });

        };

        userHandler.prototype.uploadCourseFile = function (courseId, file) {

            var that = this;

            var formdata = new FormData();
            formdata.append("file", file);

            var request = new Ajax("POST", API.uploadCourseFile(courseId));

            request.send(formdata)
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success uploadfile");
                        that.trigger("uploadfilesuccess");
                    } else {
                        console.log("failed uploadfile");
                        that.trigger("uploadfilefailed", response.message);
                    }

                });
        };

        userHandler.prototype.downloadCourseFile = function (fileId) {

            window.open(API.downloadCourseFile(fileId))

        };

        userHandler.prototype.getNotice = function (courseId) {
            var that = this;

            var request = new Ajax("GET", API.getNotice(courseId));

            request.send()
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success getNotice");
                        that.trigger("getnoticesuccess", response.data);
                    } else {
                        console.log("failed getnotice");
                        that.trigger("getnoticefailed", response.message);
                    }

                });

        };


        return new userHandler();

    }

    /***
     * Events
     *
     * createcoursesuccess  call(data)
     * createcoursefailed   call(message)
     *
     * uploadnoticesuccess  call()
     * uploadnoticefailed   call(message)
     *
     * startlessonsuccess   call(json)
     * startlessonfailed    call(message)
     *
     * continuelessonsuccess    call()
     * continuelessonfailed     call(message)
     *
     * endlessonsuccess     call()
     * endlessonfailed      call(message)
     *
     * @returns {teacherHandler}
     * @constructor
     */
    function TeacherHandler() {

        /****************************************************************/
        /*                           私有变量                            */
        /****************************************************************/


        /****************************************************************/
        /*                       构造函数,初始化                          */
        /****************************************************************/
        function teacherHandler() {

        }

        teacherHandler.prototype = new UserHandler();

        teacherHandler.prototype.createCourse = function (bundle) {

            var that = this;

            var request = new Ajax("POST",API.createCourse);
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            request.send(objectToFormData({
                name:bundle.name,
                introduce:bundle.introduce
            }))
                .then(function (response) {
                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success createcourse");
                        that.trigger("createcoursesuccess", response.data);
                    } else {
                        console.log("failed getcourse");
                        that.trigger("createcoursefailed", response.message);
                    }

                })
        };

        teacherHandler.prototype.uploadNotice = function (courseId,bundle) {

            var that = this;

            var request = new Ajax("POST",API.uploadNotice(courseId));
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            request.send(objectToFormData({
                content:bundle.content
            }))
                .then(function (response) {
                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success uploadnotice");
                        that.trigger("uploadnoticesuccess");
                    } else {
                        console.log("failed getcourse");
                        that.trigger("uploadnoticefailed", response.message);
                    }

                })
        };

        teacherHandler.prototype.startLesson = function (courseId,bundle) {

            var that = this;

            var request = new Ajax("POST",API.startLesson(courseId));
            request.send(objectToFormData({
                introduce:bundle?bundle.introduce:""
            }))
                .then(function (response) {
                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success startlesson");
                        that.trigger("startlessonsuccess", response.data);
                    } else {
                        console.log("failed startleson");
                        that.trigger("startlessonfailed", response.message);
                    }

                });

        };

        teacherHandler.prototype.continueLesson = function (courseId,lessonId) {

            var that = this;

            var request = new Ajax("POST",API.continueLesson(courseId,lessonId));
            request.send()
                .then(function (response) {
                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success continuelesson");
                        that.trigger("continuelessonsuccess");
                    } else {
                        console.log("failed continueleson");
                        that.trigger("continuelessonfailed", response.message);
                    }

                });

        };

        teacherHandler.prototype.endLesson = function (lessonId) {

            var that = this;

            var request = new Ajax("POST",API.endLesson(lessonId));
            request.send()
                .then(function (response) {
                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success endlesson");
                        that.trigger("endlessonsuccess");
                    } else {
                        console.log("failed endleson");
                        that.trigger("endlessonfailed", response.message);
                    }

                });

        };


        return new teacherHandler();
    }

    /***
     * Events
     * searchcoursesuccess  call(json)
     * searchcoursefailed   call(message)
     *
     * joincoursesuccess    call()
     * joincoursefailed     call(message)
     *
     * @returns {studentHandler}
     * @constructor
     */
    function StudentHandler() {

        /****************************************************************/
        /*                           私有变量                            */
        /****************************************************************/


        /****************************************************************/
        /*                       构造函数,初始化                          */
        /****************************************************************/
        function studentHandler() {

        }

        studentHandler.prototype = new UserHandler();

        studentHandler.prototype.searchCourse = function (keyWord) {

            var that = this;

            var request = new Ajax("GET",API.searchCourse(keyWord));
            request.send()
                .then(function (response) {

                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success searchcourse");
                        that.trigger("searchcoursesuccess",response.data);
                    } else {
                        console.log("failed searchcourse");
                        that.trigger("searchcoursefailed", response.message);
                    }

                })

        };

        studentHandler.prototype.joinCourse = function (courseId) {

            var that = this;

            var request = new Ajax("POST",API.joinCourse(courseId));
            request.send()
                .then(function (response) {

                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success joincourse");
                        that.trigger("joincoursesuccess");
                    } else {
                        console.log("failed joincourse");
                        that.trigger("joincoursefailed", response.message);
                    }

                })

        };


        return new studentHandler();
    }

    function objectToFormData(json) {
        var res = '';
        for (var key in json){
            res += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
        }
        return res;
    }

    return {
        TeacherHandler: TeacherHandler,
        StudentHandler: StudentHandler,
        Emit: Emit
    }
})