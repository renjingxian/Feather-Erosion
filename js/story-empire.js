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
const minigameResultParam = params.get("minigameResult");
const game4Result = params.get("game4Result");
const feather = params.get("feather");
const hpParam = params.get("hp");

const save = loadGame();
const gender = getCurrentGender();
const playerImg = gender === "male" ? "../images/malelead.png" : "../images/femalelead.png";

/*立绘*/
const Aldric = "../images/Aldric.png";
const Edmund = "../images/Edmund.png";
const Sorwin = "../images/Sorwin.png";
const Guard = "../images/guard.png";
const Celine = "../images/Celine.png";
const MilitaryLeader = "../images/military.png";
const ScienceLeader = "../images/science.png";
const Veteran = "../images/veteran.png";
const Elarria = "../images/Elarria.png";
const Grim = "../images/Grim.png";
const Queen = "../images/Queen.png";
const Oldgoblin = "../images/Oldgoblin.png";
const Goblinguard = "../images/Goblinguard.png";
const Patrol = "../images/Patrol.png";
const Lia = "../images/Lia.png";
const Dazhanglao = "../images/dazhanglao.png";
const Duke = "../images/Duke.png";

/*背景*/
const FALLBACK_BG = "../images/bg_empire.jpg";
const sceneBackgrounds =
{
  gate: "../images/empirebg/empirebg1.jpg",
  city: "../images/empirebg/empirebg2.jpg",
  workshop: "../images/empirebg/empirebg3.jpg",
  furnace: "../images/empirebg/empirebg4.jpg",
  council: "../images/empirebg/empirebg5.jpg",
  blackmarket: "../images/empirebg/empirebg6.jpg",
  military: "../images/empirebg/empirebg7.jpg",
  lab: "../images/empirebg/empirebg8.jpg",
  isolation: "../images/empirebg/empirebg9.jpg",
  road: "../images/empirebg/empirebg10.jpg",
  sky: "../images/empirebg/empirebg11.jpg",
  father: "../images/empirebg/empirebg12.jpg",
  core: "../images/empirebg/empirebg13.jpg",
  end: "../images/empirebg/empirebg14.jpg",

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

const nodeBackgrounds = {
  "start": "city",
  "chapter1_gate_pass": "gate",
  "chapter1_gate_force": "gate",
  "chapter1_gate_force_success": "gate",
  "chapter1_gate_force_fail": "gate",
  "chapter1_gate_meet": "gate",
  "chapter1_city": "city",
  "chapter1_experiment_accept": "workshop",
  "chapter1_experiment_success": "workshop",
  "chapter1_experiment_fail": "workshop",
  "chapter1_experiment_refuse": "workshop",
  "chapter1_experiment_question": "workshop",
  "chapter1_furnace": "furnace",
  "chapter1_furnace_self": "furnace",
  "chapter1_furnace_self_success": "furnace",
  "chapter1_furnace_self_fail": "furnace",
  "chapter1_furnace_cover": "furnace",
  "chapter1_furnace_cover_success": "furnace",
  "chapter1_furnace_cover_fail": "furnace",
  "chapter1_furnace_back": "furnace",
  "chapter1_ironblood": "workshop",
  "chapter1_blood_condemn": "city",
  "chapter1_blood_hide": "city",
  "chapter1_blood_threat": "city",
  "chapter1_rooftop": "workshop",
  "chapter1_promise_return": "city",
  "chapter1_promise_unknown": "city",
  "chapter1_promise_silent": "city",
  "chapter1_end": "workshop",
  "mainmap_1": "city",
  "freedom1": "city",
  "mainmap_2": "city",
  "freedom2": "city",
  "mainmap_3": "city",
  "freedom3": "city",
  "chapter2": "workshop",
  "chapter2_question_a": "city",
  "chapter2_question_b": "city",
  "chapter2_question_c": "city",
  "chapter2_after_question": "workshop",
  "chapter2_council": "council",
  "chapter2_vote_watch": "council",
  "chapter2_vote_stop": "council",
  "chapter2_after_vote": "council",
  "chapter2_blackmarket": "blackmarket",
  "chapter2_blackmarket_a": "blackmarket",
  "chapter2_blackmarket_b": "blackmarket",
  "chapter2_blackmarket_c": "blackmarket",
  "chapter2_infiltration": "military",
  "chapter2_infiltration_success": "military",
  "chapter2_infiltration_fail": "military",
  "chapter2_window": "workshop",
  "chapter2_plan_a": "workshop",
  "chapter2_plan_b": "workshop",
  "chapter2_plan_c": "workshop",
  "chapter2_night": "workshop",
  "chapter2_fear_a": "workshop",
  "chapter2_fear_b": "workshop",
  "chapter2_fear_c": "workshop",
  "chapter2_end": "workshop",
  "chapter3": "city",
  "chapter3_science_a": "lab",
  "chapter3_science_b": "lab",
  "chapter3_science_c": "lab",
  "workshop":"workshop",
  "chapter3_business": "workshop",
  "chapter3_warehouse_success": "isolation",
  "chapter3_warehouse_easter": "isolation",
  "chapter3_warehouse_fail": "isolation",
  "chapter3_resonance": "workshop",
  "chapter3_resonance_sacrifice": "workshop",
  "chapter3_resonance_escape": "workshop",
  "chapter3_resonance_fake": "workshop",
  "chapter3_council": "council",
  "chapter3_council_sacrifice": "council",
  "chapter3_council_escape": "council",
  "chapter3_council_fake": "council",
  "chapter3_end": "workshop",
  "chapter4": "road",
  "chapter4_road_a": "road",
  "chapter4_road_b": "road",
  "chapter4_road_c": "road",
  "chapter4_sky": "sky",
  "chapter4_reunion_a": "sky",
  "chapter4_reunion_b": "sky",
  "chapter4_reunion_c": "sky",
  "chapter4_father": "father",
  "chapter4_father_kill": "father",
  "chapter4_father_cooperate": "father",
  "chapter4_father_release": "father",
  "chapter4_final": "city",
  "final_destroy": "core",
  "resolve_destroy_ending": "core",
  "ending_self": "end",
  "ending_prisoner": "end",
  "ending_steel": "end",
  "ending_afterfire": "end",
  "ending_dawn": "end",
  "ending_father": "end",
  "ending_four_clans": "end",
  "ending_hero": "end",
  "ending_unchanged": "end",

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

  /*背景*/
  storyBg.style.backgroundImage = `url("${bg}"), url("${FALLBACK_BG}")`;
  currentBackground = bg;
}

function getCharacterImage(item)
{
  if (item.role === "player") return playerImg;

  const speaker = item.speaker || "";

  if (speaker.includes("奥德里克")) return Aldric;
  if (speaker.includes("艾德蒙")) return Edmund;
  if (speaker.includes("索尔温")) return Sorwin;
  if (speaker.includes("卫兵")) return Guard;
  if (speaker.includes("军派领袖")) return MilitaryLeader;
  if (speaker.includes("科研派")) return ScienceLeader;
  if (speaker.includes("老兵")) return Veteran;
  if (speaker.includes("赛琳") || speaker.includes("塞琳")) return Celine;
  if (speaker.includes("艾拉瑞亚")) return Elarria;
  if (speaker.includes("格里姆")) return Grim;
  if (speaker.includes("女王")) return Queen;
  if (speaker.includes("老地精") || speaker.includes("地精匠人") || speaker.includes("铜齿匠人") || speaker.includes("匠人")) return Oldgoblin;
  if (speaker.includes("晶化卫兵") || speaker.includes("地精守卫")) return Goblinguard;
  if (speaker.includes("巡逻")) return Patrol;
  if (speaker.includes("莉亚")) return Lia;
  if (speaker.includes("大长老")) return Dazhanglao;
  if (speaker.includes("大公")) return Duke;

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
const empireFlagKey = "feather_erosion_empire_flags_" + (currentUser || "guest");
const flagStorage = currentUser ? localStorage : sessionStorage;

function loadEmpireFlags()
{
  const raw = flagStorage.getItem(empireFlagKey);
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

function saveEmpireFlags()
{
  flagStorage.setItem(empireFlagKey, JSON.stringify(empireFlags));
}

function resetEmpireFlags()
{
  flagStorage.removeItem(empireFlagKey);
}

let empireFlags = loadEmpireFlags();

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
    story:"empire",
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
  empirePass:
  {
    name: "帝国通行证",
    desc: "盖有帝国印章的通行凭证。",
    image: "../images/empirethings/tongxz.png"
  },

  basicPotion:
  {
    name: "基础治疗药剂",
    desc: "消耗品：回复 10 点生命值。",
    image: "../images/zhiliaoyaoji.png"
  },

  armorPrototype:
  {
    name: "符文装甲原型",
    desc: "装备：战斗中防御次数 +1。",
    image: "../images/empirethings/fuwenzhuangjia.png"
  },

  runeAmulet:
  {
    name: "符文护符",
    desc: "装备：一次紧急传送。",
    image: "../images/empirethings/fuwenhufu.png"
  },

  experimentFiles:
  {
    name: "羽人实验文件",
    desc: "记录帝国羽人抗性活体实验的机密文件。",
    image: "../images/empirethings/shiyanwj.png"
  },

  runeShield:
  {
    name: "符文护盾",
    desc: "装备：战斗中抵挡一次伤害。",
    image: "../images/empirethings/hudun.png"
  },

  launchKey:
  {
    name: "发射钥匙",
    desc: "帝国符文炮的银色发射钥匙。",
    image: "../images/empirethings/yaoshi.png"
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
  mechDesign:    { name: "机械义翼设计图", desc: "天空之城机械羽翼的制造图纸。", image: "" },
  memoryFragment: { name: "记忆碎片", desc: "残存的记忆碎片，可在各阵营集市兑换物品与情报。", image: "../images/jiyisuipian.jpg" }
};

function initInventory()
{
  if (!empireFlags.inventory)
  {
    empireFlags.inventory = {};
    saveEmpireFlags();
  }
}

function addItem(id, count = 1)
{
    initInventory();
    if (!empireFlags.inventory[id]) empireFlags.inventory[id] = 0;
    empireFlags.inventory[id] += count;
    saveEmpireFlags();
    renderInventory();
}

function removeItem(id, count = 1)
{
  initInventory();
  if (!empireFlags.inventory[id]) return;
  empireFlags.inventory[id] -= count;
  if (empireFlags.inventory[id] <= 0) delete empireFlags.inventory[id];
  saveEmpireFlags();
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
  else icon.textContent = data.name[0];
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
    if (count > 1 || id === "memoryFragment") itemDetailCount.textContent = "持有数量：" + count;
    else itemDetailCount.textContent = "";
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
  const inventory = empireFlags.inventory;
  const ids = Object.keys(inventory).filter(function (id)
  {
    return inventory[id] > 0 && ITEM_DATA[id];
  });

  if (ids.length === 0 && memoryFragments() <= 0)
  {
    const empty = document.createElement("div");
    empty.className = "inventory-empty";
    empty.textContent = "行囊里什么也没有。";
    inventoryContent.appendChild(empty);
    return;
  }

  // 记忆碎片作为货币，但像物品一样显示在背包里
  renderInventoryItem("memoryFragment", memoryFragments());

  ids.forEach(function (id)
  {
    renderInventoryItem(id, inventory[id]);
  });
}
/*状态*/
const STATUS_INFO = {
    "通缉": "帝国城邦行动受限；奥德里克好感上限锁定为60；帝国底层居民更容易信任你。",
    "奥德里克的约定": "你答应奥德里克，在旅途结束后回到帝国。",
    "科研派的任务": "任务目标：说服科研派领袖。",
    "科研派的同盟": "科研派将在议会中全力支持弹劾军派领袖。",
    "科研派的有限合作": "科研派会支持弹劾，但不会全力施压。",
    "科研派的拒绝": "科研派不会支持弹劾。",
    "商业派的任务": "任务目标：清理污染隔离区的私人仓库。",
    "商业派的感激": "商业派将在议会中支持弹劾军派领袖。",
    "商业派的不满": "商业派不会支持弹劾，但也不会反对。",
    "伪造的样本": "伪造的抗性样本，目前能够暂时骗过军派的检测。",
    "艾德蒙的同行": "艾德蒙暂时与你同行，并将带你了解索尔温与锁神装置的真相。",
    "父亲的同行": "你选择与艾德蒙合作，他将与你一同进入终局；其他同伴因此对你产生强烈不满。",
    "回声的歌": "你学会了回声洞穴里的那首歌。",
    "她听过自己的名字": "艾拉瑞亚第一次听清了自己的名字。"
};

function initStatus()
{
  if (!empireFlags.statuses)
  {
    empireFlags.statuses = [];
    saveEmpireFlags();
  }
}

function addStatus(name)
{
  initStatus();

  if (!empireFlags.statuses.includes(name))
  {
    empireFlags.statuses.push(name);
    saveEmpireFlags();
  }

  renderStatus();
}

function removeStatus(name)
{
  initStatus();

  empireFlags.statuses = empireFlags.statuses.filter(function (status)
  {
    return status !== name;
  });

  saveEmpireFlags();
  renderStatus();
}

function renderStatus()
{
  const statusList = document.getElementById("status-list");
  if (!statusList) return;
  initStatus();
  statusList.innerHTML = "";
  empireFlags.statuses.forEach(function (status)
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
const INTEL_INFO = {
    "帝国议会派系": "帝国议会由军派、科研派、商业派三方势力构成，三派彼此制衡。",
    "军派的真实目的": "军派以“消除污染源头”为名进攻天空之城，真正目标是夺取风脉之心的能量核心，并将其装入帝国符文炮。",
    "三天的窗口": "净化行动议案已经通过，但符文炮仍需组装和校准；正式执行前还剩三天。",
    "科研派的筹码": "科研派与军派并不对付，但要换取他们的帮助，需要拿出他们真正想要的研究对象或样本作为筹码。",
    "奥德里克的过往": "二十年前，奥德里克带着四十个人参加晶骸战争，最终只有他活着回来；那时的他其实同样害怕，只是从未说出口。",
    "剪翼者与无翼者": "天空之城的底层羽人被上层人称作剪翼者与无翼者——他们被歧视，也被畏惧。",
    "底层人与上层人": "上层人一边鄙视底层羽人，一边又害怕他们。",
    "底层羽人的沉默": "当被审者说出“献祭是杀人”时，全场只有最前排几个底层羽人把兜帽往下压了压，无人应声。",
    "军派的募兵牌": "军派在每块阵亡者墓碑背面钉着铁牌：“为国捐躯者，其亲属可优先入伍。”——用人命换兵源，共三十九块。",
    "四十个人": "二十年前那支队伍一共四十人，三十九个阵亡，名字刻在工坊墙上的铁牌上并被逐个划掉；唯独第四十个名字没有被划掉——那是奥德里克自己。",
    "军费的来源": "军派的军费来自商业派，商业派的钱来自熔炉。而熔炉三天前刚被污染——军派急着开战的真实压力来自钱，不是污染。",
    "第四十座碑": "有个人每周都来，站在那块空碑前面，站一会儿就走。二十年了。",
    "独自下矿的人": "废弃矿道深处的墙壁上全是旧矿灯的划痕，有人在那里待过很久、而且是一个人。你猜那大概是莉亚。她被困的那三天，就是在那儿。",
    "一条侧路": "矿道西边有一条塌掉一半的支道，能绕到大公的实验室后面；没人走，因为要弯腰。",
    "晶化卫兵不睡": "大公的晶化卫兵不需要睡眠、不会疲劳、没有视野盲区之外的松懈期。打不过，只能比它们更快地走完流程。",
    "火种是谁掐的": "熔岩炉的火种不是自己熄灭的，是有人从上面动的手——即大公主动掐断，为的是把资源转向污染实验。",
    "大公最近的动静": "他往灰烬实验室那边调了两批卫兵，全是晶化过的。以前他不用那些东西看家。",
    "镇上的人怎么说": "女王的账本上，这片林子还剩两年半。她说三年，是怕我们跑。"
};

function initIntel()
{
  if (!empireFlags.intels)
  {
    empireFlags.intels = [];
    saveEmpireFlags();
  }
}

function addIntel(name)
{
  initIntel();

  if (!empireFlags.intels.includes(name))
  {
    empireFlags.intels.push(name);
    saveEmpireFlags();
  }

  renderIntel();
}

function removeIntel(name)
{
  initIntel();

  empireFlags.intels = empireFlags.intels.filter(function (intel)
  {
    return intel !== name;
  });

  saveEmpireFlags();
  renderIntel();
}

function renderIntel()
{

  const intelList =
    document.getElementById("intel-list") ||
    document.getElementById("information-list") ||
    document.getElementById("intelligence-list");

  if (!intelList) return;

  initIntel();
  intelList.innerHTML = "";

  empireFlags.intels.forEach(function (intel)
  {
    const div = document.createElement("div");
    div.className = "intel-item status-item";

    const name = document.createElement("div");
    name.className = "intel-name status-name";
    name.textContent = intel;

    const tip = document.createElement("div");
    tip.className = "intel-tip status-tip";
    tip.textContent = INTEL_INFO[intel] || "暂无详细说明";

    div.appendChild(name);
    div.appendChild(tip);
    intelList.appendChild(div);
  });
}

/*新游戏时重置路线状态*/
const navigationEntry = performance.getEntriesByType("navigation")[0];
const navigationType = navigationEntry ? navigationEntry.type : "navigate";
const returningFromGame = iswin3 !== null || iswin2 !== null || resultParam !== null || minigameResultParam !== null || game4Result !== null || params.get("battleResult") !== null || params.get("checkResult") !== null;

if ( mode !== "continue" && navigationType === "navigate" && !from && !returningFromGame )
{
  resetEmpireFlags();
  empireFlags = {};
}

let haogandu = 5;

/*自由行动日：当前行动日（1/2/3）、生命上限、记忆碎片货币、生命值*/
let freedomDay = Number(empireFlags.freedomDay ?? 1);
if (!params.has("time")) time = Number(empireFlags.freedomTime ?? time ?? 0);
const MAX_HP = 100;
function memoryFragments() { return empireFlags.memoryFragments ?? 15; }
function currentHP() { return empireFlags.hp ?? MAX_HP; }

function applyAffection(delta)
{
  haogandu += Number(delta);

  if (typeof empireFlags.affectionCap === "number")
  {
    haogandu = Math.min(haogandu, empireFlags.affectionCap);
  }

  updateAffection();
}

function setAffection(value)
{
  haogandu = Number(value);

  if (typeof empireFlags.affectionCap === "number")
  {
    haogandu = Math.min(haogandu, empireFlags.affectionCap);
  }

  updateAffection();
}

function updateAffection()
{
  affectionValue.textContent = haogandu;
  affectionTip.textContent = "奥德里克好感度：" + haogandu;
}

function updateHP()
{
  const hp = currentHP();
  const fill = document.getElementById("hp-fill");
  const value = document.getElementById("hp-value");
  if (fill) fill.style.width = (hp / MAX_HP * 100) + "%";
  if (value) value.textContent = hp + "/" + MAX_HP;
}

function updateCurrency()
{
  renderInventory();
}

/*三位同伴好感度，持久化保存在 empireFlags.otherAffection*/
const OTHER_AFFECTION_UI =
{
  sky: { name: "赛琳", suffix: "sky" },
  forest: { name: "艾拉瑞亚", suffix: "forest" },
  under: { name: "格里姆", suffix: "underground" }
};

let otherHaogandu =
{
  sky: 0,
  forest: 0,
  under: 0
};

function loadOtherAffection()
{
  const stored = empireFlags.otherAffection;
  if (!stored || typeof stored !== "object") return;
  Object.keys(OTHER_AFFECTION_UI).forEach(function (faction)
  {
    if (typeof stored[faction] === "number") otherHaogandu[faction] = stored[faction];
  });
}

function persistOtherAffection()
{
  empireFlags.otherAffection =
  {
    sky: otherHaogandu.sky,
    forest: otherHaogandu.forest,
    under: otherHaogandu.under
  };
  saveEmpireFlags();
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
    {"type":"narrator","text":"商人递给你一个包裹：“帝国不相信奇迹——他们只相信铁和火。但你身上恰好有他们无法解释的东西。好好利用这一点。”"},
    {"type":"narrator","text":"获得初始物品：破旧的行囊、商人的地图、记忆碎片、基础治疗药剂×2。\n获得【帝国通行证】、情报【帝国议会派系】。奥德里克初始好感 +5。"},
    {"type":"effect","addItems":{"empirePass":1,"basicPotion":2},"addIntels":["帝国议会派系"]},
    {"type":"title","chapter":"第一章","subtitle":"钢铁与齿轮"},
    {"type":"narrator","text":"你离开了坠落地，神秘商人告诉你你身上对于污染有着天然的抗体。神秘商人给你的地图上标注了四个方向——天空、森林、地底，以及一座钢铁铸就的城市。你不知道那里有什么在等你——但你身上有他们想要的东西。而他们身上，也许有你需要的答案。这将是一场双赢的贸易。"},
    {"type":"narrator","text":"但在这之前，你需要一个切入点，你想到了一个人，首席符文师奥德里克，传闻中说他是一个为了实验不折不扣的疯子。那么你身上所拥有羽蚀抗体的秘密，相比也能在他这里换得一个不错的筹码。"},
    {"type":"narrator","text":"【主线任务1】找到奥德里克"},
    {"type":"title","chapter":"第一幕","subtitle":"铁门"},
    {"type":"narrator","text":"你朝着人类的帝国城邦走去，地面上并没有天空那么乐观，特别是城邦，一种奇怪的紫色气体总是隐隐飘在空中，这也许也是他们为什么如此追求抗体的缘故吧。城邦的工会为了污染和抗体已经奋斗很久了。"},
    {"type":"narrator","text":"帝国城邦的正门是一座巨大的钢铁闸门，嵌在两座黑色石塔之间。蒸汽从门缝中喷涌而出，带着金属灼烧的气味。闸门上方刻着一行字——“铁与火，铸就不朽”。"},
    {"type":"narrator","text":"门前站着四名卫兵。他们穿着统一的灰蓝色军服，胸口嵌着符文徽章，手中握着长铳。你注意到他们的目光在你身上停留了很久——他们在看你的后背。"},
    {"type":"char","role":"npc","speaker":"卫兵长","text":"站住，非帝国公民不得入内。"},
    {"type":"choice","options":[{"label":"出示【帝国通行证】","next":"chapter1_gate_pass"},{"label":"硬闯","next":"chapter1_gate_force"},{"label":"说出自己的身份：“我是来见奥德里克的。”","next":"chapter1_gate_meet"}]}
  ],
  "chapter1_gate_pass":
  [
    {"type":"narrator","text":"你从怀中取出商人的包裹里那张盖着帝国印章的羊皮纸。卫兵长接过去，翻来覆去地看了很久。"},
    {"type":"char","role":"npc","speaker":"卫兵长","text":"……这印章是真的，但我不记得议会签发过这张通行证。"},
    {"type":"narrator","text":"他抬头看你，他的目光扫过你空荡荡的后背。"},
    {"type":"char","role":"npc","speaker":"卫兵长","text":"你是羽人，但你没有翅膀。你是从天空之城来的？"},
    {"type":"narrator","text":"你没有回答，他把通行证递还给你。"},
    {"type":"char","role":"npc","speaker":"卫兵长","text":"进去吧。但我警告你——帝国不欢迎羽人，尤其是没有翅膀的羽人。你在这里没有身份，没有权利，没有保护。如果你惹了麻烦，没人会替你说话。"},
    {"type":"narrator","text":"进入帝国城邦。"},
    {"type":"jump","goto":"chapter1_city"}
  ],
  "chapter1_gate_force":
  [
    {"type":"narrator","text":"你没有停下脚步，四名卫兵同时举起长铳。战斗一触即发。"},
    {"type":"battle","id":"gate","success":"chapter1_gate_force_success","fail":"chapter1_gate_force_fail","url":"game3.html?mode=empire"}
  ],
  "chapter1_gate_force_success":
  [
    {"type":"narrator","text":"四名卫兵倒在地上。你跨过他们走进铁门。身后传来卫兵长的声音。"},
    {"type":"char","role":"npc","speaker":"卫兵长","text":"你……你会后悔的。帝国不会放过一个攻击卫兵的人。"},
    {"type":"narrator","text":"状态更新：获得【通缉】——帝国城邦行动受限；奥德里克初始好感-10，他认为你做事不计后果，上限锁死60；帝国底层居民更容易信任你"},
    {"type":"effect","affection":-10,"flags":{"wanted":true,"affectionCap":60},"addStatuses":["通缉"]},
    {"type":"jump","goto":"chapter1_city"}
  ],
  "chapter1_gate_force_fail":
  [
    {"type":"narrator","text":"你被卫兵制服，扔进了城外的污染隔离区。几日后，羽蚀降临，你被腐蚀，世界毁灭。"},
    {"type":"narrator","text":"【结局：铁门之前】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "chapter1_gate_meet":
  [
    {"type":"narrator","text":"卫兵长看着你。沉默了很久。"},
    {"type":"char","role":"npc","speaker":"卫兵长","text":"奥德里克？首席符文师奥德里克？"},
    {"type":"narrator","text":"他打量着你——你的后背是空的，衣服上还沾着地面的泥。"},
    {"type":"char","role":"npc","speaker":"卫兵长","text":"……你等着。"},
    {"type":"narrator","text":"他转身走进铁门旁的哨站。几分钟后，他出来了。"},
    {"type":"char","role":"npc","speaker":"卫兵长","text":"进去吧。奥德里克在符文工坊。他说“他知道你会来”。"},
    {"type":"narrator","text":"进入帝国城邦。奥德里克初始好感+5。"},
    {"type":"jump","goto":"chapter1_city"}
  ],
  "chapter1_city":
  [
    {"type":"title","chapter":"第二幕","subtitle":"钢铁之城"},
    {"type":"narrator","text":"你穿过铁门。蒸汽从两侧管道中喷涌而出，遮蔽了视线。等雾气散去，你看到了帝国城邦的全貌。这是一座钢铁与蒸汽铸就的巨型都市，这里的齿轮转动声日夜不息，烟雾从无数管道中升腾，遮蔽了天空。议会厅的尖顶刺入雾霾，黑市的暗巷在城底蔓延。"},
    {"type":"narrator","text":"你走在街道上。人类从你身边走过——他们穿着灰蓝色的工装，脸上沾着机油和煤灰。没有人看你，或者说，有人在看——但他们的目光很快就移开了。你是这座城市里唯一一个羽人，却没有翅膀。他们不知道该把你归入哪一类。"},
    {"type":"narrator","text":"你抬起头，天空是灰色的，没有云，只有烟。"},
    {"type":"narrator","text":"你继续往前走去。"},
    {"type":"jump","goto":"workshop"}
  ],
  "workshop":
  [
    {"type":"title","chapter":"第三幕","subtitle":"符文工坊"},
    {"type":"narrator","text":"你穿过议会广场，绕过蒸汽管道，来到城市边缘的符文工坊。这是一栋由旧厂房改建的建筑——墙壁上嵌满了发光的符文石板，金属零件和工具散落在门口。空气中弥漫着金属灼烧和机油混合的气味。"},
    {"type":"narrator","text":"你推开门。工坊内部比外面更大——穹顶高得几乎看不到顶，符文光芒从四面墙壁上散发出来，照亮了每一个角落。中央的工作台前，一个男人正背对着你操作着什么。"},
    {"type":"narrator","text":"他的右臂——或者说，原本是右臂的位置——嵌着一只银灰色的金属义肢。符文在金属表面流动，发出微弱的蓝光。"},
    {"type":"narrator","text":"他没有回头。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你就是那个无翼者。"},
    {"type":"narrator","text":"他放下手中的工具，转过身来。他的脸上有一道从额角延伸到下巴的旧伤疤，灰白色的短发被汗水打湿，贴在额头上。他看起来比他的实际年龄更老——像是被什么东西在内部磨损了。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"议会已经传开了。一个无翼者从天空之城坠落，身上带着抗性。帝国需要你。但我需要你之前——先确认一件事。"},
    {"type":"narrator","text":"他举起他的义肢。符文光芒在掌心中汇聚。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你身上的抗性——能不能被提取？能不能被复制？这决定你在这里是客人，还是实验品。"},
    {"type":"choice","options":[{"label":"接受实验","next":"chapter1_experiment_accept"},{"label":"拒绝实验，提出其他合作方式","next":"chapter1_experiment_refuse"},{"label":"反问：“你的断臂也是实验造成的吗？”","next":"chapter1_experiment_question"}]}
  ],
  "chapter1_experiment_accept":
  [
    {"type":"narrator","text":"你点了点头。他沉默了片刻，然后义肢上的符文光芒亮了一度。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"好。那跟我来。"},
    {"type":"narrator","text":"他带你走到工坊深处的一间隔离室。墙壁上嵌满了符文，空气中有一股尖锐的金属气味。他让你坐在一张金属椅子上，然后把一只符文探头贴在你的手臂上。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"会有点疼。忍一下。"},
    {"type":"narrator","text":"符文探头发出低沉的嗡鸣。你感觉到一股温热从手臂蔓延到肩膀——然后是一阵尖锐的刺痛，你的视野短暂地变黑了。"},
    {"type":"narrator","text":"抗体检测开始。请完成检测小游戏。"},
    {"type":"skillcheck","id":"antibody","success":"chapter1_experiment_success","fail":"chapter1_experiment_fail","url":"game5.html?mode=empire&task=antibody"}
  ],
  "chapter1_experiment_success":
  [
    {"type":"narrator","text":"探头发出绿色的光。奥德里克看着读数，沉默了很久。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你的抗性……不是“有”，是“融合”。你身体里有某种东西——和污染同源，但方向相反。我从来没见过这样的数据。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我们去附近的污染区，正好让我看看你的抗体。"},
    {"type":"narrator","text":"获得【符文装甲原型】。奥德里克好感+10。"},
    {"type":"effect","affection":10,"flags":{"armorPrototype":true},"addItems":{"armorPrototype":1}},
    {"type":"jump","goto":"chapter1_furnace"}
  ],
  "chapter1_experiment_fail":
  [
    {"type":"narrator","text":"探头发出刺耳的警报。你的手臂上出现了一道黑色的裂纹——从手腕延伸到肘部。奥德里克立刻拔掉了探头，那道黑色的裂纹就消失不见了。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你的抗性太强了，探头承受不住。你……你身体里的东西比我想象的复杂得多。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我们去附近的污染区，正好让我看看你的抗体。"},
    {"type":"narrator","text":"奥德里克好感+5。他看你的眼神变了——不再是研究者看样本，而是某种更复杂的东西。"},
    {"type":"effect","affection":5},
    {"type":"jump","goto":"chapter1_furnace"}
  ],
  "chapter1_experiment_refuse":
  [
    {"type":"narrator","text":"你后退一步，指向工坊里的符文装备——那些散落在台面上的零件和半成品。你比划着：我可以帮你做事，但我不当实验品。"},
    {"type":"narrator","text":"奥德里克看着你，他的表情没有变化——但你感觉到他在重新评估你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你不信任我，这是合理的。帝国并不值得信任——包括我在内。"},
    {"type":"narrator","text":"他走到工作台前，拿起一只半成品的符文臂甲。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"好，我不强迫你，但如果你要留在帝国——你得证明你有用。这附近有污染区，最近晶骸越来越活跃，你去清理一下，我看看你的能力。"},
    {"type":"narrator","text":"奥德里克好感-5，但他开始尊重你的谨慎。"},
    {"type":"effect","affection":-5},
    {"type":"jump","goto":"chapter1_furnace"}
  ],
  "chapter1_experiment_question":
  [
    {"type":"narrator","text":"你没有回答他的问题，你看着他的义肢——那些符文在金属表面流动，宛若血脉流淌。然后你指向他的右臂。"},
    {"type":"narrator","text":"奥德里克的动作停住了，他的义肢发出了一声极其细微的嗡鸣——符文光芒忽明忽暗。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"……你问这个干什么？"},
    {"type":"char","role":"player","speaker":"你","text":"我只是想知道你经历过什么。"},
    {"type":"narrator","text":"奥德里克看着那几个字。沉默了很久。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"二十年前，地面人类与污染生物之间发生了一场晶骸战争。我带着四十个人出去，回来的时候只剩我一个。但当时我的右臂也被污染结晶刺穿了，后来我自己把它切了下来，帝国就给了我这只新的。"},
    {"type":"narrator","text":"他抬起义肢，看着它。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"符文金属比血肉可靠，但它不会疼。有时候我想——如果我还能感觉到疼，也许我会好受一点。"},
    {"type":"narrator","text":"奥德里克好感+15。"},
    {"type":"narrator","text":"他放下义肢，看着你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我能感觉到，你和别人不太一样，那就试试吧，我不会强迫你做实验的。但如果你愿意——我可以帮你找你要找的东西。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但如果你要留在帝国——你得证明你有用。这附近有一片污染区，最近晶骸越来越活跃，你去清理一下，让我看看你的能力。"},
    {"type":"effect","affection":15},
    {"type":"jump","goto":"chapter1_furnace"}
  ],
  "chapter1_furnace":
  [
    {"type":"title","chapter":"第四幕","subtitle":"污染熔炉"},
    {"type":"narrator","text":"奥德里克带你来到城市边缘的熔炉区，巨大的蒸汽熔炉已经停止运转，炉壁上覆盖着厚厚的黑色结晶。空气中弥漫着刺鼻的硫磺气味。远处有晶骸在废墟中游荡。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"这座熔炉能为半个城市提供能源，但三天前被污染了。我需要有人深入炉心，安放符文炸弹。但我的义肢在污染环境中会暴走。"},
    {"type":"narrator","text":"他看向你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你身上有抗性，你是唯一能进去的人。"},
    {"type":"choice","options":[{"label":"替他进入炉心","next":"chapter1_furnace_self"},{"label":"让他去，你从旁掩护","next":"chapter1_furnace_cover"},{"label":"找借口留在后方","next":"chapter1_furnace_back"}]}
  ],
  "chapter1_furnace_self":
  [
    {"type":"narrator","text":"你点了点头，从他手中接过符文炸弹。他沉默了片刻——然后拉住你的手臂。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"等等。"},
    {"type":"narrator","text":"他从怀中取出一枚小型的符文护符，挂在你脖子上。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"这是应急装置，如果你感觉到不对劲——捏碎它。它会把你传送出来。只有一次机会。"},
    {"type":"effect","addItems":{"runeAmulet":1}},
    {"type":"narrator","text":"你走进炉心，污染浓度极高。你的视野在变暗，皮肤上也隐隐约约有刺痛感。但你的抗性仍在抵抗污染，你把炸弹安放到了在炉心中央。"},
    {"type":"narrator","text":"符文炸弹已经就位。请完成安放炸弹小游戏。"},
    {"type":"skillcheck","id":"bomb_self","success":"chapter1_furnace_self_success","fail":"chapter1_furnace_self_fail","url":"game5.html?mode=empire&task=bomb"}
  ],
  "chapter1_furnace_self_success":
  [
    {"type":"narrator","text":"爆炸的火光从身后升起。你被冲击波推倒在地，但符文护符在最后一刻亮了——你没有受伤。奥德里克冲进来找你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你——你还活着......"},
    {"type":"narrator","text":"他蹲在你旁边,检查你的伤势，这是你第一次看见他出现情绪波动。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"太好了......你没受伤。"},
    {"type":"narrator","text":"奥德里克好感+20。"},
    {"type":"effect","affection":20,"removeItems":{"runeAmulet":1}},
    {"type":"jump","goto":"chapter1_ironblood"}
  ],
  "chapter1_furnace_self_fail":
  [
    {"type":"narrator","text":"炸弹在安放过程中触发。你被冲击波击中，符文护符碎裂。你昏迷前看到奥德里克冲进炉心——他用义肢撑住了坍塌的炉壁。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"别死......求你了。对于死亡，我已经受够了......"},
    {"type":"narrator","text":"你没能听见他后面的话，你昏了过去，好在符文保护了你，你并没有受太重的伤。"},
    {"type":"narrator","text":"奥德里克好感+10。"},
    {"type":"effect","affection":10,"removeItems":{"runeAmulet":1}},
    {"type":"jump","goto":"chapter1_ironblood"}
  ],
  "chapter1_furnace_cover":
  [
    {"type":"narrator","text":"你摇了摇头。"},
    {"type":"char","role":"player","speaker":"你","text":"我只能掩护你。"},
    {"type":"narrator","text":"奥德里克看着你，沉默了很久。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"……你不怕我暴走？不怕我转身攻击你？"},
    {"type":"narrator","text":"你没有回答，只是站在他身边，举起了武器。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"好。那一起。"},
    {"type":"narrator","text":"你们并肩进入炉心，奥德里克的义肢在污染中发出刺耳的嗡鸣——符文光芒从蓝色变成红色。他咬着牙，用义肢撑住了坍塌的炉壁。你掩护他，清除了周围的晶骸。"},
    {"type":"narrator","text":"你负责掩护奥德里克，请完成安放炸弹小游戏。"},
    {"type":"skillcheck","id":"bomb_cover","success":"chapter1_furnace_cover_success","fail":"chapter1_furnace_cover_fail","url":"game5.html?mode=empire&task=bomb"}
  ],
  "chapter1_furnace_cover_success":
  [
    {"type":"narrator","text":"炸弹安放完成。爆炸的火光从身后升起。你们一起冲出熔炉。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你……你成功了。"},
    {"type":"narrator","text":"他看着你，义肢恢复了蓝色光芒，但他脸上的表情——是某种你从未在他脸上见过的东西。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"二十年前，我的小队也像这样掩护了我，但他们却死了......"},
    {"type":"narrator","text":"他不再说话，奥德里克好感+10。"},
    {"type":"effect","affection":10},
    {"type":"jump","goto":"chapter1_ironblood"}
  ],
  "chapter1_furnace_cover_fail":
  [
    {"type":"narrator","text":"奥德里克的义肢在污染中暴走。他转身向你发起进攻，你被迫与他战斗。他醒来后，看着自己沾满血的义肢，没有说话。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"……我早告诉过你，它会暴走。"},
    {"type":"narrator","text":"奥德里克好感-10。"},
    {"type":"effect","affection":-10},
    {"type":"jump","goto":"chapter1_ironblood"}
  ],
  "chapter1_furnace_back":
  [
    {"type":"narrator","text":"你后退一步。你指向自己的手臂——之前的实验伤口还在。"},
    {"type":"char","role":"player","speaker":"你","text":"我受伤了，进不去。"},
    {"type":"narrator","text":"奥德里克看着你。他的表情没有变化。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"……我明白了。"},
    {"type":"narrator","text":"他转身独自走进熔炉，你站在外面，听着里面传来的轰鸣和爆炸声。几分钟后，他走出来了——义肢冒着烟，脸上有灼伤。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"炸了，但熔炉保住了。"},
    {"type":"narrator","text":"他没有看你，但走过你身边时，停了一下。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"下次别找借口。直接说“我不去”，比起自私，我更尊重诚实。"},
    {"type":"narrator","text":"奥德里克好感-20。"},
    {"type":"effect","affection":-20},
    {"type":"jump","goto":"chapter1_ironblood"}
  ],
  "chapter1_ironblood":
  [
    {"type":"title","chapter":"第五幕","subtitle":"铁与血"},
    {"type":"narrator","text":"深夜，奥德里克把你叫到工坊，他的脸色比平时更沉。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我在整理污染熔炉的残留数据时……发现了一些东西，你来看看。"},
    {"type":"narrator","text":"他打开一只上锁的抽屉，取出一叠文件。文件上印着帝国的官方印章——以及一行极其细小的字：“羽人抗性活体实验·第47号样本。”"},
    {"type":"narrator","text":"你翻看文件。里面是实验记录——羽人被绑在实验台上，符文探头插入他们的脊椎。记录上写着：“样本A-7，抗性提取失败，样本死亡。样本A-8，抗性提取成功，样本死亡。”"},
    {"type":"narrator","text":"最后一页写着：“由于上一阶段羽人体质与人类差异太大。下一阶段：活体提取。对象——无翼者。”"},
    {"type":"narrator","text":"奥德里克站在你身后。他的义肢在颤抖——符文光芒忽明忽暗。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我不知道。我发誓——我不知道他们已经到了这个地步。"},
    {"type":"char","role":"player","speaker":"你","text":"原来这就是......帝国没有羽人的原因吗......"},
    {"type":"choice","options":[{"label":"谴责他并要求公开真相","next":"chapter1_blood_condemn"},{"label":"替他保密","next":"chapter1_blood_hide"},{"label":"威胁要举报他","next":"chapter1_blood_threat"}]}
  ],
  "chapter1_blood_condemn":
  [
    {"type":"narrator","text":"你看着他的眼睛，把文件举到他面前。"},
    {"type":"char","role":"player","speaker":"你","text":"奥德里克，你究竟是知道，还是不知道？"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我只知道他们在做实验。但我不知道对象是生物活体，是羽人。我以为……他们只是在研究污染。我告诉自己，那是为了战争，为了帝国。"},
    {"type":"narrator","text":"他低下头。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你说得对，我一直在骗自己。"},
    {"type":"narrator","text":"他抬起了头。这一次，他的眼神变了——不再是愧疚，而是某种更冷的东西。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我会公开这份文件。就明天，在议会厅。"},
    {"type":"narrator","text":"奥德里克好感+15。"},
    {"type":"effect","affection":15,"flags":{"publishTruth":true}},
    {"type":"jump","goto":"chapter1_rooftop"}
  ],
  "chapter1_blood_hide":
  [
    {"type":"narrator","text":"你合上文件，把它放回抽屉。你看着他，摇了摇头。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你……你不打算说出去？"},
    {"type":"narrator","text":"他的声音在发抖。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你知道这意味着什么吗？如果你不公开这份文件，他们会继续实验。他们会找到更多羽人。他们会……"},
    {"type":"narrator","text":"他没有说完。他看着你，他的眼神很复杂——愧疚、愤怒、还有某种你无法解读的东西。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"感谢你替我保密，但我不会原谅自己。"},
    {"type":"narrator","text":"奥德里克好感-10。"},
    {"type":"effect","affection":-10},
    {"type":"jump","goto":"chapter1_rooftop"}
  ],
  "chapter1_blood_threat":
  [
    {"type":"narrator","text":"你把文件收起来。"},
    {"type":"char","role":"player","speaker":"你","text":"如果你不做，我就来帮你做。"},
    {"type":"narrator","text":"奥德里克看着你，沉默了很久。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你在威胁我。"},
    {"type":"narrator","text":"他笑了一下，那个笑容很冷。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你知道我为什么留在这座城吗？那是因为我在赎罪。我活着，是因为我欠那些死去的人。如果你要把我交给议会——那就交吧。"},
    {"type":"narrator","text":"他转过身，背对着你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我本就不该出现在这里，但我不会原谅你。你跟他们，也没什么两样。"},
    {"type":"narrator","text":"奥德里克好感-25。"},
    {"type":"effect","affection":-25,"addItems":{"experimentFiles":1}},
    {"type":"jump","goto":"chapter1_rooftop"}
  ],
  "chapter1_rooftop":
  [
    {"type":"narrator","text":"深夜，奥德里克都会出现在工坊顶楼。他站在栏杆边，俯瞰整座城市。蒸汽从无数管道中升起，在月光下像一层薄纱。"},
    {"type":"narrator","text":"你因为失眠，恰好来到了工坊顶楼。"},
    {"type":"narrator","text":"他听到你的脚步声，但没有回头。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你明天就要走了，对吗？我知道，你有你自己的路——你要找的东西也不在帝国。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"有时候我会想，你究竟要找什么呢？还有什么可以拯救这个国家，拯救这个世界的吗？"},
    {"type":"narrator","text":"他转过身看你，他的义肢在月光下发出微弱的蓝光。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但我想告诉你一件事。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"二十年前，我就从这栋楼出发，一路往东，去参加晶骸战争。回来的时候，少了这只手，多了这些座坟墓。我以为我的人生就到此为止了，一眼就能看到头了。于是我把自己关在工坊里，用符文金属代替血肉，我一直告诉自己——我只需要活着，不需要停下。"},
    {"type":"narrator","text":"他停顿了一下。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但后来你来了。你问我的断臂是怎么来的，你操作了引爆器，陪我去污染区。就像曾经，就像曾经......"},
    {"type":"narrator","text":"他看着你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"所以我想问你——等你找到你要找的东西，你会回来吗？"},
    {"type":"choice","options":[{"label":"“我会回来。”","next":"chapter1_promise_return"},{"label":"“我不知道。”","next":"chapter1_promise_unknown"},{"label":"沉默，站在他旁边看城市。","next":"chapter1_promise_silent"}]}
  ],
  "chapter1_promise_return":
  [
    {"type":"narrator","text":"奥德里克看着你。他没有笑。但他的义肢上的符文光芒亮了一度。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"好。我等你。"},
    {"type":"narrator","text":"奥德里克好感+15。获得状态【奥德里克的约定】。"},
    {"type":"effect","affection":15,"flags":{"aldricPromise":true},"addStatuses":["奥德里克的约定"]},
    {"type":"jump","goto":"chapter1_end"}
  ],
  "chapter1_promise_unknown":
  [
    {"type":"char","role":"npc","speaker":"奥德里克","text":"……的确诚实，我喜欢。"},
    {"type":"narrator","text":"他转过身，继续俯瞰城市。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"那就走吧。如果有一天你回来了，工坊的门不会锁。"},
    {"type":"narrator","text":"奥德里克好感+5。"},
    {"type":"effect","affection":5},
    {"type":"jump","goto":"chapter1_end"}
  ],
  "chapter1_promise_silent":
  [
    {"type":"narrator","text":"你走到栏杆边，和他并肩站着。蒸汽从管道中升起，月光穿过雾气，落在你们的身上。他没有说话，你也没有。"},
    {"type":"narrator","text":"过了很久，他低声说了一句。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你是第一个站在这里的人。以前的战友都死了，我以为我永远不会再和人并肩站在一起。"},
    {"type":"narrator","text":"奥德里克好感+10。"},
    {"type":"effect","affection":10},
    {"type":"jump","goto":"chapter1_end"}
  ],
  "chapter1_end":
  [
    {"type":"narrator","text":"第二天清晨，你站在帝国城邦的铁门前。奥德里克没有来送你，但你口袋里多了一只小型的符文护符——和他给你的那枚一模一样。"},
    {"type":"effect","addItems":{"runeAmulet":1}},
    {"type":"narrator","text":"你想起他说过的话：“符文金属比血肉可靠，但它不会疼。”"},
    {"type":"narrator","text":"你走出铁门，蒸汽从身后涌来。城市在你背后逐渐缩小，变成一团模糊的灰影。你走向下一个目的地——不知道前面有什么在等你。但你知道，有一个人在帝国等你回来。"},
    {"type":"jump","goto":"freedom1"}
  ],
  "mainmap_1":
  [
    {"type":"freedomEnd","day":1,"next":"chapter2"}
  ],
  "freedom1":
  [
    {"type":"narrator","text":"【自由行动日 1】\n点击左上角小地图开启自由探索。"}
  ],
  "mainmap_2":
  [
    {"type":"freedomEnd","day":2,"next":"chapter3"}
  ],
  "freedom2":
  [
    {"type":"narrator","text":"【自由行动日 2】\n点击左上角小地图开启自由探索。"}
  ],
  "mainmap_3":
  [
    {"type":"freedomEnd","day":3,"next":"chapter4"}
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
    {"type":"skillcheck","id":"feather","success":"yun_feather_ok","fail":"yun_feather_fail","url":"game2.html?mode=empire"}
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
    {"type":"infiltration","id":"sky_archive","success":"trial_infil_ok","fail":"trial_infil_fail","url":"game4.html?mode=empire"}
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
    {"type":"effect","addIntels":["底层羽人的沉默"],"otherAffection":{"sky":4},"affection":2},
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
    {"type":"skillcheck","id":"rune_tune","success":"fu_tune_ok","fail":"fu_tune_partial","url":"game5.html?mode=empire&task=rune"}
  ],
  "fu_tune_ok":
  [
    {"type":"narrator","text":"你稳稳地校准了每一道符文。奥德里克点了点头。"},
    {"type":"effect","addItems":{"runeFragment":2},"affection":5},
    {"type":"freedomReturn"}
  ],
  "fu_tune_partial":
  [
    {"type":"narrator","text":"你校准得磕磕绊绊，但好歹没有全错。"},
    {"type":"effect","addItems":{"runeFragment":1},"affection":2},
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
    {"type":"auto","options":
    [
      {"min":30,"max":9999,"next":"lao_confirm_flag"},
      {"min":-9999,"max":29,"next":"lao_confirm_deny"}
    ]}
  ],
  "lao_confirm_flag":
  [
    {"type":"flagauto","flag":"laoConfirmDone","routes":{"true":"lao_confirm_deny"},"default":"lao_confirm_do"}
  ],
  "lao_confirm_do":
  [
    {"type":"char","role":"npc","speaker":"守墓人","text":"他不在这儿，他每周都来，站在那块空碑前面，站一会儿就走。二十年了。"},
    {"type":"effect","addIntels":["第四十座碑"],"affection":12,"flags":{"laoConfirmDone":true}},
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
    {"type":"battle","id":"isolation","success":"wu_win","fail":"wu_lose","url":"game3.html?mode=empire"}
  ],
  "wu_win":
  [
    {"type":"narrator","text":"晶骸碎成一地。你从残骸里捡出一些还能用的结晶。"},
    {"type":"effect","addItems":{"crystalFragment":2,"lowPurityCrystal":1},"memoryDelta":3,"affection":3},
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
    {"type":"skillcheck","id":"council","success":"steam_vote_ok","fail":"steam_vote_fail","url":"game5.html?mode=empire&task=council"}
  ],
  "steam_vote_ok":
  [
    {"type":"narrator","text":"反对票凑够了六十张，议案被否决了。议员们面面相觑。"},
    {"type":"effect","affection":5},
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
    {"type":"effect","affection":3},
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
    {"type":"skillcheck","id":"mine","success":"kuang_mine_ok","fail":"kuang_mine_fail","url":"game1.html?mode=empire"}
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
    {"type":"battle","id":"haggle","success":"di_haggle_ok","fail":"di_haggle_priceup","cancel":"di_haggle_cancel","url":"game3.html?mode=empire"}
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
    {"type":"battle","id":"rift","success":"shen_win","fail":"shen_lose","url":"game3.html?mode=empire"}
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
    {"type":"infiltration","id":"lab","success":"hui_infil_ok","fail":"hui_infil_fail","url":"game4.html?mode=empire"}
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
    {"type":"effect","otherAffection":{"forest":2}},
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
    {"type":"skillcheck","id":"echo","success":"dong_song_ok","fail":"dong_song_partial","url":"game8.html?mode=empire"}
  ],
  "dong_song_ok":
  [
    {"type":"narrator","text":"你完整地复现了那三段旋律，学会了回声的歌。"},
    {"type":"effect","addStatuses":["回声的歌"],"otherAffection":{"forest":10}},
    {"type":"freedomReturn"}
  ],
  "dong_song_partial":
  [
    {"type":"narrator","text":"你只记下了部分旋律。"},
    {"type":"effect","otherAffection":{"forest":5}},
    {"type":"freedomReturn"}
  ],
  "dong_elarria":
  [
    {"type":"otherauto","faction":"forest","min":40,"pass":"dong_elarria_flag","fail":"dong_elarria_deny"}
  ],
  "dong_elarria_flag":
  [
    {"type":"flagauto","flag":"dongElarriaDone","routes":{"true":"dong_elarria_deny"},"default":"dong_elarria_do"}
  ],
  "dong_elarria_do":
  [
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"原来我的名字听起来是这样的。"},
    {"type":"effect","otherAffection":{"forest":15},"addStatuses":["她听过自己的名字"],"flags":{"dongElarriaDone":true}},
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
    {"type":"skillcheck","id":"gen_moss","url":"game7.html?mode=empire&task=moss","success":"gen_moss_win","fail":"gen_moss_fail"}
  ],
  "gen_moss_win":
  [
    {"type":"narrator","text":"你采到了三处苔藓。"},
    {"type":"effect","addItems":{"wildMoss":3},"otherAffection":{"forest":2}},
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
    {"type":"skillcheck","id":"zhao_moss","url":"game7.html?mode=empire&task=moss","success":"zhao_moss_win","fail":"zhao_moss_fail"}
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
    {"type":"battle","id":"deer","success":"zhao_deer_kill","fail":"zhao_deer_release","url":"game3.html?mode=empire"}
  ],
  "zhao_deer_kill":
  [
    {"type":"narrator","text":"你杀死了晶化幼鹿。艾拉瑞亚站在远处，什么也没说。"},
    {"type":"effect","addItems":{"crystalFragment":2,"highPurityCrystal":1},"otherAffection":{"forest":-10}},
    {"type":"freedomReturn"}
  ],
  "zhao_deer_release":
  [
    {"type":"narrator","text":"你放走了幼鹿。它踉跄着跑进林子里，艾拉瑞亚朝你点了点头。"},
    {"type":"effect","otherAffection":{"forest":15}},
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
    {"type":"effect","addIntels":["镇上的人怎么说"],"otherAffection":{"forest":5},"flags":{"chenChatDone":true}},
    {"type":"freedomReturn"}
  ],
  "chen_chat_again":
  [
    {"type":"narrator","text":"你与老精灵们相谈甚欢，他们告诉了你森林里很多有趣的事。"},
    {"type":"effect","otherAffection":{"forest":5}},
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
    {"type":"auto","options":
    [
      {"min":31,"max":9999,"next":"ruins_aldric_talk"},
      {"min":-9999,"max":30,"next":"ruins_aldric_only"}
    ]}
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
    {"type":"otherauto","faction":"forest","min":31,"pass":"ruins_elarria_talk","fail":"ruins_elarria_only"}
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

  "chapter2":
  [
    {"type":"title","chapter":"第二章","subtitle":"齿轮之下"},
    {"type":"narrator","text":"你离开帝国城邦已经一天了。你走在通往下一个目的地的路上，身后的蒸汽和齿轮声逐渐远去。但你口袋里那枚符文护符却一直在微微发烫。"},
    {"type":"narrator","text":"深夜，你在一处废墟中歇脚。符文护符突然亮了起来——蓝色的光芒从金属表面溢出，在空中凝成一行字。是奥德里克的笔迹，用的是帝国官方的紧急通讯格式。"},
    {"type":"narrator","text":"符文信息：“议会通过了对天空之城的作战议案，三天后执行。收到信息，即刻回来。符文工坊。”"},
    {"type":"narrator","text":"你站起身，回头看了一眼帝国的方向。蒸汽在远方升起，像一根黑色的柱子刺入天空。你收好护符，转身往回走。"},
    {"type":"title","chapter":"第一幕","subtitle":"暗流"},
    {"type":"narrator","text":"你回到帝国城邦时，天还没亮。铁门前的卫兵比上次多了一倍，但侧门还开着——大概是奥德里克提前打过招呼。你穿过空无一人的街道，蒸汽管道在夜色中发出低沉的嗡鸣。"},
    {"type":"narrator","text":"符文工坊的门没有锁。你推开门，里面一片漆黑，只有最深处的工作台上，亮着一盏符文灯。"},
    {"type":"narrator","text":"你走向工坊深处，奥德里克背对着你，站在工作台前。他的义肢在符文灯下泛着微弱的蓝光——但光芒比平时更暗，像蒙了一层灰。"},
    {"type":"narrator","text":"他没有回头。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你来了。把门关上。"},
    {"type":"narrator","text":"你关上门，他转过身，表情比上次见面时更沉——眼窝深陷，像是几天没睡。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我这两天查了一些东西。污染熔炉的数据、议会最近的动向……以及关于你。"},
    {"type":"narrator","text":"他从工作台下抽出一份文件，推到你面前。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"议会通过了一项新议案。他们要对天空之城发动“先发制人的打击”。理由是“消除污染源头”。"},
    {"type":"narrator","text":"你翻开文件。上面印着议会的正式印章，日期是一天前——你正好离开的那天。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"军派提交了这份议案。他们说天空之城的风脉之心是污染扩散的源头，只有摧毁它，帝国才能生存。"},
    {"type":"narrator","text":"他沉默了片刻。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但他们没告诉任何人真实目的——他们想要的，是风脉之心的能量核心。他们想把它挖出来，装进帝国的符文炮里。"},
    {"type":"choice","options":[{"label":"“你怎么知道的？”","next":"chapter2_question_a"},{"label":"“你打算怎么做？”","next":"chapter2_question_b"},{"label":"沉默，等待他继续说。","next":"chapter2_question_c"}]}
  ],
  "chapter2_question_a":
  [
    {"type":"char","role":"npc","speaker":"奥德里克","text":"因为校准符文炮的人是我。"},
    {"type":"narrator","text":"他抬起义肢，符文光芒在掌心中汇聚。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"他们让我把炮口对准天空之城。我没有办法……但我留了一份后门程序——我可以让炮口偏一度。一度而已，打不中要害。"},
    {"type":"narrator","text":"他放下义肢，看着你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但这不是长久之计。如果他们发现我动了手脚——我会被处决，你也会。我想……我们或许需要阻止他们。"},
    {"type":"narrator","text":"奥德里克好感+5。获得情报【军派的真实目的】。"},
    {"type":"effect","affection":5,"addIntels":["军派的真实目的"]},
    {"type":"jump","goto":"chapter2_after_question"}
  ],
  "chapter2_question_b":
  [
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我不知道。"},
    {"type":"narrator","text":"他走到窗前，看着外面的城市。蒸汽从管道中升起，遮蔽了月光。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我在这座城里活了二十年，替他们做了很多事。有些是对的，有些不是。那些事情都已经过去了很久很久，我已经不知道究竟是我想做，还是我不得不去做……"},
    {"type":"narrator","text":"他转过身看你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但天空之城——我不想打。那座城里的人和我们不一样，但和你一样。有翅膀的，没有翅膀的，被剪断翅膀的……他们不该被炸成碎片。"},
    {"type":"narrator","text":"他停顿了一下。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我一个人阻止不了议会。我需要你。"},
    {"type":"narrator","text":"奥德里克好感+8。"},
    {"type":"effect","affection":8},
    {"type":"jump","goto":"chapter2_after_question"}
  ],
  "chapter2_question_c":
  [
    {"type":"narrator","text":"你没有说话，看着他。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"……你不问为什么？"},
    {"type":"char","role":"player","speaker":"你","text":"我能感觉到你还想说些什么。"},
    {"type":"narrator","text":"奥德里克沉默了很久。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你相信我，虽然这很危险。但……谢谢。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"军派提交了议案，他们要对天空之城动手。我需要你帮我在议会投票之前，找到军派的弱点。否则，天空之城会变成一片废墟。"},
    {"type":"narrator","text":"奥德里克好感+10。"},
    {"type":"effect","affection":10},
    {"type":"jump","goto":"chapter2_after_question"}
  ],
  "chapter2_after_question":
  [
    {"type":"narrator","text":"奥德里克把文件重新锁回抽屉，转过身面对你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"投票就在今天正午。我们还有时间——但不多。"},
    {"type":"narrator","text":"他走到工作台前，拿起一只符文臂甲，递给你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"拿着，这不是武器——是护盾。如果你在议会厅里遇到麻烦，它能挡一次攻击。"},
    {"type":"narrator","text":"获得【符文护盾】"},
    {"type":"effect","addItems":{"runeShield":1}},
    {"type":"narrator","text":"【主线任务】更新：前往蒸汽议会厅，阻止议案通过。"},
    {"type":"jump","goto":"chapter2_council"}
  ],
  "chapter2_council":
  [
    {"type":"title","chapter":"第二幕","subtitle":"议会厅"},
    {"type":"narrator","text":"正午，蒸汽议会厅，巨大的圆形建筑——穹顶由金属骨架支撑，符文灯光从穹顶垂下，照亮中央的圆形议事台。议会成员坐在环形阶梯上，军派、科研派、商业派各自占据一片区域。"},
    {"type":"narrator","text":"你站在旁听席的角落。奥德里克站在你身边，他的义肢藏在斗篷下面。他压低声音。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"看到那个站在中间的人了吗？那是军派领袖。他今天要提交正式议案。"},
    {"type":"narrator","text":"军派领袖站在议事台中央。胸前挂满了勋章，左手按在剑柄上。他的声音在穹顶下回荡。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"天空之城的污染正在扩散。三天前，我们的熔炉被污染了。三天后，可能就是整座城市。我们不能等——我们必须先发制人。"},
    {"type":"narrator","text":"旁听席上响起掌声。掌声快要结束时，科研派的代表站了起来。"},
    {"type":"char","role":"npc","speaker":"科研派代表","text":"将军，污染扩散的原因还没有查明。如果是天空之城的问题，我们应该先调查——"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"调查？我们的士兵在污染区里死的时候，你在调查什么？"},
    {"type":"narrator","text":"掌声又响了起来。军派领袖转身看向议会。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"我提议——帝国立即对天空之城发动“净化行动”。摧毁风脉之心，消除污染源头。"},
    {"type":"choice","options":[{"label":"观察议会投票。","next":"chapter2_vote_watch"},{"label":"试图阻止投票。","next":"chapter2_vote_stop"}]}
  ],
  "chapter2_vote_watch":
  [
    {"type":"narrator","text":"你看着议会投票。军派占据多数——他们的支持者大多是退伍军人和军工商人。科研派和商业派分裂了，议案以多数票通过。"},
    {"type":"narrator","text":"奥德里克在你身边低声说。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"虽然议案通过了，但执行需要时间。他们需要组装符文炮，需要校准。我们还有三天。"},
    {"type":"narrator","text":"获得情报【三天的窗口】。"},
    {"type":"effect","addIntels":["三天的窗口"]},
    {"type":"jump","goto":"chapter2_after_vote"}
  ],
  "chapter2_vote_stop":
  [
    {"type":"narrator","text":"你走出了旁听席。卫兵们大概是没想到会有人如此大胆，但也没来得及阻拦你。你站到了议事台前。"},
    {"type":"char","role":"player","speaker":"你","text":"那天空之城无辜的百姓呢？他们也要被一枪打死吗？"},
    {"type":"narrator","text":"议会安静了一瞬。军派领袖看着你。他的眼神像在看一只闯进议会厅的野兽。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"你是谁？旁听席的人不能发言。"},
    {"type":"narrator","text":"奥德里克走上前，微微挡住了你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"他是我的客人。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"奥德里克，你管好你的客人。议会不是无翼者表演的舞台。"},
    {"type":"narrator","text":"你被强行带离。投票继续进行。议案还是被通过了。"},
    {"type":"narrator","text":"奥德里克好感+5。"},
    {"type":"effect","affection":5},
    {"type":"jump","goto":"chapter2_after_vote"}
  ],
  "chapter2_after_vote":
  [
    {"type":"narrator","text":"你被卫兵带出议会厅。奥德里克在走廊里等你。他的表情很平静，但你能看到他的义肢在微微颤抖。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"议案通过了。三天后执行。"},
    {"type":"narrator","text":"他靠在墙上，闭上眼。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我们需要拿到符文炮的发射钥匙。那东西在军派领袖手里。"},
    {"type":"narrator","text":"他睁开眼，看着你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我知道一个人能帮我们。但他不在明面上——他在黑市里。"},
    {"type":"jump","goto":"chapter2_blackmarket"}
  ],
  "chapter2_blackmarket":
  [
    {"type":"title","chapter":"第三幕","subtitle":"黑市巷道"},
    {"type":"narrator","text":"当晚，奥德里克带你来到帝国城邦底层的黑市巷道。狭窄的石板路两侧挤满了铁皮棚屋，灯光昏黄，空气中弥漫着机油和廉价麦酒的气味。"},
    {"type":"narrator","text":"你们走到一间铁皮棚屋前。奥德里克敲了三下门。门开了。"},
    {"type":"narrator","text":"一个独眼的老兵站在门口——左眼覆着皮革眼罩，右手缺了三根手指。他看了你一眼。"},
    {"type":"char","role":"npc","speaker":"老兵","text":"奥德里克。你带了个羽人？"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"他是我的盟友。"},
    {"type":"narrator","text":"老兵看了看你。然后他让开半步。"},
    {"type":"char","role":"npc","speaker":"老兵","text":"进来。但别碰我的东西。"},
    {"type":"narrator","text":"你们走进棚屋。里面堆满了旧武器和符文零件。老兵走到一张桌子前，摊开一张地图。"},
    {"type":"char","role":"npc","speaker":"老兵","text":"军派领袖的发射钥匙在军部大楼的地下保险库里。守卫很多。但有一个时间窗口——换班的时候，有三分钟的空档。"},
    {"type":"narrator","text":"他看着你。"},
    {"type":"char","role":"npc","speaker":"老兵","text":"你需要一个人进去。没有翅膀的人很接近人类，又是一个陌生的面孔，加上羽人天生的灵活——守卫不会注意到你。"},
    {"type":"choice","options":[{"label":"接受任务，独自潜入。","next":"chapter2_blackmarket_a"},{"label":"要求奥德里克同行。","next":"chapter2_blackmarket_b"},{"label":"询问是否有其他方法。","next":"chapter2_blackmarket_c"}]}
  ],
  "chapter2_blackmarket_a":
  [
    {"type":"char","role":"npc","speaker":"老兵","text":"好。明天凌晨三点，军部大楼侧门。我会在那里等你。"},
    {"type":"jump","goto":"chapter2_infiltration"}
  ],
  "chapter2_blackmarket_b":
  [
    {"type":"char","role":"npc","speaker":"老兵","text":"他不行，他的义肢会在军部的符文探测器上触发警报。"},
    {"type":"narrator","text":"奥德里克沉默了片刻。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但我可以帮你在外面掩护。相信我，你不会出事的。"},
    {"type":"narrator","text":"奥德里克好感+5。"},
    {"type":"effect","affection":5},
    {"type":"jump","goto":"chapter2_infiltration"}
  ],
  "chapter2_blackmarket_c":
  [
    {"type":"char","role":"npc","speaker":"老兵","text":"其他方法？你可以去找科研派，他们和军派不对付。但他们不会帮你——除非你给他们想要的东西。"},
    {"type":"narrator","text":"他停顿了一下。"},
    {"type":"char","role":"npc","speaker":"老兵","text":"你知道的，他们最想要的，不就是研究对象吗。"},
    {"type":"narrator","text":"获得情报【科研派的筹码】。"},
    {"type":"effect","flags":{"scienceLeverage":true},"addIntels":["科研派的筹码"]},
    {"type":"jump","goto":"chapter2_infiltration"}
  ],
  "chapter2_infiltration":
  [
    {"type":"narrator","text":"你们最终决定独自潜入，约定凌晨三点在军部大楼侧门集合。奥德里克没有再多说什么，只是在离开棚屋时，把一只手放在你的肩上。他的义肢很冷——但你能感觉到金属下面有一丝温热。那是他唯一剩下的体温。"},
    {"type":"title","chapter":"第四幕","subtitle":"军部大楼"},
    {"type":"infiltration","id":"empire_infiltration","success":"chapter2_infiltration_success","fail":"chapter2_infiltration_fail","url":"game4.html?mode=empire"}
  ],
  "chapter2_infiltration_success":
  [
    {"type":"narrator","text":"凌晨三点，军部大楼侧门，你贴着墙壁移动。守卫刚刚换班——这是老兵告诉你的时间窗口，只有三分钟。"},
    {"type":"narrator","text":"你进入大楼。走廊里很暗，只有符文应急灯发出微弱的蓝光。你绕过巡逻的守卫，来到地下保险库。门上有符文锁——但老兵给了你一枚解码符文。"},
    {"type":"narrator","text":"你插入解码符文。门开了。保险库里只有一只金属盒子。你打开它——里面是一枚银色的钥匙。"},
    {"type":"narrator","text":"你拿起钥匙。但就在此时，警报响了。"},
    {"type":"narrator","text":"你冲出保险库。守卫从走廊两端涌来，你被迫战斗。你击退了第一波守卫，但第二波已经逼近。"},
    {"type":"narrator","text":"一个声音从身后传来。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"这边！"},
    {"type":"narrator","text":"他站在走廊尽头。他的义肢发出耀眼的蓝光，符文爆弹在他手中闪烁。他把爆弹扔向守卫，爆炸的火光填满了走廊。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"跑！"},
    {"type":"narrator","text":"你们冲出军部大楼。身后传来警报声和追赶的脚步声。你们冲进黑市巷道，老兵接应你们，把你们藏进一间地下室。"},
    {"type":"narrator","text":"你喘着气。奥德里克靠在地下室的墙上，义肢冒着烟。他看着你手中的钥匙。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"拿到了。"},
    {"type":"narrator","text":"他轻笑了一下。那个笑容并不明显，但你看到了。这是你第一次看见他笑。"},
    {"type":"narrator","text":"奥德里克好感+15。获得【发射钥匙】。"},
    {"type":"effect","affection":15,"flags":{"launchKey":true},"addItems":{"launchKey":1}},
    {"type":"jump","goto":"chapter2_window"}
  ],
  "chapter2_infiltration_fail":
  [
    {"type":"narrator","text":"你在潜入途中被守卫发现，只能暂时撤出军部大楼。所幸守卫并没有认出你的身份，你仍然还有再次潜入的机会。"},
    {"type":"choice","options":[{"label":"再次尝试潜入","next":"chapter2_infiltration"}]}
  ],
  "chapter2_window":
  [
    {"type":"title","chapter":"第五幕","subtitle":"三天的窗口"},
    {"type":"narrator","text":"第二天，符文工坊，奥德里克把发射钥匙放在工作台上。他站在窗前，看着外面的城市。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我们虽然拿到了钥匙，但军派领袖很快就会发现它丢了。他会封锁城市。我们只有三天时间。"},
    {"type":"narrator","text":"他转过身看你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"三天。我们得用这三天做两件事——第一，把发射钥匙交给科研派，让他们在议会里弹劾军派领袖。第二，找到军派的弱点，让他们无法强行发射符文炮。"},
    {"type":"narrator","text":"他停顿了一下。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但这两件事……都需要你。我离不开工坊——军派领袖的人在盯着我。"},
    {"type":"choice","options":[{"label":"“我去找科研派。”","next":"chapter2_plan_a"},{"label":"“我去找军派的弱点。”","next":"chapter2_plan_b"},{"label":"“我两个都做。”","next":"chapter2_plan_c"}]}
  ],
  "chapter2_plan_a":
  [
    {"type":"char","role":"npc","speaker":"奥德里克","text":"科研派的领袖在中央实验室。但她从不信任羽人——她认为羽人是污染的源头。你得说服她。"},
    {"type":"narrator","text":"获得状态【科研派的任务】。任务目标：说服科研派领袖。"},
    {"type":"effect","flags":{"scienceTask":true},"addStatuses":["科研派的任务"]},
    {"type":"jump","goto":"chapter2_night"}
  ],
  "chapter2_plan_b":
  [
    {"type":"char","role":"npc","speaker":"奥德里克","text":"军派的弱点是他们的资金。他们的军费来自商业派的支持。如果你能让商业派撤资——军派就撑不下去了。"},
    {"type":"narrator","text":"奥德里克低下头沉思了一会儿。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但你可能更适合去科研派，我跟商业派的领袖更熟悉一点，可以吗？"},
    {"type":"char","role":"player","speaker":"你","text":"没问题。"},
    {"type":"narrator","text":"获得状态【科研派的任务】。任务目标：说服科研派领袖。"},
    {"type":"effect","flags":{"scienceTask":true},"addStatuses":["科研派的任务"]},
    {"type":"jump","goto":"chapter2_night"}
  ],
  "chapter2_plan_c":
  [
    {"type":"narrator","text":"奥德里克看着你。沉默了很久。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你只有三天。你确定？"},
    {"type":"narrator","text":"你点了点头，他只好叹了口气。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"好，那我们一起。你去找科研派，我去找商业派。我们分头行动。"},
    {"type":"narrator","text":"奥德里克好感+10。获得状态【科研派的任务】，说服科研派领袖。"},
    {"type":"effect","affection":10,"flags":{"scienceTask":true},"addStatuses":["科研派的任务"]},
    {"type":"jump","goto":"chapter2_night"}
  ],
  "chapter2_night":
  [
    {"type":"narrator","text":"那天深夜。你走上工坊顶楼。奥德里克站在栏杆边，看着远方的天空之城——那座悬浮在云层之上的白色城市。"},
    {"type":"narrator","text":"他听到你的脚步声，没有回头。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"三天之后，要么天空之城还在，要么我们一起死。"},
    {"type":"narrator","text":"他转过身看你。他的义肢在月光下发出微弱的蓝光。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你怕吗？"},
    {"type":"choice","options":[{"label":"“怕。”","next":"chapter2_fear_a"},{"label":"“不怕。”","next":"chapter2_fear_b"},{"label":"沉默，站在他旁边看城市。","next":"chapter2_fear_c"}]}
  ],
  "chapter2_fear_a":
  [
    {"type":"char","role":"npc","speaker":"奥德里克","text":"……我也是。"},
    {"type":"narrator","text":"他沉默了片刻。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"二十年前，我带着四十个人上战场。那时其实我也很怕，但我没有说。"},
    {"type":"narrator","text":"他似乎轻笑了一下，然后看着远方不再说话，像是在回忆什么。"},
    {"type":"narrator","text":"奥德里克好感+10。获得情报【奥德里克的过往】。"},
    {"type":"effect","affection":10,"flags":{"aldricPast":true},"addIntels":["奥德里克的过往"]},
    {"type":"jump","goto":"chapter2_end"}
  ],
  "chapter2_fear_b":
  [
    {"type":"char","role":"npc","speaker":"奥德里克","text":"……你在撒谎。"},
    {"type":"narrator","text":"他似乎是轻笑了一下。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"很多年前，我也是这么说的......但无论怎样，都谢谢你。"},
    {"type":"narrator","text":"奥德里克好感+5。"},
    {"type":"effect","affection":5},
    {"type":"jump","goto":"chapter2_end"}
  ],
  "chapter2_fear_c":
  [
    {"type":"narrator","text":"你走到栏杆边，和他并肩站着。蒸汽从管道中升起，月光穿过雾气，落在你们身上。他没有说话，你也没有。"},
    {"type":"narrator","text":"过了很久，他低声说了一句。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"三天后，如果我们还活着——我请你喝酒。"},
    {"type":"narrator","text":"奥德里克好感+8。"},
    {"type":"effect","affection":8},
    {"type":"jump","goto":"chapter2_end"}
  ],
  "chapter2_end":
  [
    {"type":"narrator","text":"你转身准备离开，他在你身后开口。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"等等。"},
    {"type":"narrator","text":"你回头。他从口袋里掏出一样东西——那枚符文护符，和你之前口袋里那枚一模一样。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"新的，上一枚你用过了。"},
    {"type":"narrator","text":"他把护符塞进你手里。他的手指很冷，但他的义肢比平时暖了一点。"},
    {"type":"effect","addItems":{"runeAmulet":1}},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"三天后见。"},
    {"type":"narrator","text":"你走出工坊。蒸汽从身后涌来，城市在夜色中安静地呼吸。你手里攥着两枚护符——一枚旧的，一枚新的。"},
    {"type":"jump","goto":"freedom2"}
  ],
  "chapter3":
  [
    {"type":"title","chapter":"第三章","subtitle":"残响"},
    {"type":"narrator","text":"你给自己放了一天的假去各地打探情报，这一天结束后，你回到城邦。蒸汽扑面涌来，像是浪潮，城市在夜色中安静地呼吸。你手里攥着两枚护符——一枚旧的，一枚新的。"},
    {"type":"title","chapter":"第一幕","subtitle":"科研派"},
    {"type":"narrator","text":"第二天清晨，你按照奥德里克给的地址，来到中央实验室。这是一座比符文工坊更大、更冷的建筑——墙壁由灰白色的合金板材拼接而成，没有窗户，只有一排排符文通风口在低鸣。门口站着两名卫兵，手里握着比普通长铳更精致的符文枪。"},
    {"type":"char","role":"npc","speaker":"卫兵","text":"科研重地，非授权人员不得入内。"},
    {"type":"char","role":"player","speaker":"你","text":"我是奥德里克派来的。我要见科研派领袖。"},
    {"type":"narrator","text":"卫兵对视了一眼，其中一个转身走进实验室。几分钟后，他出来了。"},
    {"type":"char","role":"npc","speaker":"卫兵","text":"进去，左转，走廊尽头的房间。她在等你。"},
    {"type":"narrator","text":"你穿过走廊，实验室内部比外面更冷——空气中有一股消毒水和金属粉末混合的气味。两侧的玻璃隔间里，研究员们正在操作各种你叫不出名字的符文仪器。没有人抬头看你。"},
    {"type":"narrator","text":"走廊尽头是一间敞开的办公室，一个中年女人坐在桌前，灰白色的长发扎成利落的马尾，鼻梁上架着一副符文眼镜。她的桌上堆满了文件、样本瓶和一台嗡嗡作响的分析仪。听见你进门，她没有抬头。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"奥德里克的人？坐。"},
    {"type":"narrator","text":"你坐下来，她继续翻看文件。过了将近一分钟，她才抬起头，摘下眼镜打量你。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"无翼者，羽人，身上带着抗性——奥德里克的报告里写了。你知道我为什么同意见你吗？"},
    {"type":"char","role":"player","speaker":"你","text":"因为我有你想要的东西。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"聪明。"},
    {"type":"narrator","text":"她站起来，走到墙边的一排样本柜前。柜子里整齐排列着数十只透明容器，里面是各种颜色的液体和结晶样本。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"帝国在污染区投入了三千名士兵。三年间，死了七百四十二个。我们至今没有找到有效的抗污染手段。而你——你身上有答案。"},
    {"type":"narrator","text":"她转过身看你。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"我要你的血。一滴就够。作为交换——我会在议会里支持弹劾军派领袖。发射钥匙在你手上，对吧？把钥匙给我，把血给我。我帮你阻止这场战争。"},
    {"type":"choice","options":[{"label":"接受交易。","next":"chapter3_science_a"},{"label":"拒绝交出钥匙，但同意提供血样。","next":"chapter3_science_b"},{"label":"拒绝交易，试图说服她无偿帮忙。","next":"chapter3_science_c"}]}
  ],
  "chapter3_science_a":
  [
    {"type":"narrator","text":"你点头，她拿出一只无菌的符文采血器，从你手臂上取了一滴血。液体在容器中泛着淡淡的银色光泽——和她见过的任何样本都不一样。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"……不可思议。你的抗性竟然真的像奥德里克说的那样——不是抗体，是共生。你身体里有某种东西，和污染同源，但方向相反。"},
    {"type":"narrator","text":"她把样本锁进保险柜，转身面对你。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"交易成立，发射钥匙给我，我会在明天的议会上弹劾军派领袖。"},
    {"type":"narrator","text":"你交出钥匙。她接过，仔细检查了一遍。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"明天正午，议会厅，你最好在场。"},
    {"type":"narrator","text":"获得状态【科研派的同盟】。奥德里克好感+10。"},
    {"type":"effect","affection":10,"flags":{"scienceAlliance":"alliance","launchKeyHeld":false},"removeItems":{"launchKey":1},"removeStatuses":["科研派的任务"],"addStatuses":["科研派的同盟"]},
    {"type":"jump","goto":"chapter3_business"}
  ],
  "chapter3_science_b":
  [
    {"type":"narrator","text":"你摇了摇头，指向钥匙，又指向自己——钥匙要留在你手里，但血可以给。"},
    {"type":"narrator","text":"科研派领袖看着你，沉默了很久。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"你不信任我。"},
    {"type":"char","role":"player","speaker":"你","text":"我不信任任何人。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"……合理。"},
    {"type":"narrator","text":"她收起采血器，从你手臂上取了一滴血。液体在容器中泛着银光。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"血我收下了，钥匙你留着——但我要提醒你，军派领袖不会坐以待毙。他如果发现钥匙丢了，会不惜一切代价夺回来。"},
    {"type":"narrator","text":"获得状态【科研派的有限合作】。科研派会在议会中支持弹劾，但不会全力施压。奥德里克好感+5。"},
    {"type":"effect","affection":5,"flags":{"scienceAlliance":"limited","launchKeyHeld":true},"removeStatuses":["科研派的任务"],"addStatuses":["科研派的有限合作"]},
    {"type":"jump","goto":"chapter3_business"}
  ],
  "chapter3_science_c":
  [
    {"type":"narrator","text":"你摇了摇头，指向实验室墙壁上的帝国徽章，又指向窗外污染区的方向。"},
    {"type":"char","role":"player","speaker":"你","text":"这场战争对帝国没有好处。"},
    {"type":"narrator","text":"科研派领袖看着你。她的表情没有变化。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"你在跟我讲道理？"},
    {"type":"narrator","text":"她笑了一声，那个笑容很冷。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"我做研究二十年了，我见过太多“讲道理”的人——他们最后都死了，只有利益能让人活着。"},
    {"type":"narrator","text":"她转过身，背对着你。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"你走吧，如果你改变主意，就来这里找我吧。"},
    {"type":"narrator","text":"获得状态【科研派的拒绝】，科研派不会在议会中支持弹劾。奥德里克好感-5。"},
    {"type":"effect","affection":-5,"flags":{"scienceAlliance":"reject","launchKeyHeld":true},"removeStatuses":["科研派的任务"],"addStatuses":["科研派的拒绝"]},
    {"type":"jump","goto":"chapter3_business"}
  ],
  "chapter3_business":
  [
    {"type":"narrator","text":"你离开中央实验室，天空灰蒙蒙的，蒸汽从管道中升腾。你走在回工坊的路上，心里盘算着下一步。无论如何——明天正午，议会厅，必须阻止军派领袖。"},
    {"type":"title","chapter":"第二幕","subtitle":"商业派"},
    {"type":"narrator","text":"与此同时，奥德里克去了商业派。"},
    {"type":"narrator","text":"第二天下午，你回到符文工坊时，奥德里克已经在了。他坐在工作台前，义肢搁在台面上，符文光芒比平时更暗。他抬起头看你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"科研派那边怎么样？"},
    {"type":"narrator","text":"你简要复述了结果，他听完后点了点头。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"商业派那边——比我想的难。"},
    {"type":"narrator","text":"他站起身，走到窗前。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"商业派领袖是个老商人。他只关心一件事——利润。军派的军费来自他的支持。如果我让他撤资，他需要一个新的利润来源。"},
    {"type":"narrator","text":"他转过身看你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我告诉他，如果天空之城坠落，风脉之心的能量核心会被军派挖出来。那东西如果能被商业化——利润是军费的十倍，但他不信，他需要证据。"},
    {"type":"narrator","text":"他停顿了一下。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"所以我需要你去一个地方，污染隔离区。商业派领袖在那里有一个私人仓库——里面存着他最值钱的货物。但那片区域最近出现了晶骸，他去不了，如果你能帮他清理掉——他会欠你一个人情。"},
    {"type":"char","role":"player","speaker":"你","text":"然后呢？"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"然后你告诉他，风脉之心的能量核心——比他那仓库里所有东西加起来都值钱，他会信的，商人永远信能带给他利润的东西。"},
    {"type":"narrator","text":"获得状态【商业派的任务】：清理污染隔离区的私人仓库。"},
    {"type":"effect","addStatuses":["商业派的任务"]},
    {"type":"title","chapter":"第三幕","subtitle":"隔离区"},
    {"type":"narrator","text":"当天傍晚，你来到污染隔离区边缘。这是一片废弃的居民区——二十年前被羽蚀污染后封锁。墙壁上覆盖着黑色结晶，空气中弥漫着硫磺和腐烂的气味。远处有晶骸在废墟中游荡。"},
    {"type":"narrator","text":"商业派的私人仓库在隔离区深处，你贴着墙壁移动，避开晶骸的巡逻路线。仓库入口被一道符文锁封锁——但你手里有商业派领袖给你的解码符文。"},
    {"type":"narrator","text":"你插入解码符文，门开了。仓库内部比外面干净得多——货架上整齐排列着各种稀有金属和符文零件，但仓库深处传来一阵低沉的嘶鸣，你转过头——一只晶骸正从货架后面爬出来。它的身体有一半已经结晶化，但剩下的部分还保留着人类的轮廓。"},
    {"type":"narrator","text":"你拔出武器，战斗在狭窄的仓库中爆发。"},
    {"type":"battle","id":"warehouse","success":"chapter3_warehouse_success","fail":"chapter3_warehouse_fail","url":"game3.html?mode=empire"}
  ],
  "chapter3_warehouse_success":
  [
    {"type":"narrator","text":"晶骸倒在地上，身体碎裂成黑色的碎片。你检查了仓库——货物没有损坏。你走出仓库时，商业派领袖的使者已经在外面等着了。他看了一眼仓库内部，点了点头，转身离开。"},
    {"type":"narrator","text":"获得状态【商业派的感激】。商业派会在议会中支持弹劾军派领袖。"},
    {"type":"effect","flags":{"businessSupport":true},"removeStatuses":["商业派的任务"],"addStatuses":["商业派的感激"]},
    {"type":"flagauto","flag":"scienceAlliance","routes":{"alliance":"chapter3_warehouse_easter"},"default":"chapter3_resonance"}
  ],
  "chapter3_warehouse_easter":
  [
    {"type":"narrator","text":"你回到工坊时，奥德里克正在工作台前等你。他看了你手臂上的伤口——那是晶骸留下的。他没有说话，只是从抽屉里拿出一只符文治疗包，放在你面前。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"处理一下。明天还有硬仗要打。"},
    {"type":"narrator","text":"奥德里克好感+5。"},
    {"type":"effect","affection":5},
    {"type":"jump","goto":"chapter3_resonance"}
  ],
  "chapter3_warehouse_fail":
  [
    {"type":"narrator","text":"晶骸的攻击让你后退了几步。你的手臂被结晶碎片划伤——伤口处传来一阵灼烧感。你咬牙击退了晶骸，但仓库的货架在战斗中倒塌了大半。商业派领袖的使者进来时，脸色很难看。"},
    {"type":"narrator","text":"获得状态【商业派的不满】。商业派不会在议会中支持弹劾，但也不会反对。奥德里克好感-5。"},
    {"type":"effect","affection":-5,"flags":{"businessSupport":false},"removeStatuses":["商业派的任务"],"addStatuses":["商业派的不满"]},
    {"type":"jump","goto":"chapter3_resonance"}
  ],
  "chapter3_resonance":
  [
    {"type":"title","chapter":"第四幕","subtitle":"残响"},
    {"type":"narrator","text":"深夜，符文工坊。你正准备离开时，奥德里克叫住了你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"等等。"},
    {"type":"narrator","text":"他站在工作台前，手里拿着一份文件。符文灯的光照在他脸上，显得他的表情格外沉重。他的义肢在微微颤抖——符文光芒忽明忽暗。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"军派领袖发现钥匙丢了，他已经封锁了城市。明天正午的议会——他不会让我们轻易进去。"},
    {"type":"narrator","text":"他把文件递给你。你翻开——上面是一份军部的紧急命令。命令上写着：“鉴于局势紧张，即日起所有非人类种族人员须接受强制登记与采样。拒不配合者，以叛国罪论处。”"},
    {"type":"narrator","text":"你的名字在名单上，第一个。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"他们知道了，知道你在帮我，知道你身上的抗性。"},
    {"type":"narrator","text":"他走到你面前，他的义肢发出低沉的嗡鸣——像某种压抑了很久的东西在震动。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"军派领袖派人来找过我。他们说——如果我把你交出去，他们可以撤销对天空之城的攻击计划。用你一个人，换一座城。"},
    {"type":"narrator","text":"他停下来，声音在发抖。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我告诉他们，我需要时间考虑。"},
    {"type":"narrator","text":"他抬起头看你。他的眼睛很深，像一潭被搅浑的水。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我要来征求你的意见......现在——你告诉我。我们该怎么做？"},
    {"type":"auto","options":[{"min":-999,"max":29,"next":"chapter3_resonance_sacrifice"},{"min":30,"max":59,"next":"chapter3_resonance_escape"},{"min":60,"max":999,"next":"chapter3_resonance_fake"}]}
  ],
  "chapter3_resonance_sacrifice":
  [
    {"type":"char","role":"player","speaker":"你","text":"把我交出去，如果这样能救天空之城——值得。"},
    {"type":"narrator","text":"奥德里克看着你，沉默了很久。他的义肢停止了颤抖——符文光芒变得很暗，像一盏即将熄灭的灯。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你……你知道你在说什么吗？他们不会只是抽血。他们会解剖你。他们会把你拆成碎片——然后研究每一块碎片。"},
    {"type":"char","role":"player","speaker":"你","text":"我知道。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"那你为什么——"},
    {"type":"char","role":"player","speaker":"你","text":"因为你说过，你欠那些死去的人，那些无辜的人一个交代。"},
    {"type":"char","role":"player","speaker":"你","text":"没有关系的，用我一个人换很多无辜的生命，这很值得的。"},
    {"type":"narrator","text":"他闭上眼，过了很久，他睁开眼——他的眼神变了。不再是犹豫，而是某种更冷、更硬、更坚定的东西。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"好，我答应你。"},
    {"type":"narrator","text":"他转过身，背对着你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"明天正午，议会厅。我会把你交给他们，天空之城会活下来，你会死，但我会活着——背负着这个选择，活到死。"},
    {"type":"narrator","text":"他停顿了一下。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但我要你记住一件事——这不是你的选择，这是我的，是我欠你的......是我欠你们所有人的。"},
    {"type":"narrator","text":"奥德里克好感锁定≤30。进入【残响·牺牲】分支。所有同伴好感+10。"},
    {"type":"effect","flags":{"resonanceRoute":"sacrifice"},"companionAffection":10},
    {"type":"jump","goto":"chapter3_council"}
  ],
  "chapter3_resonance_escape":
  [
    {"type":"char","role":"player","speaker":"你","text":"不，你不需要交我出去，你也不需要一个人扛。"},
    {"type":"narrator","text":"你走到他面前，指向工坊的窗户——外面的城市，蒸汽和齿轮，灰蓝色的，朦胧的天空。"},
    {"type":"char","role":"player","speaker":"你","text":"我们带着钥匙离开，去天空之城。把真相告诉他们，让他们自己决定。"},
    {"type":"narrator","text":"奥德里克看着你，他的表情没有变化——但你感觉到他在重新评估你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你知道这意味着什么吗？我会被帝国通缉。我的工坊、我的身份、我二十年来的一切——全部消失。"},
    {"type":"char","role":"player","speaker":"你","text":"你二十年来的一切——就是这座坟墓吗？"},
    {"type":"narrator","text":"他沉默了，过了很久，他低下头。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"……你说得对，这是一座坟墓。"},
    {"type":"narrator","text":"他抬起头看你，他的义肢重新亮了起来——符文光芒稳定而清晰。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"好，我们走。明天正午之前——离开帝国。"},
    {"type":"narrator","text":"奥德里克好感锁定30-60。进入【残响·叛逃】分支。所有同伴好感-10，他们视你为叛逃者。"},
    {"type":"effect","flags":{"resonanceRoute":"escape"},"companionAffection":-10},
    {"type":"jump","goto":"chapter3_council"}
  ],
  "chapter3_resonance_fake":
  [
    {"type":"char","role":"player","speaker":"你","text":"不用交我出去，也不用叛逃。你有我的血样，就在科研派那里。用那个伪造一份样本，告诉他们，你已经采集过了。"},
    {"type":"narrator","text":"奥德里克看着你，沉默了很久。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"……伪造。"},
    {"type":"char","role":"player","speaker":"你","text":"你做过一次后门程序，再来一次就可以了。"},
    {"type":"narrator","text":"他的嘴角动了一下，几乎是一个笑容。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你比我想的狡猾。"},
    {"type":"narrator","text":"他走到工作台前，打开抽屉，取出一只空的样本瓶。他把你的血样从科研派那里取回一小份，然后开始操作。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"这能骗过军派的检测，但骗不了太久。如果被发现——我们两个都完了。"},
    {"type":"char","role":"player","speaker":"你","text":"那就别让他们发现。"},
    {"type":"narrator","text":"奥德里克好感锁定≥60。进入【残响·伪造】分支。所有同伴好感不变。获得状态【伪造的样本】。"},
    {"type":"effect","flags":{"resonanceRoute":"fake","fakeSample":true},"addStatuses":["伪造的样本"]},
    {"type":"jump","goto":"chapter3_council"}
  ],
  "chapter3_council":
  [
    {"type":"title","chapter":"第五幕","subtitle":"议会厅"},
    {"type":"narrator","text":"正午，蒸汽议会厅。穹顶下的符文灯比上次更亮，照得整个议事台像一座审判台。议会成员坐在环形阶梯上，军派、科研派、商业派各自占据一片区域。"},
    {"type":"narrator","text":"你站在旁听席的角落，奥德里克站在你身边。他的义肢藏在斗篷下面——但你感觉到它比平时更烫。"},
    {"type":"narrator","text":"军派领袖站在议事台中央，他的脸上有一种胜利者的从容。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"诸位，今天的议案——关于对天空之城的最终行动。我们的符文炮已经校准。只待发射钥匙插入——"},
    {"type":"narrator","text":"他停顿了一下，目光扫过议会厅，落在奥德里克身上。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"奥德里克，发射钥匙。"},
    {"type":"narrator","text":"全场安静。"},
    {"type":"flagauto","flag":"resonanceRoute","routes":{"sacrifice":"chapter3_council_sacrifice","escape":"chapter3_council_escape","fake":"chapter3_council_fake"},"default":"chapter3_council_escape"}
  ],
  "chapter3_council_sacrifice":
  [
    {"type":"narrator","text":"奥德里克从斗篷下拿出钥匙——那枚银色的钥匙。他走上前，站在议事台边缘。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"钥匙在这里。"},
    {"type":"narrator","text":"他举起钥匙，符文灯照在银色表面上，反射出耀眼的光。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但在交出它之前——我有一样东西要给诸位看。"},
    {"type":"narrator","text":"他从怀中取出那份文件——羽人抗性活体实验的记录。他把文件展开，放在议事台上。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"这是帝国中央实验室过去三年间的实验记录。对象——羽人。方式——活体提取。结果——全部死亡。"},
    {"type":"narrator","text":"议会哗然，军派领袖的脸色变了。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"奥德里克！你在干什么——"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我在公开真相。你要对天空之城发动战争——但你没有告诉任何人，你的真正目的是什么。"},
    {"type":"narrator","text":"他转向议会，他的声音在穹顶下回荡。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你要的不是消除污染，你要的是风脉之心的能量核心。把它挖出来，装进你的符文炮里。用这座城市的命脉，换你一个人的野心。"},
    {"type":"narrator","text":"旁听席上响起议论声，科研派领袖站起来——她在看你。她的眼神里有一种你无法解读的东西。"},
    {"type":"char","role":"npc","speaker":"科研派领袖","text":"军派领袖——你有什么要解释的吗？"},
    {"type":"narrator","text":"军派领袖的脸在抽动。他的右手按在剑柄上。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"这是诬陷！奥德里克已经被那个羽人收买了！"},
    {"type":"narrator","text":"他指向你。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"那个无翼者！他是天空之城的间谍！他——"},
    {"type":"narrator","text":"奥德里克走上前，他的义肢发出耀眼的蓝光——符文光芒从斗篷下溢出，照亮了整个议事台。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"他救过这座城市，他深入过污染熔炉，他清理隔离区，他帮你拿回了你想要的钥匙......然后你告诉他，你要用他一个人的命去换那座城。"},
    {"type":"narrator","text":"他停顿了一下。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你告诉我，谁才是叛徒？"},
    {"type":"narrator","text":"议会厅陷入沉默，军派领袖看着奥德里克，又看着旁听席上的议员们。他的支持者们在退缩。"},
    {"type":"narrator","text":"然后他笑了，那个笑容很冷。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"你赢了，奥德里克。但你别忘了——符文炮还在，钥匙还在。发射密码——只有我知道。"},
    {"type":"narrator","text":"他转身大步走出议会厅，卫兵们犹豫了一下，没有拦他。"},
    {"type":"narrator","text":"议会厅陷入混乱,科研派领袖站起来，开始组织投票。商业派领袖在角落里和助手低声交谈。"},
    {"type":"narrator","text":"奥德里克转过身看你，他的表情很平静——但你看到他义肢上的符文光芒在微微颤抖。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"对不起，我还是没有办法让你去独自牺牲......但军派领袖不会放弃，他手里还有发射密码。"},
    {"type":"narrator","text":"他停顿了一下。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"不过我们还有机会。三天——不，也许更少。在他重新集结之前，去天空之城，告诉他们真相。"},
    {"type":"narrator","text":"他伸出手，这次你握住了他。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"谢谢你，我才有为所有事发声的勇气。"},
    {"type":"jump","goto":"chapter3_end"}
  ],
  "chapter3_council_escape":
  [
    {"type":"narrator","text":"奥德里克从斗篷下拿出钥匙，他走上前，站在议事台边缘，全场安静。军派领袖伸出手——但奥德里克没有把钥匙递给他。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"钥匙在这里，但我不会交给你。"},
    {"type":"narrator","text":"议会哗然，军派领袖的脸色变了。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"奥德里克！你在说什么——"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我说——我不会把这座城市的命运交给一个想把无辜者炸成碎片的人。"},
    {"type":"narrator","text":"他转向议会，他的声音在穹顶下回荡。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"军派领袖要对天空之城发动战争。但他没有告诉你们真正的原因——他要的是风脉之心的能量核心，把它挖出来，装进他的符文炮里。用一座城的命，换他的野心。"},
    {"type":"narrator","text":"旁听席上响起议论声。科研派领袖站起来，但她最终还是没有开口。商业派领袖在角落里皱眉。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"这是诬陷！奥德里克已经被那个羽人收买了！"},
    {"type":"narrator","text":"他指向你。卫兵们犹豫了一下——但他们还是向你走来。"},
    {"type":"narrator","text":"奥德里克转过身，拉住你的手臂。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"跑。"},
    {"type":"narrator","text":"你们冲出议会厅，身后传来军派领袖的怒吼和卫兵的脚步声。你们穿过蒸汽管道，绕过议会广场，冲进黑市巷道。独眼老兵接应你们，把你们藏进一间地下室。"},
    {"type":"narrator","text":"你喘着气，奥德里克靠在墙上，义肢冒着烟，他在看着你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我们回不去了。"},
    {"type":"narrator","text":"他轻笑了一下。那个笑容几乎没有，但你看到了。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但我早就回不去了，二十年前就回不去了。"},
    {"type":"narrator","text":"他站起身，走到地下室门口。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"走吧。去天空之城。把真相告诉他们。让他们自己决定。"},
    {"type":"jump","goto":"chapter3_end"}
  ],
  "chapter3_council_fake":
  [
    {"type":"narrator","text":"奥德里克从斗篷下拿出钥匙，他走上前，站在议事台边缘。军派领袖伸出手——奥德里克把钥匙递给了他。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你要的钥匙。"},
    {"type":"narrator","text":"军派领袖接过钥匙，仔细检查了一遍。他的脸上露出满意的笑容。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"很好，奥德里克——你终于做出了正确的选择。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但我有一个条件。"},
    {"type":"narrator","text":"军派领袖皱眉。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"那个无翼者，关于他的样本我已经采集过了，你可以拿去研究。但他本人，我要他留在帝国。以我的名义，我负责看管他。"},
    {"type":"narrator","text":"军派领袖看着他，沉默了很久。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"……好，一个无翼者换一座城市，成交。"},
    {"type":"effect","removeItems":{"launchKey":1},"removeStatuses":["伪造的样本"]},
    {"type":"narrator","text":"他转身面对议会，他的声音在穹顶下回荡。"},
    {"type":"char","role":"npc","speaker":"军派领袖","text":"诸位！作战计划暂缓。我们的目标改变了，天空之城——留给他们自己。"},
    {"type":"narrator","text":"议会厅陷入沉默，科研派领袖站起来，但被军派领袖的视线压了回去，商业派领袖在角落里低声和助手交谈。"},
    {"type":"narrator","text":"奥德里克转过身看你，他的表情很平静——但你看到他义肢上的符文光芒比平时更亮。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"走吧，但你要留在工坊，哪里也别去。"},
    {"type":"narrator","text":"他又压低悄悄对你说声音。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我伪造的样本能骗他三天，三天之后——他会发现。在此之前我们要偷偷前往天空之城，告诉他们真相，但不能被发现我们离开了。"},
    {"type":"jump","goto":"chapter3_end"}
  ],
  "chapter3_end":
  [
    {"type":"narrator","text":"深夜，奥德里克站在工坊顶楼。你走上去时，他正看着远方的天空之城——那座悬浮在云层之上的白色城市。"},
    {"type":"narrator","text":"他没有回头。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"明天休息一天，等到后天，一切都会不一样。"},
    {"type":"narrator","text":"他转过身看你，他的义肢在月光下发出微弱的蓝光。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但有一件事不会变。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我会站在你这边，无论发生什么。"},
    {"type":"jump","goto":"freedom3"}
  ],
  "chapter4":
  [
    {"type":"title","chapter":"第四章","subtitle":"铁与火的尽头"},
    {"type":"narrator","text":"你走出帝国城邦的铁门，身后，蒸汽和齿轮的轰鸣逐渐远去。奥德里克站在你身边，义肢在月光下泛着微弱的蓝光。他的斗篷压得很低，遮住了半张脸。"},
    {"type":"narrator","text":"你们没有回头，身后那座钢铁城市正在被夜色吞没。前方，云层之上，一座白色的城市悬浮在天空中——那是你们的目的地。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"三天，在被军派领袖发现之前，我们只有三天。"},
    {"type":"narrator","text":"他迈出一步，你跟上。"},
    {"type":"title","chapter":"第一幕","subtitle":"朝云而行"},
    {"type":"narrator","text":"离开帝国城邦的道路比来时更加崎岖，地面上的污染痕迹越来越重——黑色的结晶从泥土中蔓延出来，踩上去会发出碎裂的脆响。空气中弥漫着硫磺和金属锈蚀的气味。"},
    {"type":"narrator","text":"奥德里克的义肢在污染环境中发出低沉的嗡鸣，他皱了一次眉，但没有停下。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"二十年前，我以为那是我最后一次走这条路。那时候我带的是四十个人。现在——"},
    {"type":"narrator","text":"他看了你一眼。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"现在只有一个。"},
    {"type":"narrator","text":"你们走了半天，傍晚时分，你们在一处废弃的驿站中歇脚。奥德里克坐在墙边，用符文工具调试着义肢，他的动作很慢，但很稳。"},
    {"type":"char","role":"player","speaker":"你","text":"你的手臂在响。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"污染浓度太高了，符文金属会共鸣......没什么大碍——就是有点吵。"},
    {"type":"narrator","text":"他沉默了片刻，然后抬起头。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"明天傍晚能到天空之城的外围。但我不确定他们会让我们进去。"},
    {"type":"narrator","text":"他停顿了一下。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"毕竟我是帝国人，而且——我是个“造武器的人”。"},
    {"type":"choice","options":[{"label":"“我进去。你在外面等。”","next":"chapter4_road_a"},{"label":"“我们一起去。他们不让你进，我也不进。”","next":"chapter4_road_b"},{"label":"沉默，继续调试装备。","next":"chapter4_road_c"}]}
  ],
  "chapter4_road_a":
  [
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你一个人？你知道天空之城对无翼者是什么态度吗？"},
    {"type":"char","role":"player","speaker":"你","text":"比你进去好。"},
    {"type":"narrator","text":"他沉默了很久，然后点了点头。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"……好，我在外围等你。如果你天亮之前没有出来——我上去找你。"},
    {"type":"narrator","text":"奥德里克好感+5。"},
    {"type":"effect","affection":5},
    {"type":"jump","goto":"chapter4_sky"}
  ],
  "chapter4_road_b":
  [
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你疯了，你是羽人——那是你的城市。"},
    {"type":"char","role":"player","speaker":"你","text":"我是无翼者，他们也没把我当自己人。"},
    {"type":"narrator","text":"他看着你，沉默了一会儿。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"……你比我认识的任何一个人都傻。"},
    {"type":"narrator","text":"奥德里克好感+10。"},
    {"type":"effect","affection":10},
    {"type":"jump","goto":"chapter4_sky"}
  ],
  "chapter4_road_c":
  [
    {"type":"narrator","text":"你没有说话，走到他旁边坐下，拿出自己的武器开始检查。他看了你一眼，也继续调试义肢。"},
    {"type":"narrator","text":"过了很久，他低声说了一句。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你和我一样话少。"},
    {"type":"narrator","text":"他停顿了一下。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但至少你在。"},
    {"type":"narrator","text":"奥德里克好感+8。"},
    {"type":"effect","affection":8},
    {"type":"jump","goto":"chapter4_sky"}
  ],
  "chapter4_sky":
  [
    {"type":"title","chapter":"第二幕","subtitle":"天空之下"},
    {"type":"narrator","text":"第二天傍晚，你们来到天空之城的外围——一座废弃的哨站。哨站建在地面与云层之间的一座石峰上，早已无人驻守。从这里抬头，天空之城的底部清晰可见——巨大的白晶基座悬浮在云层之中，风脉回廊的管道从基座延伸出来，像无数根银白色的血管。"},
    {"type":"narrator","text":"但这个基座上有东西不对劲，黑色的裂纹从管道接口处蔓延出来——和你在帝国熔炉区看到的那种污染一模一样。"},
    {"type":"narrator","text":"奥德里克站在你身边，抬头看着那座城市，他的义肢在震动。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"污染已经蔓延到天空之城了。"},
    {"type":"narrator","text":"他转过头看你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你确定要上去？如果污染已经扩散到整座城市——你上去也改变不了什么。"},
    {"type":"char","role":"player","speaker":"你","text":"我要告诉他们真相，他们应该知道帝国要做什么，应该知道锁神装置的事。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"他们不会信的，他们连你都不信。"},
    {"type":"char","role":"player","speaker":"你","text":"不信就不信。但我说了，总比永远沉默好。"},
    {"type":"narrator","text":"奥德里克看着你，他的表情没有变化，你感觉到他在重新评估你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"……你比我勇敢。"},
    {"type":"narrator","text":"他伸出手。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"去吧，我在这里等你。"},
    {"type":"title","chapter":"第三幕","subtitle":"重逢"},
    {"type":"narrator","text":"你沿着哨站的旧阶梯向上攀爬，石阶已经碎裂了大半，你不得不用手抓住岩壁上的裂缝才能继续向上。风从云层中灌下来，吹得你几乎睁不开眼。"},
    {"type":"narrator","text":"终于，你爬到了天空之城底部的边缘。一个狭窄的入口出现在你面前——那是底层维护工用的通道，和风脉回廊的底层相连。你钻进去，沿着熟悉的管道向上走。"},
    {"type":"narrator","text":"风脉回廊底层，蓝色的风脉能量在管道中流动——但比上次更暗了。黑色裂纹已经蔓延到这里的晶壁上。你继续向上走，一路上没有人拦你——守卫似乎都被调去了审判穹顶方向。"},
    {"type":"narrator","text":"你穿过空无一人的街道，来到风脉回廊的入口，然后你看到了他。"},
    {"type":"narrator","text":"一个身影坐在回廊边缘，他的翅膀收拢在背后——右翼残缺，左翼布满黑色结晶，半边脸覆盖着和风脉之心一样的黑色纹路。他的头发花白，身形消瘦，但眼睛和你一样——深色，锐利。"},
    {"type":"narrator","text":"是艾德蒙，你的父亲。"},
    {"type":"narrator","text":"他听到你的脚步声，没有回头。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"你终于来了。"},
    {"type":"narrator","text":"他站起来，转过身来，右翼在风中微微张开——畸形的骨节在月光下投下扭曲的影子。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"我一直在等你找到这里，你比我想象的快，但比我期望的慢。"},
    {"type":"narrator","text":"他看着你，眼神里没有愧疚，没有愤怒，只有一种很深很沉的疲惫。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"当初我和我最好的朋友从小一起长大，一起玩耍，她也是唯一一个在我被所有人排斥时还愿意和我说话的人。"},
    {"type":"narrator","text":"他停顿了一下。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"二十年前，她被选为圣女，走进风脉之心。被献祭前，她告诉我：“如果这是让城市活下去的代价，我愿意。”我站在角落里，看着她被绑上祭坛。我没有办法阻止她，她说那是她的选择不需要我来承担。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"然后我花了二十年寻找让她回来的方法，我失败了，但我找到了真相——关于索尔温，关于天空之城，关于这一切。"},
    {"type":"narrator","text":"他走近一步。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"锁神装置坚持不了多久，我们需要彻底毁灭它，或者是为神明找一个新的容器......也就是献祭。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"现在轮到你做选择了。你是要救这座城市——还是像当年我一样，站在角落里看着？"},
    {"type":"choice","options":[{"label":"“我要告诉所有人真相。让他们自己决定。”","next":"chapter4_reunion_a"},{"label":"“我要救这座城市，就算要付出代价。”","next":"chapter4_reunion_b"},{"label":"沉默，站在他旁边。","next":"chapter4_reunion_c"}]}
  ],
  "chapter4_reunion_a":
  [
    {"type":"narrator","text":"艾德蒙看着你。沉默了很久。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"真相？你知道真相意味着什么吗？意味着这座城市会坠落。意味着几千个人会死。"},
    {"type":"char","role":"player","speaker":"你","text":"那就让他们自己选。你没有权利替所有人做决定。我也没有。"},
    {"type":"narrator","text":"他闭上眼。过了很久，他睁开眼——他的眼神变了。不再是疲惫，而是某种更冷、更硬的东西。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"……你说得对。二十年前我就是替所有人做了决定。然后我流放了自己。"},
    {"type":"narrator","text":"他转过身，走向回廊深处。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"走吧，我带你去见一个人。他知道真相的全貌——关于索尔温，关于锁神装置。"},
    {"type":"narrator","text":"获得状态【艾德蒙的同行】。"},
    {"type":"effect","flags":{"edmundGuidance":"truth","edmund同行":true},"addStatuses":["艾德蒙的同行"]},
    {"type":"jump","goto":"chapter4_father"}
  ],
  "chapter4_reunion_b":
  [
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"救？怎么救？"},
    {"type":"char","role":"player","speaker":"你","text":"锁神装置。你知道怎么进去，知道怎么修复它......或者摧毁它。"},
    {"type":"narrator","text":"他沉默了很久。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"你想让我帮你。"},
    {"type":"char","role":"player","speaker":"你","text":"我想让你帮我做完你二十年前没做完的事。"},
    {"type":"narrator","text":"他沉默了许久，神情恍惚。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"好。"},
    {"type":"narrator","text":"他从怀中取出一枚羽毛——黑色的，边缘泛着银光。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"这是锁神装置的钥匙。是你的父亲留给你的——不，是我留给你的。拿着它，去地底吧，我会在那里等你。"},
    {"type":"narrator","text":"获得【锁神装置的钥匙】。"},
    {"type":"effect","flags":{"edmundGuidance":"save","lockKey":true}},
    {"type":"jump","goto":"chapter4_father"}
  ],
  "chapter4_reunion_c":
  [
    {"type":"narrator","text":"你走到回廊边缘，和他并肩站着。天空之城的夜景在脚下铺开——白晶建筑在月光下泛着冷光，风脉管道在空中交错，像一张巨大的洁白的蛛网。"},
    {"type":"narrator","text":"你没有说话，艾德蒙将腐蚀的羽翼收敛起来。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"我带你去一个地方，也许那里有你想要的答案。"},
    {"type":"effect","flags":{"edmundGuidance":"silent"}},
    {"type":"jump","goto":"chapter4_father"}
  ],
  "chapter4_father":
  [
    {"type":"title","chapter":"第四幕","subtitle":"父与子"},
    {"type":"narrator","text":"艾德蒙带你穿过风脉回廊底层，来到一间废弃的工坊。锻造台、钳具、熔炉都还在，一枚半成品的金属骨架躺在台面上。"},
    {"type":"narrator","text":"你父亲走到台前，手指轻轻碰了一下那枚骨架的边缘。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"这是我最后一次来这里时留下的。二十年前，就在那天晚上，我决定激活锁神装置。"},
    {"type":"narrator","text":"他转过身看你。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"你知道我为什么这么做吗？"},
    {"type":"char","role":"player","speaker":"你","text":"因为你想毁掉风脉之心？"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"不，不仅是因为我想毁掉那个装置，那个囚禁了天空之城神明索尔温三千年的装置，更是因为我以为毁掉它——风脉之心就会停止运转。城市会坠落，这一切的虚伪都会浮出水面，索尔温也会自由。"},
    {"type":"narrator","text":"他低下头。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"但我错了。装置虽然被激活了，但索尔温没有自由。失去了神明的庇佑，祂的仇恨蔓延开来。污染从地底涌出来，然后一切都不一样了。"},
    {"type":"narrator","text":"他抬起头看你。他的眼睛和你一样——深色，锐利，能看穿谎言。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"你会相信这一切么？关于污染的真相？关于神明的献祭？关于我？"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"现在——你是要杀了我，还是跟我合作？"},
    {"type":"choice","options":[{"label":"杀父。","next":"chapter4_father_kill"},{"label":"与他合作。","next":"chapter4_father_cooperate"},{"label":"放他走。","next":"chapter4_father_release"}]}
  ],
  "chapter4_father_kill":
  [
    {"type":"narrator","text":"你拔出武器，艾德蒙没有躲。他看着你，眼神里没有恐惧——只有一种奇怪的释然。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"我早说过了，我的孩子，看来你比我勇敢。"},
    {"type":"narrator","text":"你动手了，他倒在工坊的地板上，残缺的翅膀在月光下最后一次展开。你从他身上取走了一根【染血的羽毛】。"},
    {"type":"narrator","text":"获得【染血的羽毛】。所有同伴好感+15。"},
    {"type":"effect","flags":{"fatherFate":"kill","bloodFeather":true},"removeStatuses":["艾德蒙的同行"],"companionAffection":15},
    {"type":"jump","goto":"chapter4_final"}
  ],
  "chapter4_father_cooperate":
  [
    {"type":"narrator","text":"你伸出手，他看着你的手，沉默了很久。然后他握住了。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"好。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"那我们一起下去，我带你去找那个装置。但你要答应我一件事——如果到时候必须选择，不要为了我犹豫。"},
    {"type":"narrator","text":"获得状态【父亲的同行】。主线进入终局。所有同伴好感-30——他们视你为背叛者。"},
    {"type":"effect","flags":{"fatherFate":"cooperate","fatherCompanion":true},"removeStatuses":["艾德蒙的同行"],"addStatuses":["父亲的同行"],"companionAffection":-30},
    {"type":"jump","goto":"chapter4_final"}
  ],
  "chapter4_father_release":
  [
    {"type":"narrator","text":"你退后一步，指向风脉回廊的出口。他看了你很久。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"你要放我走？"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"你很聪明，但你也要知道，你会付出代价——那些信任你的人不会原谅你。"},
    {"type":"narrator","text":"他转身消失在回廊深处，你站在原地。然后你听到他的声音从远处传来，混在风里含混不清：“谢谢你。”"},
    {"type":"narrator","text":"获得【父亲的护符】boss之战中抵挡一次致命伤。所有同伴好感-5。"},
    {"type":"effect","flags":{"fatherFate":"release","fatherTalisman":true},"removeStatuses":["艾德蒙的同行"],"companionAffection":-5},
    {"type":"jump","goto":"chapter4_final"}
  ],
  "chapter4_final":
  [
    {"type":"title","chapter":"第五幕","subtitle":"终局献祭抉择"},
    {"type":"narrator","text":"你站在锁神装置前，巨大的黑色晶石柱阵矗立在地下深处的巨大空腔中。索尔温的碎片在晶柱中蠕动——像无数挣扎的影子。"},
    {"type":"narrator","text":"装置有一个核心的缺口，修复它，或者摧毁它。若是要释放神明的意志，需要一个人的意识作为“锚点”，装置会吞噬这个人，但也会因为这个人而改变。"},
    {"type":"narrator","text":"奥德里克站在你身边，他的义肢在污染中发出刺耳的嗡鸣——但他难得的没有退缩。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"二十多年前，我没能将他们带回去，从此每个夜晚，我都能听见他们在呼唤我，让我不要回头。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"这二十年来，我做了很多错事，我没有活着，却也无法死去。但现在，至少我还有补救的机会。无论发生什么，我都会在这里，我想我也应该，面对过去的梦魇了。"},
    {"type":"narrator","text":"你身后还站着其他人——那些你在这段旅途中遇到的人。他们的目光落在你身上，等着你的决定。"},
    {"type":"narrator","text":"终局之日。你究竟会选择亲近的同伴，失序的正义，还是自我的野心？"},
    {"type":"choice","options":[{"label":"献祭自己。","next":"ending_self"},{"label":"拒绝献祭，让奥德里克献祭。","next":"ending_prisoner"},{"label":"拒绝献祭，摧毁装置。","next":"final_destroy"}]}
  ],
  "final_destroy":
  [
    {"type":"narrator","text":"你举起武器。你砸向装置核心。黑色晶石碎裂。索尔温的碎片从裂缝中涌出——凝成一只可怕的巨兽。"},
    {"type":"narrator","text":"进入最终战斗。"},
    {"type":"battle","id":"final","success":"resolve_destroy_ending","fail":"ending_dawn","url":"game3.html?mode=empire"}
  ],
  "resolve_destroy_ending":
  [
    {"type":"endingauto"}
  ],
  "ending_self":
  [
    {"type":"title","chapter":"结局","subtitle":"羽蚀共生"},
    {"type":"narrator","text":"你走向装置核心。你听到奥德里克在身后喊你的名字。你没有回头。"},
    {"type":"narrator","text":"你把手放在核心缺口上。黑色光芒包裹了你。然后你感觉到——索尔温的碎片在触碰你。它问你：“你愿意承载我吗？”"},
    {"type":"narrator","text":"你点了点头。"},
    {"type":"narrator","text":"光芒吞没了你。你的意识被拉入一个巨大的、黑暗的空间。你看到索尔温，那不是疯狂的神，而是一个蜷缩在黑暗中的、疲惫的轮廓。他看着你，声音像远方的风。"},
    {"type":"char","role":"npc","speaker":"索尔温","text":"你来了。三千年了，没有人愿意承载我。他们都想利用我，抽取我，囚禁我，杀死我。你是第一个问我想不想被释放的人。"},
    {"type":"narrator","text":"你的意识融入了祂。污染停止了。天空之城的裂纹开始愈合。世界恢复了平衡。但你不再是人了——你是索尔温的新载体。"},
    {"type":"cg","bg":"../images/empireending/1.jpg","text":"你从锁神装置中走出，奥德里克站在远处，他想跑过来，但你的身体在发光。你伸出手，但他没有握。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你还在吗？"},
    {"type":"narrator","text":"你轻轻点了点头。但他知道——你不再是你了。"},
    {"type":"narrator","text":"结局名称： 羽蚀共生"},
    {"type":"narrator","text":"结局类型： 特殊结局"},
    {"type":"narrator","text":"成就解锁： 【羽蚀共生·帝国城邦】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_prisoner":
  [
    {"type":"title","chapter":"结局","subtitle":"永恒囚徒"},
    {"type":"narrator","text":"你看向奥德里克，他也看着你，没有说话。"},
    {"type":"narrator","text":"他明白你想要做什么了。"},
    {"type":"narrator","text":"于是他走向装置核心，你目送着他，他没有回头。"},
    {"type":"narrator","text":"他的身影被光芒吞没，锁神装置停止了震动，污染逐渐从天空之城的裂纹中退去，风脉之心重新亮起蓝色的光。"},
    {"type":"narrator","text":"他成了新的封印，他的意识融入了索尔温的碎片中。"},
    {"type":"cg","bg":"../images/empireending/2.jpg","text":"你站在风脉之心大厅，风脉之心恢复了光芒，但奥德里克不在了。但他的义肢——那只银灰色的金属手臂——被刻在了晶石表面。像一幅画，像一座墓碑。"},
    {"type":"narrator","text":"你走出审判穹顶，天空之城的街道上有人在欢呼，城市获救了，但他们不知道是谁做的。"},
    {"type":"narrator","text":"你抬起头，天空很蓝，风从云层间灌下来。你听到一个声音——极其微弱的，像远方的风。那是奥德里克在说话。"},
    {"type":"char","role":"npc","speaker":"奥德里克（画外音）","text":"……别为我哭泣。二十年前我就该死了，我只是完成了我该做的。现在，我终于可以休息了。"},
    {"type":"narrator","text":"结局名称： 永恒囚徒"},
    {"type":"narrator","text":"结局类型： 牺牲结局"},
    {"type":"narrator","text":"成就解锁： 【永恒囚徒·帝国城邦】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_steel":
  [
    {"type":"title","chapter":"结局","subtitle":"钢铁纪元"},
    {"type":"narrator","text":"你举起武器，砸向装置核心，黑色的晶石碎裂。索尔温的碎片从裂缝中涌出——凝成一只可怕的巨兽。"},
    {"type":"narrator","text":"进入最终战斗并成功"},
    {"type":"narrator","text":"奥德里克的义肢在战斗中爆发出前所未有的光芒——符文能量从金属表面涌出，形成一道护盾，挡在你面前。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"跑！我来挡住它！"},
    {"type":"narrator","text":"你冲向核心，索尔温的碎片在触碰到你时消散了。你听到了一个声音，极其微弱的，像远方的风。那是索尔温在说话：“……谢谢。”"},
    {"type":"narrator","text":"污染停止了，但风脉之心也失去了能量来源。天空之城开始倾斜——缓慢地、不可阻挡地向下坠落。"},
    {"type":"narrator","text":"奥德里克从废墟中爬出来，他的义肢冒着烟——但他在笑。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我们成功了。"},
    {"type":"narrator","text":"你看着他，然后你看向天空之城，它还在坠落。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"走吧。我们还有事要做。"},
    {"type":"cg","bg":"../images/empireending/3.jpg","text":"多年后，帝国城邦，符文工坊。你站在工作台前，奥德里克坐在你旁边。他的义肢换了新的，符文光芒比以往更亮。窗外，天空之城坐落在地面上，白晶建筑在阳光下闪闪发光。风脉回廊变成了河流，人们在街道上走动，有羽人，有人类。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你当初说，要建立新的秩序。"},
    {"type":"narrator","text":"他转过头看你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我们做到了。"},
    {"type":"narrator","text":"结局名称：钢铁纪元"},
    {"type":"narrator","text":"结局类型： 帝国城邦线最佳结局"},
    {"type":"narrator","text":"成就解锁： 【钢铁纪元】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_afterfire":
  [
    {"type":"title","chapter":"结局","subtitle":"铁与火之后"},
    {"type":"narrator","text":"你举起武器。你砸向装置核心。黑色晶石碎裂。索尔温的碎片从裂缝中涌出——凝成一只可怕的巨兽。"},
    {"type":"narrator","text":"进入最终战斗并成功。"},
    {"type":"narrator","text":"奥德里克在战斗中受了重伤——他的义肢碎裂了大半，但你活下来了。"},
    {"type":"narrator","text":"污染停止了，天空之城开始坠落，奥德里克靠在你肩上，义肢冒着烟。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我们赢了……对吧？"},
    {"type":"char","role":"player","speaker":"你","text":"对，赢了。"},
    {"type":"narrator","text":"他看着你，他的眼睛很累——但没有遗憾。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"那就好。"},
    {"type":"cg","bg":"../images/empireending/4.jpg","text":"你站在悬崖边缘。天空之城已经坠落到地面——白晶建筑碎裂成废墟。奥德里克站在你旁边，义肢已经拆掉了，露出空荡荡的袖管。他看着远方。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"我本来以为——我活不过那场战争。"},
    {"type":"narrator","text":"他转过头看你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"但我活下来了，和你一起。"},
    {"type":"narrator","text":"结局名称：铁与火之后"},
    {"type":"narrator","text":"结局类型： 悲情结局"},
    {"type":"narrator","text":"成就解锁： 【铁与火之后】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_dawn":
  [
    {"type":"title","chapter":"结局","subtitle":"拂晓的消散"},
    {"type":"narrator","text":"你举起武器，砸向装置核心。黑色晶石碎裂。索尔温的碎片从裂缝中涌出——凝成一只可怕的巨兽。"},
    {"type":"narrator","text":"进入最终战斗但失败。"},
    {"type":"narrator","text":"奥德里克挡在你面前，他的义肢爆发出最后的蓝光——然后碎裂了，巨兽的利爪穿过他的胸膛。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"……跑。"},
    {"type":"narrator","text":"你冲向他，但他已经倒下了。他的眼睛没有闭上，默默看着你，嘴唇动了一下，但没有声音。"},
    {"type":"narrator","text":"你击退了巨兽，索尔温的碎片从裂缝中涌出——然后开始消散。"},
    {"type":"narrator","text":"污染停止了，但索尔温消失了。所有从祂身上抽取的能量都消失了，风脉之心彻底熄灭，符文科技全部失效，古树的根脉枯萎，熔岩炉冷却。"},
    {"type":"narrator","text":"四族失去了能源。世界进入了一个新的时代——没有魔法，没有符文，没有风脉。只有人类、精灵、地精、羽人......和他们的双手。"},
    {"type":"cg","bg":"../images/empireending/5.jpg","text":"多年后，你站在一片废墟上，远处有人在耕作，有人在建造，没有翅膀的羽人在用绳索攀爬，没有符文的人类在点着火把。世界很安静，但你活下来了，但你们都活下来了——用自己的方式。"},
    {"type":"narrator","text":"你走到一座墓碑前，墓碑上刻着奥德里克的名字。你把手放在石面上，你什么都没有说。但他知道，是你来了。"},
    {"type":"narrator","text":"结局名称： 拂晓的消散"},
    {"type":"narrator","text":"结局类型： 新时代结局"},
    {"type":"narrator","text":"成就解锁： 【拂晓的消散·帝国城邦】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_father":
  [
    {"type":"title","chapter":"结局","subtitle":"父与子"},
    {"type":"narrator","text":"你举起武器，砸向装置核心，黑色的晶石碎裂，索尔温的碎片从裂缝中涌出。"},
    {"type":"narrator","text":"但碎片没有消散，它们涌向了一个方向。你的父亲站在装置边缘，张开双臂。"},
    {"type":"char","role":"npc","speaker":"艾德蒙","text":"索尔温。我来了。"},
    {"type":"narrator","text":"碎片涌入他的身体，他的翅膀完全展开——左翼上的黑色结晶蔓延到全身，他的眼睛变成了金色，他的声音不再是他的声音。"},
    {"type":"char","role":"npc","speaker":"索尔温（通过艾德蒙）","text":"你囚禁了我三千年。现在——你成了我。"},
    {"type":"narrator","text":"艾德蒙......或者说索尔温，转过身看你。他伸出了手，你握住了。"},
    {"type":"narrator","text":"你们一起走出装置，天空之城的裂纹开始愈合，污染停止。但你的父亲——他不再是你的父亲了，他是索尔温的载体，一个行走在世界上的神。"},
    {"type":"cg","bg":"../images/empireending/6.jpg","text":"你和艾德蒙站在风脉回廊的边缘，他，或者说祂，看着远方的云层。他的声音是两个人的声音叠加在一起。"},
    {"type":"char","role":"npc","speaker":"艾德蒙/索尔温","text":"你自由了，去做你想做的事吧。我会注视着你。"},
    {"type":"narrator","text":"你转身离开，背后是那个不再是你父亲的人。但你知道，他还在里面，在某个地方。而你们谁也不知道这个神明被放出来后将会成就怎样的新世界。"},
    {"type":"narrator","text":"结局名称： 父与子"},
    {"type":"narrator","text":"结局类型： 黑暗结局"},
    {"type":"narrator","text":"成就解锁： 【父与子·帝国城邦】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_four_clans":
  [
    {"type":"title","chapter":"结局","subtitle":"四族盟约"},
    {"type":"narrator","text":"你举起武器，砸向装置核心，黑色的晶石碎裂。索尔温的碎片从裂缝中涌出——凝成一只可怕的巨兽。"},
    {"type":"narrator","text":"进入最终战斗。"},
    {"type":"narrator","text":"奥德里克、塞琳、艾拉瑞亚、格里姆——他们站在你身边，四族的代表并肩作战。"},
    {"type":"narrator","text":"你们打败了巨兽，索尔温的碎片从裂缝中涌出——然后开始消散。"},
    {"type":"narrator","text":"污染停止了，世界恢复了平静，但索尔温的消失留下了真空——四族之间的平衡被打破了。"},
    {"type":"narrator","text":"你站在废墟驿站，四位同伴站在你身后。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"帝国失去了符文能源，但技术还在。"},
    {"type":"char","role":"npc","speaker":"塞琳","text":"天空之城失去了悬浮，但它还活着。"},
    {"type":"char","role":"npc","speaker":"艾拉瑞亚","text":"森林失去了根脉共鸣，但树还在生长。"},
    {"type":"char","role":"npc","speaker":"格里姆","text":"地底失去了熔岩炉，但我们还有双手。"},
    {"type":"narrator","text":"他们看着你。"},
    {"type":"char","role":"npc","speaker":"奥德里克","text":"你说吧，我们该怎么做？"},
    {"type":"narrator","text":"你写下了四个字：“四族盟约。”"},
    {"type":"narrator","text":"四族代表在废墟驿站签署了盟约。没有神，没有献祭，没有囚禁。只有四个种族——各自残缺，各自完整。"},
    {"type":"cg","bg":"../images/skyending/7.jpg","text":"多年后，废墟驿站变成了一座城市。四族的人在这里交易、生活、通婚。城市中央有一座雕像——一个没有翅膀的人，站在四个种族的代表中间。底座上刻着：“无翼者，连接大地与天空。”"},
    {"type":"narrator","text":"结局名称： 四族盟约"},
    {"type":"narrator","text":"结局类型： 隐藏最佳结局"},
    {"type":"narrator","text":"成就解锁： 【四族盟约·帝国城邦】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_hero":
  [
    {"type":"title","chapter":"结局","subtitle":"无名英雄"},
    {"type":"narrator","text":"你举起武器，砸向装置核心，黑色的晶石碎裂。索尔温的碎片从裂缝中涌出——凝成一只可怕的巨兽。"},
    {"type":"narrator","text":"进入最终战斗并成功。"},
    {"type":"narrator","text":"你独自打败了巨兽，索尔温的碎片从裂缝中涌出——然后开始消散。"},
    {"type":"narrator","text":"污染停止了，世界得救了，但没有人知道是你做的。没有同伴站在你身后，没有城市为你欢呼，没有史书记载你的名字。"},
    {"type":"narrator","text":"你走出锁神装置，风脉之心的裂纹在愈合，天空之城的倾斜在停止，四族在各自庆祝——他们以为是自己拯救了世界。"},
    {"type":"narrator","text":"你站在悬崖边缘，脱下斗篷，赤脚走向远方。"},
    {"type":"cg","bg":"../images/skyending/8.jpg","text":"一个无名的背影走在无名的路上，背后是四个种族庆祝的烟火，没有人看他，也没有人知道他的名字。"},
    {"type":"narrator","text":"结局名称： 无名英雄"},
    {"type":"narrator","text":"结局类型： 悲情结局"},
    {"type":"narrator","text":"成就解锁： 【无名英雄·帝国城邦】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ],
  "ending_unchanged":
  [
    {"type":"title","chapter":"结局","subtitle":"未变之局"},
    {"type":"narrator","text":"一切仍旧按着神秘商人所预言的那样前行，你闭上眼睛。"},
    {"type":"narrator","text":"结局名称： 未变之局"},
    {"type":"narrator","text":"结局类型： 失败结局"},
    {"type":"narrator","text":"成就解锁： 【未变之局·帝国城邦】"},
    {"type":"choice","options":[{"label":"返回游戏主菜单","next":"end"}]}
  ]
};

/*存档恢复*/
if (
  save &&
  save.story === "empire" &&
  (
    mode === "continue" ||
    navigationType === "reload" ||
    navigationType === "back_forward"
  )
)
{
  currentNode = save.node;
  pos = save.index;
  haogandu = save.haogandu;
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
  currentNode = fromNodeMap[from] ?? "loc_emp_" + from;
  pos = 0;
  freedomDay = cnt;
  empireFlags.freedomDay = freedomDay;
  empireFlags.freedomTime = time;
  saveEmpireFlags();

  const url = new URL(window.location.href);
  url.searchParams.delete("from");
  history.replaceState(null, "", url.pathname + url.search);

  if (save && save.story === "empire")
  {
    haogandu = save.haogandu;
  }
}

/*小游戏返回*/
function isSuccessResult(value)
{
  return value === "true" || value === "win" || value === "success" || value === "1";
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
  if (rawResult === null) return false;
  if (pending.bg && !currentBackground)
  {
    currentBackground = pending.bg;
    storyBg.style.backgroundImage = `url("${pending.bg}"), url("${FALLBACK_BG}")`;
  }
  if (pending.freedomDay !== undefined) freedomDay = pending.freedomDay;
  if ((rawResult === "cancel" || rawResult === "flee") && pending.cancel)
  {
    currentNode = pending.cancel;
  }
  else
  {
    currentNode = isSuccessResult(rawResult) ? pending.success : pending.fail;
  }
  pos = 0;
  sessionStorage.removeItem(storageKey);
  return true;
}

const battleResult = iswin3 !== null ? iswin3 : (params.get("battleResult") || null);
const checkResult = iswin2 !== null ? iswin2 : (resultParam || params.get("checkResult") || minigameResultParam);

let resultResolved = false;

if (game4Result !== null)
{
  resultResolved = resolvePendingResult("empire_pending_infiltration", game4Result);

  const url = new URL(window.location.href);
  url.searchParams.delete("game4Result");
  history.replaceState(null, "", url.pathname + url.search);
}

if (!resultResolved && battleResult !== null)
{
  let battleId = null;
  try
  {
    const pendingRaw = sessionStorage.getItem("empire_pending_battle");
    if (pendingRaw) battleId = JSON.parse(pendingRaw).id || null;
  }
  catch (error) {}

  const hpNum = hpParam !== null ? Number(hpParam) : null;
  const isFinalBattle = ["sky_final","final","forest_final","final_battle"].indexOf(battleId) !== -1;
  const isNoLossBattle = battleId === "haggle";

  if (hpNum !== null && hpNum <= 0 && !isFinalBattle && !isNoLossBattle)
  {
    sessionStorage.removeItem("empire_pending_battle");
    currentNode = "ending_unchanged";
    pos = 0;
    resultResolved = true;
    empireFlags.hp = MAX_HP;
    saveEmpireFlags();
    updateHP();
  }
  else
  {
    resultResolved = resolvePendingResult("empire_pending_battle", battleResult);

    if (hpParam !== null)
    {
      empireFlags.hp = Math.max(0, Math.min(MAX_HP, Number(hpParam)));
      saveEmpireFlags();
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
  resultResolved = resolvePendingResult("empire_pending_check", checkResult);
  if (resultResolved && feather !== null)
  {
    const n = Number(feather) || 0;
    addItem("windCrystal", n >= 6 ? 9 : n >= 3 ? 6 : 3);
  }
}

if (!resultResolved && document.referrer.includes("game2.html"))
{
  const raw = sessionStorage.getItem("empire_pending_check");
  if (raw)
  {
    try
    {
      const pending = JSON.parse(raw);
      currentNode = pending.success;
      pos = 0;
      sessionStorage.removeItem("empire_pending_check");
      resultResolved = true;
    }
    catch (error)
    {
      console.error(error);
    }
  }
}

if (resultResolved && save && save.story === "empire")
{
  haogandu = save.haogandu;
}

updateAffection();
loadOtherAffection();
updateOtherAffection();
updateHP();
updateCurrency();
renderStatus();
renderIntel();
let nodeData = nodes[currentNode];

/*隐藏逻辑*/
function applyEffect(item)
{
  if (item.flags)
  {
    Object.assign(empireFlags, item.flags);
    saveEmpireFlags();
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

  if (item.setAffection !== undefined) setAffection(item.setAffection);
  else if (item.affection !== undefined) applyAffection(item.affection);
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
    empireFlags.memoryFragments = memoryFragments() + Number(item.memoryDelta);
    saveEmpireFlags();
    updateCurrency();
  }
  if (item.hpDelta !== undefined)
  {
    empireFlags.hp = Math.max(0, Math.min(MAX_HP, currentHP() + Number(item.hpDelta)));
    saveEmpireFlags();
    updateHP();
  }
  if (item.dailyFlag)
  {
    empireFlags[item.dailyFlag + freedomDay] = true;
    saveEmpireFlags();
  }
  if (item.incFlag)
  {
    empireFlags[item.incFlag] = (empireFlags[item.incFlag] || 0) + 1;
    saveEmpireFlags();
  }
  pos++;
  saveGame("empire", currentNode, pos, haogandu);
  render();
}

function goToNode(next)
{
  currentNode = next;
  nodeData = nodes[currentNode];
  pos = 0;
  render();
}

function resolveDestroyEnding()
{
  /*终局判定*/

  if (empireFlags.fatherFate === "cooperate")
  {
    goToNode("ending_father");
    return;
  }

  /*终局判定*/
  if (isFourClansReady())
  {
    goToNode("ending_four_clans");
    return;
  }

  if (haogandu >= 60)
  {
    goToNode("ending_steel");
    return;
  }

  if (haogandu <= 50)
  {
    goToNode("ending_afterfire");
    return;
  }

  goToNode("ending_hero");
}

/*剧情渲染*/
/* 任务揭示：正文出现「主线任务」时记录，供 task.js 精确控制任务栏显示时机 */
const TASK_REVEAL_NODES =
{
  "start": "ch1",
  "chapter2_after_question": "ch2",
  "chapter3": "ch3",
  "chapter4": "ch4"
};

function revealTasksForNode(nodeId)
{
  const taskId = TASK_REVEAL_NODES[nodeId];
  if (!taskId) return;
  if (empireFlags.taskRevealed && empireFlags.taskRevealed[taskId]) return;
  empireFlags.taskRevealed = empireFlags.taskRevealed || {};
  empireFlags.taskRevealed[taskId] = true;
  saveEmpireFlags();
}

/* 老存档一次性补录：按当前节点所在章节，把已走过的章节标记为已揭示 */
function migrateTaskReveals()
{
  if (empireFlags.taskRevealed) return;
  empireFlags.taskRevealed = {};
  const node = currentNode || "start";
  let cur = 1;
  if (/^chapter2/.test(node)) cur = 2;
  else if (/^chapter3/.test(node)) cur = 3;
  else if (/^chapter4/.test(node) || /^ending/.test(node) || /^final/.test(node) || /ember_epilogue/.test(node)) cur = 4;
  else if (/^(freedom|mainmap_|loc_)/.test(node)) cur = Math.max(1, Number(empireFlags.freedomDay || 1));
  for (let n = 1; n <= cur; n++) empireFlags.taskRevealed["ch" + n] = true;
  saveEmpireFlags();
}

function render()
{
  nodeData = nodes[currentNode];
  if (!nodeData || pos >= nodeData.length) return;
  migrateTaskReveals();
  revealTasksForNode(currentNode);
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
      if (haogandu >= Number(opt.min) && haogandu <= Number(opt.max))
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
    const value = empireFlags[item.flag];
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
    const done = empireFlags[item.flag + freedomDay];
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
      if ((empireFlags.inventory?.[id] || 0) < n) { ok = false; break; }
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

  saveGame("empire", currentNode, pos, haogandu);

  choiceDom.style.display = "none";
  textDom.style.display = "none";

  if (silhouetteDom) silhouetteDom.style.display = "none";
  textDom.classList.remove("char-mode");
  hint.textContent = "点击画面 / Enter / Space / ▸键 继续";

  if (item.type === "battle")
  {
    mapClickable = false;
    updateMapState();
    sessionStorage.setItem("empire_pending_battle",JSON.stringify
    ({
      id: item.id,
      success: item.success,
      fail: item.fail,
      cancel: item.cancel || null,
      freedomDay: freedomDay,
      bg: currentBackground
    }));
    fadeNav(item.url + "&battle=" + item.id + "&hp=" + currentHP());
  }

  else if (item.type === "infiltration")
  {
    mapClickable = false;
    updateMapState();
    sessionStorage.setItem("empire_pending_infiltration", JSON.stringify
    ({
      id: item.id,
      success: item.success,
      fail: item.fail,
      freedomDay: freedomDay,
      bg: currentBackground
    }));
    fadeNav(item.url);
  }

  else if (item.type === "skillcheck")
  {
    mapClickable = false;
    updateMapState();
    sessionStorage.setItem("empire_pending_check",JSON.stringify
    ({
      id: item.id,
      success: item.success,
      fail: item.fail,
      freedomDay: freedomDay,
      bg: currentBackground
    }));

    const gameUrl = new URL(item.url || "game2.html?mode=empire", window.location.href);
    const currentPage = window.location.pathname.split("/").pop() || "story-empire.html";
    gameUrl.searchParams.set("return", currentPage);
    fadeNav(gameUrl.href);
  }

  else if (item.type === "freedomEnd")
  {
    mapClickable = false;
    updateMapState();
    time = Number(empireFlags.freedomTime ?? time ?? 0);
    time++;
    empireFlags.freedomDay = freedomDay;
    empireFlags.freedomTime = time;
    saveEmpireFlags();
    if (time < 4)
    {
      fadeNav(`map.html?mode=empire&cnt=${item.day}&time=${time}`);
      return;
    }
    empireFlags.freedomTime = 0;
    saveEmpireFlags();
    goToNode(item.next);
  }

  else if (item.type === "title")
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
      empireFlags.freedomDay = freedomDay;
      empireFlags.freedomTime = 0;
      saveEmpireFlags();
    }
    else mapClickable = false;
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
      if (item.role === "npc") silhouetteDom.classList.add("npc");
      else silhouetteDom.classList.add("player");
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
        if (opt.affection !== undefined) applyAffection(opt.affection);
        if (opt.flags)
        {
          Object.assign(empireFlags, opt.flags);
          saveEmpireFlags();
        }
        if (opt.cost)
        {
          for (const [key, val] of Object.entries(opt.cost))
          {
            const have = key === "memoryFragments" ? memoryFragments() : (empireFlags.inventory?.[key] || 0);
            if (have < val) { hint.textContent = "资源不足，无法兑换/购买"; return; }
          }
          for (const [key, val] of Object.entries(opt.cost))
          {
            if (key === "memoryFragments") empireFlags.memoryFragments = memoryFragments() - val;
            else removeItem(key, val);
          }
          if (opt.give) Object.entries(opt.give).forEach(function ([id, c]) { addItem(id, c); });
          saveEmpireFlags();
          updateCurrency();
        }
        if (opt.next === "end")
        {
          saveGame("empire", currentNode, pos, haogandu, true);
          resetEmpireFlags();
          clickNav("mainmenu.html");
          return;
        }
        goToNode(opt.next);
      });
      choiceDom.appendChild(a);
    });
    choiceDom.style.display = item.options.length >= 5 ? "grid" : "block";
  }

}

/* 剧情推进（键盘/点击共用） */
function advanceStory()
{
  if (settingsOpen) return;
  if (/^freedom[123]$/.test(currentNode) && pos === 0) return;
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
  if (e.key === " " || e.key === "ArrowRight" || e.key === "Enter")
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

render();

exitGameButton.addEventListener("click", openSettings);

settingsContinue.addEventListener("click", closeSettings);
settingsSaveExit.addEventListener("click", function ()
{
  saveGame("empire", currentNode, pos, haogandu);
  saveEmpireFlags();
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
  turnNav(`map.html?mode=empire&cnt=${day}&time=0`);
});

mapMini.addEventListener("mouseleave", function ()
{
  mapTip.style.opacity = "0";
  mapTip.style.visibility = "hidden";

  mapTip.textContent = "商人的地图";
});
/*背包*/
bagMini.addEventListener("click", function () {
  inventoryPanel.classList.toggle("open");
  if (inventoryPanel.classList.contains("open"))
  {
    bagMini.classList.add("opened");
    renderInventory();
  }
  else bagMini.classList.remove("opened");
});

inventoryClose.addEventListener("click", function () {
  inventoryPanel.classList.remove("open");
  bagMini.classList.remove("opened");
});
