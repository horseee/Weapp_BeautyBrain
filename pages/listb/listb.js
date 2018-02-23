//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    focus: [],
    /*motto: '你好，小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')*/
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    pageNumber: 1,
  },

  onShareAppMessage: function () {
    return {
      title: "看新闻小程序",
      desc: "一个看新闻的小程序，描述",
      path: "pages/index/index"
    }
  },

  onReachBottom: function () {
    var that = this;
    that.setData({
      pageNumber: that.data.pageNumber + 1
    })
    console.log(that.data.pageNumber)
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    var that = this;
    console.log("加载时触发")
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      success: function (e) {
        that.setData({
          focus: e.data.top_stories
        })
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
