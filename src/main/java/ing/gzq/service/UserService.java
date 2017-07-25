package ing.gzq.service;

import ing.gzq.base.Result;
import ing.gzq.base.ResultCache;
import ing.gzq.dao.UserDao;
import ing.gzq.model.TeacherInfo;
import ing.gzq.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by gzq on 17-7-20.
 */
@Service
public class UserService {

    @Autowired
    UserDao userDao;

    public static final String STUDENT_ROLE = "ROLE_STUDENT";

    public static final String TEACHER_ROLE = "ROLE_TEACHER";

    @Transactional
    public Result insertUser(User user) {
        try {
            if (!user.getType().equals("student") && !user.getType().equals("teacher")) {
                return ResultCache.getFailureDetail("用户类型只能为student or teacher");
            }
            userDao.insertUser(user);
            if ("student".equals(user.getType())) {
                userDao.giveAuthority(user.getUsername(), STUDENT_ROLE);
            } else {
                userDao.giveAuthority(user.getUsername(), TEACHER_ROLE);
            }
            return ResultCache.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultCache.getFailureDetail("操作失败 部分用户信息为空");
        }
    }

    public User getUserInSecurityContext() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }


}
