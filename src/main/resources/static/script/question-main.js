/**
 * Created by weng on 2017/9/1.
 */

require.config({
    baseUrl:"script/module"
});
require(['API','userHandler'],function (API,user) {
    var courseId = 1;
    var bundle = 'test weng';
    var teacherHandler = user.TeacherHandler;
    var teacher = new teacherHandler();

    teacher.login({username:'gzq9425',password:'123'},function(){
        teacher.uploadNotice(courseId,bundle,function(){

        });
    });
    
    
});