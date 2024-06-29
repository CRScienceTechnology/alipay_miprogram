                // pages/index/index.js
let authcode;   //

Page({

  data: {}, // 初始化页面数据为空对象
    getAuthCode()
     {
      my.getAuthCode({
          scopes: ['auth_base'], // 确保auth_base是一个字符串，静默授权，从支付宝服务器后端获取openid
          success: (res) => 
          {
              authcode = res.authCode; // 获取到授权码，应该是res.authCode，使用authCode暂存，为随后传入到开发者服务器后端将authcode转为usr_id处理做准备
          },
          fail: (err) => 
          {
              console.log('登陆失败', err);
          }
      });
  },  
    onLoad(query) 
  {
    // 页面加载
    this.getAuthCode(); //必须得加this.前缀，表示全局对象，因为onload自己的的原生方法不支持
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },

  onReady()
  {
    // 页面加载完成

  },

  onShow()
  {
    // 页面显示
  },

  onHide()
  {
    // 页面隐藏
  },

  onUnload()
  {
    // 页面被关闭
  },

  onTitleClick()
  {
    // 标题被点击（如果适用）
  },

  onPullDownRefresh()
  {
    // 页面被下拉刷新（如果适用）
  },

  onReachBottom()
  {
    // 页面滚动到底部（如果适用）
  },

  onShareAppMessage() 
  {
    // 返回自定义分享信息
    return {
      title: '逸麻将',
      path: '/pages/index/index',
    };
  },

  turn_to_page(e)//跳转页面时触发的跳转函数
  {
    my.navigateTo({
      url: "/pages/mahjong/mahjong?id=" + e.target.dataset.id + "&Authcode=" + authcode
    });
  }
});

