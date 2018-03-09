//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userid: '',
    PostImage: ["https:/www.horseee.top/image/1.jpg", "https://www.horseee.top/image/2.jpg","https://www.horseee.top/image/3.jpg"],
    focus:[],
    new_post_list:[],
    isShow: true,
    currentTab: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    pageNumber: 1,
    isSearch: false,
    searchtext: "",
    User:''
  },
  
  swichNav: function (e) {
    var that = this
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
      
      if (showMode) {
        wx.request({
          url: 'https://www.horseee.top/hot/0',
          data: {
            userid: that.data.userid
          },
          success: function (e) {
            console.log(e.data);
            that.setData({
              new_post_list: e.data.posts
            })
          }
        })
      }
      else {
        wx.request({
          url: 'https://www.horseee.top/new/0',
          data: {
            userid: that.data.userid
          },
          success: function (e) {
            console.log(e.data);
            that.setData({
              new_post_list: e.data.news
            })
          }
        })
      }
    }
  },

  onUpTap: function(e) {
    var now_post = e.currentTarget.dataset.type;

    var that=this

    var post_id_system
    var post_status
    var post_user_id

    if (this.data.isShow) {
      that.data.focus[now_post].upstatus = 1 - that.data.focus[now_post].upstatus
      post_status = that.data.focus[now_post].upstatus
      post_id_system = that.data.focus[now_post].postid
      post_user_id = that.data.focus[now_post].postuserid
      if (post_status == 1) {
        that.data.focus[now_post].LikeCount = that.data.focus[now_post].LikeCount + 1
      }
      else {
        that.data.focus[now_post].LikeCount = that.data.focus[now_post].LikeCount - 1
      }
      that.setData({
        focus: that.data.focus
      })
    } else {
      that.data.new_post_list[now_post].upstatus = 1 - that.data.new_post_list[now_post].upstatus
      post_id_system = that.data.new_post_list[now_post].postid
      post_status = that.data.new_post_list[now_post].upstatus
      post_user_id = that.data.new_post_list[now_post].postuserid
      if (post_status == 1) {
        that.data.new_post_list[now_post].LikeCount = that.data.new_post_list[now_post].LikeCount + 1
      }
      else {
        that.data.new_post_list[now_post].LikeCount = that.data.new_post_list[now_post].LikeCount - 1
      }
      that.setData({
        new_post_list: that.data.new_post_list
      })
    }
     
    console.log(that.data.userid + " " + post_id_system + " " +post_user_id)
    wx.request({
      url: 'https://www.horseee.top/like-change',
      data: {
        userid:that.data.userid,
        postid:post_id_system,
        postuserid: post_user_id,
        status:post_status
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

  onShareAppMessage: function(){
    return {
      title: "L'oreal X A-one",
      desc: "一个答题+美妆的小程序，快来体验吧",
      path: "pages/welcome/welcome"
    }
  },

  onReachBottom: function(){
    /*var that = this;
    that.setData({
      pageNumber: that.data.pageNumber+1
    })
    console.log(that.data.pageNumber)
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      success: function(e) {
        console.log(e.data.top_stories);
        that.setData({
          focus: that.data.focus.concat(e.data.top_stories)
        })
      }
    })*/
  },
  onBindinput: function(e) {
    this.setData({
      searchtext: e.detail.value
    })
  },

  onBindConfirm: function(e) {
    var that = this
    console.log(that.data.searchtext)
    wx.navigateTo({
      url: '/pages/search/search?searchtext=' + that.data.searchtext,
    })
  },

  ImageLook: function(event){
    var src = event.currentTarget.dataset.src;//获取data-src
    var num = event.currentTarget.dataset.type
    var that = this
    var imageList = new Array()
    //图片预览
    
    if (that.data.isShow == false) {
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
    } else {
      if (that.data.focus[num].url_1.length != 0) {
        imageList.push(that.data.focus[num].url_1)
      }
      if (that.data.focus[num].url_2.length != 0) {
        imageList.push(that.data.focus[num].url_2)
      }
      if (that.data.focus[num].url_3.length != 0) {
        imageList.push(that.data.focus[num].url_3)
      }
      wx.previewImage({
        current: src, 
        urls: imageList
      })
    }
    
  },

  onLoad: function (options) {
    console.log(options)
    var that = this;

    that.setData({
      userid: app.globalData.id
    });

    console.log("加载时触发")

    var animationUp = wx.createAnimation({
      timingFunction: 'ease-in-out'
    })
    this.animationUp = animationUp

  },
  
  onShow: function() {
    var that = this;
    if (that.data.isShow) {
      wx.request({
        url: 'https://www.horseee.top/hot/0',
        data: {
          userid: that.data.userid
        },
        success: function (e) {
          console.log(e.data);
          that.setData({
            focus: e.data.posts,
          })
        }
      })
    } else {
      wx.request({
        url: 'https://www.horseee.top/new/0',
        data: {
          userid: that.data.userid
        },
        success: function (e) {
          console.log(e.data);
          that.setData({
            new_post_list: e.data.news,
          })
        }
      })
    }
  }
})
