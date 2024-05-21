const AlipaySdk = require("alipay-sdk").default;
priva="MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCMHXvuNmCuwN1PoWgdYwqIYKOkFN7nJxnOxv/Uw0IUi1YMosx9LRLgkIrdEInNenTS5sQf9JgKlmhTZdO3NSurvXelxIr/VjaTNX9m3j2N3c5xza++vf0cdSLTUmhWA5Dna7uSfTeoIxHbfFFi309+CJUWLeRPS3MgyZ5mFeKX6BHRbN+xnmB6xkyJiRjxOFXEepvE7PA3MIruyN39OcDoSjayR5TwK5OgsyyfEDuG2tHpBZcDwQMWFsMMz18mZQF3YryMRSRhQ9J7hD97tWqXGsdP9O9Af+FGtd6ChznvV2aKvI595O4IQeQ4SkxXpKNQJ7DuYlwcxZiRv7y1M6KHAgMBAAECggEAHSEwF7k0ZoBwQlLjK2Dg2rOEseMo6FOnuOaEX35sqYrCTAQ4kTmiuA8033rFu3NfAE27ro0SYvkcHWKJHoiuWJkeW9c9spIA7J/tqbxAfdMETYKerAAhtB3iLJ7wVBmPsZ0jNPRVct4/oyr4XJ7ijuhH3oGR+q5L9CAWj1CzeDMXCtPEN0GygZ4UlXUCJzeHB6tltKpKq6Lnuz3u8tJqdy33Al4/vFSsIToSdXGfuo0SmLYSIQ2PGwk40qeBvYpTsixhWvuCTnFjcID4mxyPj/u5hk9yeSv3lowdBy751yEKvn8LmbxFXxRKM6dboqb2m8nFhdA9WoteXs9fCp+KwQKBgQDQowAlEUpj9CkQfKu7qpEBi4yAALlRyMtiKIANKfcDmjeSRrzWtk7cYJqXPqzvpqoToe4jvCwCVDUgh4XW9Ewmn0qB9B3XB26mA6bvAMVz9S+t+B9aesvO7MMlLo1RGLyIDHgSz6hnRrAFWYmyTOBA/gnLcqdvCskZjTUx/kESIQKBgQCr7FQiJzdDNEBDSu6x9Cg8Ua+b9mfm/uP1kmBy3bglf132ung75Qp+9eAvUuVU7cKBZ8prH3Rh3dCAfwFplmkF5iqJyHs6JkM96Au9atAyhYXV6KQ+zQ93QeKSyUabEZX3sqyI5LVH/ovj8bf9rg0OE1q6tWXnGXNk/dtuZlTvpwKBgQC56OVSImwlUQXeeRkWKtD3jX/u97Yq2D/TAb/I+yHvBdaK85mFwgHXggV+zAyRp/NZdyuakCyvDpYgnGJ4vku1Bq//yKVmXGsOZ6ayxf8sasjHvpdBqrY9duAVG7w1DVPB70p3iK7JCEYFHloClVomz7euoEXuPrAfoqJKIAOfwQKBgQCR3wVLrSZweQcFkbCRgO4ar9xmYl2qWx6kIDyBeapi9nyNeY3GlAGh05ER1i4LL2jXT28qERg4aXIddKWIJzyY6r+xBE+5+PkYr6g2YUihdTUnWCrzth2nPFm33dtwey1Za1qFFDjUCyA6mb9ZGLKu/LEAtiTuPmPwjov+UglDBQKBgCdLO+rChl2bmJ41IXHvsiqTPuOUOg0klm9lJTH8CfD+patm58/COPyvnA4gk6lA4VAfGYzYZJl9ttIO3GmFsD4I1531EsPVpGYvNHvcEpiE+3HtAiL9AWUAy/VElycmebKOTHavN7ZoDBs4WNVF5xzQjRDRBw5geTWBi6Ik5ZSQ";
public="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg1m4oBOvOpJmffSxa4yiia8rOsGFl8kylx/ce1hXXW/EYM70qnlt03DhEVSwFzIJV0rVZfBSs0HvZj0iAo6+rWRcYE+Hd8xpmUul9fDn4NWxiAP0/RlsF8KtczCyE5whC/gpVtZrPQ0G+/gHbCqdhhKU1msVDCuuxHdceNu+vzA9TL+t7ccakzCcSsQ30SSj3VHJlXFBf3pnNN4VwnsqD36bUIlSu6zNAKItgQEwcBi9P+QIX7hnidWEo2KeIEJnoHL+SH5KW4EzyHmdvpOPhf2guOmHfCqBb1H3mdZc5RIJAW2OGV2KVV5yKo56rYRcd3Z90dV0KLBByL23kamw2QIDAQAB";


// 发起GET请求，这里以一个示例URL代替实际API地址
fetch('https://your-api-url.com/data', {
  method: 'GET', // 或者其他HTTP方法，如'POST'
  headers: {
    'Content-Type': 'application/json',
  },
})
.then(response => {
  // 检查响应是否成功
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  // 将响应体解析为JSON
  return response.json();
})
.then(data => {
  // 数据解析成功，现在可以处理data对象
  console.log('Received data:', data);

  // 假设我们想保存某个具体的业务响应参数，例如data.id
  // 注意：实际情况下要考虑数据大小和类型，localStorage仅支持字符串键值对

  localStorage.setItem('businessResponse', JSON.stringify(data)); // 将整个data对象转化为字符串保存
})
.catch(error => {
  // 处理错误
  console.error('There has been a problem with your fetch operation:', error);
});


//调用alipay.system.oauth.token 换取openid
const alipaySdk = new AlipaySdk({
  appId: "2021004142610364",
  privateKey: priva,
  alipayPublicKey: public,
  gateway: "https://openapi.alipay.com/gateway.do",
});

authcode="" //传入经前端调用my.request方法发送的json的授权码值（由前端调用my.getAuthCode生成）

//业务请求参数
const result = await alipaySdk.exec("alipay.system.oauth.token", {
  code: authcode,                   //传入解析后的json中的authcode键值
  grant_type: "authorization_code",
  

});


//调用alipay.trade.create 获取trade_no
const alipaySdk = new AlipaySdk({
  appId: "9021000136626657",
  privateKey:priva,
  alipayPublicKey:public,
  gateway: "https://openapi-sandbox.dl.alipaydev.com/gateway.do",
});

tradeno=""      //利用种子创建随机单号
tradeamount="" //根据前端的json解析结果定下金额
headline=""    //根据json解析的麻将机型号确定订单标题
openid=""      //传入alipay.system.oauth.token返回的open_id令牌
//业务请求参数

const result = await alipaySdk.exec("alipay.trade.create", {
  bizContent: {
    out_trade_no: tradeno,
    total_amount: tradeamount,
    subject: headline,              //支付订单标题
    product_code: "JSAPI_PAY",       //支付产品选择码
    buyer_open_id: openid,          //传入调用alipay.system.oauth.token 换取的openid
    op_app_id: "2021004142610364", //传入小程序的id
  },
});


// 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号 trade_no
my.tradePay ({
  
  tradeNO: tradeno,  //将传出的响应参数传入
  success: res => {
    my.alert ({
      content: JSON.stringify (res),
    });
  },
  fail: error => {
    console.error('调用 my.tradePay 失败: ', JSON.stringify(error));
  },
});
