// pages/yourPage/yourPage.js
const app = getApp();
const alipaySdk = require('./alipay-sdk'); // 假设你已经在项目中引入了支付宝SDK模块

Page({
  data: {
    paymentAmount: 0, // 初始化存储待支付金额
  },

  onLoad() {
    // 页面加载时的初始化操作
  },

  // 假设你已经在axml中为显示金额的按钮绑定了这个事件
  onTapAmountButton(event) {
    this.setData({
      paymentAmount: event.detail.amount, // 假设detail中包含金额信息
    });
  },

  // 点击支付按钮时调起支付宝支付
  onTapPayButton() {
    const { paymentAmount } = this.data;
    
    if (paymentAmount > 0) {
      // 构造支付宝支付所需参数（这里仅为示例，实际参数应从服务器获取或根据业务逻辑生成）
      const orderInfo = {
        subject: '商品名称',
        totalAmount: this.data.paymentAmount.toFixed(2), // 将金额转换为两位小数的字符串
        outTradeNo: '订单编号', // 你的订单编号
        productCode: 'FAST_INSTANT_TRADE_PAY', // 快捷支付产品码
        // ... 其他必要参数，例如时间戳、签名等
      };

      // 调用支付宝支付接口发起支付请求
      alipaySdk.pay(orderInfo).then(res => 
        {
        // 成功调起支付宝收银台
        if (res.resultCode === '9000') {
          // 用户在支付宝客户端确认支付成功后，支付宝服务器会异步通知你的服务器，这里仅展示调起收银台的过程
          console.log('成功调起支付宝收银台');
        } else {
          console.error('调起支付宝收银台失败，错误码：', res.resultCode);
        }
      }).catch(err => {
        console.error('调用支付宝支付接口异常：', err);
      });
    } else {
      console.warn('未设置或获取到有效的支付金额');
    }
  },
});