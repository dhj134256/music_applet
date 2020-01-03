var app = getApp();
function getMusic(songid,fun){
  wx.request({
    url: "http://iwenwiki.com/api/music/play.php?mid=" + songid,
    success: function (res) {
      // var BackgroundAudioManager = wx.getBackgroundAudioManager();
      app.globalData.BackgroundAudioManager.src = res.data.bitrate.file_link;
      app.globalData.BackgroundAudioManager.title = res.data.songinfo.title;
      app.globalData.songName = res.data.songinfo.title;
      app.globalData.flag = true;
      // that.setData({
      //   songName: app.globalData.songName,
      //   flag: app.globalData.flag
      // })
      fun(app.globalData);
    }
  })
}
module.exports = getMusic;