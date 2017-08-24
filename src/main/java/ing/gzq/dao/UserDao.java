package ing.gzq.dao;


import ing.gzq.model.TeacherInfo;
import ing.gzq.model.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by gzq on 17-7-19.
 */
@Repository
public interface UserDao {
    User getUserByUsername(String username);

    List<SimpleGrantedAuthority> getAuthorities(String username);

    void insertUser(User user);

    TeacherInfo getTeacherInfo(String teacherId);

    void giveAuthority(@Param("username") String username,@Param("role") String role);

    void updateUserName(User u);
}
