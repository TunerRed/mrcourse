package ing.gzq.dao;

import ing.gzq.model.Course;
import ing.gzq.model.Lesson;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by gzq on 17-7-20.
 */
@Repository
public interface CourseDao {
    void insertCourse(Course course);

    List<Course> getCourseByTeacherId(String teacherId);

    List<Lesson> getLessons(Long courseId);

    List<Course> getCourseByStudentId(String studentId);
}
