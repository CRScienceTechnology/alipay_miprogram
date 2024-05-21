
Page({                // pages/yourPage/yourPage.js
  data: {
    paymentAmount: 0, // 初始化存储待支付金额
  },

  onLoad: function() {
    // 页面加载时的初始化操作
  },

  // 假设你已经在axml中为显示金额的按钮绑定了这个事件
  onTapAmountButton: function(event) {
    const amount = event.currentTarget.dataset.amount; // 获取data-amount的值
      // 构建订单信息对象，这里根据实际情况填充
      const orderInfo = {
        from: '支付宝',
        amount: amount, // 订单金额，单位为元，这里作为示例
        description: '麻将机运行', // 订单描述
        // 其他必要的订单字段
      };
  
      // 如果authCode是全局变量，直接使用；如果是从其他地方传递，确保它已经存在
      const authCode = getApp().globalData.authCode || authCode; // 或者直接使用传入的authCode(用户授权码)
  
      // 准备发送到服务端的数据，包含订单信息及用户授权信息
      const sendData = {
        ...orderInfo,
        authCode: authCode, // 添加authCode到发送的数据中，以备后端将authcode兑换成usrid
      };
  
      // 发送订单信息到服务端
      my.request({
        url: '192.168.1.115', // 确保已替换为实际地址
        method: 'POST',
        data: sendData,
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
              // my.tradePay({ tradeNO: tradeNo, ... });
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
          console.error('请求失败', err);
          my.alert({ content: '网络错误，请检查网络连接' });
        },
        complete: function() {
          // 请求完成后的统一处理，如关闭加载提示等
          // my.hideLoading();
        },
      });
    },
  
  
  // 点击支付按钮时调起支付宝支付
  // onTapPayButton: function() {
  //   const { paymentAmount } = this.data;

  //   if (paymentAmount > 0) {
  //     // 实际开发中，这里的orderInfo应由后端服务器生成并返回给前端，包括prepay_id等必要信息
  //     const orderInfo = {
  //       tradeNo: '此处应替换为真实的商户订单号', // 必须从后端获取
  //       totalAmount: paymentAmount.toFixed(2), // 保持与原逻辑一致，但实际应为从后端获取的字符串形式的金额
  //       subject: '商品名称', // 同样需要确保是从后端获取的真实商品描述
  //     };

  //     // 调用支付宝小程序的my.tradePay接口发起支付请求
  //     my.tradePay({
  //       tradeNo: orderInfo.tradeNo,
  //       totalAmount: parseFloat(orderInfo.totalAmount), // 确保金额格式正确
  //       subject: orderInfo.subject,
  //     }).then((result) => {
  //       if (result.resultCode === '9000') {
  //         // 支付成功
  //         console.log('支付成功');
  //         // 进行支付成功的业务逻辑处理
  //       } else {
  //         console.error('支付失败，错误码：', result.resultCode);
  //         // 根据错误码处理失败逻辑
  //       }
  //     }).catch((error) => {
  //       console.error('调用支付接口失败：', error);
  //       // 异常处理
  //     });
  //   } else {
  //     console.warn('未设置或获取到有效的支付金额');
  //   }
  // },
});
