const ACHIEVEMENT_KEY = "feather_erosion_achievements";

/* 成就按账号/游客隔离：账号存 localStorage，游客存 sessionStorage */
function achievementOwner()
{
  try { return localStorage.getItem("feather_erosion_current_user") || "guest"; }
  catch (e) { return "guest"; }
}

function achievementStorageKey()
{
  return ACHIEVEMENT_KEY + "_" + achievementOwner();
}

function achievementStore()
{
  return achievementOwner() === "guest" ? sessionStorage : localStorage;
}

const ACHIEVEMENT_CATALOG =
[
  "未变之局·天空之城",
  "此生不负",
  "未说出口的真相",
  "羽蚀共生·天空之城",
  "永恒囚徒·天空之城",
  "承天之翼",
  "坠落之城",
  "拂晓的消散·天空之城",
  "父与子·天空之城",
  "四族盟约·天空之城",
  "无名英雄·天空之城",
  "未变之局·帝国城邦",
  "羽蚀共生·帝国城邦",
  "永恒囚徒·帝国城邦",
  "钢铁纪元",
  "铁与火之后",
  "拂晓的消散·帝国城邦",
  "父与子·帝国城邦",
  "四族盟约·帝国城邦",
  "无名英雄·帝国城邦",
  "未变之局·精灵之森",
  "根脉囚徒",
  "根脉之誓",
  "绿之安宁",
  "根脉之后",
  "拂晓的消散·精灵之森",
  "四族盟约·精灵之森",
  "无名英雄·精灵之森",
  "未变之局·地下古堡",
  "铁门之前",
  "灰烬共生",
  "灰烬囚徒",
  "熔岩王座",
  "地底之后",
  "拂晓的消散·地下古堡",
  "父与子·地下古堡",
  "四族盟约·地下古堡",
  "无名英雄·地下古堡"
];

const LEGACY_DUPLICATE_ACHIEVEMENTS =
{
  "羽蚀共生":{"sky":"羽蚀共生·天空之城","empire":"羽蚀共生·帝国城邦"},
  "永恒囚徒":{"sky":"永恒囚徒·天空之城","empire":"永恒囚徒·帝国城邦"},
  "拂晓的消散":{"sky":"拂晓的消散·天空之城","empire":"拂晓的消散·帝国城邦","forest":"拂晓的消散·精灵之森"},
  "父与子":{"sky":"父与子·天空之城","empire":"父与子·帝国城邦"},
  "四族盟约":{"sky":"四族盟约·天空之城","empire":"四族盟约·帝国城邦","forest":"四族盟约·精灵之森"},
  "无名英雄":{"sky":"无名英雄·天空之城","empire":"无名英雄·帝国城邦","forest":"无名英雄·精灵之森"},
  "未变之局":{"sky":"未变之局·天空之城","empire":"未变之局·帝国城邦","forest":"未变之局·精灵之森"}
};

const ACHIEVEMENT_DETAILS =
{
  "未变之局·天空之城": {route:"天空之城", desc:"你什么都没能改变，天空之城依旧如昨，羽蚀终将降临。"},
  "此生不负": {route:"天空之城", desc:"面对赛琳的叔叔，你选择坦诚，没有欺骗赛琳。"},
  "未说出口的真相": {route:"天空之城", desc:"你只说出部分真相，把关于她母亲遗愿的细节深藏心底。"},
  "羽蚀共生·天空之城": {route:"天空之城", desc:"你与羽蚀达成共生，力量与代价并存。"},
  "永恒囚徒·天空之城": {route:"天空之城", desc:"你以自己为代价，沦为永恒囚徒。"},
  "承天之翼": {route:"天空之城", desc:"你与赛琳共同展翅，迎来天空之城最好的结局。"},
  "坠落之城": {route:"天空之城", desc:"天空之城坠落，繁华化为灰烬。"},
  "拂晓的消散·天空之城": {route:"天空之城", desc:"拂晓时分，羽蚀消散，新时代到来。"},
  "父与子·天空之城": {route:"天空之城", desc:"你与父亲重逢，结局却坠入黑暗。"},
  "四族盟约·天空之城": {route:"天空之城", desc:"你促成四族盟约，迎来隐藏的最佳结局。"},
  "无名英雄·天空之城": {route:"天空之城", desc:"你成就了众人，却无人记得你的名字。"},
  "未变之局·帝国城邦": {route:"帝国城邦", desc:"你什么都没能改变，帝国城邦依旧如昨。"},
  "羽蚀共生·帝国城邦": {route:"帝国城邦", desc:"你与羽蚀达成共生，力量与代价并存。"},
  "永恒囚徒·帝国城邦": {route:"帝国城邦", desc:"你以自己为代价，沦为永恒囚徒。"},
  "钢铁纪元": {route:"帝国城邦", desc:"你开创钢铁纪元，迎来帝国城邦最好的结局。"},
  "铁与火之后": {route:"帝国城邦", desc:"你成为铁与火之后。"},
  "拂晓的消散·帝国城邦": {route:"帝国城邦", desc:"拂晓时分，羽蚀消散。"},
  "父与子·帝国城邦": {route:"帝国城邦", desc:"你与父亲重逢，结局却坠入黑暗。"},
  "四族盟约·帝国城邦": {route:"帝国城邦", desc:"你促成四族盟约。"},
  "无名英雄·帝国城邦": {route:"帝国城邦", desc:"你成就了众人，却无人记得你的名字。"},
  "未变之局·精灵之森": {route:"精灵之森", desc:"你什么都没能改变，精灵之森依旧如昨。"},
  "根脉囚徒": {route:"精灵之森", desc:"你被根脉束缚，沦为囚徒。"},
  "根脉之誓": {route:"精灵之森", desc:"你立下根脉之誓。"},
  "绿之安宁": {route:"精灵之森", desc:"你为精灵之森带来安宁，迎来最好的结局。"},
  "根脉之后": {route:"精灵之森", desc:"你成为根脉之后。"},
  "拂晓的消散·精灵之森": {route:"精灵之森", desc:"拂晓时分，羽蚀消散。"},
  "四族盟约·精灵之森": {route:"精灵之森", desc:"你促成四族盟约。"},
  "无名英雄·精灵之森": {route:"精灵之森", desc:"你成就了众人，却无人记得你的名字。"},
  "未变之局·地下古堡": {route:"地下古堡", desc:"你什么都没能改变，地下古堡依旧如昨。"},
  "铁门之前": {route:"地下古堡", desc:"你在铁门前倒下，被扔出矿道，羽蚀终将降临。"},
  "灰烬共生": {route:"地下古堡", desc:"你与灰烬达成共生，力量与代价并存。"},
  "灰烬囚徒": {route:"地下古堡", desc:"你沦为灰烬囚徒。"},
  "熔岩王座": {route:"地下古堡", desc:"你登上熔岩王座，迎来地下古堡最好的结局。"},
  "地底之后": {route:"地下古堡", desc:"你成为地底之后。"},
  "拂晓的消散·地下古堡": {route:"地下古堡", desc:"拂晓时分，羽蚀消散。"},
  "父与子·地下古堡": {route:"地下古堡", desc:"你与父亲重逢，结局却坠入黑暗。"},
  "四族盟约·地下古堡": {route:"地下古堡", desc:"你促成四族盟约。"},
  "无名英雄·地下古堡": {route:"地下古堡", desc:"你成就了众人，却无人记得你的名字。"}
};

function loadAchievements()
{
  const raw = achievementStore().getItem(achievementStorageKey());
  if (!raw) return {};
  try
  {
    const data = JSON.parse(raw);
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  }
  catch (error)
  {
    console.error("成就数据读取失败：", error);
    return {};
  }
}

function saveAchievements(achievements)
{
  achievementStore().setItem(achievementStorageKey(), JSON.stringify(achievements));
}

function migrateLegacyAchievements()
{
  const achievements = loadAchievements();
  let changed = false;
  Object.keys(LEGACY_DUPLICATE_ACHIEVEMENTS).forEach(function (oldName)
  {
    const oldData = achievements[oldName];
    if (!oldData || !oldData.story) return;
    const newName = LEGACY_DUPLICATE_ACHIEVEMENTS[oldName][oldData.story];
    if (!newName) return;
    if (!achievements[newName]) achievements[newName] = Object.assign({}, oldData, {name:newName});
    delete achievements[oldName];
    changed = true;
  });

  if (changed) saveAchievements(achievements);
}

function getUnlockedAchievements(data)
{
  return Object.values(data)
    .filter(function (achievement)
    {
      return achievement &&
             achievement.unlocked === true &&
             typeof achievement.name === "string" &&
             achievement.name.trim() !== "";
    })
    .sort(function (a, b)
    {
      return (a.unlockedAt || "").localeCompare(b.unlockedAt || "");
    });
}

function buildAchievementSlots(data)
{
  const slots = ACHIEVEMENT_CATALOG.slice();

  getUnlockedAchievements(data).forEach(function (achievement)
  {
    if (!slots.includes(achievement.name)) slots.push(achievement.name);
  });
  return slots;
}

function createAchievementItem(index)
{
  const item = document.createElement("div");
  item.className = "achievement-item locked";
  item.dataset.achievementId = "achievement_" + String(index + 1).padStart(2, "0");
  const icon = document.createElement("span");
  icon.className = "achievement-icon";
  icon.textContent = "◆";
  const name = document.createElement("span");
  name.className = "achievement-name";
  name.textContent = "？？？";
  const state = document.createElement("span");
  state.className = "achievement-state";
  state.textContent = "未解锁";
  const tooltip = document.createElement("div");
  tooltip.className = "achievement-tooltip";
  tooltip.textContent = "该成就等待您探索。";
  item.appendChild(icon);
  item.appendChild(name);
  item.appendChild(state);
  item.appendChild(tooltip);
  return item;
}

function ensureAchievementRows(count)
{
  const list = document.getElementById("achievement-list");
  if (!list) return;
  while (list.children.length < count) list.appendChild(createAchievementItem(list.children.length));
}

function formatUnlockTime(value)
{
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("zh-CN", {hour12:false});
}

let currentFilter = "全部";

function renderAchievements()
{
  migrateLegacyAchievements();
  const data = loadAchievements();
  const slots = buildAchievementSlots(data);

  ensureAchievementRows(slots.length);

  const items = document.querySelectorAll(".achievement-item");
  const progress = document.getElementById("achievement-progress-value");
  let unlockedCount = 0;

  items.forEach(function (item, index)
  {
    const nameDom = item.querySelector(".achievement-name");
    const stateDom = item.querySelector(".achievement-state");
    const tooltipDom = item.querySelector(".achievement-tooltip");
    const achievementName = slots[index];
    const route = achievementName ? ((ACHIEVEMENT_DETAILS[achievementName] || {}).route || "") : "";
    const visible = currentFilter === "全部" || route === currentFilter;
    item.classList.toggle("filtered-out", !visible);
    const achievement = achievementName ? data[achievementName] : null;
    const unlocked = Boolean(achievement && achievement.unlocked === true);
    if (unlocked)
    {
      unlockedCount++;
      item.classList.remove("locked");
      item.classList.add("unlocked");
      nameDom.textContent = achievementName;
      stateDom.textContent = "已解锁";
      item.dataset.achievementName = achievementName;
      if (tooltipDom)
      {
        const unlockTime = formatUnlockTime(achievement.unlockedAt);
        tooltipDom.textContent = unlockTime ? "已解锁 · " + unlockTime : "该成就已永久解锁。";
      }
    }
    else
    {
      item.classList.remove("unlocked");
      item.classList.add("locked");
      nameDom.textContent = "？？？";
      stateDom.textContent = "未解锁";
      delete item.dataset.achievementName;
      if (tooltipDom) tooltipDom.textContent = "该成就等待您探索。";
    }
  });

  if (progress) progress.textContent = unlockedCount + " / " + slots.length;
}

function openAchievementDetail(name)
{
  const data = loadAchievements();
  const achievement = data[name];
  if (!achievement || achievement.unlocked !== true) { openLockedDetail(); return; }
  const detail = ACHIEVEMENT_DETAILS[name] || {};

  const routeDom = document.getElementById("achievementDetailRoute");
  const imageDom = document.getElementById("achievementDetailImage");

  routeDom.hidden = false;
  routeDom.textContent = detail.route || "成就";
  document.getElementById("achievementDetailName").textContent = name;
  document.getElementById("achievementDetailDesc").textContent = detail.desc || "暂无描述。";

  imageDom.textContent = "";
  if (detail.image)
  {
    const img = document.createElement("img");
    img.src = detail.image;
    img.alt = name;
    imageDom.appendChild(img);
  }
  else imageDom.textContent = "暂无图片";

  const time = formatUnlockTime(achievement.unlockedAt);
  document.getElementById("achievementDetailTime").textContent = time ? "首次获得 · " + time : "首次获得 · 时间未知";

  document.getElementById("achievementDetailOverlay").hidden = false;
}

function openLockedDetail()
{
  document.getElementById("achievementDetailImage").textContent = "？";
  document.getElementById("achievementDetailRoute").hidden = true;
  document.getElementById("achievementDetailName").textContent = "？？？";
  document.getElementById("achievementDetailDesc").textContent = "该成就尚未解锁，等待您探索。";
  document.getElementById("achievementDetailTime").textContent = "尚未解锁";
  document.getElementById("achievementDetailOverlay").hidden = false;
}

function closeAchievementDetail()
{
  document.getElementById("achievementDetailOverlay").hidden = true;
}

document.addEventListener("DOMContentLoaded", function ()
{
  renderAchievements();

  const list = document.getElementById("achievement-list");
  const overlay = document.getElementById("achievementDetailOverlay");
  const closeBtn = document.getElementById("achievementDetailClose");

  if (list)
  {
    list.addEventListener("click", function (event)
    {
      const item = event.target.closest(".achievement-item");
      if (!item) return;
      if (item.dataset.achievementName) openAchievementDetail(item.dataset.achievementName);
      else openLockedDetail();
    });
  }

  if (overlay && closeBtn)
  {
    closeBtn.addEventListener("click", closeAchievementDetail);
    overlay.addEventListener("click", function (event)
    {
      if (event.target === overlay) closeAchievementDetail();
    });
  }

  const filterBar = document.getElementById("achievementFilter");
  if (filterBar)
  {
    filterBar.addEventListener("click", function (event)
    {
      const btn = event.target.closest(".achievement-filter-btn");
      if (!btn) return;
      currentFilter = btn.dataset.route || "全部";
      filterBar.querySelectorAll(".achievement-filter-btn").forEach(function (b)
      {
        b.classList.toggle("active", b === btn);
      });
      renderAchievements();
    });
  }

  document.addEventListener("keydown", function (event)
  {
    if (event.key === "Escape" && overlay && !overlay.hidden) closeAchievementDetail();
  });
});

window.addEventListener("storage", function (event)
{
  if (event.key === achievementStorageKey()) renderAchievements();
});

function goBack()
{
  if (document.referrer) { setTimeout(function () { history.back(); }, 150); }
  else clickNav("mainmenu.html");
}