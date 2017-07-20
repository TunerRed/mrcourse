package ing.gzq.dao;

import ing.gzq.model.Course;
import org.springframework.stereotype.Repository;

/**
 * Created by gzq on 17-7-20.
 */
@Repository
public interface CourseDao {
    void insertCourse(Course course);
}
