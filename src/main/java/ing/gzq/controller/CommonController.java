package ing.gzq.controller;

import ing.gzq.base.Result;
import ing.gzq.base.ResultCache;
import ing.gzq.model.User;
import ing.gzq.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/common")
public class CommonController {

    @Autowired
    CourseService courseService;

    @RequestMapping(value = "/course", method = RequestMethod.GET)
    public Result getCourse(Authentication auth) {
        User user = (User) auth.getPrincipal();
        String type = user.getType();
        if ("teacher".equals(type)) {
            return courseService.getCourseByTeacherId(user.getUsername());
        } else if ("student".equals(type)) {
            return courseService.getCourseByStudentId(user.getUsername());
        }
        return ResultCache.FAILURE;
    }
}
