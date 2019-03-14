const ap = new APlayer({
  container: document.getElementById('aplayer'),
  fixed: true,
  autoplay: false,
  audio: [
    {
      name: '风筝误',
      artist: '刘珂矣',
      url: 'http://up.mcyt.net/?down/46644.mp3',
      cover: 'http://oeff2vktt.bkt.clouddn.com/image/96.jpg',
    },
    {
      name: '昨日青空',
      artist: '尤长靖',
      url: 'http://www.ytmp3.cn/down/54181.mp3',
      cover: 'http://img.ytmp3.cn/image/5.jpg',
    },
    {
      name: '水星记',
      artist: '郭顶',
      url: 'http://www.ytmp3.cn/down/55401.mp3',
      cover: 'http://img.ytmp3.cn/image/53.jpg',
    },
    {
      name: '多想留在你身边',
      artist: '刘增瞳',
      url: 'http://www.ytmp3.cn/down/49817.mp3',
      cover: 'http://img.ytmp3.cn/image/26.jpg',
    }
  ]
});
