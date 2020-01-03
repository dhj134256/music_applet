//app.js
App({
  onLaunch: function () {
    var bg = wx.getBackgroundAudioManager();
    this.globalData.BackgroundAudioManager = bg;
  },
  globalData: {
    BackgroundAudioManager: '',
    songName: '',
    flag: false,
    songlist:[],
    index:0
  }
})