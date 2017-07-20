#websocket相关接口文档

包括**聊天、投票、信令服务器**

url : wss://0.0.0.0?uid=username

uid : 用户唯一标识符

收发消息统一为**JSON**格式，具体格式如下：

{
    type : string
}

消息有两种
* 群发

##信令服务器

