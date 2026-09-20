/* 背景音乐：序章 + 四条支线共用，循环播放，跨页面续播 */
(function ()
{
  var BGM_KEY = "feather_erosion_bgm_time";
  var VOLUME_KEY = "feather_erosion_bgm_volume";
  var audio = new Audio("../audios/mainbgm.mp3");
  audio.loop = true;

  var savedVolume = parseFloat(localStorage.getItem(VOLUME_KEY) || "1");
  if (!isFinite(savedVolume) || savedVolume < 0) savedVolume = 0;
  if (savedVolume > 1) savedVolume = 1;
  audio.volume = savedVolume;

  var saved = parseFloat(localStorage.getItem(BGM_KEY) || "0");
  if (!isFinite(saved) || saved < 0) saved = 0;

  function saveTime()
  {
    if (audio.currentTime > 0)
    {
      localStorage.setItem(BGM_KEY, String(audio.currentTime));
    }
  }

  audio.addEventListener("loadedmetadata", function ()
  {
    if (saved > 0 && saved < audio.duration)
    {
      audio.currentTime = saved;
    }
  });

  /* 播放期间周期性保存进度，退出/暂停时再存一次 */
  setInterval(function ()
  {
    if (!audio.paused) saveTime();
  }, 2000);

  window.addEventListener("pagehide", saveTime);

  function play()
  {
    var p = audio.play();
    if (p && p.catch)
    {
      p.catch(function ()
      {
        /* 自动播放被浏览器拦截时，等首次用户交互后再播 */
        document.addEventListener("keydown", play, {once:true});
        document.addEventListener("click", play, {once:true});
      });
    }
  }

  window.BGM =
  {
    play: play,
    resume: play,
    pause: function ()
    {
      saveTime();
      audio.pause();
    },
    stop: function ()
    {
      saveTime();
      audio.pause();
      audio.currentTime = 0;
    },
    setVolume: function (v)
    {
      if (!isFinite(v)) v = 1;
      if (v < 0) v = 0;
      if (v > 1) v = 1;
      audio.volume = v;
      localStorage.setItem(VOLUME_KEY, String(v));
    },
    getVolume: function ()
    {
      return audio.volume;
    }
  };
})();
