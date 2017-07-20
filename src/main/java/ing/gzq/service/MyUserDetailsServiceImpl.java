package ing.gzq.service;

import ing.gzq.dao.UserDao;
import ing.gzq.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Created by gzq on 17-6-10.
 */
@Service
public class MyUserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserDao userDao;


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
}
