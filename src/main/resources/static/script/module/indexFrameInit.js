define(function (require) {


    function initHTML(bundle) {

        // header
        var selfInfoDiv = document.querySelector(".self-info");
        selfInfoDiv.querySelector(".type").innerText = bundle.type === "teacher"?"Tch":"Stu";
        selfInfoDiv.querySelector(".name").innerText = bundle.name;


        // nav
        var navUl = document.querySelector("nav>ul");
        if (bundle.type === "student"){
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

    }

    return{
        initHTML:initHTML,
        initComponents:initComponents
    }
})