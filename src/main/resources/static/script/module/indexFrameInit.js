define(function (require) {


    function initHTML(bundle) {

        // header
        var selfInfoDiv = document.querySelector(".self-info");
        selfInfoDiv.querySelector(".type").innerText = bundle.type === "teacher" ? "Tch" : "Stu";
        selfInfoDiv.querySelector(".name").innerText = bundle.name;


        // nav
        var navUl = document.querySelector("nav>ul");
        if (bundle.type === "student") {
            navUl.querySelectorAll(".switcher [class~=switcher__]").forEach(function (item) {
                item.innerHTML = "已" + item.innerHTML;
                item.classList.add("disabled");
            });

            var tmp = navUl.querySelector(".drag-box");
            tmp.removeChild(tmp.querySelector(".drag-box__container"));
            tmp.classList.add("disabled")
        }

        //bottom-bar


    }

    function initComponents(bundle) {
        var components = require("components");

        var navUl = document.querySelector("nav>ul");
        var userHandler = new require("userHandler").UserHandler(),
            teacherHandler = new require("userHandler").TeacherHandler(),
            studentHandler = new require("userHandler").StudentHandler()

        // 初始化当前课程DOM
        var dragBoxLi = navUl.querySelector(".drag-box");
        if (bundle.type === "teacher") {

            // new 一个dragbox组件
            var dragBox = new components.DragBox(dragBoxLi);
            dragBox.clear();

            // 初始化课程列表
            userHandler.getAllCourse(function (data) {
                for (var i in data) {
                    var tmp = document.createElement("LI");
                    tmp.classList.add("drag-box__item");
                    var tmp2 = document.createElement("A");
                    tmp2.href = "javascript:void(0)";
                    tmp2.innerText = data[i].name;
                    tmp.appendChild(tmp2);
                    dragBox.add(tmp);
                    //
                    // // 顺便根据courseId找出courseName
                    // if (data[i].id === bundle.courseId) {
                    //     dragBox.show(data[i].name);
                    // }
                }
            });

        } else {

            // 只需要根据courseId找出courseName
        }


        // 初始化3个状态
        var courseStateDiv = document.getElementById("course-state"),
            liveStateDiv = document.getElementById("live-state"),
            chatStateDiv = document.getElementById("chat-state");

        if (bundle.type === "teacher") {

            var courseSwitcher = new components.Switcher(courseStateDiv),
                liveSwitcher = new components.Switcher(liveStateDiv),
                chatSwitcher = new components.Switcher(chatStateDiv);

            // 点击开始上课
            courseSwitcher.onDom.addEventListener("click", function () {
                if (!courseSwitcher.isOn() && bundle.courseId !== undefined) {
                    courseSwitcher.turnOn();
                    teacherHandler.startCourse(bundle.courseId);
                }
            });
            // 点击下课
            courseSwitcher.offDom.addEventListener("click", function () {
                if (courseSwitcher.isOn() && bundle.courseId !== undefined) {
                    courseSwitcher.turnOff();
                    teacherHandler.endCourse(bundle.courseId);
                }
            });

            // 开启Live
            liveSwitcher.onDom.addEventListener("click", function () {
                if (!liveSwitcher.isOn() && bundle.courseId !== undefined) {
                    liveSwitcher.turnOn();
                    teacherHandler.startLive(bundle.courseId);
                }
            });
            // 关闭Live
            liveSwitcher.offDom.addEventListener("click", function () {
                if (liveSwitcher.isOn() && bundle.courseId !== undefined) {
                    liveSwitcher.turnOff();
                    teacherHandler.endLive(bundle.courseId);
                }
            });

            // 开启Chat
            chatSwitcher.onDom.addEventListener("click", function () {
                if (!chatSwitcher.isOn() && bundle.courseId !== undefined) {
                    chatSwitcher.turnOn();
                    teacherHandler.startLive(bundle.courseId);
                }
            });
            // 关闭Live
            chatSwitcher.offDom.addEventListener("click", function () {
                if (chatSwitcher.isOn() && bundle.courseId !== undefined) {
                    chatSwitcher.turnOff();
                    teacherHandler.endLive(bundle.courseId);
                }
            });


        } else {

        }


        // 更改所有状态
        if (bundle.courseId) {
            userHandler.getCourse(bundle.courseId, function (data) {
                dragBoxLi.querySelector(".drag-box__scene").innerText = data.name;
                if (data.state)
                    courseSwitcher.turnOn()
                else
                    courseSwitcher.turnOff();
                if (data.live)
                    liveSwitcher.turnOn()
                else
                    liveSwitcher.turnOff();
                if (data.chat)
                    chatSwitcher.turnOn()
                else
                    chatSwitcher.turnOff();
            });
        }


    }

    return {
        initHTML: initHTML,
        initComponents: initComponents
    }
})