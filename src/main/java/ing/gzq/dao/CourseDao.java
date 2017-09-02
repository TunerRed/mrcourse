package ing.gzq.dao;

import ing.gzq.model.Course;
import ing.gzq.model.Lesson;
import ing.gzq.model.StudentInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by gzq on 17-7-20.
 */
@Repository
public interface CourseDao {
    void insertCourse(Course course);

    List<Course> getCourseByTeacherId(String teacherId);

//    List<Lesson> getLessons(Long courseId);

    List<Course> getCourseByStudentId(String studentId);

//    void insertLesson(Lesson lesson);

//    void updateLessonStateToZero(Long lessonId);

    List<Course> search(String regex);

    void insertStudentToCourse(@Param("courseId") Long courseId,@Param("studentId") String studentId);

    void modifyCourse(Course course);

    List<StudentInfo> getStudentsByCourseId(Long courseId);

    void deleteStudent(@Param("courseId") Long courseId,@Param("studentId") String studentId);

    void modifyCourseState(Course course);

    void sign(@Param("courseId") Long courseId,@Param("studentId") String studentId);

    void clearSign(Long courseId);

    List<StudentInfo> getAllSignedStudent(Long courseId);

    Course getCourseById(Long courseId);

    List<Course> getAllCourse();
}
