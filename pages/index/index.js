// pages/index/index.js
var http = require('../../fun/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    old_songs:{},
    hot_songs:{},
    new_songs:{},
    rock_songs:{},
    golden_songs:{}
  },
  skip:function(e){
    wx.navigateTo({
      url: '../musicList/musicList?type=' + e.currentTarget.dataset.mtype,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.old_songs.type)
    wx.showLoading({
      title: '数据拼命加载中',
    });
    var that = this;
    http(22,1,0,function(res){
      that.setData({
        old_songs:res
      })
    });
    http(2, 1, 0, function (res) {
      that.setData({
        hot_songs: res
      })
    });
    http(1, 3, 0, function (res) {
      that.setData({
        new_songs: res
      })
    });
    http(11, 3, 0, function (res) {
      that.setData({
        rock_songs: res
      })
    });
    http(24, 3, 0, function (res) {
      that.setData({
        golden_songs: res
      })
    });
    // wx.request({
    //   method:'GET',
    //   url: 'http://iwenwiki.com/api/music/list.php?type=22&count=1&offset=0',
    //   success:function(res){
    //     console.log(res);
    //     that.setData({
    //       old_songs:{
    //         pic_img: res.data.song_list[0].pic_big,
    //         name:res.data.billboard.name
    //       }
    //     })
    //   }
    // });
    // wx.request({
    //   url: 'http://iwenwiki.com/api/music/list.php?type=2&count=1&offset=0',
    //   success:function(res){
    //     that.setData({
    //       hot_songs: {
    //         pic_img: res.data.song_list[0].pic_big,
    //         name: res.data.billboard.name
    //       }
    //     })
    //   }
    // });
    // wx.request({
    //   url: 'http://iwenwiki.com/api/music/list.php?type=1&count=3&offset=0',
    //   success:function(res){
    //     var arr = [];
    //     for(var i in res.data.song_list){
    //       arr.push(res.data.song_list[i].pic_big);
    //     }
    //     that.setData({
    //       new_songs:{
    //         name: res.data.billboard.name,
    //         pic_img:arr
    //       }
    //     })
    //   }
    // });
    // wx.request({
    //   url: 'http://iwenwiki.com/api/music/list.php?type=11&count=3&offset=0',
    //   success: function (res) {
    //     var arr = [];
    //     for (var i in res.data.song_list) {
    //       arr.push(res.data.song_list[i].pic_big);
    //     }
    //     that.setData({
    //       rock_songs: {
    //         name: res.data.billboard.name,
    //         pic_img: arr
    //       }
    //     })
    //   }
    // });
    // wx.request({
    //   url: 'http://iwenwiki.com/api/music/list.php?type=24&count=3&offset=0',
    //   success: function (res) {
    //     var arr = [];
    //     for (var i in res.data.song_list) {
    //       arr.push(res.data.song_list[i].pic_big);
    //     }
    //     that.setData({
    //       golden_songs: {
    //         name: res.data.billboard.name,
    //         pic_img: arr
    //       }
    //     })
    //   }
    // });
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