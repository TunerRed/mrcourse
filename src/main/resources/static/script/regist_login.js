/**
 * Created by 延松松松松 on 2017/8/20.
 *
 *
 *
 */

require.config({

    baseUrl:"script/module"
});
//下面写注册小div中的滑块

var state_slide = 0;
//若state  = 0 那么选中的是 学生
//若state  = 1 那么选中的是 教师
var teacher = document.getElementById("teacher_slide");
var student = document.getElementById("student_slide");
var slider = document.getElementById("slide_inDiv");
var timer = null;
// var oDiv1 = ducument.getElementById("div1):
// var timer = null;
// oDiv1.onclick=function(){
//     timer = setInterval(function(){
//         if(oDiv1.offsetLeft < 300){
//             oDiv1.style.left = oDiv1.offsetLeft + 5 +'px';
//         }else{
//             clearInterval(timer);
//         }
//     },30);
// }


    teacher.onclick = function () {
        state_slide = 1;
        // slider.style.left = "95px"
        console.log(state_slide)
        teacher.style.color = "rgba(255, 255, 255, 0.79)"
        student.style.color = "#4bb0ab"

        timer = setInterval(function ()
        {
            if(slider.offsetLeft<95){
                slider.style.left = slider.offsetLeft + 5 + "px"
            }else {
                clearInterval(timer);
            }
        },5)
    };
    student.onclick = function () {
        state_slide = 0;

        console.log(state_slide)
        teacher.style.color = "#4bb0ab"
        student.style.color = "rgba(255, 255, 255, 0.79)"
        //offsetLeft 可判断该组件 和document 左边为多少距离  实现滑动
        timer = setInterval(function ()
        {
            if(slider.offsetLeft>0){
                slider.style.left = slider.offsetLeft - 5 + "px"
            }else {
                clearInterval(timer);
            }
        },5)
    };

//    以下是对首页两个图片  注册登录的 显示
var firstViewDiv = document.getElementById("firstViewDiv");
var logininDiv = document.getElementById("logininDiv");
var registDiv = document.getElementById("regiestDiv")
var input_login = document.getElementsByClassName("input_login");
var input_regist = document.getElementsByClassName("input_regist");

function showLoginDiv() {
        // console.log("show Login")
    firstViewDiv.style.display = "none";
    logininDiv.style.display = "block"
}
function showRegistDiv() {
    // console.log("show Register")
    firstViewDiv.style.display = "none";
    registDiv.style.display = "block";
}

//对关闭图标的js
function Login_close() {

    logininDiv.style.display = "none";
    firstViewDiv.style.display = "block";
    //当退出登录界面时 清空信息
    for(var i = 0;i<input_login.length;i++){
        // console.log(input_login[i].value)
        input_login[i].value = null;
    }


}
function Regist_close() {
    registDiv.style.display = "none";
    firstViewDiv.style.display = "block";
    //当退出注册界面时 清空信息
    for(var i = 0;i<input_regist.length;i++){
        // console.log(input_login[i].value)
        input_regist[i].value = null;
    }
}
function goRegist() {
    logininDiv.style.display = "none";
    registDiv.style.display = "block";
}

//获取注册信息
var registInput = document.getElementsByClassName("input_regist");
var username_regist = registInput[0].value,name_regist = registInput[1].value,password_regist = registInput[2].value,type;

//获取登录信息
var loginInput = document.getElementsByClassName("input_login");
var username_login = loginInput[0].value,password_login = loginInput[1].value;




require(['userHandler','jquery'],function (userHandlerModel,jquery)
    {
        //*************发送注册信息********************
        document.getElementById("regist_Button").onclick = function () {
            if (state_slide==0){
                type = "student"
            }else {
                type = "teacher"
            }

            var regiestInfo = {
                username:username_regist,
                name:name_regist,
                password:password_regist,
                type:type
            };
            var UserHandler = userHandlerModel.UserHandler;
            var userHandler = new UserHandler();
            userHandler.register(regiestInfo,function () {
                alert("注册成功");
                registDiv.style.display = "none";
                firstViewDiv.style.display = "block";
                //当退出注册界面时 清空信息
                for(var i = 0;i<input_regist.length;i++){
                    // console.log(input_login[i].value)
                    input_regist[i].value = null;
                }
            },function () {
                alert("注册出错了")
            })
        }
    //    ********************发送登录信息****************
        document.getElementById("loginIn_Button").onclick = function () {
            var loginInfo = {
                username:username_login,
                password:password_login
            }
            var UserHandler = userHandlerModel.UserHandler;
            var userHandler = new UserHandler();
            userHandler.login(loginInfo,function () {
                alert("登陆成功");

                logininDiv.style.display = "none";
                firstViewDiv.style.display = "block";
                //当退出登录界面时 清空信息
                for(var i = 0;i<input_login.length;i++){
                    // console.log(input_login[i].value)
                    input_login[i].value = null;
                }
            })
        }
    });



