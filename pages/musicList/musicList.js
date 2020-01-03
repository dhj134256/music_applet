// pages/musicList/musicList.js
var app = getApp();
var http = require('../../fun/http.js');
var getMusic = require('../../fun/getMusic.js');
var type = '';
var sum = 15;
var num = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '',
    comment: '',
    songlist: [],
    total: 0,
    songName: '',
    flag: '',
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    sum = 15;
    wx.showLoading({
      title: '数据拼命加载中',
    });
    var that = this;
    // console.log(options.type);
    type = options.type;
    http(type, sum, num, function(res) {
      console.log(res);
      that.setData({
        img: res.img,
        comment: res.comment,
        songlist: res.songlist,
        total: res.total
      })
    });
    this.setData({
      songName: app.globalData.songName,
      flag: app.globalData.flag
    });

    app.globalData.BackgroundAudioManager.onEnded(function() {
      app.globalData.index++;
      console.log(app.globalData.index, "下一首");
      if (app.globalData.songlist.length > app.globalData.index) {
        wx.request({
          url: 'http://iwenwiki.com/api/music/play.php?mid=' + app.globalData.songlist[app.globalData.index].songid,
          success: function(res) {
            app.globalData.BackgroundAudioManager.src = res.data.bitrate.file_link;
            app.globalData.BackgroundAudioManager.title = res.data.songinfo.title;
            app.globalData.songName = res.data.songinfo.title;
            app.globalData.flag = true;
            that.setData({
              songName: app.globalData.songName,
              flag: app.globalData.flag
            })
          }
        })
      }else{
        app.globalData.songName='';
        app.globalData.songlist=[];
        app.globalData.index=0;
        app.globalData.flag=false;
      }
    })
  },
  play: function(e) {
    var that = this;
    console.log(e.currentTarget.dataset.songid);
    app.globalData.index = e.currentTarget.dataset.songindex;
    // wx.request({
    //   url: "http://iwenwiki.com/api/music/play.php?mid=" + e.currentTarget.dataset.songid,
    //   success: function(res) {
    //     // var BackgroundAudioManager = wx.getBackgroundAudioManager();
    //     app.globalData.BackgroundAudioManager.src = res.data.bitrate.file_link;
    //     app.globalData.BackgroundAudioManager.title = res.data.songinfo.title;
    //     app.globalData.songName = res.data.songinfo.title;
    //     app.globalData.flag = true;
    //     that.setData({
    //       songName: app.globalData.songName,
    //       flag: app.globalData.flag
    //     })
    //   }
    // })
    getMusic(e.currentTarget.dataset.songid,function(res){
      that.setData({
        songName: res.songName,
        flag: res.flag
      })
    })

  },
  control_play: function() {
    if (app.globalData.BackgroundAudioManager.paused) {
      app.globalData.BackgroundAudioManager.play();
      app.globalData.flag = true;
      this.setData({
        flag: app.globalData.flag
      })
    } else {
      app.globalData.BackgroundAudioManager.pause();
      app.globalData.flag = false;
      this.setData({
        flag: app.globalData.flag
      })
    }
  },
  all_play: function() {
    var that = this;
    app.globalData.songlist = this.data.songlist;
    app.globalData.index = 0;
    // wx.request({
    //   url: "http://iwenwiki.com/api/music/play.php?mid=" + app.globalData.songlist[0].songid,
    //   success: function(res) {
    //     // var BackgroundAudioManager = wx.getBackgroundAudioManager();
    //     app.globalData.BackgroundAudioManager.src = res.data.bitrate.file_link;
    //     app.globalData.BackgroundAudioManager.title = res.data.songinfo.title;
    //     app.globalData.songName = res.data.songinfo.title;
    //     app.globalData.flag = true;
    //     that.setData({
    //       songName: app.globalData.songName,
    //       flag: app.globalData.flag
    //     })
    //   }
    // })
    getMusic(app.globalData.songlist[0].songid,function(res){
      that.setData({
        songName: res.songName,
        flag: res.flag
      })
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    sum = 15;
    num = 0;
    wx.showLoading({
      title: '正在刷新',
    });
    this.setData({
      songlist: []
    });
    var that = this;
    http(type, 15, 0, function(res) {
      // console.log(res);
      that.setData({
        songlist: res.songlist,
        total: res.total
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '数据拼命加载中',
    });
    var that = this;
    sum == this.data.total ? sum += 15 : sum = this.data.total;
    // sum+=15;
    console.log(sum);
    console.log(this.data.total);
    http(type, sum, num, function(res) {
      // console.log(res);
      that.setData({
        img: res.img,
        comment: res.comment,
        songlist: res.songlist,
        total: res.total
      },function(){
        app.globalData.songlist=that.data.songlist
      })
    });

    // wx.showLoading({
    //   title: '数据拼命加载中',
    // });
    // var that = this;
    // num++;
    // http(type, 15, num*15, function (res) {
    //   that.setData({
    //     songlist: that.data.songlist.concat(res.songlist)
    //   })
    // });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})