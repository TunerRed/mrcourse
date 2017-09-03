package ing.gzq.service;

import ing.gzq.base.Result;
import ing.gzq.base.ResultCache;
import ing.gzq.dao.CourseDao;
import ing.gzq.model.Course;
import ing.gzq.model.Message;
import ing.gzq.model.StudentInfo;
import ing.gzq.model.User;
import ing.gzq.websocket.WebsocketSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

import static ing.gzq.base.ResultCache.getFailureDetail;
import static ing.gzq.service.UserService.getUserInSecurityContext;

/**
 * Created by gzq on 17-7-20.
 */
@Service
public class CourseService {

    @Autowired
    CourseDao courseDao;

    @Autowired
    WebsocketSupport websocketSupport;

    public Result insertCourse(Course course) {
        try {
            courseDao.insertCourse(course);
            HashMap<String,Long> map = new HashMap<>();
            map.put("courseId", course.getId());
            return ResultCache.getDataOk(map);
        } catch (Exception e) {
            e.printStackTrace();
            return getFailureDetail("插入课程失败");
        }
    }

    public Result getCourseByTeacherId(String teacherId) {
        List<Course> courseList = courseDao.getCourseByTeacherId(teacherId);
        return ResultCache.getDataOk(courseList);
    }

    public Result getCourseByStudentId(String studentId) {
        List<Course> courseList = courseDao.getCourseByStudentId(studentId);
        return ResultCache.getDataOk(courseList);
    }

    public Result getCourseById(Long courseId) {
        Course course = courseDao.getCourseById(courseId);
        if (course == null) {
            return getFailureDetail("课程不存在");
        }
        return ResultCache.getDataOk(course);
    }

    public Result getAllCourse() {
        List<Course> courseList = courseDao.getAllCourse();
        return ResultCache.getDataOk(courseList);
    }


    public Result startCourse(long courseId) {
        try {
            Course course = new Course();
            course.setId(courseId);
            course.setState(true);
            courseDao.modifyCourseState(course);
            return ResultCache.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return getFailureDetail(e.getMessage());
        }
    }

    @Transactional
    public Result endCourse(long courseId) {
        try {
            Course course = new Course();
            course.setId(courseId);
            course.setState(false);
            courseDao.modifyCourseState(course);
            courseDao.clearSign(courseId);
            return ResultCache.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return getFailureDetail(e.getMessage());
        }
    }

    public Result search(String keyWord) {
        List<Course> courseList = courseDao.search("%" + keyWord + "%");
        return ResultCache.getDataOk(courseList);
    }

    public Result joinCourse(Long courseId) {
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            courseDao.insertStudentToCourse(courseId, user.getUsername());
            return ResultCache.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return getFailureDetail(e.getMessage());
        }
    }

    public Result modifyCourse(Course course) {
        try {
            courseDao.modifyCourse(course);
            return ResultCache.OK;
        } catch (Exception ex) {
            ex.printStackTrace();
            return getFailureDetail(ex.getMessage());
        }
    }

    public Result getAllJoinedStudent(Long courseId) {
        List<StudentInfo> students = courseDao.getStudentsByCourseId(courseId);
        return ResultCache.getDataOk(students);
    }

    public Result deleteMember(Long courseId, String studentId) {
        try {
            courseDao.deleteStudent(courseId, studentId);
            return ResultCache.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return getFailureDetail(e.getMessage());
        }
    }

    public Result quitCourse(Long courseId) {
        User user = getUserInSecurityContext();
        if (user == null)
            return ResultCache.PERMISSION_DENIED;
        try {
            courseDao.deleteStudent(courseId, user.getUsername());
            return ResultCache.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return getFailureDetail(e.getMessage());
        }
    }

    public Result sign(Long courseId) {
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            courseDao.sign(courseId, user.getUsername());

            Message<String> message = new Message<>("new-check-in");
            message.setName(user.getUsername());
            message.setData(user.getName());
            websocketSupport.sendMessageToTeacher(String.valueOf(courseId), message);

            return ResultCache.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return getFailureDetail(e.getMessage());
        }
    }


}
