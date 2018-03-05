// pages/share/share.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: [],
    dateYear: "2017",
    dateMonth: "Jan",
    dateDay: "01",
    userInfo: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo,
    })
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      success: function (e) {
        console.log(e.data);
        var PostDay = e.data.date;
        var month;

        switch (e.data.date.slice(4, 6)) {
          case "01": month = "Jan"; break;
          case "02": month = "Tue"; break;
          case "03": month = "Mar"; break;
          case "04": month = "Apr"; break;
          case "05": month = "May"; break;
          case "06": month = "June"; break;
          case "07": month = "July"; break;
          case "08": month = "Aug"; break;
          case "09": month = "Sept"; break;
          case "10": month = "Oct"; break;
          case "11": month = "Nov"; break;
          case "12": month = "Dec"; break;
          default:
            month = "Jan"
        }
        that.setData({
          focus: e.data.stories,
          dateYear: PostDay.slice(0, 4),
          dateMonth: month,
          dataDay: PostDay.slice(6, 8),
        })
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