// pages/about/about.js

const app=getApp()

Page({
  data: {
    UserLevel: 1,
    saying_count: 0,
    like_count: 0,
    question_score: 0

  },

  onLoad: function (options) {
    var that = this
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo,
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
    var that=this
    wx.request({
      url: 'https://www.horseee.top/user_info',
      data: {
        userid: app.globalData.id
      },
      success: function (e) {
        console.log(e)
        that.setData({
          like_count: e.data.info[0].like,
          saying_count: e.data.info[0].saying
        })
      }
    })
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
  
  }
})