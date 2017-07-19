package ing.gzq.dao;


import ing.gzq.model.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by gzq on 17-7-19.
 */
@Repository
public interface UserDao {
    User getUserById(String username);

    List<SimpleGrantedAuthority> getAuthorities(String id);

}
