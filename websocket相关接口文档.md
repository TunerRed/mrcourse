websocket相关接口文档
====================
包括**聊天、投票、信令服务器**

url : wss://0.0.0.0?uid=username

uid : 用户唯一标识符

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
    "data" : "object"
}
```
*群发的消息，可以不指定target，（服务器不需要检查）*

信令服务器
--------
交换ice候选信息（指定转发）
```json
{
"type":"new-ice-candidate",
"name":"xiaoming",
"target":"lihua",
"data":"whatever..."
}
```

学生（只能是学生）向老师发起offer（指定转发）
```json
{
"type":"video-offer",
"name":"xiaoming",
"data":"whatever..."
}
```

老师（只能是老师）回应学生answer（指定转发）
```json
{
"type":"video-answer",
"name":"lihua",
"target":"xioaming",
"data":"whatever..."
}
```

聊天
---
开启聊天（只能老师开启）（群体转发）
```json
{
"type":"open-chat",
"name":"lihua"
}
```

关闭聊天（只能老师关闭）（群体转发）
```json
{
"type":"close-chat",
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
开启投票（只能老师开启）（群体转发）
```json
{
"type":"open-vote",
"name":"lihua"
}
```

关闭投票（只能老师关闭）（群体转发）
```json
{
"type":"close-vote",
"name":"lihua"
}
```

发送消息（群体转发）
```json
{
"type":"send-vote",
"name":"string",
"data":"string"
}
```