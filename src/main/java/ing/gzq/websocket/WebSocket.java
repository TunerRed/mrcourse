package ing.gzq.websocket;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import ing.gzq.model.Message;
import ing.gzq.model.Room;
import org.springframework.web.socket.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class WebSocket implements WebSocketHandler {

    static Map<String, Room> roomMap = new ConcurrentHashMap<>();

    String username;
    String type;
    String roomId;
    Room room;

    @Override
    public void afterConnectionEstablished(WebSocketSession webSocketSession) throws Exception {
        Map<String, Object> attributes = webSocketSession.getAttributes();
        username = (String) attributes.get("username");
        type = (String) attributes.get("type");
        roomId = (String) attributes.get("room");
        if ("student".equals(type)) {
            if (roomMap.containsKey(roomId)) {
                room = roomMap.get(roomId);
                room.addStudent(username, webSocketSession);
            } else {
                room = new Room(roomId, null, null);
                roomMap.put(roomId, room);
                room.addStudent(username,webSocketSession);
            }
        } else if ("teacher".equals(type)) {
            if (roomMap.containsKey(roomId)) {
                room = roomMap.get(roomId);
                room.setTeacherId(username);
                room.setTeacherSession(webSocketSession);
                Message<String> message = new Message<>();
                message.setType("inform-open");
                room.sendToStudents(JSON.toJSONString(message));
            } else {
                room = new Room(roomId, username, webSocketSession);
                roomMap.put(roomId, room);
            }
        }
        System.out.println(username + " connect ");
    }

    private void handleTextMessage(WebSocketSession webSocketSession, TextMessage webSocketMessage) throws IOException {
        String jsonStr = webSocketMessage.getPayload();
        JSONObject jb = JSON.parseObject(jsonStr);
        if ("new-ice-candidate".equals(jb.getString("type"))) {
            if (room.getTeacherId().equals(jb.getString("target"))) {
                room.sendToTeacher(jsonStr);
            } else {
                room.sendToStudent(jb.getString("target"), jsonStr);
            }
        } else if ("video-offer".equals(jb.getString("type")) && "student".equals(type)) {
            room.sendToTeacher(jsonStr);
        } else if ("video-answer".equals(jb.getString("type")) && "teacher".equals(type)) {
            room.sendToStudent(jb.getString("target"), jsonStr);
        } else if ("send-message".equals(jb.getString("type"))) {
            room.sendToAll(jsonStr);
        } else if ("send-vote".equals(jb.getString("type")) && "student".equals(type)) {
            room.sendToAll(jsonStr);
        } else if ("open-chat".equals(jb.getString("type")) && "teacher".equals(type)) {
            room.sendToAll(jsonStr);
        } else if ("close-chat".equals(jb.getString("type")) && "teacher".equals(type)) {
            room.sendToAll(jsonStr);
        } else if ("open-vote".equals(jb.getString("type")) && "teacher".equals(type)) {
            room.sendToAll(jsonStr);
        } else if ("close-vote".equals(jb.getString("type")) && "teacher".equals(type)) {
            room.sendToAll(jsonStr);
        }
    }

    @Override
    public void handleTransportError(WebSocketSession webSocketSession, Throwable throwable) throws Exception {
        throwable.printStackTrace();
        handleLogout();
        webSocketSession.close();
        System.err.println(username + " disconnect  error");
    }

    private void handleLogout() throws IOException {
        if ("teacher".equals(type)) {
            room.setTeacherId(null);
            room.setTeacherSession(null);
            Message<String> message = new Message();
            message.setType("inform-close");
            room.sendToStudents(JSON.toJSONString(message));
        } else if ("student".equals(type)) {
            room.removeStudent(username);
        }
    }


    @Override
    public void afterConnectionClosed(WebSocketSession webSocketSession, CloseStatus closeStatus) throws Exception {
        handleLogout();
        webSocketSession.close();
        System.out.println(username + " disconnect ");
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    @Override
    public void handleMessage(WebSocketSession webSocketSession, WebSocketMessage<?> webSocketMessage) throws Exception {
        if (webSocketMessage instanceof TextMessage) {
            handleTextMessage(webSocketSession, (TextMessage) webSocketMessage);
        } else {
            System.err.println(" not text message ");
        }
    }

    private TextMessage getErrorMessage(String cause) {
        Message<String> errorMessage = new Message<>();
        errorMessage.setType("error");
        errorMessage.setData(cause);
        return new TextMessage(JSON.toJSONString(errorMessage));
    }
}
