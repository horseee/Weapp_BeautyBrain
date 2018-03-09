// pages/share/share.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postuserid: '',
    new_post_list: '',
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      postuserid: options.postuserid,
      id: app.globalData.id
    })

    wx.request({
      url: 'https://www.horseee.top/userpost',
      data: {
        userid: that.data.id,
        selectid: that.data.postuserid
      },
      success: function (e) {
        console.log(e.data);
        that.setData({
          new_post_list: e.data.news
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  ImageLook: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var num = event.currentTarget.dataset.type
    var that = this
    var imageList = new Array()
    //图片预览

    if (that.data.new_post_list[num].url_1.length != 0) {
      imageList.push(that.data.new_post_list[num].url_1)
    }
    if (that.data.new_post_list[num].url_2.length != 0) {
      imageList.push(that.data.new_post_list[num].url_2)
    }
    if (that.data.new_post_list[num].url_3.length != 0) {
      imageList.push(that.data.new_post_list[num].url_3)
    }
    wx.previewImage({
      current: src,
      urls: imageList
    })

  },

  onUpTap: function (e) {
    var now_post = e.currentTarget.dataset.type;
    var that = this
    that.data.new_post_list[now_post].upstatus = 1 - that.data.new_post_list[now_post].upstatus

    var post_id_system = that.data.new_post_list[now_post].postid
    var post_status = that.data.new_post_list[now_post].upstatus

    if (post_status == 1) {
      that.data.new_post_list[now_post].LikeCount = that.data.new_post_list[now_post].LikeCount + 1
    }
    else {
      that.data.new_post_list[now_post].LikeCount = that.data.new_post_list[now_post].LikeCount - 1
    }

    that.setData({
      new_post_list: that.data.new_post_list
    })
  
  wx.request({
      url: 'https://www.horseee.top/like-change',
      data: {
        userid: app.globalData.id,
        postid: post_id_system,
        postuserid: that.data.postuserid,
        status: post_status
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
      desc: "一个答题+美妆的小程序，快来体验吧",
      path: "pages/welcome/welcome"
    }
  },
})