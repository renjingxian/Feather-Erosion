/* 点击音效：click 用于菜单/按钮；游戏内翻页与地图移动走 js/turn.js 的 turn 音效 */
(function ()
{
  var scriptSrc = (document.currentScript && document.currentScript.src) || "";
  var audioSrc = scriptSrc
    ? scriptSrc.replace(/js\/click\.js(\?.*)?$/, "audios/click.mp3")
    : "../audios/click.mp3";

  var audio = new Audio(audioSrc);
  audio.preload = "auto";

  /* 音效音量：统一持久化，加载时初始化，播放前读取最新值 */
  var SFX_KEY = "feather_erosion_sfx_volume";

  function readSfxVolume()
  {
    var v = parseFloat(localStorage.getItem(SFX_KEY) || "1");
    if (!isFinite(v) || v < 0) v = 0;
    if (v > 1) v = 1;
    return v;
  }

  audio.volume = readSfxVolume();

  window.setSfxVolume = function (v)
  {
    if (!isFinite(v)) v = 1;
    if (v < 0) v = 0;
    if (v > 1) v = 1;
    audio.volume = v;
    localStorage.setItem(SFX_KEY, String(v));
  };

  window.getSfxVolume = function ()
  {
    return audio.volume;
  };

  function play()
  {
    audio.volume = readSfxVolume();
    audio.currentTime = 0;
    var p = audio.play();
    if (p && p.catch) p.catch(function () {});
  }

  // 防止快速连点导致重复跳转
  var navigating = false;

  // bfcache 恢复（如返回主菜单）时复位跳转锁，否则后续所有按钮被拦截
  window.addEventListener("pageshow", function (e)
  {
    if (e.persisted) navigating = false;
  });

  function navAfterSound(url)
  {
    if (navigating) return;
    navigating = true;
    play();
    // 已加载 transition.js 的页面走淡出；否则维持原 150ms 延迟跳转
    if (window.fadeOut)
    {
      window.fadeOut(function () { window.location.href = url; }, 150);
    }
    else
    {
      setTimeout(function () { window.location.href = url; }, 150);
    }
  }

  // 全局延迟跳转：先播 click 再跳（菜单/按钮）
  window.clickNav = function (url)
  {
    navAfterSound(url);
  };

  var EXCLUDE = "#mapMini,#bagMini,#inventoryClose,#inventoryPanel,.achievement-mini,#textDom,#storyBg,#videoBlock";

  function jumpTarget(el)
  {
    if (el.tagName === "A")
    {
      var h = el.getAttribute("href");
      if (h && h.charAt(0) !== "#" && h.indexOf("javascript:") !== 0) return h;
      return null;
    }
    var code = el.getAttribute("onclick") || "";
    var m = code.match(/(?:window\.)?location\.href\s*=\s*['"]([^'"]+)['"]/);
    return m ? m[1] : null;
  }

  document.addEventListener("click", function (e)
  {
    var el = e.target.closest("button, a, [onclick]");
    if (!el) return;
    if (el.closest(EXCLUDE)) return;

    var target = jumpTarget(el);
    if (target)
    {
      // 跳转型元素：阻止默认跳转，先播音效再延迟跳转
      e.preventDefault();
      e.stopPropagation();
      navAfterSound(target);
    }
    else
    {
      play();
    }
  }, true);
})();
