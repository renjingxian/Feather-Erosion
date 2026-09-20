(function ()
{
  var SHOW_MS = 4000;
  var queue = [];
  var busy = false;
  var timer = null;

  /* 注入样式 */
  var style = document.createElement("style");
  style.textContent =
    ".achieve-toast{" +
      "position:fixed;left:24px;bottom:24px;z-index:99999;min-width:250px;max-width:320px;" +
      "padding:16px 18px 14px;background:rgba(10,13,20,.96);" +
      "border:1px solid rgba(201,162,82,.75);border-radius:8px;" +
      "box-shadow:0 8px 28px rgba(0,0,0,.6);color:#e8e2d4;" +
      "font-family:\"Microsoft YaHei\",sans-serif;opacity:0;transform:translateY(16px);" +
      "transition:opacity .4s ease,transform .4s ease;pointer-events:auto;" +
    "}" +
    ".achieve-toast.show{opacity:1;transform:translateY(0);}" +
    ".achieve-toast-title{font-size:12px;letter-spacing:2px;color:#c9a252;margin-bottom:6px;}" +
    ".achieve-toast-name{font-size:16px;color:#f5efe0;margin-bottom:12px;line-height:1.45;}" +
    ".achieve-toast-btn{display:inline-block;padding:6px 16px;font-size:13px;letter-spacing:1px;" +
      "color:#1a140a;background:linear-gradient(180deg,#e8c979,#c9a252);" +
      "border:none;border-radius:4px;cursor:pointer;}" +
    ".achieve-toast-btn:hover{filter:brightness(1.08);}";
  document.head.appendChild(style);

  /* 弹窗 DOM */
  var toast = document.createElement("div");
  toast.className = "achieve-toast";
  var title = document.createElement("div");
  title.className = "achieve-toast-title";
  title.textContent = "获得成就";
  var nameDom = document.createElement("div");
  nameDom.className = "achieve-toast-name";
  var btn = document.createElement("button");
  btn.className = "achieve-toast-btn";
  btn.type = "button";
  btn.textContent = "点击查看";
  toast.appendChild(title);
  toast.appendChild(nameDom);
  toast.appendChild(btn);
  document.body.appendChild(toast);

  /*点击弹窗空白处不推进剧情*/
  toast.addEventListener("click", function (e) { e.stopPropagation(); });

  /* 点击查看：淡出跳转到成就页 */
  btn.addEventListener("click", function (e)
  {
    e.stopPropagation();
    if (window.fadeNav) window.fadeNav("achievement.html");
    else window.location.href = "achievement.html";
  });

  function showNext()
  {
    if (queue.length === 0) { busy = false; return; }
    busy = true;
    var name = queue.shift();
    nameDom.textContent = "【" + name + "】";
    toast.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(function ()
    {
      toast.classList.remove("show");
      setTimeout(showNext, 450);
    }, SHOW_MS);
  }

  window.showAchievementToast = function (name)
  {
    if (!name) return;
    queue.push(name);
    if (!busy) showNext();
  };
})();
