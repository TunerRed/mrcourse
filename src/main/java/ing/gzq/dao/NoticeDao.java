package ing.gzq.dao;


import ing.gzq.model.Notice;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeDao {
    void insertNotice(Notice notice);
}
