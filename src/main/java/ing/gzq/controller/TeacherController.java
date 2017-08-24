package ing.gzq.controller;

import ing.gzq.base.Result;
import ing.gzq.model.Course;
import ing.gzq.model.Lesson;
import ing.gzq.model.Notice;
import ing.gzq.model.User;
import ing.gzq.service.CourseService;

import ing.gzq.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Created by gzq on 17-7-20.
 */
@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    CourseService courseService;

    @Autowired
    NoticeService noticeService;

    @RequestMapping(value = "/course", method = RequestMethod.POST)
    public Result createCourse(Authentication auth, Course course) {
        course.setTeacherId(((User) auth.getPrincipal()).getUsername());
        return courseService.insertCourse(course);
    }

    @RequestMapping(value = "/notice/{courseId}", method = RequestMethod.POST)
    public Result uploadNotice(@PathVariable Long courseId, Notice notice) {
        notice.setCourseId(courseId);
        return noticeService.uploadNotice(notice);
    }

//    @RequestMapping(value = "/start/{courseId}", method = RequestMethod.POST)
//    public Result startNewLesson(@PathVariable Long courseId, Lesson lesson) {
//        lesson.setCourseId(courseId);
//        return courseService.startNewLesson(lesson);
//    }
//
//    @RequestMapping(value = "/end/{lessonId}", method = RequestMethod.POST)
//    public Result endLesson(@PathVariable Long lessonId) {
//        return courseService.endLesson(lessonId);
//    }

}
