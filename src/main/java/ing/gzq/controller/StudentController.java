package ing.gzq.controller;

import ing.gzq.base.Result;
import ing.gzq.base.ResultCache;
import ing.gzq.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    CourseService courseService;

    @RequestMapping(value = "/search/{keyword}", method = RequestMethod.GET)
    public Result search(@PathVariable String keyword) {
        if (StringUtils.isEmpty(keyword)) {
            return ResultCache.getFailureDetail("keyword不能为空");
        }
        return courseService.search(keyword);
    }

    @RequestMapping(value = "/course/join/{courseId}", method = RequestMethod.POST)
    public Result join(@PathVariable  Long courseId) {
        return courseService.joinCourse(courseId);
    }

    @RequestMapping(value = "/course/quit/{courseId}", method = RequestMethod.POST)
    public Result quitCourse(@PathVariable  Long courseId) {
        return courseService.quitCourse(courseId);
    }

    @RequestMapping(value = "/checkIn/{courseId}", method = RequestMethod.POST)
    public Result sign(@PathVariable Long courseId) {
        return courseService.sign(courseId);
    }
    
    @RequestMapping(value = "/course/all", method = RequestMethod.GET)
    public Result getAllCourse() {
        return courseService.getAllCourse();
    }
}
