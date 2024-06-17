
let authCode;         //const关键在声明变量的时候就要传入值


Page({                // pages/yourPage/yourPage.js
  data: {
    paymentAmount: 0, // 初始化存储待支付金额
  },

  onLoad: function(options) {
    // 页面加载时的初始化操作
    authCode = options.Authcode;
    console.log(options.Authcode); // 输出传递的id值
  },
  
  // 假设你已经在axml中为显示金额的按钮绑定了这个事件
  onTapAmountButton: function(event) {
    console.log("1212312");
    const amount = event.currentTarget.dataset.amount; // 获取data-amount的值
      // 构建订单信息对象，这里根据实际情况填充
      const sendData = {
        from: '支付宝',
        amount: amount, // 订单金额，单位为元，这里作为示例
        description: '麻将机运行', // 订单描述
        authCode: authCode, // 添加authCode到发送的数据中，以备后端将authcode兑换成usrid
      };
      const sendDataStr = JSON.stringify(sendData);//显示的转换为json

      // 发送订单信息到服务端
      my.request({
        url: 'https://xie.wjwcj.cn/api/create-order', // 确保已替换为实际地址，必须带上http:
        method: 'POST',
        data:sendDataStr,
        dataType: 'json',
        header: {
          'content-type': 'application/json;charset=utf-8',
        },
        success: function(res) {
          if (res.statusCode === 200) {
            const serverResponse = res.data; // 后端返回的数据
            if (serverResponse.success) {
              // 订单创建成功，根据后端返回的trade_no或者其他标识处理后续逻辑
              const tradeNo = serverResponse.tradeNo; // 假设返回的订单号字段名为tradeNo
              // 这里可以调用支付逻辑，使用tradeNo进行支付
              my.tradePay({
                // 传入支付宝交易号trade_no
                tradeNO: tradeNo,
                success: (res) => {
                  if(res.result.includes("&success=\"true\""))
                  {
                      my.alert({ 
                      content: "支付成功",  //付款成功的程序执行逻辑
                      });
                      my.request() //实现传入emqx服务器时间变量
                  }else{
                    my.alert({content:"支付失败"});
                  }
             
                },
                fail: (res) => {
                  my.alert({
                    content: JSON.stringify(res),
                  });
                }
              });
              my.alert({ content: '订单创建成功' });
            } else {
              // 后端返回创建订单失败的错误信息
              my.alert({ content: serverResponse.errorMessage || '创建订单失败，请重试' });
            }
          } else {
            my.alert({ content: '服务端请求失败' });
          }
        },
        fail: function(err) {
          
          console.error('请求失败', err);  //在控制台输出erro信息
          my.alert({ content: '网络错误，请检查网络连接' });
        },
        complete: function() {
          // 请求完成后的统一处理，如关闭加载提示等
          // my.hideLoading();
        },
      });
    },
  
  

});


  