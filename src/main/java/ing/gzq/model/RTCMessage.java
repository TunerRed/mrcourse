package ing.gzq.model;

import lombok.Data;

/**
 * Created by gzq on 17-7-19.
 */
@Data
public class RTCMessage {

    //video-offer video-answer
    String type;

    String name;

    String target;

    String sdp;

}
