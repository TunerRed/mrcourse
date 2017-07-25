package ing.gzq.model;

import lombok.Data;

@Data
public class Lesson {

    Long id;

    Long courseId;

    String introduce;

    String date;

    int state;

}
