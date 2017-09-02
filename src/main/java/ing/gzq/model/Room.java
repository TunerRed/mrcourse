package ing.gzq.model;


import ing.gzq.websocket.WebSocket;
import lombok.Data;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Data
public class Room {

    String id;

    String teacherId;

    WebSocket teacherWebSocket;

    Map<String, WebSocket> students = new ConcurrentHashMap<>();

    public Room(String id, String teacherId, WebSocket webSocket) {
        this.id = id;
        this.teacherId = teacherId;
        this.teacherWebSocket = webSocket;
    }

    public void addStudent(String studentId, WebSocket webSocket) {
        students.put(studentId, webSocket);
    }


    public void removeStudent(String studentId) {
        students.remove(studentId);
    }

    public void sendToTeacher(String message) throws IOException {
        teacherWebSocket.sendMessage(message);
    }


    public void sendToStudents(String message) throws IOException {
        for (WebSocket session : students.values()) {
            session.sendMessage(message);
        }
    }


    public void sendToStudent(String target, String message) throws IOException {
        if (students.containsKey(target)) {
            students.get(target).sendMessage(message);
        }
    }


    public void sendToAll(String message) throws IOException {
        sendToTeacher(message);
        sendToStudents(message);
    }

    public void sendToTarget(String target, String message) throws IOException {
        if (getTeacherId().equals(target)) {
            sendToTeacher(message);
        } else {
            sendToStudent(target, message);
        }
    }
}
