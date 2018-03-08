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
    server_path: ['','',''],
    finish_image: ['','',''],
    image_count: 0
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
      console.log(that.data.image_count);
      
      for (var i = 0; i < that.data.tempFilePaths.length; i++) {
        console.log(that.data.image_count)
        if (that.data.image_count < 3) {
          wx.uploadFile({
            url: 'https://www.horseee.top/upload', 
            filePath: that.data.tempFilePaths[i],
            name: 'file',
            success: function (res) {
              console.log(res.data)   
              that.data.server_path[that.data.image_count] = res.data
              var ok_url = res.data.replace("/root/loreal-server/", "https://www.horseee.top/image/")
              that.data.finish_image[that.data.image_count] = ok_url
              that.setData({
                server_path: that.data.server_path,
                finish_image: that.data.finish_image,
                image_count : that.data.image_count + 1
              })
            },
            fail: function (res) {
              console.log(res)
              wx.showToast({
                title: '上传图片失败,请重新尝试',
                icon: 'loading',
                duration: 2000
              })
              return;
            },
          })
        } else {
          wx.showToast({
            title: '上传图片太多啦',
            icon: 'loading',
            duration: 2000
          })
        }
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
    if (that.data.image_count > 0) {
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
          if (res.statusCode == 500) {
            wx.showToast({
              title: '发布失败',
            })
          } else if (res.statusCode == 201) {
            wx.showToast({
              title: '发布成功！',
              icon: 'success',
              duration: 5000,
            });
            that.JumpToIndex()
          }
        }
      })
    } else {
      wx.showToast({
        title: '至少三张图片哦',
        icon: 'loading'
      })
      
    }
  },

  JumpToIndex: function(){
    console.log("hello")
    wx.switchTab({
      url: '/pages/about/about',
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