package ing.gzq.controller;

import ing.gzq.base.Result;
import ing.gzq.base.ResultCache;
import ing.gzq.model.User;
import ing.gzq.service.CourseService;
import ing.gzq.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/common")
public class CommonController {

    @Autowired
    CourseService courseService;

    @Autowired
    FileService fileService;

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

    @RequestMapping(value = "/file", method = RequestMethod.GET)
    public Result getFiles(Long courseId) {
        return null;
    }

    @RequestMapping(value = "/file", method = RequestMethod.POST)
    public Result uploadFile(Long courseId, MultipartFile file)  {
        return fileService.uploadfile(courseId , file);
    }
}
