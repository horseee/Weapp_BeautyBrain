// pages/answer/answer.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    live_time: "3月9日 21:45",
    heart_extra: 0,
    ranking_whole: '100+',
    id: '',
  },


  GotoTwoBattle: function() {
    var userInf = app.globalData.userInfo
    console.log(userInf)
    var that = this
    wx.request({
      url: 'https://www.horseee.top/contest/login_1',
      data: {
        userid: that.data.id,
        avatarurl: userInf.avatarUrl
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      success: function(res){
        console.log(res)
        if (res.data == "success") {
          wx.navigateTo({
            url: '/pages/live/live?id=' + that.data.id
          })
        } else if (res.data == "full"){
          wx.showToast({
            title: '本场人数已满',
            icon: 'loading'
          })
        } else {
          wx.showToast({
            title: '加入比赛失败',
            icon: 'loading'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'UserID',
      success: function (res) {
        console.log(res)
        that.setData({
          id: res.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })

    wx.onBackgroundAudioPlay(function () {
      console.log('onBackgroundAudioPlay')
    }) 
    
  },

  test: function(){
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log('duration:' + res.duration)
        console.log('currentPosition:' + res.currentPosition)
        console.log('status:' + res.status)
        console.log('downloadPercent:' + res.downloadPercent)
        console.log('dataUrl:' + res.dataUrl)
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      }
    })  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "L'oreal X A-one",
      desc: "下一场直播马上开始！速来参加！",
      path: "pages/welcome/welcome"
    }
  },

})