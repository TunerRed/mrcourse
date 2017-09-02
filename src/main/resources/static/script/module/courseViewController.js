/**
 * Created by weng on 2017/9/2.
 * 这一块是用数据来控制视图的模块
 */
define(function (require) {
    var userModel = require("userHandler");
    //人员权限
    var userHandler =userModel.TeacherHandler;
    var user = new userHandler();

//模拟登陆，这是在其他登陆页面没有写完的时候测试使用，最后删掉即可
    function logintestModel() {
        user.login({username:'gzq9425',password:'123'},function(){})

    }
    logintestModel();
    function eventBinding() {
        var close_btn = document.getElementById('left-side').getElementsByClassName('close')
        for(var i =0;i<close_btn.length;i++){
            close_btn[i].addEventListener('click',
                (function () {
                    var ind = i;
                    var index = close_btn[ind].parentNode.parentNode.dataset.idx;

                    return ()=>deleteNotice(index);
                })(i)
                ,false)
        }
    }
    function showNotice(courseId) {
        return user.getNotice(courseId,function (data) {
            var left_list = document.getElementById('left-side');

            var list ='';
            data.map((item,index)=>{
                list +=`<div class="card" data-idx=${item.id}>
                <div class="card-title">${item.date.substring(0,10)} <span class="close">X</span></div>
                <div class="card-content">&nbsp;&nbsp;${item.content}</div>
            </div>`
            });
            left_list.innerHTML = list;
            eventBinding();

        })
    }

    //老师权限
    function postNotice(courseId) {
        var content = document.getElementById('mode-content').value;
        console.log(content);
        // user.uploadNotice(courseId,content,function () {
        //     showNotice(courseId);
        //
        // });
    }
    function deleteNotice(noticeId) {
        console.log(noticeId)
    }




    //学生权限
    return {
        showNotice:showNotice,
        postNotice:postNotice,
        deleteNotice:deleteNotice
    }
});