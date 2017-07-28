package ing.gzq.service;

import ing.gzq.base.Result;
import ing.gzq.base.ResultCache;
import ing.gzq.dao.NoticeDao;
import ing.gzq.model.Notice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            return ResultCache.getFailureDetail("参数不能为空");
        }
    }
}
