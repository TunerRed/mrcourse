package ing.gzq.websocket;

import ing.gzq.model.User;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

public class WebSocketInterceptor implements HandshakeInterceptor{
    @Override
    public boolean beforeHandshake(ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Map<String, Object> map) throws Exception {
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String room = ((ServletServerHttpRequest)serverHttpRequest).getServletRequest().getParameter("room");
        if(user == null || room == null){
            return false;
        }
        map.put("username",user.getUsername());
        map.put("type",user.getType());
        map.put("room",room);
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Exception e) {

    }
}
