package ing.gzq.model;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by gzq on 17-7-19.
 */
@Data
@NoArgsConstructor
public class Message<T> {

    String type;
    String name;
    String target;
    T data;

    public Message(String type) {
        this.type = type;
    }
}
