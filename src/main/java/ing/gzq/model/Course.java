package ing.gzq.model;

import lombok.Data;

import java.util.List;

/**
 * Created by gzq on 17-7-20.
 */
@Data
public class Course {

    Long id;
    String teacherId;
    TeacherInfo teacherInfo;
    String name;
    String introduce;
    List<Lesson> lessons;
    String date;
    boolean state = false;

}
