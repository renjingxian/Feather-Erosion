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
const battleResultParam = params.get("battleResult");
const game4Result = params.get("game4Result");
const iswin2 = params.get("iswin2");
const resultParam = params.get("result");
const minigameResultParam = params.get("minigameResult");
const checkResultParam = params.get("checkResult");
const feather = params.get("feather");
const hpParam = params.get("hp");

const save = loadGame();
const gender = getCurrentGender();
const playerImg = gender === "male"
  ? "../images/malelead.png"
  : "../images/femalelead.png";

const Celine = "../images/Celine.png";
const Uncle = "../images/uncle.png";
const Dazhanglao = "../images/dazhanglao.png";
const Edmund = "../images/Edmund.png";
const Sorwin = "../images/Sorwin.png";
const Guard = "../images/guard.png";
const Passerby = "../images/passby.png";

function getCharacterImage(item)
{
  if (item.charImg) return item.charImg;
  if (item.role === "player") return playerImg;

  const speaker = item.speaker || "";

  if (speaker.includes("赛琳")) return Celine;
  if (speaker.includes("叔叔")) return Uncle;
  if (speaker.includes("大长老")) return Dazhanglao;
  if (speaker.includes("艾德蒙")) return Edmund;
  if (speaker.includes("索尔温")) return Sorwin;
  if (speaker.includes("守卫")) return Guard;
  if (speaker.includes("路人")) return Passerby;

  return "";
}

/* 背景库 */
const sceneBackgrounds =
{
  street: "../images/skybg/skybg1.jpg",
  gate: "../images/skybg/skybg2.jpg",
  tower: "../images/skybg/skybg3.jpg",
  under: "../images/skybg/skybg4.jpg",
  workshop: "../images/skybg/skybg5.jpg",
  hall: "../images/skybg/skybg6.jpg",
  archive: "../images/skybg/skybg7.jpg",
  end: "../images/skybg/skybg8.jpg",
  mudi: "../images/skybg/skybg9.jpg",
  father: "../images/skybg/skybg10.jpg",

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

const nodeBackgrounds =
{
  freedom1: "street",
  mainmap_1: "street",
  yun1: "street",
  yun2: "street",
  yun3: "street",
  yun4: "street",

  start: "gate",
  chapter1_a1: "gate",
  chapter1_a2: "gate",
  chapter1_a2_success: "gate",
  chapter1_a2_fail: "gate",
  chapter1_a3: "gate",

  chapter1_city: "street",
  chapter1_tower: "tower",
  chapter1_sel1: "tower",
  chapter1_sel2: "tower",
  chapter1_sel3: "tower",

  chapter1_corridor: "under",
  chapter1_corridor_a: "under",
  chapter1_corridor_b: "under",
  chapter1_corridor_c: "under",

  chapter1_workshop: "workshop",
  chapter1_workshop_a: "workshop",
  chapter1_workshop_b: "workshop",
  chapter1_workshop_c: "workshop",
  chapter1_end: "workshop",

  chapter2: "hall",
  chapter2_question_a: "hall",
  chapter2_question_b: "hall",
  chapter2_question_c: "hall",
  chapter2_infiltration: "hall",
  chapter2_infiltration_success: "archive",
  chapter2_infiltration_fail: "hall",
  chapter2_archive_a: "archive",
  chapter2_archive_b: "archive",
  chapter2_archive_c: "archive",
  chapter2_records: "archive",
  chapter2_uncle_a: "archive",
  chapter2_uncle_b: "archive",
  chapter2_uncle_c: "archive",
  chapter2_celine_wait: "archive",
  chapter2_wait_a: "archive",
  chapter2_wait_b: "archive",
  chapter2_wait_c: "archive",
  chapter2_wait_common: "archive",

  chapter3: "hall",
  chapter3_night_a: "hall",
  chapter3_night_b: "hall",
  chapter3_night_c: "hall",
  chapter3_tianlie: "mudi",
  chapter3_middle: "mudi",
  chapter3_extreme: "mudi",
  chapter3_alliance: "mudi",
  chapter3_isolated: "mudi",
  chapter3_ceremony: "hall",
  chapter3_ceremony_alliance: "hall",
  chapter3_ceremony_middle: "hall",
  chapter3_ceremony_isolated: "hall",
  chapter3_end: "hall",

  chapter4: "hall",
  chapter4_uncle_a: "hall",
  chapter4_uncle_b: "hall",
  chapter4_uncle_c: "hall",
  chapter4_bottom: "under",
  chapter4_celine_a: "under",
  chapter4_celine_b: "under",
  chapter4_celine_c: "under",
  chapter4_tower: "tower",
  chapter4_letter: "tower",
  chapter4_letter_skip: "tower",
  chapter4_father: "father",
  chapter4_father_a: "father",
  chapter4_father_b: "father",
  chapter4_father_c: "father",
  chapter4_father_final: "father",
  chapter4_killfather: "father",
  chapter4_cooperate: "father",
  chapter4_letgo: "father",
  chapter4_final_choice: "end",

  ending_self: "end",
  ending_celine: "end",
  ending_destroy: "end",
  ending_destroy_battle: "end",
  ending_destroy_resolve_win: "end",
  ending_destroy_resolve_lose: "end",
  ending_destroy_win: "end",
  ending_destroy_fall: "end",
  ending_destroy_lose: "end",
  ending_father: "end",
  ending_four_clans: "end",
  ending_hero: "end",
  ending_unchanged: "end",

  loc_sky_yun: "sky_yun",
  loc_sky_feng: "sky_feng",
  loc_sky_shi: "sky_shi",
  loc_sky_yu: "sky_yu",
  loc_sky_trial: "sky_trial",
  loc_emp_fu: "emp_fu",
  loc_emp_wu: "emp_wu",
  loc_emp_lao: "emp_lao",
  loc_emp_hei: "emp_hei",
  loc_emp_steam: "emp_steam",
  loc_under_hui: "under_hui",
  loc_under_kuang: "under_kuang",
  loc_under_tong: "under_tong",
  loc_under_jiu: "under_jiu",
  loc_under_di: "under_di",
  loc_under_shen: "under_shen",
  loc_under_hu: "under_hu",
  loc_forest_de: "forest_de",
  loc_forest_chen: "forest_chen",
  loc_forest_gen: "forest_gen",
  loc_forest_sheng: "forest_sheng",
  loc_forest_dong: "forest_dong",
  loc_forest_zhao: "forest_zhao",
  loc_ruins: "ruins"
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
  storyBg.style.backgroundImage = `url("${bg}")`;
  currentBackground = bg;
}

let istyping = false;
let timer = null;
let currentElement = null;
let currentText = "";
let cannext = true;
let mapClickable = false;

mapMini.style.display = "block";

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

/* Sky 路线额外状态 */
const currentUser = getCurrentUser();
const skyFlagKey = "feather_erosion_sky_flags_" + (currentUser || "guest");
const flagStorage = currentUser ? localStorage : sessionStorage;

function loadSkyFlags()
{
  const raw = flagStorage.getItem(skyFlagKey);
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

function saveSkyFlags()
{
  flagStorage.setItem(skyFlagKey, JSON.stringify(skyFlags));
}

function resetSkyFlags()
{
  flagStorage.removeItem(skyFlagKey);
}

let skyFlags = loadSkyFlags();

/*永久成就系统*/
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

function unlockAchievement(name)
{
  if (!name) return false;
  const achievements = loadAchievements();
  if (achievements[name]) return false;
  achievements[name] =
  {
    name:name,
    story:"sky",
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

/* 背包物品 */
const ITEM_DATA =
{
  basicPotion:
  {
    name: "基础治疗药剂",
    desc: "消耗品：回复 10 点生命值。",
    image: "../images/zhiliaoyaoji.png"
  },

  mechanicalWingBlueprint:
  {
    name: "机械义翼设计图",
    desc: "艾德蒙留下的机械义翼设计图，是制作机械羽翼的关键。",
    image: "../images/skythings/shejitu.jpg"
  },
  sacrificeRecord:
  {
    name: "献祭记录·完整版",
    desc: "记载第七十三次与第七十四次献祭真相的完整记录。",
    image: "../images/skythings/xianjijilu.jpg"
  },
  edmundLetter:
  {
    name: "艾德蒙的信",
    desc: "艾德蒙二十年前写给赛琳的一封信。",
    image: "../images/skythings/letter.jpg"
  },
  reverseCircuit:
  {
    name: "反向回路设计图",
    desc: "可以在天空之城坠落前释放风脉能量、降低伤亡的设计图。",
    image: "../images/skythings/fanxianghuilu.jpg"
  },
  bloodFeather:
  {
    name: "染血的羽毛",
    desc: "艾德蒙死后留下的羽毛，上面残留着他的血迹和最后的信息。",
    image: "../images/skythings/feather.jpg"
  },
  fatherTalisman:
  {
    name: "父亲的护符",
    desc: "艾德蒙留下的护符。剧本设定中可在关键时刻保护持有者。",
    image: "../images/hufu.png"
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
  mechDesign:    { name: "机械义翼设计图", desc: "天空之城机械羽翼的制造图纸。", image: "" },
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
  wildMoss:      { name: "野生苔藓",     desc: "从古树根系采集的野生苔藓。", image: "" }
};

function memoryFragments()
{
  return skyFlags.memoryFragments ?? 15;
}

function initInventory()
{
  if (!skyFlags.inventory)
  {
    skyFlags.inventory = {};
    saveSkyFlags();
  }
}

function addItem(id, count = 1)
{
  initInventory();
  if (!skyFlags.inventory[id]) skyFlags.inventory[id] = 0;
  skyFlags.inventory[id] += count;
  saveSkyFlags();
  renderInventory();
}

function removeItem(id, count = 1)
{
  initInventory();
  if (!skyFlags.inventory[id]) return;
  skyFlags.inventory[id] -= count;
  if (skyFlags.inventory[id] <= 0) delete skyFlags.inventory[id];
  saveSkyFlags();
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

  const inventory = skyFlags.inventory;
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

/* 状态栏 */
const STATUS_INFO =
{
  "通缉": "你强闯天空之城入口，行动受到限制；赛琳认为你做事不计后果，好感上限锁定为 60；下层羽人会更容易信任你。",
  "长老会的关注": "你公开了自己是艾德蒙之子的身份，你的行踪与选择已经进入长老会视线。",
  "赛琳的协助": "赛琳愿意协助你制作机械羽翼，制作所需材料减少。",
  "赛琳的位置": "你已经确认赛琳被长老会带到了风脉之心底层，并可能被当作最后的献祭燃料。",
  "父亲的同行": "你选择与艾德蒙合作，他将与你一起进入终局；这一选择使其他同伴对你的好感大幅下降。",
  "下层羽人的信任": "下层羽人更加愿意相信你，并可能在后续行动中提供帮助。"
};

function initStatus()
{
  if (!skyFlags.statuses)
  {
    skyFlags.statuses = [];
    saveSkyFlags();
  }
}

function addStatus(name)
{
  initStatus();
  if (!skyFlags.statuses.includes(name))
  {
    skyFlags.statuses.push(name);
    saveSkyFlags();
  }
  renderStatus();
}

function removeStatus(name)
{
  initStatus();
  skyFlags.statuses = skyFlags.statuses.filter(function (status)
  {
    return status !== name;
  });
  saveSkyFlags();
  renderStatus();
}

function renderStatus()
{
  const statusList = document.getElementById("status-list");
  if (!statusList) return;

  initStatus();
  statusList.innerHTML = "";

  skyFlags.statuses.forEach(function (status)
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

/* -------------------- 情报 -------------------- */
const INTEL_INFO =
{
  "长老会的秘密": "长老会内部并非铁板一块，不同长老与派系之间存在明显的立场分歧和权力斗争。",
  "艾德蒙与艾琳的友谊": "二十年前，艾德蒙与艾琳关系密切，二人曾共同研究风脉之心；艾德蒙也是艾琳信任的人之一。",
  "献祭的传闻": "风脉之心需要定期“补充能量”，圣女血脉可能被长老会作为献祭对象培养；赛琳怀疑母亲的死亡与此有关。",
  "黑色纹路对你有天然规避": "风脉之心裂纹中的黑色污染在接触你时会主动退缩，你体内的某种力量似乎能天然压制或排斥它。",
  "反向回路": "艾德蒙留下过反向回路设计，可以在天空之城坠落前释放风脉之心的能量，从而减缓坠落并降低伤亡。",
  "献祭的替代方案": "锁神装置可以救下赛琳，但需要另一个人代替她成为封印的锚点。",
  "锁神装置的弱点": "锁神装置并非不可摧毁；一旦破坏，囚禁其中的索尔温会被释放，并可能对四族造成毁灭性后果。"
};

function initIntel()
{
  if (!skyFlags.intels)
  {
    skyFlags.intels = [];
    saveSkyFlags();
  }
}

function addIntel(name)
{
  initIntel();
  if (!skyFlags.intels.includes(name))
  {
    skyFlags.intels.push(name);
    saveSkyFlags();
  }
  renderIntel();
}

function removeIntel(name)
{
  initIntel();
  skyFlags.intels = skyFlags.intels.filter(function (intel)
  {
    return intel !== name;
  });
  saveSkyFlags();
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

  skyFlags.intels.forEach(function (intel)
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

const navigationEntry = performance.getEntriesByType("navigation")[0];
const navigationType = navigationEntry ? navigationEntry.type : "navigate";

const hasPendingGame =
  sessionStorage.getItem("sky_pending_battle") !== null ||
  sessionStorage.getItem("sky_pending_infiltration") !== null ||
  sessionStorage.getItem("sky_pending_check") !== null;

const returningFromGame =
  iswin3 !== null ||
  battleResultParam !== null ||
  game4Result !== null ||
  checkResultParam !== null ||
  resultParam !== null ||
  minigameResultParam !== null ||
  iswin2 !== null ||
  hasPendingGame ||
  document.referrer.includes("game3.html") ||
  document.referrer.includes("game4.html") ||
  document.referrer.includes("game1.html") ||
  document.referrer.includes("game2.html") ||
  document.referrer.includes("game5.html") ||
  document.referrer.includes("game8.html");

if (mode !== "continue" && navigationType === "navigate" && !from && !returningFromGame)
{
  resetSkyFlags();
  skyFlags = {};
}

let haogandu = 5;

let freedomDay = Number(skyFlags.freedomDay ?? 1);
if (!params.has("time")) time = Number(skyFlags.freedomTime ?? time ?? 0);
const MAX_HP = 100;
function currentHP() { return skyFlags.hp ?? MAX_HP; }
function updateHP()
{
  const hp = currentHP();
  const fill = document.getElementById("hp-fill");
  const value = document.getElementById("hp-value");
  if (fill) fill.style.width = (hp / MAX_HP * 100) + "%";
  if (value) value.textContent = hp + "/" + MAX_HP;
}

function clampAffection()
{
  /*
  if (typeof skyFlags.affectionMin === "number") haogandu = Math.max(haogandu, skyFlags.affectionMin);
  if (typeof skyFlags.affectionMax === "number") haogandu = Math.min(haogandu, skyFlags.affectionMax);
  */
  return;
}

function applyAffection(delta)
{
  haogandu += Number(delta);
  clampAffection();
  updateAffection();
}

function setAffection(value)
{
  haogandu = Number(value);
  clampAffection();
  updateAffection();
}

function updateAffection()
{
  affectionValue.textContent = haogandu;
  affectionTip.textContent = "赛琳好感度：" + haogandu;
}

/*其他三位主要 NPC 好感度，持久化保存在 skyFlags.otherAffection*/
const OTHER_AFFECTION_UI =
{
  empire: { name: "奥德里克", suffix: "empire" },
  forest: { name: "艾拉瑞亚", suffix: "forest" },
  under: { name: "格里姆", suffix: "underground" }
};

let otherHaogandu =
{
  empire: 0,
  forest: 0,
  under: 0
};

function loadOtherAffection()
{
  const stored = skyFlags.otherAffection;
  if (!stored || typeof stored !== "object") return;
  Object.keys(OTHER_AFFECTION_UI).forEach(function (faction)
  {
    if (typeof stored[faction] === "number") otherHaogandu[faction] = stored[faction];
  });
}

function persistOtherAffection()
{
  skyFlags.otherAffection =
  {
    empire: otherHaogandu.empire,
    forest: otherHaogandu.forest,
    under: otherHaogandu.under
  };
  saveSkyFlags();
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

/*剧情数据*/
const RAW_NODES =
{

  firstfreedom:
  [
    {
      type:"narrator",
      text:"【自由行动日 1】\n点击左上角小地图开启自由探索。"
    }
  ],

  freedom2:
  [
    {
      type:"narrator",
      text:"【自由行动日 2】\n点击左上角小地图开启自由探索。"
    }
  ],

  freedom3:
  [
    {
      type:"narrator",
      text:"【自由行动日 3】\n点击左上角小地图开启自由探索。"
    }
  ],

  loc_leave:
  [
    {type:"freedomReturn"}
  ],

  /* ============ 天空之城 ============ */
  loc_sky_yun:
  [
    {type:"narrator",text:"集市悬浮在云层中，风晶石摊位随气流漂移。你在人群中穿行，顺便打探各阵营的消息。"},
    {type:"choice",options:
    [
      {label:"购买风晶石（3 记忆碎片）",cost:{memoryFragments:3},give:{windCrystal:1},next:"yun_after"},
      {label:"寻找记忆羽毛（追风者）",next:"yun_feather"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  yun_after:
  [
    {type:"chance",prob:0.3,pass:"yun_bonus",fail:"yun_none"}
  ],
  yun_bonus:
  [
    {type:"narrator",text:"摊主额外塞给你一块风暴护盾，说是老主顾的赠品。"},
    {type:"effect",addItems:{stormShield:1}},
    {type:"jump",goto:"loc_sky_yun"}
  ],
  yun_none:
  [
    {type:"narrator",text:"你收好风晶碎片。"},
    {type:"jump",goto:"loc_sky_yun"}
  ],
  yun_feather:
  [
    {type:"skillcheck",id:"feather",success:"yun_feather_ok",fail:"yun_feather_fail",url:"game2.html?mode=sky"}
  ],
  yun_feather_ok:
  [
    {type:"narrator",text:"你抓住了足够多的记忆羽毛。"},
    {type:"effect",affection:3},
    {type:"jump",goto:"loc_sky_yun"}
  ],
  yun_feather_fail:
  [
    {type:"narrator",text:"羽毛被风吹散了，你两手空空。"},
    {type:"jump",goto:"loc_sky_yun"}
  ],

  loc_sky_feng:
  [
    {type:"narrator",text:"风从回廊深处涌来，吹得檐角的金属片叮当作响。几个底层羽人靠在墙边，打量着你的翅膀——或者说，你没有翅膀。"},
    {type:"choice",options:
    [
      {label:"打造机械羽翼",next:"feng_craft"},
      {label:"与底层羽人聊天",next:"feng_chat"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  feng_craft:
  [
    {type:"hasitems",need:{windCrystal:3,mechDesign:1,runeFragment:2,rareOre:1},pass:"feng_craft_ok",fail:"feng_craft_lack"}
  ],
  feng_craft_lack:
  [
    {type:"narrator",text:"“还缺少材料呢……多去其他地方看看吧。”你翻遍行囊，还是凑不齐打造机械羽翼的材料。"},
    {type:"jump",goto:"loc_sky_feng"}
  ],
  feng_craft_ok:
  [
    {type:"narrator",text:"你把材料铺在石台上，一阵风自下而上托起散落的零件。机械羽翼在你背后缓缓展开。"},
    {type:"effect",removeItems:{windCrystal:3,mechDesign:1,runeFragment:2,rareOre:1},addItems:{mechWing:1},affection:5},
    {type:"jump",goto:"loc_sky_feng"}
  ],
  feng_chat:
  [
    {type:"flagauto",flag:"fengChatDone",routes:{true:"feng_chat_again"},default:"feng_chat_first"}
  ],
  feng_chat_first:
  [
    {type:"char",role:"npc",speaker:"底层羽人",text:"啧，这里的都是翅膀有缺陷的人，不要客气，我们一视同仁！你的翅膀是……"},
    {type:"narrator",text:"“天生的。”你答道。"},
    {type:"char",role:"npc",speaker:"底层羽人",text:"那还是你比较惨一点，至少我们还能感受风流经的痕迹。"},
    {type:"effect",addIntels:["剪翼者与无翼者"],affection:2,flags:{fengChatDone:true}},
    {type:"choice",options:
    [
      {label:"问“上面的人为什么这么怕我们”",next:"feng_chat_ask"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  feng_chat_ask:
  [
    {type:"char",role:"npc",speaker:"底层羽人",text:"谁知道呢？他们本来就是胆小鬼，一边鄙视我们，一边又害怕我们。"},
    {type:"effect",addIntels:["底层人与上层人"],affection:3},
    {type:"freedomReturn"}
  ],
  feng_chat_again:
  [
    {type:"narrator",text:"你与底层羽人聊了会儿天，十分愉快。"},
    {type:"effect",affection:3},
    {type:"freedomReturn"}
  ],

  loc_sky_yu:
  [
    {type:"dailyauto",flag:"yuClean",notDone:"yu_clean",done:"yu_done"}
  ],
  yu_clean:
  [
    {type:"narrator",text:"你找到赛琳母亲的墓碑，蹲下来擦去上面的黑斑。碑文慢慢显现："},
    {type:"narrator",text:"“她飞得不够高，所以她看见的最多。”"},
    {type:"effect",affection:5,dailyFlag:"yuClean"},
    {type:"freedomReturn"}
  ],
  yu_done:
  [
    {type:"narrator",text:"这里就是埋葬过往羽人的地方啊……有点阴森森的，还是赶快离开吧。"},
    {type:"freedomReturn"}
  ],

  loc_sky_trial:
  [
    {type:"narrator",text:"审判穹顶高悬在城池中央，长老们的声音从里面传出来，像风穿过空心的金属。"},
    {type:"choice",options:
    [
      {label:"潜入档案室",next:"trial_infiltrate"},
      {label:"旁听一场公开审判",next:"trial_watch"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  trial_infiltrate:
  [
    {type:"infiltration",id:"sky_archive",success:"trial_infil_ok",fail:"trial_infil_fail",url:"game4.html?mode=sky"}
  ],
  trial_infil_ok:
  [
    {type:"narrator",text:"你从档案室里带出了几片散落的符文碎片。"},
    {type:"effect",addItems:{runeFragment:1},memoryDelta:2},
    {type:"freedomReturn"}
  ],
  trial_infil_fail:
  [
    {type:"narrator",text:"你被守卫发现了，只能狼狈退出。"},
    {type:"effect",affection:-5},
    {type:"freedomReturn"}
  ],
  trial_watch:
  [
    {type:"narrator",text:"被审的是那个说“献祭是杀人”的摊主。大长老反问：“风脉之心停了，我们怎么办？”全场无人应声，只有最前排几个底层羽人把兜帽往下压了压。"},
    {type:"effect",addIntels:["底层羽人的沉默"],affection:4,otherAffection:{empire:2}},
    {type:"freedomReturn"}
  ],

  loc_sky_shi:
  [
    {type:"narrator",text:"拭翼之塔高耸入云，塔顶的风大得几乎站不稳。"},
    {type:"choice",options:
    [
      {label:"到塔顶取图纸",next:"shi_design"},
      {label:"尝试打开塔顶暗格",next:"shi_drawer"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  shi_design:
  [
    {type:"flagauto",flag:"mechDesignGot",routes:{true:"shi_design_gone"},default:"shi_design_take"}
  ],
  shi_design_gone:
  [
    {type:"narrator",text:"图纸已经被取走了，这里什么也没有，看看就离开吧。"},
    {type:"freedomReturn"}
  ],
  shi_design_take:
  [
    {type:"narrator",text:"你在塔顶找到了【机械义翼设计图】。"},
    {type:"effect",addItems:{mechDesign:1},flags:{mechDesignGot:true}},
    {type:"freedomReturn"}
  ],
  shi_drawer:
  [
    {type:"narrator",text:"你尝试了很久也没能打开，你想，或许会有时机知道里面是什么的。"},
    {type:"freedomReturn"}
  ],

  /* ============ 帝国城邦 ============ */
  loc_emp_fu:
  [
    {type:"narrator",text:"符文工坊里蒸汽弥漫，奥德里克正伏在工作台前，指间的符文忽明忽暗。"},
    {type:"choice",options:
    [
      {label:"和奥德里克一起调试符文装备",next:"fu_tune"},
      {label:"找他改造装备",next:"fu_craft"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  fu_tune:
  [
    {type:"skillcheck",id:"rune_tune",success:"fu_tune_ok",fail:"fu_tune_partial",url:"game5.html?mode=sky&task=rune"}
  ],
  fu_tune_ok:
  [
    {type:"narrator",text:"你稳稳地校准了每一道符文。奥德里克点了点头。"},
    {type:"effect",addItems:{runeFragment:2},otherAffection:{empire:5}},
    {type:"freedomReturn"}
  ],
  fu_tune_partial:
  [
    {type:"narrator",text:"你校准得磕磕绊绊，但好歹没有全错。"},
    {type:"effect",addItems:{runeFragment:1},otherAffection:{empire:2}},
    {type:"freedomReturn"}
  ],
  fu_craft:
  [
    {type:"choice",options:
    [
      {label:"符文护盾（2 符文碎片 + 1 稀有矿石）",cost:{runeFragment:2,rareOre:1},give:{runeShield:1},next:"fu_craft_done"},
      {label:"污染净化器（3 稀有矿石 + 5 记忆碎片）",cost:{rareOre:3,memoryFragments:5},give:{purifier:1},next:"fu_craft_done"},
      {label:"破符水（1 稀有矿石 + 不完美的破符水）",cost:{rareOre:1,imperfectRune:1},give:{brokenRune:1},next:"fu_craft_done"},
      {label:"返回",next:"loc_emp_fu"}
    ]}
  ],
  fu_craft_done:
  [
    {type:"narrator",text:"奥德里克敲了敲成品，头也不抬地说了句：“拿好了。”"},
    {type:"jump",goto:"fu_craft"}
  ],

  loc_emp_lao:
  [
    {type:"narrator",text:"老兵墓地的风很冷。守墓老兵坐在一块空碑旁，手里攥着一只旧酒壶。"},
    {type:"choice",options:
    [
      {label:"与守墓老兵对饮（2 记忆碎片）",cost:{memoryFragments:2},give:{liquor:1},next:"lao_drink"},
      {label:"向守墓人确认失踪者的名字",next:"lao_confirm"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  lao_drink:
  [
    {type:"chance",prob:0.33,pass:"lao_intel1",fail:"lao_drink2"}
  ],
  lao_drink2:
  [
    {type:"chance",prob:0.5,pass:"lao_intel2",fail:"lao_intel3"}
  ],
  lao_intel1:
  [
    {type:"narrator",text:"老兵喝了几口，指着墓碑背面说：“看看这个。”"},
    {type:"effect",addIntels:["军派的募兵牌"]},
    {type:"freedomReturn"}
  ],
  lao_intel2:
  [
    {type:"narrator",text:"老兵望着空碑，讲起了二十年前的那支队伍。"},
    {type:"effect",addIntels:["四十个人"]},
    {type:"freedomReturn"}
  ],
  lao_intel3:
  [
    {type:"narrator",text:"老兵压低声音，说起了军费的来路。"},
    {type:"effect",addIntels:["军费的来源"]},
    {type:"freedomReturn"}
  ],
  lao_confirm:
  [
    {type:"otherauto",faction:"empire",min:30,pass:"lao_confirm_flag",fail:"lao_confirm_deny"}
  ],
  lao_confirm_flag:
  [
    {type:"flagauto",flag:"laoConfirmDone",routes:{true:"lao_confirm_deny"},default:"lao_confirm_do"}
  ],
  lao_confirm_do:
  [
    {type:"char",role:"npc",speaker:"守墓人",text:"他不在这儿，他每周都来，站在那块空碑前面，站一会儿就走。二十年了。"},
    {type:"effect",addIntels:["第四十座碑"],otherAffection:{empire:12},flags:{laoConfirmDone:true}},
    {type:"freedomReturn"}
  ],
  lao_confirm_deny:
  [
    {type:"char",role:"npc",speaker:"守墓人",text:"的确有个人每周都来……但你问这个干什么？快走吧。"},
    {type:"freedomReturn"}
  ],

  loc_emp_hei:
  [
    {type:"narrator",text:"黑市巷道里挤满了压低声音叫卖的摊贩。这里的东西，钱买不到，只能用记忆碎片换。"},
    {type:"choice",options:
    [
      {label:"基础治疗药剂（4 记忆碎片）",cost:{memoryFragments:4},give:{basicPotion:1},next:"loc_emp_hei"},
      {label:"符文治疗包（8 记忆碎片）",cost:{memoryFragments:8},give:{runePack:1},next:"loc_emp_hei"},
      {label:"稀有矿石（6 记忆碎片）",cost:{memoryFragments:6},give:{rareOre:1},next:"loc_emp_hei"},
      {label:"符文碎片（5 记忆碎片）",cost:{memoryFragments:5},give:{runeFragment:1},next:"loc_emp_hei"},
      {label:"烈酒（3 记忆碎片）",cost:{memoryFragments:3},give:{liquor:1},next:"loc_emp_hei"},
      {label:"破符水（12 记忆碎片）",cost:{memoryFragments:12},give:{brokenRune:1},next:"loc_emp_hei"},
      {label:"解码符文（7 记忆碎片）",cost:{memoryFragments:7},give:{decoderRune:1},next:"loc_emp_hei"},
      {label:"旧羽管（2 记忆碎片）",cost:{memoryFragments:2},give:{oldFeather:1},next:"loc_emp_hei"},
      {label:"假情报（3 记忆碎片）",cost:{memoryFragments:3},give:{fakeIntel:1},next:"loc_emp_hei"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],

  loc_emp_wu:
  [
    {type:"narrator",text:"污染隔离区外围拉着锈蚀的铁丝网，里面传来晶骸刮擦地面的声音。"},
    {type:"choice",options:
    [
      {label:"清剿晶骸",next:"wu_battle"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  wu_battle:
  [
    {type:"battle",id:"isolation",success:"wu_win",fail:"wu_lose",url:"game3.html?mode=sky"}
  ],
  wu_win:
  [
    {type:"narrator",text:"晶骸碎成一地。你从残骸里捡出一些还能用的结晶。"},
    {type:"effect",addItems:{crystalFragment:2,lowPurityCrystal:1},memoryDelta:3,otherAffection:{empire:3}},
    {type:"freedomReturn"}
  ],
  wu_lose:
  [
    {type:"narrator",text:"你被晶骸击退了，身上添了几道伤。"},
    {type:"effect",hpDelta:-15},
    {type:"freedomReturn"}
  ],

  loc_emp_steam:
  [
    {type:"narrator",text:"蒸汽议会厅里，议员们的争辩声被铜管放大，嗡嗡作响。"},
    {type:"choice",options:
    [
      {label:"旁听表决（议员说服）",next:"steam_vote"},
      {label:"在旁听席记录发言",next:"steam_record"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  steam_vote:
  [
    {type:"skillcheck",id:"council",success:"steam_vote_ok",fail:"steam_vote_fail",url:"game5.html?mode=sky&task=council"}
  ],
  steam_vote_ok:
  [
    {type:"narrator",text:"反对票凑够了六十张，议案被否决了。议员们面面相觑。"},
    {type:"effect",otherAffection:{empire:5}},
    {type:"jump",goto:"loc_emp_steam"}
  ],
  steam_vote_fail:
  [
    {type:"narrator",text:"反对票不够，议案以多数通过了。"},
    {type:"freedomReturn"}
  ],
  steam_record:
  [
    {type:"narrator",text:"你听了一天，什么关键信息也没听见。"},
    {type:"effect",otherAffection:{empire:3}},
    {type:"freedomReturn"}
  ],

  /* ============ 地下古堡 ============ */
  loc_under_kuang:
  [
    {type:"narrator",text:"熔岩矿道里热浪翻涌，岩壁上的矿石泛着暗红的光。"},
    {type:"choice",options:
    [
      {label:"矿道采集（黄金矿工）",next:"kuang_mine"},
      {label:"进入废弃矿道",next:"kuang_abandon"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  kuang_mine:
  [
    {type:"skillcheck",id:"mine",success:"kuang_mine_ok",fail:"kuang_mine_fail",url:"game1.html?mode=sky"}
  ],
  kuang_mine_ok:
  [
    {type:"narrator",text:"你采满了一整筐晶石。"},
    {type:"effect",addItems:{pureCrystal:1},memoryDelta:3,otherAffection:{under:3}},
    {type:"freedomReturn"}
  ],
  kuang_mine_fail:
  [
    {type:"narrator",text:"晶石数量好像还不够，再采集一轮吧。"},
    {type:"freedomReturn"}
  ],
  kuang_abandon:
  [
    {type:"dayauto",routes:{3:"kuang_abandon_ok"},default:"kuang_abandon_locked"}
  ],
  kuang_abandon_locked:
  [
    {type:"narrator",text:"这里有一条废弃许久的矿道，看起来好危险，还是不要进去了吧。"},
    {type:"freedomReturn"}
  ],
  kuang_abandon_ok:
  [
    {type:"narrator",text:"你钻进废弃矿道，墙壁上全是旧矿灯的划痕——有人在这里独自待过很久。"},
    {type:"effect",addItems:{rareOre:2},addIntels:["独自下矿的人"],otherAffection:{under:8}},
    {type:"freedomReturn"}
  ],

  loc_under_di:
  [
    {type:"narrator",text:"地精集市里全是奇形怪状的摊位，一个老地精蹲在砧子后面，冲你咧嘴笑。"},
    {type:"choice",options:
    [
      {label:"购买：基础治疗药剂（4）",cost:{memoryFragments:4},give:{basicPotion:1},next:"loc_under_di"},
      {label:"购买：抗污药剂（6）",cost:{memoryFragments:6},give:{antiPotion:1},next:"loc_under_di"},
      {label:"购买：抗污护符（10）",cost:{memoryFragments:10},give:{antiAmulet:1},next:"loc_under_di"},
      {label:"购买：炼金炸弹（8）",cost:{memoryFragments:8},give:{alchemyBomb:1},next:"loc_under_di"},
      {label:"购买：稀有矿石（5，每日限1）",next:"di_ore"},
      {label:"购买：符文碎片（6）",cost:{memoryFragments:6},give:{runeFragment:1},next:"loc_under_di"},
      {label:"购买：破符水（11）",cost:{memoryFragments:11},give:{brokenRune:1},next:"loc_under_di"},
      {label:"购买：歪耳朵的地精布偶（3）",cost:{memoryFragments:3},give:{goblinDoll:1},next:"loc_under_di"},
      {label:"兑换：纯净污染结晶 → 8 记忆碎片",cost:{pureCrystal:1},next:"di_exchange1"},
      {label:"兑换：晶骸残片 ×2 → 污染净化器",cost:{crystalFragment:2},give:{purifier:1},next:"loc_under_di"},
      {label:"与老地精战斗",next:"di_haggle"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  di_ore:
  [
    {type:"dailyauto",flag:"diOre",notDone:"di_ore_buy",done:"di_ore_sold"}
  ],
  di_ore_buy:
  [
    {type:"choice",options:
    [
      {label:"支付 5 记忆碎片",cost:{memoryFragments:5},give:{rareOre:1},next:"di_ore_done"},
      {label:"再想想",next:"loc_under_di"}
    ]}
  ],
  di_ore_done:
  [
    {type:"effect",dailyFlag:"diOre"},
    {type:"jump",goto:"loc_under_di"}
  ],
  di_ore_sold:
  [
    {type:"narrator",text:"老地精摆摆手：“矿石今天卖光了，明天赶早。”"},
    {type:"jump",goto:"loc_under_di"}
  ],
  di_exchange1:
  [
    {type:"effect",memoryDelta:8},
    {type:"jump",goto:"loc_under_di"}
  ],
  di_haggle:
  [
    {type:"battle",id:"haggle",success:"di_haggle_ok",fail:"di_haggle_priceup",cancel:"di_haggle_cancel",url:"game3.html?mode=sky"}
  ],
  di_haggle_ok:
  [
    {type:"narrator",text:"你打赢了老地精。“你比大公派来的人有意思。”老地精大笑，本日全部商品都便宜了。"},
    {type:"effect",otherAffection:{under:3}},
    {type:"freedomReturn"}
  ],
  di_haggle_priceup:
  [
    {type:"narrator",text:"你输给了老地精。他得意地哼了一声，本日全部商品都涨价了。"},
    {type:"freedomReturn"}
  ],
  di_haggle_cancel:
  [
    {type:"narrator",text:"你打消了讲价的念头。老地精掉头就走，今天不再跟你交易。"},
    {type:"freedomReturn"}
  ],

  loc_under_jiu:
  [
    {type:"narrator",text:"熔岩酒吧里酒气熏天，矿工们围着桌子大声划拳。"},
    {type:"choice",options:
    [
      {label:"请矿工喝酒（3 记忆碎片）",cost:{memoryFragments:3},next:"jiu_drink"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  jiu_drink:
  [
    {type:"chance",prob:0.33,pass:"jiu_intel1",fail:"jiu_drink2"}
  ],
  jiu_drink2:
  [
    {type:"chance",prob:0.5,pass:"jiu_intel2",fail:"jiu_intel3"}
  ],
  jiu_intel1:
  [
    {type:"narrator",text:"喝高了的矿工压低声音，讲起了一条没人走的小路。"},
    {type:"effect",addIntels:["一条侧路"],otherAffection:{under:2}},
    {type:"freedomReturn"}
  ],
  jiu_intel2:
  [
    {type:"narrator",text:"矿工说起大公的晶化卫兵，语气里全是忌惮。"},
    {type:"effect",addIntels:["晶化卫兵不睡"],otherAffection:{under:2}},
    {type:"freedomReturn"}
  ],
  jiu_intel3:
  [
    {type:"narrator",text:"矿工盯着酒杯，说出了熔炉火种熄灭的真相。"},
    {type:"effect",addIntels:["火种是谁掐的"],otherAffection:{under:2}},
    {type:"freedomReturn"}
  ],

  loc_under_shen:
  [
    {type:"narrator",text:"深暗裂隙紧邻熔岩湖，一只晶骸盘踞在出口处，身上的结晶映着湖面的光。"},
    {type:"choice",options:
    [
      {label:"与晶骸战斗",next:"shen_battle"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  shen_battle:
  [
    {type:"battle",id:"rift",success:"shen_win",fail:"shen_lose",url:"game3.html?mode=sky"}
  ],
  shen_win:
  [
    {type:"narrator",text:"晶骸倒下，结晶碎了一地。你捡起最亮的那几块。"},
    {type:"effect",addItems:{crystalFragment:3,highPurityCrystal:1},memoryDelta:6,otherAffection:{under:5}},
    {type:"freedomReturn"}
  ],
  shen_lose:
  [
    {type:"narrator",text:"晶骸把你撞飞出去，你伤得不轻。"},
    {type:"effect",hpDelta:-25},
    {type:"freedomReturn"}
  ],

  loc_under_hui:
  [
    {type:"flagauto",flag:"huiPhase",routes:{log:"hui_phase_log",done:"hui_phase_done"},default:"hui_phase_first"}
  ],
  hui_phase_first:
  [
    {type:"narrator",text:"灰烬实验室外静得吓人，只有晶化卫兵的脚步声在廊道里回荡。"},
    {type:"choice",options:
    [
      {label:"潜入灰烬实验室",next:"hui_infiltrate"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  hui_phase_log:
  [
    {type:"narrator",text:"灰烬实验室里静悄悄的，你记得那份日志的位置。"},
    {type:"choice",options:
    [
      {label:"读实验日志",next:"hui_log_read"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  hui_phase_done:
  [
    {type:"narrator",text:"你已经把实验室摸透了，没有什么新东西了。"},
    {type:"freedomReturn"}
  ],
  hui_infiltrate:
  [
    {type:"infiltration",id:"lab",success:"hui_infil_ok",fail:"hui_infil_fail",url:"game4.html?mode=sky"}
  ],
  hui_infil_ok:
  [
    {type:"narrator",text:"你成功摸清了实验室的每一个角落。"},
    {type:"effect",otherAffection:{under:15},flags:{huiPhase:"log"}},
    {type:"freedomReturn"}
  ],
  hui_infil_fail:
  [
    {type:"narrator",text:"你被晶化卫兵赶了出来，格里姆似乎并不意外。"},
    {type:"effect",otherAffection:{under:8}},
    {type:"freedomReturn"}
  ],
  hui_log_read:
  [
    {type:"narrator",text:"你翻到实验日志：第七十一号→第七十二号→第七十三号（莉亚的编号，备注只有“保留”）→未编号的“下一阶段：活体提取。对象——无翼者。”"},
    {type:"effect",otherAffection:{under:10},flags:{huiPhase:"done"}},
    {type:"freedomReturn"}
  ],

  loc_under_tong:
  [
    {type:"narrator",text:"铜齿街区的匠铺里火星四溅，铜齿匠人抬头看了你一眼。"},
    {type:"choice",options:
    [
      {label:"向铜齿匠人赊账（1 纯净污染结晶 → 2 符文碎片）",cost:{pureCrystal:1},give:{runeFragment:2},next:"tong_debt"},
      {label:"打听大公的近况",next:"tong_intel"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  tong_debt:
  [
    {type:"char",role:"npc",speaker:"铜齿匠人",text:"赊账？可以。但你得答应我，别在下面闹出人命——大公收账的时候，连死人的账都算。"},
    {type:"freedomReturn"}
  ],
  tong_intel:
  [
    {type:"flagauto",flag:"tongIntelDone",routes:{true:"tong_intel_again"},default:"tong_intel_first"}
  ],
  tong_intel_first:
  [
    {type:"char",role:"npc",speaker:"铜齿匠人",text:"他往灰烬实验室那边调了两批卫兵，全是晶化过的。以前他不用那些东西看家。"},
    {type:"effect",addIntels:["大公最近的动静"],flags:{tongIntelDone:true},otherAffection:{under:3}},
    {type:"freedomReturn"}
  ],
  tong_intel_again:
  [
    {type:"narrator",text:"匠人忙着敲打手里的铜片，没空再搭理你。"},
    {type:"freedomReturn"}
  ],

  loc_under_hu:
  [
    {type:"narrator",text:"你沿着矿道的边缘往下走，脚下的岩石从暗红变成橙红，最后变成一种几乎发白的亮。热浪从下面翻上来，把你额前的头发吹得往后倒。熔岩湖就在你脚下——它没有波浪，只有一层缓慢流动的、覆盖了整个洞窟底部的光。光在动，但它不动。"},
    {type:"narrator",text:"你站在那里看了很久。然后你发现，岩壁上挂着一条铁链，一端没入熔岩里，另一端连着上面那道被锁住的裂隙。铁链已经被烧得发红，但它没有断。"},
    {type:"narrator",text:"你忽然想起那条链子上的符文，和你在契约书上见过的一模一样。原来大公锁住的不只是那道缝，他还把整片熔岩都算进了账里。"},
    {type:"narrator",text:"热浪又翻上来一次。你退后两步，转身往回走。走出很远之后你才意识到，那片湖从头到尾，一声都没有响过。"},
    {type:"freedomReturn"}
  ],

  /* ============ 精灵之森 ============ */
  loc_forest_de:
  [
    {type:"narrator",text:"德鲁伊环阵里的藤蔓缠绕成圈，空气里浮着细小的孢子。"},
    {type:"choice",options:
    [
      {label:"用结晶换苔藓种子（1 纯净污染结晶 + 3 记忆碎片）",cost:{pureCrystal:1,memoryFragments:3},give:{cleanMoss:1},next:"de_exchange"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  de_exchange:
  [
    {type:"narrator",text:"你交出了结晶，得到一小捧能净化污染的苔藓。"},
    {type:"freedomReturn"}
  ],

  loc_forest_sheng:
  [
    {type:"narrator",text:"古树圣殿的穹顶是交错的枝干，女王坐在藤蔓王座上，很久没有说话。"},
    {type:"choice",options:
    [
      {label:"面见女王",next:"sheng_queen"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  sheng_queen:
  [
    {type:"char",role:"npc",speaker:"女王",text:"你还活着。"},
    {type:"effect",otherAffection:{forest:2}},
    {type:"freedomReturn"}
  ],

  loc_forest_dong:
  [
    {type:"narrator",text:"回声洞穴把每一点声响都放大又回放，像有无数个自己在应答。"},
    {type:"choice",options:
    [
      {label:"学首歌（回声）",next:"dong_song"},
      {label:"和艾拉瑞亚一起来这里",next:"dong_elarria"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  dong_song:
  [
    {type:"skillcheck",id:"echo",success:"dong_song_ok",fail:"dong_song_partial",url:"game8.html?mode=sky"}
  ],
  dong_song_ok:
  [
    {type:"narrator",text:"你完整地复现了那三段旋律，学会了回声的歌。"},
    {type:"effect",addStatuses:["回声的歌"],otherAffection:{forest:10}},
    {type:"freedomReturn"}
  ],
  dong_song_partial:
  [
    {type:"narrator",text:"你只记下了部分旋律。"},
    {type:"effect",otherAffection:{forest:5}},
    {type:"freedomReturn"}
  ],
  dong_elarria:
  [
    {type:"otherauto",faction:"forest",min:40,pass:"dong_elarria_flag",fail:"dong_elarria_deny"}
  ],
  dong_elarria_flag:
  [
    {type:"flagauto",flag:"dongElarriaDone",routes:{true:"dong_elarria_deny"},default:"dong_elarria_do"}
  ],
  dong_elarria_do:
  [
    {type:"char",role:"npc",speaker:"艾拉瑞亚",text:"原来我的名字听起来是这样的。"},
    {type:"effect",otherAffection:{forest:15},addStatuses:["她听过自己的名字"],flags:{dongElarriaDone:true}},
    {type:"freedomReturn"}
  ],
  dong_elarria_deny:
  [
    {type:"narrator",text:"艾拉瑞亚奇怪地看着你，不明白你为什么要再去那个地方。"},
    {type:"freedomReturn"}
  ],

  loc_forest_gen:
  [
    {type:"narrator",text:"古树的根系从地下隆起，像一条条交错的巨蟒。"},
    {type:"choice",options:
    [
      {label:"采集苔藓",next:"gen_moss"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  gen_moss:
  [
    {type:"skillcheck",id:"gen_moss",url:"game7.html?mode=sky&task=moss",success:"gen_moss_win",fail:"gen_moss_fail"}
  ],
  gen_moss_win:
  [
    {type:"narrator",text:"你采到了三处苔藓。"},
    {type:"effect",addItems:{wildMoss:3},otherAffection:{forest:2}},
    {type:"freedomReturn"}
  ],
  gen_moss_fail:
  [
    {type:"narrator",text:"你没能采到足够的苔藓，只能先退回来。"},
    {type:"freedomReturn"}
  ],

  loc_forest_zhao:
  [
    {type:"narrator",text:"腐根沼泽里弥漫着腐烂的气味，一只晶化幼鹿在泥沼边徘徊。"},
    {type:"choice",options:
    [
      {label:"采集苔藓（完整版）",next:"zhao_moss"},
      {label:"攻击晶化幼鹿",next:"zhao_deer"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  zhao_moss:
  [
    {type:"skillcheck",id:"zhao_moss",url:"game7.html?mode=sky&task=moss",success:"zhao_moss_win",fail:"zhao_moss_fail"}
  ],
  zhao_moss_win:
  [
    {type:"narrator",text:"你小心翼翼地采到了四处苔藓。"},
    {type:"effect",addItems:{wildMoss:4}},
    {type:"freedomReturn"}
  ],
  zhao_moss_fail:
  [
    {type:"narrator",text:"你没能采到足够的苔藓，只能先退回来。"},
    {type:"freedomReturn"}
  ],
  zhao_deer:
  [
    {type:"battle",id:"deer",success:"zhao_deer_kill",fail:"zhao_deer_release",url:"game3.html?mode=sky"}
  ],
  zhao_deer_kill:
  [
    {type:"narrator",text:"你杀死了晶化幼鹿。艾拉瑞亚站在远处，什么也没说。"},
    {type:"effect",addItems:{crystalFragment:2,highPurityCrystal:1},otherAffection:{forest:-10}},
    {type:"freedomReturn"}
  ],
  zhao_deer_release:
  [
    {type:"narrator",text:"你放走了幼鹿。它踉跄着跑进林子里，艾拉瑞亚朝你点了点头。"},
    {type:"effect",otherAffection:{forest:15}},
    {type:"freedomReturn"}
  ],

  loc_forest_chen:
  [
    {type:"narrator",text:"晨叶镇的精灵们三三两两地聚在树屋里，见你来了都好奇地张望。"},
    {type:"choice",options:
    [
      {label:"购买精灵器物",next:"chen_shop"},
      {label:"和镇口的老精灵聊天",next:"chen_chat"},
      {label:"离开",next:"loc_leave"}
    ]}
  ],
  chen_shop:
  [
    {type:"choice",options:
    [
      {label:"半净化的苔藓（4）",cost:{memoryFragments:4},give:{halfMoss:1},next:"chen_shop"},
      {label:"净化苔藓（10）",cost:{memoryFragments:10},give:{cleanMoss:1},next:"chen_shop"},
      {label:"基础治疗药剂（4）",cost:{memoryFragments:4},give:{basicPotion:1},next:"chen_shop"},
      {label:"符文碎片（7）",cost:{memoryFragments:7},give:{runeFragment:1},next:"chen_shop"},
      {label:"野生苔藓（3）",cost:{memoryFragments:3},give:{wildMoss:1},next:"chen_shop"},
      {label:"返回",next:"loc_forest_chen"}
    ]}
  ],
  chen_chat:
  [
    {type:"flagauto",flag:"chenChatDone",routes:{true:"chen_chat_again"},default:"chen_chat_first"}
  ],
  chen_chat_first:
  [
    {type:"char",role:"npc",speaker:"老精灵",text:"女王的账本上，这片林子还剩两年半。她说三年，是怕我们跑。"},
    {type:"effect",addIntels:["镇上的人怎么说"],otherAffection:{forest:5},flags:{chenChatDone:true}},
    {type:"freedomReturn"}
  ],
  chen_chat_again:
  [
    {type:"narrator",text:"你与老精灵们相谈甚欢，他们告诉了你森林里很多有趣的事。"},
    {type:"effect",otherAffection:{forest:5}},
    {type:"freedomReturn"}
  ],

  /* ============ 废墟驿站 ============ */
  loc_ruins:
  [
    {type:"narrator",text:"废墟驿站静立在四座城池的中央。四位好友已经等在这里了——这大概就是终局峰会。"},
    {type:"choice",options:
    [
      {label:"查看奥德里克",next:"ruins_aldric"},
      {label:"查看赛琳",next:"ruins_celine"},
      {label:"查看艾拉瑞亚",next:"ruins_elarria"},
      {label:"查看格里姆",next:"ruins_grim"},
      {label:"离开驿站",next:"loc_leave"}
    ]}
  ],
  ruins_aldric:
  [
    {type:"otherauto",faction:"empire",min:31,pass:"ruins_aldric_talk",fail:"ruins_aldric_only"}
  ],
  ruins_aldric_talk:
  [
    {type:"char",role:"npc",speaker:"奥德里克",text:"你也来这里散心了？"},
    {type:"char",role:"npc",speaker:"奥德里克",text:"我们明天就要出发了，你准备好了没有？"},
    {type:"jump",goto:"loc_ruins"}
  ],
  ruins_aldric_only:
  [
    {type:"narrator",text:"奥德里克站在驿站边，只是朝你点了点头。"},
    {type:"jump",goto:"loc_ruins"}
  ],
  ruins_celine:
  [
    {type:"auto",options:
    [
      {min:31,max:9999,next:"ruins_celine_talk"},
      {min:-9999,max:30,next:"ruins_celine_only"}
    ]}
  ],
  ruins_celine_talk:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"你怎么也在这里？我是背着长老会偷偷溜出来的，我知道了很多事情，这一切……"},
    {type:"char",role:"npc",speaker:"赛琳",text:"不好，他们追过来了，我要回去了，你一定要找过来！"},
    {type:"jump",goto:"loc_ruins"}
  ],
  ruins_celine_only:
  [
    {type:"narrator",text:"赛琳站在远处，欲言又止。"},
    {type:"jump",goto:"loc_ruins"}
  ],
  ruins_elarria:
  [
    {type:"otherauto",faction:"forest",min:31,pass:"ruins_elarria_talk",fail:"ruins_elarria_only"}
  ],
  ruins_elarria_talk:
  [
    {type:"char",role:"npc",speaker:"艾拉瑞亚",text:"？你怎么在这。"},
    {type:"char",role:"npc",speaker:"艾拉瑞亚",text:"不，这不是我真身……有树有泥土的地方你都可以看见我。"},
    {type:"jump",goto:"loc_ruins"}
  ],
  ruins_elarria_only:
  [
    {type:"narrator",text:"艾拉瑞亚站在一丛野花旁，安静地没有出声。"},
    {type:"jump",goto:"loc_ruins"}
  ],
  ruins_grim:
  [
    {type:"otherauto",faction:"under",min:31,pass:"ruins_grim_talk",fail:"ruins_grim_only"}
  ],
  ruins_grim_talk:
  [
    {type:"char",role:"npc",speaker:"格里姆",text:"你带着莉亚逃出去了？"},
    {type:"char",role:"npc",speaker:"格里姆",text:"太好了……但好像这个通讯维持不了多久，我这边也没事的。"},
    {type:"jump",goto:"loc_ruins"}
  ],
  ruins_grim_only:
  [
    {type:"narrator",text:"格里姆的信号不太稳定，只能勉强看见他的身影。"},
    {type:"jump",goto:"loc_ruins"}
  ],

  yun1:
  [
    {type:"narrator",text:"你购买了风晶石"},
    {type:"jump",goto:"mainmap"}
  ],

  yun2:
  [
    {type:"narrator",text:"你在云脉集市附近寻找了一阵，发现了一枚散发着微弱光芒的记忆羽毛。"},
    {type:"jump",goto:"mainmap"}
  ],

  yun3:
  [
    {type:"narrator",text:"你在边缘平台独坐"},
    {type:"jump",goto:"mainmap"}
  ],

  yun4:
  [
    {type:"narrator",text:"你打听了长老会的消息"},
    {type:"jump",goto:"mainmap"}
  ],

  mainmap:
  [
    {type:"minigame",label:"0"}
  ],

  start:
  [
    {type:"narrator",text:"商人递给你一个包裹：“天空之城不会欢迎你。但你本来就属于那里——哪怕他们不承认。”"},
    {type:"narrator",text:"获得初始物品：破旧的行囊、商人的地图、记忆碎片、基础治疗药剂×2。\n获得情报【长老会的秘密】。塞琳初始好感 +5。"},
    {
      type:"effect",
      addItems:{basicPotion:2},
      addIntels:["长老会的秘密"]
    },
    {type:"title",chapter:"第一章",subtitle:"选择之地"},
    {type:"narrator",text:"你回到了天空之城，但你知道这个地方对于羽翼残缺和无翼者的恶意极大，若你要被接纳，当务之急便是给自己寻觅一对翅膀。"},
    {type:"narrator",text:"而恰好，你知道在拭翼之塔的顶部实验室里，有一份机械图纸。若你能拿到它，也许就能让自己重新拥有飞翔的资格。"},
    {type:"title",chapter:"第一幕",subtitle:"重返之门"},
    {type:"narrator",text:"天空之城的底部入口，两座白晶高塔拔地而起，在云雾中若隐若现。塔身布满细密的蓝白色纹路——那是风脉流经的痕迹。"},
    {type:"narrator",text:"塔与塔之间是一道光门，水波一样荡漾着半透明的屏障。"},
    {type:"narrator",text:"门前站着两名羽人守卫，穿着银白色的轻甲，背后的双翼轻轻收拢。"},
    {type:"narrator",text:"但与之相对的，是你站在石阶下，背后的风穿过你空荡荡的后背。"},
    {type:"char",role:"npc",speaker:"守卫",text:"站住。",charImg:Guard},
    {type:"char",role:"npc",speaker:"守卫",text:"无翼者？被天空流放之人不得返回，你无权再次踏入天空之城。",charImg:Guard},
    {
      type:"choice",
      options:
      [
        {label:"出示【商人的信物】",next:"chapter1_a1"},
        {label:"硬闯",next:"chapter1_a2"},
        {label:"说出自己的真实身份：“我是艾德蒙长老之子。”",next:"chapter1_a3"}
      ]
    }
  ],

  chapter1_a1:
  [
    {type:"narrator",text:"你从怀里摸出那卷伪造的文书，羊皮纸的边缘微微蜷曲，墨迹不新不旧，盖着某个你看不懂的印章。"},
    {type:"char",role:"npc",speaker:"守卫1",text:"这......看着挺真的。但我不记得长老会签过这样的。",charImg:Guard},
    {type:"char",role:"npc",speaker:"守卫2",text:"......这好像是第二长老那一派的，我们若是拦了他，怕是会有麻烦。",charImg:Guard},
    {type:"narrator",text:"守卫让开半步，光门在你面前微微波动。"},
    {type:"char",role:"npc",speaker:"守卫1",text:"进去吧。但别在里面惹事，要记住，这座城里没有你的容身之所。",charImg:Guard},
    {type:"narrator",text:"你没有说话，只是穿过了光门。"},
    {type:"jump",goto:"chapter1_city"}
  ],

  chapter1_a2:
  [
    {type:"narrator",text:"你没有停下脚步。下一瞬间，两名守卫同时拔出武器，战斗一触即发。"},
    {type:"minigame",label:"3"}
  ],

  chapter1_a2_success:
  [
    {type:"narrator",text:"战斗结束。两名守卫倒在地上，你跨过他们走进光门。"},
    {type:"char",role:"npc",speaker:"守卫",text:"你......会后悔的，长老们不会放过你。",charImg:Guard},
    {type:"narrator",text:"获得【通缉】。\n在天空之城行动受限。"},
    {type:"effect",affection:-10,flags:{wanted:true,affectionMax:60,lowerWingTrustBonus:true},addStatuses:["通缉"]},
    {type:"narrator",text:"赛琳对你的第一印象变差了。她认为你做事不计后果。"},
    {type:"jump",goto:"chapter1_city"}
  ],

  chapter1_a2_fail:
  [
    {type:"narrator",text:"你被守卫制服，远离了天空之城。"},
    {type:"narrator",text:"几日后，羽蚀降临。你只能眼睁睁地看着世界毁灭，就连拥有抗体的你也被一步步地腐蚀。"},
    {type:"narrator",text:"【结局：未变之局】\n成就解锁：【未变之局·天空之城】"},
    {type:"choice",options:[{label:"返回游戏主菜单",next:"end"}]}
  ],

  chapter1_a3:
  [
    {type:"char",role:"npc",speaker:"守卫1",text:"......艾德蒙？那个被逐出长老会的艾德蒙？",charImg:Guard},
    {type:"narrator",text:"他们抬头看了看你，似乎在打量着什么。"},
    {type:"char",role:"npc",speaker:"守卫2",text:"艾德蒙长老好像确实有个“无翼者”孩子，不过他本人都自身难保，也不会有其他羽人胆大包天的上赶着认领这个身份。",charImg:Guard},
    {type:"char",role:"npc",speaker:"守卫1",text:"......算了，进去吧，艾德蒙曾经为我们说过话，我不欠他什么。但如果你识相，就老实呆着别让人注意到你。",charImg:Guard},
    {type:"char",role:"npc",speaker:"守卫2",text:"长老会那边......",charImg:Guard},
    {type:"char",role:"npc",speaker:"守卫1",text:"肯定要上报，但至于怎么关注，就是那些管理者的事了。",charImg:Guard},
    {type:"narrator",text:"获得【长老会的关注】。"},
    {type:"effect",flags:{councilAttention:true},addStatuses:["长老会的关注"]},
    {type:"jump",goto:"chapter1_city"}
  ],

  chapter1_city:
  [
    {type:"title",chapter:"第二幕",subtitle:"天空之城的街道"},
    {type:"narrator",text:"你穿过光门，踏上天空之城的街道。"},
    {type:"narrator",text:"视线突然变得开阔，风声从四面八方呼啸而来，脚下的白晶石街道光滑如镜，倒映出你震惊的身影。"},
    {type:"narrator",text:"两侧的建筑同样由白晶石构成，悬浮在空中的长廊连接着高低错落的平台。光线从云层边缘渗透下来，整个城市笼罩在一层薄薄的、淡金色的光辉之中。"},
    {type:"narrator",text:"然后你听到了哨音——那种羽人商贩在集市里叫卖的哨音，混合着羽毛摩擦的气流声，翅膀拍打石阶的轻响，还有远处风脉回廊传来的嗡鸣。"},
    {type:"narrator",text:"这一切都是那么的“不真实”，甚至让你仿佛也有了一种“漂浮感”。但是......这不是你的种族吗？"},
    {type:"narrator",text:"你站在街道中央，同族从你身边走过。有人多看了你一眼——却不是因为你的脸，而是因为你的后背是空的。"},
    {type:"narrator",text:"他们的翅膀会随着他们的脚步微微颤动，像是某种古老的呼吸。你望着他们背后你从未有过的器官，那种“不真实感”更加强烈了。"},
    {type:"char",role:"npc",speaker:"路人A（低声交谈）",text:"那是“无翼者”？",charImg:Passerby},
    {type:"char",role:"npc",speaker:"路人B",text:"看着好像是，这种人不应该被流放吗？怎么会......",charImg:Passerby},
    {type:"char",role:"npc",speaker:"路人A",text:"天哪，你看到他的平整的后背了吗，没有支出来的翅根，他是天生的。",charImg:Passerby},
    {type:"narrator",text:"闻言，你将背上的斗篷裹得更紧了些。"},
    {type:"char",role:"npc",speaker:"路人B",text:"长老怎么会允许这种......",charImg:Passerby},
    {type:"narrator",text:"悉悉索索的声音好像一直在你耳边萦绕不去，你抿了抿嘴，低头向着远处走去。"},
    {type:"narrator",text:"你拐过两条街，穿过一道低矮的拱廊，来到试翼之塔脚下。"},
    {type:"narrator",text:"这座塔的塔身比周围的建筑更高、更窄。表面没有风脉纹路，而是布满细密的刻痕——像某种古代的图案或文字，被时间磨得只剩下轮廓。"},
    {type:"narrator",text:"塔门没有守卫，只挂着一枚铁锁，看起来至少有几百年了。"},
    {type:"jump",goto:"chapter1_tower"}
  ],

  chapter1_tower:
  [
    {type:"title",chapter:"第三幕",subtitle:"试翼之塔"},
    {type:"narrator",text:"你从侧面的通风道绕进塔内。楼梯旋转向上，狭窄到羽人无法展开翅膀通行——这大概是设计者给“不擅长飞行的人”留的通道。"},
    {type:"narrator",text:"你沿着石阶一级一级走上去，脚步声在空荡荡的塔壁间反复回响。"},
    {type:"narrator",text:"塔顶是一扇雕花晶门。门没有上锁，你轻轻推开......"},
    {type:"narrator",text:"室内很大。塔顶是一整块半透明的白晶，光线毫无遮拦地穿透下来，整个空间像被灌满了水。"},
    {type:"narrator",text:"中央有一根矮柱，上方悬浮着一卷泛黄的图纸。"},
    {type:"narrator",text:"以及一个人。"},
    {type:"narrator",text:"她背对着门站着，正把手臂伸到身后，用手调整着右翼翼根的绑带。"},
    {type:"narrator",text:"她的翅膀微微展开。你看见了那对翅膀：左翼完整、修长、羽毛洁白如玉；右翼却比左翼短了将近三分之一，骨节以一种不自然的角度弯曲着，边缘的羽毛稀稀疏疏。"},
    {type:"narrator",text:"而她正要尝试扇动翅膀......但很快，她就踉踉跄跄地落回地面，像是一只折翼的鸟儿。"},
    {type:"narrator",text:"她转过身来，看见了你。"},
    {type:"char",role:"npc",speaker:"神秘女子",text:"——你，你看见了。",charImg:Celine},
    {type:"narrator",text:"她的声音很轻，尾音轻轻上挑。她迅速收起右翼，将扔在一旁的白袍披上，但已经晚了。于是她将目光落在了你空白的后背上。"},
    {type:"char",role:"npc",speaker:"神秘女子",text:"......你是无翼者？你就是那个被流放回来的人，你来这里做什么？",charImg:Celine},
    {
      type:"choice",
      options:
      [
        {label:"保守秘密，假装没看见",next:"chapter1_sel1"},
        {label:"上前帮她矫正飞行姿势",next:"chapter1_sel2"},
        {label:"公开揭穿她的伪装",next:"chapter1_sel3"}
      ]
    }
  ],

  chapter1_sel1:
  [
    {type:"narrator",text:"你移开目光，看向那卷悬浮的图纸。你指着它，做手势表示：我是来找那个的。"},
    {type:"narrator",text:"神秘女子沉默了很久。"},
    {type:"char",role:"npc",speaker:"神秘女子",text:"你知道那是什么吗？",charImg:Celine},
    {type:"char",role:"player",speaker:"你",text:"我知道，那是我父亲留下的东西。",charImg:playerImg},
    {type:"char",role:"npc",speaker:"神秘女子",text:"你父亲？",charImg:Celine},
    {type:"narrator",text:"她看上去有些惊讶，沉思了一会儿。"},
    {type:"char",role:"npc",speaker:"神秘女子",text:"原来是这样......你刚才——你什么都没看到，对吗？",charImg:Celine},
    {type:"narrator",text:"她没有等你回答，你的沉默就是最好的答案。"},
    {type:"char",role:"npc",speaker:"神秘女子",text:"你拿走它吧。这个图纸对我来说没有用。我的翅膀长成这样……再好的图纸也修不好。",charImg:Celine},
    {type:"char",role:"player",speaker:"你",text:"长老会那边呢？我记得他们是将这张图纸封存了，因为他们认为“不完美”的羽人不配飞翔。",charImg:playerImg},
    {type:"narrator",text:"她走到门口，停了一下。"},
    {type:"char",role:"npc",speaker:"神秘女子",text:"你还不知道我是谁吧，我是赛琳，是目前天空之城的圣女......",charImg:Celine},
    {type:"narrator",text:"她稍微沉默了一下，又好似自嘲般的笑笑。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"......也是被困在高塔的囚徒。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我今晚会在风脉回廊底层，如果你想知道更多，包括.....",charImg:Celine},
    {type:"narrator",text:"她抬头点了点你手上的图纸。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"...就来这里找我吧。",charImg:Celine},
    {type:"narrator",text:"获得【机械义翼设计图】。\n赛琳好感＋15。"},
    {type:"effect",affection:15,addItems:{mechanicalWingBlueprint:1}},
    {type:"jump",goto:"chapter1_corridor"}
  ],

  chapter1_sel2:
  [
    {type:"narrator",text:"你朝她走了一步。她警觉地后退。"},
    {type:"char",role:"npc",speaker:"神秘女子",text:"你要干嘛。",charImg:Celine},
    {type:"narrator",text:"你没有停下。你走到她面前，伸出手——你指了指她的右翼，又指了指地面，示意她收拢翅膀，不要害怕。"},
    {type:"narrator",text:"她皱着眉看着你，没有动。"},
    {type:"char",role:"player",speaker:"你",text:"你的翅膀本身就有些畸形，又一直裹着，很难受吧。",charImg:playerImg},
    {type:"narrator",text:"她愣住了，然后沉默又别扭地将紧攥着白袍的手移开，后背浮现出一个畸形的翅根形状。"},
    {type:"char",role:"npc",speaker:"神秘女子",text:"从小到大，从来没有一个人这样说过我的翅膀，所有人都在忽视它——包括我自己。",charImg:Celine},
    {type:"narrator",text:"她收拢了翅膀，退后半步。"},
    {type:"char",role:"npc",speaker:"神秘女子",text:"自我介绍一下吧，我叫赛琳，是目前天空之城的圣女......",charImg:Celine},
    {type:"narrator",text:"她稍微沉默了一下，又好似自嘲般的笑笑。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"......也是被困在高塔的囚徒。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"你来这里是为了那张图纸吧。你知道那是什么吗？",charImg:Celine},
    {type:"char",role:"player",speaker:"你",text:"我知道，那是我父亲留下的东西。",charImg:playerImg},
    {type:"char",role:"npc",speaker:"神秘女子",text:"你父亲？",charImg:Celine},
    {type:"narrator",text:"她看上去有些惊讶，沉思了一会儿。"},
    {type:"char",role:"npc",speaker:"神秘女子",text:"原来是这样......",charImg:Celine},
    {type:"narrator",text:"她走到塔顶边缘，在一个暗格里摸出一卷图纸，递给你，观察着你的反应。"},
    {type:"narrator",text:"她抬头点了点你手上的图纸。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我今晚会在风脉回廊底层，如果你想知道更多，包括.....这张图纸的事，那你就来这里找我吧。",charImg:Celine},
    {type:"narrator",text:"获得【机械义翼设计图】。\n赛琳好感+25。"},
    {type:"effect",affection:25,addItems:{mechanicalWingBlueprint:1}},
    {type:"jump",goto:"chapter1_corridor"}
  ],

  chapter1_sel3:
  [
    {type:"narrator",text:"你看着她，你的目光从她的右翼移到她的脸上。你没有躲闪。然后你笑了——不是友善的那种。"},
    {type:"char",role:"player",speaker:"你",text:"你也不希望你的翅膀被他们所知晓吧。",charImg:playerImg},
    {type:"narrator",text:"她沉默了，然后笑了起来，只是那笑意不达眼底。"},
    {type:"char",role:"npc",speaker:"神秘女子",text:"你看到了。所以呢？你打算告诉谁？长老会？他们的守备队？还是你打算拿这件事来换点什么？",charImg:Celine},
    {type:"char",role:"npc",speaker:"神秘女子",text:"去吧。反正这座城早就该塌了。",charImg:Celine},
    {type:"narrator",text:"她大步走向门口。经过你身边时，她停了一下。"},
    {type:"char",role:"npc",speaker:"神秘女子",text:"让我来想想，你是来拿图纸的吧。不过你可能拿不走它了，真是遗憾。",charImg:Celine},
    {type:"narrator",text:"说完她便大步离开了，碍于守卫你没能叫住她。"},
    {type:"narrator",text:"塔顶只剩下你和那卷悬浮的图纸——但暗格已经合上了，你找不到打开的机关。"},
    {type:"narrator",text:"没有图纸，你像之前那样受人厌恶，也没有渠道接触天空之城的核心。几日后，世界如神秘商人预言的那样覆灭。"},
    {type:"narrator",text:"你缓缓闭上了眼睛。"},
    {type:"narrator",text:"任务失败，达成结局【未变之局】。\n成就解锁：【未变之局·天空之城】"},
    {type:"choice",options:[{label:"返回游戏主菜单",next:"end"}]}
  ],

  chapter1_corridor:
  [
    {type:"title",chapter:"第四幕",subtitle:"风脉回廊底层"},
    {type:"narrator",text:"夜晚的时候，你准时来到了风脉回廊。在这座轻盈的城市中，所有的风都会流向这里。"},
    {type:"narrator",text:"巨大的白晶管道贯穿岩层，蓝色的风脉能量在其中流动，这是这座城市的脉搏，在渐凉的夜色里宛若生命般的呼吸。"},
    {type:"narrator",text:"你沿着回廊继续向下走，墙壁上的纹路逐渐变得粗糙，空气里温度下降，远处有水滴声，风的低语，以及谁歌唱的声音。"},
    {type:"narrator",text:"又走了几步，然后你看见了她。她正坐在一根横倒的生了锈的钢管上。"},
    {type:"narrator",text:"你很难想象这样近乎透明的白晶钢管竟然也会有生锈的时候，就像你很难想象天空之城的圣女会这样豪迈地坐在这个地方。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"你来了，我还以为你不会来呢。",charImg:Celine},
    {type:"narrator",text:"她拍了拍身旁的空位，示意你坐下。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"这里......算是我的秘密基地。那些高高在上的神圣观点与条文蔓延不到这里来，我可以在这里舒展我的翅膀而不用担心被指责......当然，你也可以。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"你看到了我的翅膀。我也可以问你一个问题吗？",charImg:Celine},
    {type:"char",role:"player",speaker:"你",text:"当然可以。",charImg:playerImg},
    {type:"char",role:"npc",speaker:"赛琳",text:"你知道你的父亲是怎么被流放的吗？你说你是艾德蒙之子……你知道艾德蒙是什么人吗？",charImg:Celine},
    {
      type:"choice",
      options:
      [
        {label:"我父亲是一个被长老会污蔑的叛徒。",next:"chapter1_corridor_a"},
        {label:"我不了解他，我来这里就是为了找到答案。",next:"chapter1_corridor_b"},
        {label:"沉默，坐在她身边",next:"chapter1_corridor_c"}
      ]
    }
  ],

  chapter1_corridor_a:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"他也许是的。我一直这样相信着。但我后来发现……事情比“污蔑”更复杂。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我母亲去世的时候，我七岁。他们说她是病死的。但我翻过长老会的档案——我母亲临死前三个月，被带进过风脉之心大厅。那是她最后一次出现在公开记录里。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"然后她忽然“病了”，然后死了。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"艾德蒙……你的父亲……是唯一一个在长老会上投过反对票的人。他反对“神圣献祭”继续下去，然后他就被流放了。",charImg:Celine},
    {type:"narrator",text:"赛琳好感+5。"},
    {type:"effect",affection:5},
    {type:"jump",goto:"chapter1_workshop"}
  ],

  chapter1_corridor_b:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"那你和我一样。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我七岁之后，再也没人告诉我真相。所有人都在说“好好当你的圣女”“不要多问”“母亲的事已经过去了”。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"你有勇气回来——但我已经失去了掀开这一切的勇气。",charImg:Celine},
    {type:"narrator",text:"她低着头，声音很轻。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我母亲死之前三个月……被带进过风脉之心大厅。然后她就再也没出来过。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"你父亲是唯一投过反对票的人。他说过“献祭应该停止”。然后他被流放了。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"后来，他们给我安上了“圣女”的头衔——好像这样我就能闭嘴。",charImg:Celine},
    {type:"narrator",text:"赛琳好感+8。"},
    {type:"effect",affection:8},
    {type:"jump",goto:"chapter1_workshop"}
  ],

  chapter1_corridor_c:
  [
    {type:"narrator",text:"你坐下来，和她一样靠在管壁上，看着回廊深处幽暗的风脉在晶管中流动。"},
    {type:"narrator",text:"光影交错闪烁着，像是彼此颤动的心跳。"},
    {type:"narrator",text:"她没有催促你开口。几分钟过去了，最后是她先说了话。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"你知道吗。你是第一个坐在我旁边什么都不说的人。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"大多数人都想从我这里拿走点什么——我的顺从，我的祈祷，或是我的血统......只有你什么都没要。",charImg:Celine},
    {type:"narrator",text:"她微微转过头看你。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"现在，你要问什么都可以。但仅限今晚。",charImg:Celine},
    {type:"narrator",text:"赛琳好感+10。"},
    {type:"effect",affection:10},
    {type:"jump",goto:"chapter1_workshop"}
  ],

  chapter1_workshop:
  [
    {type:"title",chapter:"第五幕",subtitle:"深夜工坊"},
    {type:"narrator",text:"你向她询问了有关图纸的事，赛琳带着你来到了风脉回廊底层的废弃工坊。"},
    {type:"narrator",text:"灰尘覆盖了所有表面，但锻造台、钳具和熔炉都还在。"},
    {type:"narrator",text:"一枚半成品的金属骨架躺在台面上——那只做了一只翅膀的轮廓，关节处用粗糙的螺纹连接着，像一个被遗忘的梦。"},
    {type:"narrator",text:"你点燃墙上的晶石灯。暗黄色的光慢慢填满整个房间。"},
    {type:"narrator",text:"赛琳站在门口。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"这是你父亲以前的工坊。他在这里做了第一只义翼的原型——就是你看到的那个。",charImg:Celine},
    {type:"narrator",text:"她走到台前，手指轻轻碰了一下那枚骨架的边缘。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"长老会的人都说，他花了十年，失败了二十八次。第二十九次才飞起来——飞了十丈远，然后右翼关节断了，他摔断了三根肋骨......但他还在笑。",charImg:Celine},
    {type:"narrator",text:"她转身看你。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"所以我想问你——你拿到图纸了。也找到这个地方了。你真的打算做下去吗？你知道做好这只翅膀意味着什么吗？——你可能会飞。但也可能会被他们当作“挑战天空之城规则的人”来处理。",charImg:Celine},
    {
      type:"choice",
      options:
      [
        {label:"我既然回来了，就不打算再走。",next:"chapter1_workshop_a"},
        {label:"我不确定能不能做好它。",next:"chapter1_workshop_b"},
        {label:"你为什么要帮我。",next:"chapter1_workshop_c"}
      ]
    }
  ],

  chapter1_workshop_a:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"好，我留下来帮你。",charImg:Celine},
    {type:"narrator",text:"她走到你旁边，卷起袖子。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我小时候学习过相关的内容，记得一些步骤。——虽然不一定都记得对，但我们试试看。",charImg:Celine},
    {type:"narrator",text:"获得【赛琳的协助】。\n制作机械翼所耗材料减少。\n赛琳好感+10。"},
    {type:"effect",affection:10,flags:{celineHelp:true},addStatuses:["赛琳的协助"]},
    {type:"jump",goto:"chapter1_end"}
  ],

  chapter1_workshop_b:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"也许你父亲第一次做的时候也不确定，这没关系的，先做再说。",charImg:Celine},
    {type:"narrator",text:"她拿起一只钳子递给你。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"试试看，哪怕做坏了也比不敢做好。",charImg:Celine},
    {type:"narrator",text:"赛琳好感+5。"},
    {type:"effect",affection:5},
    {type:"jump",goto:"chapter1_end"}
  ],

  chapter1_workshop_c:
  [
    {type:"narrator",text:"她沉默了片刻。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"因为我想看一个人飞起来——不用神赐的翅膀，不用圣女的祝福，不用长老会的恩准。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我想看这座城里有一个人是靠自己的选择升空的。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"你不是为了天空之城而飞。你是为了你自己。",charImg:Celine},
    {type:"narrator",text:"赛琳好感+15。"},
    {type:"effect",affection:15},
    {type:"jump",goto:"chapter1_end"}
  ],

  chapter1_end:
  [
    {type:"narrator",text:"你们按照图纸敲打了一会儿，发现还缺少不少材料。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"看起来这个机械羽翼短期内是做不完的了，我们没有材料，我也不能离开天空之城......",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"这样，我知道一个地方可以偷偷溜出去，你明天就去四大阵营都逛逛，看能不能集齐材料，如果有其他消息了，我再告诉你。",charImg:Celine},
    {type:"narrator",text:"第一章结束。\n任务目标：集齐制作机械羽翼所需的材料。"},
    {type:"jump",goto:"firstfreedom"}
  ],

  chapter2:
  [
    {type:"title",chapter:"第二章",subtitle:"灰烬与根"},
    {type:"narrator",text:"你收到了赛琳的消息，请迅速前往审判穹顶与赛琳会和。"},
    {type:"title",chapter:"第一幕",subtitle:"风脉之心的异变"},
    {type:"narrator",text:"清晨的审判穹顶大门紧闭，但侧门半掩着没有上锁。你推门进去时，赛琳正站在大厅中央，背对着你。"},
    {type:"narrator",text:"她的面前是那块巨大的风脉晶石——但你几乎认不出它了。"},
    {type:"narrator",text:"晶石表面的蓝色光芒比上次看见时暗淡了许多，无数细密的黑色裂纹像蛛网一样从晶石内部蔓延出来。"},
    {type:"narrator",text:"更令人不安的是，那些裂纹在缓慢地脉动着，一明一暗，仿佛某种正在呼吸的东西。"},
    {type:"narrator",text:"赛琳听到你的脚步声，转过身来。她的脸色比上次见时也苍白了很多，眼眶下有明显的青色痕迹。"},
    {type:"narrator",text:"她的右翼没有用魔法伪装，畸形的骨节在白晶大厅里格外显眼。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"你来了。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"三天前我开始做噩梦。梦里我的母亲站在风脉之心下面，她张嘴对我说话——但我听不见她的声音。我伸手去碰她，她的身体却碎成了黑色的结晶。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"起初我以为只是噩梦。但昨天夜里，风脉之心发出了声音。一种……深沉的低鸣。像是有人在石头深处哭泣。",charImg:Celine},
    {type:"narrator",text:"她抬手触碰晶石表面。裂纹在她指尖接触的地方短暂地变成了金色，但很快又被黑色吞没。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"你看到了，它在回应我，只是很虚弱。",charImg:Celine},
    {type:"narrator",text:"她收回手，看着你。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我需要你帮我。风脉之心是天空之城的命脉，如果它出问题，整座城市都会坠落。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"但长老会已经封锁了大厅，不许任何人接近。我是偷偷进来的——是圣女的权限，只有一刻钟。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我查过了我能接触到的所有档案。有一份被撕掉一半的古老地图——上面标注了一个位置，在四大区域交界处的地下。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"标注是用古羽人语写的，我又花了一点时间才翻译出来：“囚神笼中。”",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"你的父亲……兴许他知道那个地方。因为那些卷轴里，记录着二十年前他下去过。然后他回来了——带着跟风脉之心同样的黑色纹路。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我想让你帮我查清楚——风脉之心到底发生了什么......以及你父亲当年为什么要去那个地方。",charImg:Celine},
    {type:"narrator",text:"她抬起眼睛看着你。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"可以吗？你有什么想问我的吗？",charImg:Celine},
    {
      type:"choice",
      options:
      [
        {label:"你的母亲和我的父亲......他们是什么关系？",next:"chapter2_question_a"},
        {label:"你母亲的死......和风脉之心有关？",next:"chapter2_question_b"},
        {label:"沉默，把手放在晶石上。",next:"chapter2_question_c"}
      ]
    }
  ],

  chapter2_question_a:
  [
    {type:"narrator",text:"赛琳沉默了一会儿。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"他们是朋友......至少在二十年前是。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我翻阅过母亲留下的信件，里面提到过艾德蒙的名字。他们经常在深夜通信，讨论风脉之心的能量流向......有时候你父亲会来我家，和我母亲在书房里谈到天亮。",charImg:Celine},
    {type:"narrator",text:"她顿了一下。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"但后来有一天，日记里写着他们吵架了，我不知道为什么。第二天，你的父亲就被流放了。而我的母亲......就被带进了风脉之心大厅。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我唯一知道并且确定的是——你父亲是我母亲信任的人。如果他在那个装置里留下了什么，一定是为了她。",charImg:Celine},
    {type:"narrator",text:"获得情报【艾德蒙与艾琳的友谊】。\n赛琳好感+5。"},
    {type:"effect",affection:5,addIntels:["艾德蒙与艾琳的友谊"]},
    {type:"narrator",text:"你点了点头。她的目光没有躲闪。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"今晚还是在这里，老地方，我会告诉你更多。",charImg:Celine},
    {type:"jump",goto:"chapter2_infiltration"}
  ],

  chapter2_question_b:
  [
    {type:"narrator",text:"赛琳闭上眼睛，深吸了一口气。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"在我七岁那年，我的母亲被带进过风脉之心大厅。那是她最后一次出现在公开记录里，也是我最后一次见到她。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"然后她莫名其妙的“病了”，然后被隔离，然后死了。长老会说是急病，但我从父亲留下的东西里看到过一份信——信里说风脉之心需要“补充能量”，否则城市会失去浮力。",charImg:Celine},
    {type:"narrator",text:"她睁开眼，看着你。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"从我开始懂事，开始学着母亲的样子祈祷，他们就把我当作“圣女”来培养。以前我以为那是因为我血统高贵，后来我才从母亲留下的日记中慢慢明白——他们，只是在养一个备用祭品。",charImg:Celine},
    {type:"narrator",text:"获得情报【献祭的传闻】。\n赛琳好感+8。"},
    {type:"effect",affection:8,addIntels:["献祭的传闻"]},
    {type:"narrator",text:"她默默攥紧了拳头，又慢慢松开。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"今晚还是在这里，老地方，我会告诉你更多。",charImg:Celine},
    {type:"jump",goto:"chapter2_infiltration"}
  ],

  chapter2_question_c:
  [
    {type:"narrator",text:"你没有说话，只是走上前，把手掌贴上风脉之心表面。冰冷的触感从掌心蔓延到手臂。"},
    {type:"narrator",text:"然后你感觉到了晶石在震动。那是一种极其细微的、有规律的震动，像心跳，像回声。"},
    {type:"narrator",text:"你的掌心有一瞬间变得温热，裂纹里渗出的黑色光在接触到你的皮肤时短暂地退缩了。"},
    {type:"narrator",text:"赛琳看着你的手，呼吸停了一拍。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"……它没有碰你。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"它们在避开你。像你身上有什么东西让它害怕。",charImg:Celine},
    {type:"narrator",text:"她抬眼看你，目光里多了一层你无法解读的东西。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"你到底是谁？",charImg:Celine},
    {type:"narrator",text:"赛琳好感+10。\n获得关键情报【黑色纹路对你有天然规避】。"},
    {type:"effect",affection:10,addIntels:["黑色纹路对你有天然规避"]},
    {type:"narrator",text:"她盯着你看了很久很久，像是在思考什么。但最后她什么都没问，只是转过身去。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"今晚还是在这里，老地方，我会告诉你更多。",charImg:Celine},
    {type:"narrator",text:"赛琳说完便离开了。等到了晚上会和时，她才告诉你，她需要你协助她潜入审判穹顶去拿一件东西。"},
    {type:"narrator",text:"【主线任务】潜入审判穹顶"},
    {type:"jump",goto:"chapter2_infiltration"}
  ],

  chapter2_infiltration:
  [
    {type:"title",chapter:"第二幕",subtitle:"潜入审判穹顶"},
    {type:"narrator",text:"深夜，审判穹顶底部，你小心翼翼地贴着墙壁移动。守卫刚刚换班——这是赛琳告诉你的时间窗口，只有一刻钟。"},
    {type:"narrator",text:"终于，你费了九牛二虎之力来到了档案室。穹顶底部的档案室入口被一道晶石门封锁，门上有符文锁。"},
    {type:"narrator",text:"赛琳从暗处走出来。她穿着深色斗篷，兜帽压得很低。她没有说话，只是点了点头，然后从袖中取出一枚晶石钥匙，插入门上的凹槽。石门缓缓滑开。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"这是我父亲的钥匙。他不知道我拿走了。",charImg:Celine},
    {type:"narrator",text:"她站在门口，没有进去。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"你进去吧。我在外面守着。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"如果你找到什么……关于我母亲的，关于你父亲的——可以告诉我吗？全部。",charImg:Celine},
    {
      type:"choice",
      options:
      [
        {label:"你确定不一起进去？",next:"chapter2_archive_a"},
        {label:"你在害怕什么？",next:"chapter2_archive_b"},
        {label:"点头，独自进入。",next:"chapter2_archive_c"}
      ]
    }
  ],

  chapter2_archive_a:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"我确定。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我进去的话……我会哭。我不想在那种地方哭。",charImg:Celine},
    {type:"narrator",text:"你独自进入档案室。\n赛琳好感+5"},
    {type:"effect",affection:5},
    {type:"jump",goto:"chapter2_records"}
  ],

  chapter2_archive_b:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"害怕知道真相之后，我就再也不能假装一切正常了。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我当了这么多年圣女......每天微笑，每天祈祷，每天对信众说“拂晓会眷顾你们”。如果真相是这座城是建在一个活人的痛苦上的......那我这二十年念的每一句祷词都是谎言。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"但我还是想知道什么是真的，什么是假的。",charImg:Celine},
    {type:"narrator",text:"赛琳好感+8"},
    {type:"effect",affection:8},
    {type:"jump",goto:"chapter2_records"}
  ],

  chapter2_archive_c:
  [
    {type:"narrator",text:"你点了点头，独自进入档案室，身后传来石门合拢的轻响。"},
    {type:"jump",goto:"chapter2_records"}
  ],

  chapter2_records:
  [
    {type:"title",chapter:"第三幕",subtitle:"二十年前的献祭记录"},
    {type:"narrator",text:"档案室内部比外面小得多。四面墙壁嵌满了晶石板，每一块都是一份记录。"},
    {type:"narrator",text:"空气中有一股陈旧的气味——像被封存了很久的纸张和灰尘，混合着某种金属的冷腥味。"},
    {type:"narrator",text:"你走到最深处。一块晶石板嵌在墙中央，表面刻着古羽人语。你辨认出日期——二十年前。你触摸石板。文字亮起。"},
    {type:"narrator",text:"记录内容：\n献祭记录·第七十三次\n献祭者：艾琳·风行者（皇室血脉，圣女候选）\n献祭方式：血液注入风脉之心·核心\n献祭原因：风脉之心能量衰减至警戒线，城市浮力下降\n献祭过程：自愿。由长老会七人见证。\n备注：献祭者提出唯一条件——其女赛琳不得知晓献祭真相，直至其成年。\n签署人：大长老·奥古斯都；第二长老·艾德蒙·风行者（反对，未签署）"},
    {type:"narrator",text:"你继续往下翻。在第七十三次记录的下方，还有一行极小的字——几乎被磨损掉了。于是你凑近看了看。"},
    {type:"narrator",text:"第七十四次·准备中\n献祭者：待定\n候选：赛琳·风行者（皇室血脉，圣女继承人）\n预定时间：赛琳成年礼后"},
    {type:"narrator",text:"你的手指停在那一行字上。"},
    {type:"narrator",text:"就在此时，档案室的角落传来一声极其轻微的响动。你转头——一个身影站在阴影里。"},
    {type:"narrator",text:"那是赛琳的叔叔，那个半边脸覆盖着黑色结晶的老人，他一直在这里。"},
    {type:"char",role:"npc",speaker:"叔叔",text:"你找到了。",charImg:Uncle},
    {type:"char",role:"npc",speaker:"叔叔",text:"那是我哥哥的字迹。你的父亲艾德蒙反对了，但你也看到了——反对并没有用。",charImg:Uncle},
    {type:"char",role:"npc",speaker:"叔叔",text:"他们把我的嫂子献祭了，现在他们准备把赛琳也献祭掉。",charImg:Uncle},
    {type:"char",role:"npc",speaker:"叔叔",text:"所以你的父亲和我的哥哥激活了锁神装置。他们想毁掉风脉之心——哪怕代价是让整座城坠落。",charImg:Uncle},
    {type:"char",role:"npc",speaker:"叔叔",text:"你知道为什么赛琳作为圣女，她的父母并无疾病，但她翅膀却是畸形吗？",charImg:Uncle},
    {type:"char",role:"npc",speaker:"叔叔",text:"那是因为从她被长老会认定为下一任献祭者培养时，她便在不停地学习祷告，而这种祷告其实是一种诅咒，让那虚伪的神明注意到她的诅咒。",charImg:Uncle},
    {type:"char",role:"npc",speaker:"叔叔",text:"你想知道赛琳母亲临死前说了什么吗？",charImg:Uncle},
    {type:"char",role:"npc",speaker:"叔叔",text:"她说：“不要让赛琳知道，让她以为我是病死的，让她恨我也行——只要她能活下去。”",charImg:Uncle},
    {type:"char",role:"npc",speaker:"叔叔",text:"你的父亲答应了，但是他违背了诺言，因为他觉得赛琳有权利知道。于是他被长老会判决流放。",charImg:Uncle},
    {type:"char",role:"npc",speaker:"叔叔",text:"现在轮到你了......你会告诉她吗？",charImg:Uncle},
    {
      type:"choice",
      options:
      [
        {label:"我会告诉她全部。",next:"chapter2_uncle_a"},
        {label:"我需要想想。",next:"chapter2_uncle_b"},
        {label:"不回答，把记录收好，转身离开。",next:"chapter2_uncle_c"}
      ]
    }
  ],

  chapter2_uncle_a:
  [
    {type:"char",role:"npc",speaker:"叔叔",text:"那你会和我哥一样——被这座城驱逐。",charImg:Uncle},
    {type:"char",role:"npc",speaker:"叔叔",text:"但至少你没有骗她。",charImg:Uncle},
    {type:"narrator",text:"获得成就【此生不负】。"},
    {type:"narrator",text:"获得【献祭记录·完整版】。"},
    {type:"effect",flags:{fullSacrificeRecord:true},addItems:{sacrificeRecord:1}},
    {type:"jump",goto:"chapter2_celine_wait"}
  ],

  chapter2_uncle_b:
  [
    {type:"char",role:"npc",speaker:"叔叔",text:"想吧。但别想太久。",charImg:Uncle},
    {type:"char",role:"npc",speaker:"叔叔",text:"她成年礼快到了。如果长老会决定重启献祭——你犹豫的每一天，都在缩短她活着的日子。",charImg:Uncle},
    {type:"narrator",text:"获得【献祭记录·完整版】。"},
    {type:"effect",flags:{fullSacrificeRecord:true},addItems:{sacrificeRecord:1}},
    {type:"jump",goto:"chapter2_celine_wait"}
  ],

  chapter2_uncle_c:
  [
    {type:"narrator",text:"赛琳的叔叔在你身后喃喃自语。"},
    {type:"char",role:"npc",speaker:"叔叔",text:"你和你父亲一样的沉默。但他最后还是说了。你呢？你又会做出什么样的选择？",charImg:Uncle},
    {type:"narrator",text:"获得【献祭记录·完整版】。"},
    {type:"effect",flags:{fullSacrificeRecord:true},addItems:{sacrificeRecord:1}},
    {type:"jump",goto:"chapter2_celine_wait"}
  ],

  chapter2_celine_wait:
  [
    {type:"title",chapter:"第四幕",subtitle:"赛琳的等待"},
    {type:"narrator",text:"你走出档案室。赛琳靠在走廊的墙壁上，斗篷的兜帽已经摘下来了，露出一头银白的秀发。"},
    {type:"narrator",text:"她看着你手里的记录，却没有伸手去接。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"你找到了什么？",charImg:Celine},
    {
      type:"choice",
      options:
      [
        {label:"把记录递给她。",next:"chapter2_wait_a"},
        {label:"简要复述记录内容，把关键信息告诉她。",next:"chapter2_wait_b"},
        {label:"把记录收起来，说：“现在还不是时候。”",next:"chapter2_wait_c"}
      ]
    }
  ],

  chapter2_wait_a:
  [
    {type:"narrator",text:"她接过去，低头看了很久。她的表情没有变化——太平静了。像一面冻结的湖。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"……第七十三次。艾琳·风行者。那是我母亲的名字。",charImg:Celine},
    {type:"narrator",text:"她抬起头看你。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"下面还有一行字，对不对？第七十四次。候选是我。",charImg:Celine},
    {type:"narrator",text:"你没有说话，她也不需要你说。"},
    {type:"narrator",text:"她把记录还给你。\n赛琳好感+10。"},
    {type:"effect",affection:10},
    {type:"jump",goto:"chapter2_wait_common"}
  ],

  chapter2_wait_b:
  [
    {type:"narrator",text:"你只说了最重要的部分——她母亲的名字、献祭的原因、以及第七十四次记录的存在。你隐瞒了她母亲遗愿的细节。"},
    {type:"narrator",text:"赛琳听完后沉默了很久。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"所以她是自愿的。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"她为了保护我，放弃了活下去的权利。",charImg:Celine},
    {type:"narrator",text:"她看着你，目光很复杂。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"你还瞒了我什么？",charImg:Celine},
    {type:"char",role:"player",speaker:"你",text:"……",charImg:playerImg},
    {type:"narrator",text:"你没有回答，她也没有急着追问。"},
    {type:"narrator",text:"赛琳好感+5。\n获得成就【未说出口的真相】。"},
    {type:"effect",affection:5},
    {type:"jump",goto:"chapter2_wait_common"}
  ],

  chapter2_wait_c:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"你找到了真相，然后决定不告诉我？",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我以为你和他们是不一样的。",charImg:Celine},
    {type:"narrator",text:"她静静地站了会儿，观察着你的反应。"},
    {type:"narrator",text:"赛琳好感-10。"},
    {type:"effect",affection:-10},
    {type:"jump",goto:"chapter2_wait_common"}
  ],

  chapter2_wait_common:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"……我知道了。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"后天是我的成年礼。",charImg:Celine},
    {type:"narrator",text:"她抬头看你，目光很稳，但你能看到她攥紧的手指。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"明天晚上，来审判穹顶找我。但在那之前——我需要一个人待着。",charImg:Celine},
    {type:"narrator",text:"赛琳离开。"},
    {type:"narrator",text:"你站在空荡荡的走廊里，手里攥着那份记录。纸张很轻，但你知道它的重量。"},
    {type:"jump",goto:"freedom2"}
  ],

  chapter3:
  [
    {type:"title",chapter:"第三章",subtitle:"风雨欲来"},
    {type:"narrator",text:"夜幕降临了，请前往审判穹顶寻找赛琳吧。"},
    {type:"title",chapter:"第一幕",subtitle:"成年礼前夜"},
    {type:"narrator",text:"成年礼前夜，风脉之心大厅。赛琳站在晶石下方，她换上了圣女的正式白袍，右翼被魔法伪装成完好的模样。"},
    {type:"narrator",text:"她看起来像是从圣典插图中走出来的完美圣女——只有你知道那层伪装下面的是什么。"},
    {type:"narrator",text:"你走进了大厅，她听到了你的脚步声。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"明天就是成年礼了。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"明天之后，我就是正式的圣女继承人。然后长老会就会把我带到风脉之心下面……像他们对我母亲做的那样。",charImg:Celine},
    {type:"narrator",text:"她转过身看你，她脸上的表情很平静——但她的右翼在发抖。你能看到魔法伪装下面的翅膀在微微颤动。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我想让你帮我一个忙。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"明天，无论发生什么——不要让他们带走我。",charImg:Celine},
    {
      type:"choice",
      options:
      [
        {label:"我会站在你身边。无论发生什么。",next:"chapter3_night_a"},
        {label:"你打算怎么做？",next:"chapter3_night_b"},
        {label:"如果你母亲希望你活下去——也许你不该这样？",next:"chapter3_night_c"}
      ]
    }
  ],

  chapter3_night_a:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"好。",charImg:Celine},
    {type:"narrator",text:"她只说了这一个字。但她看着你的眼神变了——像是在看一个她可以依靠的人。"},
    {type:"narrator",text:"赛琳好感+15。"},
    {type:"effect",affection:15},
    {type:"jump",goto:"chapter3_tianlie"}
  ],

  chapter3_night_b:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"我也不知道......我只知道我不能像母亲那样安静地走进那个祭坛。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"如果我必须死——我要让这座城里的每个人都看到，他们杀死的是什么。",charImg:Celine},
    {type:"narrator",text:"赛琳好感+10。"},
    {type:"effect",affection:10},
    {type:"jump",goto:"chapter3_tianlie"}
  ],

  chapter3_night_c:
  [
    {type:"narrator",text:"她看着你。沉默了很久。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我母亲希望我活下去，不是希望我作为一个活祭品活下去。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我以为你会懂。",charImg:Celine},
    {type:"narrator",text:"她的语气冷了下来。\n赛琳好感-5。"},
    {type:"effect",affection:-5},
    {type:"jump",goto:"chapter3_tianlie"}
  ],

  chapter3_tianlie:
  [
    {type:"title",chapter:"第二幕",subtitle:"天裂"},
    {type:"narrator",text:"深夜，你跟赛琳来到羽翼墓园。"},
    {type:"narrator",text:"深夜的风从悬崖边缘灌进来，穿过无数残破的羽管，发出细微的哨音。月光照在那些苍白的羽翼上，整片墓园像一片冻结的、白色的海。"},
    {type:"narrator",text:"赛琳站在她母亲的墓碑前。她在离开穹顶前就脱下了白袍，只穿了一件简单的灰色长衣。"},
    {type:"narrator",text:"她的右翼完全暴露在月光下——畸形的骨节和稀疏的羽毛清晰可见。"},
    {type:"narrator",text:"她伸手触摸墓碑上的名字。指甲在石面上发出极轻的声响。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我小时候经常来这里，因为我以为我母亲只是在这里“睡着”了。后来我长大了，知道她不是睡着了。但我还是来这里，因为我找不到别的地方可以和她说话。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"明天，我就要变成她了。",charImg:Celine},
    {type:"narrator",text:"她转过身看你。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我叔叔告诉我了，关于我母亲的遗愿——她不让我知道真相，她希望我“活着”。但你父亲把真相留下来了，然后你把它交给了我。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"现在我知道了全部。我母亲是为了保护我而死的。而你父亲为了保护真相而被流放。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"你告诉我——我该怎么做？",charImg:Celine},
    {
      type:"auto",
      options:
      [
        {max:"59",min:"31",next:"chapter3_middle"},
        {max:"30",min:"-100",next:"chapter3_extreme"},
        {max:"200",min:"60",next:"chapter3_extreme"}
      ]
    }
  ],

  chapter3_middle:
  [
    {type:"char",role:"player",speaker:"你",text:"你母亲希望你活下去，那就活下去。",charImg:playerImg},
    {type:"char",role:"npc",speaker:"赛琳",text:"活下去的意思是——看着别人走上祭坛？还是我逃走，让长老会追我到天涯海角？",charImg:Celine},
    {type:"narrator",text:"她摇了摇头。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我不想只是“活下去”，我更想活得有价值。",charImg:Celine},
    {type:"narrator",text:"赛琳好感锁定：30-60。\n进入【天裂·中立】分支。"},
    {type:"effect",flags:{celineRoute:"middle",affectionMin:30,affectionMax:60}},
    {type:"jump",goto:"chapter3_ceremony"}
  ],

  chapter3_extreme:
  [
    {type:"char",role:"player",speaker:"你",text:"真相已经在你手里了。怎么用，是你的选择。",charImg:playerImg},
    {type:"char",role:"npc",speaker:"赛琳",text:"我的选择？",charImg:Celine},
    {type:"narrator",text:"她沉默了一会儿。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我选择明天走进审判穹顶。但不是为了献祭。我要站在所有长老、所有信众面前，把这份记录读出来。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"他们可以杀我。但我要他们在杀我之前，先承认自己做过的事。",charImg:Celine},
    {type:"narrator",text:"她看着你，目光很亮。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"你会站在我身边吗？",charImg:Celine},
    {
      type:"auto",
      options:
      [
        {min:"60",max:"200",next:"chapter3_alliance"},
        {max:"30",min:"-100",next:"chapter3_isolated"}
      ]
    }
  ],

  chapter3_alliance:
  [
    {type:"char",role:"player",speaker:"你",text:"我会。",charImg:playerImg},
    {type:"narrator",text:"她笑了。那个笑容很浅，但她的眼睛没有哭。她伸出手——你握住了。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"好。那明天……我们一起面对。",charImg:Celine},
    {type:"narrator",text:"赛琳好感锁定≥60。\n进入【天裂·同盟】分支。"},
    {type:"effect",flags:{celineRoute:"alliance",affectionMin:60}},
    {type:"jump",goto:"chapter3_ceremony"}
  ],

  chapter3_isolated:
  [
    {type:"char",role:"player",speaker:"你",text:"我不确定这是最好的方法。",charImg:playerImg},
    {type:"narrator",text:"她的手放了下来。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"……我明白了。你走吧。明天……我自己去。",charImg:Celine},
    {type:"narrator",text:"赛琳好感锁定≤30。\n进入【天裂·孤立】分支。"},
    {type:"effect",flags:{celineRoute:"isolated",affectionMax:30}},
    {type:"jump",goto:"chapter3_ceremony"}
  ],

  chapter3_ceremony:
  [
    {type:"title",chapter:"第三幕",subtitle:"成年礼"},
    {type:"narrator",text:"审判穹顶·议会厅——七位长老坐在高台上，数百名羽人信众挤满了旁听席。"},
    {type:"narrator",text:"风脉之心的嗡鸣从大厅外传来，比昨夜更响了。"},
    {type:"narrator",text:"赛琳站在中央。她穿着圣女的正式白袍。右翼没有被伪装——畸形的骨节在白晶大厅的冷光中清晰可见。"},
    {type:"narrator",text:"大长老站了起来。"},
    {type:"char",role:"npc",speaker:"大长老",text:"圣女赛琳·风行者。成年礼之日，你已符合献祭资格。风脉之心需要你的血——请上前。",charImg:Dazhanglao},
    {type:"narrator",text:"赛琳没有动，她抬头看着大长老。她的手缩在袖中——你能看到她的手指在微微颤抖。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"……大长老。",charImg:Celine},
    {type:"narrator",text:"她停顿了一下。整个议会厅安静得能听见风脉回廊的嗡鸣。"},
    {
      type:"auto",
      options:
      [
        {min:"60",max:"200",next:"chapter3_ceremony_alliance"},
        {min:"30",max:"60",next:"chapter3_ceremony_middle"},
        {max:"30",min:"-100",next:"chapter3_ceremony_isolated"}
      ]
    }
  ],

  chapter3_ceremony_alliance:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"我有一样东西要读给所有人听。",charImg:Celine},
    {type:"narrator",text:"她从袖中取出那份献祭记录。大长老的脸色变了。"},
    {type:"char",role:"npc",speaker:"大长老",text:"圣女殿下，这不是——这不是你该看的东西。",charImg:Dazhanglao},
    {type:"char",role:"npc",speaker:"赛琳",text:"第七十三次献祭。艾琳·风行者。我的母亲。她是被你们杀死的！你们以“神圣献祭”的名义，抽干了她的血，然后告诉我她是病死的。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"第七十四次。赛琳·风行者。预定时间——今天。",charImg:Celine},
    {type:"narrator",text:"旁听席哗然。信众们站起来，互相交头接耳，声音越来越大。"},
    {type:"narrator",text:"大长老挥手——守卫从两侧涌出。"},
    {type:"char",role:"npc",speaker:"大长老",text:"圣女殿下精神失常。带她下去。",charImg:Dazhanglao},
    {type:"narrator",text:"你站在赛琳面前。"},
    {type:"narrator",text:"旁听席上的底层羽人率先站起来，然后是更多人站了起来。守卫犹豫了。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我母亲是自愿的，但我不是。如果你们要献祭，就在所有人面前动手——让所有人都看到，你们到底是什么人。",charImg:Celine},
    {type:"narrator",text:"大长老的脸在抽动。守卫们面面相觑，没有人动手。"},
    {type:"narrator",text:"风脉之心在大厅外发出低沉的嗡鸣——那声音像某种远古的东西正在苏醒。"},
    {type:"jump",goto:"chapter3_end"}
  ],

  chapter3_ceremony_middle:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"……大长老。我有话要说。",charImg:Celine},
    {type:"narrator",text:"她停顿了一下。她的手从袖中伸出——但手里没有记录。她空着手站在那里。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我母亲艾琳·风行者。二十年前，她走进了风脉之心。她没有病死。她是被献祭的。",charImg:Celine},
    {type:"narrator",text:"旁听席上响起一片低语。"},
    {type:"char",role:"npc",speaker:"大长老",text:"圣女殿下，你在说什么？",charImg:Dazhanglao},
    {type:"char",role:"npc",speaker:"赛琳",text:"我在说真相！你们可以说我疯了，也可以说我在编造，但你们知道我说的是真的——因为二十年前你们也在场。",charImg:Celine},
    {type:"narrator",text:"她转过身，面对旁听席。她的右翼完全展开，畸形的骨节在所有人面前暴露。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我从小就被教导——圣女必须是完美的。但我的右翼是畸形的，所以我一直用魔法伪装它......就像你们用“神圣献祭”伪装谋杀。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我并不完美，我母亲的献祭也并不“神圣”。但如果你们要献祭——今天，就在这里，在所有人面前。我不逃，但我不会温和地走入那个良夜。",charImg:Celine},
    {type:"narrator",text:"大长老站起来。他的脸阴沉得可怕。"},
    {type:"char",role:"npc",speaker:"大长老",text:"守卫。带圣女殿下下去。她需要休息。",charImg:Dazhanglao},
    {type:"narrator",text:"守卫涌了上来。你站在人群中，看到赛琳被围住——她没有反抗，她只是站在那里，看着你。"},
    {type:"narrator",text:"她没有说话。但她的眼睛在问：“你看见了吗？”"},
    {type:"jump",goto:"chapter3_end"}
  ],

  chapter3_ceremony_isolated:
  [
    {type:"narrator",text:"赛琳站在中央，她抬头看着大长老。她试着张开嘴——但什么都没有说出来。"},
    {type:"char",role:"npc",speaker:"大长老",text:"圣女殿下？请上前。",charImg:Dazhanglao},
    {type:"narrator",text:"她沉默了很久，旁听席上开始有人窃窃私语。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"……我……",charImg:Celine},
    {type:"narrator",text:"她低下头。她的右翼在颤抖。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我……遵从长老会的安排。",charImg:Celine},
    {type:"narrator",text:"旁听席安静下来，大长老露出满意的表情。"},
    {type:"char",role:"npc",speaker:"大长老",text:"好，圣女殿下深明大义，成年礼继续。",charImg:Dazhanglao},
    {type:"narrator",text:"守卫上前，引导赛琳走向风脉之心的入口。她经过你身边时，没有看你。但你在她脸上看到了某种东西——空洞，像一盏被风吹灭的灯。"},
    {type:"jump",goto:"chapter3_end"}
  ],

  chapter3_end:
  [
    {type:"narrator",text:"成年礼结束后，风脉之心的嗡鸣在深夜达到顶峰。"},
    {type:"narrator",text:"你站在审判穹顶外的石阶上，看到裂纹从大厅的晶壁中蔓延出来——黑色的光像血一样渗入城市。"},
    {type:"narrator",text:"你是如此清晰地意识到，无论赛琳是否公开了真相，长老会都不会放过她。无论她是否反抗，风脉之心的污染都在扩散。"},
    {type:"narrator",text:"赛琳成人礼上的风波让你并不知道她被带去了哪里，你只能等待着后天长老会的消息。"},
    {type:"jump",goto:"freedom3"}
  ],

  chapter4:
  [
    {type:"title",chapter:"第四章",subtitle:"新天新地"},
    {type:"narrator",text:"长老会似乎有了新的消息，赶快前往审判穹顶看看吧。"},
    {type:"title",chapter:"序幕",subtitle:""},
    {type:"narrator",text:"成年礼结束后的第一个清晨。你站在风脉回廊入口，看着这座你曾经拼命想回来的城市。"},
    {type:"narrator",text:"风脉之心的嗡鸣已经持续了整夜，黑色的裂纹像血管一样从城市核心蔓延到街道、建筑、每一块白晶石。"},
    {type:"narrator",text:"长老会宣布全城进入紧急状态。审判穹顶的大门紧闭，守卫数量翻了三倍。"},
    {type:"narrator",text:"而赛琳——无论她在成年礼上做了什么——都被带走了。"},
    {type:"narrator",text:"风从云层间灌下来，带着一种你从未在这座城市闻到过的气味——像金属锈蚀，又像石头腐烂。那是风脉之心正在死去。"},
    {type:"title",chapter:"第一幕",subtitle:"风脉之心的崩落"},
    {type:"narrator",text:"你再次来到风脉之心大厅时，没有人拦你——守卫已经撤走了。长老会大概认为这座大厅已经没救了。"},
    {type:"narrator",text:"晶石比三天前更暗了。裂纹已经不再脉动，而是像静止的黑色河流一样嵌在晶石表面。"},
    {type:"narrator",text:"你走近时，晶石发出一声低沉的脆响——又一道裂纹从内部延伸出来。"},
    {type:"narrator",text:"大厅角落站着一个人，是赛琳的叔叔。他从地牢跑出来了——没有人管他，所有人都忙着逃命。"},
    {type:"char",role:"npc",speaker:"叔叔",text:"你来了。",charImg:Uncle},
    {type:"narrator",text:"他走到晶石前，抬起手。黑色结晶覆盖的掌心贴上了晶石表面。"},
    {type:"char",role:"npc",speaker:"叔叔",text:"二十年前你父亲就站在这里，试图阻止献祭，但后来他被流放了。三年前我站在这里，试图毁掉风脉之心，但后来我被关进了地牢。今天轮到你站在这里了。",charImg:""},
    {type:"narrator",text:"他转过头看你。"},
    {type:"char",role:"npc",speaker:"叔叔",text:"你想做什么？",charImg:Uncle},
    {
      type:"choice",
      options:
      [
        {label:"我要带赛琳离开。",next:"chapter4_uncle_a"},
        {label:"我要毁掉风脉之心。",next:"chapter4_uncle_b"},
        {label:"我要去地底。去找锁神装置。",next:"chapter4_uncle_c"}
      ]
    }
  ],

  chapter4_uncle_a:
  [
    {type:"char",role:"npc",speaker:"叔叔",text:"带她离开？你以为她还在审判穹顶的地牢里？不——成年礼之后，长老会把所有“不稳定因素”都带到了风脉之心底层。他们要把她们当燃料。",charImg:Uncle},
    {type:"char",role:"npc",speaker:"叔叔",text:"你想救她，就得下去。但风脉之心底层……那地方比污染区还危险。",charImg:Uncle},
    {type:"narrator",text:"获得状态【赛琳的位置】。"},
    {type:"effect",flags:{celineLocated:true},addStatuses:["赛琳的位置"]},
    {type:"jump",goto:"chapter4_bottom"}
  ],

  chapter4_uncle_b:
  [
    {type:"char",role:"npc",speaker:"叔叔",text:"毁掉它？你知道那意味着什么吗？",charImg:Uncle},
    {type:"char",role:"npc",speaker:"叔叔",text:"风脉之心是天空之城的动力核心。毁掉它——整座城市会坠落。城里所有人都得死。",charImg:Uncle},
    {type:"narrator",text:"他沉默了一会儿。"},
    {type:"char",role:"npc",speaker:"叔叔",text:"但你如果真想这么做……我倒是知道一个地方。试翼塔的暗格里有一份我哥留下的图纸。他设计了一个“反向回路”——可以让风脉之心在坠落前把能量全部释放出去，减少伤亡。",charImg:Uncle},
    {type:"narrator",text:"获得情报【反向回路】。"},
    {type:"effect",flags:{reverseCircuitIntel:true},addIntels:["反向回路"]},
    {type:"char",role:"npc",speaker:"叔叔",text:"但在你前往试翼之塔之前，我认为我们应该先去确认赛琳的状态。",charImg:Uncle},
    {type:"jump",goto:"chapter4_bottom"}
  ],

  chapter4_uncle_c:
  [
    {type:"narrator",text:"叔叔看着你。他的表情没有变化——但你感觉到他一直在等这句话。"},
    {type:"char",role:"npc",speaker:"叔叔",text:"我哥花了二十年找那个装置。他进去了，然后被污染了。你确定你能做到他做不到的事？",charImg:Uncle},
    {type:"char",role:"player",speaker:"你",text:"我会做到。",charImg:playerImg},
    {type:"char",role:"npc",speaker:"叔叔",text:"……那走吧。我知道入口在哪，我们先去找赛琳。",charImg:Uncle},
    {type:"jump",goto:"chapter4_bottom"}
  ],

  chapter4_bottom:
  [
    {type:"title",chapter:"第二幕",subtitle:"风脉之心底层"},
    {type:"narrator",text:"这里是风脉之心底层，这里没有光——只有从上方渗下来的幽暗蓝色。"},
    {type:"narrator",text:"空气中有一种尖锐的嗡鸣，像无数细小的针在耳膜上穿刺。"},
    {type:"narrator",text:"地面上覆盖着一层薄薄的黑色结晶，踩上去会发出碎裂的脆响。"},
    {type:"narrator",text:"赛琳被绑在一根晶石柱上。她的圣女白袍被剥去了，只剩下灰色的贴身衣物。"},
    {type:"narrator",text:"右翼完全暴露在外——畸形的骨节比以往任何时候都更清晰。她的脸上有干涸的血痕，但她的眼睛是睁开的。"},
    {type:"narrator",text:"她看到你，笑了。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"你来了。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我还以为……你不会来。",charImg:Celine},
    {type:"narrator",text:"她没有哭，只是看着你，目光很稳。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"长老会说要把我当燃料......他们说风脉之心需要“最后的献祭”——不止是血，而是生命本身。整座城市的人都在指望我死。",charImg:Celine},
    {type:"narrator",text:"她抬起头看向上方，风脉之心的裂纹正在她的头顶蔓延，蓝光从裂缝中渗出。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"但我现在知道了。我母亲死的时候，也是在这里。她也同样看过这些裂纹。",charImg:Celine},
    {type:"narrator",text:"她转过头看你。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"你打算怎么做？",charImg:Celine},
    {
      type:"choice",
      options:
      [
        {label:"我带你走。现在就走。",next:"chapter4_celine_a"},
        {label:"我要毁掉风脉之心。这座城早就该坠落。",next:"chapter4_celine_b"},
        {label:"我要去地底。找到锁神装置。",next:"chapter4_celine_c"}
      ]
    }
  ],

  chapter4_celine_a:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"走？走到哪去？",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"天空之城是我的家。如果它坠落了，我能去哪？帝国？精灵？地底？",charImg:Celine},
    {type:"narrator",text:"她摇了摇头。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我不走。但我有一个请求。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"风脉之心下面还有一个装置。我父亲……你父亲……他们都知道。那才是污染真正的源头。如果你能毁掉它，风脉之心也许还有救。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我在母亲的日记本里看见过，摧毁一切的办法就在试翼之塔......快去。",charImg:Celine},
    {type:"jump",goto:"chapter4_tower"}
  ],

  chapter4_celine_b:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"你知道你在说什么吗？",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"这里是几千个人的家。有穷人，有富人，有剪断翅膀的底层羽人，有卖晶石鸟的老人。他们什么都没做错。他们只是生在这座城里。",charImg:Celine},
    {type:"narrator",text:"她深吸一口气。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"但如果你真的这么决定了……我不会拦你。我的母亲死在这座城里，我恨它，但我没有你那种勇气。",charImg:Celine},
    {type:"jump",goto:"chapter4_tower"}
  ],

  chapter4_celine_c:
  [
    {type:"char",role:"npc",speaker:"赛琳",text:"地底……",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"我母亲的声音就是从那里来的，她说“地底有钥匙，要去试翼之塔”。你要去那里找那个东西？",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"那你去吧，我会留在这里。如果风脉之心彻底裂开了——至少有人陪它到最后。",charImg:Celine},
    {type:"jump",goto:"chapter4_tower"}
  ],

  chapter4_tower:
  [
    {type:"title",chapter:"第三幕",subtitle:"试翼之塔暗格"},
    {type:"narrator",text:"你来到试翼之塔，塔顶的暗格还在——赛琳的血能打开它，但你没有她的血。"},
    {type:"narrator",text:"你看着那个封存的暗格，不知道该怎么做。"},
    {type:"narrator",text:"然后你想起了一件事，是赛琳的叔叔曾经告诉过你的——试翼之塔的暗格不是只有一种打开方式。"},
    {type:"narrator",text:"古羽人的设计者给“不擅长飞行的人”留了通道。同样，他们也给“没有翅膀的人”留了钥匙。"},
    {type:"narrator",text:"于是你走到塔顶边缘，摸到了石壁上的一道极细的刻痕。你用力按下去——暗格发出了一声轻响，缓缓滑开。"},
    {type:"narrator",text:"暗格里有两样东西。一卷泛黄的图纸——那是【反向回路】的设计图。还有一封信。信封上写着：“给赛琳”。"},
    {
      type:"choice",
      options:
      [
        {label:"打开信读。",next:"chapter4_letter"},
        {label:"拿起图纸，合上暗格。",next:"chapter4_letter_skip"}
      ]
    }
  ],

  chapter4_letter:
  [
    {type:"narrator",text:"信上是艾德蒙的字迹。他在二十年前写下了这封信。"},
    {type:"narrator",text:"赛琳：\n如果你看到这封信，说明我失败了。风脉之心还在运转，艾琳还在“沉睡”。\n\n你母亲想让你活下去，她希望你离开这座城。但我做不到——因为真相需要被留下来。所以我留下了这份图纸。\n\n如果有一天你发现真相，不要怕。这座城不值得你为它死。但如果有人愿意为你而死——那个人才是你应该留下的人。\n\n我见过那种眼神。艾琳见过我这种眼神。我希望你也能遇到。\n\n——艾德蒙·风行者"},
    {type:"narrator",text:"获得【艾德蒙的信】。\n获得【反向回路设计】。\n赛琳好感+10。"},
    {type:"effect",affection:10,flags:{edmundLetter:true,reverseCircuit:true},addItems:{edmundLetter:1,reverseCircuit:1}},
    {type:"jump",goto:"chapter4_father"}
  ],

  chapter4_letter_skip:
  [
    {type:"narrator",text:"你没有打开信，把图纸收好，合上暗格。信被留在了里面——也许赛琳有一天会自己来拿。"},
    {type:"narrator",text:"获得【反向回路设计图】。"},
    {type:"effect",flags:{reverseCircuit:true},addItems:{reverseCircuit:1}},
    {type:"jump",goto:"chapter4_father"}
  ],

  chapter4_father:
  [
    {type:"title",chapter:"第四幕",subtitle:"父亲的真相"},
    {type:"narrator",text:"当你走出试翼之塔时，天色已经彻底暗了。风脉之心的嗡鸣变成了持续的低频震动——像某种巨大的东西正在缓慢地、不可阻挡地苏醒。"},
    {type:"narrator",text:"你独自走在空无一人的街道上，然后，你看到了他。"},
    {type:"narrator",text:"一个身影坐在风脉回廊的边缘，他的翅膀收拢在背后——右翼残缺，左翼布满黑色结晶。半边脸覆盖着和风脉之心一样的黑色纹路。"},
    {type:"narrator",text:"你认出来了，是艾德蒙，你的父亲。"},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"你终于走到这一步了。",charImg:Edmund},
    {type:"narrator",text:"他没有回头，声音沙哑，像是很久没有说过话。"},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"我听说你回来了，我一直在等你找到这里，你比我想象的快一些——但比我期望的又慢一点。",charImg:Edmund},
    {type:"narrator",text:"他转过头看你。他的眼睛和你一样——深色，锐利，像是能看穿谎言。"},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"赛琳的母亲……是我最好的朋友。我们从小一起长大，一起在风脉回廊底层玩耍，一起偷看长老会的档案。她是唯一一个在我被所有人排斥时还愿意和我说话的人。",charImg:Edmund},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"二十年前，她走进风脉之心。她告诉我：“如果这是让城市活下去的代价，我愿意。”我站在角落里，看着她被绑上祭坛。我没有办法阻止她——因为她说那是她的选择。",charImg:Edmund},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"然后我花了二十年在锁神装置里寻找让她回来的方法。我失败了，但我找到了真相——关于索尔温，关于天空之城，关于一切。",charImg:Edmund},
    {type:"narrator",text:"他站起身。他的翅膀在夜风中微微张开——畸形的骨节在月光下投下扭曲的影子。"},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"现在轮到你了，赛琳明天就会被献祭。你是要救她——还是像当年我一样，站在角落里看着？",charImg:Edmund},
    {
      type:"choice",
      options:
      [
        {label:"我会救她。",next:"chapter4_father_a"},
        {label:"我要毁掉锁神装置。",next:"chapter4_father_b"},
        {label:"你为什么不自己救她？",next:"chapter4_father_c"}
      ]
    }
  ],

  chapter4_father_a:
  [
    {type:"char",role:"npc",speaker:"艾德蒙",text:"好。",charImg:Edmund},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"那你要知道一件事——锁神装置可以救她，但需要一个人代替她成为封印，你愿意吗？",charImg:Edmund},
    {type:"narrator",text:"获得关键情报【献祭的替代方案】。"},
    {type:"effect",flags:{sacrificeAlternative:true},addIntels:["献祭的替代方案"]},
    {type:"jump",goto:"chapter4_father_final"}
  ],

  chapter4_father_b:
  [
    {type:"char",role:"npc",speaker:"艾德蒙",text:"毁掉它？你知道那意味着什么吗？",charImg:Edmund},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"索尔温会被释放......祂已经疯了——祂已经被囚禁了三千年，三千年的囚禁让祂只剩下恨。祂会毁灭一切，天空之城、帝国、精灵、地精——所有你认识的人都会死。",charImg:Edmund},
    {type:"narrator",text:"他停顿了一下。"},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"但如果你真的这么决定了……我不会拦你。我花了二十年想毁掉那个东西，我没有做到，你也许可以。",charImg:Edmund},
    {type:"narrator",text:"获得关键情报【锁神装置的弱点】。"},
    {type:"effect",flags:{godLockWeakness:true},addIntels:["锁神装置的弱点"]},
    {type:"jump",goto:"chapter4_father_final"}
  ],

  chapter4_father_c:
  [
    {type:"narrator",text:"艾德蒙沉默了很久。"},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"因为我做不到。",charImg:Edmund},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"二十年前我站在这里，看着她走进祭坛。我告诉自己——她选择了这条路，我尊重她。但我每天晚上都在想——如果当时我拉住她，她会不会恨我？还是会活下来？",charImg:Edmund},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"我不知道答案，所以我流放了我自己。我把自己关在锁神装置里，研究了二十年，试图找到一条不用任何人牺牲的路。",charImg:Edmund},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"我失败了。所以现在轮到你了。",charImg:Edmund},
    {type:"jump",goto:"chapter4_father_final"}
  ],

  chapter4_father_final:
  [
    {type:"narrator",text:"艾德蒙又走近一步，他的目光很沉。"},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"你会怎么做？对于我这个始作俑者，不称职的父亲，你又要怎么办呢？",charImg:""},
    {
      type:"choice",
      options:
      [
        {label:"弑父",next:"chapter4_killfather"},
        {label:"与他合作。",next:"chapter4_cooperate"},
        {label:"放他走。",next:"chapter4_letgo"}
      ]
    }
  ],

  chapter4_killfather:
  [
    {type:"narrator",text:"你拔出武器，艾德蒙没有躲。他看着你，眼神里没有恐惧——只有一种奇怪的释然。"},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"你比我更勇敢。",charImg:Edmund},
    {type:"narrator",text:"你动手了，他倒在风脉回廊的边缘，残缺的翅膀在月光下最后一次展开。"},
    {type:"narrator",text:"你从他身上取走了一根【染血的羽毛】。那上面有他留下的最后一句话——用血写成的：“告诉她，她母亲是笑着走的。”"},
    {type:"narrator",text:"获得成就物品【染血的羽毛】。\n所有同伴好感+15。\n主线进入终局。"},
    {type:"effect",affection:15,companionAffection:15,flags:{fatherFate:"kill"},addItems:{bloodFeather:1}},
    {type:"jump",goto:"chapter4_final_choice"}
  ],

  chapter4_cooperate:
  [
    {type:"narrator",text:"你伸出手。他看着你的手，沉默了很久。然后他握住了。"},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"好。",charImg:Edmund},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"那我们一起下去。我带你去找那个装置。但你要答应我一件事——如果到时候必须选择，不要为了我犹豫。",charImg:Edmund},
    {type:"narrator",text:"获得状态【父亲的同行】。\n主线进入终局。\n所有同伴好感-30——他们视你为背叛者。"},
    {type:"effect",affection:-30,companionAffection:-30,flags:{fatherFate:"cooperate",fatherCompanion:true},addStatuses:["父亲的同行"]},
    {type:"jump",goto:"chapter4_final_choice"}
  ],

  chapter4_letgo:
  [
    {type:"narrator",text:"你退后一步，指向风脉回廊的出口。他看了你很久。"},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"你要放我走？",charImg:Edmund},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"你很聪明。但你也会付出代价——赛琳不会原谅你，四族也同样不会。",charImg:Edmund},
    {type:"narrator",text:"他转身消失在了回廊深处。你站在原地没有动，风从云层间灌下来。"},
    {type:"narrator",text:"你听到他的声音从远处传来——极其微弱。"},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"谢谢你。",charImg:Edmund},
    {type:"narrator",text:"获得【父亲的护符】。\n所有同伴好感-5。\n主线进入终局。"},
    {type:"effect",affection:-5,companionAffection:-5,flags:{fatherFate:"release",fatherTalisman:true},addItems:{fatherTalisman:1}},
    {type:"jump",goto:"chapter4_final_choice"}
  ],

  chapter4_final_choice:
  [
    {type:"title",chapter:"第五幕",subtitle:"终局献祭抉择"},
    {type:"narrator",text:"你站在锁神装置前，巨大的黑色晶石柱阵矗立在地下深处的巨大空腔中。"},
    {type:"narrator",text:"神明索尔温的碎片在晶柱中蠕动——像无数挣扎的影子。"},
    {type:"narrator",text:"装置有一个核心缺口，修复它——或者摧毁它——需要一个人的意识作为“锚点”。装置会吞噬这个人。但也会因为这个人而改变。"},
    {type:"narrator",text:"你身后站着你的同伴。所以你不能后退。"},
    {type:"narrator",text:"终局之日。你究竟会选择亲近的同伴，失序的正义，还是自我的野心？"},
    {
      type:"choice",
      options:
      [
        {label:"献祭自己。",next:"ending_self",requiresFlag:"sacrificeAlternative",requiresFlagText:"献祭的替代方案"},
        {label:"拒绝替代，让赛琳献祭。",next:"ending_celine"},
        {label:"拒绝献祭，摧毁装置。",next:"ending_destroy"}
      ]
    }
  ],

  ending_self:
  [
    {type:"narrator",text:"你走向装置核心，你听到赛琳在身后喊你的名字，但你没有回头。"},
    {type:"narrator",text:"你把手放在核心缺口上，黑色光芒包裹了你。然后你感觉到——索尔温的碎片在触碰你。"},
    {type:"narrator",text:"它轻柔地问你：“你愿意承载我吗？”"},
    {type:"char",role:"player",speaker:"你",text:"……我愿意。",charImg:playerImg},
    {type:"narrator",text:"光芒瞬间吞没了你。你的意识被拉入一个巨大的、黑暗的空间。"},
    {type:"narrator",text:"你看到了索尔温——不是那个疯狂的神，而是一个蜷缩在黑暗中的、疲惫的轮廓。祂看着你，声音像远方的风。"},
    {type:"char",role:"npc",speaker:"索尔温",text:"你来了。",charImg:Sorwin},
    {type:"char",role:"npc",speaker:"索尔温",text:"三千年了，没有人愿意承载我。他们都想利用我，抽取我，囚禁我，杀死我。你是第一个问我想不想被释放的人。",charImg:Sorwin},
    {type:"narrator",text:"你的意识融入了祂，污染停止了，天空之城的裂纹开始愈合。世界重新恢复了平衡。"},
    {type:"narrator",text:"但你不再是人了——你是索尔温的新载体。一个行走在晶化与血肉之间的存在。"},
    {type:"cg",bg:"../images/skyending/1.jpg",text:"你从锁神装置中走出。塞琳站在远处。她想跑过来——但你的身体在发光。你伸出手，她没有握。"},
    {type:"narrator",text:"【结局：羽蚀共生】\n特殊结局\n成就解锁：【羽蚀共生·天空之城】"},
    {type:"choice",options:[{label:"返回游戏主菜单",next:"end"}]}
  ],

  ending_celine:
  [
    {type:"narrator",text:"你看向赛琳，她看着你，点了一下头，谁都没有说话。"},
    {type:"narrator",text:"她走向装置核心，你看着她，她也没有回头。"},
    {type:"narrator",text:"她的身影被光芒吞没，锁神装置停止了震动，污染从天空之城的裂纹中退去。"},
    {type:"narrator",text:"风脉之心重新亮起蓝色的光。"},
    {type:"narrator",text:"她成了新的封印。她的意识融入了索尔温的碎片中——她重新成了那个被囚禁的神。"},
    {type:"cg",bg:"../images/skyending/2.jpg",text:"你站在风脉之心大厅，风脉之心恢复了光芒，赛琳不在了，但她的右翼——畸形的骨节——被刻在晶石表面。像一幅画，像一座墓碑。"},
    {type:"narrator",text:"你走出审判穹顶，天空之城的街道上有人在欢呼，城市获救了，但他们不知道是谁做的。"},
    {type:"narrator",text:"你抬起头，天空很蓝，风从云层间灌下来。你听到一个声音——极其微弱的，像远方的风。你知道，那是赛琳在说话。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"……别哭。我母亲是笑着走的，我也是。",charImg:Celine},
    {type:"narrator",text:"【结局：永恒囚徒】\n牺牲结局\n成就解锁：【永恒囚徒·天空之城】"},
    {type:"choice",options:[{label:"返回游戏主菜单",next:"end"}]}
  ],

  ending_destroy:
  [
    {type:"narrator",text:"你举起武器，砸向装置核心。黑色的晶石碎裂，索尔温的碎片从裂缝中涌出，凝成一只可怕的巨兽。"},
    {type:"narrator",text:"【进入最终战斗系统】"},
    {
      type:"choice",
      options:
      [
        {label:"战斗胜利",next:"ending_destroy_win"},
        {label:"战斗失败",next:"ending_destroy_lose"}
      ]
    }
  ],

  ending_destroy_win:
  [
    {type:"narrator",text:"你们打败了巨兽，索尔温的碎片从裂缝中涌出——然后开始消散。"},
    {type:"narrator",text:"你听到一个声音——极其微弱的，像远方的风。那是索尔温在说话：“……谢谢。”"},
    {type:"narrator",text:"污染停止了，但风脉之心也失去了能量来源，天空之城开始倾斜——缓慢地、不可阻挡地向下坠落。"},
    {type:"narrator",text:"赛琳从底层跑出来，她站在你身边，看着风脉之心逐渐暗淡。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我们得走，现在。",charImg:Celine},
    {type:"narrator",text:"你摇头，指向城市，指向那些还在街道上奔跑的底层羽人——他们同样没有翅膀，他们跑不快。"},
    {type:"narrator",text:"赛琳看着你，她懂了。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"你想让我留下来。",charImg:Celine},
    {type:"narrator",text:"她深吸一口气。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"好，但我需要一个条件——你留下来陪我。",charImg:Celine},
    {type:"narrator",text:"你们一起启动了反向回路。风脉之心的能量被释放到全城——不是维持悬浮，而是托住坠落的城市，让它缓慢地、安全地降落到地面。"},
    {type:"narrator",text:"天空之城不再漂浮，它变成了一座地面城市。白晶石在泥土中扎下根，风脉回廊变成了河流，云脉集市变成了集市。"},
    {type:"narrator",text:"赛琳站在城市中央，她摘下了圣女的头衔。她不再是“圣女赛琳”，她只是赛琳。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"这座城欠我母亲一条命。但它不欠我的。我母亲希望我活下去——那我就活下去。但我要带着这座城一起活。",charImg:Celine},
    {type:"cg",bg:"../images/skyending/3.jpg",text:"天空之城坐落在群山之间。赛琳站在城门口，右翼在阳光下舒展。她看着远方的路——你正从那条路上走来。她笑了。"},
    {type:"narrator",text:"【结局：承天之翼】\n天空之城线最佳结局\n成就解锁：【承天之翼】"},
    {type:"choice",options:[{label:"返回游戏主菜单",next:"end"}]}
  ],

  ending_destroy_fall:
  [
    {type:"narrator",text:"你们打败了巨兽，索尔温的碎片从裂缝中涌出——然后开始消散。"},
    {type:"narrator",text:"污染停止了，但风脉之心也失去了能量来源，天空之城开始坠落。"},
    {type:"narrator",text:"你转身离开，赛琳跟在你身后，她什么都没有说。"},
    {type:"narrator",text:"你站在悬崖边缘，看着整座城市缓慢地、安静地向下坠落。云层吞没了它，像吞入一艘沉入海底的船。"},
    {type:"narrator",text:"赛琳站在你身边，看着自己的家消失。她的表情很平静——太平静了。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"我从没想过会看到这一天。",charImg:Celine},
    {type:"char",role:"npc",speaker:"赛琳",text:"但你说得对，这座城建立在谎言上，而谎言迟早会塌。",charImg:Celine},
    {type:"narrator",text:"她转过身看你。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"现在我们去哪？",charImg:Celine},
    {type:"narrator",text:"你没有回答。因为你也不知道。但你知道一件事——她跟着你，无论去哪。"},
    {type:"cg",bg:"../images/skyending/4.jpg",text:"你和赛琳走在一条无名的路上，背后是空荡荡的天空。没有城市，没有翅膀，没有圣女。只有两个不完整的人，走着一条没有目的地的路。"},
    {type:"narrator",text:"【结局：坠落之城】\n悲情结局\n成就解锁：【坠落之城】"},
    {type:"choice",options:[{label:"返回游戏主菜单",next:"end"}]}
  ],

  ending_destroy_lose:
  [
    {type:"narrator",text:"眼看就要被巨兽吞没，赛琳最终还是选择了献祭。"},
    {type:"narrator",text:"你们打败了巨兽，索尔温的碎片从裂缝中涌出——然后开始消散。"},
    {type:"char",role:"npc",speaker:"索尔温",text:"……谢谢。",charImg:""},
    {type:"narrator",text:"污染停止了，但索尔温消失了，不只是祂——所有从祂身上抽取的能量都消失了。"},
    {type:"narrator",text:"风脉之心彻底熄灭，符文科技全部失效，古树的根脉枯萎，熔岩炉冷却。"},
    {type:"narrator",text:"四族失去了能源。世界进入了一个新的时代——没有魔法，没有符文，没有风脉。只有人类、精灵、地精、羽人——和他们的双手。"},
    {type:"cg",bg:"../images/skyending/5.jpg",text:"多年后。你站在一片废墟上。远处有人在耕作。有人在建造。没有翅膀的羽人在用绳索攀爬，没有符文的人类在点着火把。世界很安静。"},
    {type:"narrator",text:"但你活下来了。所有人都活下来了——用自己的方式。"},
    {type:"narrator",text:"索尔温死了，但祂的死亡给世界留下了最后一份礼物——自由。"},
    {type:"narrator",text:"没有神的世界，没有奇迹的世界，但也没有囚禁，献祭和偏见的世界。"},
    {type:"narrator",text:"【结局：拂晓的消散】\n新时代结局\n成就解锁：【拂晓的消散·天空之城】"},
    {type:"choice",options:[{label:"返回游戏主菜单",next:"end"}]}
  ],

  ending_father:
  [
    {type:"narrator",text:"你举起武器，砸向装置核心。黑色的晶石碎裂，索尔温的碎片从裂缝中涌出。"},
    {type:"narrator",text:"但碎片没有消散，它们涌向了一个方向。你的父亲站在装置边缘，张开双臂。"},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"索尔温。我来了。",charImg:""},
    {type:"narrator",text:"碎片涌入他的身体。他的翅膀完全展开——左翼上的黑色结晶蔓延到全身。他的眼睛变成了金色。他的声音不再是他的声音。"},
    {type:"char",role:"npc",speaker:"索尔温",text:"你囚禁了我三千年，但现在——你成了我。",charImg:""},
    {type:"narrator",text:"艾德蒙——或者说索尔温——转过身看你。祂伸出了手，你握住了。"},
    {type:"narrator",text:"你们一起走出装置。天空之城的裂纹开始愈合，污染停止，但你的父亲——他不再是你的父亲了，他是索尔温的载体，一个行走在世界上的神。"},
    {type:"cg",bg:"../images/skyending/6.jpg",text:"你和艾德蒙站在风脉回廊的边缘。他——或者说祂——看着远方的云层。他的声音是两个人的声音叠加在一起。"},
    {type:"char",role:"npc",speaker:"艾德蒙",text:"你自由了，你可以去做你想做的事，我会看着你的。",charImg:""},
    {type:"narrator",text:"你转身离开，背后是那个不再是你父亲的人。但你知道——他还在里面。在某个地方。而你们谁也不知道这个神明被放出来后将会成就怎样的新世界。"},
    {type:"narrator",text:"【结局：父与子】\n黑暗结局\n成就解锁：【父与子·天空之城】"},
    {type:"choice",options:[{label:"返回游戏主菜单",next:"end"}]}
  ],

  ending_four_clans:
  [
    {type:"narrator",text:"你举起武器，砸向装置核心。黑色的晶石碎裂，索尔温的碎片从裂缝中涌出，凝成一只可怕的巨兽。"},
    {type:"narrator",text:"你们打败了巨兽，索尔温的碎片从裂缝中涌出——然后开始消散。"},
    {type:"narrator",text:"污染停止了，世界恢复了平静，但索尔温的消失留下了真空——四族之间的平衡被打破了。"},
    {type:"narrator",text:"你站在废墟驿站，四位同伴站在你身后。赛琳、奥德里克、艾拉瑞亚、格里姆。他们来自四个不同的阵营——但他们站在同一边。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"天空之城失去了悬浮，但它还活着。",charImg:Celine},
    {type:"char",role:"npc",speaker:"奥德里克",text:"帝国失去了符文能源，但技术还在。",charImg:""},
    {type:"char",role:"npc",speaker:"艾拉瑞亚",text:"森林失去了根脉共鸣，但树还在生长。",charImg:""},
    {type:"char",role:"npc",speaker:"格里姆",text:"地底失去了熔岩炉，但我们还有双手。",charImg:""},
    {type:"narrator",text:"他们看着你。"},
    {type:"char",role:"npc",speaker:"赛琳",text:"你说吧。我们该怎么做？",charImg:Celine},
    {type:"char",role:"player",speaker:"我",text:"四族盟约。",charImg:playerImg},
    {type:"narrator",text:"四族代表在废墟驿站签署了盟约。没有神，没有献祭，没有囚禁。只有四个种族——各自残缺，各自完整。"},
    {type:"cg",bg:"../images/skyending/7.jpg",text:"多年后。废墟驿站变成了一座城市。四族的人在这里交易、生活、通婚。"},
    {type:"narrator",text:"城市中央有一座雕像——一个没有翅膀的人，站在四个种族的代表中间。"},
    {type:"narrator",text:"底座上刻着：“无翼者，连接大地与天空。”"},
    {type:"narrator",text:"【结局：四族盟约】\n隐藏最佳结局\n成就解锁：【四族盟约·天空之城】"},
    {type:"choice",options:[{label:"返回游戏主菜单",next:"end"}]}
  ],

  ending_hero:
  [
    {type:"narrator",text:"你们打败了巨兽，索尔温的碎片从裂缝中涌出——然后开始消散。"},
    {type:"narrator",text:"污染停止了，天空之城保住了，但没有人知道是你做的。没有同伴站在你身后，没有城市为你欢呼，没有史书记载你的名字。"},
    {type:"narrator",text:"你走出锁神装置，风脉之心的裂纹在愈合，羽人在各自庆祝——他们以为是自己拯救了世界。"},
    {type:"narrator",text:"你站在城门外，脱下斗篷，赤脚走向远方。"},
    {type:"cg",bg:"../images/skyending/8.jpg",text:"一个无名的背影走在无名的路上，背后是天空之城庆祝的烟火，没有人看他，也没有人知道他的名字。"},
    {type:"narrator",text:"【结局：无名英雄】\n悲情结局\n成就解锁：【无名英雄·天空之城】"},
    {type:"choice",options:[{label:"返回游戏主菜单",next:"end"}]}
  ],

  ending_unchanged:
  [
    {type:"narrator",text:"不符合以上所有条件，污染没能成功解决，一切仍旧按着神秘商人所预言的那样前行。"},
    {type:"narrator",text:"【结局：未变之局】\n成就解锁：【未变之局·天空之城】"},
    {type:"choice",options:[{label:"返回游戏主菜单",next:"end"}]}
  ]
};

/* 物品/状态 */
function normalizeNodeItems(nodeName, items)
{
  const result = [];
  items.forEach(function (rawItem)
  {
    const item = {...rawItem};
    if (item.type === "jump")
    {
      if (item.goto === "mainmap") item.goto = "mainmap_1";
      if (item.goto === "firstfreedom") item.goto = "freedom1";
    }

    result.push(item);
  });
  return result;
}

function normalizeNodes(raw)
{
  const result = {};
  Object.entries(raw).forEach(function ([rawName, rawItems])
  {
    let name = rawName;
    if (name === "firstfreedom") name = "freedom1";
    if (name === "mainmap") name = "mainmap_1";
    result[name] = normalizeNodeItems(name, rawItems);
  });

  /* 自由行动结束 */
  result.mainmap_1 =
  [
    {
      type:"freedomEnd",
      day:1,
      next:"chapter2"
    }
  ];

  result.mainmap_2 =
  [
    {
      type:"freedomEnd",
      day:2,
      next:"chapter3"
    }
  ];

  result.mainmap_3 =
  [
    {
      type:"freedomEnd",
      day:3,
      next:"chapter4"
    }
  ];

  /* 城门硬闯接 game3 */
  result.chapter1_a2 =
  [
    {
      type:"narrator",
      text:"你没有停下脚步。下一瞬间，两名守卫同时拔出武器，战斗一触即发。"
    },
    {
      type:"battle",
      id:"sky_gate",
      success:"chapter1_a2_success",
      fail:"chapter1_a2_fail",
      url:"game3.html?mode=sky"
    }
  ];

  /* 潜入穹顶接 game4 */
  const originalInfiltration = normalizeNodeItems("chapter2_infiltration",RAW_NODES.chapter2_infiltration);

  result.chapter2_infiltration =
  [
    originalInfiltration[0],
    originalInfiltration[1],
    {
      type:"infiltration",
      id:"sky_infiltration",
      success:"chapter2_infiltration_success",
      fail:"chapter2_infiltration_fail",
      url:"game4.html?mode=sky"
    }
  ];

  result.chapter2_infiltration_success = originalInfiltration.slice(2);

  result.chapter2_infiltration_fail =
  [
    {
      type:"narrator",
      text:"你在潜入途中被守卫发现，只能暂时撤出审判穹顶。所幸守卫并没有认出你的身份，你仍然还有再次潜入的机会。"
    },
    {
      type:"choice",
      options:
      [
        {
          label:"再次尝试潜入",
          next:"chapter2_infiltration"
        }
      ]
    }
  ];

  /* 成年礼按已经锁定的路线走 */
  const ceremony = result.chapter3_ceremony;
  ceremony[ceremony.length - 1] =
  {
    type:"flagauto",
    flag:"celineRoute",
    routes:
    {
      alliance:"chapter3_ceremony_alliance",
      middle:"chapter3_ceremony_middle",
      isolated:"chapter3_ceremony_isolated"
    },
    default:"chapter3_ceremony_middle"
  };

  /* 终局“摧毁装置”判定：先检查结局六，再进入最终战斗。 */
  result.ending_destroy =
  [
    {
      type:"flagauto",
      flag:"fatherFate",
      routes:{cooperate:"ending_father"},
      default:"ending_destroy_battle"
    }
  ];

  result.ending_destroy_battle =
  [
    {
      type:"narrator",
      text:"你举起武器，砸向装置核心。黑色的晶石碎裂，索尔温的碎片从裂缝中涌出，凝成一只可怕的巨兽。"
    },
    {
      type:"narrator",
      text:"进入最终战斗。"
    },
    {
      type:"battle",
      id:"sky_final",
      success:"ending_destroy_resolve_win",
      fail:"ending_destroy_resolve_lose",
      url:"game3.html?mode=sky"
    }
  ];

  result.ending_destroy_resolve_win =
  [
    {type:"endingauto",battleWon:true}
  ];

  result.ending_destroy_resolve_lose =
  [
    {type:"endingauto",battleWon:false}
  ];
  return result;
}

const nodes = normalizeNodes(RAW_NODES);

/* ==================== 存档恢复 ==================== */
if (save && save.story === "sky" &&(
    mode === "continue" || navigationType === "reload" || navigationType === "back_forward"
  ))
{
  currentNode = save.node;
  pos = save.index;
  haogandu = Number(save.haogandu ?? 5);
}

/* ==================== 从自由地图返回 ==================== */
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
  currentNode = fromNodeMap[from] ?? "loc_sky_" + from;
  pos = 0;
  freedomDay = cnt;
  skyFlags.freedomDay = freedomDay;
  skyFlags.freedomTime = time;
  saveSkyFlags();
  if (save && save.story === "sky") haogandu = Number(save.haogandu ?? 5);
  /* from 只消费一次，避免刷新跳回自由行动最后节点 */
  const url = new URL(window.location.href);
  url.searchParams.delete("from");
  history.replaceState(null, "", url.pathname + url.search);
}

/* ==================== 游戏返回 ==================== */
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
  if (!raw || rawResult === null) return false;
  try
  {
    const pending = JSON.parse(raw);
    if (pending.bg && !currentBackground)
    {
      currentBackground = pending.bg;
      storyBg.style.backgroundImage = `url("${pending.bg}")`;
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
  catch (error)
  {
    console.error(error);
    sessionStorage.removeItem(storageKey);
    return false;
  }
}

let resultResolved = false;

/* game4 返回 */
if (game4Result !== null)
{
  resultResolved = resolvePendingResult("sky_pending_infiltration",game4Result);
  const url = new URL(window.location.href);
  url.searchParams.delete("game4Result");
  history.replaceState(null, "", url.pathname + url.search);
}

/* game3 返回 */
const battleResult = iswin3 !== null ? iswin3 : battleResultParam;

if (!resultResolved && battleResult !== null)
{
  let battleId = null;
  try
  {
    const pendingRaw = sessionStorage.getItem("sky_pending_battle");
    if (pendingRaw) battleId = JSON.parse(pendingRaw).id || null;
  }
  catch (error) {}

  const hpNum = hpParam !== null ? Number(hpParam) : null;
  const isFinalBattle = ["sky_final","final","forest_final","final_battle"].indexOf(battleId) !== -1;
  const isNoLossBattle = battleId === "haggle";

  if (hpNum !== null && hpNum <= 0 && !isFinalBattle && !isNoLossBattle)
  {
    sessionStorage.removeItem("sky_pending_battle");
    currentNode = "ending_unchanged";
    pos = 0;
    resultResolved = true;
    skyFlags.hp = MAX_HP;
    saveSkyFlags();
    updateHP();
  }
  else
  {
    resultResolved = resolvePendingResult("sky_pending_battle",battleResult);

    if (hpParam !== null)
    {
      skyFlags.hp = Math.max(0, Math.min(MAX_HP, Number(hpParam)));
      saveSkyFlags();
      updateHP();
    }
  }
  const url = new URL(window.location.href);
  url.searchParams.delete("iswin3");
  url.searchParams.delete("battleResult");
  url.searchParams.delete("hp");
  history.replaceState(null, "", url.pathname + url.search);
}

/* game1/2/5 技能检定返回 */
const checkResult =
  iswin2 !== null
    ? iswin2
    : (resultParam !== null
        ? resultParam
        : (minigameResultParam !== null ? minigameResultParam : checkResultParam));

if (!resultResolved && checkResult !== null)
{
  resultResolved = resolvePendingResult("sky_pending_check", checkResult);
  if (resultResolved && feather !== null)
  {
    const n = Number(feather) || 0;
    addItem("windCrystal", n >= 6 ? 9 : n >= 3 ? 6 : 3);
  }
}

/* game2 追风者无参数回传的特殊处理 */
if (!resultResolved && document.referrer.includes("game2.html"))
{
  const raw = sessionStorage.getItem("sky_pending_check");
  if (raw)
  {
    try
    {
      const pending = JSON.parse(raw);
      currentNode = pending.success;
      pos = 0;
      sessionStorage.removeItem("sky_pending_check");
      resultResolved = true;
    }
    catch (error)
    {
      console.error(error);
    }
  }
}

if (resultResolved && save && save.story === "sky") haogandu = Number(save.haogandu ?? 5);

clampAffection();
updateAffection();
loadOtherAffection();
updateOtherAffection();
updateHP();
renderStatus();
renderIntel();
renderInventory();

let nodeData = nodes[currentNode];

/* ==================== effect ==================== */
function applyEffect(item)
{
  if (item.flags)
  {
    Object.assign(skyFlags, item.flags);
    saveSkyFlags();
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
    skyFlags.memoryFragments = memoryFragments() + Number(item.memoryDelta);
    saveSkyFlags();
    renderInventory();
  }
  if (item.hpDelta !== undefined)
  {
    skyFlags.hp = Math.max(0, Math.min(MAX_HP, currentHP() + Number(item.hpDelta)));
    saveSkyFlags();
    updateHP();
  }
  if (item.dailyFlag)
  {
    skyFlags[item.dailyFlag + freedomDay] = true;
    saveSkyFlags();
  }
  if (item.incFlag)
  {
    skyFlags[item.incFlag] = (skyFlags[item.incFlag] || 0) + 1;
    saveSkyFlags();
  }
  pos++;
  saveGame(
    "sky",
    currentNode,
    pos,
    haogandu
  );
  render();
}

function goToNode(next)
{
  currentNode = next;
  nodeData = nodes[currentNode];
  pos = 0;
  render();
}

/* 选项前置条件：返回未满足条件的中文描述；无前置条件或已满足时返回 null。
   四条线通用的两类条件：
   - requiresFlag：需某 flag 为真，显示名用 requiresFlagText（缺省用 flag 名）
   - requiresItem：需持有某物品，显示名用 requiresItemText（缺省取 ITEM_DATA 物品名） */
function unmetRequirement(opt)
{
  if (opt.requiresFlag && skyFlags[opt.requiresFlag] !== true)
  {
    return opt.requiresFlagText || opt.requiresFlag;
  }

  if (opt.requiresItem)
  {
    const count = skyFlags.inventory ? (skyFlags.inventory[opt.requiresItem] || 0) : 0;
    if (count <= 0)
    {
      const data = ITEM_DATA[opt.requiresItem];
      return opt.requiresItemText || (data ? data.name : opt.requiresItem);
    }
  }

  return null;
}

/* ==================== 终局结局判定 ==================== */
function resolveDestroyEnding(battleWon)
{
  /* 优先级 6：父亲选择“合作” + 摧毁装置。 */
  if (skyFlags.fatherFate === "cooperate")
  {
    goToNode("ending_father");
    return;
  }

  /* 无献祭路线 + 四位同伴好感均达标 + 最终战斗胜利。 */
  if (
    battleWon === true &&
    isFourClansReady() &&
    skyFlags.noSacrifice !== false
  )
  {
    goToNode("ending_four_clans");
    return;
  }

  /* 优先级 3：摧毁装置 + 赛琳存活 + 好感 >= 60。 */
  if (battleWon === true && haogandu >= 60)
  {
    goToNode("ending_destroy_win");
    return;
  }

  /* 摧毁装置 + 赛琳存活 + 好感 <= 50。 */
  if (battleWon === true && haogandu <= 50)
  {
    goToNode("ending_destroy_fall");
    return;
  }

  /* 好感 51~59。 */
  if (battleWon === true)
  {
    goToNode("ending_hero");
    return;
  }

  /* 摧毁装置 + 最终战斗失败，赛琳死亡。 */
  if (battleWon === false)
  {
    goToNode("ending_destroy_lose");
    return;
  }

  /* 理论上不会进入这里，仅作为异常存档兜底。 */
  goToNode("ending_unchanged");
}

/* ==================== 剧情渲染 ==================== */
/* 任务揭示：正文出现「主线任务」时记录，供 task.js 精确控制任务栏显示时机 */
const TASK_REVEAL_NODES =
{
  "start": "ch1",
  "chapter2_infiltration": "ch2",
  "chapter3": "ch3",
  "chapter4": "ch4"
};

function revealTasksForNode(nodeId)
{
  const taskId = TASK_REVEAL_NODES[nodeId];
  if (!taskId) return;
  if (skyFlags.taskRevealed && skyFlags.taskRevealed[taskId]) return;
  skyFlags.taskRevealed = skyFlags.taskRevealed || {};
  skyFlags.taskRevealed[taskId] = true;
  saveSkyFlags();
}

/* 老存档一次性补录：按当前节点所在章节，把已走过的章节标记为已揭示 */
function migrateTaskReveals()
{
  if (skyFlags.taskRevealed) return;
  skyFlags.taskRevealed = {};
  const node = currentNode || "start";
  let cur = 1;
  if (/^chapter2/.test(node)) cur = 2;
  else if (/^chapter3/.test(node)) cur = 3;
  else if (/^chapter4/.test(node) || /^ending/.test(node) || /^final/.test(node) || /ember_epilogue/.test(node)) cur = 4;
  else if (/^(freedom|mainmap_|loc_)/.test(node)) cur = Math.max(1, Number(skyFlags.freedomDay || 1));
  for (let n = 1; n <= cur; n++) skyFlags.taskRevealed["ch" + n] = true;
  saveSkyFlags();
}

function render()
{
  nodeData = nodes[currentNode];
  if (!nodeData || pos >= nodeData.length)
  {
    console.warn("无效剧情位置：", currentNode, pos);
    return;
  }
  migrateTaskReveals();
  revealTasksForNode(currentNode);
  updateBackground();
  const item = nodeData[pos];

  /* 隐藏跳转 */
  if (item.type === "jump")
  {
    mapClickable = false;
    updateMapState();
    goToNode(item.goto);
    return;
  }

  /* 状态变化 */
  if (item.type === "effect")
  {
    applyEffect(item);
    return;
  }

  /* 好感度自动分支 */
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

  /* flag 自动分支 */
  if (item.type === "flagauto")
  {
    mapClickable = false;
    updateMapState();
    const value = skyFlags[item.flag];
    const next = item.routes[value] || item.default;
    if (!next)
    {
      console.warn("flagauto 没有匹配分支：", item.flag, value);
      return;
    }
    goToNode(next);
    return;
  }

  /* 按自由行动日分支 */
  if (item.type === "dayauto")
  {
    mapClickable = false;
    updateMapState();
    goToNode(item.routes[freedomDay] || item.default);
    return;
  }

  /* 其他族好感分支 */
  if (item.type === "otherauto")
  {
    mapClickable = false;
    updateMapState();
    const val = otherHaogandu[item.faction] ?? 0;
    goToNode(val >= Number(item.min) ? item.pass : item.fail);
    return;
  }

  /* 每日限一次 */
  if (item.type === "dailyauto")
  {
    mapClickable = false;
    updateMapState();
    const done = skyFlags[item.flag + freedomDay];
    goToNode(done ? item.done : item.notDone);
    return;
  }

  /* 概率分支 */
  if (item.type === "chance")
  {
    mapClickable = false;
    updateMapState();
    goToNode(Math.random() < Number(item.prob) ? item.pass : item.fail);
    return;
  }

  /* 持有物品判定 */
  if (item.type === "hasitems")
  {
    mapClickable = false;
    updateMapState();
    let ok = true;
    for (const id in item.need)
    {
      const n = item.need[id];
      if ((skyFlags.inventory?.[id] || 0) < n) { ok = false; break; }
    }
    goToNode(ok ? item.pass : item.fail);
    return;
  }

  /* 终局自动判定 */
  if (item.type === "endingauto")
  {
    mapClickable = false;
    updateMapState();
    resolveDestroyEnding(item.battleWon === true);
    return;
  }

  saveGame(
    "sky",
    currentNode,
    pos,
    haogandu
  );
  choiceDom.style.display = "none";
  textDom.style.display = "none";
  if (silhouetteDom) silhouetteDom.style.display = "none";
  textDom.classList.remove("char-mode");
  hint.textContent = "点击画面 / Enter / Space / ▸键 继续";

  /* 标题 */
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

  /* 旁白 */
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
      freedomDay = Number(currentNode.slice(-1));
      skyFlags.freedomDay = freedomDay;
      if (!from)
      {
        time = 0;
        skyFlags.freedomTime = 0;
      }
      saveSkyFlags();
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
      storyBg.style.backgroundImage = `url("${item.bg}")`;
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

  /* 人物对白 */
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

  /* 选择 */
  else if (item.type === "choice")
  {
    mapClickable = false;
    updateMapState();
    hint.textContent = "";
    choiceDom.innerHTML = "";
    choiceDom.classList.toggle("multi", item.options.length >= 5);
    item.options.forEach(function (opt)
    {
      const unmet = unmetRequirement(opt);

      const a = document.createElement("a");
      a.textContent = opt.label;

      if (unmet)
      {
        a.classList.add("option-disabled");
        const tip = document.createElement("span");
        tip.className = "option-tip";
        tip.textContent = "未获得【" + unmet + "】，不可选择";
        a.appendChild(tip);
      }
      else
      {
        a.addEventListener("click", function ()
        {
          if (opt.affection !== undefined) applyAffection(opt.affection);
          if (opt.flags)
          {
            Object.assign(skyFlags, opt.flags);
            saveSkyFlags();
          }
          if (opt.cost)
          {
            for (const [key, val] of Object.entries(opt.cost))
            {
              const have = key === "memoryFragments" ? memoryFragments() : (skyFlags.inventory?.[key] || 0);
              if (have < val) { hint.textContent = "资源不足，无法兑换/购买"; return; }
            }
            for (const [key, val] of Object.entries(opt.cost))
            {
              if (key === "memoryFragments") skyFlags.memoryFragments = memoryFragments() - val;
              else removeItem(key, val);
            }
            if (opt.give) Object.entries(opt.give).forEach(function ([id, c]) { addItem(id, c); });
            saveSkyFlags();
            renderInventory();
          }
          if (opt.next === "end")
          {
            saveGame(
              "sky",
              currentNode,
              pos,
              haogandu,
              true
            );
            resetSkyFlags();
            clickNav("mainmenu.html");
            return;
          }
          goToNode(opt.next);
        });
      }

      choiceDom.appendChild(a);
    });
    choiceDom.style.display = item.options.length >= 5 ? "grid" : "block";
  }

  /* game3 战斗 */
  else if (item.type === "battle")
  {
    mapClickable = false;
    updateMapState();
    sessionStorage.setItem("sky_pending_battle",JSON.stringify(
    {
      id:item.id,
      success:item.success,
      fail:item.fail,
      cancel:item.cancel || null,
      freedomDay: freedomDay,
      bg: currentBackground
    }));
    fadeNav(item.url + "&battle=" + item.id + "&hp=" + currentHP());
  }

  /* game4 潜入穹顶 */
  else if (item.type === "infiltration")
  {
    mapClickable = false;
    updateMapState();
    sessionStorage.setItem("sky_pending_infiltration",JSON.stringify(
    {
      id:item.id,
      success:item.success,
      fail:item.fail,
      freedomDay: freedomDay,
      bg: currentBackground
    }));
    fadeNav(item.url);
  }

  /* game1/2/5 技能检定 */
  else if (item.type === "skillcheck")
  {
    mapClickable = false;
    updateMapState();
    sessionStorage.setItem("sky_pending_check", JSON.stringify(
    {
      id: item.id,
      success: item.success,
      fail: item.fail,
      freedomDay: freedomDay,
      bg: currentBackground
    }));

    const gameUrl = new URL(item.url || "game2.html?mode=sky", window.location.href);
    const currentPage = window.location.pathname.split("/").pop() || "story-sky.html";
    gameUrl.searchParams.set("return", currentPage);
    fadeNav(gameUrl.href);
  }

  /* 自由行动离开地点 */
  else if (item.type === "freedomReturn")
  {
    mapClickable = false;
    updateMapState();
    goToNode("mainmap_" + freedomDay);
  }

  /* 一次自由行动结束 */
  else if (item.type === "freedomEnd")
  {
    mapClickable = false;
    updateMapState();
    time = Number(skyFlags.freedomTime ?? time ?? 0);
    time++;
    skyFlags.freedomDay = freedomDay;
    skyFlags.freedomTime = time;
    saveSkyFlags();

    if (time < 4)
    {
      fadeNav(`map.html?mode=sky&cnt=${item.day}&time=${time}`);
      return;
    }
    skyFlags.freedomTime = 0;
    saveSkyFlags();
    goToNode(item.next);
  }
}

/* ==================== 剧情推进（键盘/点击共用） ==================== */
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

/* 第一次渲染 */
render();

/* 设置弹窗 */
exitGameButton.addEventListener("click", openSettings);

settingsContinue.addEventListener("click", closeSettings);
settingsSaveExit.addEventListener("click", function ()
{
  saveGame("sky", currentNode, pos, haogandu);
  saveSkyFlags();
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
  turnNav(`map.html?mode=sky&cnt=${day}&time=0`);
});

mapMini.addEventListener("mouseleave", function ()
{
  mapTip.style.opacity = "0";
  mapTip.style.visibility = "hidden";

  mapTip.textContent = "商人的地图";
});

/* 背包 */
bagMini.addEventListener("click", function ()
{
  inventoryPanel.classList.toggle("open");

  if (inventoryPanel.classList.contains("open"))
  {
    bagMini.classList.add("opened");
    renderInventory();
  }
  else
  {
    bagMini.classList.remove("opened");
    itemDetail.classList.remove("show");
  }
});

inventoryClose.addEventListener("click", function ()
{
  inventoryPanel.classList.remove("open");
  bagMini.classList.remove("opened");
  itemDetail.classList.remove("show");
});
