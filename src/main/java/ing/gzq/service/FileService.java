package ing.gzq.service;

import com.sun.org.apache.bcel.internal.util.ClassPath;
import ing.gzq.base.Result;
import ing.gzq.base.ResultCache;
import ing.gzq.dao.FileDao;
import ing.gzq.model.SharedFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

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
            ClassPathResource resource = new ClassPathResource("static/file");
            file.transferTo(new File(resource.getFile().getAbsolutePath() + File.separator +
                    sharedFile.getCourseId() + File.separator + sharedFile.getId()));
            return ResultCache.OK;
        } catch (IOException e) {
            e.printStackTrace();
            return ResultCache.getFailureDetail(e.getMessage());
        }
    }

    public Result getFiles(Long courseId) {
        List<SharedFile> fileList = fileDao.getFileList(courseId);
        return ResultCache.getDataOk(fileList);
    }

    public SharedFile getFileById(Long fileId) {
        return fileDao.getFileById(fileId);
    }
}
