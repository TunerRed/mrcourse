package ing.gzq.service;

import ing.gzq.base.Result;
import ing.gzq.base.ResultCache;
import ing.gzq.dao.CourseDao;
import ing.gzq.model.Course;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;

/**
 * Created by gzq on 17-7-20.
 */
@Service
public class CourseService {

    @Autowired
    CourseDao courseDao;


    public Result insertCourse(Authentication auth , Course course) {
        try {
            course.setTeacherId(((User)auth.getPrincipal()).getUsername());
            courseDao.insertCourse(course);
            HashMap map = new HashMap<>();
            map.put("courseId",course.getId());
            return ResultCache.getDataOk(map);
        }catch (Exception e){
            e.printStackTrace();
            return ResultCache.getFailureDetail("插入课程失败");
        }
    }
}
