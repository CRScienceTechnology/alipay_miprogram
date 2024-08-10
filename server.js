const express = require('express');
const bodyParser = require('body-parser');
const AlipaySdk = require('alipay-sdk').default;
const axios = require('axios');
const https = require('https');
const querystring = require('querystring');
const crypto = require('crypto');//用来生成随机字符串订单号


//初始化alipay实际例子
const ALIPAY_GATEWAY = 'https://openapi.alipay.com/gateway.do';
const APP_ID = '2021004142610364';
const YOUR_PRIVATE_KEY = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCMHXvuNmCuwN1PoWgdYwqIYKOkFN7nJxnOxv/Uw0IUi1YMosx9LRLgkIrdEInNenTS5sQf9JgKlmhTZdO3NSurvXelxIr/VjaTNX9m3j2N3c5xza++vf0cdSLTUmhWA5Dna7uSfTeoIxHbfFFi309+CJUWLeRPS3MgyZ5mFeKX6BHRbN+xnmB6xkyJiRjxOFXEepvE7PA3MIruyN39OcDoSjayR5TwK5OgsyyfEDuG2tHpBZcDwQMWFsMMz18mZQF3YryMRSRhQ9J7hD97tWqXGsdP9O9Af+FGtd6ChznvV2aKvI595O4IQeQ4SkxXpKNQJ7DuYlwcxZiRv7y1M6KHAgMBAAECggEAHSEwF7k0ZoBwQlLjK2Dg2rOEseMo6FOnuOaEX35sqYrCTAQ4kTmiuA8033rFu3NfAE27ro0SYvkcHWKJHoiuWJkeW9c9spIA7J/tqbxAfdMETYKerAAhtB3iLJ7wVBmPsZ0jNPRVct4/oyr4XJ7ijuhH3oGR+q5L9CAWj1CzeDMXCtPEN0GygZ4UlXUCJzeHB6tltKpKq6Lnuz3u8tJqdy33Al4/vFSsIToSdXGfuo0SmLYSIQ2PGwk40qeBvYpTsixhWvuCTnFjcID4mxyPj/u5hk9yeSv3lowdBy751yEKvn8LmbxFXxRKM6dboqb2m8nFhdA9WoteXs9fCp+KwQKBgQDQowAlEUpj9CkQfKu7qpEBi4yAALlRyMtiKIANKfcDmjeSRrzWtk7cYJqXPqzvpqoToe4jvCwCVDUgh4XW9Ewmn0qB9B3XB26mA6bvAMVz9S+t+B9aesvO7MMlLo1RGLyIDHgSz6hnRrAFWYmyTOBA/gnLcqdvCskZjTUx/kESIQKBgQCr7FQiJzdDNEBDSu6x9Cg8Ua+b9mfm/uP1kmBy3bglf132ung75Qp+9eAvUuVU7cKBZ8prH3Rh3dCAfwFplmkF5iqJyHs6JkM96Au9atAyhYXV6KQ+zQ93QeKSyUabEZX3sqyI5LVH/ovj8bf9rg0OE1q6tWXnGXNk/dtuZlTvpwKBgQC56OVSImwlUQXeeRkWKtD3jX/u97Yq2D/TAb/I+yHvBdaK85mFwgHXggV+zAyRp/NZdyuakCyvDpYgnGJ4vku1Bq//yKVmXGsOZ6ayxf8sasjHvpdBqrY9duAVG7w1DVPB70p3iK7JCEYFHloClVomz7euoEXuPrAfoqJKIAOfwQKBgQCR3wVLrSZweQcFkbCRgO4ar9xmYl2qWx6kIDyBeapi9nyNeY3GlAGh05ER1i4LL2jXT28qERg4aXIddKWIJzyY6r+xBE+5+PkYr6g2YUihdTUnWCrzth2nPFm33dtwey1Za1qFFDjUCyA6mb9ZGLKu/LEAtiTuPmPwjov+UglDBQKBgCdLO+rChl2bmJ41IXHvsiqTPuOUOg0klm9lJTH8CfD+patm58/COPyvnA4gk6lA4VAfGYzYZJl9ttIO3GmFsD4I1531EsPVpGYvNHvcEpiE+3HtAiL9AWUAy/VElycmebKOTHavN7ZoDBs4WNVF5xzQjRDRBw5geTWBi6Ik5ZSQ'; // 用于生成签名
const ALIPAY_PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg1m4oBOvOpJmffSxa4yiia8rOsGFl8kylx/ce1hXXW/EYM70qnlt03DhEVSwFzIJV0rVZfBSs0HvZj0iAo6+rWRcYE+Hd8xpmUul9fDn4NWxiAP0/RlsF8KtczCyE5whC/gpVtZrPQ0G+/gHbCqdhhKU1msVDCuuxHdceNu+vzA9TL+t7ccakzCcSsQ30SSj3VHJlXFBf3pnNN4VwnsqD36bUIlSu6zNAKItgQEwcBi9P+QIX7hnidWEo2KeIEJnoHL+SH5KW4EzyHmdvpOPhf2guOmHfCqBb1H3mdZc5RIJAW2OGV2KVV5yKo56rYRcd3Z90dV0KLBByL23kamw2QIDAQAB'; // 用于验证签名

const app = express();   //创建一个新的 Express 应用实例。这个实例是服务器的核心
const PORT = process.env.PORT || 3000; // 设置端口



var openId;
var accessToken;
var expiresIn;
var refreshToken;
var reExpiresIn;
var authStart;
var traceId; 

// 使用 body-parser 中间注册件解析 JSON 格式的请求体
//这是使用body-parser中间件来解析传入请求的JSON格式的请求体。body-parser是一个流行的Node.js中间件，用于解析传入请求的请求体。当使用body-parser.json()方法时，它将解析JSON格式的请求体，并将其添加到req.body属性中。这样，当请求到达路由处理函数时，你可以访问req.body来获取JSON数据
app.use(bodyParser.json());

// POST 路由，用于接收前端发送的 JSON 数据
//它指定当客户端向/api/create-order路径发送POST请求时，应该执行的逻辑。async关键字表明这个路由处理函数是一个异步函数，可以使用await来等待异步操作的完成
app.post('/api/create-order', async (req, res) => {
  try {
    const sendData = req.body;            //解析http的请求体
    console.log('Received data:', sendData);//打印出json文件
    const auth_code = sendData.authCode; // 获取 auth_code 键值
    console.log(auth_code);

    const alipaySdk = new AlipaySdk      //创建一个支付宝SDK（Software Development Kit，软件开发工具包）实例
    ({
      appId: APP_ID,
      privateKey: YOUR_PRIVATE_KEY,
      alipayPublicKey: ALIPAY_PUBLIC_KEY,
      gateway: ALIPAY_GATEWAY,
    });



    // 调用支付宝 SDK 的 exec 方法换取令牌，以alipaySdk构造成的参数打底
    const result1 = await alipaySdk.exec("alipay.system.oauth.token", {
      code: auth_code,
      grant_type: "authorization_code",
    });
    // console.log(result1); 放在这会导致后续解构的结果为空
    // 解析响应体--对象解构赋值语法
    const { 
    openId, 
    accessToken, 
    expiresIn, 
    refreshToken, 
    reExpiresIn, 
    authStart, 
    traceId 
    } = result1;      
    console.log(result1); // 打印原始响应体，用于调试
    console.log('OpenID:',openId);
    console.log('访问令牌:',  accessToken);
    console.log('访问令牌有效期:', expiresIn + '秒');
    console.log('刷新令牌:', refreshToken);
    console.log('刷新令牌有效期:',reExpiresIn + '秒');
    console.log('授权开始时间:', authStart);
    console.log('traceId:'+traceId);
    
    //随机字符串订单号
    const o_t_n = crypto.randomBytes(16).toString('hex').slice(0, 16);

    const params =
    {
    op_app_id: APP_ID ,
    buyer_open_id:openId,
    out_trade_no:o_t_n, // 商户订单号，需保证唯一
    product_code:"JSAPI_PAY", // 产品码，固定值,字符串内不能有空格字符
    total_amount:sendData.amount, // 订单总金额，单位为元
    subject: sendData.description, // 订单标题
    body: '麻将机开', // 订单描述
    notify_url: 'https://openapi.alipay.com/gateway.do', // 异步通知地址，需公网可访问
    };

    console.log(params);

    alipaySdk.exec('alipay.trade.create',{bizContent: params,})
    .then((result) => {
        console.log('调用成功，返回数据:', result);
        // 这里result里面包含了支付链接，可以根据需要处理
        //实现后端传回前端tradeNo逻辑
        const tradeNo=result.tradeNo;             //res方法是关键
        res.json({success:true,tradeNo:tradeNo}); //把数据传回前端
    })
    .catch((error) => {
        console.error('调用失败:', error);
    });

      
 
  } catch (error) {
    console.error('创建订单失败:', error);
    res.status(500).json({
      success: false,
      errorMessage: error.message || '创建订单失败，请重试',
    });
  }
});



// 启动服务器
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
