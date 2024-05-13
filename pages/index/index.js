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
