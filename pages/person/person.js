// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    id: '',
    avatar: '',
    like: '',
    post: '',
    city: '',
    province: '',
    score: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      name: options.name,
      id: options.id,
      avatar: options.avatar,
      like: options.like,
      post: options.post,
      score: options.score,
      province: options.province,
      city: options.city
    })
  },

  GoToShare: function(){
    var that = this
    wx.navigateTo({
      url: '/pages/share/share?postuserid=' + that.data.id,
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
    var that = this
    wx.request({
      url: 'https://www.horseee.top/user_info',
      data: {
        userid: that.data.id
      },
      success: function (e) {
        console.log(e)
        that.setData({
          like: e.data.info[0].like,
          post: e.data.info[0].saying
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
    return {
      title: "L'oreal X A-one",
      desc: "一个答题+美妆的小程序，快来体验吧",
      path: "pages/welcome/welcome"
    }
  },
})