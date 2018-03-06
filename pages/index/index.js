//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    PostImage: ["https:/www.horseee.top/image/1.jpg", "https://www.horseee.top/image/2.jpg","https://www.horseee.top/image/3.jpg"],
    focus:[],
    dateYear:"2017",
    dateMonth:"Jan",
    dateDay:"01",
    isShow: true,
    currentTab: 0,
    /*userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')*/
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    pageNumber: 1,
    upStatus: 0,
  },
  

  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },

  onUpTap: function() {
    this.animationUp.scale(2).step();
    this.setData({
      animationUp: this.animationUp.export(),
      upStatus: 1-this.data.upStatus
    })
    setTimeout(function () {
      this.animationUp.scale(1).step();
      this.setData({
        animationUp: this.animationUp.export()
      })
    }.bind(this), 300);
    
  },

  onShareAppMessage: function(){
    return {
      title: "看新闻小程序",
      desc: "一个看新闻的小程序，描述",
      path: "pages/index/index"
    }
  },

  onReachBottom: function(){
    /*var that = this;
    that.setData({
      pageNumber: that.data.pageNumber+1
    })
    console.log(that.data.pageNumber)
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      success: function(e) {
        console.log(e.data.top_stories);
        that.setData({
          focus: that.data.focus.concat(e.data.top_stories)
        })
      }
    })*/
  },

  onLoad: function () {
    var that = this;
    console.log("加载时触发")

    var animationUp = wx.createAnimation({
      timingFunction: 'ease-in-out'
    })
    this.animationUp = animationUp

  },
  
  onShow: function() {
    var that = this;
    wx.request({
      url: 'https://www.horseee.top/hot/0',
      success: function (e) {
        console.log(e.data.posts);
        that.setData({
          focus: e.data.posts,
        })
      }
    })
  }
})
