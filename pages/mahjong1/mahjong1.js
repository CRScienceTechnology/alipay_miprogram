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
      // 构造支付宝支付所需参数（这些参数通常需要从后端服务器获取，确保安全性和时效性）
      const orderInfo = {
        tradeNo: '商户订单号', // 由商户后台生成的订单号
        // totalAmount 和 subject 应该从服务器动态获取
        totalAmount: this.data.paymentAmount.toFixed(2), // 将金额转换为两位小数的字符串
        subject: '商品名称', // 商品简单描述
      };

      // 调用支付宝小程序内置的tradePay接口发起支付请求
      my.tradePay({
        tradeNo: orderInfo.tradeNo,
        totalAmount: parseFloat(orderInfo.totalAmount), // 注意totalAmount应该为Number类型
        subject: orderInfo.subject,
      }).then((result) => {
        if (result.resultCode === '9000') {
          // 支付成功
          console.log('支付成功');
          // 这里可以添加支付成功的后续处理逻辑
        } else {
          console.error('支付失败，错误码：', result.resultCode);
          // 根据不同错误码处理相应逻辑
        }
      }).catch((error) => {
        console.error('调用支付接口失败：', error);
        // 处理异常情况
      });
    } else {
      console.warn('未设置或获取到有效的支付金额');
    }
  },
});

//实现调用支付宝接口