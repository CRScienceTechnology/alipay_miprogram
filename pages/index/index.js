// pages/index/index.js
const app = getApp();

Page({
  data: {}, // 初始化页面数据为空对象

  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },

  onReady() {
    // 页面加载完成
  },

  onShow() {
    // 页面显示
  },

  onHide() {
    // 页面隐藏
  },

  onUnload() {
    // 页面被关闭
  },

  onTitleClick() {
    // 标题被点击（如果适用）
  },

  onPullDownRefresh() {
    // 页面被下拉刷新（如果适用）
  },

  onReachBottom() {
    // 页面滚动到底部（如果适用）
  },

  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '我的小程序',
      path: '/pages/index/index',
    };
  },
  
  onGetAuthCode(){
    my.getAuthCode({
      scopes: [auth_base], // 静默授权，从支付宝服务器后端获取openid
      success: (res) => {
        const authcode=res.authcode; // 获取到授权码，使用authCode暂存，为随后传入到开发者服务器后端将authcode转为usr_id处理做准备
        
      },
      fail: (err) => {
        console.log('my.getAuthCode调用失败', err);
        
      }
    });
  },
  handleButtonClick1(event) {
    const targetPage = event.currentTarget.dataset.page;  //
    
    if (typeof targetPage === 'string' && targetPage.length > 0) {
      my.navigateTo({ // 使用支付宝小程序API进行页面跳转
        url: `/${targetPage}`,
      });
    } else {
      console.error('Invalid target page specified.');
    }
  },
});
