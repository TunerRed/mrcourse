/**
 * Created by 延松松松松 on 2017/8/20.
 */
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

//对关闭图标的显示
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



