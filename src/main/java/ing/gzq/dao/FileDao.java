package ing.gzq.dao;

import ing.gzq.model.SharedFile;
import org.springframework.stereotype.Repository;

@Repository
public interface FileDao {

    void insertFile(SharedFile sharedFile);
}
