package ing.gzq.controller;

import ing.gzq.base.Result;
import ing.gzq.base.ResultCache;
import ing.gzq.model.Course;
import ing.gzq.model.Lesson;
import ing.gzq.model.Notice;
import ing.gzq.model.User;
import ing.gzq.service.CourseService;

import ing.gzq.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
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

    @RequestMapping(value = "/course/{courseId}", method = RequestMethod.POST)
    public Result modifyCourse(@PathVariable Long courseId,Course course) {
        course.setId(courseId);
        if(StringUtils.isEmpty(course.getIntroduce()))
            return ResultCache.getFailureDetail("introduce 为空");
        return courseService.modifyCourse(course);
    }

    @RequestMapping(value = "/notice/{courseId}", method = RequestMethod.POST)
    public Result uploadNotice(@PathVariable Long courseId, Notice notice) {
        notice.setCourseId(courseId);
        return noticeService.uploadNotice(notice);
    }

    @RequestMapping(value = "/notice/delete/{noticeId}", method = RequestMethod.POST)
    public Result deleteNotice(@PathVariable Long noticeId) {
        return noticeService.deleteNotice(noticeId);
    }

    @RequestMapping(value = "/member/{courseId}", method = RequestMethod.GET)
    public Result getMember(@PathVariable Long courseId) {
        return courseService.getAllJoinedStudent(courseId);
    }

    @RequestMapping(value = "/member/delete/{courseId}/{studentId}  ", method = RequestMethod.POST)
    public Result deleteMember(@PathVariable Long courseId,@PathVariable String studentId) {

        return courseService.deleteMember(courseId,studentId);
    }

    @RequestMapping(value = "/course/start/{courseId}", method = RequestMethod.POST)
    public Result startNewLesson(@PathVariable Long courseId) {
        return courseService.startCourse(courseId);
    }

    @RequestMapping(value = "/course/end/{courseId}", method = RequestMethod.POST)
    public Result endLesson(@PathVariable Long courseId) {
        return courseService.endCourse(courseId);
    }

}
