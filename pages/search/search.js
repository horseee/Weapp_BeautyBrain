// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    User: '', 
    searchtext: '',
    hasResult: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      searchtext: options.searchtext
    })
    wx.request({
      url: "https://www.horseee.top/search",
      data: {
        keyword: that.data.searchtext
      },
      success: function (e) {
        that.setData({
          User: e.data.User
        })
        if (e.data.User.length == 0) {
          that.setData({
            hasResult: false
          })
        } else {
          that.setData({
            hasResult: true
          })
        }
      }
    })
  },

  onBindinput: function (e) {
    this.setData({
      searchtext: e.detail.value
    })
  },

  onBindConfirm: function (e) {
    var that = this
    console.log(that.data.searchtext)
    wx.request({
      url: "https://www.horseee.top/search",
      data: {
        keyword: that.data.searchtext
      },
      success: function (e) {
        that.setData({
          User: e.data.User
        })
        if (e.data.User.length == 0) {
          that.setData({
            hasResult: false
          })
        } else {
          that.setData({
            hasResult: true
          })
        }
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
  
  }
})