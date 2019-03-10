var OriginTitile = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    $('[rel="shortcut icon"]').attr('href', "/TEP.png");
    document.title = 'w(ﾟДﾟ)w 出BUG啦！！！！';
    clearTimeout(titleTime);
  }
  else {
    $('[rel="shortcut icon"]').attr('href', "/favicon.png");
    document.title = '♪(^∇^*)我又好了嘿嘿~~ ' + OriginTitile;
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});
