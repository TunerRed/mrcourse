package ing.gzq.model;

import lombok.Data;

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
    Boolean state;
    Boolean teacherOnline;
    Boolean chat;
    Boolean vote;
    String date;
}
