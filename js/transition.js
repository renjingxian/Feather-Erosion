/*页面跳转淡入淡出*/
(function ()
{
  var FADE_MS = 400;

  var overlay = document.createElement("div");
  overlay.id = "pageFade";
  overlay.style.cssText =
    "position:fixed;inset:0;z-index:2147483647;background:#05070b;opacity:1;" +
    "pointer-events:none;transition:opacity " + FADE_MS + "ms ease;";
  document.documentElement.appendChild(overlay);

  /*淡入*/
  var navType = "navigate";
  try
  {
    var entry = performance.getEntriesByType("navigation")[0];
    if (entry) navType = entry.type;
  }
  catch (e) {}

  if (navType === "navigate")
  {
    requestAnimationFrame(function ()
    {
      requestAnimationFrame(function ()
      {
        overlay.style.opacity = "0";
      });
    });
  }
  else
  {
    overlay.style.opacity = "0";
  }

  /*从bfcache恢复*/
  window.addEventListener("pageshow", function (e)
  {
    if (e.persisted) overlay.style.opacity = "0";
  });

  window.fadeOut = function (done, minMs)
  {
    overlay.style.opacity = "1";
    setTimeout(done, Math.max(minMs || 0, FADE_MS));
  };

  /* 淡出后跳转 */
  window.fadeNav = function (url, minMs)
  {
    window.fadeOut(function () { window.location.href = url; }, minMs);
  };
})();
