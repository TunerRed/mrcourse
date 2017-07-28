package ing.gzq.model;

import lombok.Data;

@Data
public class Notice {

    Long id;
    Long courseId;
    String content;
    String date;

}
