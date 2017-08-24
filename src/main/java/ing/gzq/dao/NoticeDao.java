package ing.gzq.dao;


import ing.gzq.model.Notice;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeDao {
    void insertNotice(Notice notice);

    List<Notice> getNotice(Long courseId);

    void deleteNotice(Long noticeId);
}
