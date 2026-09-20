const hint = document.getElementById("hint");
const textDom = document.getElementById("textDom");
const choiceDom = document.getElementById("choiceDom");
const silhouetteDom = document.getElementById("silhouetteDom");
const exitGameButton = document.getElementById("exit-game-button");
const settingsOverlay = document.getElementById("settingsOverlay");
const settingsContinue = document.getElementById("settingsContinue");
const settingsSaveExit = document.getElementById("settingsSaveExit");
const settingsRestart = document.getElementById("settingsRestart");
const bgmVolume = document.getElementById("bgmVolume");
const sfxVolume = document.getElementById("sfxVolume");
let settingsOpen = false;
function openSettings()
{
  settingsOpen = true;
  settingsOverlay.hidden = false;
  BGM.pause();
}
function closeSettings()
{
  settingsOpen = false;
  settingsOverlay.hidden = true;
  BGM.resume();
}
const affectionValue = document.getElementById("affection-value");
const affectionTip = document.getElementById("affection-tip");
const mapMini = document.getElementById("mapMini");
const mapTip = document.getElementById("mapTip");

const bagMini = document.getElementById("bagMini");
const inventoryPanel = document.getElementById("inventoryPanel");
const inventoryClose = document.getElementById("inventoryClose");
const inventoryContent = document.getElementById("inventoryContent");
const itemDetail = document.getElementById("itemDetail");
const itemDetailName = document.getElementById("itemDetailName");
const itemDetailDesc = document.getElementById("itemDetailDesc");
const itemDetailCount = document.getElementById("itemDetailCount");

const storyBg = document.getElementById("storyBg");

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");
const from = params.get("from");
const cnt = Number(params.get("cnt") || 1);
let time = Number(params.get("time") || 0);

const iswin3 = params.get("iswin3");
const iswin2 = params.get("iswin2");
const resultParam = params.get("result");
const battleResultParam = params.get("battleResult");
const minigameResultParam = params.get("minigameResult") || params.get("checkResult");
const feather = params.get("feather");
const hpParam = params.get("hp");
const game4Result = params.get("game4Result");

const save = loadGame();
const gender = getCurrentGender();
const playerImg = gender === "male" ? "../images/malelead.png" : "../images/femalelead.png";

/*立绘*/
const Elarria = "../images/Elarria.png";
const ForestQueen = "../images/Queen.png";
const ForestPatrol = "../images/Patrol.png";
const Grim = "../images/Grim.png";
const Edmund = "../images/Edmund.png";
const Sorwin = "../images/Sorwin.png";
const Celine = "../images/Celine.png";
const Aldric = "../images/Aldric.png";

/*背景*/
const FALLBACK_BG = "../images/bg_forest.jpg";
const sceneBackgrounds =
{
  entrance: "../images/forestbg/forestbg1.jpg",
  deepForest: "../images/forestbg/forestbg2.jpg",
  queen: "../images/forestbg/forestbg3.jpg",
  roots: "../images/forestbg/forestbg4.jpg",
  ancientTree: "../images/forestbg/forestbg5.jpg",
  crack: "../images/forestbg/forestbg6.jpg",
  gate: "../images/forestbg/forestbg7.jpg",
  temple: "../images/forestbg/forestbg8.jpg",
  core: "../images/forestbg/forestbg9.jpg",
  ending: "../images/forestbg/forestbg2.jpg",

  // —— 自由行动地点背景（待填路径）——
  sky_yun: "../images/free/yun.jpg",
  sky_feng: "../images/free/feng.jpg",
  sky_shi: "../images/free/shi.jpg",
  sky_yu: "../images/free/yu.jpg",
  sky_trial: "../images/free/shen.jpg",
  emp_fu: "../images/free/fu.jpg",
  emp_wu: "../images/free/wu.jpg",
  emp_lao: "../images/free/lao.jpg",
  emp_hei: "../images/free/hei.jpg",
  emp_steam: "../images/free/zheng.jpg",
  under_hui: "../images/free/hui.jpg",
  under_kuang: "../images/free/kuang.jpg",
  under_tong: "../images/free/tong.jpg",
  under_jiu: "../images/free/jiu.jpg",
  under_di: "../images/free/dijingjishi.jpg",
  under_shen: "../images/free/liexi.jpg",
  under_hu: "../images/free/hu.jpg",
  forest_de: "../images/free/de.jpg",
  forest_chen: "../images/free/chen.jpg",
  forest_gen: "../images/free/gu.jpg",
  forest_sheng: "../images/free/sheng.jpg",
  forest_dong: "../images/free/dong.jpg",
  forest_zhao: "../images/free/zhao.jpg",
  ruins: "../images/free/fei.jpg"
};

/*小游戏*/
const FOREST_GAME_URLS =
{
  patrol: "game3.html?mode=forest",
  cultivate: "game6.html?mode=forest",
  rootSeal: "game7.html?mode=forest",
  mossSeal: "game7.html?mode=forest&task=moss",
  final: "game3.html?mode=forest"
};

const nodeBackgrounds = {
  "start": "entrance",
  "chapter1_map": "entrance",
  "chapter1_resist": "entrance",
  "chapter1_resist_success": "entrance",
  "chapter1_resist_fail": "entrance",
  "chapter1_identity": "entrance",
  "chapter1_silent": "entrance",
  "chapter1_queen": "queen",
  "chapter1_thanks": "roots",
  "chapter1_question": "roots",
  "chapter1_taunt": "roots",
  "chapter1_listen": "roots",
  "chapter1_night": "roots",
  "freedom1": "deepForest",
  "chapter2_start": "deepForest",
  "chapter2_path_left": "deepForest",
  "chapter2_path_right": "deepForest",
  "chapter2_path_listen": "deepForest",
  "chapter2_ancient_tree": "ancientTree",
  "chapter2_accept_blood": "ancientTree",
  "chapter2_cultivate_full": "ancientTree",
  "chapter2_cultivate_partial": "ancientTree",
  "chapter2_refuse_blood": "ancientTree",
  "chapter2_ask_blood": "ancientTree",
  "chapter2_refuse_after_ask": "ancientTree",
  "chapter2_night": "ancientTree",
  "chapter2_go_down": "crack",
  "chapter2_root_full": "crack",
  "chapter2_root_partial": "crack",
  "chapter2_stay_above": "crack",
  "chapter2_question_safety": "crack",
  "chapter2_moss": "crack",
  "freedom2": "deepForest",
  "chapter3_start": "gate",
  "chapter3_enter": "gate",
  "chapter3_hesitate": "gate",
  "chapter3_refuse": "gate",
  "chapter3_evening": "ancientTree",
  "chapter3_oath_high": "ancientTree",
  "chapter3_oath_mid": "ancientTree",
  "chapter3_oath_low": "ancientTree",
  "chapter3_descent_high": "gate",
  "chapter3_descent_mid": "gate",
  "chapter3_descent_low": "gate",
  "chapter3_outside": "temple",
  "chapter3_queen_wait": "temple",
  "chapter3_queen_guardian": "temple",
  "chapter3_queen_silent": "temple",
  "chapter3_end": "ancientTree",
  "freedom3": "deepForest",
  "chapter4_start": "crack",
  "chapter4_ask": "crack",
  "chapter4_treat": "crack",
  "chapter4_touch": "crack",
  "chapter4_seal": "gate",
  "chapter4_queen_wait": "temple",
  "chapter4_queen_choice": "temple",
  "chapter4_queen_silent": "temple",
  "chapter4_father": "roots",
  "chapter4_father_why": "roots",
  "chapter4_father_plan": "roots",
  "chapter4_father_silent": "roots",
  "chapter4_final_prep": "roots",
  "chapter4_believe": "roots",
  "chapter4_go_together": "roots",
  "chapter4_silent_support": "roots",
  "chapter4_final_choice": "core",
  "final_elarria": "core",
  "final_self": "core",
  "final_destroy": "core",
  "final_destroy_success": "core",
  "final_destroy_fail": "core",
  "ending_root_prisoner": "ending",
  "ending_root_vow": "ending",
  "ending_green_peace": "ending",
  "ending_after_roots": "ending",
  "ending_dawn": "ending",
  "ending_four_clans": "ending",
  "ending_hero": "ending",
  "ending_unchanged": "ending",

  "loc_sky_yun": "sky_yun",
  "loc_sky_feng": "sky_feng",
  "loc_sky_shi": "sky_shi",
  "loc_sky_yu": "sky_yu",
  "loc_sky_trial": "sky_trial",
  "loc_emp_fu": "emp_fu",
  "loc_emp_wu": "emp_wu",
  "loc_emp_lao": "emp_lao",
  "loc_emp_hei": "emp_hei",
  "loc_emp_steam": "emp_steam",
  "loc_under_hui": "under_hui",
  "loc_under_kuang": "under_kuang",
  "loc_under_tong": "under_tong",
  "loc_under_jiu": "under_jiu",
  "loc_under_di": "under_di",
  "loc_under_shen": "under_shen",
  "loc_under_hu": "under_hu",
  "loc_forest_de": "forest_de",
  "loc_forest_chen": "forest_chen",
  "loc_forest_gen": "forest_gen",
  "loc_forest_sheng": "forest_sheng",
  "loc_forest_dong": "forest_dong",
  "loc_forest_zhao": "forest_zhao",
  "loc_ruins": "ruins"
};

let currentBackground = "";
let endingBg = "";       // 结局 CG 背景（持续到该结局节点结束）
let endingBgNode = "";   // CG 所属的结局节点

function updateBackground()
{
  if (endingBg && endingBgNode === currentNode) return;
  endingBg = "";
  endingBgNode = "";
  const scene = nodeBackgrounds[currentNode];
  if (!scene) return;

  const bg = sceneBackgrounds[scene];
  if (!bg || bg === currentBackground) return;

  storyBg.style.backgroundImage = `url("${bg}"), url("${FALLBACK_BG}")`;
  currentBackground = bg;
}

function getCharacterImage(item)
{
  if (item.role === "player") return playerImg;

  const speaker = item.speaker || "";

  if (speaker.includes("艾拉瑞亚")) return Elarria;
  if (speaker.includes("精灵女王")) return ForestQueen;
  if (speaker.includes("精灵巡逻者")) return ForestPatrol;
  if (speaker.includes("艾德蒙")) return Edmund;
  if (speaker.includes("索尔温")) return Sorwin;
  if (speaker.includes("赛琳") || speaker.includes("塞琳")) return Celine;
  if (speaker.includes("奥德里克")) return Aldric;
  if (speaker.includes("格里姆")) return Grim;

  return "";
}

let istyping = false;
let timer = null;
let currentElement = null;
let currentText = "";
let cannext = true;
let mapClickable = false;

mapMini.style.display = "block";

/*打字机*/
function typeText(element, text, speed)
{
  istyping = true;
  cannext = false;
  element.textContent = "";

  let i = 0;
  currentElement = element;
  currentText = text;

  timer = setInterval(function ()
  {
    element.textContent += text[i];
    i++;

    if (i >= text.length)
    {
      clearInterval(timer);
      timer = null;
      istyping = false;

      setTimeout(function ()
      {
        cannext = true;
      }, 300);
    }
  }, speed);
}

/*路线状态*/
const currentUser = getCurrentUser();
const forestFlagKey = "feather_erosion_forest_flags_" + (currentUser || "guest");
const flagStorage = currentUser ? localStorage : sessionStorage;

function loadForestFlags()
{
  const raw = flagStorage.getItem(forestFlagKey);
  if (!raw) return {};

  try
  {
    return JSON.parse(raw);
  }
  catch (error)
  {
    console.error(error);
    return {};
  }
}

function saveForestFlags()
{
  flagStorage.setItem(forestFlagKey, JSON.stringify(forestFlags));
}

function resetForestFlags()
{
  flagStorage.removeItem(forestFlagKey);
}

let forestFlags = loadForestFlags();

/*成就*/
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

const LEGACY_DUPLICATE_ACHIEVEMENTS = {
  "羽蚀共生": {
    "sky": "羽蚀共生·天空之城",
    "empire": "羽蚀共生·帝国城邦"
  },
  "永恒囚徒": {
    "sky": "永恒囚徒·天空之城",
    "empire": "永恒囚徒·帝国城邦"
  },
  "拂晓的消散": {
    "sky": "拂晓的消散·天空之城",
    "empire": "拂晓的消散·帝国城邦",
    "forest": "拂晓的消散·精灵之森"
  },
  "父与子": {
    "sky": "父与子·天空之城",
    "empire": "父与子·帝国城邦"
  },
  "四族盟约": {
    "sky": "四族盟约·天空之城",
    "empire": "四族盟约·帝国城邦",
    "forest": "四族盟约·精灵之森"
  },
  "无名英雄": {
    "sky": "无名英雄·天空之城",
    "empire": "无名英雄·帝国城邦",
    "forest": "无名英雄·精灵之森"
  },
  "未变之局": {
    "sky": "未变之局·天空之城",
    "empire": "未变之局·帝国城邦",
    "forest": "未变之局·精灵之森"
  }
};

function loadAchievements()
{
  const raw = achievementStore().getItem(achievementStorageKey());
  if (!raw) return {};

  try
  {
    const data = JSON.parse(raw);
    return data && typeof data === "object" && !Array.isArray(data)
      ? data
      : {};
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

    if (!achievements[newName])
    {
      achievements[newName] = Object.assign({}, oldData, {name:newName});
    }

    delete achievements[oldName];
    changed = true;
  });

  if (changed) saveAchievements(achievements);
}

function unlockAchievement(name)
{
  if (!name) return false;

  const achievements = loadAchievements();

  if (achievements[name]) return false;

  achievements[name] =
  {
    name:name,
    story:"forest",
    unlocked:true,
    unlockedAt:new Date().toISOString()
  };

  saveAchievements(achievements);
  console.log("成就解锁：" + name);
  return true;
}

function hasAchievement(name)
{
  return Boolean(loadAchievements()[name]);
}

function unlockAchievementsFromText(text)
{
  if (!text) return text;

  // 匹配「获得成就/成就解锁/解锁成就【xx】」，连同前导换行与尾随句号一并从正文剥离
  const pattern = /\n?(?:获得成就|成就解锁|解锁成就)\s*[：:]?\s*【([^】]+)】[。.]?/g;

  return text.replace(pattern, function (full, name)
  {
    const key = name.trim();
    if (unlockAchievement(key)) showAchievementToast(key);
    return "";
  });
}

migrateLegacyAchievements();

/*背包*/
const ITEM_DATA =
{
  elfFragment:
  {
    name: "精灵古语残片",
    desc: "关键道具：可解读森林中部分古老铭文。",
    image: "../images/forestthings/guyusuipian.png"
  },

  basicPotion:
  {
    name: "基础治疗药剂",
    desc: "消耗品：回复 10 点生命值。",
    image: "../images/zhiliaoyaoji.png"
  },

  purifiedMoss:
  {
    name: "净化苔藓",
    desc: "材料：抵挡一次攻击。",
    image: "../images/forestthings/jinghuataixian.png"
  },

  halfPurifiedMoss:
  {
    name: "半净化的苔藓",
    desc: "材料：伤害减免。",
    image: "../images/forestthings/banjinghuataixian.png"
  },

  memoryFragment:
  {
    name: "记忆碎片",
    desc: "残存的记忆碎片，可在各处兑换物品与情报。",
    image: "../images/jiyisuipian.jpg"
  },

  windCrystal:   { name: "风晶碎片",     desc: "蕴含风脉之力的晶石碎片。", image: "" },
  stormShield:   { name: "风暴护盾",     desc: "能抵挡一次风暴伤害的护盾。", image: "" },
  mechWing:      { name: "机械羽翼",     desc: "装备：追风者容错 +1。", image: "" },
  runeFragment:  { name: "符文碎片",     desc: "蕴含符文之力的碎片，锻造材料。", image: "" },
  rareOre:       { name: "稀有矿石",     desc: "稀有的符文矿石，锻造材料。", image: "" },
  purifier:      { name: "污染净化器",   desc: "消耗品：抵挡一次攻击。", image: "" },
  brokenRune:    { name: "破符水",       desc: "能破除符文锁的药剂。", image: "" },
  imperfectRune: { name: "不完美的破符水", desc: "效果不稳定，但勉强能用的破符水。", image: "" },
  liquor:        { name: "烈酒",         desc: "消耗品：解除负面状态，回复 5 点生命值。", image: "" },
  crystalFragment: { name: "晶骸残片",   desc: "晶化生物骸骨的残片。", image: "" },
  lowPurityCrystal: { name: "污染结晶（低纯度）", desc: "低纯度的污染结晶。", image: "" },
  highPurityCrystal: { name: "污染结晶（高纯度）", desc: "高纯度的污染结晶。", image: "" },
  pureCrystal:   { name: "纯净污染结晶", desc: "已经净化提纯的结晶。", image: "" },
  runePack:      { name: "符文治疗包",   desc: "消耗品：回复 25 点生命值。", image: "" },
  decoderRune:   { name: "解码符文",     desc: "用于破解加密信息的符文。", image: "" },
  oldFeather:    { name: "旧羽管",       desc: "一根陈旧的羽管笔。", image: "" },
  fakeIntel:     { name: "假情报",       desc: "可以散布出去的假情报。", image: "" },
  antiPotion:    { name: "抗污药剂",     desc: "消耗品：3 回合内受到的伤害减半。", image: "" },
  antiAmulet:    { name: "抗污护符",     desc: "装备：污染环境中生命值不再持续流失。", image: "" },
  alchemyBomb:   { name: "炼金炸弹",     desc: "消耗品：对全体敌人造成高额伤害。", image: "" },
  goblinDoll:    { name: "歪耳朵的地精布偶", desc: "一只耳朵歪掉的地精布偶（仿制品）。", image: "" },
  cleanMoss:     { name: "净化苔藓",     desc: "材料：抵挡一次攻击。", image: "../images/forestthings/jinghuataixian.png" },
  halfMoss:      { name: "半净化的苔藓", desc: "材料：伤害减免。", image: "../images/forestthings/banjinghuataixian.png" },
  wildMoss:      { name: "野生苔藓",     desc: "从古树根系采集的野生苔藓。", image: "" },
  mechDesign:    { name: "机械义翼设计图", desc: "天空之城机械羽翼的制造图纸。", image: "" }
};

function memoryFragments()
{
  return forestFlags.memoryFragments ?? 15;
}

function initInventory()
{
  if (!forestFlags.inventory)
  {
    forestFlags.inventory = {};
    saveForestFlags();
  }
}

function addItem(id, count = 1)
{
  initInventory();

  if (!forestFlags.inventory[id]) forestFlags.inventory[id] = 0;
  forestFlags.inventory[id] += count;

  saveForestFlags();
  renderInventory();
}

function removeItem(id, count = 1)
{
  initInventory();

  if (!forestFlags.inventory[id]) return;

  forestFlags.inventory[id] -= count;

  if (forestFlags.inventory[id] <= 0)
  {
    delete forestFlags.inventory[id];
  }

  saveForestFlags();
  renderInventory();
}

function renderInventoryItem(id, count)
{
  const data = ITEM_DATA[id];
  if (!data) return;

  const item = document.createElement("div");
  item.className = "inventory-item";

  const icon = document.createElement("div");
  icon.className = "inventory-item-icon";

  if (data.image)
  {
    const img = document.createElement("img");
    img.src = data.image;
    img.alt = data.name;
    icon.appendChild(img);
  }
  else
  {
    icon.textContent = data.name[0];
  }

  const name = document.createElement("div");
  name.className = "inventory-item-name";
  name.textContent = data.name;

  item.appendChild(icon);
  item.appendChild(name);

  if (count > 1 || id === "memoryFragment")
  {
    const num = document.createElement("div");
    num.className = "inventory-item-count";
    num.textContent = "×" + count;
    item.appendChild(num);
  }

  item.addEventListener("mouseenter", function ()
  {
    itemDetailName.textContent = data.name;
    itemDetailDesc.textContent = data.desc;
    itemDetailCount.textContent = (count > 1 || id === "memoryFragment") ? "持有数量：" + count : "";

    const rect = item.getBoundingClientRect();
    itemDetail.style.left = (rect.right + 10) + "px";
    itemDetail.style.top = rect.top + "px";
    itemDetail.classList.add("show");
  });

  item.addEventListener("mouseleave", function ()
  {
    itemDetail.classList.remove("show");
  });

  inventoryContent.appendChild(item);
}

function renderInventory()
{
  initInventory();
  inventoryContent.innerHTML = "";

  const inventory = forestFlags.inventory;
  const ids = Object.keys(inventory).filter(function (id)
  {
    return inventory[id] > 0 && ITEM_DATA[id];
  });

  const fragments = memoryFragments();

  if (ids.length === 0 && fragments <= 0)
  {
    const empty = document.createElement("div");
    empty.className = "inventory-empty";
    empty.textContent = "行囊里什么也没有。";
    inventoryContent.appendChild(empty);
    return;
  }

  renderInventoryItem("memoryFragment", fragments);
  ids.forEach(function (id)
  {
    renderInventoryItem(id, inventory[id]);
  });
}

/*状态*/
const STATUS_INFO =
{

};

/*情报*/
const INTEL_INFO =
{
  "森林的哀鸣": "艾拉瑞亚隐约察觉到你能听见某种她一直在听的声音。"
};

function initStatus()
{
  if (!forestFlags.statuses)
  {
    forestFlags.statuses = [];
    saveForestFlags();
  }
}

function addStatus(name)
{
  initStatus();
  if (!forestFlags.statuses.includes(name))
  {
    forestFlags.statuses.push(name);
    saveForestFlags();
  }
  renderStatus();
}

function removeStatus(name)
{
  initStatus();
  forestFlags.statuses = forestFlags.statuses.filter(function (status)
  {
    return status !== name;
  });
  saveForestFlags();
  renderStatus();
}

function renderStatus()
{
  const statusList = document.getElementById("status-list");
  if (!statusList) return;
  initStatus();
  statusList.innerHTML = "";
  forestFlags.statuses.forEach(function (status)
  {
    const div = document.createElement("div");
    div.className = "status-item";
    const name = document.createElement("div");
    name.className = "status-name";
    name.textContent = status;
    const tip = document.createElement("div");
    tip.className = "status-tip";
    tip.textContent = STATUS_INFO[status] || "暂无详细说明";
    div.appendChild(name);
    div.appendChild(tip);
    statusList.appendChild(div);
  });
}

/*情报*/
function initIntel()
{
  if (!forestFlags.intels)
  {
    forestFlags.intels = [];
    saveForestFlags();
  }
}

function addIntel(name)
{
  initIntel();
  if (!forestFlags.intels.includes(name))
  {
    forestFlags.intels.push(name);
    saveForestFlags();
  }
  renderIntel();
}

function removeIntel(name)
{
  initIntel();
  forestFlags.intels = forestFlags.intels.filter(function (intel)
  {
    return intel !== name;
  });
  saveForestFlags();
  renderIntel();
}

function renderIntel()
{
  const intelList = document.getElementById("intel-list");
  if (!intelList) return;
  initIntel();
  intelList.innerHTML = "";
  forestFlags.intels.forEach(function (intel)
  {
    const div = document.createElement("div");
    div.className = "status-item";
    const name = document.createElement("div");
    name.className = "status-name";
    name.textContent = intel;
    const tip = document.createElement("div");
    tip.className = "status-tip";
    tip.textContent = INTEL_INFO[intel] || "暂无详细说明";
    div.appendChild(name);
    div.appendChild(tip);
    intelList.appendChild(div);
  });
}

/*新游戏时重置路线状态*/
const navigationEntry = performance.getEntriesByType("navigation")[0];
const navigationType = navigationEntry ? navigationEntry.type : "navigate";

const returningFromGame =
  iswin3 !== null ||
  iswin2 !== null ||
  resultParam !== null ||
  battleResultParam !== null ||
  minigameResultParam !== null ||
  game4Result !== null;

if (
  mode !== "continue" &&
  navigationType === "navigate" &&
  !from &&
  !returningFromGame
)
{
  resetForestFlags();
  forestFlags = {};
}

let haogandu = 5;

/*自由行动日：当前行动日、生命上限、生命值*/
let freedomDay = Number(forestFlags.freedomDay ?? 1);
if (!params.has("time")) time = Number(forestFlags.freedomTime ?? time ?? 0);
const MAX_HP = 100;
function currentHP() { return forestFlags.hp ?? MAX_HP; }

function updateHP()
{
  const hp = currentHP();
  const fill = document.getElementById("hp-fill");
  const value = document.getElementById("hp-value");
  if (fill) fill.style.width = (hp / MAX_HP * 100) + "%";
  if (value) value.textContent = hp + "/" + MAX_HP;
}

function applyAffection(delta)
{
  haogandu += Number(delta);

  if (typeof forestFlags.affectionCap === "number")
  {
    haogandu = Math.min(haogandu, forestFlags.affectionCap);
  }

  updateAffection();
}

function setAffection(value)
{
  haogandu = Number(value);

  if (typeof forestFlags.affectionCap === "number")
  {
    haogandu = Math.min(haogandu, forestFlags.affectionCap);
  }

  updateAffection();
}

function updateAffection()
{
  affectionValue.textContent = haogandu;
  affectionTip.textContent = "艾拉瑞亚好感度：" + haogandu;
}

/*三位同伴好感度，持久化保存在 forestFlags.otherAffection*/
const OTHER_AFFECTION_UI =
{
  sky: { name: "赛琳", suffix: "sky" },
  empire: { name: "奥德里克", suffix: "empire" },
  under: { name: "格里姆", suffix: "underground" }
};

let otherHaogandu =
{
  sky: 0,
  empire: 0,
  under: 0
};

function loadOtherAffection()
{
  const stored = forestFlags.otherAffection;
  if (!stored || typeof stored !== "object") return;
  Object.keys(OTHER_AFFECTION_UI).forEach(function (faction)
  {
    if (typeof stored[faction] === "number") otherHaogandu[faction] = stored[faction];
  });
}

function persistOtherAffection()
{
  forestFlags.otherAffection =
  {
    sky: otherHaogandu.sky,
    empire: otherHaogandu.empire,
    under: otherHaogandu.under
  };
  saveForestFlags();
}

function applyOtherAffection(faction, delta)
{
  if (!(faction in otherHaogandu)) return;
  otherHaogandu[faction] += Number(delta);
  persistOtherAffection();
  updateOtherAffection();
}

function setOtherAffection(faction, value)
{
  if (!(faction in otherHaogandu)) return;
  otherHaogandu[faction] = Number(value);
  persistOtherAffection();
  updateOtherAffection();
}

function applyCompanionAffection(delta)
{
  Object.keys(otherHaogandu).forEach(function (faction)
  {
    otherHaogandu[faction] += Number(delta);
  });
  persistOtherAffection();
  updateOtherAffection();
}

function updateOtherAffection()
{
  Object.keys(OTHER_AFFECTION_UI).forEach(function (faction)
  {
    const ui = OTHER_AFFECTION_UI[faction];
    const valueEl = document.getElementById("affection-" + ui.suffix + "-value");
    const tipEl = document.getElementById("affection-" + ui.suffix + "-tip");
    if (valueEl) valueEl.textContent = otherHaogandu[faction];
    if (tipEl) tipEl.textContent = ui.name + "好感度：" + otherHaogandu[faction];
  });
}

function isFourClansReady()
{
  return haogandu >= 40 && Object.keys(otherHaogandu).every(function (faction)
  {
    return otherHaogandu[faction] >= 40;
  });
}

function updateMapState()
{
  if (mapClickable)
  {
    mapMini.style.cursor = "pointer";
    mapMini.style.opacity = "1";
  }
  else
  {
    mapMini.style.cursor = "not-allowed";
    mapMini.style.opacity = "0.65";
  }
}

let currentNode = "start";
let pos = 0;

const nodes =
{
  "start":
  [
    {"type":"narrator","text":"商人递给你一个包裹：“精灵不相信外来者——尤其是带着工业气味的人。但你身上有另一种气味……森林会认出来的。”"},
    {"type":"narrator","text":"获得初始物品：破旧的行囊、商人的地图、记忆碎片、基础治疗药剂×2。\n获得【精灵古语残片】、情报【森林的哀鸣】。艾拉瑞亚初始好感 +5。"},
    {"type":"effect","addItems":{"elfFragment":1,"basicPotion":2},"addIntels":["森林的哀鸣"]},
    {"type":"title","chapter":"第一章","subtitle":"黑根之女"},
    {"type":"title","chapter":"第一幕","subtitle":"林间入口"},
    {"type":"narrator","text":"你按商人的地图向东走，污染痕迹渐少，林子却更静、更不对劲。树木茂密，树干覆着灰白霜状结晶，叶片翠绿，叶脉深处有极细黑纹流动。空气潮湿沉重，脚下泥土很软，像整片森林在缓慢下沉。阳光被树冠切碎，洒下绿光。没有鸟鸣虫声，只有风穿过枯枝，像远处翻动旧纸。"},
    {"type":"narrator","text":"你继续走，听到很轻很低的叹气声。你蹲下，老橡树根部裂开一道缝，黑色液体渗出，沿根脉流向深处。碰到泥土时发出极细微的金属摩擦声。你伸手靠近裂缝，指尖接近的瞬间，黑液停了一拍，缓缓退回深处。"},
    {"type":"narrator","text":"裂缝边缘有一片刻着古精灵语的树皮，快要风化，你收了起来。"},
    {"type":"effect","addItems":{"elfFragment":1}},
    {"type":"narrator","text":"你站起继续向前，没走几步，灌木丛分向两侧，几道银色影子从树冠落下，无声围住你。那是精灵，耳朵很长，皮肤很白，头发青绿，眼睛在阴影中泛金光。手臂上刻着与森林共鸣的绿色纹路，但有些地方已变灰白，像枯死的树枝。他们冷冷地审视你。"},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"无翼者。你踏入了不该踏足的地方。"},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"森林在死去，而你们，作为天空的弃物，总是带来更多死亡。"},
    {"type":"narrator","text":"他抬手，一道藤蔓从地面窜出，缠住你的脚踝。身后更多藤蔓破土，你被围住，没有退路。"},
    {
      "type":"choice",
      "options":
      [
        {"label":"出示【商人的地图】，表明自己只是旅行者。","next":"chapter1_map"},
        {"label":"试图反抗。","next":"chapter1_resist"},
        {"label":"坦白自己的身份：“我是从天空之城坠落的无翼者。”","next":"chapter1_identity"},
        {"label":"沉默，不反抗。","next":"chapter1_silent"}
      ]
    }
  ],
  "chapter1_map":
  [
    {"type":"narrator","text":"你掏出地图展开，羊皮纸边角卷曲，上面用看不懂的墨水画着四条线路，其中一条指向森林深处。"},
    {"type":"char","role":"player","speaker":"你","text":"我只是路过，并没有恶意。"},
    {"type":"narrator","text":"巡逻者接过地图看了很久，手指摩挲边缘，抬头看你。"},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"这地图……不是精灵画的。你从哪里得来的？"},
    {"type":"narrator","text":"你没有回答，他折起地图收进腰包。"},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"地图没收，但你还是要跟我们走。如果你说的是真的，女王自会判断。"},
    {"type":"narrator","text":"藤蔓未松，你被推着向前，脚步踉跄，但没受伤。"},
    {"type":"jump","goto":"chapter1_queen"}
  ],
  "chapter1_resist":
  [
    {"type":"narrator","text":"你猛蹲下身，抽出靴中短刀割断藤蔓。巡逻者愣了一瞬，你趁机向侧面冲去，但森林本身就是他们的武器。"},
    {"type":"battle","id":"forest_patrol","success":"chapter1_resist_success","fail":"chapter1_resist_fail","game":"patrol"}
  ],
  "chapter1_resist_success":
  [
    {"type":"narrator","text":"你击退最近两名巡逻者，但更多藤蔓涌来，手臂被划伤，最终还是被按倒。他们没杀你，但态度更冷。"},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"你比一般的无翼者麻烦。"},
    {"type":"narrator","text":"你被拽起，双手被藤蔓反绑，短刀被没收，手臂伤口渗血。"},
    {"type":"effect","affection":-10,"flags":{"patrolBattle":"win"}},
    {"type":"jump","goto":"chapter1_queen"}
  ],
  "chapter1_resist_fail":
  [
    {"type":"narrator","text":"你被藤蔓缠住手腕吊起，巡逻者用刀背敲你的后颈。你眼前一黑，最后听到："},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"不自量力。"},
    {"type":"narrator","text":"你醒来时被绑着躺在泥地上，巡逻者拖着你的衣领向前走，后脑勺隐隐作痛。"},
    {"type":"effect","affection":-5,"flags":{"patrolBattle":"fail"}},
    {"type":"jump","goto":"chapter1_queen"}
  ],
  "chapter1_identity":
  [
    {"type":"narrator","text":"你站直身体，没有反抗或求饶，看着巡逻者的眼睛说出来历。"},
    {"type":"char","role":"player","speaker":"你","text":"我是无翼者，被天空之城推了下来，落在这片大陆上。我不知道这里是什么地方，也没人告诉我不能进来。"},
    {"type":"narrator","text":"巡逻者沉默，身后几个精灵互相看了一眼。"},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"天空之城……那个靠献祭维持的虚伪之城。"},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"被推下来，说明你也是被抛弃的人。"},
    {"type":"narrator","text":"他收起藤蔓，但没放松警惕。"},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"跟我们走，女王会决定怎么处置你。别以为“被抛弃”就能让我们同情你，森林不欠任何人。"},
    {"type":"narrator","text":"你被带着向森林深处走去，左右各跟着一名巡逻者。"},
    {"type":"effect","affection":5,"flags":{"firstImpression":"被抛弃者"}},
    {"type":"jump","goto":"chapter1_queen"}
  ],
  "chapter1_silent":
  [
    {"type":"narrator","text":"你沉默地站着，任由藤蔓缠上手腕。巡逻者看了你一眼，没追问，把你转过去，推着向前走。"},
    {"type":"narrator","text":"身后有精灵低声说："},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"连话都不会说，天空之城养了些什么东西。"},
    {"type":"narrator","text":"你没回应，低头看着脚下的泥土，看黑色纹路在树根间蔓延。你忽然觉得，这片森林和自己有点像，都在沉默中被什么东西慢慢吞噬。"},
    {"type":"effect","affection":5,"flags":{"firstImpression":"很安静"}},
    {"type":"jump","goto":"chapter1_queen"}
  ],
  "chapter1_queen":
  [
    {"type":"title","chapter":"第二幕","subtitle":"女王与祭品"},
    {"type":"narrator","text":"你被押到一棵巨树前，树大到看不到顶端，像一座白色的山，根脉从地面隆起，向四面延伸，每一根都比你的身体还粗。树皮上刻满古老精灵铭文，许多地方已被黑色结晶覆盖，像伤口结的痂。"},
    {"type":"narrator","text":"树根间站着一个精灵，银白长发垂到脚踝，用枯死的藤蔓束着。她眼睛浅绿，瞳孔边缘泛着灰。她穿着亚麻长袍，脚踝和手腕缠着同样的枯藤，不像女王，更像从森林最深处走出来的人，带着泥土和根须的气味。"},
    {"type":"narrator","text":"巡逻者把你放下，藤蔓松开。你身体自由，但那种被审视的感觉让你觉得自己仍被捆着。"},
    {"type":"narrator","text":"银发精灵看了你很久，没说话，然后看向旁边——树根另一侧还站着一个人。"},
    {"type":"narrator","text":"她深绿近墨的长发，脸、脖颈和手臂上布满黑色纹路，像树根脉络，从皮肤下透出来，缓慢搏动。眼睛浅绿如宝石，站得很安静，像树的一部分。"},
    {"type":"narrator","text":"女王开口，声音很轻，整片森林都安静下来。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"艾拉瑞亚，这个无翼者从天空坠落，身上带着不属于任何森林的气息。他血里有种东西，和脚底的污染同源，但方向相反。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"交给你处置。你比任何人都清楚，森林需要什么。"},
    {"type":"narrator","text":"艾拉瑞亚没立刻回应，看着你，那只纯黑的眼睛里什么也读不出来。"},
    {"type":"narrator","text":"然后她说话，声音很低，带着沙哑，像枯叶被踩碎。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你身上……很吵。"},
    {"type":"narrator","text":"你没听懂，她也没解释，只向你走了一步，手腕上的黑色纹路靠近你时亮了一下，又暗下去。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"跟我走。"},
    {"type":"narrator","text":"女王没阻拦，巡逻者退到两侧。艾拉瑞亚转身走进树根间的缝隙，没回头看你会不会跟上。"},
    {"type":"narrator","text":"你犹豫了一瞬，又听到那个声音。这次从地底传来，很轻，很低，像在叫一个名字。你没听清，但确信它叫了两次。"},
    {"type":"narrator","text":"你跟上去了。"},
    {"type":"title","chapter":"第三幕","subtitle":"根脉之下"},
    {"type":"narrator","text":"你跟着艾拉瑞亚走了很久。她不快，但每一步很稳，像脚底和泥土之间有某种看不见的连接。你们穿过一片片枯死林区，树干灰色，枝丫光秃，树皮布满黑色裂纹，和你在风脉之心见过的纹路一样。"},
    {"type":"narrator","text":"她没说话，你也没有，但你能感觉到她一直在听着什么东西。她时不时停下，微微偏头，像在辨认一个很模糊的声音。"},
    {"type":"narrator","text":"终于，她在一棵倒塌的巨树前停下。树干裂成两半，露出被掏空的树心，里面积着一汪黑水，平静如镜，水面悬着一层极薄的绿色光雾——这是林间唯一还算“活着”的东西。"},
    {"type":"narrator","text":"艾拉瑞亚蹲下，把手伸进黑水。水面没有涟漪。她手腕上的黑色纹路在水下亮起，像黑暗中树根发出的微光。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你听到了吗。"},
    {"type":"narrator","text":"你仔细听去：风声、远处枯叶的摩擦、你的心跳。然后，从树根深处传来一个很低很低的声音，像有人在泥土下翻了个身。"},
    {"type":"narrator","text":"你听到了。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"这是森林在说话。它一直在说，但大多数精灵听不见——他们只听女王告诉他们的。只有我们，只有像我这样的……"},
    {"type":"narrator","text":"她低头看自己的手，黑色纹路在皮肤下搏动。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"只有被污染的人，才听得见。"},
    {"type":"narrator","text":"她站起，转身面对你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"女王让我处置你，她希望我杀了你，把你的血浇在树根上，看能不能暂时压住污染。"},
    {"type":"narrator","text":"她停顿了一下。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"但我不想杀你。"},
    {
      "type":"choice",
      "options":
      [
        {"label":"“谢谢你没有杀我。”","next":"chapter1_thanks"},
        {"label":"“你为什么不杀我？你想从我这里得到什么？”","next":"chapter1_question"},
        {"label":"“你连自己都救不了，还想杀我？”","next":"chapter1_taunt"},
        {"label":"沉默，把手放在树根上，感受森林的声音。","next":"chapter1_listen"}
      ]
    }
  ],
  "chapter1_thanks":
  [
    {"type":"narrator","text":"你直接道谢，没有多余修饰。"},
    {"type":"narrator","text":"艾拉瑞亚看着你，表情未变，但手腕上的黑色纹路微微松弛，搏动变慢，像绷紧的弦被轻轻拨了一下。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"谢我？"},
    {"type":"narrator","text":"她低下头，声音里有一丝你听不懂的东西。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我见过很多精灵，也见过人类……没有人会对我说谢谢。他们要么怕我，要么厌恶我，要么想利用我，有的刚见到我就跑了。你是第一个对我道谢的人。"},
    {"type":"narrator","text":"她抬头看你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"别急着谢我，我还没决定要不要杀你，只是现在不杀。"},
    {"type":"effect","affection":15},
    {"type":"jump","goto":"chapter1_night"}
  ],
  "chapter1_question":
  [
    {"type":"narrator","text":"你没有接受她的“善意”，而是直接问她目的。在这里，没有人会无缘无故放过一个祭品。"},
    {"type":"narrator","text":"艾拉瑞亚沉默片刻，收回手，黑色纹路在手腕上跳了一下。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你问得对，我确实想要一样东西。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你身上的抗性，和污染同源，但方向相反。如果我能从你的血里找到它，也许——"},
    {"type":"narrator","text":"她停下，沉思片刻，摇了摇头。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"不……也许那只是我骗自己的借口。"},
    {"type":"narrator","text":"她重新看向你，目光比刚才更坦率，也更疲惫。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我想知道，一个被族群抛弃的人，为什么还能活着。而我……算了，这没什么好说的。"},
    {"type":"effect","affection":8},
    {"type":"jump","goto":"chapter1_night"}
  ],
  "chapter1_taunt":
  [
    {"type":"narrator","text":"你笑了一声，带着一点嘲讽，也带着被逼到墙角后反咬的狠劲。"},
    {"type":"narrator","text":"艾拉瑞亚表情变了，手腕上的黑色纹路忽然剧烈搏动，像被刺激到了。黑水表面泛起一圈涟漪，又迅速平复。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"呵……你说得对。"},
    {"type":"narrator","text":"她的声音很轻，轻到近乎自语。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我确实救不了自己。我身体里的东西每天都在长，像树根一样往深处扎。也许过不了多久，我就会变成一棵站着的树。没有意识，没有名字，只是森林的一个病灶。"},
    {"type":"narrator","text":"她走近一步，近到你能看见她脸上黑色纹路在皮肤下缓缓流动。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"但你没有资格说这句话！你连翅膀都没有，连“飞翔”都不曾拥有过。你凭什么——"},
    {"type":"narrator","text":"她停住，呼吸很重。随后似乎意识到言重了，转过身去，背对着你。"},
    {"type":"narrator","text":"她不再说话，沉默往前走。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你若是真想死，就真在那站着别动。"},
    {"type":"narrator","text":"你迟疑一下，还是跟上了。"},
    {"type":"effect","affection":-10},
    {"type":"jump","goto":"chapter1_night"}
  ],
  "chapter1_listen":
  [
    {"type":"narrator","text":"你蹲下，把手掌贴在树根表面。树皮粗糙，带着微凉湿意。你闭上眼倾听。"},
    {"type":"narrator","text":"那个声音又响了，从地底深处传来，很慢，很沉，像巨大的心脏在泥土下跳动。每次跳动，你掌心的树皮都会微微震动。黑色纹路从树根表面蔓延过来，触到手指时忽然停住，像在辨认什么。"},
    {"type":"narrator","text":"艾拉瑞亚看着你的手，黑眼睛微微睁大。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"……它在碰你。"},
    {"type":"narrator","text":"她声音很轻，带着你从未见过的讶异。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我和它彼此倾听这么久，它从不碰我，只是在我身体里长。"},
    {"type":"narrator","text":"她蹲下与你平视。眼睛离得很近，你甚至能看到里面有一层极薄的、像树轮一样的光纹。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你到底是谁？"},
    {"type":"char","role":"player","speaker":"你","text":"我也不知道。"},
    {"type":"effect","affection":12,"flags":{"forestTouchedPlayer":true}},
    {"type":"jump","goto":"chapter1_night"}
  ],
  "chapter1_night":
  [
    {"type":"narrator","text":"夜色降临得很快，森林里没有日落，太阳像被树冠直接吞掉。光线变成深绿色昏暗，只有根脉深处那层绿色光雾还在微微发光。"},
    {"type":"narrator","text":"艾拉瑞亚坐在一条隆起的树根上，离你不远不近。"},
    {"type":"narrator","text":"你靠在另一条树根上，闭上眼，但睡不着。"},
    {"type":"narrator","text":"又听到了那个声音，从地底传来。很轻，很低，像在叫一个名字。"},
    {"type":"narrator","text":"你睁开眼，艾拉瑞亚正看着你。她的黑眼睛在黑暗中几乎看不见，只有琥珀色的那只映着一点绿光。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你也听到了。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"明天，我会去更深的地方。古树的根在枯死，我想去看看还有没有别的办法。你可以随便探索，但明天之后......"},
    {"type":"narrator","text":"她停顿了一下。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"明天之后，必须要回来。"},
    {"type":"narrator","text":"她站起来，走向根脉深处，身影很快被树影吞没。"},
    {"type":"narrator","text":"你独自坐在黑暗里，树根在身下微微震动，像某种巨大的东西正在泥土深处缓慢呼吸。"},
    {"type":"narrator","text":"你低头看手，指尖还残留着树皮的触感。翻过来，在微弱绿光下，掌心有一道极细、几乎看不见的黑色纹路。它在皮肤下缓缓搏动一下，然后消失了。"},
    {"type":"narrator","text":"你握紧拳头，又松开。"},
    {"type":"narrator","text":"你决定明天再想。"},
    {"type":"jump","goto":"freedom1"}
  ],
  "mainmap_1":
  [
    {"type":"freedomEnd","day":1,"next":"chapter2_start"}
  ],
  "freedom1":
  [
    {"type":"narrator","text":"【自由行动日 1】\n点击左上角小地图开启自由探索。"}
  ],
  "chapter2_start":
  [
    {"type":"title","chapter":"第二章","subtitle":"腐根之心"},
    {"type":"narrator","text":"清晨，你重新回到森林，这里没有真正的天亮，只是深绿色的昏暗稍微稀薄了一些。你回来时，艾拉瑞亚已经站在根脉边缘等你。她背对着你，黑色纹路在灰绿光线中像嵌在皮肤里的细线。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"走吧。"},
    {"type":"title","chapter":"第一幕","subtitle":"根脉深处"},
    {"type":"narrator","text":"越往深处走，森林就越不像森林。树干颜色从灰白变成深黑，树皮上的结晶从零星斑点变成大片覆盖层，踩上去发出玻璃碎裂的脆响。空气弥漫着甜腻的腐烂气味，像熟过头的果实被碾碎在泥土里。"},
    {"type":"narrator","text":"艾拉瑞亚走得比昨天慢，你注意到她右脚踝上的黑色纹路比昨天更密，已蔓延到小腿一半，像藤蔓缠绕着她。"},
    {"type":"narrator","text":"她没提，你也没问。"},
    {"type":"narrator","text":"走到一处岔路口，她忽然停下。前方有两条路：左边是被黑色结晶完全覆盖的窄道，路面光滑如冰；右边是枯死的灌木丛，枝干扭曲，但脚下泥土更结实。艾拉瑞亚偏过头，像在听什么。"},
    {"type":"narrator","text":"然后她转向左边。"},
    {"type":"choice","options":[{"label":"跟上她，走结晶窄道。","next":"chapter2_path_left"},{"label":"劝她走右边。","next":"chapter2_path_right"},{"label":"停下来，把手按在路边的树干上。","next":"chapter2_path_listen"}]}
  ],
  "chapter2_path_left":
  [
    {"type":"narrator","text":"你踩上那层黑色结晶。脚下很滑，不得不放慢速度。空气里甜腻的气味更浓，太阳穴开始隐隐发胀。艾拉瑞亚走在前面，脚步很稳，像走在平地上。"},
    {"type":"narrator","text":"走了一段后，你注意到结晶表面下有东西在动，是某种更慢的、有节奏的搏动。你低头看了一眼：结晶深处有无数细小的黑色纹路在缓缓流动，像血管，像树根。"},
    {"type":"narrator","text":"艾拉瑞亚回头看了你一眼。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"别盯着看，看久了会觉得自己也是它们的一部分。"},
    {"type":"narrator","text":"你没有再低头，但感到脚下的搏动和你的心跳是同一个频率。"},
    {"type":"effect","affection":5},
    {"type":"jump","goto":"chapter2_ancient_tree"}
  ],
  "chapter2_path_right":
  [
    {"type":"narrator","text":"你拉住了她的衣袖，她停下脚步，回头看你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"怎么？"},
    {"type":"char","role":"player","speaker":"你","text":"左边的路不对......我感觉到了。"},
    {"type":"narrator","text":"她没有立刻回答，而是看了看左边的窄道，又看了看右边的灌木丛。她把手从你手里抽出来，转身走向了右边。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你比我想的敏锐。"},
    {"type":"narrator","text":"右边的路确好走一些，但枯死的灌木丛不断刮着你的手臂和衣角。艾拉瑞亚走在前面，偶尔停下，用脚踢开挡路的枯枝。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"左边那条路，我走过。不过那是三年前了，那时候结晶没这么厚，但已经能让人看见一些不该看见的东西。"},
    {"type":"char","role":"player","speaker":"你","text":"你看到了什么？"},
    {"type":"narrator","text":"她沉默了一会儿。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我看到自己站在一棵树的里面，树皮从外面合上了。我在里面，怎么拍打也出不去。"},
    {"type":"narrator","text":"这似乎并不是什么好的体验。她没有再往下说，你也没有再问。"},
    {"type":"jump","goto":"chapter2_ancient_tree"}
  ],
  "chapter2_path_listen":
  [
    {"type":"narrator","text":"你走到路边，把手按在一棵黑色树干上。树皮冰凉，手感像金属。你闭上眼睛，仔细听。"},
    {"type":"narrator","text":"然后你感觉到了，两条路下面都有东西。左边的窄道下面是一条巨大的根脉，正在缓慢搏动，但那搏动很弱，断断续续，像一个快停的心脏。右边的灌木丛下面是一种完全不同的东西：黑暗的、静止的、像被冻住了。"},
    {"type":"char","role":"player","speaker":"你","text":"左边那条路的根脉在衰竭。右边虽然难走，但下面没有活的东西在挣扎。"},
    {"type":"narrator","text":"艾拉瑞亚看着你，表情没有变化，但你注意到她的瞳孔微缩了一下。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你能感觉到根脉？"},
    {"type":"narrator","text":"你点了点头，她走近一步，近到你能看见她脸上那些黑色纹路在皮肤下的流动轨迹。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"……走吧。"},
    {"type":"narrator","text":"她转身走向右边的灌木丛，你跟在后面，注意到她的脚步比之前更稳了，一次都没有回头。"},
    {"type":"effect","flags":{"canSenseRoots":true}},
    {"type":"jump","goto":"chapter2_ancient_tree"}
  ],
  "chapter2_ancient_tree":
  [
    {"type":"title","chapter":"第二幕","subtitle":"古树之心"},
    {"type":"narrator","text":"当你们穿过最后一片枯死的灌木丛时，你差点以为眼前的东西是一面墙。但它不是，它是一棵树。"},
    {"type":"narrator","text":"树干从地面隆起，像一座黑色的山丘，向上延伸到目力所及的极限。树皮是黑色的，表面布满深绿色的结晶。和别处不同，这里的结晶是活的，在微微发光，像某种正在腐烂的生物体。树根从地面爆裂开来，粗如水渠，向四面八方蔓延。但那些根是黑色的，干枯的，表面的纹路已停止了搏动。"},
    {"type":"narrator","text":"艾拉瑞亚停在树根前，仰起头，看着这棵巨大的、正在死去的古树。她脸上没有什么表情，但你注意到她手腕上的黑色纹路忽然亮了一下，又暗了下去。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"这是森林的心脏，所有根脉都从这里开始，也在这里结束。"},
    {"type":"narrator","text":"她走到一条粗大的树根前，蹲下来。树根的某个位置有一道裂口，从中渗出一滴一滴的黑色液体，砸在泥土上，发出极轻的、像金属撞击的声音。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"三年前，这里的裂口只有指甲盖那么大。现在......"},
    {"type":"narrator","text":"她没有继续说下去。\n她把手掌按在树根上，手掌下的黑色纹路疯狂搏动了一下，然后忽然平静下来。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我能感受到，它在叫我，每天都在叫我。"},
    {"type":"char","role":"player","speaker":"你","text":"叫你什么？"},
    {"type":"narrator","text":"她站起来，拍了拍手上的泥土。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"叫我去它里面。它说，如果我走进去，它就还能活一段时间。就像以前的“黑根者”一样——把自己种进去，用身体滋养它。"},
    {"type":"narrator","text":"她转过身看你，那只琥珀色的眼睛很平静。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我是最后一个黑根者。我进去，森林能多活几年。但治标不治本。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"除非我找到真正净化污染的方法。"},
    {"type":"narrator","text":"她走到一个被掏空的树洞前。树洞里铺着一层薄薄的绿色苔藓，是这片森林里最接近“健康”的东西。但苔藓边缘已开始发黑。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我养了三年。起初长势很好，能吸收周围的污染，转化成干净的养分。但后来——"},
    {"type":"narrator","text":"她用指尖碰了碰苔藓发黑的边缘。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"后来我的血接触到了它。苔藓开始变异，反向吸收污染。我体内的污染太浓，它扛不住。"},
    {"type":"narrator","text":"她转过身，目光落到你胸口，又移到你手臂上——你在第一章受过伤的地方。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你身上有抗性。和污染同源，但方向相反。如果我用你的血培育苔藓……"},
    {"type":"narrator","text":"她没有说完。"},
    {"type":"choice","options":[{"label":"接受。伸出手臂。","next":"chapter2_accept_blood"},{"label":"拒绝。把手收回来。","next":"chapter2_refuse_blood"},{"label":"询问：“如果我的血有用，你会怎么做？”","next":"chapter2_ask_blood"}]}
  ],
  "chapter2_accept_blood":
  [
    {"type":"narrator","text":"你卷起袖子，把手腕伸到她面前。她沉默很久，从腰间取出一枚骨针。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"会疼，而且你会虚弱，可以接受吗？"},
    {"type":"char","role":"player","speaker":"你","text":"没问题。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你的抗性越强，苔藓吸收越多，你失去的就越多。至少三天恢复不过来。"},
    {"type":"char","role":"player","speaker":"你","text":"我知道。"},
    {"type":"narrator","text":"她用骨针刺破你的指尖。一滴血落下。苔藓猛地收缩，绿色从血滴落处向外扩散，把黑色纹路推回去。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"污染在退。"},
    {"type":"narrator","text":"你的视野开始变暗，腿有点软，扶住旁边的树根。"},
    {"type":"minigame","id":"cultivate","success":"chapter2_cultivate_full","fail":"chapter2_cultivate_partial","game":"cultivate"}
  ],
  "chapter2_cultivate_full":
  [
    {"type":"narrator","text":"滴血培育三关全部完成，苔藓的绿色重新扩散。"},
    {"type":"effect","affection":20,"addItems":{"purifiedMoss":1},"flags":{"cultivateResult":"full"}},
    {"type":"jump","goto":"chapter2_night"}
  ],
  "chapter2_cultivate_partial":
  [
    {"type":"narrator","text":"滴血培育只完成了部分，苔藓仍保留了一部分净化能力。"},
    {"type":"effect","affection":20,"addItems":{"halfPurifiedMoss":1},"flags":{"cultivateResult":"partial"}},
    {"type":"jump","goto":"chapter2_night"}
  ],
  "chapter2_refuse_blood":
  [
    {"type":"narrator","text":"你放下袖子，摇了摇头。"},
    {"type":"char","role":"player","speaker":"你","text":"不行，我不知道我的血里有什么。如果它还带进别的东西呢？"},
    {"type":"narrator","text":"艾拉瑞亚看着你收回去的手，低下头。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你说得对，你不知道，我也不知道。"},
    {"type":"narrator","text":"她收起骨针，转过身去。她的背影看起来更瘦了。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"那就当我没提过。"},
    {"type":"narrator","text":"她蹲下来，把苔藓发黑的边缘轻轻摘掉。她的手指在发抖。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"反正我已经习惯一个人了。"},
    {"type":"effect","affection":-5,"flags":{"gaveBlood":false}},
    {"type":"jump","goto":"chapter2_night"}
  ],
  "chapter2_ask_blood":
  [
    {"type":"narrator","text":"你问她。"},
    {"type":"char","role":"player","speaker":"你","text":"如果我的血真能净化苔藓——你打算做什么？只救这一棵树，还是全部？"},
    {"type":"narrator","text":"艾拉瑞亚眼睛亮了一下。她站起来，走到古树前，把手按在树皮上。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"古树的根连着一整片森林。如果苔藓能净化污染，就能顺着根脉蔓延到所有角落。但这需要很多血。不止一次，不止你一个人。"},
    {"type":"narrator","text":"她转过身看你，神情很坦率，近乎冷酷。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"如果你给我血，我可能会一直用，用到你撑不住，或森林活过来。我不会停。"},
    {"type":"narrator","text":"她停顿一下。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你要想清楚，我不是跟你做交易，是在跟你借命。"},
    {"type":"narrator","text":"她的坦诚让你沉默。你看着濒死的古树、苔藓边缘蔓延的黑色、艾拉瑞亚手腕上越来越密的纹路，做了决定。"},
    {"type":"choice","options":[{"label":"接受，让她用你的血培育苔藓。","next":"chapter2_accept_blood","flags":{"gaveBlood":true}},{"label":"拒绝。","next":"chapter2_refuse_after_ask","flags":{"gaveBlood":false}}]}
  ],
  "chapter2_refuse_after_ask":
  [
    {"type":"narrator","text":"你放下袖子，摇了摇头。"},
    {"type":"char","role":"player","speaker":"你","text":"不行，我不知道我的血里有什么。如果它还带进别的东西呢？"},
    {"type":"narrator","text":"艾拉瑞亚看着你收回去的手，低下头。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你说得对，你不知道，我也不知道。"},
    {"type":"narrator","text":"她收起骨针，转过身去。她的背影看起来更瘦了。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"那就当我没提过。"},
    {"type":"narrator","text":"她蹲下来，把苔藓发黑的边缘轻轻摘掉。她的手指在发抖。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"反正我已经习惯一个人了。"},
    {"type":"effect","affection":-3},
    {"type":"jump","goto":"chapter2_night"}
  ],
  "chapter2_night":
  [
    {"type":"title","chapter":"第三幕","subtitle":"夜根"},
    {"type":"narrator","text":"天色渐暗，森林从深绿变墨绿，最后近乎黑色。只有古树上的结晶微微发光，弱得像将尽的炭。"},
    {"type":"narrator","text":"艾拉瑞亚在古树根部凹陷处休息。她呼吸比白天更重，每次吸气都带细微响声。你坐得不远，身体很沉，像泡在泥水里。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你知道女王为什么把我丢给你吗？"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"因为我应该是唯一不会杀你的人。之前大部分闯入者都是被我悄悄放走的。她不知道我杀不了被抛弃的人，因为我自己就是被抛弃的。"},
    {"type":"narrator","text":"她看着手腕上的黑色纹路在黑暗中微亮。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我五岁时，第一次在脚底看到黑色纹路。很淡，像墨水渗进皮肤。我告诉母亲，她把我关了三天，没送吃的。第四天她抱着我哭，说对不起，然后把我交给女王。"},
    {"type":"narrator","text":"她的声音很平，听不出情绪。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"女王说，黑根者是森林的守护者，因为我们能听见森林的声音，感知根脉流动。但没人告诉我，守护者的结局是变成一棵树。"},
    {"type":"narrator","text":"她转头看你。微弱绿光中，她的眼睛几乎看不见，只映着点绿光。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你被天空之城推下来时，是什么感觉？"},
    {"type":"narrator","text":"你没立刻回答，只看着她手腕上缓缓搏动的黑色纹路。"},
    {"type":"char","role":"player","speaker":"你","text":"不记得了......只记得风声很大，大过一切。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"风声......那也不错，至少不是沉默。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"小时候我常爬到最高的树顶，想听风的声音。但森林里的风很轻，轻得像有人在耳边呼吸。所以我一直想，如果跳下去，风会不会更大声。"},
    {"type":"narrator","text":"她的声音也很轻。夜色更深，古树裂纹发出极细微、像冰层开裂的声响。你们不知道明天或森林会怎样，但今夜还能说些会被风带走的闲话。"},
    {"type":"effect","affection":5},
    {"type":"title","chapter":"第四幕","subtitle":"裂痕"},
    {"type":"narrator","text":"深夜，你被低沉震动惊醒。地面轻而有规律地抖，像巨大之物在泥土下翻身。"},
    {"type":"narrator","text":"你睁眼时，艾拉瑞亚已醒。她站在古树前，仰头看着发光的绿色结晶。震动中，结晶出现新裂纹，细如发丝，却迅速蔓延。"},
    {"type":"narrator","text":"她手按树干，手腕上的黑色纹路剧烈搏动，与裂纹节奏同步。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"它醒了。"},
    {"type":"char","role":"player","speaker":"你","text":"什么醒了？"},
    {"type":"narrator","text":"她没回答，转头看你，脸上是惊人的恐惧。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"古树的根在往地底缩，把自己从污染源旁拉开。根都缩走，森林会失去支撑。树会倒，山会塌，长在根脉上的东西都会掉进地底。"},
    {"type":"narrator","text":"她深吸一口气。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我得下去。"},
    {"type":"narrator","text":"她走到树根间的裂缝前。裂缝很深，看不到底，只有深处透出黑色光雾。她蹲下，把手伸进去试了试风向。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"下面的根脉正在断裂，如果能把苔藓送到断裂处，也许能暂时粘住。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我要下去。下面很危险，如果根脉断了，你会掉下去，我不会也拉不住你。"},
    {"type":"narrator","text":"你看着裂缝和她的黑色纹路，做了决定。"},
    {"type":"choice","options":[{"label":"“我跟你下去。”","next":"chapter2_go_down"},{"label":"“我留在这里。如果上面出事，至少有人知道。”","next":"chapter2_stay_above"},{"label":"“等等。你确定下面安全吗？”","next":"chapter2_question_safety"}]}
  ],
  "chapter2_go_down":
  [
    {"type":"narrator","text":"你跟着她，沿树根凹槽向下攀爬。裂缝越往下越窄，空气越来越热，带着硫磺与腐烂的气味。下方传来断裂声。她爬得很快，你努力跟上。"},
    {"type":"narrator","text":"你们下到深处，脚下巨大的根脉布满裂口，黑色液体渗出汇成细流。她蹲下，取出苔藓，按在最大的裂口上，苔藓嘶嘶扩散，但只能封住一道。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"不够。"},
    {"type":"narrator","text":"她看着其余裂口，转头看你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我需要你帮我。你往左边根脉走，把苔藓按在能看到的裂口上。"},
    {"type":"narrator","text":"她把另一半苔藓递给你。苔藓冰凉，带着微弱的心跳般的搏动。"},
    {"type":"minigame","id":"root_seal","success":"chapter2_root_full","fail":"chapter2_root_partial","game":"rootSeal"}
  ],
  "chapter2_root_full":
  [
    {"type":"narrator","text":"所有可见裂口都被苔藓封住，根脉暂时稳定下来。"},
    {"type":"effect","affection":15,"flags":{"rootSeal":"full"}},
    {"type":"jump","goto":"chapter2_moss"}
  ],
  "chapter2_root_partial":
  [
    {"type":"narrator","text":"部分裂口被封住，但仍有根脉断裂。艾拉瑞亚额外消耗自身污染稳住了剩余部分。"},
    {"type":"effect","affection":8,"flags":{"rootSeal":"partial"}},
    {"type":"jump","goto":"chapter2_moss"}
  ],
  "chapter2_stay_above":
  [
    {"type":"narrator","text":"艾拉瑞亚看了你一眼。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"好。"},
    {"type":"narrator","text":"她独自攀下裂缝，身影消失在黑暗中。攀爬声渐远，随后安静。"},
    {"type":"narrator","text":"你站在边缘，地面仍在震动。树干裂纹继续蔓延，发出细微如玻璃碎裂的声音。你按住树干，树皮下温度在升高。"},
    {"type":"narrator","text":"很久后，下方传来一声闷响，然后是沉默。"},
    {"type":"narrator","text":"攀爬声从下面传来。她爬出来，浑身是泥，手臂多了一道伤，血和黑色纹路混在一起。她攥着一把碎掉的根脉碎片。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"下面塌了……苔藓没送到。"},
    {"type":"narrator","text":"她坐在边缘喘气。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我在下面看到了别的东西。"},
    {"type":"narrator","text":"她摊开手掌，掌心有一小块树皮，上面刻着古精灵语，与你之前捡到的那片一模一样。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"这是古树在告诉我，它撑不了多久了。"},
    {"type":"effect","affection":5,"flags":{"rootSeal":"failed"}},
    {"type":"jump","goto":"chapter2_moss"}
  ],
  "chapter2_question_safety":
  [
    {"type":"narrator","text":"你拉住她。她停下回头，黑色纹路在你接触处微微亮起。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"不确定。"},
    {"type":"char","role":"player","speaker":"你","text":"那你为什么还要下去？"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"因为不下去，上面所有人都会死。精灵、女王、巡逻者、筑巢的鸟……他们不知道根脉正在断裂。"},
    {"type":"narrator","text":"她拿开你的手。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你不知道也没关系，但你不能拦我。"},
    {"type":"narrator","text":"她转身攀下裂缝。你站在上面，看她消失在黑暗中。你等了很久。地面震动了好几次，一次比一次强。"},
    {"type":"narrator","text":"然后艾拉瑞亚从裂缝里爬出来，浑身是泥，手臂上多了一道新伤口，血和黑色纹路混在一起。她手里攥着一把碎掉的根脉碎片。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"下面塌了......苔藓没送到。"},
    {"type":"narrator","text":"她坐在裂缝边缘，喘着气。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我......我在下面看到了别的东西。"},
    {"type":"narrator","text":"她摊开手掌，掌心里有一小块树皮，上面刻着古精灵语——和你之前在裂缝边缘捡到的那片刻着同样文字的树皮一样。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"这是古树自己的语言，它在告诉我，它撑不了多久了。"},
    {"type":"effect","affection":3,"flags":{"rootSeal":"failed"}},
    {"type":"jump","goto":"chapter2_moss"}
  ],
  "chapter2_moss":
  [
    {"type":"title","chapter":"第五幕","subtitle":"苔藓与根"},
    {"type":"narrator","text":"天快亮了，森林从墨绿变成很深的青灰色。古树裂纹已蔓延到根部，树根布满黑色裂口，渗出黏稠黑色液体。"},
    {"type":"narrator","text":"艾拉瑞亚坐在树根间，面前是培育苔藓的树洞。苔藓情况比昨天更糟，黑色边缘已占近一半面积。"},
    {"type":"narrator","text":"她把手放在树洞边缘，手指上还带着昨夜攀爬时的伤口，黑色纹路已蔓延到手腕和肘弯之间。她抬头看你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我需要你帮我做一件事，可以吗？"},
    {"type":"narrator","text":"她从腰间取出一只小陶罐，里面装着半罐黑色粉末。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"这是用枯死的根脉磨成的粉。我要把它洒在古树的裂口上。如果有苔藓的净化液混合，也许能暂时封住裂口，但苔藓不够——我需要你去摘。"},
    {"type":"narrator","text":"她指向古树背面的一条根脉。根脉末端长着一小片淡绿色野生苔藓，和树洞里的不一样。但那条根脉悬在半空中，下面就是裂缝的深渊。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"那条根很脆，你踩上去可能会断。但我不能去，我身上的污染太重了，我靠近它，它就会枯。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你......去不去？"},
    {"type":"narrator","text":"你没有犹豫，接过陶罐，走向悬空的根脉。根脉确实很脆，踩上去时能听到细微的断裂声。你尽量放轻脚步，向苔藓靠近。"},
    {"type":"narrator","text":"采集完成后，你回到古树根部。艾拉瑞亚接过苔藓，和陶罐里的粉末混合，涂抹在古树裂口上。苔藓接触裂口瞬间，黑色液体停止渗出。裂口边缘出现一圈极细的绿色，像开始结痂。"},
    {"type":"narrator","text":"艾拉瑞亚看着那圈绿色，很久没说话。然后她转身看你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"暂时封住了，能撑几天。"},
    {"type":"narrator","text":"她走到你面前，她的黑色纹路在手臂上缓缓搏动，和裂口上那圈绿色的节奏一致。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"谢谢你。"},
    {"type":"effect","affection":15,"flags":{"ancientTreeSealed":true}},
    {"type":"narrator","text":"古树的裂口被暂时封住，绿色的光从裂口边缘渗出，很淡，但在黑暗中像细线一样连着树干。艾拉瑞亚站在裂口前，看着那圈绿色，看了很久。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"它能撑几天，也许更短。"},
    {"type":"narrator","text":"她转身面对你。她脸上、脖颈上、手臂上的黑色纹路比昨天更密了，已蔓延到锁骨的位置。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你昨天问我，如果我的血有用我会怎么做。当时我没有回答你。"},
    {"type":"narrator","text":"她走到你面前，脚步很稳，但你感觉到她手腕上的纹路在微微颤抖。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"现在我告诉你。如果我的血有用，我会走进古树的根里。我会把自己种下去，我会让它活过来。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"但我的血没有用，只有你的有用。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"所以你要决定。你打算在这里做什么？帮我把苔藓种下去，然后离开？还是留下来，把这件事做完？"},
    {"type":"narrator","text":"你们沉默了一会儿。"},
    {"type":"narrator","text":"她似乎是妥协了，转过身，走向古树根部的凹陷处她休息的地方。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"休息吧，明天你好好想想，后天再说。"},
    {"type":"narrator","text":"她坐下去，靠在树根上，闭上眼睛。你看到她的呼吸很浅、很慢，每次吸气都带着枯叶被捏碎的轻响。她的手指松开，一片刻着古精灵语的树皮掉在泥土上。"},
    {"type":"narrator","text":"你捡起来，和之前捡到的那片拼在一起，文字连成了一句话，和神秘商人给你的残片很像。"},
    {"type":"narrator","text":"那句话是：“来找我，在一切变成石头之前。”"},
    {"type":"narrator","text":"你抬头，古树的裂口像一只正在缓慢闭合的眼睛。地底深处，那个声音又响了。这一次，你听清了。"},
    {"type":"narrator","text":"它在叫你的名字。"},
    {"type":"narrator","text":"你握紧树皮，看向艾拉瑞亚。她睡着了，或者又在装睡。她的黑色纹路在树根阴影中搏动，和古树裂纹、地底脉搏同步。"},
    {"type":"narrator","text":"你收好树皮，靠着树根闭上眼睛。"},
    {"type":"narrator","text":"先休息吧，你需要好好想想。"},
    {"type":"jump","goto":"freedom2"}
  ],
  "mainmap_2":
  [
    {"type":"freedomEnd","day":2,"next":"chapter3_start"}
  ],
  "freedom2":
  [
    {"type":"narrator","text":"【自由行动日 2】\n点击左上角小地图开启自由探索。"}
  ],
  "chapter3_start":
  [
    {"type":"title","chapter":"第三章","subtitle":"根与誓"},
    {"type":"narrator","text":"你回到古树根部时，艾拉瑞亚已等在那里，背对着你，右手按在古树裂口上。那圈绿色比昨天更淡了。"},
    {"type":"narrator","text":"她听到你的脚步声，没有回头。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你回来了。"},
    {"type":"narrator","text":"她转过身，你注意到她锁骨上的黑色纹路更深了，已蔓延到脖颈两侧，她的脸色更苍白了。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"女王派人来了。"},
    {"type":"narrator","text":"她侧过身，你看到古树根部另一侧站着两名精灵巡逻者，握着藤蔓长矛，表情很冷。"},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"女王有令，黑根者艾拉瑞亚，三日内将无翼者带至圣殿。若逾期不至，女王将亲自前来“处置”。"},
    {"type":"narrator","text":"他看了你一眼，冷淡的审视。"},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"无翼者，你的血是这片森林最后的筹码，女王不会让你离开的。"},
    {"type":"narrator","text":"他转身带着另一名巡逻者消失在树影中，艾拉瑞亚沉默了很久。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"三天，她只给了我们三天。"},
    {"type":"narrator","text":"她走到树洞前，苔藓的黑色边缘已占近三分之二，只剩中心一小块淡绿色。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"但古树撑不了三天，裂口上的绿色最多再维持两天。"},
    {"type":"narrator","text":"她背靠树干滑坐下来，抬起头看你，眼睛在灰绿色光线中几乎看不见。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你听到了吗？它又在叫了。"},
    {"type":"narrator","text":"你仔细听去，在地底深处，那个声音又响了，像泥土下有人在反复念同一个名字。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"它在叫你的名字，从我遇见你那天就开始了。"},
    {"type":"narrator","text":"她停顿了一下。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我不知道这意味着什么。但我想……也许你该下去看看。"},
    {"type":"title","chapter":"第一幕","subtitle":"地底之门"},
    {"type":"narrator","text":"艾拉瑞亚带你绕过古树树干，来到背面。你昨天采苔藓的那条悬空根脉下方，有一道被结晶覆盖的裂缝，边缘刻着古精灵语，和你之前捡到的树皮上的文字一样。"},
    {"type":"narrator","text":"艾拉瑞亚蹲下，把手按在裂缝边缘。她手腕上的黑色纹路忽然亮了起来，比之前任何一次都亮。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"这道门，三年前我试着进去过，但我进不去……古树在排斥我，因为我身上的污染太浓了。"},
    {"type":"narrator","text":"她站起来，退后一步，看着你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"但你不一样，你在森林里走的时候，根脉会为你让路；你触碰树根的时候，黑色纹路会停下来。昨天你采苔藓的那条根脉——那么脆，你踩上去却没有断。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"这座森林在保护你。"},
    {"type":"narrator","text":"你看着裂缝深处透出极淡的绿色光雾，和古树裂口上那圈绿色一样。地底的声音又响了，这一次更清楚，你清晰的听见它在叫你的名字。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"下去看看吧，我在这里守着就好。如果上面出事，我会告诉你。"},
    {"type":"char","role":"player","speaker":"你","text":"你不一起下去？"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我进不去的。"},
    {"type":"narrator","text":"她把手按在裂缝边缘。黑色纹路和绿色光雾短暂接触，然后弹开。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我会在这里等你。"},
    {"type":"choice","options":[{"label":"独自进入裂缝。","next":"chapter3_enter"},{"label":"犹豫，回头看艾拉瑞亚。","next":"chapter3_hesitate"},{"label":"拒绝进入裂缝。","next":"chapter3_refuse"}]}
  ],
  "chapter3_enter":
  [
    {"type":"narrator","text":"你点头，走到裂缝前，把手按在边缘。古树的根脉在你脚下微微震动——裂缝缓缓打开，像一扇被推开很久的门。"},
    {"type":"narrator","text":"你钻进去，裂缝内部比外面更暖，空气带着泥土和青草混合的气味。你沿着根脉向下走——脚下的根脉是活的，在微微搏动，和你的心跳同频。"},
    {"type":"narrator","text":"艾拉瑞亚在你身后开口。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"如果你在里面看到什么……回来告诉我。"},
    {"type":"narrator","text":"你回头看她，她站在裂缝边缘，黑色纹路在手臂上缓缓搏动。她的表情很平静，但手指在微微颤抖。"},
    {"type":"narrator","text":"你继续向下走，裂缝在你身后合拢，但留了一条缝，透进灰绿色的光。"},
    {"type":"effect","affection":5,"flags":{"enteredUndergroundGate":true}},
    {"type":"jump","goto":"chapter3_evening"}
  ],
  "chapter3_hesitate":
  [
    {"type":"narrator","text":"你站在裂缝前，没有立刻进去，回头看她。她站在几步之外，黑色纹路像嵌在皮肤里的细线。"},
    {"type":"char","role":"player","speaker":"你","text":"你确定我该下去？"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"不确定。"},
    {"type":"narrator","text":"她走近一步，看着裂缝深处。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"但古树认你，地底的声音叫的是你的名字。如果世上还有一个人能下去，那就是你。"},
    {"type":"narrator","text":"她停顿了一下。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我不确定你该不该下去，但如果你不下去，我们永远不知道答案。"},
    {"type":"narrator","text":"她伸出手，她的手很凉，掌心有粗糙的茧。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"去吧，我在这里。"},
    {"type":"effect","affection":8,"flags":{"enteredUndergroundGate":true}},
    {"type":"jump","goto":"chapter3_evening"}
  ],
  "chapter3_refuse":
  [
    {"type":"narrator","text":"你后退一步，指着裂缝深处的黑色光雾，那东西和污染同源。你摇了摇头。"},
    {"type":"char","role":"player","speaker":"你","text":"太危险了，我不下去。我们需要别的办法。"},
    {"type":"narrator","text":"艾拉瑞亚看着你，沉默了很久。她没有生气，也没有失望，只是平静地看着你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"别的办法。"},
    {"type":"narrator","text":"她重复了一遍，像是在咀嚼这四个字。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"三年来我试过所有别的办法。培育苔藓，用自己的血浇灌根脉，在森林最深处寻找古精灵留下的净化仪式。我甚至试过把自己关在树洞里，等它自己好起来。"},
    {"type":"narrator","text":"她转过身，看着那棵古树。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"但是事与愿违，它并没有好起来。"},
    {"type":"narrator","text":"她回过头看你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我不会强迫你。但如果你不进去——三天后，我会自己下去。"},
    {"type":"effect","affection":-5,"flags":{"enteredUndergroundGate":false}},
    {"type":"jump","goto":"chapter3_evening"}
  ],
  "chapter3_evening":
  [
    {"type":"narrator","text":"那天傍晚，艾拉瑞亚坐在古树根部，看着那圈越来越淡的绿色。你站在她旁边。你们谁都没有说话。"},
    {"type":"narrator","text":"然后她开口了。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你知道黑根者最后都会变成什么吗？"},
    {"type":"narrator","text":"你看着她抬起手，手腕上的黑色纹路在暮色中缓缓搏动。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"变成树，变成站着的、活着的、没有意识的树。森林让我们活着，是为了让我们死后继续活着。"},
    {"type":"narrator","text":"她把手放下。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我五岁那年，母亲把我交给女王。她说：“你会成为森林的一部分，这是荣耀。”我信了十年。"},
    {"type":"narrator","text":"她转头看你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"但现在我不确定了，我不确定变成树是不是荣耀。我不确定森林值不值得我把自己种下去，我甚至不确定自己还想不想，会不会变成一棵树。"},
    {"type":"narrator","text":"她停顿了很久，然后轻声说："},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"但如果我不种下去，谁来种？"},
    {"type":"title","chapter":"第二幕","subtitle":"夜誓"},
    {"type":"narrator","text":"深夜，你被震动惊醒，地面在抖，比上次更剧烈。古树树干上的裂纹又蔓延了，从中央向两侧扩散。"},
    {"type":"narrator","text":"艾拉瑞亚不在她平时休息的位置。你顺着震动传来的方向走，绕过古树，来到背面。"},
    {"type":"narrator","text":"她站在裂缝前，裂缝比傍晚时更大，从里面透出的绿色光雾更亮——但那种亮不对劲，像某种东西在燃烧自己。"},
    {"type":"narrator","text":"她听到你的脚步声，没有回头。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"它撑不住了。"},
    {"type":"narrator","text":"她抬起手，按在裂缝边缘，黑色纹路和裂缝上的绿色同时亮了一下。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我刚才又听到了祂的声音。但这次……不是叫你的名字。"},
    {"type":"narrator","text":"她转过身，脸上有一种你从未见过的表情——不是恐惧，不是悲伤，而是一种很安静的、像是终于做出了某个决定的东西。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"它在叫我。"},
    {"type":"narrator","text":"她把手收回来，手掌上的绿光缓缓消退。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我们还有三天的时间，但古树只有两天了。它说——如果我不下去，它会先断裂。所有根脉会同时裂开，森林里的所有东西都会掉进地底。"},
    {"type":"narrator","text":"她看着你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我不想下去，但如果不下去，树冠上筑巢的鸟、根脉间爬行的虫、不知道根脉正在死去的精灵......都会死。"},
    {"type":"narrator","text":"她停顿了一下。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我不在乎森林了，但我仍然在乎他们。"},
    {"type":"narrator","text":"她走到你面前，脚步很稳，但你能感觉到她手腕上的纹路在微微颤抖。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"明天，我会下去。是我自己去。"},
    {"type":"narrator","text":"她看着你，眼睛很亮。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"但我不知道下去了还能不能上来，所以——我想先跟你说一件事。"},
    {"type":"title","chapter":"第三幕","subtitle":"根与誓"},
    {"type":"narrator","text":"她站在你面前，离你很近。近到你能看见她锁骨上那些黑色纹路在皮肤下面缓缓流动。她抬起手，看着自己的手掌。掌心有绿色的光在缓缓消退，那是她触碰裂缝时留下的痕迹。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我五岁那年被交给女王，她说：“你是黑根者，你会成为森林的根。”于是我每天听根脉的声音，感受泥土下面的跳动，我以为那就是我活着的全部意义。"},
    {"type":"narrator","text":"她放下手，看着你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"但你来了，你问我“疼不疼”。"},
    {"type":"narrator","text":"她的声音很轻，但每一个字都很清楚。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"那一刻我好像忽然意识到，我这辈子，从来没有人问过我疼不疼。"},
    {"type":"narrator","text":"她看着你，像是在等你的回答。你知道她要做什么决定，但她不确定，她还想不想回来。"},
    {"type":"narrator","text":"她看着你，想知道她有没有理由回来。"},
    {"type":"auto","options":[{"min":61,"max":9999,"next":"chapter3_oath_high"},{"min":30,"max":60,"next":"chapter3_oath_mid"},{"min":-9999,"max":29,"next":"chapter3_oath_low"}]}
  ],
  "chapter3_oath_high":
  [
    {"type":"narrator","text":"你看着她，很平淡很正常的说了出来。"},
    {"type":"narrator","text":"她愣了一下，然后笑了。那个笑容很浅，像裂缝里透出的第一线光。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"……你真的很不会说话。"},
    {"type":"narrator","text":"她低下头，看着自己的手。黑色纹路在掌心缓缓搏动。然后她抬起头。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"但你说对了。我疼，从五岁开始，一直在疼。没有人问过，所以我也没说过。"},
    {"type":"narrator","text":"你握住了她伸出来触碰你的手。她的手很凉，但掌心有一丝微弱的温热。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"明天我会下去的，不是去死，是去......试试看能不能回来。"},
    {"type":"narrator","text":"她松开手，退后一步。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"因为我想回来，我想活着，我不想变成一棵树，或者只是变成一棵树，我想回来听你再说一句“疼不疼”。"},
    {"type":"effect","flags":{"oathRoute":"high","elarriaWillReturn":true}},
    {"type":"jump","goto":"chapter3_descent_high"}
  ],
  "chapter3_oath_mid":
  [
    {"type":"narrator","text":"你看着她。"},
    {"type":"narrator","text":"她沉默了一会儿，然后点了点头。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你比我想的诚实。"},
    {"type":"narrator","text":"她走到古树根部，把手按在树干上。黑色纹路和树皮上的裂纹短暂地接触了一下，然后分开。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我不知道能不能活着回来，但我会试试。因为你说想让我“活着回来”。"},
    {"type":"narrator","text":"她转过身看你，她的表情比刚才更平静了，像是一个人已经做好了最坏的打算，但还没有完全放弃。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"如果我没回来——告诉女王，我不是逃走的。我是自己走进去的，这是我自己的选择。"},
    {"type":"effect","flags":{"oathRoute":"mid","elarriaWillReturn":true}},
    {"type":"jump","goto":"chapter3_descent_mid"}
  ],
  "chapter3_oath_low":
  [
    {"type":"narrator","text":"你看着她。"},
    {"type":"narrator","text":"她愣了一下，然后摇了摇头。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"别的办法？我试了三年。你来了之后，我才找到你一个能接触根脉的人。你走了之后呢？我继续试三年？还是再等下一个无翼者？"},
    {"type":"narrator","text":"她走到裂缝前，背对着你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你说的“别的办法”是建立在你自己的基础上，我早就没有别的办法了，除了我自己。"},
    {"type":"narrator","text":"她转身，表情平静——但手腕上的纹路在剧烈搏动。"},
    {"type":"char","role":"player","speaker":"你","text":"如果疼的话，可以停下的。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"谢谢，但我不需要有人拦我。我需要有人告诉我——如果我真的回不来了，这件事有没有意义。"},
    {"type":"effect","flags":{"oathRoute":"low","elarriaWillReturn":false}},
    {"type":"jump","goto":"chapter3_descent_low"}
  ],
  "chapter3_descent_high":
  [
    {"type":"title","chapter":"第四幕","subtitle":"女王圣殿"},
    {"type":"narrator","text":"第二天清晨，森林里的光线变成极浅的青灰色。艾拉瑞亚站在裂缝前，她换了件更短的亚麻袍子，长发束起，露出蔓延到下颌的黑色纹路。"},
    {"type":"narrator","text":"她把一只小陶罐递给你，里面是最后一点苔藓——淡绿色，很薄。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"如果我下去了，上面交给你。把苔藓按在裂口上。能撑多久是多久。"},
    {"type":"narrator","text":"她走到裂缝前，把手按在边缘。裂缝缓缓打开，比昨天的更大，绿色光雾从里面涌出来。"},
    {"type":"narrator","text":"她回头看了你一眼，转身走进裂缝。裂缝在她身后合拢，但没有完全闭合，它留了一条极细的缝，透出一线绿光。"},
    {"type":"narrator","text":"你站在裂缝前，听到她的脚步声越来越远。然后她说话了——声音从裂缝深处传上来，很轻，但很清楚。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚（从裂缝中）","text":"你在上面等着，等我回来——我有话跟你说。"},
    {"type":"narrator","text":"你把手按在裂缝边缘，绿色光雾在指尖停留一瞬，然后缩了回去。"},
    {"type":"narrator","text":"你退后一步，抬起头。古树的裂纹停止了蔓延，裂口上那圈绿色忽然亮了一度。"},
    {"type":"narrator","text":"你就站在那里。"},
    {"type":"jump","goto":"chapter3_outside"}
  ],
  "chapter3_descent_mid":
  [
    {"type":"title","chapter":"第四幕","subtitle":"女王圣殿"},
    {"type":"narrator","text":"第二天清晨，艾拉瑞亚站在裂缝前。她换了一件深色长袍，长发束起。黑色纹路已蔓延到下颌。她没有回头。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你不用送。我自己下去。"},
    {"type":"narrator","text":"你站在几步之外。她把手按在裂缝上，裂缝缓缓打开，绿色光雾涌出来。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"如果我没回来，告诉女王，我不是逃走的，我是自己走进去的。"},
    {"type":"narrator","text":"她走进裂缝，裂缝在她身后合拢。"},
    {"type":"narrator","text":"你站在那里，听到她的脚步声停下了。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚（从裂缝中）","text":"……你还在上面吗？"},
    {"type":"narrator","text":"你把手按在裂缝边缘，绿色光雾在指尖停留一瞬，然后缩了回去。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚（从裂缝中）","text":"好，我知道了。"},
    {"type":"narrator","text":"脚步声继续向下，越来越远，然后安静了。"},
    {"type":"narrator","text":"你站在裂缝前，听到地底深处传来一声低沉的震动——古树的裂纹停止了蔓延。裂口上那圈绿色没有变亮，但也没有继续变暗。"},
    {"type":"narrator","text":"你就站在那里。"},
    {"type":"jump","goto":"chapter3_outside"}
  ],
  "chapter3_descent_low":
  [
    {"type":"title","chapter":"第四幕","subtitle":"女王圣殿"},
    {"type":"narrator","text":"第二天清晨，艾拉瑞亚站在裂缝前。她穿着来时那件旧亚麻袍子，没有束发。黑色纹路从脖颈蔓延到脸颊边缘。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你不用来的。"},
    {"type":"narrator","text":"她把手按在裂缝上，裂缝缓缓打开，绿色光雾涌出来。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我下去之后，女王那边你自己应付。如果你活下来，替我告诉森林里的巡逻者，黑根者不是森林的病灶。"},
    {"type":"narrator","text":"她走进裂缝，裂缝在她身后完全合拢。"},
    {"type":"narrator","text":"你站在那里，听到地底深处传来一声低沉的震动——比之前任何一次都重。古树的裂纹停止了蔓延，但裂口上那圈绿色消失了。整棵古树的树干变成了灰色。"},
    {"type":"narrator","text":"你把手按在树干上，树皮冰凉，没有搏动，没有声音。"},
    {"type":"narrator","text":"你站在那里，没有回应。"},
    {"type":"jump","goto":"chapter3_outside"}
  ],
  "chapter3_outside":
  [
    {"type":"title","chapter":"第五幕","subtitle":"裂缝之外"},
    {"type":"narrator","text":"当天傍晚，精灵巡逻者又出现在古树根部。两名巡逻者，手持藤蔓长矛。他们看一眼裂缝，又看你。"},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"三天到了，女王在圣殿等你，还有那个黑根者。"},
    {"type":"narrator","text":"你站起来，身后那道裂缝——艾拉瑞亚进去后，再没打开。你没法告诉他们她在下面。"},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"黑根者呢？"},
    {"type":"narrator","text":"你没回答。他看着你，沉默很久。"},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"她下去了，是不是？"},
    {"type":"narrator","text":"他没等回答，转身对另一名巡逻者说了句什么，又回头看你。"},
    {"type":"char","role":"npc","speaker":"精灵巡逻者","text":"女王早知道了，她说，若黑根者下去了，就带无翼者来，一个人也行。"},
    {"type":"narrator","text":"于是你被带到圣殿，精灵女王坐在藤蔓王座上。她看着你，眼睛浅绿，瞳孔边缘泛灰，像有什么正从里往外渗。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"黑根者进了古树，她终于做了该做的事。"},
    {"type":"narrator","text":"她站起，走到你面前。脚步很轻，但整片森林都安静下来。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"但你还在。"},
    {"type":"narrator","text":"她看着你，表情不变。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"你是古树选中的人。它让你进去，它本该让你进去的。"},
    {"type":"narrator","text":"她停了一下。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"你知道这意味着什么吗？"},
    {"type":"choice","options":[{"label":"“我不知道，但我会等她回来。”","next":"chapter3_queen_wait"},{"label":"“意味着古树在选新的守护者。”","next":"chapter3_queen_guardian"},{"label":"沉默。","next":"chapter3_queen_silent"}]}
  ],
  "chapter3_queen_wait":
  [
    {"type":"narrator","text":"女王看着你，沉默很久。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"等？古树里的时间不是外面的时间。她可能明天回来，也可能永远不回来。"},
    {"type":"char","role":"player","speaker":"你","text":"那我就等到明天。若明天没回来，就等到后天。"},
    {"type":"narrator","text":"女王看着你，表情不变——但你感到她在重新评估你。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"你和她一样固执。"},
    {"type":"narrator","text":"她转身走回王座。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"你走吧，三天内，你可以留在森林里。三天后——若你还在，我会把你交给森林。"},
    {"type":"effect","affection":15},
    {"type":"jump","goto":"chapter3_end"}
  ],
  "chapter3_queen_guardian":
  [
    {"type":"narrator","text":"女王看着你，眼睛微微眯起。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"你比我想的聪明。"},
    {"type":"narrator","text":"她走到王座前坐下。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"黑根者是森林的守护者，但需要她们用身体去守护。古树在选另一种守护者，用“声音”去守护的守护者。"},
    {"type":"narrator","text":"她看着你。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"地底的声音叫你的名字，不是叫你下去，是叫你听。听它说话，听它告诉你根脉在哪儿断，苔藓往哪儿种。"},
    {"type":"narrator","text":"她停了一下。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"若你能做到，你可以留在森林里......不是作为祭品，是作为守护者。"},
    {"type":"effect","affection":5,"flags":{"guardianCandidate":true}},
    {"type":"jump","goto":"chapter3_end"}
  ],
  "chapter3_queen_silent":
  [
    {"type":"narrator","text":"你没有回答，女王看着你，等了很久，然后转身。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"你不回答，没关系。"},
    {"type":"narrator","text":"她走回王座。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"三天，你可以在森林里留三天。三天后——若你还在，我会把你交给森林。"},
    {"type":"jump","goto":"chapter3_end"}
  ],
  "chapter3_end":
  [
    {"type":"narrator","text":"你走出圣殿。天色已彻底暗了。森林里的光从青灰变成很深的靛蓝，只有古树方向的绿色还隐隐发亮。"},
    {"type":"narrator","text":"你走回古树根部。裂缝还在，比昨天更小一点——但绿色光雾还在，像极细的线，连着地底和地面。"},
    {"type":"narrator","text":"你把手按在裂缝边缘。绿色光雾在指尖停留一瞬。你仔细听。地底深处，那声音又响了。这次没叫你的名字。它在说话，很慢，很沉。"},
    {"type":"narrator","text":"你听清几个字。"},
    {"type":"narrator","text":"“……还活着。……在修。……别告诉上面。”"},
    {"type":"narrator","text":"你从裂缝上收回手，站起来，看着那棵古树。裂口那圈绿色比昨天更亮——不是它在燃烧自己，是有人在里面擦亮它。"},
    {"type":"narrator","text":"你转身，靠古树根部坐下。你看着裂缝，等待。"},
    {"type":"narrator","text":"第三章结束。主线进入第四章。"},
    {"type":"jump","goto":"freedom3"}
  ],
  "mainmap_3":
  [
    {"type":"freedomEnd","day":3,"next":"chapter4_start"}
  ],
  "freedom3":
  [
    {"type":"narrator","text":"【自由行动日 3】\n点击左上角小地图开启自由探索。"}
  ],

  "loc_leave":
  [
    {"type":"freedomReturn"}
  ],

  /* ============ 天空之城 ============ */
  "loc_sky_yun":
  [
    {"type":"narrator","text":"集市悬浮在云层中，风晶石摊位随气流漂移。你在人群中穿行，顺便打探各阵营的消息。"},
    {"type":"choice","options":
    [
      {"label":"购买风晶石（3 记忆碎片）","cost":{"memoryFragments":3},"give":{"windCrystal":1},"next":"yun_after"},
      {"label":"寻找记忆羽毛（追风者）","next":"yun_feather"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "yun_after":
  [
    {"type":"chance","prob":0.3,"pass":"yun_bonus","fail":"yun_none"}
  ],
  "yun_bonus":
  [
    {"type":"narrator","text":"摊主额外塞给你一块风暴护盾，说是老主顾的赠品。"},
    {"type":"effect","addItems":{"stormShield":1}},
    {"type":"jump","goto":"loc_sky_yun"}
  ],
  "yun_none":
  [
    {"type":"narrator","text":"你收好风晶碎片。"},
    {"type":"jump","goto":"loc_sky_yun"}
  ],
  "yun_feather":
  [
    {"type":"skillcheck","id":"feather","success":"yun_feather_ok","fail":"yun_feather_fail","url":"game2.html?mode=forest"}
  ],
  "yun_feather_ok":
  [
    {"type":"narrator","text":"你抓住了足够多的记忆羽毛。"},
    {"type":"effect","otherAffection":{"sky":3}},
    {"type":"jump","goto":"loc_sky_yun"}
  ],
  "yun_feather_fail":
  [
    {"type":"narrator","text":"羽毛被风吹散了，你两手空空。"},
    {"type":"jump","goto":"loc_sky_yun"}
  ],

  "loc_sky_feng":
  [
    {"type":"narrator","text":"风从回廊深处涌来，吹得檐角的金属片叮当作响。几个底层羽人靠在墙边，打量着你的翅膀——或者说，你没有翅膀。"},
    {"type":"choice","options":
    [
      {"label":"打造机械羽翼","next":"feng_craft"},
      {"label":"与底层羽人聊天","next":"feng_chat"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "feng_craft":
  [
    {"type":"hasitems","need":{"windCrystal":3,"mechDesign":1,"runeFragment":2,"rareOre":1},"pass":"feng_craft_ok","fail":"feng_craft_lack"}
  ],
  "feng_craft_lack":
  [
    {"type":"narrator","text":"“还缺少材料呢……多去其他地方看看吧。”你翻遍行囊，还是凑不齐打造机械羽翼的材料。"},
    {"type":"jump","goto":"loc_sky_feng"}
  ],
  "feng_craft_ok":
  [
    {"type":"narrator","text":"你把材料铺在石台上，一阵风自下而上托起散落的零件。机械羽翼在你背后缓缓展开。"},
    {"type":"effect","removeItems":{"windCrystal":3,"mechDesign":1,"runeFragment":2,"rareOre":1},"addItems":{"mechWing":1},"otherAffection":{"sky":5}},
    {"type":"jump","goto":"loc_sky_feng"}
  ],
  "feng_chat":
  [
    {"type":"flagauto","flag":"fengChatDone","routes":{"true":"feng_chat_again"},"default":"feng_chat_first"}
  ],
  "feng_chat_first":
  [
    {"type":"char","role":"npc","speaker":"底层羽人","text":"啧，这里的都是翅膀有缺陷的人，不要客气，我们一视同仁！你的翅膀是……"},
    {"type":"narrator","text":"“天生的。”你答道。"},
    {"type":"char","role":"npc","speaker":"底层羽人","text":"那还是你比较惨一点，至少我们还能感受风流经的痕迹。"},
    {"type":"effect","addIntels":["剪翼者与无翼者"],"otherAffection":{"sky":2},"flags":{"fengChatDone":true}},
    {"type":"choice","options":
    [
      {"label":"问“上面的人为什么这么怕我们”","next":"feng_chat_ask"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "feng_chat_ask":
  [
    {"type":"char","role":"npc","speaker":"底层羽人","text":"谁知道呢？他们本来就是胆小鬼，一边鄙视我们，一边又害怕我们。"},
    {"type":"effect","addIntels":["底层人与上层人"],"otherAffection":{"sky":3}},
    {"type":"freedomReturn"}
  ],
  "feng_chat_again":
  [
    {"type":"narrator","text":"你与底层羽人聊了会儿天，十分愉快。"},
    {"type":"effect","otherAffection":{"sky":3}},
    {"type":"freedomReturn"}
  ],

  "loc_sky_yu":
  [
    {"type":"dailyauto","flag":"yuClean","notDone":"yu_clean","done":"yu_done"}
  ],
  "yu_clean":
  [
    {"type":"narrator","text":"你找到赛琳母亲的墓碑，蹲下来擦去上面的黑斑。碑文慢慢显现："},
    {"type":"narrator","text":"“她飞得不够高，所以她看见的最多。”"},
    {"type":"effect","otherAffection":{"sky":5},"dailyFlag":"yuClean"},
    {"type":"freedomReturn"}
  ],
  "yu_done":
  [
    {"type":"narrator","text":"这里就是埋葬过往羽人的地方啊……有点阴森森的，还是赶快离开吧。"},
    {"type":"freedomReturn"}
  ],

  "loc_sky_trial":
  [
    {"type":"narrator","text":"审判穹顶高悬在城池中央，长老们的声音从里面传出来，像风穿过空心的金属。"},
    {"type":"choice","options":
    [
      {"label":"潜入档案室","next":"trial_infiltrate"},
      {"label":"旁听一场公开审判","next":"trial_watch"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "trial_infiltrate":
  [
    {"type":"infiltration","id":"sky_archive","success":"trial_infil_ok","fail":"trial_infil_fail","url":"game4.html?mode=forest"}
  ],
  "trial_infil_ok":
  [
    {"type":"narrator","text":"你从档案室里带出了几片散落的符文碎片。"},
    {"type":"effect","addItems":{"runeFragment":1},"memoryDelta":2},
    {"type":"freedomReturn"}
  ],
  "trial_infil_fail":
  [
    {"type":"narrator","text":"你被守卫发现了，只能狼狈退出。"},
    {"type":"effect","otherAffection":{"sky":-5}},
    {"type":"freedomReturn"}
  ],
  "trial_watch":
  [
    {"type":"narrator","text":"被审的是那个说“献祭是杀人”的摊主。大长老反问：“风脉之心停了，我们怎么办？”全场无人应声，只有最前排几个底层羽人把兜帽往下压了压。"},
    {"type":"effect","addIntels":["底层羽人的沉默"],"otherAffection":{"sky":4,"empire":2}},
    {"type":"freedomReturn"}
  ],

  "loc_sky_shi":
  [
    {"type":"narrator","text":"拭翼之塔高耸入云，塔顶的风大得几乎站不稳。"},
    {"type":"choice","options":
    [
      {"label":"到塔顶取图纸","next":"shi_design"},
      {"label":"尝试打开塔顶暗格","next":"shi_drawer"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "shi_design":
  [
    {"type":"flagauto","flag":"mechDesignGot","routes":{"true":"shi_design_gone"},"default":"shi_design_take"}
  ],
  "shi_design_gone":
  [
    {"type":"narrator","text":"图纸已经被取走了，这里什么也没有，看看就离开吧。"},
    {"type":"freedomReturn"}
  ],
  "shi_design_take":
  [
    {"type":"narrator","text":"你在塔顶找到了【机械义翼设计图】。"},
    {"type":"effect","addItems":{"mechDesign":1},"flags":{"mechDesignGot":true}},
    {"type":"freedomReturn"}
  ],
  "shi_drawer":
  [
    {"type":"narrator","text":"你尝试了很久也没能打开，你想，或许会有时机知道里面是什么的。"},
    {"type":"freedomReturn"}
  ],

  /* ============ 帝国城邦 ============ */
  "loc_emp_fu":
  [
    {"type":"narrator","text":"符文工坊里蒸汽弥漫，奥德里克正伏在工作台前，指间的符文忽明忽暗。"},
    {"type":"choice","options":
    [
      {"label":"和奥德里克一起调试符文装备","next":"fu_tune"},
      {"label":"找他改造装备","next":"fu_craft"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "fu_tune":
  [
    {"type":"skillcheck","id":"rune_tune","success":"fu_tune_ok","fail":"fu_tune_partial","url":"game5.html?mode=forest&task=rune"}
  ],
  "fu_tune_ok":
  [
    {"type":"narrator","text":"你稳稳地校准了每一道符文。奥德里克点了点头。"},
    {"type":"effect","addItems":{"runeFragment":2},"otherAffection":{"empire":5}},
    {"type":"freedomReturn"}
  ],
  "fu_tune_partial":
  [
    {"type":"narrator","text":"你校准得磕磕绊绊，但好歹没有全错。"},
    {"type":"effect","addItems":{"runeFragment":1},"otherAffection":{"empire":2}},
    {"type":"freedomReturn"}
  ],
  "fu_craft":
  [
    {"type":"choice","options":
    [
      {"label":"符文护盾（2 符文碎片 + 1 稀有矿石）","cost":{"runeFragment":2,"rareOre":1},"give":{"runeShield":1},"next":"fu_craft_done"},
      {"label":"污染净化器（3 稀有矿石 + 5 记忆碎片）","cost":{"rareOre":3,"memoryFragments":5},"give":{"purifier":1},"next":"fu_craft_done"},
      {"label":"破符水（1 稀有矿石 + 不完美的破符水）","cost":{"rareOre":1,"imperfectRune":1},"give":{"brokenRune":1},"next":"fu_craft_done"},
      {"label":"返回","next":"loc_emp_fu"}
    ]}
  ],
  "fu_craft_done":
  [
    {"type":"narrator","text":"奥德里克敲了敲成品，头也不抬地说了句：“拿好了。”"},
    {"type":"jump","goto":"fu_craft"}
  ],

  "loc_emp_lao":
  [
    {"type":"narrator","text":"老兵墓地的风很冷。守墓老兵坐在一块空碑旁，手里攥着一只旧酒壶。"},
    {"type":"choice","options":
    [
      {"label":"与守墓老兵对饮（2 记忆碎片）","cost":{"memoryFragments":2},"give":{"liquor":1},"next":"lao_drink"},
      {"label":"向守墓人确认失踪者的名字","next":"lao_confirm"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "lao_drink":
  [
    {"type":"chance","prob":0.33,"pass":"lao_intel1","fail":"lao_drink2"}
  ],
  "lao_drink2":
  [
    {"type":"chance","prob":0.5,"pass":"lao_intel2","fail":"lao_intel3"}
  ],
  "lao_intel1":
  [
    {"type":"narrator","text":"老兵喝了几口，指着墓碑背面说：“看看这个。”"},
    {"type":"effect","addIntels":["军派的募兵牌"]},
    {"type":"freedomReturn"}
  ],
  "lao_intel2":
  [
    {"type":"narrator","text":"老兵望着空碑，讲起了二十年前的那支队伍。"},
    {"type":"effect","addIntels":["四十个人"]},
    {"type":"freedomReturn"}
  ],
  "lao_intel3":
  [
    {"type":"narrator","text":"老兵压低声音，说起了军费的来路。"},
    {"type":"effect","addIntels":["军费的来源"]},
    {"type":"freedomReturn"}
  ],
  "lao_confirm":
  [
    {"type":"otherauto","faction":"empire","min":30,"pass":"lao_confirm_flag","fail":"lao_confirm_deny"}
  ],
  "lao_confirm_flag":
  [
    {"type":"flagauto","flag":"laoConfirmDone","routes":{"true":"lao_confirm_deny"},"default":"lao_confirm_do"}
  ],
  "lao_confirm_do":
  [
    {"type":"char","role":"npc","speaker":"守墓人","text":"他不在这儿，他每周都来，站在那块空碑前面，站一会儿就走。二十年了。"},
    {"type":"effect","addIntels":["第四十座碑"],"otherAffection":{"empire":12},"flags":{"laoConfirmDone":true}},
    {"type":"freedomReturn"}
  ],
  "lao_confirm_deny":
  [
    {"type":"char","role":"npc","speaker":"守墓人","text":"的确有个人每周都来……但你问这个干什么？快走吧。"},
    {"type":"freedomReturn"}
  ],

  "loc_emp_hei":
  [
    {"type":"narrator","text":"黑市巷道里挤满了压低声音叫卖的摊贩。这里的东西，钱买不到，只能用记忆碎片换。"},
    {"type":"choice","options":
    [
      {"label":"基础治疗药剂（4 记忆碎片）","cost":{"memoryFragments":4},"give":{"basicPotion":1},"next":"loc_emp_hei"},
      {"label":"符文治疗包（8 记忆碎片）","cost":{"memoryFragments":8},"give":{"runePack":1},"next":"loc_emp_hei"},
      {"label":"稀有矿石（6 记忆碎片）","cost":{"memoryFragments":6},"give":{"rareOre":1},"next":"loc_emp_hei"},
      {"label":"符文碎片（5 记忆碎片）","cost":{"memoryFragments":5},"give":{"runeFragment":1},"next":"loc_emp_hei"},
      {"label":"烈酒（3 记忆碎片）","cost":{"memoryFragments":3},"give":{"liquor":1},"next":"loc_emp_hei"},
      {"label":"破符水（12 记忆碎片）","cost":{"memoryFragments":12},"give":{"brokenRune":1},"next":"loc_emp_hei"},
      {"label":"解码符文（7 记忆碎片）","cost":{"memoryFragments":7},"give":{"decoderRune":1},"next":"loc_emp_hei"},
      {"label":"旧羽管（2 记忆碎片）","cost":{"memoryFragments":2},"give":{"oldFeather":1},"next":"loc_emp_hei"},
      {"label":"假情报（3 记忆碎片）","cost":{"memoryFragments":3},"give":{"fakeIntel":1},"next":"loc_emp_hei"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],

  "loc_emp_wu":
  [
    {"type":"narrator","text":"污染隔离区外围拉着锈蚀的铁丝网，里面传来晶骸刮擦地面的声音。"},
    {"type":"choice","options":
    [
      {"label":"清剿晶骸","next":"wu_battle"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "wu_battle":
  [
    {"type":"battle","id":"isolation","success":"wu_win","fail":"wu_lose","url":"game3.html?mode=forest"}
  ],
  "wu_win":
  [
    {"type":"narrator","text":"晶骸碎成一地。你从残骸里捡出一些还能用的结晶。"},
    {"type":"effect","addItems":{"crystalFragment":2,"lowPurityCrystal":1},"memoryDelta":3,"otherAffection":{"empire":3}},
    {"type":"freedomReturn"}
  ],
  "wu_lose":
  [
    {"type":"narrator","text":"你被晶骸击退了，身上添了几道伤。"},
    {"type":"effect","hpDelta":-15},
    {"type":"freedomReturn"}
  ],

  "loc_emp_steam":
  [
    {"type":"narrator","text":"蒸汽议会厅里，议员们的争辩声被铜管放大，嗡嗡作响。"},
    {"type":"choice","options":
    [
      {"label":"旁听表决（议员说服）","next":"steam_vote"},
      {"label":"在旁听席记录发言","next":"steam_record"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "steam_vote":
  [
    {"type":"skillcheck","id":"council","success":"steam_vote_ok","fail":"steam_vote_fail","url":"game5.html?mode=forest&task=council"}
  ],
  "steam_vote_ok":
  [
    {"type":"narrator","text":"反对票凑够了六十张，议案被否决了。议员们面面相觑。"},
    {"type":"effect","otherAffection":{"empire":5}},
    {"type":"jump","goto":"loc_emp_steam"}
  ],
  "steam_vote_fail":
  [
    {"type":"narrator","text":"反对票不够，议案以多数通过了。"},
    {"type":"freedomReturn"}
  ],
  "steam_record":
  [
    {"type":"narrator","text":"你听了一天，什么关键信息也没听见。"},
    {"type":"effect","otherAffection":{"empire":3}},
    {"type":"freedomReturn"}
  ],

  /* ============ 地下古堡 ============ */
  "loc_under_kuang":
  [
    {"type":"narrator","text":"熔岩矿道里热浪翻涌，岩壁上的矿石泛着暗红的光。"},
    {"type":"choice","options":
    [
      {"label":"矿道采集（黄金矿工）","next":"kuang_mine"},
      {"label":"进入废弃矿道","next":"kuang_abandon"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "kuang_mine":
  [
    {"type":"skillcheck","id":"mine","success":"kuang_mine_ok","fail":"kuang_mine_fail","url":"game1.html?mode=forest"}
  ],
  "kuang_mine_ok":
  [
    {"type":"narrator","text":"你采满了一整筐晶石。"},
    {"type":"effect","addItems":{"pureCrystal":1},"memoryDelta":3,"otherAffection":{"under":3}},
    {"type":"freedomReturn"}
  ],
  "kuang_mine_fail":
  [
    {"type":"narrator","text":"晶石数量好像还不够，再采集一轮吧。"},
    {"type":"freedomReturn"}
  ],
  "kuang_abandon":
  [
    {"type":"dayauto","routes":{"3":"kuang_abandon_ok"},"default":"kuang_abandon_locked"}
  ],
  "kuang_abandon_locked":
  [
    {"type":"narrator","text":"这里有一条废弃许久的矿道，看起来好危险，还是不要进去了吧。"},
    {"type":"freedomReturn"}
  ],
  "kuang_abandon_ok":
  [
    {"type":"narrator","text":"你钻进废弃矿道，墙壁上全是旧矿灯的划痕——有人在这里独自待过很久。"},
    {"type":"effect","addItems":{"rareOre":2},"addIntels":["独自下矿的人"],"otherAffection":{"under":8}},
    {"type":"freedomReturn"}
  ],

  "loc_under_di":
  [
    {"type":"narrator","text":"地精集市里全是奇形怪状的摊位，一个老地精蹲在砧子后面，冲你咧嘴笑。"},
    {"type":"choice","options":
    [
      {"label":"购买：基础治疗药剂（4）","cost":{"memoryFragments":4},"give":{"basicPotion":1},"next":"loc_under_di"},
      {"label":"购买：抗污药剂（6）","cost":{"memoryFragments":6},"give":{"antiPotion":1},"next":"loc_under_di"},
      {"label":"购买：抗污护符（10）","cost":{"memoryFragments":10},"give":{"antiAmulet":1},"next":"loc_under_di"},
      {"label":"购买：炼金炸弹（8）","cost":{"memoryFragments":8},"give":{"alchemyBomb":1},"next":"loc_under_di"},
      {"label":"购买：稀有矿石（5，每日限1）","next":"di_ore"},
      {"label":"购买：符文碎片（6）","cost":{"memoryFragments":6},"give":{"runeFragment":1},"next":"loc_under_di"},
      {"label":"购买：破符水（11）","cost":{"memoryFragments":11},"give":{"brokenRune":1},"next":"loc_under_di"},
      {"label":"购买：歪耳朵的地精布偶（3）","cost":{"memoryFragments":3},"give":{"goblinDoll":1},"next":"loc_under_di"},
      {"label":"兑换：纯净污染结晶 → 8 记忆碎片","cost":{"pureCrystal":1},"next":"di_exchange1"},
      {"label":"兑换：晶骸残片 ×2 → 污染净化器","cost":{"crystalFragment":2},"give":{"purifier":1},"next":"loc_under_di"},
      {"label":"与老地精战斗","next":"di_haggle"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "di_ore":
  [
    {"type":"dailyauto","flag":"diOre","notDone":"di_ore_buy","done":"di_ore_sold"}
  ],
  "di_ore_buy":
  [
    {"type":"choice","options":
    [
      {"label":"支付 5 记忆碎片","cost":{"memoryFragments":5},"give":{"rareOre":1},"next":"di_ore_done"},
      {"label":"再想想","next":"loc_under_di"}
    ]}
  ],
  "di_ore_done":
  [
    {"type":"effect","dailyFlag":"diOre"},
    {"type":"jump","goto":"loc_under_di"}
  ],
  "di_ore_sold":
  [
    {"type":"narrator","text":"老地精摆摆手：“矿石今天卖光了，明天赶早。”"},
    {"type":"jump","goto":"loc_under_di"}
  ],
  "di_exchange1":
  [
    {"type":"effect","memoryDelta":8},
    {"type":"jump","goto":"loc_under_di"}
  ],
  "di_haggle":
  [
    {"type":"battle","id":"haggle","success":"di_haggle_ok","fail":"di_haggle_priceup","cancel":"di_haggle_cancel","url":"game3.html?mode=forest"}
  ],
  "di_haggle_ok":
  [
    {"type":"narrator","text":"你打赢了老地精。“你比大公派来的人有意思。”老地精大笑，本日全部商品都便宜了。"},
    {"type":"effect","otherAffection":{"under":3}},
    {"type":"freedomReturn"}
  ],
  "di_haggle_priceup":
  [
    {"type":"narrator","text":"你输给了老地精。他得意地哼了一声，本日全部商品都涨价了。"},
    {"type":"freedomReturn"}
  ],
  "di_haggle_cancel":
  [
    {"type":"narrator","text":"你打消了讲价的念头。老地精掉头就走，今天不再跟你交易。"},
    {"type":"freedomReturn"}
  ],

  "loc_under_jiu":
  [
    {"type":"narrator","text":"熔岩酒吧里酒气熏天，矿工们围着桌子大声划拳。"},
    {"type":"choice","options":
    [
      {"label":"请矿工喝酒（3 记忆碎片）","cost":{"memoryFragments":3},"next":"jiu_drink"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "jiu_drink":
  [
    {"type":"chance","prob":0.33,"pass":"jiu_intel1","fail":"jiu_drink2"}
  ],
  "jiu_drink2":
  [
    {"type":"chance","prob":0.5,"pass":"jiu_intel2","fail":"jiu_intel3"}
  ],
  "jiu_intel1":
  [
    {"type":"narrator","text":"喝高了的矿工压低声音，讲起了一条没人走的小路。"},
    {"type":"effect","addIntels":["一条侧路"],"otherAffection":{"under":2}},
    {"type":"freedomReturn"}
  ],
  "jiu_intel2":
  [
    {"type":"narrator","text":"矿工说起大公的晶化卫兵，语气里全是忌惮。"},
    {"type":"effect","addIntels":["晶化卫兵不睡"],"otherAffection":{"under":2}},
    {"type":"freedomReturn"}
  ],
  "jiu_intel3":
  [
    {"type":"narrator","text":"矿工盯着酒杯，说出了熔炉火种熄灭的真相。"},
    {"type":"effect","addIntels":["火种是谁掐的"],"otherAffection":{"under":2}},
    {"type":"freedomReturn"}
  ],

  "loc_under_shen":
  [
    {"type":"narrator","text":"深暗裂隙紧邻熔岩湖，一只晶骸盘踞在出口处，身上的结晶映着湖面的光。"},
    {"type":"choice","options":
    [
      {"label":"与晶骸战斗","next":"shen_battle"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "shen_battle":
  [
    {"type":"battle","id":"rift","success":"shen_win","fail":"shen_lose","url":"game3.html?mode=forest"}
  ],
  "shen_win":
  [
    {"type":"narrator","text":"晶骸倒下，结晶碎了一地。你捡起最亮的那几块。"},
    {"type":"effect","addItems":{"crystalFragment":3,"highPurityCrystal":1},"memoryDelta":6,"otherAffection":{"under":5}},
    {"type":"freedomReturn"}
  ],
  "shen_lose":
  [
    {"type":"narrator","text":"晶骸把你撞飞出去，你伤得不轻。"},
    {"type":"effect","hpDelta":-25},
    {"type":"freedomReturn"}
  ],

  "loc_under_hui":
  [
    {"type":"flagauto","flag":"huiPhase","routes":{"log":"hui_phase_log","done":"hui_phase_done"},"default":"hui_phase_first"}
  ],
  "hui_phase_first":
  [
    {"type":"narrator","text":"灰烬实验室外静得吓人，只有晶化卫兵的脚步声在廊道里回荡。"},
    {"type":"choice","options":
    [
      {"label":"潜入灰烬实验室","next":"hui_infiltrate"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "hui_phase_log":
  [
    {"type":"narrator","text":"灰烬实验室里静悄悄的，你记得那份日志的位置。"},
    {"type":"choice","options":
    [
      {"label":"读实验日志","next":"hui_log_read"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "hui_phase_done":
  [
    {"type":"narrator","text":"你已经把实验室摸透了，没有什么新东西了。"},
    {"type":"freedomReturn"}
  ],
  "hui_infiltrate":
  [
    {"type":"infiltration","id":"lab","success":"hui_infil_ok","fail":"hui_infil_fail","url":"game4.html?mode=forest"}
  ],
  "hui_infil_ok":
  [
    {"type":"narrator","text":"你成功摸清了实验室的每一个角落。"},
    {"type":"effect","otherAffection":{"under":15},"flags":{"huiPhase":"log"}},
    {"type":"freedomReturn"}
  ],
  "hui_infil_fail":
  [
    {"type":"narrator","text":"你被晶化卫兵赶了出来，格里姆似乎并不意外。"},
    {"type":"effect","otherAffection":{"under":8}},
    {"type":"freedomReturn"}
  ],
  "hui_log_read":
  [
    {"type":"narrator","text":"你翻到实验日志：第七十一号→第七十二号→第七十三号（莉亚的编号，备注只有“保留”）→未编号的“下一阶段：活体提取。对象——无翼者。”"},
    {"type":"effect","otherAffection":{"under":10},"flags":{"huiPhase":"done"}},
    {"type":"freedomReturn"}
  ],

  "loc_under_tong":
  [
    {"type":"narrator","text":"铜齿街区的匠铺里火星四溅，铜齿匠人抬头看了你一眼。"},
    {"type":"choice","options":
    [
      {"label":"向铜齿匠人赊账（1 纯净污染结晶 → 2 符文碎片）","cost":{"pureCrystal":1},"give":{"runeFragment":2},"next":"tong_debt"},
      {"label":"打听大公的近况","next":"tong_intel"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "tong_debt":
  [
    {"type":"char","role":"npc","speaker":"铜齿匠人","text":"赊账？可以。但你得答应我，别在下面闹出人命——大公收账的时候，连死人的账都算。"},
    {"type":"freedomReturn"}
  ],
  "tong_intel":
  [
    {"type":"flagauto","flag":"tongIntelDone","routes":{"true":"tong_intel_again"},"default":"tong_intel_first"}
  ],
  "tong_intel_first":
  [
    {"type":"char","role":"npc","speaker":"铜齿匠人","text":"他往灰烬实验室那边调了两批卫兵，全是晶化过的。以前他不用那些东西看家。"},
    {"type":"effect","addIntels":["大公最近的动静"],"flags":{"tongIntelDone":true},"otherAffection":{"under":3}},
    {"type":"freedomReturn"}
  ],
  "tong_intel_again":
  [
    {"type":"narrator","text":"匠人忙着敲打手里的铜片，没空再搭理你。"},
    {"type":"freedomReturn"}
  ],

  "loc_under_hu":
  [
    {"type":"narrator","text":"你沿着矿道的边缘往下走，脚下的岩石从暗红变成橙红，最后变成一种几乎发白的亮。热浪从下面翻上来，把你额前的头发吹得往后倒。熔岩湖就在你脚下——它没有波浪，只有一层缓慢流动的、覆盖了整个洞窟底部的光。光在动，但它不动。"},
    {"type":"narrator","text":"你站在那里看了很久。然后你发现，岩壁上挂着一条铁链，一端没入熔岩里，另一端连着上面那道被锁住的裂隙。铁链已经被烧得发红，但它没有断。"},
    {"type":"narrator","text":"你忽然想起那条链子上的符文，和你在契约书上见过的一模一样。原来大公锁住的不只是那道缝，他还把整片熔岩都算进了账里。"},
    {"type":"narrator","text":"热浪又翻上来一次。你退后两步，转身往回走。走出很远之后你才意识到，那片湖从头到尾，一声都没有响过。"},
    {"type":"freedomReturn"}
  ],

  /* ============ 精灵之森 ============ */
  "loc_forest_de":
  [
    {"type":"narrator","text":"德鲁伊环阵里的藤蔓缠绕成圈，空气里浮着细小的孢子。"},
    {"type":"choice","options":
    [
      {"label":"用结晶换苔藓种子（1 纯净污染结晶 + 3 记忆碎片）","cost":{"pureCrystal":1,"memoryFragments":3},"give":{"cleanMoss":1},"next":"de_exchange"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "de_exchange":
  [
    {"type":"narrator","text":"你交出了结晶，得到一小捧能净化污染的苔藓。"},
    {"type":"freedomReturn"}
  ],

  "loc_forest_sheng":
  [
    {"type":"narrator","text":"古树圣殿的穹顶是交错的枝干，女王坐在藤蔓王座上，很久没有说话。"},
    {"type":"choice","options":
    [
      {"label":"面见女王","next":"sheng_queen"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "sheng_queen":
  [
    {"type":"char","role":"npc","speaker":"女王","text":"你还活着。"},
    {"type":"effect","affection":2},
    {"type":"freedomReturn"}
  ],

  "loc_forest_dong":
  [
    {"type":"narrator","text":"回声洞穴把每一点声响都放大又回放，像有无数个自己在应答。"},
    {"type":"choice","options":
    [
      {"label":"学首歌（回声）","next":"dong_song"},
      {"label":"和艾拉瑞亚一起来这里","next":"dong_elarria"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "dong_song":
  [
    {"type":"skillcheck","id":"echo","success":"dong_song_ok","fail":"dong_song_partial","url":"game8.html?mode=forest"}
  ],
  "dong_song_ok":
  [
    {"type":"narrator","text":"你完整地复现了那三段旋律，学会了回声的歌。"},
    {"type":"effect","addStatuses":["回声的歌"],"affection":10},
    {"type":"freedomReturn"}
  ],
  "dong_song_partial":
  [
    {"type":"narrator","text":"你只记下了部分旋律。"},
    {"type":"effect","affection":5},
    {"type":"freedomReturn"}
  ],
  "dong_elarria":
  [
    {"type":"auto","options":
    [
      {"min":40,"max":9999,"next":"dong_elarria_flag"},
      {"min":-9999,"max":39,"next":"dong_elarria_deny"}
    ]}
  ],
  "dong_elarria_flag":
  [
    {"type":"flagauto","flag":"dongElarriaDone","routes":{"true":"dong_elarria_deny"},"default":"dong_elarria_do"}
  ],
  "dong_elarria_do":
  [
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"原来我的名字听起来是这样的。"},
    {"type":"effect","affection":15,"addStatuses":["她听过自己的名字"],"flags":{"dongElarriaDone":true}},
    {"type":"freedomReturn"}
  ],
  "dong_elarria_deny":
  [
    {"type":"narrator","text":"艾拉瑞亚奇怪地看着你，不明白你为什么要再去那个地方。"},
    {"type":"freedomReturn"}
  ],

  "loc_forest_gen":
  [
    {"type":"narrator","text":"古树的根系从地下隆起，像一条条交错的巨蟒。"},
    {"type":"choice","options":
    [
      {"label":"采集苔藓","next":"gen_moss"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "gen_moss":
  [
    {"type":"minigame","id":"gen_moss","success":"gen_moss_win","fail":"gen_moss_fail","game":"mossSeal"}
  ],
  "gen_moss_win":
  [
    {"type":"narrator","text":"你采到了三处苔藓。"},
    {"type":"effect","addItems":{"wildMoss":3},"affection":2},
    {"type":"freedomReturn"}
  ],
  "gen_moss_fail":
  [
    {"type":"narrator","text":"你没能采到足够的苔藓，只能先退回来。"},
    {"type":"freedomReturn"}
  ],

  "loc_forest_zhao":
  [
    {"type":"narrator","text":"腐根沼泽里弥漫着腐烂的气味，一只晶化幼鹿在泥沼边徘徊。"},
    {"type":"choice","options":
    [
      {"label":"采集苔藓（完整版）","next":"zhao_moss"},
      {"label":"攻击晶化幼鹿","next":"zhao_deer"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "zhao_moss":
  [
    {"type":"minigame","id":"zhao_moss","success":"zhao_moss_win","fail":"zhao_moss_fail","game":"mossSeal"}
  ],
  "zhao_moss_win":
  [
    {"type":"narrator","text":"你小心翼翼地采到了四处苔藓。"},
    {"type":"effect","addItems":{"wildMoss":4}},
    {"type":"freedomReturn"}
  ],
  "zhao_moss_fail":
  [
    {"type":"narrator","text":"你没能采到足够的苔藓，只能先退回来。"},
    {"type":"freedomReturn"}
  ],
  "zhao_deer":
  [
    {"type":"battle","id":"deer","success":"zhao_deer_kill","fail":"zhao_deer_release","url":"game3.html?mode=forest"}
  ],
  "zhao_deer_kill":
  [
    {"type":"narrator","text":"你杀死了晶化幼鹿。艾拉瑞亚站在远处，什么也没说。"},
    {"type":"effect","addItems":{"crystalFragment":2,"highPurityCrystal":1},"affection":-10},
    {"type":"freedomReturn"}
  ],
  "zhao_deer_release":
  [
    {"type":"narrator","text":"你放走了幼鹿。它踉跄着跑进林子里，艾拉瑞亚朝你点了点头。"},
    {"type":"effect","affection":15},
    {"type":"freedomReturn"}
  ],

  "loc_forest_chen":
  [
    {"type":"narrator","text":"晨叶镇的精灵们三三两两地聚在树屋里，见你来了都好奇地张望。"},
    {"type":"choice","options":
    [
      {"label":"购买精灵器物","next":"chen_shop"},
      {"label":"和镇口的老精灵聊天","next":"chen_chat"},
      {"label":"离开","next":"loc_leave"}
    ]}
  ],
  "chen_shop":
  [
    {"type":"choice","options":
    [
      {"label":"半净化的苔藓（4）","cost":{"memoryFragments":4},"give":{"halfMoss":1},"next":"chen_shop"},
      {"label":"净化苔藓（10）","cost":{"memoryFragments":10},"give":{"cleanMoss":1},"next":"chen_shop"},
      {"label":"基础治疗药剂（4）","cost":{"memoryFragments":4},"give":{"basicPotion":1},"next":"chen_shop"},
      {"label":"符文碎片（7）","cost":{"memoryFragments":7},"give":{"runeFragment":1},"next":"chen_shop"},
      {"label":"野生苔藓（3）","cost":{"memoryFragments":3},"give":{"wildMoss":1},"next":"chen_shop"},
      {"label":"返回","next":"loc_forest_chen"}
    ]}
  ],
  "chen_chat":
  [
    {"type":"flagauto","flag":"chenChatDone","routes":{"true":"chen_chat_again"},"default":"chen_chat_first"}
  ],
  "chen_chat_first":
  [
    {"type":"char","role":"npc","speaker":"老精灵","text":"女王的账本上，这片林子还剩两年半。她说三年，是怕我们跑。"},
    {"type":"effect","addIntels":["镇上的人怎么说"],"affection":5,"flags":{"chenChatDone":true}},
    {"type":"freedomReturn"}
  ],
  "chen_chat_again":
  [
    {"type":"narrator","text":"你与老精灵们相谈甚欢，他们告诉了你森林里很多有趣的事。"},
    {"type":"effect","affection":5},
    {"type":"freedomReturn"}
  ],

  /* ============ 废墟驿站 ============ */
  "loc_ruins":
  [
    {"type":"narrator","text":"废墟驿站静立在四座城池的中央。四位好友已经等在这里了——这大概就是终局峰会。"},
    {"type":"choice","options":
    [
      {"label":"查看奥德里克","next":"ruins_aldric"},
      {"label":"查看赛琳","next":"ruins_celine"},
      {"label":"查看艾拉瑞亚","next":"ruins_elarria"},
      {"label":"查看格里姆","next":"ruins_grim"},
      {"label":"离开驿站","next":"loc_leave"}
    ]}
  ],
  "ruins_aldric":
  [
    {"type":"otherauto","faction":"empire","min":31,"pass":"ruins_aldric_talk","fail":"ruins_aldric_only"}
  ],
  "ruins_aldric_talk":
  [
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你也来这里散心了？"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我们明天就要出发了，你准备好了没有？"},
    {"type":"jump","goto":"loc_ruins"}
  ],
  "ruins_aldric_only":
  [
    {"type":"narrator","text":"奥德里克站在驿站边，只是朝你点了点头。"},
    {"type":"jump","goto":"loc_ruins"}
  ],
  "ruins_celine":
  [
    {"type":"otherauto","faction":"sky","min":31,"pass":"ruins_celine_talk","fail":"ruins_celine_only"}
  ],
  "ruins_celine_talk":
  [
    {"type":"char","role":"npc","speaker":"赛琳","text":"你怎么也在这里？我是背着长老会偷偷溜出来的，我知道了很多事情，这一切……"},
    {"type":"char","role":"npc","speaker":"赛琳","text":"不好，他们追过来了，我要回去了，你一定要找过来！"},
    {"type":"jump","goto":"loc_ruins"}
  ],
  "ruins_celine_only":
  [
    {"type":"narrator","text":"赛琳站在远处，欲言又止。"},
    {"type":"jump","goto":"loc_ruins"}
  ],
  "ruins_elarria":
  [
    {"type":"auto","options":
    [
      {"min":31,"max":9999,"next":"ruins_elarria_talk"},
      {"min":-9999,"max":30,"next":"ruins_elarria_only"}
    ]}
  ],
  "ruins_elarria_talk":
  [
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"？你怎么在这。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"不，这不是我真身……有树有泥土的地方你都可以看见我。"},
    {"type":"jump","goto":"loc_ruins"}
  ],
  "ruins_elarria_only":
  [
    {"type":"narrator","text":"艾拉瑞亚站在一丛野花旁，安静地没有出声。"},
    {"type":"jump","goto":"loc_ruins"}
  ],
  "ruins_grim":
  [
    {"type":"otherauto","faction":"under","min":31,"pass":"ruins_grim_talk","fail":"ruins_grim_only"}
  ],
  "ruins_grim_talk":
  [
    {"type":"char","role":"npc","speaker":"格里姆","text":"你带着莉亚逃出去了？"},
    {"type":"char","role":"npc","speaker":"格里姆","text":"太好了……但好像这个通讯维持不了多久，我这边也没事的。"},
    {"type":"jump","goto":"loc_ruins"}
  ],
  "ruins_grim_only":
  [
    {"type":"narrator","text":"格里姆的信号不太稳定，只能勉强看见他的身影。"},
    {"type":"jump","goto":"loc_ruins"}
  ],
  "chapter4_start":
  [
    {"type":"title","chapter":"第四章","subtitle":"古树之下"},
    {"type":"narrator","text":"你靠在古树根部，不知等了多久。森林里的光从靛蓝变成更深的黑，又从黑变成极淡的灰。你忽然听到地底深处传来一阵低沉的震动。"},
    {"type":"narrator","text":"裂缝里那道极细的绿色光雾忽然亮了一度，然后你听到一个声音从深处传来。很轻，像枯叶被踩碎。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚（从裂缝中）","text":"……你在上面吗？"},
    {"type":"narrator","text":"你把手按在裂缝边缘，绿色光雾停留一瞬，缩了回去。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"好，我知道了。"},
    {"type":"narrator","text":"震动停了，攀爬声从深处传来，越来越近。一只手从裂缝里伸出，抓住边缘。"},
    {"type":"narrator","text":"艾拉瑞亚爬出来，她浑身是泥，长发散乱，脖颈上的黑色纹路蔓延到脸颊两侧。右臂上一道很深的伤口，血已凝固，和纹路混在一起。"},
    {"type":"narrator","text":"她坐在地上，喘了很久，然后抬头看你，忽然笑了。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我回来了。"},
    {"type":"title","chapter":"第一幕","subtitle":"裂缝之中"},
    {"type":"narrator","text":"你想扶她，她轻轻推开你的手。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"别碰，我身上的污染比之前更浓了。"},
    {"type":"narrator","text":"她低头看手，掌心绿色光在消退。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"下面不是树根，是通道。很长的、向下延伸的通道。我走了很久。"},
    {"type":"narrator","text":"她靠在古树根部，闭上眼。呼吸很浅，带细微金属摩擦声。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"通道尽头是一扇门，门另一边……是一个神奇的装置，旁边的图纸叫它，锁神装置。"},
    {"type":"narrator","text":"她睁开眼看你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"那是你们天空之城神明索尔温被囚禁的地方，我是通过根脉看到的。古树的根一直延伸到装置下面，吸收它渗出的东西，污染，能量，还有……祂的声音。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"祂在叫我，不是叫我的名字，是叫“黑根者”。祂说——“你终于来了。”"},
    {"type":"choice","options":[{"label":"“然后呢？你做了什么？”","next":"chapter4_ask"},{"label":"“你受伤了，先处理伤口。”","next":"chapter4_treat"},{"label":"沉默，把手放在她肩上。","next":"chapter4_touch"}]}
  ],
  "chapter4_ask":
  [
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我什么都没做，我站在门口听祂说。祂说祂不是故意污染世界的，祂被囚禁时意识碎了。碎片从装置里渗出，顺着根脉往上爬，祂控制不了。"},
    {"type":"narrator","text":"她低下头。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"祂还说：“如果你愿意留下来，我可以教你控制那些碎片。你可以成为新的根脉。”"},
    {"type":"narrator","text":"她抬头看你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我拒绝了。"},
    {"type":"char","role":"player","speaker":"你","text":"为什么？"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"因为我想回来，作为我自己。"},
    {"type":"narrator","text":"她看着你，表情平静。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"祂说的每句话都很有道理，但我在想一件事。"},
    {"type":"narrator","text":"她停顿了一下。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我在想你还在上面等我，你说过，疼就说出来，我现在好疼好疼，我想回来说。"},
    {"type":"effect","affection":10},
    {"type":"jump","goto":"chapter4_seal"}
  ],
  "chapter4_treat":
  [
    {"type":"narrator","text":"你从腰间取出基础治疗药剂递给她，她沉默了一会儿，接过去。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"……你不问我在下面看到了什么？"},
    {"type":"char","role":"player","speaker":"你","text":"你回来就好，先止血。"},
    {"type":"narrator","text":"她把药剂倒在伤口上，药液接触伤口发出轻微嘶嘶声，黑色纹路在边缘蠕动了一下，慢慢缩回。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你比我想的会照顾人。"},
    {"type":"narrator","text":"她抬头，脸色好了些，但仍然很苍白。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"下面是一扇门，门后是一个神奇的装置，旁边的图纸叫它，锁神装置。你们天空之城的神明索尔温在那边，祂在叫我......但我没进去，我回来了。"},
    {"type":"effect","affection":8,"removeItems":{"basicPotion":1}},
    {"type":"jump","goto":"chapter4_seal"}
  ],
  "chapter4_touch":
  [
    {"type":"narrator","text":"你轻轻把手放在她肩上，她没有推开你。她低下头，肩膀微颤。"},
    {"type":"narrator","text":"你们坐了很久，地面又震动了，裂口那圈绿色比昨天更淡。风穿过树冠，带泥土和青草的气味。"},
    {"type":"narrator","text":"过了很久，她开口。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"下面是一扇门。门后面是一个神奇的装置，旁边的图纸叫它，锁神装置。你们天空之城的神明索尔温在那边，祂叫我留下来成为新的根脉......但我拒绝了。"},
    {"type":"char","role":"player","speaker":"你","text":"为什么？"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"因为我答应过一个人，疼就说出来，我还没说。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我还答应过他，要作为我自己活着回来。"},
    {"type":"effect","affection":12},
    {"type":"jump","goto":"chapter4_seal"}
  ],
  "chapter4_seal":
  [
    {"type":"narrator","text":"那天傍晚，艾拉瑞亚把你叫到古树背面的裂缝前。裂缝更大了，绿色光雾涌出来，更亮也更不稳定，像有什么在燃烧自己。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"索尔温说，锁神装置的封印快撑不住了。裂开的话，污染会从地底涌出来，不只是这片森林，是整个大陆。"},
    {"type":"narrator","text":"她看着你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"但祂给了我一个办法，如果有一个人愿意进入装置核心，用身体堵住裂缝，或许封印可以再撑一段时间。可能一百年，可能更久。"},
    {"type":"narrator","text":"她停顿了一下。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"但祂说的不是“献祭”，是“融合”。我的身体会留在装置里，但意识可以顺着根脉回来，回到森林里。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"就像变成一棵树，树干不动，但根可以延伸。"},
    {"type":"title","chapter":"第二幕","subtitle":"圣殿的回应"},
    {"type":"narrator","text":"你带着艾拉瑞亚回到圣殿，女王坐在藤蔓王座上看着你们。她的目光在艾拉瑞亚身上停留很久——从她脖颈上的黑色纹路扫到脸颊两侧，最后落在她眼睛上。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"你下去了。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我下去了，也回来了。"},
    {"type":"narrator","text":"女王沉默了一会儿，然后站起来，走到艾拉瑞亚面前，伸出手，指尖轻轻触碰她脸颊上的黑色纹路。纹路在她指尖下微微搏动了一下。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"你身上的东西比以前更浓了，再这样下去，你撑不了多久。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我知道。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"但你没死，你回来了。"},
    {"type":"narrator","text":"女王收回手，她看着你，表情没有变化，你感觉到她在重新评估你。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"古树选了你，它让你进去，它叫你的名字。这是因为你身上带着抗性，和污染同源，但方向相反。"},
    {"type":"narrator","text":"她停顿了一下。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"索尔温给了你什么？"},
    {"type":"choice","options":[{"label":"“祂没有给我什么，祂在等。”","next":"chapter4_queen_wait"},{"label":"“祂给了我们一个选择。”","next":"chapter4_queen_choice"},{"label":"沉默。","next":"chapter4_queen_silent"}]}
  ],
  "chapter4_queen_wait":
  [
    {"type":"narrator","text":"精灵女王看着你，眼睛微微眯了一下。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"等？"},
    {"type":"char","role":"player","speaker":"你","text":"等我们做决定，祂没有强迫任何人，祂只是说了祂知道的事。"},
    {"type":"narrator","text":"女王沉默了很久，然后转过身，走回王座。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"三千年前，祂也是这么说的。“我只是说了我知道的事。”然后羽人皇室把祂锁了起来。"},
    {"type":"narrator","text":"她坐下，目光落在艾拉瑞亚身上。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"你想怎么做？"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我想回去，走进那个装置，用我的身体堵住裂缝。"},
    {"type":"effect","affection":10},
    {"type":"jump","goto":"chapter4_father"}
  ],
  "chapter4_queen_choice":
  [
    {"type":"char","role":"npc","speaker":"精灵女王","text":"选择？"},
    {"type":"char","role":"player","speaker":"你","text":"艾拉瑞亚可以进入装置核心，用身体堵住裂缝。但她的意识可以顺着根脉回来，重新回到森林里。"},
    {"type":"narrator","text":"女王看着艾拉瑞亚，沉默了很久。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"你愿意？"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我愿意。"},
    {"type":"narrator","text":"女王闭上眼，过了一会儿，她睁开眼。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"三千年前，我祖先也做过同样的选择。他们用身体堵住了裂缝，但这也只是暂时的，你们要清楚，可能一百年，可能更短，然后一切又会重来。"},
    {"type":"narrator","text":"她站起来。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"但如果有一个人愿意试，那就试吧。"},
    {"type":"effect","affection":15},
    {"type":"jump","goto":"chapter4_father"}
  ],
  "chapter4_queen_silent":
  [
    {"type":"narrator","text":"你没有回答，女王看着你，等了很久，然后她摇了摇头。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"你不说话，那就让黑根者说。"},
    {"type":"narrator","text":"她转向艾拉瑞亚。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"你去了古树下面，你看到了锁神装置，你打算怎么做？"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我想回去进到那个装置里去，用我的身体去堵住裂缝。"},
    {"type":"narrator","text":"女王看着她，沉默了很久。然后转过身，走回王座。"},
    {"type":"char","role":"npc","speaker":"精灵女王","text":"那就去吧，但记住，你一旦进去了，就不再是精灵了，你只是根脉的一部分。"},
    {"type":"effect","affection":5},
    {"type":"jump","goto":"chapter4_father"}
  ],
  "chapter4_father":
  [
    {"type":"title","chapter":"第三幕","subtitle":"父亲的真相"},
    {"type":"narrator","text":"那天深夜，你回到古树根部。艾拉瑞亚在裂缝前，手按边缘，绿色光雾在她指尖流动。"},
    {"type":"narrator","text":"你听到脚步声。一个身影从树影中走出。翅膀收拢，右翼残缺，左翼布满黑色结晶。半边脸覆盖黑色纹路，头发花白，身形消瘦，眼睛和你一样。"},
    {"type":"narrator","text":"他是艾德蒙，你的父亲。"},
    {"type":"narrator","text":"他站在几步外，目光从你脸上移到艾拉瑞亚身上，再移到裂缝上。他没有说话。艾拉瑞亚抬头看他，表情未变，但手腕上的黑色纹路忽然亮了一下。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你是谁？"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"我叫艾德蒙，风行者的艾德蒙，你可能没听过。"},
    {"type":"narrator","text":"艾拉瑞亚看着他，然后看向你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你认识他。"},
    {"type":"narrator","text":"你没有说话，艾德蒙走近一步，站在裂缝前，低头看着绿色光雾，表情平静。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"二十年前，我来过这片森林。古树的裂口只有指甲盖大，我来找锁神装置的入口。我找到了，然后下去了。"},
    {"type":"narrator","text":"他抬起头，看着艾拉瑞亚。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"很抱歉我没能堵住裂缝。我只是激活了装置。污染从此蔓延。"},
    {"type":"narrator","text":"他转身看你。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"现在轮到你了。"},
    {"type":"choice","options":[{"label":"“你为什么要激活装置？”","next":"chapter4_father_why"},{"label":"“你打算怎么做？”","next":"chapter4_father_plan"},{"label":"沉默。","next":"chapter4_father_silent"}]}
  ],
  "chapter4_father_why":
  [
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"我想毁掉它。"},
    {"type":"narrator","text":"他看着裂缝里的绿色光雾。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"我以为毁掉装置，索尔温就能自由，祂会感激我的。但我错了。祂已经疯了。三千年的囚禁让祂只剩恨，我释放的不是神，是被折磨了三千年的囚徒。"},
    {"type":"narrator","text":"他停顿了一下。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"所以我逃了，把自己关在锁神装置里研究了二十年，试图找到既不释放祂也不永远囚禁祂的方法，我失败了。"},
    {"type":"narrator","text":"他抬头看你。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"但你没有，你找到了第三种可能，艾拉瑞亚的身体可以堵住裂缝，同时保留意识，这是我二十年前没想到的。"},
    {"type":"effect","affection":5},
    {"type":"jump","goto":"chapter4_final_prep"}
  ],
  "chapter4_father_plan":
  [
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"我什么都不打算做，只是来看你。"},
    {"type":"narrator","text":"他走到你面前，脚步很慢，像用尽最后的力气。他抬起手，手掌上有和艾拉瑞亚一样的黑色纹路，微微搏动，和古树同频。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"我来告诉你一件事，关于你，关于索尔温。"},
    {"type":"narrator","text":"他停顿了一下。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"索尔温不是神，祂是第一个“黑根者”。三千年前，祂用自己的身体堵住了这道裂缝，但没能回来。羽人皇室把祂的牺牲变成囚禁，把祂的意识封进装置，汲取祂的能量。"},
    {"type":"narrator","text":"他看着你，眼睛和你一样。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"所以艾拉瑞亚进去，不是当祭品，是做索尔温三千年前做过的事。但这一次，她可以回来，因为索尔温会帮她。"},
    {"type":"effect","affection":10},
    {"type":"jump","goto":"chapter4_final_prep"}
  ],
  "chapter4_father_silent":
  [
    {"type":"narrator","text":"你没有说话，艾德蒙看着你，等了很久。然后他笑了，笑容很浅，眼睛是湿的。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"你和我一样沉默，但你比我勇敢，你站在这里，没有跑。"},
    {"type":"narrator","text":"他走到裂缝前，把手按在边缘。绿色光雾在他指尖停留一瞬，然后缩回。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"我明天去锁神装置，在那边等你们。如果艾拉瑞亚决定进去，我会告诉她怎么找到核心。"},
    {"type":"narrator","text":"他转身消失在树影中。"},
    {"type":"effect","affection":3},
    {"type":"jump","goto":"chapter4_final_prep"}
  ],
  "chapter4_final_prep":
  [
    {"type":"narrator","text":"那天深夜，艾拉瑞亚站在古树根部的裂口前，看着越来越淡的绿色。你站在她旁边。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你父亲说的，索尔温是第一个黑根者，祂用自己的身体堵住裂缝。然后羽人皇室把祂的牺牲变成了囚禁。"},
    {"type":"narrator","text":"她转身看你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"如果我进去，我不是去当祭品。我是去做索尔温做过的事。而且我可以回来。"},
    {"type":"narrator","text":"她的手很凉，但掌心有一丝微温。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你相信我吗？"},
    {"type":"choice","options":[{"label":"“我相信你。”","next":"chapter4_believe"},{"label":"“我跟你一起去。”","next":"chapter4_go_together"},{"label":"沉默，把手放在她肩上。","next":"chapter4_silent_support"}]}
  ],
  "chapter4_believe":
  [
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"好。"},
    {"type":"narrator","text":"她松开手，退后一步。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"那明天我去锁神装置，你在这里等我，我会回来的。"},
    {"type":"jump","goto":"chapter4_final_choice"}
  ],
  "chapter4_go_together":
  [
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"不行，装置内部只有黑根者能进去。你有抗性，但没有根脉连接。会被污染吞掉。"},
    {"type":"char","role":"player","speaker":"你","text":"那我在外面等你。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"……好。"},
    {"type":"effect","affection":5},
    {"type":"jump","goto":"chapter4_final_choice"}
  ],
  "chapter4_silent_support":
  [
    {"type":"narrator","text":"她没有推开，低下头，肩膀微微颤抖。你们在一起站了很久。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我不知道能不能活着回来，但我会试试。"},
    {"type":"effect","affection":8},
    {"type":"jump","goto":"chapter4_final_choice"}
  ],
  "chapter4_final_choice":
  [
    {"type":"title","chapter":"第四幕","subtitle":"终局献祭抉择"},
    {"type":"narrator","text":"你站在锁神装置前，巨大的黑色晶石柱阵矗立在地下深处的空腔中。索尔温的碎片在晶柱中蠕动——像无数挣扎的影子。"},
    {"type":"narrator","text":"艾拉瑞亚站在装置边缘，她的身体在发光。浅淡的绿光从皮肤下渗出，和黑色纹路交织，她的脚已变成根脉，正向装置核心延伸。"},
    {"type":"narrator","text":"她转头看你，脸还是她的脸，但眼睛变成了墨绿色，和古树裂口上的那圈一样。艾拉瑞亚：“我到了，索尔温在等我。”"},
    {"type":"narrator","text":"她伸出手，你握住了。她的手是温的，像刚泡过水的树根。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"现在你要决定。你打算怎么做？"},
    {"type":"choice","options":[{"label":"让她进入装置核心。","next":"final_elarria"},{"label":"代替她进入装置核心。","next":"final_self"},{"label":"拒绝献祭，摧毁装置。","next":"final_destroy"}]}
  ],
  "final_elarria":
  [
    {"type":"narrator","text":"你松开手，她看着你笑了笑。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"好。"},
    {"type":"narrator","text":"她转身走向装置核心，脚步很稳。她走进那片绿色光芒中，光芒吞没了她。"},
    {"type":"narrator","text":"你听到她的声音从光芒中传出——很轻，像远方的风。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我回来了，在根脉里。你听——听得到吗？"},
    {"type":"narrator","text":"你把手按在古树根部，你听到了。地底深处，那个声音又响了。只是这次是她的声，是她在唱歌，唱的是你在回声洞穴里听过的那首。"},
    {"type":"narrator","text":"进入结局【根脉之誓】。"},
    {"type":"effect","flags":{"finalChoice":"elarria","noSacrifice":false}},
    {"type":"jump","goto":"ending_root_vow"}
  ],
  "final_self":
  [
    {"type":"narrator","text":"你走上前，她看着你，眼睛睁大了。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"不行，你不是黑根者，你进去会被——"},
    {"type":"char","role":"player","speaker":"你","text":"我说过，疼就说出来。你说了你疼，那这次就让我来感同身受。"},
    {"type":"narrator","text":"她看着你，沉默了很久，然后眼睛湿了。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你为什么要这样？"},
    {"type":"char","role":"player","speaker":"你","text":"因为你答应了要回来，我替你去，你留在上面，替我回家。"},
    {"type":"narrator","text":"她抓住你的手，她的手指在发抖。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"……好，但你要答应我一件事。"},
    {"type":"char","role":"player","speaker":"你","text":"什么？"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"如果你出不来，我会在根脉里等你，等到你回来。"},
    {"type":"narrator","text":"你走进装置核心，绿色光芒吞没了你。你听到她的声音从外面传来，是她在唱歌，唱的是那首你们都听过的歌。"},
    {"type":"narrator","text":"进入结局【根脉囚徒】。"},
    {"type":"effect","flags":{"finalChoice":"self","noSacrifice":false}},
    {"type":"jump","goto":"ending_root_prisoner"}
  ],
  "final_destroy":
  [
    {"type":"narrator","text":"你举起武器，艾拉瑞亚看着你。她的表情没有变化。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你要毁掉它？"},
    {"type":"char","role":"player","speaker":"你","text":"我不需要任何人献祭，我不需要你变成根脉，我不需要索尔温，我要毁掉这个东西。"},
    {"type":"narrator","text":"她看着你。沉默了很久。然后她点了点头。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"好，那我帮你。"},
    {"type":"effect","flags":{"finalChoice":"destroy"}},
    {"type":"battle","id":"forest_final","success":"final_destroy_success","fail":"final_destroy_fail","game":"final"}
  ],
  "final_destroy_success":
  [
    {"type":"effect","flags":{"finalBattleSuccess":true,"elarriaAlive":true}},
    {"type":"endingauto"}
  ],
  "final_destroy_fail":
  [
    {"type":"effect","flags":{"finalBattleSuccess":false,"elarriaAlive":false}},
    {"type":"endingauto"}
  ],
  "ending_root_prisoner":
  [
    {"type":"title","chapter":"结局","subtitle":"根脉囚徒"},
    {"type":"narrator","text":"你走进装置核心，绿色光芒吞没了你，你听到艾拉瑞亚的声音从外面传来——她在唱歌，唱的是那首你们共同听过的歌。"},
    {"type":"narrator","text":"你的意识被拉入一个巨大的、黑暗的空间，你看到了索尔温，不是疯狂的神，是一个蜷缩在黑暗中的、疲惫的轮廓。"},
    {"type":"char","role":"npc","speaker":"索尔温","text":"你来了，三千年了，没有人愿意承载我，你是第一个。"},
    {"type":"narrator","text":"你的意识融入了祂，污染停止了，古树的裂口开始愈合，世界恢复了平衡。但你不再是人了，你是索尔温的新载体。"},
    {"type":"cg","bg":"../images/forestending/1.jpg","text":"你从锁神装置中走出。艾拉瑞亚站在远处，她想跑过来——但你的身体在发光，你伸出手，她没有握，她哭了。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你还在吗？"},
    {"type":"narrator","text":"你点了点头，但她知道——你不再是你了。"},
    {"type":"effect","flags":{"ending":"根脉囚徒"}},
    {"type":"narrator","text":"成就解锁：【根脉囚徒】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_root_vow":
  [
    {"type":"title","chapter":"结局","subtitle":"根脉之誓"},
    {"type":"narrator","text":"你松开手，她转身走向装置核心，脚步很稳。她走进那片绿色光芒中，光芒吞没了她。"},
    {"type":"narrator","text":"你听到她的声音从光芒中传出——很轻，像远方的风。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我回来了，在根脉里。你听——听得到吗？"},
    {"type":"narrator","text":"你把手按在古树根部，你听到了。地底深处，那个声音又响了。只是这次是她的声，是她在唱歌，唱的是你在回声洞穴里听过的那首。"},
    {"type":"cg","bg":"../images/forestending/2.jpg","text":"多年后，森林恢复了绿色，古树的裂口完全愈合了。你站在古树根部，把手按在树干上，听到了她的声音——从根脉深处传来。她在说话，她在说：“今天根脉往东边延伸了三寸，明天可能更多。”"},
    {"type":"narrator","text":"你笑了，坐下来，靠在树干上。你开始告诉她今天森林里发生了什么，风穿过树冠，带着一种泥土和青草混合的气味。"},
    {"type":"narrator","text":"她没有走，她只是变成了另一种存在。"},
    {"type":"narrator","text":"“当风在拥抱你，当树叶哗哗作响，那是我在拥抱你，那是我在歌唱。”"},
    {"type":"effect","flags":{"ending":"根脉之誓"}},
    {"type":"narrator","text":"成就解锁：【根脉之誓】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_green_peace":
  [
    {"type":"title","chapter":"结局","subtitle":"绿之安宁"},
    {"type":"narrator","text":"你举起武器，艾拉瑞亚站在你身边，你们并肩作战。"},
    {"type":"narrator","text":"战斗判定"},
    {"type":"narrator","text":"装置碎裂，索尔温的碎片从裂缝中涌出，然后开始消散。"},
    {"type":"narrator","text":"你听到一个声音，极其微弱的，像远方的风。那是索尔温在说话：“……谢谢。”"},
    {"type":"narrator","text":"污染停止了，古树的裂口开始愈合，绿色光雾从裂缝中涌出，覆盖了整片森林。"},
    {"type":"narrator","text":"艾拉瑞亚站在你身边，她的黑色纹路在慢慢消退，从脸颊退到脖颈，从脖颈退到手腕。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"它在退，困了我这么多年的，我身上的东西，在退。"},
    {"type":"narrator","text":"她转过身看你，她的眼睛恢复了琥珀色，干净的琥珀色。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我不用进去了。"},
    {"type":"cg","bg":"../images/forestending/3.jpg","text":"多年后，森林恢复了绿色。艾拉瑞亚站在古树根部，她的黑色纹路几乎看不见了，她弯下腰，把手按在树根上。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"它还在说话，但比以前安静了，像是在睡觉。"},
    {"type":"narrator","text":"她直起身，看着你从远处走来，笑了。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"你来啦，今天根脉往东边延伸了三寸，我带你去看。"},
    {"type":"effect","flags":{"ending":"绿之安宁"}},
    {"type":"narrator","text":"成就解锁：【绿之安宁】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_after_roots":
  [
    {"type":"title","chapter":"结局","subtitle":"根脉之后"},
    {"type":"narrator","text":"战斗判定"},
    {"type":"narrator","text":"你砸向装置核心，黑色晶石碎裂，索尔温的碎片涌出，然后消散。"},
    {"type":"narrator","text":"污染停止了，但艾拉瑞亚的黑色纹路没有退。她看着自己的手，那些纹路还在，只是不再搏动了。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"它停了，但没有走。"},
    {"type":"narrator","text":"她抬头看你，表情很平静。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我还是黑根者，只是......森林不再需要我进去了。"},
    {"type":"narrator","text":"她转过身，看着古树。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"我不知道该高兴还是该难过。"},
    {"type":"cg","bg":"../images/forestending/4.jpg","text":"多年后，森林恢复了绿色。艾拉瑞亚站在古树根部，她的黑色纹路还在，但不再蔓延。她每天都会来这里，把手按在树根上。你偶尔来看她，你们话不多，但她知道你在。"},
    {"type":"effect","flags":{"ending":"根脉之后"}},
    {"type":"narrator","text":"成就解锁：【根脉之后】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_dawn":
  [
    {"type":"title","chapter":"结局","subtitle":"拂晓的消散"},
    {"type":"narrator","text":"你砸向装置核心，黑色晶石碎裂，索尔温的碎片涌出，凝成巨兽。"},
    {"type":"narrator","text":"进入最终战斗，战斗判定"},
    {"type":"narrator","text":"就在你快支撑不住的时候，艾拉瑞亚挡在你面前，她身体发光，绿色和黑色交织。她冲进巨兽体内，光芒吞没了她，巨兽也随之碎裂。"},
    {"type":"narrator","text":"你听到她的声音从光芒中传出，很轻，像远方的风。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"好疼......我好疼......但这次我说出来了，你听到了吗？"},
    {"type":"narrator","text":"污染停止了，但索尔温消失了。所有从祂身上抽取的能量都消失了，古树根脉枯萎，森林变成灰色，世界进入新时代：没有魔法，没有根脉，没有风脉。只有人类、精灵、地精、羽人......和他们的双手。"},
    {"type":"cg","bg":"../images/forestending/5.jpg","text":"多年后，你站在一片空地上。远处有人耕作，有人建造，没有根脉的精灵用双手种树，世界很安静。但你活下来了，所有人都活下来了——用自己的方式。"},
    {"type":"narrator","text":"你走到一棵新种的小树前，把手按在树干上，却什么都听不到。但你知道，她就在某个地方，在泥土里，在根脉里，在风里。"},
    {"type":"effect","flags":{"ending":"拂晓的消散"}},
    {"type":"narrator","text":"成就解锁：【拂晓的消散·精灵之森】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_four_clans":
  [
    {"type":"title","chapter":"结局","subtitle":"四族盟约"},
    {"type":"narrator","text":"你砸向装置核心，黑色晶石碎裂，索尔温的碎片从裂缝中消散。"},
    {"type":"narrator","text":"四族并肩作战，击败巨兽。索尔温碎片消散，污染停止，平衡被打破。"},
    {"type":"narrator","text":"废墟驿站，同伴齐聚。"},
    {"type":"char","role":"npc","speaker":"塞琳","text":"天空之城失去悬浮，但还活着。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"帝国失去符文能源，但技术还在。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"森林失去根脉共鸣，但树还在生长。"},
    {"type":"char","role":"npc","speaker":"格里姆","text":"地底失去熔岩炉，但我们还有双手。"},
    {"type":"narrator","text":"你写下四个字：“四族盟约。”"},
    {"type":"narrator","text":"四族代表签署盟约。没有神，没有献祭，没有囚禁。只有四个种族——各自残缺，各自完整。"},
    {"type":"effect","flags":{"ending":"四族盟约"}},
    {"type":"narrator","text":"成就解锁：【四族盟约·精灵之森】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_hero":
  [
    {"type":"title","chapter":"结局","subtitle":"无名英雄"},
    {"type":"narrator","text":"你砸向装置核心。晶石碎裂，碎片消散。"},
    {"type":"narrator","text":"污染停止，世界得救。无人知晓是你所为。没有同伴，没有欢呼，没有记载。"},
    {"type":"narrator","text":"你走出锁神装置。古树愈合，森林恢复，精灵们以为是自己拯救了世界。"},
    {"type":"narrator","text":"你烧掉机械义翼，脱下斗篷，赤脚走向远方。"},
    {"type":"effect","flags":{"ending":"无名英雄"}},
    {"type":"narrator","text":"成就解锁：【无名英雄·精灵之森】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_unchanged":
  [
    {"type":"title","chapter":"结局","subtitle":"未变之局"},
    {"type":"narrator","text":"一切仍按神秘商人预言前行。你闭上眼睛。"},
    {"type":"effect","flags":{"ending":"未变之局"}},
    {"type":"narrator","text":"成就解锁：【未变之局·精灵之森】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ]
};

/*存档恢复*/
if (
  save &&
  save.story === "forest" &&
  (
    mode === "continue" ||
    navigationType === "reload" ||
    navigationType === "back_forward"
  )
)
{
  currentNode = save.node;
  pos = save.index;
  haogandu = Number(save.haogandu ?? 5);
}

/*自由行动返回*/
const fromNodeMap =
{
  // 天空之城
  yun: "loc_sky_yun", feng: "loc_sky_feng", shi: "loc_sky_shi", yu: "loc_sky_yu", trial: "loc_sky_trial",
  // 帝国城邦
  fu: "loc_emp_fu", wu: "loc_emp_wu", lao: "loc_emp_lao", hei: "loc_emp_hei", steam: "loc_emp_steam",
  // 地下古堡
  hui: "loc_under_hui", kuang: "loc_under_kuang", tong: "loc_under_tong", jiu: "loc_under_jiu",
  di: "loc_under_di", shen: "loc_under_shen", hu: "loc_under_hu",
  // 精灵之森
  de: "loc_forest_de", chen: "loc_forest_chen", gen: "loc_forest_gen", sheng: "loc_forest_sheng",
  dong: "loc_forest_dong", zhao: "loc_forest_zhao",
  // 废墟驿站
  ruins: "loc_ruins"
};

if (from)
{
  currentNode = fromNodeMap[from] ?? "loc_forest_" + from;
  pos = 0;
  freedomDay = cnt;
  forestFlags.freedomDay = freedomDay;
  forestFlags.freedomTime = time;
  saveForestFlags();

  const url = new URL(window.location.href);
  url.searchParams.delete("from");
  history.replaceState(null, "", url.pathname + url.search);

  if (save && save.story === "forest")
  {
    haogandu = Number(save.haogandu ?? 5);
  }
}

/*小游戏返回*/
function isSuccessResult(value)
{
  return (
    value === "true" ||
    value === "win" ||
    value === "success" ||
    value === "1" ||
    value === "full" ||
    value === "perfect"
  );
}

function resolvePendingResult(storageKey, rawResult)
{
  const raw = sessionStorage.getItem(storageKey);
  if (!raw) return false;

  let pending;

  try
  {
    pending = JSON.parse(raw);
  }
  catch (error)
  {
    console.error(error);
    sessionStorage.removeItem(storageKey);
    return false;
  }

  if (rawResult === null || rawResult === undefined) return false;

  if (pending.bg && !currentBackground)
  {
    currentBackground = pending.bg;
    storyBg.style.backgroundImage = `url("${pending.bg}"), url("${FALLBACK_BG}")`;
  }

  if (pending.freedomDay !== undefined) freedomDay = pending.freedomDay;
  if ((String(rawResult) === "cancel" || String(rawResult) === "flee") && pending.cancel)
  {
    currentNode = pending.cancel;
  }
  else
  {
    currentNode = isSuccessResult(String(rawResult))
      ? pending.success
      : pending.fail;
  }

  pos = 0;
  sessionStorage.removeItem(storageKey);
  return true;
}

const battleResult =
  battleResultParam !== null
    ? battleResultParam
    : iswin3;

const checkResult =
  iswin2 !== null
    ? iswin2
    : (resultParam !== null ? resultParam : minigameResultParam);

const minigameResult =
  minigameResultParam !== null
    ? minigameResultParam
    : (resultParam !== null ? resultParam : iswin2);

let resultResolved = false;

if (game4Result !== null)
{
  resultResolved = resolvePendingResult(
    "forest_pending_infiltration",
    game4Result
  );

  const url = new URL(window.location.href);
  url.searchParams.delete("game4Result");
  history.replaceState(null, "", url.pathname + url.search);
}

if (!resultResolved && battleResult !== null)
{
  let battleId = null;
  try
  {
    const pendingRaw = sessionStorage.getItem("forest_pending_battle");
    if (pendingRaw) battleId = JSON.parse(pendingRaw).id || null;
  }
  catch (error) {}

  const hpNum = hpParam !== null ? Number(hpParam) : null;
  const isFinalBattle = ["sky_final","final","forest_final","final_battle"].indexOf(battleId) !== -1;
  const isNoLossBattle = battleId === "haggle";

  if (hpNum !== null && hpNum <= 0 && !isFinalBattle && !isNoLossBattle)
  {
    sessionStorage.removeItem("forest_pending_battle");
    currentNode = "ending_unchanged";
    pos = 0;
    resultResolved = true;
    forestFlags.hp = MAX_HP;
    saveForestFlags();
    updateHP();
  }
  else
  {
    resultResolved = resolvePendingResult(
      "forest_pending_battle",
      battleResult
    );

    if (hpParam !== null)
    {
      forestFlags.hp = Math.max(0, Math.min(MAX_HP, Number(hpParam)));
      saveForestFlags();
      updateHP();
    }
  }
  const url = new URL(window.location.href);
  url.searchParams.delete("iswin3");
  url.searchParams.delete("battleResult");
  url.searchParams.delete("hp");
  history.replaceState(null, "", url.pathname + url.search);
}

if (!resultResolved && checkResult !== null)
{
  resultResolved = resolvePendingResult(
    "forest_pending_check",
    checkResult
  );
  if (resultResolved && feather !== null)
  {
    const n = Number(feather) || 0;
    addItem("windCrystal", n >= 6 ? 9 : n >= 3 ? 6 : 3);
  }
}

if (!resultResolved && minigameResult !== null)
{
  resultResolved = resolvePendingResult(
    "forest_pending_minigame",
    minigameResult
  );
}

if (!resultResolved && document.referrer.includes("game2.html"))
{
  const raw = sessionStorage.getItem("forest_pending_check");
  if (raw)
  {
    try
    {
      const pending = JSON.parse(raw);
      currentNode = pending.success;
      pos = 0;
      sessionStorage.removeItem("forest_pending_check");
      resultResolved = true;
    }
    catch (error)
    {
      console.error(error);
    }
  }
}

/*小游戏*/
if (
  resultResolved &&
  save &&
  save.story === "forest"
)
{
  haogandu = Number(save.haogandu ?? haogandu);
}

updateAffection();
loadOtherAffection();
updateOtherAffection();
updateHP();
renderInventory();
renderStatus();
renderIntel();

let nodeData = nodes[currentNode];

/*隐藏逻辑*/
function applyEffect(item)
{
  if (item.flags)
  {
    Object.assign(forestFlags, item.flags);
    saveForestFlags();
  }

  if (item.addItems)
  {
    Object.entries(item.addItems).forEach(function ([id, count])
    {
      addItem(id, count);
    });
  }

  if (item.removeItems)
  {
    Object.entries(item.removeItems).forEach(function ([id, count])
    {
      removeItem(id, count);
    });
  }

  if (item.addStatuses)
  {
    item.addStatuses.forEach(function (name)
    {
      addStatus(name);
    });
  }

  if (item.removeStatuses)
  {
    item.removeStatuses.forEach(function (name)
    {
      removeStatus(name);
    });
  }

  if (item.addIntels)
  {
    item.addIntels.forEach(function (name)
    {
      addIntel(name);
    });
  }

  if (item.removeIntels)
  {
    item.removeIntels.forEach(function (name)
    {
      removeIntel(name);
    });
  }

  if (item.setAffection !== undefined)
  {
    setAffection(item.setAffection);
  }
  else if (item.affection !== undefined)
  {
    applyAffection(item.affection);
  }

  if (item.companionAffection !== undefined) applyCompanionAffection(item.companionAffection);
  if (item.otherAffection)
  {
    Object.entries(item.otherAffection).forEach(function ([faction, delta])
    {
      applyOtherAffection(faction, delta);
    });
  }

  if (item.memoryDelta !== undefined)
  {
    forestFlags.memoryFragments = memoryFragments() + Number(item.memoryDelta);
    saveForestFlags();
    renderInventory();
  }

  if (item.hpDelta !== undefined)
  {
    forestFlags.hp = Math.max(0, Math.min(MAX_HP, currentHP() + Number(item.hpDelta)));
    saveForestFlags();
    updateHP();
  }

  if (item.dailyFlag)
  {
    forestFlags[item.dailyFlag + freedomDay] = true;
    saveForestFlags();
  }

  if (item.incFlag)
  {
    forestFlags[item.incFlag] = (forestFlags[item.incFlag] || 0) + 1;
    saveForestFlags();
  }

  pos++;
  saveGame("forest", currentNode, pos, haogandu);
  render();
}

function goToNode(next)
{
  currentNode = next;
  nodeData = nodes[currentNode];
  pos = 0;
  render();
}

/*终局判定*/
function resolveDestroyEnding()
{
  const battleWon = forestFlags.finalBattleSuccess === true;

  if (
    battleWon &&
    isFourClansReady() &&
    forestFlags.noSacrifice !== false
  )
  {
    goToNode("ending_four_clans");
    return;
  }

  if (forestFlags.elarriaAlive === false)
  {
    goToNode("ending_dawn");
    return;
  }

  if (
    battleWon &&
    forestFlags.elarriaAlive === true &&
    haogandu >= 60
  )
  {
    goToNode("ending_green_peace");
    return;
  }

  if (
    battleWon &&
    forestFlags.elarriaAlive === true &&
    haogandu <= 50
  )
  {
    goToNode("ending_after_roots");
    return;
  }

  if (battleWon && forestFlags.elarriaAlive === true)
  {
    goToNode("ending_hero");
    return;
  }

  goToNode("ending_unchanged");
}

/*剧情渲染*/
/* 任务揭示：正文出现「主线任务」时记录，供 task.js 精确控制任务栏显示时机 */
const TASK_REVEAL_NODES =
{
  "start": "ch1",
  "chapter2_start": "ch2",
  "chapter3_start": "ch3",
  "chapter4_start": "ch4"
};

function revealTasksForNode(nodeId)
{
  const taskId = TASK_REVEAL_NODES[nodeId];
  if (!taskId) return;
  if (forestFlags.taskRevealed && forestFlags.taskRevealed[taskId]) return;
  forestFlags.taskRevealed = forestFlags.taskRevealed || {};
  forestFlags.taskRevealed[taskId] = true;
  saveForestFlags();
}

/* 老存档一次性补录：按当前节点所在章节，把已走过的章节标记为已揭示 */
function migrateTaskReveals()
{
  if (forestFlags.taskRevealed) return;
  forestFlags.taskRevealed = {};
  const node = currentNode || "start";
  let cur = 1;
  if (/^chapter2/.test(node)) cur = 2;
  else if (/^chapter3/.test(node)) cur = 3;
  else if (/^chapter4/.test(node) || /^ending/.test(node) || /^final/.test(node) || /ember_epilogue/.test(node)) cur = 4;
  else if (/^(freedom|mainmap_|loc_)/.test(node)) cur = Math.max(1, Number(forestFlags.freedomDay || 1));
  for (let n = 1; n <= cur; n++) forestFlags.taskRevealed["ch" + n] = true;
  saveForestFlags();
}

function render()
{
  nodeData = nodes[currentNode];

  if (!nodeData)
  {
    console.error("不存在的森林剧情节点：", currentNode);
    return;
  }

  migrateTaskReveals();
  revealTasksForNode(currentNode);

  if (pos >= nodeData.length)
  {
    console.warn("森林剧情节点已到末尾：", currentNode);
    return;
  }

  updateBackground();

  const item = nodeData[pos];

  if (item.type === "jump")
  {
    mapClickable = false;
    updateMapState();
    goToNode(item.goto);
    return;
  }

  if (item.type === "effect")
  {
    applyEffect(item);
    return;
  }

  if (item.type === "auto")
  {
    mapClickable = false;
    updateMapState();

    for (const opt of item.options)
    {
      if (
        haogandu >= Number(opt.min) &&
        haogandu <= Number(opt.max)
      )
      {
        goToNode(opt.next);
        return;
      }
    }

    return;
  }

  if (item.type === "flagauto")
  {
    mapClickable = false;
    updateMapState();

    const value = forestFlags[item.flag];
    const next = item.routes[value] || item.default;

    goToNode(next);
    return;
  }

  if (item.type === "dayauto")
  {
    mapClickable = false;
    updateMapState();
    goToNode(item.routes[freedomDay] || item.default);
    return;
  }

  if (item.type === "otherauto")
  {
    mapClickable = false;
    updateMapState();
    const val = otherHaogandu[item.faction] ?? 0;
    goToNode(val >= Number(item.min) ? item.pass : item.fail);
    return;
  }

  if (item.type === "dailyauto")
  {
    mapClickable = false;
    updateMapState();
    const done = forestFlags[item.flag + freedomDay];
    goToNode(done ? item.done : item.notDone);
    return;
  }

  if (item.type === "chance")
  {
    mapClickable = false;
    updateMapState();
    goToNode(Math.random() < Number(item.prob) ? item.pass : item.fail);
    return;
  }

  if (item.type === "hasitems")
  {
    mapClickable = false;
    updateMapState();
    let ok = true;
    for (const [id, n] of Object.entries(item.need || {}))
    {
      if ((forestFlags.inventory?.[id] || 0) < n) { ok = false; break; }
    }
    goToNode(ok ? item.pass : item.fail);
    return;
  }

  if (item.type === "freedomReturn")
  {
    mapClickable = false;
    updateMapState();
    goToNode("mainmap_" + freedomDay);
    return;
  }

  /*终局判定*/
  if (item.type === "endingauto")
  {
    resolveDestroyEnding();
    return;
  }

  saveGame("forest", currentNode, pos, haogandu);

  choiceDom.style.display = "none";
  textDom.style.display = "none";

  if (silhouetteDom) silhouetteDom.style.display = "none";
  textDom.classList.remove("char-mode");
  hint.textContent = "点击画面 / Enter / Space / ▸键 继续";

  if (item.type === "title")
  {
    playTurn();
    mapClickable = false;
    updateMapState();

    const box = document.createElement("div");
    const h1 = document.createElement("h1");
    const orn = document.createElement("div");

    box.className = "seg-title";

    h1.className = "title-chapter";
    h1.textContent = item.chapter;
    box.appendChild(h1);

    orn.className = "title-ornament";
    orn.textContent = "◆";
    box.appendChild(orn);

    if (item.subtitle)
    {
      const sub = document.createElement("div");
      sub.className = "title-sub";
      sub.textContent = item.subtitle;
      box.appendChild(sub);
    }

    textDom.innerHTML = "";
    textDom.appendChild(box);
    textDom.style.display = "block";
  }

  else if (item.type === "narrator")
  {
    const displayText = unlockAchievementsFromText(item.text);
    if (item.text && item.text.trim() && !displayText.trim())
    {
      pos++;
      render();
      return;
    }

    textDom.innerHTML = "";

    const scene = document.createElement("div");
    scene.className = "scene";
    scene.textContent = displayText;

    textDom.appendChild(scene);
    textDom.style.display = "block";

    if (/^freedom[123]$/.test(currentNode) && pos === 0)
    {
      mapClickable = true;
      time = 0;
      freedomDay = Number(currentNode.slice(-1));
      forestFlags.freedomDay = freedomDay;
      forestFlags.freedomTime = 0;
      saveForestFlags();
    }
    else
    {
      mapClickable = false;
    }

    updateMapState();
  }

  /* 结局 CG（静态图作为背景，替代原“结局动画”文字；bg 填图片路径，留空则用节点默认背景） */
  else if (item.type === "cg")
  {
    const displayText = unlockAchievementsFromText(item.text);
    mapClickable = false;
    updateMapState();
    if (item.bg)
    {
      storyBg.style.backgroundImage = `url("${item.bg}"), url("${FALLBACK_BG}")`;
      currentBackground = item.bg;
      endingBg = item.bg;
      endingBgNode = currentNode;
    }
    textDom.classList.remove("char-mode");
    textDom.innerHTML = "";
    const scene = document.createElement("div");
    scene.className = "scene";
    scene.textContent = displayText;
    textDom.appendChild(scene);
    textDom.style.display = "block";
  }

  else if (item.type === "char")
  {
    mapClickable = false;
    updateMapState();

    textDom.classList.add("char-mode");

    const box = document.createElement("div");
    const name = document.createElement("div");
    const line = document.createElement("p");

    box.className = "dialog";

    name.className = "speaker";
    name.textContent = (item.speaker === "你" || item.speaker === "我") ? getPlayerDisplayName() : item.speaker;
    box.appendChild(name);

    line.className = "dialog-text";
    box.appendChild(line);

    textDom.innerHTML = "";
    textDom.appendChild(box);
    textDom.style.display = "block";

    typeText(line, item.text, 40);

    const charImg = getCharacterImage(item);

    if (charImg)
    {
      silhouetteDom.style.backgroundImage = `url("${charImg}")`;
      silhouetteDom.classList.remove("player", "npc");

      if (item.role === "npc")
      {
        silhouetteDom.classList.add("npc");
      }
      else
      {
        silhouetteDom.classList.add("player");
      }

      silhouetteDom.style.display = "block";
    }
  }

  else if (item.type === "choice")
  {
    mapClickable = false;
    updateMapState();

    hint.textContent = "";
    choiceDom.innerHTML = "";
    choiceDom.classList.toggle("multi", item.options.length >= 5);

    item.options.forEach(function (opt)
    {
      const a = document.createElement("a");
      a.textContent = opt.label;

      a.addEventListener("click", function ()
      {
        if (opt.affection !== undefined)
        {
          applyAffection(opt.affection);
        }

        if (opt.flags)
        {
          Object.assign(forestFlags, opt.flags);
          saveForestFlags();
        }

        if (opt.cost)
        {
          for (const [key, val] of Object.entries(opt.cost))
          {
            const have = key === "memoryFragments" ? memoryFragments() : (forestFlags.inventory?.[key] || 0);
            if (have < val) { hint.textContent = "资源不足，无法兑换/购买"; return; }
          }
          for (const [key, val] of Object.entries(opt.cost))
          {
            if (key === "memoryFragments") forestFlags.memoryFragments = memoryFragments() - val;
            else removeItem(key, val);
          }
          if (opt.give) Object.entries(opt.give).forEach(function ([id, c]) { addItem(id, c); });
          saveForestFlags();
          renderInventory();
        }

        if (opt.addItems)
        {
          Object.entries(opt.addItems).forEach(function ([id, count])
          {
            addItem(id, count);
          });
        }

        if (opt.removeItems)
        {
          Object.entries(opt.removeItems).forEach(function ([id, count])
          {
            removeItem(id, count);
          });
        }

        if (opt.addStatuses) opt.addStatuses.forEach(addStatus);
        if (opt.removeStatuses) opt.removeStatuses.forEach(removeStatus);
        if (opt.addIntels) opt.addIntels.forEach(addIntel);
        if (opt.removeIntels) opt.removeIntels.forEach(removeIntel);

        if (opt.next === "end")
        {
          saveGame("forest", currentNode, pos, haogandu, true);
          resetForestFlags();
          clickNav("mainmenu.html");
          return;
        }

        goToNode(opt.next);
      });

      choiceDom.appendChild(a);
    });

    choiceDom.style.display = item.options.length >= 5 ? "grid" : "block";
  }

  else if (item.type === "battle")
  {
    mapClickable = false;
    updateMapState();

    sessionStorage.setItem(
      "forest_pending_battle",
      JSON.stringify({
        id: item.id,
        success: item.success,
        fail: item.fail,
        cancel: item.cancel || null,
        freedomDay: freedomDay,
        bg: currentBackground
      })
    );

    if (item.url)
    {
      fadeNav(item.url.includes("game3") ? item.url + "&battle=" + item.id + "&hp=" + currentHP() : item.url);
      return;
    }

    const url = FOREST_GAME_URLS[item.game];

    if (!url)
    {
      console.error("未配置森林战斗页面：", item.game);
      return;
    }

    fadeNav(url.includes("game3") ? url + "&battle=" + item.id + "&hp=" + currentHP() : url);
  }

  else if (item.type === "infiltration")
  {
    mapClickable = false;
    updateMapState();

    sessionStorage.setItem(
      "forest_pending_infiltration",
      JSON.stringify({
        id: item.id,
        success: item.success,
        fail: item.fail,
        freedomDay: freedomDay,
        bg: currentBackground
      })
    );

    fadeNav(item.url);
  }

  else if (item.type === "skillcheck")
  {
    mapClickable = false;
    updateMapState();

    sessionStorage.setItem(
      "forest_pending_check",
      JSON.stringify({
        id: item.id,
        success: item.success,
        fail: item.fail,
        freedomDay: freedomDay,
        bg: currentBackground
      })
    );

    const gameUrl = new URL(item.url || "game2.html?mode=forest", window.location.href);
    const currentPage = window.location.pathname.split("/").pop() || "story-forest.html";
    gameUrl.searchParams.set("return", currentPage);
    fadeNav(gameUrl.href);
  }

  else if (item.type === "minigame")
  {
    mapClickable = false;
    updateMapState();

    sessionStorage.setItem(
      "forest_pending_minigame",
      JSON.stringify({
        id: item.id,
        success: item.success,
        fail: item.fail,
        bg: currentBackground
      })
    );

    const url = FOREST_GAME_URLS[item.game];

    if (!url)
    {
      console.error("未配置森林小游戏页面：", item.game);
      return;
    }

    fadeNav(url);
  }

  else if (item.type === "freedomEnd")
  {
    mapClickable = false;
    updateMapState();

    time = Number(forestFlags.freedomTime ?? time ?? 0);
    time++;
    forestFlags.freedomDay = freedomDay;
    forestFlags.freedomTime = time;
    saveForestFlags();

    if (time < 4)
    {
      fadeNav(
        `map.html?mode=forest&cnt=${item.day}&time=${time}`);
      return;
    }

    forestFlags.freedomTime = 0;
    saveForestFlags();
    goToNode(item.next);
  }
}

/* 剧情推进（键盘/点击共用） */
function advanceStory()
{
  if (settingsOpen) return;

  if (/^freedom[123]$/.test(currentNode) && pos === 0)
  {
    return;
  }

  if (choiceDom.style.display !== "none") return;

  if (istyping)
  {
    currentElement.textContent = currentText;

    clearInterval(timer);
    timer = null;
    istyping = false;

    setTimeout(function ()
    {
      cannext = true;
    }, 300);

    return;
  }

  if (!cannext) return;

  pos++;
  render();
}

document.addEventListener("keydown", function (e)
{
  if (
    e.key === " " ||
    e.key === "ArrowRight" ||
    e.key === "Enter"
  )
  {
    e.preventDefault();

    if (e.repeat) return;

    advanceStory();
  }
});

/* 手机端：点击画面推进（排除交互元素） */
document.addEventListener("click", function (e)
{
  if (e.target.closest("button, a, #mapMini, #bagMini, .achievement-mini, #inventoryPanel, #itemDetail, #settingsOverlay, #choiceDom, #exit-game-button")) return;
  advanceStory();
});

/*UI*/
exitGameButton.addEventListener("click", openSettings);

settingsContinue.addEventListener("click", closeSettings);
settingsSaveExit.addEventListener("click", function ()
{
  saveGame("forest", currentNode, pos, haogandu);
  saveForestFlags();
  clickNav("mainmenu.html");
});

settingsRestart.addEventListener("click", function ()
{
  resetGame();
  clickNav("prologue.html");
});

/* 音量调节 */
if (bgmVolume)
{
  bgmVolume.value = Math.round(BGM.getVolume() * 100);
  bgmVolume.addEventListener("input", function ()
  {
    BGM.setVolume(Number(bgmVolume.value) / 100);
  });
}

if (sfxVolume)
{
  sfxVolume.value = Math.round(getSfxVolume() * 100);
  sfxVolume.addEventListener("input", function ()
  {
    setSfxVolume(Number(sfxVolume.value) / 100);
  });
}

if ((mode === "continue" && !returningFromGame) || navigationType === "reload" || navigationType === "back_forward")
{
  openSettings();
}
else
{
  BGM.play();
}

window.addEventListener("pageshow", function (e)
{
  if (e.persisted) openSettings();
});

/*自由地图*/
mapMini.addEventListener("mouseenter", function ()
{
  mapTip.textContent = "商人的地图";
  mapTip.style.opacity = "1";
  mapTip.style.visibility = "visible";
});

mapMini.addEventListener("click", function ()
{

  if (!mapClickable)
  {
    mapTip.textContent = "您现在还不能使用地图";
    mapTip.style.opacity = "1";
    mapTip.style.visibility = "visible";
    return;
  }

  const match = currentNode.match(/^freedom([123])$/);
  if (!match) return;
  const day = Number(match[1]);
  turnNav(`map.html?mode=forest&cnt=${day}&time=0`);
});

mapMini.addEventListener("mouseleave", function ()
{
  mapTip.style.opacity = "0";
  mapTip.style.visibility = "hidden";

  mapTip.textContent = "商人的地图";
});

/*背包*/
bagMini.addEventListener("click", function ()
{
  inventoryPanel.classList.toggle("open");

  if (inventoryPanel.classList.contains("open"))
  {
    bagMini.classList.add("opened");
  }
  else
  {
    bagMini.classList.remove("opened");
  }
});

inventoryClose.addEventListener("click", function ()
{
  inventoryPanel.classList.remove("open");
  bagMini.classList.remove("opened");
});

updateMapState();
render();
