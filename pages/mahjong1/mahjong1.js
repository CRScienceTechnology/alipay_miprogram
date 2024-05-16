// pages/yourPage/yourPage.js
Page({
  data: {
    paymentAmount: 0, // 初始化存储待支付金额
  },

  onLoad: function() {
    // 页面加载时的初始化操作
  },

  // 假设你已经在axml中为显示金额的按钮绑定了这个事件
  onTapAmountButton: function(event) {
    const amount = event.currentTarget.dataset.amount; // 获取data-amount的值
    this.setData({
      paymentAmount: parseFloat(amount), // 设置支付金额
    });
  },

  // 点击支付按钮时调起支付宝支付
  onTapPayButton: function() {
    const { paymentAmount } = this.data;

    if (paymentAmount > 0) {
      // 实际开发中，这里的orderInfo应由后端服务器生成并返回给前端，包括prepay_id等必要信息
      const orderInfo = {
        tradeNo: '此处应替换为真实的商户订单号', // 必须从后端获取
        totalAmount: paymentAmount.toFixed(2), // 保持与原逻辑一致，但实际应为从后端获取的字符串形式的金额
        subject: '商品名称', // 同样需要确保是从后端获取的真实商品描述
      };

      // 调用支付宝小程序的my.tradePay接口发起支付请求
      my.tradePay({
        tradeNo: orderInfo.tradeNo,
        totalAmount: parseFloat(orderInfo.totalAmount), // 确保金额格式正确
        subject: orderInfo.subject,
      }).then((result) => {
        if (result.resultCode === '9000') {
          // 支付成功
          console.log('支付成功');
          // 进行支付成功的业务逻辑处理
        } else {
          console.error('支付失败，错误码：', result.resultCode);
          // 根据错误码处理失败逻辑
        }
      }).catch((error) => {
        console.error('调用支付接口失败：', error);
        // 异常处理
      });
    } else {
      console.warn('未设置或获取到有效的支付金额');
    }
  },
});