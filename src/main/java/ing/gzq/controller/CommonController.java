package ing.gzq.controller;

import ing.gzq.exception.FileNotFoundException;
import ing.gzq.base.Result;
import ing.gzq.base.ResultCache;
import ing.gzq.model.SharedFile;
import ing.gzq.model.User;
import ing.gzq.service.CourseService;
import ing.gzq.service.FileService;
import ing.gzq.service.NoticeService;
import ing.gzq.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;

@RestController
@RequestMapping("/common")
public class CommonController {

    @Autowired
    CourseService courseService;

    @Autowired
    FileService fileService;

    @Autowired
    NoticeService noticeService;

    @Autowired
    UserService userService;

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

    @RequestMapping(value = "/course/{courseId}", method = RequestMethod.GET)
    public Result getCourse(@PathVariable Long courseId) {

        return courseService.getCourseById(courseId);
    }

    @RequestMapping(value = "/notice/{courseId}", method = RequestMethod.GET)
    public Result getNotice(@PathVariable Long courseId) {
        return noticeService.getNotice(courseId);
    }

    @RequestMapping(value = "/file/{courseId}", method = RequestMethod.GET)
    public Result getFiles(@PathVariable Long courseId) {
        return fileService.getFiles(courseId);
    }

    @RequestMapping(value = "/file/{courseId}", method = RequestMethod.POST)
    public Result uploadFile(@PathVariable Long courseId,
                             MultipartFile file) {
        return fileService.uploadfile(courseId, file);
    }

    @RequestMapping(value = "/file/download/{fileId}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> download(@PathVariable Long fileId) {
        try {
            SharedFile sharedFile = fileService.getFileById(fileId);
            ClassPathResource resource = new ClassPathResource("static/file" + File.separator +
                    sharedFile.getCourseId() + File.separator + sharedFile.getId());
            File file = resource.getFile();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", URLEncoder.encode(sharedFile.getFileName(), "UTF-8"));
            return new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), headers, HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            throw new FileNotFoundException("文件不存在");
        }
    }

    @RequestMapping(value = "/user/{userId}", method = RequestMethod.GET)
    public Result getProfile(@PathVariable String userId) {
        return ResultCache.getDataOk(userService.loadUserByUsername(userId));
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public Result modifyName(User user) {
        if(StringUtils.isEmpty(user.getPassword()) || !StringUtils.isEmpty(user.getName()))
            return ResultCache.getFailureDetail("昵称 或 密码 为空");
        return userService.modifyInfo(user);
    }
}
