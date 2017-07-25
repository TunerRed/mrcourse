package ing.gzq.service;

import ing.gzq.base.Result;
import ing.gzq.base.ResultCache;
import ing.gzq.dao.UserDao;
import ing.gzq.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Created by gzq on 17-7-20.
 */
@Service
public class UserService {

    @Autowired
    UserDao userDao;

    public Result insertUser(User user) {
        try {
            userDao.insertUser(user);
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
