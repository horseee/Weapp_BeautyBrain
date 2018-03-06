//index.js
//获取应用实例
const app = getApp()

var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');

Page({
  data: {
    show_type: "",
    windowWidth: 375,
    windowHeight: 603,
    id: "",
  },
  
  onLoad: function (options) {
    this.setData({
      id: options.id
    });

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })

    wx.request({
      url: 'https://www.horseee.top/question/2018-03-06-21-00-00',
      success: function (e) {
        console.log(e)
      }
    })
  },

  magic(e) {
    const type = e.currentTarget.dataset.type;
    const new_type = type;
    const show_type = this.data.show_type;
    if (!show_type) {
      setTimeout(this.Reset, 1000);
    } else {
      return;
    }
    this.setData({
      show_type: new_type
    });
  },

  Reset() {
    this.setData({
      show_type: ''
    })
  },

  drawCircle: function () {
    clearInterval(varName);
    function drawArc(s, e) {
      ctx.setFillStyle('white');
      ctx.clearRect(0, 0, 200, 200);
      ctx.draw();
      var x = 100, y = 50, radius = 30;
      ctx.setLineWidth(5);
      ctx.setStrokeStyle('#9AAFC1');
      ctx.setLineCap('round');
      ctx.beginPath();
      ctx.arc(x, y, radius, s, e, false);
      ctx.stroke()
      ctx.draw()
    }
    var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0;
    var animation_interval = 1000, n = 10;
    var animation = function () {
      if (step <= n) {
        endAngle = step * 2 * Math.PI / n + 1.5 * Math.PI;
        drawArc(startAngle, endAngle);
        step++;
      } else {
        clearInterval(varName);
      }
    };
    varName = setInterval(animation, animation_interval);
  },

  onReady: function () {
    //创建并返回绘图上下文context对象。
    var cxt_arc = wx.createCanvasContext('canvasCircle');
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#eaeaea');
    cxt_arc.setLineCap('round');
    cxt_arc.beginPath();
    cxt_arc.arc(100, 50, 30, 0, 2 * Math.PI, false);
    cxt_arc.stroke();
    cxt_arc.draw();
  },

  onUnload: function() {
    console.log("live exit")  
    wx.request({
      url: 'https://www.horseee.top/contest/exit_1',
      data: {
        userid: this.data.id,
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
      }
    })
  }

})
