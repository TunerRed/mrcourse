package ing.gzq.model;


import lombok.Data;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.HashMap;

@Data
public class Room {

    Long id;

    String teacherId;

    WebSocketSession teacherSession;

    HashMap<String, WebSocketSession> students;

    public Room(Long id, String teacherId, WebSocketSession teacherSession) {
        this.id = id;
        this.teacherId = teacherId;
        this.teacherSession = teacherSession;
    }

    public void addStudent(String studentId, WebSocketSession session) {
        students.put(studentId, session);
    }


    public void removeStudent(String studentId) {
        students.remove(studentId);
    }

    public void sendToTeacher(String message) throws IOException {
        teacherSession.sendMessage(new TextMessage(message));
    }


    public void sendToStudents(String message) throws IOException {
        for (WebSocketSession session : students.values()) {
            session.sendMessage(new TextMessage(message));
        }
    }


    public void sendToStudent(String target, String message) throws IOException {
        if (students.containsKey(target)) {
            students.get(target).sendMessage(new TextMessage(message));
        }
    }


    public void sendToAll(String message) throws IOException {
        sendToTeacher(message);
        sendToStudents(message);
    }


}
