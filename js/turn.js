(function ()
{
  var scriptSrc = (document.currentScript && document.currentScript.src) || "";
  var audioSrc = scriptSrc
    ? scriptSrc.replace(/js\/turn\.js(\?.*)?$/, "audios/turn.mp3")
    : "../audios/turn.mp3";
  var audio = new Audio(audioSrc);
  audio.preload = "auto";
  var SFX_KEY = "feather_erosion_sfx_volume";

  function readSfxVolume()
  {
    var v = parseFloat(localStorage.getItem(SFX_KEY) || "1");
    if (!isFinite(v) || v < 0) v = 0;
    if (v > 1) v = 1;
    return v;
  }
  audio.volume = readSfxVolume();

  function play()
  {
    audio.volume = readSfxVolume();
    audio.currentTime = 0;
    var p = audio.play();
    if (p && p.catch) p.catch(function () {});
  }

  // 跳转延迟
  function navDelay()
  {
    if (isFinite(audio.duration) && audio.duration > 0)
      return Math.min(2000, Math.ceil(audio.duration * 1000) + 60);
    return 900;
  }

  var navigating = false;

  // bfcache 恢复时复位跳转锁
  window.addEventListener("pageshow", function (e)
  {
    if (e.persisted) navigating = false;
  });

  // 游戏内翻页
  window.playTurn = function ()
  {
    play();
  };

  // 游戏内跳转
  window.turnNav = function (url)
  {
    if (navigating) return;
    navigating = true;
    play();
    var delay = navDelay();
    if (window.fadeOut)
    {
      window.fadeOut(function () { window.location.href = url; }, delay);
    }
    else
    {
      setTimeout(function () { window.location.href = url; }, delay);
    }
  };
})();
