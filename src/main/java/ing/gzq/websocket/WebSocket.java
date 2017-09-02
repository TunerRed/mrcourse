package ing.gzq.websocket;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import ing.gzq.model.Message;
import ing.gzq.model.Room;
import ing.gzq.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

import static ing.gzq.websocket.WebsocketContainer.*;


@Component
@ServerEndpoint("/websocket")
public class WebSocket{

    String username;
    String type;
    String roomId;
    Room room;
    Session session;

    @OnOpen
    public void afterConnectionEstablished(Session session) throws Exception {
        this.session = session;
        Authentication anth = (Authentication) session.getUserPrincipal();
        if(anth == null) {
            sendMessage(getErrorMessage("not login"));
            session.close();
        }
        User user = (User) anth.getPrincipal();
        System.out.println("user = " + user);
        username = user.getUsername();

        type = user.getType();
        roomId = session.getRequestParameterMap().get("room").get(0);
        if(roomId == null){
            sendMessage(getErrorMessage("no roomId"));
            session.close();
        }
        if ("student".equals(type)) {
            if (containsRoom(roomId)) {
                room = getRoomById(roomId);
                room.addStudent(username, this);
            } else {
                createNewRoomByStudent(roomId,username,this);
            }
        } else if ("teacher".equals(type)) {
            if (containsRoom(roomId)) {
                room = getRoomById(roomId);
                room.setTeacherId(username);
                room.setTeacherWebSocket(this);
                Message<String> message = new Message<>();
                message.setType("inform-open");
                room.sendToStudents(JSON.toJSONString(message));
            } else {
                createNewRoomByTeacher(roomId,username,this);
            }
        }
        System.out.println(username + " connect ");
    }

    @OnMessage
    public void handleTextMessage(String message,Session session) throws IOException {
        JSONObject jb;
        try {
             jb = JSON.parseObject(message);
             sendMessage(getErrorMessage("无法解析字符串为jsonObject"));
        }catch (JSONException ex){
            return;
        }
        if ("new-ice-candidate".equals(jb.getString("type"))) {
            room.sendToTarget(jb.getString("target"),message);
        } else if ("video-offer".equals(jb.getString("type")) && isStudent()) {
            room.sendToTeacher(message);
        } else if ("video-answer".equals(jb.getString("type")) && isTeacher()) {
            room.sendToStudent(jb.getString("target"), message);
        } else if ("send-message".equals(jb.getString("type"))) {
            room.sendToAll(message);
        } else if ("send-vote".equals(jb.getString("type")) && isStudent()) {
            room.sendToAll(message);
        } else if ("open-chat".equals(jb.getString("type")) && isTeacher()) {
            room.sendToAll(message);
        } else if ("close-chat".equals(jb.getString("type")) && isTeacher()) {
            room.sendToAll(message);
        } else if ("open-vote".equals(jb.getString("type")) && isTeacher()) {
            room.sendToAll(message);
        } else if ("close-vote".equals(jb.getString("type")) && isTeacher()) {
            room.sendToAll(message);
        }else if("new-check-in".equals(jb.getString("type")) && isStudent()){
            room.sendToTeacher(message);
        }else if ("new-check-out".equals(jb.getString("type")) && isStudent()) {
            room.sendToTeacher(message);
        }
    }

    @OnError
    public void handleTransportError(Session session, Throwable throwable) throws Exception {
        sendMessage(getErrorMessage("on error"));
        throwable.printStackTrace();
        handleLogout();
        System.err.println(username + " disconnect  error");
    }



    @OnClose
    public void afterConnectionClosed() throws Exception {
        handleLogout();
        session.close();
        System.out.println(username + " disconnect ");
    }

    private void handleLogout() throws IOException {
        if ("teacher".equals(type)) {
            room.setTeacherId(null);
            room.setTeacherWebSocket(null);
            Message<String> message = new Message();
            message.setType("inform-close");
            room.sendToStudents(JSON.toJSONString(message));
        } else if ("student".equals(type)) {
            room.removeStudent(username);
        }
    }

    private String getErrorMessage(String cause) {
        Message<String> errorMessage = new Message<>();
        errorMessage.setType("error");
        errorMessage.setData(cause);
        return JSON.toJSONString(errorMessage);
    }

    public void sendMessage(String message) throws IOException {
        session.getBasicRemote().sendText(message);
    }

    private boolean isStudent(){
        return "student".equals(type);
    }

    private boolean isTeacher(){
        return "teacher".equals(type);
    }
}
