package ing.gzq.dao;

import ing.gzq.model.SharedFile;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileDao {

    void insertFile(SharedFile sharedFile);

    List<SharedFile> getFileList(Long courseId);

    SharedFile getFileById(Long fileId);
}
