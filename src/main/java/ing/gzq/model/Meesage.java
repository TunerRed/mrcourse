package ing.gzq.model;

import lombok.Data;

/**
 * Created by gzq on 17-7-19.
 */
@Data
public class Meesage<T> {

    String type;
    String name;
    String target;
    T data;

}
