
websocket相关接口文档
====================
包括**聊天、投票、信令服务器、签到**



room : 房间
String room = courseId
只要上课状态为/上课/就可以开启.教师无需在线

收发消息统一为**JSON**格式

消息有两种

* 群体转发
* 指定转发

具体格式如下：
```json
{
    "type" : "string",
    "name" : "string",
    "target":"string",
    "data" : "whatever...."
}
```
*群发的消息，可以不指定target，（服务器不需要检查）*

**老师断开后,群体转发**
```json
{
"type":"inform-close"
}
```
**老师连接后,群体转发**
```json
{
"type":"inform-open"
}
```


信令服务器
--------
交换ice候选信息（指定转发）
```json
{
"type":"new-ice-candidate",
"name":"xiaoming",
"target":"lihua",
"data" : "string"

}
```

学生（只能是学生）向老师发起offer（指定转发）
```json
{
"type":"video-offer",
"name":"xiaoming",
"data" : "string"
}
```

老师（只能是老师）回应学生answer（指定转发）
```json
{
"type":"video-answer",
"name":"lihua",
"target":"xioaming",
"data" : "string"
}
```

签到(只发给教师就是了)
---
```json
{
"type":"new-check-in",
"name":"userid",
"data":"name"
}
```
```json
{
"type":"new-check-out",
"name":"userID",
"data":"nameaaa"
}
```

讨论
---
聊天已开启（群体转发）
```json
{
"type":"chat-open",
"name":"lihua"
}
```
聊天已关闭（群体转发）
```json
{
"type":"chat-closed",
"name":"lihua"
}
```
发送消息（群体转发）
```json
{
"type":"send-message",
"name":"string",
"data":"string"
}
```

投票
---
投票已开启（群体转发）
```json
{
"type":"vote-open",
"name":"lihua"
}
```

投票已关闭（群体转发）
```json
{
"type":"vote-closed",
"name":"lihua"
}
```

发送投票（转发教师）
```json
{
"type":"send-vote",
"name":"string",
"data":"string"
}
```


返回错误信息
```json
{
"type":"error",
"data":"error message"
}
```
