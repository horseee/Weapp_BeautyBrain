// pages/question/question.js

const app = getApp()

Page({
  data: {
    canvas_width: 375,
  },

  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          canvas_width: res.windowWidth
        })
        console.log(res)
      }
    })
    this.drawAnswersheet()
    wx.request({
      url: 'https://www.horseee.top/question/2018-03-03-19-30-00',
      success: function (e) {
        console.log(e)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    
    // 每10s更换一次答题卡的内容
   //this.interval = setInterval(this.drawAnswersheet, 10000);

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  drawAnswersheet: function(){

    //var wid = this.data.canvas_width
    //console.log(wid/2)
    //const ctx = wx.createCanvasContext('answer-sheet-background')

    //ctx.translate(wid/2, wid/4)



    var circleR = wid / 12

    function drawAvator() {
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, circleR, 0, 2 * Math.PI)
      ctx.setGlobalAlpha(0.8)
      ctx.setFillStyle('#fff')
      ctx.fill()
    }
    
    function drawBorder() {
      var radiusForcorner = wid / 15
      ctx.moveTo(0, 0)
      circleR = wid / 10
      ctx.beginPath()
      ctx.setLineWidth(2)
      ctx.setGlobalAlpha(0.4)
      ctx.arc(0, 0, circleR, 0, Math.PI, true)
      ctx.lineTo(wid / 2.5 - radiusForcorner, 0)
      ctx.arc(wid / 2.5 - radiusForcorner, radiusForcorner, radiusForcorner, -Math.PI / 2, 0)
      ctx.lineTo(wid / 2.5, wid - radiusForcorner)
      ctx.arc(wid / 2.5 - radiusForcorner, wid - radiusForcorner, radiusForcorner, 0, Math.PI / 2)
      ctx.lineTo(-wid / 2.5 + radiusForcorner, wid)
      ctx.arc(- wid / 2.5 + radiusForcorner, wid - radiusForcorner, radiusForcorner, Math.PI / 2, Math.PI)
      ctx.lineTo(-wid / 2.5, radiusForcorner)
      ctx.arc(- wid / 2.5 + radiusForcorner, radiusForcorner, radiusForcorner, Math.PI, Math.PI * 3 / 2)
      ctx.lineTo(-circleR, 0)
      ctx.setFillStyle('#fff')
      ctx.fill()
    }
   
    function drawButton(distance) {
      var radiusButton = wid/20
      
      ctx.setLineWidth(2)
      ctx.setGlobalAlpha(0.4)

      ctx.beginPath()
      ctx.setLineWidth(2)
      ctx.setGlobalAlpha(1)
      ctx.moveTo(0,distance)
      ctx.lineTo(wid / 3 - radiusButton, distance)
      ctx.arc(wid / 3 - radiusButton, distance + radiusButton, radiusButton, -Math.PI /2, 0)
      ctx.lineTo(wid / 3, wid / 10 + distance - radiusButton)
      ctx.arc(wid / 3 - radiusButton, wid / 10 + distance - radiusButton, radiusButton, 0, Math.PI / 2)
      ctx.lineTo(- wid / 3 + radiusButton, wid / 10 + distance)
      ctx.arc(- wid / 3 + radiusButton, wid / 10 + distance - radiusButton, radiusButton, Math.PI / 2, Math.PI)
      ctx.lineTo(- wid / 3, distance + radiusButton)
      ctx.arc(- wid / 3 + radiusButton, distance + radiusButton, radiusButton, -Math.PI, -Math.PI / 2)

      ctx.setFillStyle('#fff')
      ctx.fill()
    }

    function drawText(content, distance){
      ctx.setFontSize(16)
      ctx.setLineWidth(1)
      ctx.setFillStyle('#000')
      ctx.fillText(content, - wid / 3.6, distance + wid / 15)
    }


    drawAvator()
    drawBorder()
    
    drawButton(wid / 2.4)
    drawButton(wid / 2.4 + wid / 8)
    drawButton(wid / 2.4 + wid / 4)
    drawButton(wid / 2.4 + wid / 8 * 3)

    drawText('A. ysl', wid / 2.4)
    drawText('B. l\'oreal',wid / 2.4 + wid / 8)
    drawText('C. lancome',wid / 2.4 + wid / 4)
    drawText('D. mac',wid / 2.4 + wid / 8 * 3)

    ctx.draw()

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