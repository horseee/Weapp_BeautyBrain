// pages/new_post/new_post.js

var util = require('../../utils/util.js'); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths:'',
    title: '',
    detail: '',
    id: '',
    server_path: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
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
  },

  ChooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 3, // 默认9  
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'],   
      success: function (res) {
        console.log(res)
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
        ReleaseNote(that)
      }
    })

    function ReleaseNote(that) {
      var UserId;
      console.log("update image file")
      var count = that.data.tempFilePaths.length;
      var get_url = new Array()
      for (var i = 0; i < that.data.tempFilePaths.length; i++) {
        wx.uploadFile({
          url: 'https://www.horseee.top/upload', 
          filePath: that.data.tempFilePaths[i],
          name: 'file',
          success: function (res) {
            console.log(res.data)
            var result_url = that.data.server_path
            get_url.push(res.data)
            that.setData({
              server_path: get_url
            })
          },
          fail: function (res) {
            console.log(res)
            wx.showToast({
              title: '上传图片失败,请重新尝试',
              duration: 2000
            })
            return;
          },
        })
      };
    }


  },

  titleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
    console.log(this.data.title)
  },

  detailInput: function(e) {
    this.setData({
      detail: e.detail.value
    })
    console.log(this.data.detail)
  },

  ReleasePost: function() {
    console.log("next")
    var post_time = util.formatTime(new Date());

    var that = this
    wx.request({
      url: 'https://www.horseee.top/new-post',
      data: {
        detail: that.data.detail,
        title: that.data.title,
        id: that.data.id,
        image: that.data.server_path,
        posttime: post_time
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      success: function (res) {
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
  
  }
})