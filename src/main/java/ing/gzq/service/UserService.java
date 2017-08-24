package ing.gzq.service;

import ing.gzq.base.Result;
import ing.gzq.base.ResultCache;
import ing.gzq.dao.UserDao;
import ing.gzq.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by gzq on 17-7-20.
 */
@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserDao userDao;

    @Autowired
    PasswordEncoder bcryptEncoder;

    public static final String STUDENT_ROLE = "ROLE_STUDENT";

    public static final String TEACHER_ROLE = "ROLE_TEACHER";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = userDao.getUserByUsername(username);
            System.out.println("user = " + user);
            return user;
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return null;
    }

    @Transactional
    public Result insertUser(User user) {

        if (!"student".equals(user.getType()) && !"teacher".equals(user.getType())) {
            return ResultCache.getFailureDetail("用户类型只能为student or teacher");
        }
        userDao.insertUser(user);
        if ("student".equals(user.getType())) {
            userDao.giveAuthority(user.getUsername(), STUDENT_ROLE);
        } else {
            userDao.giveAuthority(user.getUsername(), TEACHER_ROLE);
        }
        return ResultCache.OK;

    }

    public static User getUserInSecurityContext() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }


    public Result modifyName(User user) {
        User u = getUserInSecurityContext();
        if(!checkPassword(user.getPassword(),u.getPassword())){
            return ResultCache.getFailureDetail("密码输入错误");
        }
        u.setName(user.getName());
        try{
            userDao.updateUserName(u);
            return ResultCache.OK;
        }catch (Exception ex){
            ex.printStackTrace();
            return ResultCache.getFailureDetail(ex.getMessage());
        }
    }


    private boolean checkPassword(String input, String saved) {
        return bcryptEncoder.matches(input,saved);
    }
}
