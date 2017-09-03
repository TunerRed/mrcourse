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

    //事件绑定
    function eventBinding() {
        var close_btn = document.getElementById('left-side').getElementsByClassName('close')
        bindingFunction(close_btn,deleteNotice);
        var download_btn = document.getElementsByClassName('download-btn');
        bindingFunction(download_btn,downloadFile);
    }

    function bindingFunction(node,fun) {
        for(var i =0;i<node.length;i++){
            node[i].addEventListener('click',
                (function () {
                    var ind = i;
                    var index = node[ind].parentNode.parentNode.dataset.idx;

                    return ()=>fun(index);
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
    function showFile(courseId) {
        user.getCourseFile(courseId,function (data) {
            var right_side = document.getElementById('right-side');

            var file_list = '';
            data.map((item,index)=>{
                file_list +=`<div class="card" data-idx=${item.id}>
                                <div class="card-head">${item.fileName} <span class="gray-word">${item.size}</span></div>
                                <div class="card-btn">
                                    <!--<img src="image/cancel.png" alt="">-->
                                    <img src="image/download.png" class="download-btn" alt="">
                                </div>
                            </div>`
            });
            right_side.innerHTML = file_list;
        })
    }

    function downloadFile(fileId) {
        user.downloadCourseFile(fileId);
    }

    function uploadFile(courseId) {
        user.uploadCourseFile(courseId,document.getElementById("btn_file").files[0],function () {
            document.getElementById('fileShow').innerText = '上传成功';
            closeMode();
        })
    }


    //老师权限
    function postNotice(courseId) {
        var content = document.getElementById('mode-content').value;
        console.log(content);
        user.uploadNotice(courseId,content,function () {
            showNotice(courseId);

        });
    }
    function deleteNotice(noticeId) {
        console.log(noticeId);
        user.deleteNotice(noticeId,function () {
            // showNotice(courseId);
        })
    }








    //学生权限




    return {
        showNotice:showNotice,
        postNotice:postNotice,
        deleteNotice:deleteNotice,
        uploadFile:uploadFile,
        downloadFile:downloadFile,
        showFile:showFile
    }
});