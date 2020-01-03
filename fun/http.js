function http(type, count, num, fun) {
  // wx.showLoading({
  //   title: '数据拼命加载中',
  // })
  wx.request({
    url: 'http://iwenwiki.com/api/music/list.php?type=' + type + '&count=' + count + '&offset=' + num,
    success: function (res) {
      wx.hideLoading();
      wx.showToast({
        title: '数据加载成功',
      });
      // console.log(res);
      var songlist = [];
      var arr = [];
      for (var i in res.data.song_list) {
        arr.push(res.data.song_list[i].pic_big);
        var song = {};
        song.title = res.data.song_list[i].title;
        song.author = res.data.song_list[i].author;
        song.img = res.data.song_list[i].pic_big;
        song.songid = res.data.song_list[i].song_id;
        songlist.push(song);
      }


      var obj = {
        name: res.data.billboard.name,
        pic_img: arr,
        type: res.data.billboard.billboard_type,
        img: res.data.billboard.pic_s192,
        comment: res.data.billboard.comment,
        songlist: songlist,
        total: res.data.song_list.length
      }

      fun(obj);

    }
  });

}

module.exports = http;