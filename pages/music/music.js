Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.play()
  },

  data: {
    poster: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK1V6BNbTzjPFKvnSdn8skN9dm2U5up6DZks0QJn1Pu6a9YwFWSzL9EYKZGO3OBBcc4B2Hz0jwflg/0',
    name: 'horseee',
    author: 'horseee',
    src: 'https://www.horseee.top/mp3/201801.mp3',
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
})