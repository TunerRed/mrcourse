package ing.gzq.websocket;

import com.alibaba.fastjson.JSON;
import ing.gzq.model.Message;
import ing.gzq.model.Room;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static ing.gzq.websocket.WebsocketContainer.*;

@Component
public class WebsocketSupport {

     /*
        0 : 正常
        1 : 找不到房间
        2 : 找不到人
     */

    public int sendMessageToTeacher(String roomId,Message message) throws IOException {
        Room room = getRoomById(roomId);
        if (room == null) return 1;
        WebSocket teacher = room.getTeacherWebSocket();
        if (teacher == null) return 2;
        teacher.sendMessage(JSON.toJSONString(message));
        return 0;
    }

}
