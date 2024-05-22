const express = require('express');
const bodyParser = require('body-parser');

const app = express();   //创建一个新的 Express 应用实例。这个实例是服务器的核心
const PORT = process.env.PORT || 3000; // 设置端口

// 使用 body-parser 中间件解析 JSON 格式的请求体
app.use(bodyParser.json());

// POST 路由，用于接收前端发送的 JSON 数据
app.post('/api/create-order', (req, res) => {
  // req.body 包含了 JSON 请求体中的数据
  const sendData = req.body; //将json转换为JavaScript中的字典对象了

  // 在这里处理前端发送的数据，例如创建订单
  console.log('Received data:', sendData); // 打印接收到的数据，用于调试

  try {
    // 假设订单创建逻辑
    const result = createOrder(sendData);

    // 假设订单创建成功，返回成功响应
    res.status(200).json({
      success: true,
      data: result,
      message: '订单创建成功',
    });
  } catch (error) {
    // 如果订单创建失败，返回错误响应
    res.status(500).json({
      success: false,
      errorMessage: error.message || '创建订单失败，请重试',
    });
  }
});

// 示例函数，模拟创建订单的逻辑
function createOrder(data) {
  // 这里应该是订单创建的逻辑，例如保存到数据库等
  // 这里只是一个示例，返回一个包含订单号的对象
  //调用alipay.trade.create 获取trade_no
  
  const order = {
    tradeNo: 'ORDER123456789', // 假设的订单号
    // 其他订单相关信息
  };
  
  // 假设订单创建成功，返回订单对象
  return order;
}

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
