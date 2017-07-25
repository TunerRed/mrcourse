package ing.gzq.model;

import lombok.Data;

@Data
public class SharedFile {

    Long id;
    Long courseId;
    String uploaderId;
    String uploaderName;
    String fileName;
    Long size;
    String date;
}
