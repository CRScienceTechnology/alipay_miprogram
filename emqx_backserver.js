const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt'); //引入node的mqtt客户端构建包

const app = express();   //创建一个新的 Express 应用实例,解析https请求体
const client = mqtt.connect('mqtt://127.0.0.1:1883', {clientId: 'emqx_backserver'});//设置要连接的mqtt客户端地址端口(默认端口1883)以及客户端id

const PORT = process.env.PORT || 3001; // 设置端口
let status;
let time_on;
let tablecode;  //创建麻将机变量
// 使用 body-parser 中间件解析 JSON 格式的请求体
app.use(bodyParser.json());

app.post('/api_mqtt/emqx_analysis', async (req, res) => {
    try {
        const data_receive = req.body; //解析http的请求体,解析结果为一个对象
        console.log('Received data:', data_receive);//打印出请求头对象

        status = data_receive.status; // 获取请求体中的status值
        time_on = data_receive.time_on; //获取请求体中time_on,即麻将机开机时间参数
        tablecode =data_receive.mahjong_code;

        console.log("开启时间为", time_on);//判断前端是否传入了https请求
        console.log('mahjiong'+String(tablecode));//打印麻将桌编号值
       
        
        // 发送MQTT消息至指定主题，这里假设使用一个与状态相关的主题
        // 并且将整个data_receive对象作为消息内容发送给订阅的mahjong1主题
        client.subscribe('mahjiong'+String(tablecode), (err) => {
        if (!err) {
            //此处订阅消息的主题名字错了导致其他客户端一直看不到消息
            console.log("EMQX IS OK"); //此打印函数默认换行
           client.publish('mahjiong'+String(tablecode), JSON.stringify(data_receive), { qos: 0}, (error) => {
            if (error) {
                console.error('Error publishing MQTT message:', error);
                // 可能需要在这里处理错误，比如重试或者记录日志
                // 注意前端后端统一json结构体的键名，方便emqx服务器接收
                // 以及esp8266做json解析
                
            } else {
                console.log('MQTT message sent successfully.');
            }
        });
        } else {
            console.error('Error subscribing to '+String(tablecode)+':', err);
        }
    });
        

        // 返回响应给客户端，表明处理成功
        res.status(200).json({ message: 'Data received and processed successfully.' });
        
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

//开启mqtt订阅服务，异步执行
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    //publish函数一定是在subscribe方法下的？
});

// 监听指定端口，开始接受来自客户端的请求
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});



//总结：订阅消息主题的名字别搞错了，下次用一个变量保存高度服用的值
//client和app方法两个方法并非开了两个线程去执行而是一个进程异步执行，开两个线程那叫并行执行
//subscribe函数可以执行多次订阅不同的主题，方法本身会记忆订阅的主题
//注意，publish函数只能传入已经订阅的主题字符串名