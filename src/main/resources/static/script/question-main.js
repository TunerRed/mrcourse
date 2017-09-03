/**
 * Created by weng on 2017/9/1.
 */

require.config({
    baseUrl:"script/module"
});
require(['courseViewController'],function (viewControl) {
    var courseId = 1;
    viewControl.showNotice(courseId);


    //event binding
    if(document.getElementById('icon-1')){
        document.getElementById('icon-1').addEventListener('click',function () {
            showMode('bulletin');
        })
        document.getElementById('icon-2').addEventListener('click',function () {
            showMode('question');
        })
    }

    document.getElementById('icon-3').addEventListener('click',function () {
        console.log(11)
        showMode('material');
    })

    function showMode(m) {
        closeMode();
        var body = document.body;
        var div = document.createElement('div');
        div.className = 'mode';
        div.id = m;
        if(m=='bulletin'){
            div.innerHTML = `<img class="mode-icon" src="image/bulletin-icon.png" alt="">
        <div class="mode-head">发布公告</div>
        <textarea name="" id="mode-content" class="mode-content" placeholder="请输入公告内容"></textarea>
        <div class="mode-btn">
            <img src="image/cancel.png" alt="" onclick="closeMode()">
            <img src="image/upload.png" alt="" id="post-btn1">
        </div>`;
            body.appendChild(div);

            document.getElementById('post-btn1').addEventListener('click',function () {
                viewControl.postNotice(courseId);
                closeMode();
            })
        }else if(m=='question'){
            div.innerHTML = `<img class="mode-icon" src="image/question-icon.png" alt="">
        <div class="mode-head">发布问题</div>
        <textarea name="" id="mode-content" class="mode-content" placeholder="请输入问题内容"></textarea>
        <div class="mode-btn">
            <img src="image/cancel.png" alt="" onclick="closeMode()">
            <img src="image/upload.png" alt="" id="post-btn2">
        </div>`;
            body.appendChild(div);

            document.getElementById('post-btn2').addEventListener('click',function () {
                viewControl.postQuestion(courseId);
                closeMode();
            })
        }else{
            div.innerHTML = `<img class="mode-icon" src="image/material-icon.png" alt="">
        <div class="mode-head">发布资料</div>
        <div class="mode-name" id="file-name" style="display: none"> <span class="gray-word"></span></div>
        <input type="file" id="btn_file" style="display:none" onchange="showFileDetial()">
        <div class="mode-state" id="fileShow" style="display: none"><img src="image/material-a.png" alt="">加载成功！</div>
        <div class="mode-state" id="fileUnshow" onclick="F_Open_dialog()" style="color: #7c7c7c"><img src="image/material.png"  alt="">点击上传</div>
        <div class="mode-btn">
            <img src="image/cancel.png" alt="" onclick="closeMode()">
            <img src="image/upload.png" alt="" id="post-btn3">
        </div>`;
            body.appendChild(div);

            document.getElementById('post-btn3').addEventListener('click',function () {
                viewControl.uploadFile(courseId);
                // closeMode();
            })
        }





    }
    function closeMode() {
        var mode = document.getElementsByClassName('mode');
        for(var j = 0;j<mode.length;j++){
            mode[j].remove();
        }
    }






    
    
    
});