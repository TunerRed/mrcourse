package ing.gzq.service;

import ing.gzq.base.Result;
import ing.gzq.base.ResultCache;
import ing.gzq.dao.NoticeDao;
import ing.gzq.model.Notice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

    @Autowired
    NoticeDao noticeDao;

    public Result uploadNotice(Notice notice) {
        try{
            noticeDao.insertNotice(notice);
            return ResultCache.OK;
        }catch (Exception e){
            e.printStackTrace();
            return ResultCache.getFailureDetail(e.getMessage());
        }
    }

    public Result getNotice(Long courseId) {
        List<Notice> noticeList = noticeDao.getNotice(courseId);
        return ResultCache.getDataOk(noticeList);
    }

    public Result deleteNotice(Long noticeId) {
        try{
            noticeDao.deleteNotice(noticeId);
            return ResultCache.OK;
        }catch (Exception e){
            e.printStackTrace();
            return ResultCache.getFailureDetail(e.getMessage());
        }
    }
}
