const app = getApp()

Page({
  onLoad: function (event) {
    console.log("load the welcome page")
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(res.userInfo)
      }
    })
  },

  onTapJump: function (event) {
    wx.switchTab({
      url: "/pages/index/index",
      success: function () {
        console.log("jump success")
      },
      fail: function () {
        console.log("jump failed")
      },
      complete: function () {
        console.log("jump complete")
      }
    });
  },

  onUnload: function (event) {
    console.log("page is unload")
  },

  onHide: function (event) {
    console.log("page is hide")
  },
})