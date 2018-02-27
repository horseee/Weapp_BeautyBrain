const app = getApp()

Page({
  data: {
    enterButton: 0,
    userID: ""
  },

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

  userIDInput: function (e) {
    var IDnumber = e.detail.value
    this.setData({
      userID: e.detail.value
    })
    var isCorrect = 0;
    if (IDnumber > 3140000000 && IDnumber < 3180000000) 
        isCorrect = 1;  
    this.setData({
        enterButton: isCorrect
    })
    
  },

  onTapJump: function (event) {
    //登录是判断是否为第一次注册
    var tempID = this.data.userID
    if (this.data.enterButton == 1) {
      wx.request({
        url: 'http://localhost:5000/makeup_api/v1.0/UserInfo',
        data: {
          UserName: app.globalData.userInfo.nickName,
          UserCode: tempID
        },
        header: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
        }
      })

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
      })
    }
  },

  onUnload: function (event) {
    console.log("page is unload")
  },

  onHide: function (event) {
    console.log("page is hide")
  },
})