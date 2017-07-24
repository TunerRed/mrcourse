package ing.gzq.controller;

import ing.gzq.base.Result;
import ing.gzq.model.Course;
import ing.gzq.service.CourseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by gzq on 17-7-20.
 */
@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    CourseService courseService;


    @RequestMapping(value = "/createCourse", method = RequestMethod.POST)
    public Result createCourse(Authentication auth, Course course) {
        return courseService.insertCourse(auth, course);
    }


}
