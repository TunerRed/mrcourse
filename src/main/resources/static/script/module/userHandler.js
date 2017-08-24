define(function (require) {

    var API = require("API");
    var Ajax = require("ajax").Ajax;


    function UserHandler() {

        /****************************************************************/
        /*                           私有变量                            */
        /****************************************************************/


        /****************************************************************/
        /*                       构造函数,初始化                          */
        /****************************************************************/
        function userHandler() {

        }

        userHandler.prototype.register = function (bundle,success,failed) {

            var request = new Ajax("POST", API.register);
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded")
            request.send("username=" + encodeURIComponent(bundle.username)
                + "&name=" + encodeURIComponent(bundle.name) + "&password=" + encodeURIComponent(bundle.password)
                + "&type=" + encodeURIComponent(bundle.type))
                .then(
                    function (response) {

                        response = JSON.parse(response);
                        if (response.status === 200) {
                            console.log("success register");
                            // that.trigger("registersuccess");
                            success()
                        } else {
                            console.log("failed register");
                            // that.trigger("registerfailed", response.message);
                            failed(response.message)
                        }
                    });


        };

        userHandler.prototype.login = function (bundle,success,failed) {

            var request = new Ajax("POST", API.login);
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded")
            request.send("username=" + encodeURIComponent(bundle.username)
                + "&password=" + encodeURIComponent(bundle.password))
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success login");
                        // that.trigger("registersuccess");
                        success()
                    } else {
                        console.log("failed login");
                        // that.trigger("registerfailed", response.message);
                        failed(response.message)
                    }
                });


        };

        userHandler.prototype.logout = function (success,failed) {

            var request = new Ajax("POST", API.logout);
            request.send()
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success login");
                        // that.trigger("registersuccess");
                        success()
                    } else {
                        console.log("failed login");
                        // that.trigger("registerfailed", response.message);
                        failed(response.message)
                    }
                });

        };

        userHandler.prototype.getUserInfo = function (username,success,failed) {

            var request = new Ajax("GET", API.getUserInfo(username));
            request.send()
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success getUSerInfo");
                        // that.trigger("registersuccess");
                        success(response.data)
                    } else {
                        console.log("failed getUserInfo");
                        // that.trigger("registerfailed", response.message);
                        failed(response.message)
                    }
                });

        };

        userHandler.prototype.updateUserInfo = function (bundle,success,failed) {

            var request = new Ajax("POST", API.updateUserInfo);
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            request.send(objectToFormData(bundle))
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success updateInfo");
                        success();
                    } else {
                        console.log("failed updateInfo");
                        failed(response.message);
                    }

                });

        };

        userHandler.prototype.getCourse = function (courseId,success,failed) {

            var request = new Ajax("GET", API.getCourse(courseId));

            request.send()
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success getcourse");
                        success(response.data);
                    } else {
                        console.log("failed getcourse");
                        failed(response.message);
                    }

                });

        };

        userHandler.prototype.getAllCourse = function (success,failed) {

            var request = new Ajax("GET", API.getCourse);

            request.send()
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success getcourse");
                        success(response.data);
                    } else {
                        console.log("failed getcourse");
                        failed(response.message);
                    }

                });

        };

        userHandler.prototype.getCourseFile = function (courseId,success,failed) {

            var request = new Ajax("GET", API.getCourseFile(courseId));

            request.send()
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success getcoursefile");
                        success(response.data);
                    } else {
                        console.log("failed getcoursefile");
                        failed(response.message);
                    }

                });

        };

        userHandler.prototype.uploadCourseFile = function (courseId, file,success,failed) {

            var formdata = new FormData();
            formdata.append("file", file);

            var request = new Ajax("POST", API.uploadCourseFile(courseId));

            request.send(formdata)
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success uploadfile");
                        success()
                    } else {
                        console.log("failed uploadfile");
                        failed(response.message);
                    }

                });
        };

        userHandler.prototype.downloadCourseFile = function (fileId) {

            window.open(API.downloadCourseFile(fileId))

        };

        userHandler.prototype.getNotice = function (courseId,success,failed) {

            var request = new Ajax("GET", API.getNotice(courseId));

            request.send()
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success getNotice");
                        success(response.data);
                    } else {
                        console.log("failed getnotice");
                        failed(response.message);
                    }

                });

        };


        return new userHandler();

    }

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

        teacherHandler.prototype.createCourse = function (bundle,success,failed) {


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
                        success(response.data);
                    } else {
                        console.log("failed getcourse");
                        failed(response.message);
                    }

                })
        };

        teacherHandler.prototype.updateCourse = function (courseId,bundle,success,failed) {

            var request = new Ajax("POST",API.updateCourse(courseId));
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            request.send(objectToFormData(bundle))
                .then(function (response) {
                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success uploadnotice");
                        success();
                    } else {
                        console.log("failed getcourse");
                        failed(response.message);
                    }

                })
        };

        teacherHandler.prototype.uploadNotice = function (noticeId,bundle,success,failed) {

            var request = new Ajax("POST",API.uploadNotice(courseId));
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            request.send(objectToFormData({
                content:bundle.content
            }))
                .then(function (response) {
                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success uploadnotice");
                        success();
                    } else {
                        console.log("failed getcourse");
                        failed(response.message);
                    }

                })
        };

        teacherHandler.prototype.deleteNotice = function (noticeId,success,failed) {

            var request = new Ajax("POST",API.deleteNotice(noticeId));
            request.send()
                .then(function (response) {
                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success uploadnotice");
                        success();
                    } else {
                        console.log("failed getcourse");
                        failed(response.message);
                    }

                })
        };

        teacherHandler.prototype.getCourseMember = function (courseId,success,failed) {

            var request = new Ajax("GET", API.getCourseMember(courseId));

            request.send()
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success getcourse");
                        success(response.data);
                    } else {
                        console.log("failed getcourse");
                        failed(response.message);
                    }

                });

        };

        teacherHandler.prototype.deleteCourseMember = function (courseId,studentId,success,failed) {

            var request = new Ajax("POST",API.deleteCourseMember(courseId,studentId));
            request.send()
                .then(function (response) {
                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success uploadnotice");
                        success();
                    } else {
                        console.log("failed getcourse");
                        failed(response.message);
                    }

                })
        };

        teacherHandler.prototype.startCourse = function (courseId,success,failed) {

            var request = new Ajax("POST",API.startLesson(courseId));
            request.send()
                .then(function (response) {
                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success startCourse");
                        success(response.data);
                    } else {
                        console.log("failed startCourse");
                        failed(response.message);
                    }

                });

        };

        teacherHandler.prototype.endCourse = function (courseId,success,failed) {

            var request = new Ajax("POST",API.endCourse(courseId));
            request.send()
                .then(function (response) {
                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success endlesson");
                        success();
                    } else {
                        console.log("failed endleson");
                        failed(response.message);
                    }

                });

        };


        return new teacherHandler();
    }

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

        studentHandler.prototype.searchCourse = function (keyWord,success,failed) {

            var request = new Ajax("GET",API.searchCourse(keyWord));
            request.send()
                .then(function (response) {

                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success searchcourse");
                        success(response.data);
                    } else {
                        console.log("failed searchcourse");
                        failed(response.message);
                    }

                })

        };

        teacherHandler.prototype.searchAllCourse = function (success,failed) {

            var request = new Ajax("GET", API.searchAllCourse);

            request.send()
                .then(function (response) {

                    response = JSON.parse(response);
                    if (response.status === 200) {
                        console.log("success getcourse");
                        success(response.data);
                    } else {
                        console.log("failed getcourse");
                        failed(response.message);
                    }

                });

        };

        studentHandler.prototype.joinCourse = function (courseId,success,failed) {

            var request = new Ajax("POST",API.joinCourse(courseId));
            request.send()
                .then(function (response) {

                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success joincourse");
                        success()
                    } else {
                        console.log("failed joincourse");
                        failed(response.message);
                    }

                })

        };

        studentHandler.prototype.quitCourse = function (courseId,success,failed) {

            var request = new Ajax("POST",API.searchCourse(courseId));
            request.send()
                .then(function (response) {

                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success searchcourse");
                        success();
                    } else {
                        console.log("failed searchcourse");
                        failed(response.message);
                    }

                })

        };

        studentHandler.prototype.checkIn = function (courseId,success,failed) {

            var request = new Ajax("POST",API.checkIn(courseId));
            request.send()
                .then(function (response) {

                    response = JSON.parse(response);

                    if (response.status === 200) {
                        console.log("success searchcourse");
                        success();
                    } else {
                        console.log("failed searchcourse");
                        failed(response.message);
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
        StudentHandler: StudentHandler
    }
})