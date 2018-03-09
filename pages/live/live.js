//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js'); 

var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');

var start_timer;
var new_question_timer;
var effects_timer;
var vanish_timer;
var Result_timer;
var Remain_timer_1;
var Remain_timer_2;
var countdowntimer;


Page({
  data: {
    remain_type: "",
    show_type: "",
    windowWidth: 375,
    windowHeight: 603,
    id: "",
    start_time: "2018-03-09-10-50-40",
    QuestionInf: "",
    A_text: "",
    B_text: "",
    C_text: "",
    detail: "   ",
    special_effects: "",
    isA_click: false,
    isB_click: false,
    isC_click: false,
    isAbletoClick: true,
    temp_question_id: -1,
    isAlive: true,
    total_count: 0,
    remain_count :0,
    isA_correct: false,
    isA_wrong: false,
    isB_correct: false,
    isB_wrong: false,
    isC_correct: false,
    isC_wrong: false,
    isAnswerShow: false,
    stilldied: false,
    ifnotstart: true,
    deltahour: "00",
    deltamin: "00",
    deltasec: "00"
  },

  startAnswer: function () {
    var that = this
    console.log(this.data.QuestionInf)
    console.log(this.data.QuestionInf.length)
    that.setData({
      ifnotstart: false
    })
    this.updateText(-1)
  },

  updateText: function(index) {
    var that = this
    
    new_question_timer = setTimeout(function () {
      index = index + 1
      var question = that.data.QuestionInf[index]
      console.log(index)
      console.log(question)
      that.setData({
        A_text: question.A,
        B_text: question.B,
        C_text: question.C,
        detail: question.detail,
        special_effects: "vanishIn",
        isAbletoClick: true,
        temp_question_id: index,
        isA_correct: false,
        isA_wrong: false,
        isB_correct: false,
        isB_wrong: false,
        isC_correct: false,
        isC_wrong: false,
        isAnswerShow: false,
        isA_click: false,
        isB_click: false,
        isC_click: false,
      })
      that.drawCircle()
      var questionin = index+1
      var temp_url = 'https://www.horseee.top/contest_number_' + questionin
      Result_timer = setTimeout(function(){
        if (that.data.QuestionInf[index].answer == 'A') {
          that.setData({
            isA_correct: true
          })
        } else if (that.data.QuestionInf[index].answer == 'B') {
          that.setData({
            isB_correct: true
          })
        } else {
          that.setData({
            isC_correct: true
          })
        }

        if (that.data.isAlive == false && that.data.stilldied == false) {
          that.updateScore(index + 1, that.data.total_count-that.data.remain_count)
          wx.showModal({
            title: 'Sorry',
            content: '答错啦！还需继续加油哦～',
            confirmText: '退出',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/answer/answer',
                })
              } 
            }
          }) 
        }

        that.setData({
          isAnswerShow: true,
          stilldied: !that.data.isAlive
        })
        wx.request({
          url: temp_url,
          success: function (e) {
            console.log(e)
            that.setData({
              remain_type: "tinDownOut"
            })
            Remain_timer_1 = setTimeout(function(){
              that.setData({
                remain_count: e.data,
                remain_type: "tinDownIn"
              })
              Remain_timer_2 = setTimeout(function () {
                that.setData({
                  remain_type: ""
                })
              }, 1000)
            }, 1000)
          }
        })
      }, 16000)
      effects_timer = setTimeout(function() {
        that.setData({
          special_effects: ""
        })
      }, 1000)   //设置题面
      
      if (index < that.data.QuestionInf.length - 1)
        that.updateText(index)
      else {
        that.updateScore(index+1, that.data.total_count - that.data.remain_count)
      }
    }, that.data.QuestionInf[index+1].time * 1000);
  },

  updateScore: function(question, beatCount) {
    ThisTimeScore = question * 10 + beatCount
    wx.request({
      url: 'https://www.horseee.top/update-score',
      data: {
        score:  ThisTimeScore,
        id: that.data.id
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
        that.setData({
          QuestionInf: e.data.questions
        })
      }
    })

    wx.playBackgroundAudio({
      dataUrl: 'https://www.horseee.top/mp3',
      success: function (e) {
        wx.pauseBackgroundAudio()
      }
    })

    var time_arr = this.data.start_time.split("-")
    var start_hour = parseInt(time_arr[3])
    var start_min = parseInt(time_arr[4])
    var start_sec = parseInt(time_arr[5])
    console.log(time_arr)
    var temp_time = (new Date());
    console.log(temp_time.getHours())
    console.log(temp_time.getMinutes())
    console.log(temp_time.getSeconds())
    var temp_hour = temp_time.getHours()
    var temp_min = temp_time.getMinutes()
    var temp_sec = temp_time.getSeconds()
    var totaltime = 0;

    var start_time_absolute = start_hour * 3600 + start_min * 60 + start_sec
    var temp_time_absolute = temp_hour * 3600 + temp_min * 60 + temp_sec
    var deltatime = start_time_absolute - temp_time_absolute

    if (deltatime > 0) {
      that.startCountDown(deltatime)
    }
    console.log(deltatime)
    that.setData({
      ifnotstart: true
    })

    start_timer = setTimeout(function () {
      wx.playBackgroundAudio({
        dataUrl: 'https://www.horseee.top/mp3',
        success: function(e) {
          console.log("start playing")
        }
      })
      wx.request({
        url: 'https://www.horseee.top/contest_number_0',
        success: function(e){
          console.log(e)
          that.setData({
            total_count: e.data,
            remain_count: e.data
          })
        }
      })
      that.startAnswer()
    }, deltatime * 1000);
  },

  startCountDown: function(deltatime) {
    var that=this
    countdowntimer = setTimeout(function(){
      deltatime = deltatime - 1
      var temp_sec
      var temp_min
      if (deltatime % 60 < 10) 
        temp_sec = "0" + deltatime % 60
      else 
        temp_sec = deltatime % 60

      if (parseInt(deltatime / 60) < 10)
        temp_min = "0" + parseInt(deltatime / 60)
      else 
        temp_min = parseInt(deltatime / 60)
      that.setData({
        deltahour: parseInt(deltatime / 3600),
        deltamin: temp_min,
        deltasec: temp_sec
      })
      that.startCountDown(deltatime)
    }, 1000)
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

  chooseAnswer: function(e) {
    var now_button = e.currentTarget.dataset.type;
    var that = this
    var question_index = that.data.temp_question_id
    console.log(now_button)
    if (now_button == "A" && this.data.isAbletoClick && this.data.isAlive) {
      this.setData({
        isA_click: !this.data.isA_click,
        isAbletoClick: false,
      })
      if (that.data.QuestionInf[question_index].answer == 'A') {
        console.log("Answer Correct")
        that.setData({
          isAlive: true,
          isA_correct: true
        })
        wx.request({
          url: 'https://www.horseee.top/contest_correct',
          data: {
            userID: that.data.id,
            question_id: that.data.temp_question_id + 1
          },
          header: {
            "Content-Type": "application/json"
          },
          method: 'POST',
          success: function (e) {
            console.log(e)
          }
        })
      } else {
        that.setData({
          isAlive: false,
          isA_wrong:true
        })
      }
    }
    else if (now_button == "B" && this.data.isAbletoClick && this.data.isAlive) {
      this.setData({
        isB_click: !this.data.isB_click,
        isAbletoClick: false
      })
      if (that.data.QuestionInf[question_index].answer == 'B') {
        console.log("Answer Correct")
        that.setData({
          isAlive: true,
          isB_correct: true
        })
        wx.request({
          url: 'https://www.horseee.top/contest_correct',
          data: {
            userID: that.data.id,
            question_id: that.data.temp_question_id + 1
          },
          header: {
            "Content-Type": "application/json"
          },
          method: 'POST',
          success: function (e) {
            console.log(e)
          }
        })
      } else {
        that.setData({
          isAlive: false,
          isB_wrong: true
        })
      }
    }
    else if (now_button == "C" && this.data.isAbletoClick && this.data.isAlive) {
      this.setData({
        isC_click: !this.data.isC_click,
        isAbletoClick: false
      })
      if (that.data.QuestionInf[question_index].answer == 'C') {
        console.log("Answer Correct")
        that.setData({
          isAlive: true,
          isC_correct: true
        })
        wx.request({
          url: 'https://www.horseee.top/contest_correct',
          data: {
            userID: that.data.id,
            question_id: that.data.temp_question_id + 1
          },
          header: {
            "Content-Type": "application/json"
          },
          method: 'POST',
          success: function (e) {
            console.log(e)
          }
        })
      } else {
        that.setData({
          isAlive: false,
          isC_wrong: true
        })
      }
    }

  },

  drawCircle: function () {
    var that = this
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
        if (step == n) {
          if (that.data.isAlive && !that.data.isA_click && !that.data.isB_click && !that.data.isC_click) {
            that.setData({
              isAlive: false
            })
          }
          that.setData({
            isAbletoClick: false,
          })
        }
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
    wx.stopBackgroundAudio()
  }

})
