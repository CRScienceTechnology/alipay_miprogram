
let authCode;         //const关键在声明变量的时候就要传入值


Page({                // pages/yourPage/yourPage.js
  data: {
    paymentAmount: 0, // 初始化存储待支付金额
  },

  onLoad: function(options) {
    
    console.log(options.Authcode); // 输出传递的id值
  },
  
  onTapAmountButton: function(event) {
    my.getAuthCode({
      scopes: "auth_user",
      success: function(res){
        authCode = res.authCode;
        var amount = event.currentTarget.dataset.amount; // 获取data-amount的值
      // 构建订单信息对象，这里根据实际情况填充
        
        amount = "0.01";//上线删除这句

      const sendData = {
          "amount": amount, 
          "description": '麻将机运行',
          "authCode": authCode,
      };
      //构造发送给emqx后端的参数
      const emqx={
        "mahjong_code":1,
        "status":"on",
        "time_working":3
      }
      my.request({
          url: 'https://xie.wjwcj.cn/api/create-order',
        method: 'POST',
          data:sendData,
        dataType: 'json',
        success: function(res) {
              my.tradePay({
              tradeNO: res.data.tradeNo,
              success: (res) => {
                if (res.result.includes("&success=\"true\"")){
                  //支付成功的话
                  my.alert({content: "支付成功"});
                  //下面单独写了一个函数执行测试(因为暂时没法付款), 按"测试mqtt"按钮触发
                  my.request({
                    url:"https://xie.wjwcj.cn/api_mqtt/emqx_analysis",
                    method:'POST',
                    data:emqx,
                    dataType:'json',
                  });
                }else{my.alert({content: "支付失败"});}
              },
              fail: (res) => {my.alert({content: "获取订单失败"});},
              complete: (res) => {}
            });
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

      fail: function(res){
          console.log("登录失败");
      }
        });
    
  },
  mqtt: function(){
    //构造发送给emqx后端的参数
    const emqx={
      "mahjong_code":1,
      "status":"on",
      "time_on":3
    }//服务器写的time_on， 你写了个time_working..(改了)
    my.request({
      url:"https://xie.wjwcj.cn/api_mqtt/emqx_analysis",
      method:'POST',
      data:emqx,
      dataType:'json',
    });
    console.log("已请求开机")
  }
  
  

});


  