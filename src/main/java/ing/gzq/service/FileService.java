package ing.gzq.service;

import ing.gzq.base.Result;
import ing.gzq.base.ResultCache;
import ing.gzq.dao.FileDao;
import ing.gzq.model.SharedFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class FileService {

    @Autowired
    FileDao fileDao;

    @Autowired
    UserService userService;

    public Result uploadfile(Long courseId, MultipartFile file) {
        try {
            SharedFile sharedFile = new SharedFile();
            sharedFile.setCourseId(courseId);
            sharedFile.setFileName(file.getOriginalFilename());
            sharedFile.setSize(file.getSize());
            sharedFile.setUploaderId(userService.getUserInSecurityContext().getUsername());
            fileDao.insertFile(sharedFile);
            file.transferTo(new File(courseId + File.separator + sharedFile.getId()));
            return ResultCache.OK;
        } catch (IOException e) {
            e.printStackTrace();
            return ResultCache.getFailureDetail(e.getMessage());
        }
    }
}
