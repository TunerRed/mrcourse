package ing.gzq.websocket;

import ing.gzq.model.Room;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebsocketContainer {

    private static Map<String, Room> roomMap = new ConcurrentHashMap<>();


    public static Room getRoomById(String roomId) {
        return roomMap.get(roomId);
    }

    public static boolean containsRoom(String roomId) {
        return roomMap.containsKey(roomId);
    }

    public static void createNewRoomByStudent(String roomId,String studentId,WebSocket webSocket){
        Room room = new Room(roomId,null,null);
        room.addStudent(studentId,webSocket);
        roomMap.put(roomId,room);
    }

    public static void createNewRoomByTeacher(String roomId,String teacher,WebSocket webSocket){
        Room room = new Room(roomId,teacher,webSocket);
        roomMap.put(roomId,room);
    }
}
