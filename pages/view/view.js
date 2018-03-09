// pages/view/view.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_width: 230,
    image_height: 230,
    upStatus: 0,
    detail: "",
    postid: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
        postid: options.postid
    })
    var that= this
    var animationUp = wx.createAnimation({
      timingFunction: 'ease-in-out'
    })
    this.animationUp = animationUp

    wx.request({
      url: 'https://www.horseee.top/detail',
      data: {
        postid: that.data.postid,
        userid: app.globalData.id
      },
      success: function (e) {
        console.log(e.data);
        that.setData({
          detail: e.data.detail
        })
      }
    })
    
  },

  onUpTap: function(){
    var that = this
    that.data.detail.upstatus = 1 - that.data.detail.upstatus
    if (that.data.detail.upstatus == 0) {
      that.data.detail.like = that.data.detail.like - 1
    } else {
      that.data.detail.like = that.data.detail.like + 1
    }
    this.setData({
      detail: that.data.detail
    })

    this.animationUp.scale(2).step();
    this.setData({
      animationUp: this.animationUp.export(),
    })
    setTimeout(function () {
      this.animationUp.scale(1).step();
      this.setData({
        animationUp: this.animationUp.export(),
      })
    }.bind(this), 300);

    wx.request({
      url: 'https://www.horseee.top/like-change',
      data: {
        userid: app.globalData.id,
        postid: that.data.postid,
        postuserid: that.data.detail.originid,
        status: that.data.detail.upstatus
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

  ImageLook: function(event) {
    var src = event.currentTarget.dataset.src
    var that = this
    var imageList = new Array()

    wx.previewImage({
      current: src,
      urls: that.data.detail.image
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
      desc: "快来为我点赞吧",
      path: "pages/welcome/welcome"
    }
  },
})