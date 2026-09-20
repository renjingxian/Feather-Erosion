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
const underResult = params.get("underResult");
const minigameResultParam = params.get("minigameResult");
const gameResultParam = params.get("gameResult");
const genericResultParam = params.get("result");
const iswin2 = params.get("iswin2");
const iswin = params.get("iswin");
const game4Result = params.get("game4Result");
const checkResultParam = params.get("checkResult");
const feather = params.get("feather");
const hpParam = params.get("hp");

const save = loadGame();
const gender = getCurrentGender();
const playerImg = gender === "male" ? "../images/malelead.png" : "../images/femalelead.png";

/*立绘*/
const Grim = "../images/Grim.png";
const Edmund = "../images/Edmund.png";
const Sorwin = "../images/Sorwin.png";
const Celine = "../images/Celine.png";
const Aldric = "../images/Aldric.png";
const Elarria = "../images/Elarria.png";
const Lia = "../images/Lia.png";
const Duke = "../images/Duke.png";
const OldGoblin = "../images/Oldgoblin.png";
const GoblinGuard = "../images/Goblinguard.png";

function getCharacterImage(item)
{
  if (item.charImg) return item.charImg;
  if (item.role === "player") return playerImg;

  const speaker = item.speaker || "";
  if (speaker.includes("格里姆")) return Grim;
  if (speaker.includes("艾德蒙")) return Edmund;
  if (speaker.includes("索尔温")) return Sorwin;
  if (speaker.includes("赛琳") || speaker.includes("塞琳")) return Celine;
  if (speaker.includes("奥德里克")) return Aldric;
  if (speaker.includes("艾拉瑞亚")) return Elarria;
  if (speaker.includes("莉亚")) return Lia;
  if (speaker.includes("大公")) return Duke;
  if (speaker.includes("老地精")) return OldGoblin;
  if (speaker.includes("卫兵")) return GoblinGuard;
  return "";
}

/*背景路径集中配置*/
const FALLBACK_BG = "../images/main-bg.png";
const sceneBackgrounds =
{
  gate: "../images/underbg/underbg1.jpg",
  city: "../images/underbg/underbg2.jpg",
  workshop: "../images/underbg/underbg3.jpg",
  mine: "../images/underbg/underbg4.jpg",
  lab: "../images/underbg/underbg5.jpg",
  palace: "../images/underbg/underbg6.jpg",
  hideout: "../images/underbg/underbg7.jpg",
  blackmarket: "../images/underbg/underbg8.jpg",
  crack: "../images/underbg/underbg9.jpg",
  core: "../images/underbg/underbg10.jpg",
  ending: "../images/underbg/underbg11.jpg",

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
  start:"gate", gate_contract:"city", gate_force:"gate", gate_force_success:"city", gate_bluff:"city", ending_gate:"ending",
  workshop:"workshop", workshop_a:"workshop", workshop_b:"workshop", workshop_c:"workshop",
  mine:"mine", mine_retry:"mine", mine_success:"workshop", freedom1:"city",
  chapter2:"lab", lab_a:"lab", lab_b:"lab", lab_c:"lab", palace:"palace", stay_a:"hideout", stay_b:"hideout", stay_c:"hideout", chapter2_unified:"hideout", freedom2:"city",
  chapter3:"blackmarket", black_a:"mine", cargo_success:"blackmarket", cargo_fail:"blackmarket", black_b:"blackmarket", black_c:"hideout",
  ash_lab:"lab", rescue_a:"lab", rescue_a_success:"lab", rescue_a_fail:"lab", rescue_b:"lab", rescue_c:"lab",
  oath:"hideout", oath_high:"hideout", oath_mid:"hideout", oath_low:"hideout", oath_high_follow:"hideout", oath_mid_follow:"hideout", oath_low_follow:"hideout", warmth:"hideout", freedom3:"city",
  chapter4:"crack", father_kill:"core", father_cooperate:"core", father_release:"core", lia_wakes:"core", final_destroy:"core", resolve_destroy:"core",
  ending_self:"ending", ending_prisoner:"ending", ending_molten:"ending", ending_after:"ending", ending_dawn:"ending", ending_father:"ending", ending_four:"ending", ending_hero:"ending", ending_unchanged:"ending", ember_epilogue:"ending",

  "loc_sky_yun":"sky_yun",
  "loc_sky_feng":"sky_feng",
  "loc_sky_shi":"sky_shi",
  "loc_sky_yu":"sky_yu",
  "loc_sky_trial":"sky_trial",
  "loc_emp_fu":"emp_fu",
  "loc_emp_wu":"emp_wu",
  "loc_emp_lao":"emp_lao",
  "loc_emp_hei":"emp_hei",
  "loc_emp_steam":"emp_steam",
  "loc_under_hui":"under_hui",
  "loc_under_kuang":"under_kuang",
  "loc_under_tong":"under_tong",
  "loc_under_jiu":"under_jiu",
  "loc_under_di":"under_di",
  "loc_under_shen":"under_shen",
  "loc_under_hu":"under_hu",
  "loc_forest_de":"forest_de",
  "loc_forest_chen":"forest_chen",
  "loc_forest_gen":"forest_gen",
  "loc_forest_sheng":"forest_sheng",
  "loc_forest_dong":"forest_dong",
  "loc_forest_zhao":"forest_zhao",
  "loc_ruins":"ruins"
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
      setTimeout(function () { cannext = true; }, 300);
    }
  }, speed);
}

/*地下古堡路线状态*/
const currentUser = getCurrentUser();
const underFlagKey = "feather_erosion_under_flags_" + (currentUser || "guest");
const flagStorage = currentUser ? localStorage : sessionStorage;

function loadUnderFlags()
{
  const raw = flagStorage.getItem(underFlagKey);
  if (!raw) return {};
  try { return JSON.parse(raw); }
  catch (error) { console.error(error); return {}; }
}
function saveUnderFlags() { flagStorage.setItem(underFlagKey, JSON.stringify(underFlags)); }
function resetUnderFlags() { flagStorage.removeItem(underFlagKey); }
let underFlags = loadUnderFlags();

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
    "forest": "拂晓的消散·精灵之森",
    "under": "拂晓的消散·地下古堡"
  },
  "父与子": {
    "sky": "父与子·天空之城",
    "empire": "父与子·帝国城邦",
    "under": "父与子·地下古堡"
  },
  "四族盟约": {
    "sky": "四族盟约·天空之城",
    "empire": "四族盟约·帝国城邦",
    "forest": "四族盟约·精灵之森",
    "under": "四族盟约·地下古堡"
  },
  "无名英雄": {
    "sky": "无名英雄·天空之城",
    "empire": "无名英雄·帝国城邦",
    "forest": "无名英雄·精灵之森",
    "under": "无名英雄·地下古堡"
  },
  "未变之局": {
    "sky": "未变之局·天空之城",
    "empire": "未变之局·帝国城邦",
    "forest": "未变之局·精灵之森",
    "under": "未变之局·地下古堡"
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
    story:"under",
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

/* -------------------- 背包 -------------------- */
const ITEM_DATA =
{
  goblinContract:{name:"地精契约书",desc:"关键道具：可进入地下古堡并面见格里姆。",image:"../images/underthings/qiyueshu.png"},
  basicPotion:{name:"基础治疗药剂",desc:"消耗品：回复 10 点生命值。",image:"../images/zhiliaoyaoji.png"},
  breakerWater:{name:"破符水",desc:"可暂时让符文锁失去功效的炼金药剂。",image:"../images/underthings/pofushui.png"},
  imperfectBreakerWater:{name:"不完美的破符水",desc:"临时调制出的破符水，效果不够稳定。",image:"../images/underthings/bwmpofushui.png"},
  runeTreatmentPack:{name:"符文治疗包",desc:"格里姆在灰烬之誓·共生分支中交给你的治疗包。",image:"../images/underthings/zhiliaobao.png"},
  unfinishedWing:{name:"未完成的机械义翼",desc:"格里姆交给你的半成品义翼骨架，至少还能使用。",image:"../images/underthings/weiwancheng.png"},
  bloodFeather:{name:"染血的羽毛",desc:"艾德蒙死后留下的羽毛。",image:"../images/skythings/feather.jpg"},
  fatherTalisman:{name:"父亲的护符",desc:"艾德蒙留下的护符，可在 Boss 战中抵挡一次致命伤。",image:"../images/hufu.png"},
  memoryFragment:{name:"记忆碎片",desc:"残存的记忆碎片，可在各处兑换物品与情报。",image:"../images/jiyisuipian.jpg"},
  windCrystal:{name:"风晶碎片",desc:"蕴含风脉之力的晶石碎片。",image:""},
  stormShield:{name:"风暴护盾",desc:"能抵挡一次风暴伤害的护盾。",image:""},
  mechWing:{name:"机械羽翼",desc:"装备：追风者容错 +1。",image:""},
  mechDesign:{name:"机械义翼设计图",desc:"天空之城机械羽翼的制造图纸。",image:""},
  runeFragment:{name:"符文碎片",desc:"蕴含符文之力的碎片，锻造材料。",image:""},
  rareOre:{name:"稀有矿石",desc:"稀有的符文矿石，锻造材料。",image:""},
  purifier:{name:"污染净化器",desc:"消耗品：抵挡一次攻击。",image:""},
  brokenRune:{name:"破符水",desc:"能破除符文锁的药剂。",image:"../images/underthings/pofushui.png"},
  imperfectRune:{name:"不完美的破符水",desc:"效果不稳定，但勉强能用的破符水。",image:"../images/underthings/bwmpofushui.png"},
  liquor:{name:"烈酒",desc:"消耗品：解除负面状态，回复 5 点生命值。",image:""},
  crystalFragment:{name:"晶骸残片",desc:"晶化生物骸骨的残片。",image:""},
  lowPurityCrystal:{name:"污染结晶（低纯度）",desc:"低纯度的污染结晶。",image:""},
  highPurityCrystal:{name:"污染结晶（高纯度）",desc:"高纯度的污染结晶。",image:""},
  pureCrystal:{name:"纯净污染结晶",desc:"已经净化提纯的结晶。",image:""},
  runePack:{name:"符文治疗包",desc:"消耗品：回复 25 点生命值。",image:"../images/underthings/zhiliaobao.png"},
  decoderRune:{name:"解码符文",desc:"用于破解加密信息的符文。",image:""},
  oldFeather:{name:"旧羽管",desc:"一根陈旧的羽管笔。",image:""},
  fakeIntel:{name:"假情报",desc:"可以散布出去的假情报。",image:""},
  antiPotion:{name:"抗污药剂",desc:"消耗品：3 回合内受到的伤害减半。",image:""},
  antiAmulet:{name:"抗污护符",desc:"装备：污染环境中生命值不再持续流失。",image:""},
  alchemyBomb:{name:"炼金炸弹",desc:"消耗品：对全体敌人造成高额伤害。",image:""},
  goblinDoll:{name:"歪耳朵的地精布偶",desc:"一只耳朵歪掉的地精布偶（仿制品）。",image:""},
  cleanMoss:{name:"净化苔藓",desc:"材料：抵挡一次攻击。",image:"../images/forestthings/jinghuataixian.png"},
  halfMoss:{name:"半净化的苔藓",desc:"材料：伤害减免。",image:"../images/forestthings/banjinghuataixian.png"},
  wildMoss:{name:"野生苔藓",desc:"从古树根系采集的野生苔藓。",image:""},
  runeShield:{name:"符文护盾",desc:"装备：战斗中抵挡一次伤害。",image:"../images/empirethings/hudun.png"}
};
function memoryFragments()
{
  return underFlags.memoryFragments ?? 15;
}
function initInventory()
{
  if (!underFlags.inventory) { underFlags.inventory = {}; saveUnderFlags(); }
}
function addItem(id, count = 1)
{
  initInventory();
  if (!underFlags.inventory[id]) underFlags.inventory[id] = 0;
  underFlags.inventory[id] += count;
  saveUnderFlags(); renderInventory();
}
function removeItem(id, count = 1)
{
  initInventory();
  if (!underFlags.inventory[id]) return;
  underFlags.inventory[id] -= count;
  if (underFlags.inventory[id] <= 0) delete underFlags.inventory[id];
  saveUnderFlags(); renderInventory();
}
function renderInventoryItem(id, count)
{
  const data = ITEM_DATA[id]; if (!data) return;
  const item = document.createElement("div"); item.className = "inventory-item";
  const icon = document.createElement("div"); icon.className = "inventory-item-icon";
  if (data.image) { const img = document.createElement("img"); img.src = data.image; img.alt = data.name; icon.appendChild(img); }
  else icon.textContent = data.name[0];
  const name = document.createElement("div"); name.className = "inventory-item-name"; name.textContent = data.name;
  item.appendChild(icon); item.appendChild(name);
  if (count > 1 || id === "memoryFragment") { const num = document.createElement("div"); num.className = "inventory-item-count"; num.textContent = "×" + count; item.appendChild(num); }
  item.addEventListener("mouseenter", function ()
  {
    if (!itemDetail) return;
    itemDetailName.textContent = data.name; itemDetailDesc.textContent = data.desc;
    itemDetailCount.textContent = (count > 1 || id === "memoryFragment") ? "持有数量：" + count : "";
    const rect = item.getBoundingClientRect(); itemDetail.style.left = (rect.right + 10) + "px"; itemDetail.style.top = rect.top + "px"; itemDetail.classList.add("show");
  });
  item.addEventListener("mouseleave", function () { if (itemDetail) itemDetail.classList.remove("show"); });
  inventoryContent.appendChild(item);
}

function renderInventory()
{
  if (!inventoryContent) return;
  initInventory(); inventoryContent.innerHTML = "";
  const ids = Object.keys(underFlags.inventory).filter(function (id) { return underFlags.inventory[id] > 0 && ITEM_DATA[id]; });
  const fragments = underFlags.memoryFragments ?? 15;
  if (ids.length === 0 && fragments <= 0)
  {
    const empty = document.createElement("div"); empty.className = "inventory-empty"; empty.textContent = "行囊里什么也没有。"; inventoryContent.appendChild(empty); return;
  }
  // 记忆碎片作为货币，但像物品一样显示在背包里
  renderInventoryItem("memoryFragment", fragments);
  ids.forEach(function (id) { renderInventoryItem(id, underFlags.inventory[id]); });
}

/* -------------------- 状态 / 情报 -------------------- */
const STATUS_INFO =
{
  "莉亚获救":"莉亚已经被从灰烬实验室的容器中救出。",
  "父亲的同行":"你选择与艾德蒙合作，他将与你同行进入终局。",
  "回声的歌":"你学会了回声洞穴里的那首歌。",
  "她听过自己的名字":"艾拉瑞亚第一次听清了自己的名字。"
};
const INTEL_INFO =
{
  "地底阶层":"地下古堡由大公、炼金派与商业派三股势力共同构成。",
  "深暗裂隙的异常":"深暗裂隙附近存在并非自然形成的古老装置，大公禁止任何人接近。",
  "格里姆的妹妹":"格里姆的妹妹莉亚在十年前矿难中被污染，他一直在寻找让她恢复的方法。",
  "剪翼者与无翼者":"天空之城的底层羽人被上层人称作剪翼者与无翼者——他们被歧视，也被畏惧。",
  "底层人与上层人":"上层人一边鄙视底层羽人，一边又害怕他们。",
  "底层羽人的沉默":"当被审者说出“献祭是杀人”时，全场只有最前排几个底层羽人把兜帽往下压了压，无人应声。",
  "军派的募兵牌":"军派在每块阵亡者墓碑背面钉着铁牌：“为国捐躯者，其亲属可优先入伍。”——用人命换兵源，共三十九块。",
  "四十个人":"二十年前那支队伍一共四十人，三十九个阵亡，名字刻在工坊墙上的铁牌上并被逐个划掉；唯独第四十个名字没有被划掉——那是奥德里克自己。",
  "军费的来源":"军派的军费来自商业派，商业派的钱来自熔炉。而熔炉三天前刚被污染——军派急着开战的真实压力来自钱，不是污染。",
  "第四十座碑":"有个人每周都来，站在那块空碑前面，站一会儿就走。二十年了。",
  "独自下矿的人":"废弃矿道深处的墙壁上全是旧矿灯的划痕，有人在那里待过很久、而且是一个人。你猜那大概是莉亚。她被困的那三天，就是在那儿。",
  "一条侧路":"矿道西边有一条塌掉一半的支道，能绕到大公的实验室后面；没人走，因为要弯腰。",
  "晶化卫兵不睡":"大公的晶化卫兵不需要睡眠、不会疲劳、没有视野盲区之外的松懈期。打不过，只能比它们更快地走完流程。",
  "火种是谁掐的":"熔岩炉的火种不是自己熄灭的，是有人从上面动的手——即大公主动掐断，为的是把资源转向污染实验。",
  "大公最近的动静":"他往灰烬实验室那边调了两批卫兵，全是晶化过的。以前他不用那些东西看家。",
  "镇上的人怎么说":"女王的账本上，这片林子还剩两年半。她说三年，是怕我们跑。"
};
function initStatus() { if (!underFlags.statuses) { underFlags.statuses=[]; saveUnderFlags(); } }
function addStatus(name) { initStatus(); if (!underFlags.statuses.includes(name)) { underFlags.statuses.push(name); saveUnderFlags(); } renderStatus(); }
function removeStatus(name) { initStatus(); underFlags.statuses=underFlags.statuses.filter(function(x){return x!==name;}); saveUnderFlags(); renderStatus(); }
function renderStatus()
{
  const list=document.getElementById("status-list"); if (!list) return; initStatus(); list.innerHTML="";
  underFlags.statuses.forEach(function(status){ const d=document.createElement("div"); d.className="status-item"; const n=document.createElement("div"); n.className="status-name"; n.textContent=status; const t=document.createElement("div"); t.className="status-tip"; t.textContent=STATUS_INFO[status]||"暂无详细说明"; d.appendChild(n); d.appendChild(t); list.appendChild(d); });
}
function initIntel() { if (!underFlags.intels) { underFlags.intels=[]; saveUnderFlags(); } }
function addIntel(name) { initIntel(); if (!underFlags.intels.includes(name)) { underFlags.intels.push(name); saveUnderFlags(); } renderIntel(); }
function removeIntel(name) { initIntel(); underFlags.intels=underFlags.intels.filter(function(x){return x!==name;}); saveUnderFlags(); renderIntel(); }
function renderIntel()
{
  const list=document.getElementById("intel-list") || document.getElementById("information-list") || document.getElementById("intelligence-list"); if (!list) return; initIntel(); list.innerHTML="";
  underFlags.intels.forEach(function(intel){ const d=document.createElement("div"); d.className="intel-item status-item"; const n=document.createElement("div"); n.className="intel-name status-name"; n.textContent=intel; const t=document.createElement("div"); t.className="intel-tip status-tip"; t.textContent=INTEL_INFO[intel]||"暂无详细说明"; d.appendChild(n); d.appendChild(t); list.appendChild(d); });
}

const navigationEntry = performance.getEntriesByType("navigation")[0];
const navigationType = navigationEntry ? navigationEntry.type : "navigate";

const hasPendingGame =
  sessionStorage.getItem("under_pending_battle") !== null ||
  sessionStorage.getItem("under_pending_minigame") !== null ||
  sessionStorage.getItem("under_pending_infiltration") !== null ||
  sessionStorage.getItem("under_pending_check") !== null;

const returningFromGame =
  iswin3 !== null ||
  battleResultParam !== null ||
  game4Result !== null ||
  checkResultParam !== null ||
  underResult !== null ||
  minigameResultParam !== null ||
  gameResultParam !== null ||
  genericResultParam !== null ||
  iswin2 !== null ||
  iswin !== null ||
  hasPendingGame ||
  document.referrer.includes("game3.html") ||
  document.referrer.includes("game1.html") ||
  document.referrer.includes("game2.html") ||
  document.referrer.includes("game4.html") ||
  document.referrer.includes("game5.html");

if (mode !== "continue" && navigationType === "navigate" && !from && !returningFromGame)
{
  resetUnderFlags();
  underFlags = {};
}

let haogandu = 5;
let freedomDay = Number(underFlags.freedomDay ?? 1);
if (!params.has("time")) time = Number(underFlags.freedomTime ?? time ?? 0);
const MAX_HP = 100;
function currentHP() { return underFlags.hp ?? MAX_HP; }
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
  if (typeof underFlags.affectionMin === "number") haogandu = Math.max(haogandu, underFlags.affectionMin);
  if (typeof underFlags.affectionMax === "number") haogandu = Math.min(haogandu, underFlags.affectionMax);
  */
  return ;
}
function applyAffection(delta) { haogandu += Number(delta); clampAffection(); updateAffection(); }
function setAffection(value) { haogandu = Number(value); clampAffection(); updateAffection(); }
function updateAffection() { affectionValue.textContent = haogandu; affectionTip.textContent = "格里姆好感度：" + haogandu; }
/*三位同伴好感度，持久化保存在 underFlags.otherAffection*/
const OTHER_AFFECTION_UI = { sky:{name:"赛琳",suffix:"sky"}, empire:{name:"奥德里克",suffix:"empire"}, forest:{name:"艾拉瑞亚",suffix:"forest"} };
let otherHaogandu = { sky:0, empire:0, forest:0 };
function loadOtherAffection()
{
  const stored = underFlags.otherAffection;
  if (!stored || typeof stored !== "object") return;
  Object.keys(OTHER_AFFECTION_UI).forEach(function (faction)
  {
    if (typeof stored[faction] === "number") otherHaogandu[faction] = stored[faction];
  });
}
function persistOtherAffection()
{
  underFlags.otherAffection = { sky:otherHaogandu.sky, empire:otherHaogandu.empire, forest:otherHaogandu.forest };
  saveUnderFlags();
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
  Object.keys(otherHaogandu).forEach(function (faction) { otherHaogandu[faction] += Number(delta); });
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
function isFourClansReady() { return haogandu >= 40 && Object.keys(otherHaogandu).every(function (f) { return otherHaogandu[f] >= 40; }); }
function updateMapState()
{
  if (mapClickable) { mapMini.style.cursor="pointer"; mapMini.style.opacity="1"; }
  else { mapMini.style.cursor="not-allowed"; mapMini.style.opacity="0.65"; }
}

let currentNode = "start";
let pos = 0;

const nodes = {
  "start": [
    {
      "type": "narrator",
      "text": "商人递给你一个包裹：“地精不相信眼泪——他们相信契约、矿石和等价交换。你身上有他们想要的东西，记得谈个好价钱。”"
    },
    {
      "type": "narrator",
      "text": "获得初始物品：破旧的行囊、商人的地图、记忆碎片、基础治疗药剂×2。\n获得【地精契约书】、情报【地底阶层】。格里姆初始好感 +5。"
    },
    {
      "type": "title",
      "chapter": "第一章",
      "subtitle": "地底交易"
    },
    {
      "type": "narrator",
      "text": "商人离开后，你认真看了看那份契约书，契约书的名字上写着“格里姆”，你认识这个名字，他是地精炼金协会前首席研究员，看来要去先找到他了。"
    },
    {
      "type": "narrator",
      "text": "【主线任务】前往地下古堡找到格里姆。"
    },
    {
      "type": "effect",
      "addItems": {
        "goblinContract": 1,
        "basicPotion": 2
      },
      "addIntels": [
        "地底阶层"
      ]
    },
    {
      "type": "title",
      "chapter": "第一幕",
      "subtitle": "熔岩之门"
    },
    {
      "type": "narrator",
      "text": "你按照商人的地图向南走了很久。脚下的地面光线一寸寸暗下去，周遭空气也愈发闷烫，走了许久，你终于站定在一扇嵌进山岩肌理的钢铁闸门前。"
    },
    {
      "type": "narrator",
      "text": "闸门由黑铁铸成，表面布满暗红色纹路......那是熔岩流过留下的痕迹。蒸汽从门缝里喷出，裹挟着硫磺与金属灼烧的气味。"
    },
    {
      "type": "narrator",
      "text": "门前站着两名地精卫兵。他们比你矮整整一头，肩膀却宽得敦实，手臂上紧紧缠着打磨冷亮的金属护甲，长着尖耳朵，眼睛在黑暗中泛着黄光，手始终按在腰间的炼金铳上。"
    },
    {
      "type": "char",
      "speaker": "地精卫兵",
      "text": "站住，地下古堡不接待外来者！你是什么人？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "我是无翼者，我来找格里姆。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "卫兵闻言滞了滞，侧过身和同伴交换了一个诧异的眼神。"
    },
    {
      "type": "char",
      "speaker": "地精卫兵",
      "text": "格里姆？那个炼金疯子？你找他做什么？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "他有我要的东西，我也有他想要的东西。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "卫兵沉默片刻，然后伸出了手。"
    },
    {
      "type": "char",
      "speaker": "地精卫兵",
      "text": "契约书。没有契约书，连地精的影子都别想见到。",
      "role": "npc"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "交出【地精契约书】",
          "next": "gate_contract"
        },
        {
          "label": "强闯",
          "next": "gate_force"
        },
        {
          "label": "利用大公的名头进入",
          "next": "gate_bluff"
        }
      ]
    }
  ],
  "gate_contract": [
    {
      "type": "narrator",
      "text": "你从怀中取出那卷羊皮纸。卫兵接过去，翻来覆去查看了许久，手指在契约书边缘的符文上摩挲——那是地精契约特有的认证纹路，根本伪造不了。"
    },
    {
      "type": "char",
      "speaker": "地精卫兵",
      "text": "……是真的。这确实是协会签发的契约书。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他抬起头打量你，目光从你的脸移到你的后背——那里是空的。"
    },
    {
      "type": "char",
      "speaker": "地精卫兵",
      "text": "无翼者，羽人。你来地底做什么？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "我说了，我找格里姆。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "卫兵沉默了一会儿，把契约书递还给你，侧身让开半步。"
    },
    {
      "type": "char",
      "speaker": "地精卫兵",
      "text": "进去吧，左转第三个矿道走到头。别碰任何东西，别乱看，别惹麻烦。如果你在城里闹出乱子，我们可不负责给你收尸。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你穿过铁门，蒸汽从两侧喷涌而出。雾气散去后，你才看清地下古堡的全貌。这是一座嵌在熔岩层之间的巨型城市，熔岩从城外的地下河流过，把整座城市染成了暗红色。矿道四通八达，像蚁穴一样遍布整个地层，远处传来锤击声和齿轮转动的轰鸣。"
    },
    {
      "type": "narrator",
      "text": "你沿着矿道向下走，越是往深处走，温度就越高，墙壁上的晶石也从暗红色慢慢变成了亮橙色。空气中弥漫着硫磺和金属粉末的气味，你看见地精工人在矿道里往来搬运矿石，他们脸上沾满黑灰，连眉眼都蒙得发沉，唯独一双眼睛亮得惊人，像是嵌在岩壁上的晶矿。没有人留意你，所有人都只顾着忙自己手头的活。"
    },
    {
      "type": "effect",
      "affection": 5
    },
    {
      "type": "jump",
      "goto": "workshop"
    }
  ],
  "gate_force": [
    {
      "type": "narrator",
      "text": "你把契约书收回怀中，看着卫兵，卫兵也看着你，指节扣得发白的手，紧紧按在腰间的炼金铳上。"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "我没有契约书，但我必须进去。",
      "role": "player"
    },
    {
      "type": "char",
      "speaker": "地精卫兵",
      "text": "那就别怪我们不客气了。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你拔出武器，金属碰撞的脆响划破空气，战斗瞬间在厚重的铁门前爆发。地精卫兵的炼金铳喷出灼热的火焰，你侧身躲开，他们的动作很快，比你预想的更快，但你比他们更快。"
    },
    {
      "type": "battle",
      "id": "gate_battle",
      "url": "game3.html?mode=under",
      "success": "gate_force_success",
      "fail": "ending_gate"
    }
  ],
  "gate_force_success": [
    {
      "type": "narrator",
      "text": "两名卫兵倒在地上，你跨过他们走进铁门，身后传来卫兵长的声音。"
    },
    {
      "type": "char",
      "speaker": "地精卫兵",
      "text": "你……你会后悔的。大公不会放过一个攻击卫兵的人。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你穿过铁门，蒸汽从两侧喷涌而出。蒸腾的雾气散去后，你看清了地下古堡的全貌，宏伟诡谲的景象撞进眼底，可你根本没有时间欣赏，因为身后已经传来了警报声，更多卫兵正在赶来。"
    },
    {
      "type": "narrator",
      "text": "但顺利的是，此处矿道不少，你很快甩开了他们"
    },
    {
      "type": "effect",
      "setAffection": -10,
      "flags": {
        "affectionMax": 60,
        "gateForced": true
      }
    },
    {
      "type": "jump",
      "goto": "workshop"
    }
  ],
  "ending_gate": [
    {
      "type": "title",
      "chapter": "结局",
      "subtitle": "铁门之前"
    },
    {
      "type": "narrator",
      "text": "你被卫兵制服，他们把你扔出铁门。你躺在矿道外的岩石上，浑身是伤。几天后，羽蚀降临，你被腐蚀，世界毁灭。"
    },
    {
      "type": "narrator",
      "text": "结局名称：铁门之前"
    },
    {
      "type": "narrator",
      "text": "结局类型：失败结局"
    },
    {
      "type": "narrator",
      "text": "成就解锁：【铁门之前】"
    },
    {
      "type": "narrator",
      "text": "成就解锁：【未变之局·地下古堡】"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "返回游戏主菜单",
          "next": "end"
        }
      ]
    }
  ],
  "gate_bluff": [
    {
      "type": "narrator",
      "text": "你将契约书收回怀中，并未出示任何东西，随后站直身体，迎上卫兵的目光，语气平静得仿佛在说一件早已敲定的事。"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "我身上带着大公需要的东西，是来和格里姆谈合作的。要是因为你们耽误了正事——大公会找谁问责，我可就说不准了。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "卫兵愣在原地，他看向身边的同伴，同伴也跟着愣住了。"
    },
    {
      "type": "char",
      "speaker": "地精卫兵",
      "text": "大公需要的东西？是什么东西？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "你不必知道，只需要清楚，要是我进不去，大公追问起来，你们没法交代。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "卫兵沉默了许久，搭在炼金铳上的手慢慢松了开来。他上下打量着你：你的后背空空荡荡，衣服上沾着泥土，神情却格外平静，这份平静让他觉得你不是在虚张声势。"
    },
    {
      "type": "char",
      "speaker": "地精卫兵",
      "text": "……但愿你说的是真的。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他侧身让开半步，手却依旧按在炼金铳上。"
    },
    {
      "type": "char",
      "speaker": "地精卫兵",
      "text": "进去吧，左转走第三个矿道，走到尽头就是。别碰任何东西，别到处乱看，别惹麻烦。要是你在里面闯出祸来，我们可不帮你收尸。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你穿过铁门，蒸汽从两侧喷涌而出，身后传来卫兵低声交谈的声音。"
    },
    {
      "type": "char",
      "speaker": "地精卫兵（低声）",
      "text": "……要不要报告给大公？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "地精卫兵（低声）",
      "text": "报告什么？他说带了大公要的东西，要是真有这事——我们拦了他，大公怪罪下来谁担着？要是没有——他自然会倒霉，咱们别掺和进去。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你继续向前走，没有回头。"
    },
    {
      "type": "narrator",
      "text": "你沿着矿道向下走，越往深处温度越高，墙壁上的晶石从暗红色慢慢变成亮橙色，空气中弥漫着硫磺和金属粉末的气味。你看到地精工人在矿道里搬运矿石，他们脸上沾满黑灰，眼睛却亮得惊人，没人看你一眼，所有人都忙着手里的活。"
    },
    {
      "type": "effect",
      "affection": -5
    },
    {
      "type": "jump",
      "goto": "workshop"
    }
  ],
  "workshop": [
    {
      "type": "title",
      "chapter": "第二幕",
      "subtitle": "炼金工坊"
    },
    {
      "type": "narrator",
      "text": "你顺着卫兵的指引走进矿道，越往深处走温度越高，空气中满是硫黄和金属粉末的气味。在矿道尽头，你看到一扇半掩的铁门，门上挂着一块木牌，木牌上用燃烧的符文写着：“格里姆·炼金。非请勿入。”"
    },
    {
      "type": "narrator",
      "text": "你推开门，发现工坊内部比外面开阔得多，天花板上嵌着发光的符文石，把整个空间照成暖橘色。工作台上堆满了各种叫不出名字的炼金仪器，烧瓶里的液体不断冒泡，坩埚里的金属正慢慢熔化，空气中弥漫着刺鼻的酸味。"
    },
    {
      "type": "narrator",
      "text": "一个地精背对着你站在工作台前。他个子比你矮，肩膀却很宽，洗得发白的灰布实验袍上，星星点点沾满了各色油污和试剂烧蚀出的破洞。他的耳朵比普通地精更长，耳尖微微下垂，手里正捏着一把镊子，夹取一块发光的矿石。"
    },
    {
      "type": "narrator",
      "text": "他没有回头。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你就是那个无翼者，契约书上写的“长期合作”，说的就是你吧。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他放下镊子转过身，脸看起来比其他地精年轻很多，眼睛下方却挂着很深的黑眼圈，像是很久没睡过一个安稳觉了。他手里还攥着那块矿石，矿石的光芒映在他脸上，把他的眼睛照成了暗绿色。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我听说你身上带抗性，羽蚀不碰你，是真的吗？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "你可以自己验证。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "他笑了一下，笑容很浅，但你能看出他已经来了兴趣。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "好，我喜欢爽快人。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他把矿石丢进坩埚，抬手擦了擦掌心的灰，转身走到另一张木桌前，铺开一卷边角发皱的矿道地图。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我需要你去矿道深处采集“纯净污染结晶”，纯度越高越好。作为交换，我帮你打造一对义翼。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他抬起头看向你。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "但我得先跟你说清楚，矿道最近不太平，有好几个矿工在下面失踪了，大公派人下去找也没结果。你要是下矿，自己小心点。",
      "role": "npc"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "A. “失踪是怎么回事？”",
          "next": "workshop_a"
        },
        {
          "label": "B. “成交，我去。”",
          "next": "workshop_b"
        },
        {
          "label": "C. “你为什么需要纯净污染结晶？”",
          "next": "workshop_c"
        }
      ]
    }
  ],
  "workshop_a": [
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我不知道，但那些矿工最后出现的位置，都在深暗裂隙附近。大公说那是禁区，不让任何人靠近。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他往洞口方向扫了一眼，往前凑了凑，刻意压低了声音。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "但我不信大公那套，我自己下去过一次，在那儿看到了些东西......不是污染，是别的东西，很古老，看着像是某种装置。我没敢走近看。",
      "role": "npc"
    },
    {
      "type": "effect",
      "affection": 5,
      "addIntels": [
        "深暗裂隙的异常"
      ]
    },
    {
      "type": "jump",
      "goto": "mine"
    }
  ],
  "workshop_b": [
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "爽快。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他把挂在墙钉上的旧矿灯取下来，连同打包好的采集工具一起递到你面前。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "矿道很深，带够补给，三天之内回来。要是你没回来，我会去找你，但我不敢保证能找到。",
      "role": "npc"
    },
    {
      "type": "effect",
      "affection": 10
    },
    {
      "type": "jump",
      "goto": "mine"
    }
  ],
  "workshop_c": [
    {
      "type": "narrator",
      "text": "格里姆的动作顿了一下，他放下手里的工具，看向坩埚里冒泡的液体。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "……你问这个做什么？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "我不做不清楚用途的交易。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "他沉默了很久，然后抬起头。他的眼神比刚才更认真了几分。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "是我妹妹......十年前那场矿难，她被污染了。我一直在想办法把她变回来。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他停顿了片刻。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你可以觉得我疯了，但我不在乎。",
      "role": "npc"
    },
    {
      "type": "effect",
      "affection": 8,
      "addIntels": [
        "格里姆的妹妹"
      ]
    },
    {
      "type": "jump",
      "goto": "mine"
    }
  ],
  "mine": [
    {
      "type": "title",
      "chapter": "第三幕",
      "subtitle": "矿道深处"
    },
    {
      "type": "narrator",
      "text": "你顺着矿道往下走，越往深处，结晶分布得越多。嵌在墙壁上的黑色晶体，在矿灯的光线里折射出幽幽的暗紫色光晕。空气中的硫黄味愈发浓重，还混着一股说不清的甜腻气味。"
    },
    {
      "type": "narrator",
      "text": "你走了许久，矿道越来越窄，也越来越暗。你路过几处废弃采矿点——矿车翻倒在地，工具散落得到处都是。地面印着杂乱不堪的脚印，看得出来是有人慌不择路奔逃时留下的。"
    },
    {
      "type": "narrator",
      "text": "你继续往下走，矿道尽头是一道被铁链锁住的裂缝。铁链上刻着符文，和你之前在地精契约书上见过的符文一模一样。裂缝深处漏出微弱的光，闪动的节奏很慢，就像某种生物在缓慢呼吸。"
    },
    {
      "type": "narrator",
      "text": "你站在裂缝前，能感觉到脚下的地面在微微震动，频率和心跳刚好一致。"
    },
    {
      "type": "narrator",
      "text": "你把手按在裂缝边缘，震动停了一瞬，随后一个声音从裂缝深处传了上来，声音又低又沉，闷哑得像是沉睡在泥土底下的人，翻了个身。"
    },
    {
      "type": "narrator",
      "text": "你收回手，震动又恢复了原来的节奏。"
    },
    {
      "type": "narrator",
      "text": "小游戏：【矿道采集】"
    },
    {
      "type": "minigame",
      "id": "mining",
      "url": "game1.html?mode=under",
      "success": "mine_success",
      "fail": "mine_retry"
    }
  ],
  "mine_retry": [
    {
      "type": "narrator",
      "text": "晶石数量好像还不够，再采集一轮吧。"
    },
    {
      "type": "minigame",
      "id": "mining",
      "url": "game1.html?mode=under",
      "success": "mine_success",
      "fail": "mine_retry"
    }
  ],
  "mine_success": [
    {
      "type": "narrator",
      "text": "你采集了几块纯洁的晶石结晶，随后转身往回走。你没有回头，却能清楚地感觉到——裂缝深处有什么东西，正盯着你离开的方向。"
    },
    {
      "type": "title",
      "chapter": "第四幕",
      "subtitle": "归来"
    },
    {
      "type": "narrator",
      "text": "你回到炼金工坊，格里姆正在工作台前调试一台仪器。他听到脚步声转过头，看见你手里攥着的结晶，灰褐的眼睛一下亮了起来。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "纯度不错。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他接过结晶，放进一座熔炉里。熔炉里翻涌的火焰瞬间变成了一种诡异的幽蓝色。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "三天，三天之后来取义翼。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他转过身继续操作仪器，忽然顿了一下，没有回头。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你下矿的时候——有没有看到那道裂缝？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "看到了。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "他沉默了片刻。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "别靠近那里，那是大公的地盘。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他转过身看向你，表情很平静，但你能看到他按在仪器边缘的手指因为用力，已经微微泛白。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "但如果你真在那里看到了什么，一定要告诉我。我不信大公，他说的每一句话，我都要亲自验证。",
      "role": "npc"
    },
    {
      "type": "effect",
      "affection": 5
    },
    {
      "type": "title",
      "chapter": "第五幕",
      "subtitle": "夜谈"
    },
    {
      "type": "narrator",
      "text": "那天深夜，你躺在床上辗转难眠，索性披衣走出工坊，来到矿道边缘。熔岩顺着城外的地下河缓缓淌过，把整片矿道都浸成了暗红色。你坐在一块岩石上，看着熔岩慢慢流动。"
    },
    {
      "type": "narrator",
      "text": "身后传来脚步声，格里姆走到你身旁坐下，没有说话。他手里拿着一只小铁盒——就是你白天见过的那一只。"
    },
    {
      "type": "narrator",
      "text": "过了很久，他才开口。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "十年前，我妹妹莉亚在那场矿难里被污染了。她困在下面整整三天，等我找到她的时候，她已经被污染了一半。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他打开铁盒，里面放着一只小小的布偶，长着歪歪扭扭的耳朵，眼睛是用线缝出来的。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "她自己做的，小时候做的。当时她说“哥哥，这个送给你，要是害怕就抱着它”。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他合上铁盒。"
    },
    {
      "type": "char",
      "speaker": "格里姆说",
      "text": "我研究污染结晶整整十年，试过了所有方法——净化、中和、逆转，可没有一种办法能让她完全恢复。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他转过头看向你，眼睛在熔岩的红光里浮着暗绿色的光。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "所以我才需要你的抗性，它和污染同源，方向却正好相反。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他站起身，低头看着你。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你不用现在就回答我，但如果你愿意帮忙，明天告诉我就行。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他转身走回工坊，你依旧坐在岩石上，熔岩还在缓缓流淌。你把铁盒攥在手里，盒身凉得刺骨。"
    },
    {
      "type": "jump",
      "goto": "freedom1"
    }
  ],
  "mainmap_1": [
    {"type": "freedomEnd", "day": 1, "next": "chapter2"}
  ],
  "freedom1": [
    {"type": "narrator", "text": "【自由行动日 1】\n点击左上角小地图开启自由探索。"}
  ],
  "mainmap_2": [
    {"type": "freedomEnd", "day": 2, "next": "chapter3"}
  ],
  "freedom2": [
    {"type": "narrator", "text": "【自由行动日 2】\n点击左上角小地图开启自由探索。"}
  ],
  "mainmap_3": [
    {"type": "freedomEnd", "day": 3, "next": "chapter4"}
  ],
  "freedom3": [
    {"type": "narrator", "text": "【自由行动日 3】\n点击左上角小地图开启自由探索。"}
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
    {"type":"skillcheck","id":"feather","success":"yun_feather_ok","fail":"yun_feather_fail","url":"game2.html?mode=under"}
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
    {"type":"infiltration","id":"sky_archive","success":"trial_infil_ok","fail":"trial_infil_fail","url":"game4.html?mode=under"}
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
    {"type":"skillcheck","id":"rune_tune","success":"fu_tune_ok","fail":"fu_tune_partial","url":"game5.html?mode=under&task=rune"}
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
    {"type":"battle","id":"isolation","success":"wu_win","fail":"wu_lose","url":"game3.html?mode=under"}
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
    {"type":"skillcheck","id":"council","success":"steam_vote_ok","fail":"steam_vote_fail","url":"game5.html?mode=under&task=council"}
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
    {"type":"skillcheck","id":"mine","success":"kuang_mine_ok","fail":"kuang_mine_fail","url":"game1.html?mode=under"}
  ],
  "kuang_mine_ok":
  [
    {"type":"narrator","text":"你采满了一整筐晶石。"},
    {"type":"effect","addItems":{"pureCrystal":1},"memoryDelta":3,"affection":3},
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
    {"type":"effect","addItems":{"rareOre":2},"addIntels":["独自下矿的人"],"affection":8},
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
    {"type":"battle","id":"haggle","success":"di_haggle_ok","fail":"di_haggle_priceup","cancel":"di_haggle_cancel","url":"game3.html?mode=under"}
  ],
  "di_haggle_ok":
  [
    {"type":"narrator","text":"你打赢了老地精。“你比大公派来的人有意思。”老地精大笑，本日全部商品都便宜了。"},
    {"type":"effect","affection":3},
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
    {"type":"effect","addIntels":["一条侧路"],"affection":2},
    {"type":"freedomReturn"}
  ],
  "jiu_intel2":
  [
    {"type":"narrator","text":"矿工说起大公的晶化卫兵，语气里全是忌惮。"},
    {"type":"effect","addIntels":["晶化卫兵不睡"],"affection":2},
    {"type":"freedomReturn"}
  ],
  "jiu_intel3":
  [
    {"type":"narrator","text":"矿工盯着酒杯，说出了熔炉火种熄灭的真相。"},
    {"type":"effect","addIntels":["火种是谁掐的"],"affection":2},
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
    {"type":"battle","id":"rift","success":"shen_win","fail":"shen_lose","url":"game3.html?mode=under"}
  ],
  "shen_win":
  [
    {"type":"narrator","text":"晶骸倒下，结晶碎了一地。你捡起最亮的那几块。"},
    {"type":"effect","addItems":{"crystalFragment":3,"highPurityCrystal":1},"memoryDelta":6,"affection":5},
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
    {"type":"infiltration","id":"lab","success":"hui_infil_ok","fail":"hui_infil_fail","url":"game4.html?mode=under"}
  ],
  "hui_infil_ok":
  [
    {"type":"narrator","text":"你成功摸清了实验室的每一个角落。"},
    {"type":"effect","affection":15,"flags":{"huiPhase":"log"}},
    {"type":"freedomReturn"}
  ],
  "hui_infil_fail":
  [
    {"type":"narrator","text":"你被晶化卫兵赶了出来，格里姆似乎并不意外。"},
    {"type":"effect","affection":8},
    {"type":"freedomReturn"}
  ],
  "hui_log_read":
  [
    {"type":"narrator","text":"你翻到实验日志：第七十一号→第七十二号→第七十三号（莉亚的编号，备注只有“保留”）→未编号的“下一阶段：活体提取。对象——无翼者。”"},
    {"type":"effect","affection":10,"flags":{"huiPhase":"done"}},
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
    {"type":"effect","addIntels":["大公最近的动静"],"flags":{"tongIntelDone":true},"affection":3},
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
    {"type":"skillcheck","id":"echo","success":"dong_song_ok","fail":"dong_song_partial","url":"game8.html?mode=under"}
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
    {"type":"minigame","id":"gen_moss","url":"game7.html?mode=under&task=moss","success":"gen_moss_win","fail":"gen_moss_fail"}
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
    {"type":"minigame","id":"zhao_moss","url":"game7.html?mode=under&task=moss","success":"zhao_moss_win","fail":"zhao_moss_fail"}
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
    {"type":"battle","id":"deer","success":"zhao_deer_kill","fail":"zhao_deer_release","url":"game3.html?mode=under"}
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
    {"type":"auto","options":
    [
      {"min":31,"max":9999,"next":"ruins_grim_talk"},
      {"min":-9999,"max":30,"next":"ruins_grim_only"}
    ]}
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

  "chapter2": [
    {
      "type": "title",
      "chapter": "第二章",
      "subtitle": "熔岩之心"
    },
    {
      "type": "narrator",
      "text": "第二天深夜，你被一阵震动惊醒。起来发现格里姆给你留了消息，说是出大事了。"
    },
    {
      "type": "title",
      "chapter": "第一幕",
      "subtitle": "意外"
    },
    {
      "type": "narrator",
      "text": "你走出工坊，就看见矿道里的人都在往外跑，熔岩炉的方向传来低沉的轰鸣声。"
    },
    {
      "type": "narrator",
      "text": "你逆着人流往熔岩炉走，炉门大敞着，里面一片漆黑。你走进里面，熔岩炉已经熄灭了，冷却的熔岩管壁上盖着厚厚的黑色结晶。空气中满是刺鼻的硫黄味，远处的废墟里有尸骸在游荡。"
    },
    {
      "type": "narrator",
      "text": "格里姆静立在熔岩炉前，实验袍上蒙着厚厚一层黑灰。他听见你踩在碎石上的脚步声，并没有回头。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "熔岩炉熄了，大公派人掐断了火种。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "为什么？",
      "role": "player"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "因为他不想要熔岩炉了，他想要别的。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他转过身看向你，眼睛在黑暗中泛着暗绿色的光。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "他想要污染，他正在做实验，用活地精做实验。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他往前踏近一步，话音压得极低，带着压抑的震动。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你下矿时看到的裂缝——那不是自然形成的，是大公挖的。他在找锁神装置，想把供给天空之城能量的神明索尔温的力量挖出来。",
      "role": "npc"
    },
    {
      "type": "effect",
      "affection": 5
    },
    {
      "type": "title",
      "chapter": "第二幕",
      "subtitle": "灰烬实验室"
    },
    {
      "type": "narrator",
      "text": "格里姆带你穿过一条隐蔽的矿道，来到一扇刻着大公徽章的铁门前。他用钥匙打开门，实验室内部比你想象的更大——四壁嵌着密密麻麻的透明玻璃容器，福尔马林的浸泡液里浮着各式形态各异的结晶样本，有些样本还保留着地精的轮廓，他们的手指张开着，像是在抓什么东西。"
    },
    {
      "type": "narrator",
      "text": "你走到实验室深处，一份实验日志摊开在桌面上，上面写着：“第七十三号实验——晶化士兵培育，成功，无自我意识，可执行基础指令。”"
    },
    {
      "type": "narrator",
      "text": "格里姆站在你身后，枯瘦的手控制不住地簌簌发抖。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我妹妹……也在这里，她在容器里。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他走到最角落的容器前，容器里是一个地精女孩，身体已经有一半结晶化了，但另一半还保留着生前的模样，眼睛闭着，手里握着一只很小的东西——像是某种玩具。"
    },
    {
      "type": "narrator",
      "text": "格里姆把手按在容器表面，手指在玻璃上留下了模糊的痕迹。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "这是莉亚，我的妹妹。十年前的矿难，她被困在下面三天，等我找到她的时候，她已经变成这样了。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他猛地转过身看向你，眼白爬满了狰狞的红血丝，下颌紧咬着，没有掉一滴泪。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "大公说她在“休眠”，说她在“治疗”，说只要我替他做实验，就能让她恢复。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "你信他吗？",
      "role": "player"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我不信，但我没有别的选择。",
      "role": "npc"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "A. “你还有选择。”",
          "next": "lab_a"
        },
        {
          "label": "B. “我可以帮你把莉亚带出去。”",
          "next": "lab_b"
        },
        {
          "label": "C. 沉默，站在他旁边。",
          "next": "lab_c"
        }
      ]
    }
  ],
  "lab_a": [
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "什么选择？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "把真相公开，让所有地精都知道大公在做什么。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "格里姆沉默了很久。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "公开……然后呢？大公会杀了她，也会杀了我。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "但至少不会再有其他人死了。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "他低下头，手指慢慢在容器表面收紧。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "……你说得对，我会试试的。",
      "role": "npc"
    },
    {
      "type": "effect",
      "affection": 15
    },
    {
      "type": "jump",
      "goto": "palace"
    }
  ],
  "lab_b": [
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "带出去？她现在动不了，她被连接在容器上。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "我们一起想办法。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "他抬起头看向你，眼神很复杂。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你为什么要帮我？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "因为你不该一个人扛下这一切，如果有个人来的话，应该会轻松一点。",
      "role": "player"
    },
    {
      "type": "effect",
      "affection": 12
    },
    {
      "type": "jump",
      "goto": "palace"
    }
  ],
  "lab_c": [
    {
      "type": "narrator",
      "text": "你没有说话，站在他身旁看着容器里的莉亚。她脸上没有痛苦，只是在睡觉，可你不知道她还会不会醒来。"
    },
    {
      "type": "narrator",
      "text": "格里姆也没有说话，你们就静静地在实验室站了很久，之后他开口了。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "谢谢你陪着我来，没有劝我放弃。",
      "role": "npc"
    },
    {
      "type": "effect",
      "affection": 8
    },
    {
      "type": "jump",
      "goto": "palace"
    }
  ],
  "palace": [
    {
      "type": "title",
      "chapter": "第三幕",
      "subtitle": "大公的宫殿"
    },
    {
      "type": "narrator",
      "text": "第二天，大公派人来传唤你们。宫殿藏在矿道最深处，岩壁上嵌满了熔岩晶石，幽幽的光从晶石里渗出来，把整座宫殿浸成了朦胧的暗金色。大公坐在熔岩铸成的王座上，耳朵比普通地精更长，手指上戴满了炼金戒指，每一枚都散发着光。他身后站着一排晶化卫兵——就是那些没有意识、只会执行命令的地精。"
    },
    {
      "type": "char",
      "speaker": "大公",
      "text": "格里姆，我听说你带了个人类进来。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "他是无翼者，他有抗性，他可以帮我们——",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "大公",
      "text": "帮我？帮我什么？",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他缓缓站起身，一步步走到你面前——他比其他地精都要高大许多，身高几乎和你平齐。"
    },
    {
      "type": "char",
      "speaker": "大公",
      "text": "帮我做实验，我需要你的血，需要你的抗性。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他伸出手，手指上的戒指正在发光。"
    },
    {
      "type": "char",
      "speaker": "大公",
      "text": "把血给我，我就能让格里姆的妹妹恢复，让所有被污染的地精都恢复，你只需要——",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "格里姆立刻挡在你面前。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "不行。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "大公看着格里姆，脸上没有丝毫波澜，但他身后的晶化卫兵却齐齐动了——他们整齐地向前迈出了一步。"
    },
    {
      "type": "char",
      "speaker": "大公",
      "text": "格里姆，你是我最聪明的学生，但你的聪明，总用错了地方。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他抬起手，晶化卫兵向前逼近，格里姆拉住你的手臂。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "跑。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你们冲出宫殿，身后传来大公的怒吼和卫兵的脚步声。"
    },
    {
      "type": "title",
      "chapter": "第四幕",
      "subtitle": "逃亡"
    },
    {
      "type": "narrator",
      "text": "格里姆拉起你的手，把你推进宫殿侧面的暗道。你们在昏暗矿道里奔逃了很久，格里姆对这里的每一条路径都烂熟于心——他领着你穿过后塌陷的废弃支道，悄悄绕开巡逻卫兵的路线，最终停在一间隐蔽的地下室，这里是他从前的私人实验室。"
    },
    {
      "type": "narrator",
      "text": "格里姆靠在墙上喘着气，手里还攥着那只从莉亚容器旁拿出来的小东西，那是一只地精手工缝制的布偶，耳朵歪歪扭扭的，眼睛也是歪歪扭扭用粗线缝出来的。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "这是她做的，她小时候做的。她说——“哥哥，这个送你，害怕的时候就抱着它”",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他低下头，用力将那只布偶抱在怀里，随后又抬起头看向你。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我不能把她留在大公手里，可我一个人救不出她.......",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你愿意帮我吗？",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你迟疑了一下，想起那天晚上格里姆平静而悲伤的面容，最终还是开了口。"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "可以。",
      "role": "player"
    },
    {
      "type": "effect",
      "affection": 10
    },
    {
      "type": "title",
      "chapter": "第五幕",
      "subtitle": "三天"
    },
    {
      "type": "narrator",
      "text": "你们在地下室躲了三天。第三天傍晚，格里姆打开一只铁盒子，里面放着一对银灰色的义翼骨架，还只是半成品，关节处用生涩的螺纹粗糙地连接着。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "材料不够，只能做到这一步。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他抬眼看向你，脸上没有多余的表情，平静得像一潭深湖。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "如果你要走，现在就可以动身。大公不会追你，他要找的是我，不是你。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他停顿了片刻。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "但如果你留下来，我们就一起去救莉亚。",
      "role": "npc"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "A. “我会留下来。”",
          "next": "stay_a"
        },
        {
          "label": "B. “我需要准备一下。”",
          "next": "stay_b"
        },
        {
          "label": "C. “你为什么不自己逃？”",
          "next": "stay_c"
        }
      ]
    }
  ],
  "stay_a": [
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "好。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他伸出手，你握住了他的手。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "那我们今晚就出发。大公把莉亚转移到了灰烬实验室的最底层，他觉得那里是最安全的地方......",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "只是我们还是打探到了。",
      "role": "npc"
    },
    {
      "type": "effect",
      "affection": 15
    },
    {
      "type": "jump",
      "goto": "chapter2_unified"
    }
  ],
  "stay_b": [
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你需要多久？我们没有多少时间了......",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "没多久，就明天。",
      "role": "player"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "好，就明天。",
      "role": "npc"
    },
    {
      "type": "effect",
      "affection": 5
    },
    {
      "type": "jump",
      "goto": "chapter2_unified"
    }
  ],
  "stay_c": [
    {
      "type": "narrator",
      "text": "格里姆看着你，沉默了很久。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "因为我妹妹在那里，我不能把她一个人留在那儿。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "你去了会死的。",
      "role": "player"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "死就死，反正自从妹妹昏迷后我也没有什么好活下去的了。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他转过身，低头看了看妹妹给他缝的布偶，背对着你。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你可以走了，我不会拦你。",
      "role": "npc"
    },
    {
      "type": "effect",
      "affection": -5
    },
    {
      "type": "jump",
      "goto": "chapter2_unified"
    }
  ],
  "chapter2_unified": [
    {
      "type": "narrator",
      "text": "那天深夜，格里姆站在地下室的窗前，望着远处的熔岩炉，火光在他眼里明明灭灭地跳动。"
    },
    {
      "type": "narrator",
      "text": "你走到他身边，他没有回头。"
    },
    {
      "type": "char",
      "speaker": "格里姆说",
      "text": "十年前，我没能救走她，也没能及时赶到她身旁。等我找到她的时候，她已经被污染了一半。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我每天都在想，如果我早到一天，她会不会还是原来的样子......会不会还像以前那样叫我“哥哥，我害怕”。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他转过身看向你。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "现在我有机会了，我有机会再来一次。所以不管结果是什么，我都要试一试。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他走到工作台前，拿起那只小铁盒，递到你面前。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "这个你拿着，如果我出事了，就把它交给莉亚，告诉她，哥哥一直带在身边。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "告诉她，哥哥很想她。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你接过铁盒，冰凉的触感从盒身顺着指尖漫上来。格里姆转过身，继续调试仪器，他的背影清瘦，肩膀窄薄，可握着工具的手始终稳着，动作半分没有停下。"
    },
    {
      "type": "jump",
      "goto": "freedom2"
    }
  ],
  "chapter3": [
    {
      "type": "title",
      "chapter": "第三章",
      "subtitle": "灰烬之子"
    },
    {
      "type": "narrator",
      "text": "休整了一天，你又回到了格里姆留给你的房间。"
    },
    {
      "type": "narrator",
      "text": "明天就要行动了，你躺在床上，希望一切顺利。"
    },
    {
      "type": "title",
      "chapter": "第一幕",
      "subtitle": "准备"
    },
    {
      "type": "narrator",
      "text": "第二天清晨，格里姆都会把你叫到工作台前。他换了一件干净的实验袍，手里拿着一只小铁盒。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "在灰烬实验室的最底层，大公加了三道符文锁。我需要你去黑市买一样东西，就是“破符水”，它能暂时让符文锁失去功效。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他把一小袋记忆碎片推到你面前。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "这是我能拿出来的全部家当了，不够的部分，你看着想办法。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你接过碎片，走出地下室，穿过矿道，抵达地精黑市。黑市藏在矿道最深处，狭窄的通道两侧挤着密密麻麻的摊位，昏黄的灯光在岩壁间摇摇晃晃，摊贩们都压着嗓子用暗语叫卖。你走到一个摊位前，摊主是个老地精，左眼蒙着一块皮革眼罩，右手缺了两根手指。"
    },
    {
      "type": "char",
      "speaker": "老地精",
      "text": "破符水？你带了多少碎片？",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你拿出碎片给他看，他扫了一眼，摇了摇头。"
    },
    {
      "type": "char",
      "speaker": "老地精",
      "text": "不够......但如果你帮我一个忙，作为交换，我可以把破符水给你。",
      "role": "npc"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "A. 帮老地精找回丢失的货物",
          "next": "black_a"
        },
        {
          "label": "B. 用你的血换破符水",
          "next": "black_b"
        },
        {
          "label": "C. 拒绝，另想办法",
          "next": "black_c"
        }
      ]
    }
  ],
  "black_a": [
    {
      "type": "char",
      "speaker": "老地精",
      "text": "一批炼金材料在矿道里丢了，被晶骸拖走了。你去拿回来，我等你。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你深入矿道，昏黄的火把微光被潮湿的矿道雾气揉得朦胧，沾着岩灰的石阶向幽深的地底不断延伸，四周只能听见自己的脚步声和岩壁缝隙里滴答的渗水声响，你紧了紧手中的武器，一步步朝着晶骸活动的区域缓缓走去。"
    },
    {
      "type": "battle",
      "id": "cargo_battle",
      "url": "game3.html?mode=under",
      "success": "cargo_success",
      "fail": "cargo_fail"
    }
  ],
  "cargo_success": [
    {
      "type": "narrator",
      "text": "你很顺利地清理了晶骸，找回了货物。老地精把破符水给了你。"
    },
    {
      "type": "narrator",
      "text": "记忆碎片+5，货币，可用于购买物品。"
    },
    {
      "type": "effect",
      "addItems": {
        "breakerWater": 1
      },
      "memoryDelta": 5
    },
    {
      "type": "jump",
      "goto": "ash_lab"
    }
  ],
  "cargo_fail": [
    {
      "type": "narrator",
      "text": "你被晶骸的晶体利爪击中，视野边缘染上暗红。但老地精的货物就在你的不远处，你用力一扑挡在了那堆货物面前。背靠着货物，你用力化解了两只晶骸猛攻，他们见大势已去，自讨没趣的离开了。"
    },
    {
      "type": "narrator",
      "text": "你将货物带回去，老地精将破符水给了你。"
    },
    {
      "type": "effect",
      "addItems": {
        "breakerWater": 1
      },
      "affection": 5
    },
    {
      "type": "jump",
      "goto": "ash_lab"
    }
  ],
  "black_b": [
    {
      "type": "char",
      "speaker": "老地精",
      "text": "你的血？你是无翼者……你的血有抗性，有点意思。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他拿一根银针扎破了你的之间，取了一滴血，滴进一只小瓶子里，瓶中液体立刻泛起了浅浅的银色的光。"
    },
    {
      "type": "char",
      "speaker": "老地精",
      "text": "成交。",
      "role": "npc"
    },
    {
      "type": "effect",
      "addItems": {
        "breakerWater": 1
      },
      "affection": 3,
      "flags": {
        "bloodTraded": true
      }
    },
    {
      "type": "jump",
      "goto": "ash_lab"
    }
  ],
  "black_c": [
    {
      "type": "narrator",
      "text": "你离开黑市，忽然想起格里姆的工坊里有一些未完成的炼金仪器。你回到地下室，花了半天时间调试，做出了一瓶不完美的破符水。"
    },
    {
      "type": "effect",
      "addItems": {
        "imperfectBreakerWater": 1
      }
    },
    {
      "type": "jump",
      "goto": "ash_lab"
    }
  ],
  "ash_lab": [
    {
      "type": "title",
      "chapter": "第二幕",
      "subtitle": "灰烬实验室"
    },
    {
      "type": "effect",
      "removeItems": {
        "breakerWater": 1,
        "imperfectBreakerWater": 1
      }
    },
    {
      "type": "narrator",
      "text": "你们来到灰烬实验室入口，大门上刻着三道符文锁。格里姆把破符水滴在锁上，符文的光芒暗了一瞬，紧接着第一道锁开了，第二道锁也开了，第三道锁却卡住了。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "……没完全打开。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他推了推门，门开了一条缝，刚好够一个人侧身挤进去。格里姆先钻了进去，你跟在后面。"
    },
    {
      "type": "narrator",
      "text": "实验室底层比上面更冷，墙壁上嵌满了透明容器，容器里浸泡着晶化的地精——有的完整，有的残缺，他们脸上凝着毫无生气的空茫，眼窝是空洞的。"
    },
    {
      "type": "narrator",
      "text": "莉亚的容器放在实验室最深处的角落里，她的身体比你上次见到时晶化得更深了，左手已经彻底变成了黑色结晶，可右手依旧紧紧攥着那只布偶——布偶长着歪歪扭扭的耳朵，眼睛是针线缝出来的。"
    },
    {
      "type": "narrator",
      "text": "格里姆站在容器前，把手按在玻璃上。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "莉亚，哥哥来了。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "容器里的莉亚没有反应，她闭着眼睛，只有胸口伴着微弱的呼吸缓缓起伏，那是她身上唯一还在动弹的地方。"
    },
    {
      "type": "narrator",
      "text": "格里姆转过身看向你，他的双眼爬满了红血丝，眼窝陷得深深的。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我需要你帮我。容器连着一台炼金仪器，得有人去关掉它，可仪器旁边守着晶化卫兵。",
      "role": "npc"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "A. “我去关仪器，你在这里陪她。”",
          "next": "rescue_a"
        },
        {
          "label": "B. “你关仪器，我引开卫兵。”",
          "next": "rescue_b"
        },
        {
          "label": "C. “我们一起过去。”",
          "next": "rescue_c"
        }
      ]
    }
  ],
  "rescue_a": [
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "……好。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你走向仪器，晶化卫兵朝你走来，你拔出了武器。"
    },
    {
      "type": "battle",
      "id": "lab_battle",
      "url": "game3.html?mode=under",
      "success": "rescue_a_success",
      "fail": "rescue_a_fail"
    }
  ],
  "rescue_a_success": [
    {
      "type": "narrator",
      "text": "你关闭了仪器，容器里的液体开始排空，莉亚胸口的起伏变得更明显。格里姆打开容器，把她抱了出来。"
    },
    {
      "type": "effect",
      "affection": 15,
      "addStatuses": [
        "莉亚获救"
      ],
      "flags": {
        "liaRescued": true
      }
    },
    {
      "type": "jump",
      "goto": "oath"
    }
  ],
  "rescue_a_fail": [
    {
      "type": "narrator",
      "text": "你被晶化卫兵击退，格里姆冲过来帮你，你们合力制服了卫兵，但仪器在战斗中被损坏，莉亚的容器开始泄漏。"
    },
    {
      "type": "effect",
      "affection": 8,
      "addStatuses": [
        "莉亚获救"
      ],
      "flags": {
        "liaRescued": true
      }
    },
    {
      "type": "jump",
      "goto": "oath"
    }
  ],
  "rescue_b": [
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你一个人可以吗？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "你对仪器更熟，快去吧。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "格里姆犹豫了一下，随后跑向仪器。你引着晶化卫兵，在错落摆着炼金器械的实验室里绕了三圈，格里姆终于关掉了仪器。你甩掉卫兵回到他身边时，莉亚的容器已经打开，她躺在格里姆怀里，眼睛还是闭着的。"
    },
    {
      "type": "effect",
      "affection": 10,
      "addStatuses": [
        "莉亚获救"
      ],
      "flags": {
        "liaRescued": true
      }
    },
    {
      "type": "jump",
      "goto": "oath"
    }
  ],
  "rescue_c": [
    {
      "type": "narrator",
      "text": "你们并肩冲向仪器，晶化卫兵听见动静迅速围了上来，你们背靠背战斗，几个回合下来竟不落下风。"
    },
    {
      "type": "narrator",
      "text": "最后还是格里姆用炼金炸弹清出一条路，你打开了仪器装置，一把将莉亚从容器里抱了出来。"
    },
    {
      "type": "effect",
      "affection": 12,
      "addStatuses": [
        "莉亚获救"
      ],
      "flags": {
        "liaRescued": true
      }
    },
    {
      "type": "jump",
      "goto": "oath"
    }
  ],
  "oath": [
    {
      "type": "title",
      "chapter": "第三幕",
      "subtitle": "好感锁定事件【灰烬之誓】"
    },
    {
      "type": "narrator",
      "text": "你们带着莉亚回到地下室，格里姆把她放在工作台上。她一半身体已经晶化，另一半还留着生前温热的模样，好像只是睡着了，但呼吸浅得像一缕游丝。"
    },
    {
      "type": "narrator",
      "text": "格里姆坐在她旁边，手指轻轻碰了碰她的脸颊，随后抬起头看向你。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "她还活着，但一直醒不过来。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他站起来，走到工作台边拿起那只小铁盒，盒里是半成品的义翼骨架。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我一直在琢磨一件事。我研究污染结晶十年了，试过所有办法——净化、中和、逆转，没有一种能让她完全恢复。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他转过身看向你。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "但你是无翼者，你身上有抗性，和污染同源，方向却相反。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他停顿了一下。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "如果你愿意——我可以把你的血和她的结晶样本融合。也许能唤醒她，也许不能，但这是目前最后的办法。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他抬眼看向你，眼底翻着掩不住的疲惫，却直直迎着你的目光，没有半分躲闪。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我要你告诉我，你愿意吗？",
      "role": "npc"
    },
    {
      "type": "auto",
      "options": [
        {
          "min": 60,
          "max": 9999,
          "next": "oath_high"
        },
        {
          "min": 30,
          "max": 59,
          "next": "oath_mid"
        },
        {
          "min": -9999,
          "max": 29,
          "next": "oath_low"
        }
      ]
    }
  ],
  "oath_high": [
    {
      "type": "narrator",
      "text": "你伸出手臂，格里姆看向你的手腕，沉默许久，才从抽屉里取出一只采血器。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "这会很疼，而且你会变得虚弱，至少要三天才能恢复......你能接受吗？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "我知道，没关系的。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "他刺破你的指尖，一滴血渗出来悬在指尖，泛着极淡的银色光泽。他将血滴落在莉亚的结晶样本上，样本猛地收缩了一下，紧接着银色从血滴落点向外扩散，一点点将周围的黑色纹路推了回去。"
    },
    {
      "type": "narrator",
      "text": "格里姆紧盯着那片扩散的银色，指尖控制不住地轻轻发颤。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "它退下去了。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他抬头看向你，眼眶已经浸满红意，却硬生生咬着牙没让泪落下来。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "谢谢你。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他低下头继续操作仪器，动作比之前更快，也比之前稳了太多。你靠在墙上，视野慢慢变暗，但你清楚，自己做了正确的选择。"
    },
    {
      "type": "effect",
      "flags": {
        "oathBranch": "symbiosis",
        "affectionMin": 60
      }
    },
    {
      "type": "jump",
      "goto": "oath_high_follow"
    }
  ],
  "oath_mid": [
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "怎么做？我把你的血和她的样本融合。如果成功，她或许会醒过来；如果失败，她会变成纯粹的晶骸。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他停顿了一下。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我不会骗你，这本来就是一场赌博。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "那你自己呢？你研究污染结晶十年，有没有想过，万一你被感染了怎么办？",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "格里姆沉默了很久。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我想过，我每天都在想。如果莉亚醒不过来，我至少可以陪她一起变成晶骸，我不想一个人活下去。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他低下头。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "但你......说得对，这个问题我一直在逃避。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他抬头看向你，眼神比刚才清明了许多。"
    },
    {
      "type": "char",
      "speaker": "格里姆说",
      "text": "如果你愿意帮我，我会按计划做实验，但我会一直留在实验室里。如果实验失败，我会把自己和她锁在一起，绝不会让污染扩散出去，不会殃及到其他人。",
      "role": "npc"
    },
    {
      "type": "effect",
      "flags": {
        "oathBranch": "choice",
        "affectionMin": 30,
        "affectionMax": 59
      }
    },
    {
      "type": "jump",
      "goto": "oath_mid_follow"
    }
  ],
  "oath_low": [
    {
      "type": "narrator",
      "text": "你后退一步，先看向容器里莉亚的结晶样本，又转过目光看向格里姆。"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "如果实验失败，她会变成晶骸，你也会被污染，整个地下古堡都会变成第二个灰烬实验室。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "格里姆看着你，沉默许久后笑了，那笑容浅得像落在雪上的月光，每一寸纹路里都带着掩不住的疲惫。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你说得对......",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他把采血器收起来，走到莉亚身边，将手轻轻放在她的额头上。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "其实我一直在骗自己，我以为只要我足够努力，就能把她带回来。但也许……我已经回不到那一天了，也许......她真的回不来了。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他转过身看向你，眼睛爬满了红血丝，却始终没有掉一滴泪。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "无论怎样，谢谢。你没有顺着我的意思来，如果连你都答应了，我可能真的会不管不顾做那件事。",
      "role": "npc"
    },
    {
      "type": "effect",
      "flags": {
        "oathBranch": "letgo",
        "affectionMax": 29
      }
    },
    {
      "type": "jump",
      "goto": "oath_low_follow"
    }
  ],
  "oath_high_follow": [
    {
      "type": "title",
      "chapter": "第四幕",
      "subtitle": "灰烬之誓·共生"
    },
    {
      "type": "narrator",
      "text": "你靠在墙上，视野慢慢变暗，格里姆并没有注意到你的状态，他正全神贯注地操作仪器。他把你的血和莉亚的结晶样本混合，放在显微镜下观察，动作稳得不像话，比之前任何时候都要稳。"
    },
    {
      "type": "narrator",
      "text": "过了很久，他缓缓抬起头，眸子里亮得像淬了星光，惊人得很。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "有反应，它没有扩散，它在融合。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他转过身看向你，这是他第一次露出真正的笑容。那笑容鲜活明亮，带着少年气，和他始终挂着倦意的脸不太相称，你一眼就能看出来，这是他压在心底很久都没有露出来过的神情。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "莉亚可能会醒，也许明天，也许后天，但她确实在好转。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他走到你面前，伸出手。你握住了，他的手带着温度。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你帮了我，我不会忘记你的。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他扶你坐下，把一只符文治疗包塞进你手里，接着走回工作台继续操作仪器，嘴里还哼着一首歌，调子压得很低很轻，晃晃悠悠的，像是地精坐在壁炉边哄孩子入睡的调子。"
    },
    {
      "type": "effect",
      "addItems": {
        "runeTreatmentPack": 1
      }
    },
    {
      "type": "jump",
      "goto": "warmth"
    }
  ],
  "oath_mid_follow": [
    {
      "type": "title",
      "chapter": "第四幕",
      "subtitle": "灰烬之誓·抉择"
    },
    {
      "type": "narrator",
      "text": "格里姆站在工作台前，手里攥着采血器。他看了看莉亚，又看了你，随后把采血器放回了抽屉。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你说得对，我不能拿你冒险，也不能拿她冒险。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他走到莉亚身旁，将手放在她的额头上，指尖控制不住地微微发颤。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "但我还是想试，用我自己的血。如果失败了——至少由我自己承担后果。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他拿起采血器，刺破自己的指尖，一滴暗红色的血慢慢渗了出来——血里缠著极细的黑色纹路。他把血滴在莉亚的结晶样本上，样本微微收缩了一下，却没有扩散。"
    },
    {
      "type": "narrator",
      "text": "他盯着样本看了很久，才抬起头，脸上一片平静。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "没用，我的血太脏了。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他把采血器扔进垃圾桶，走到你面前，坐在地上，将脸埋进手里。他没有哭，肩膀却控制不住地簌簌发颤。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我试了十年，还是不行。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你把手放在他肩上，他没有推开你。两人就这么坐了很久，随后他站起身，走到莉亚身边。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "只要她还在，那就还有希望。我会继续找的，总有一天......我一定能找到办法。",
      "role": "npc"
    },
    {
      "type": "jump",
      "goto": "warmth"
    }
  ],
  "oath_low_follow": [
    {
      "type": "title",
      "chapter": "第四幕",
      "subtitle": "灰烬之誓·放手"
    },
    {
      "type": "narrator",
      "text": "格里姆站在莉亚旁边，将手从她额头上收回来，转过身看向你，表情平静得可怕——平静到让你觉得，他其实早就做好了决定。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你说得对，我一直在骗自己。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他走到工作台前，把半成品的羽翼骨架收进铁盒，随后将铁盒递到你面前。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "这个给你，虽然没做完，但至少能用。你走吧，带上莉亚，去一个安全的地方。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "你呢？",
      "role": "player"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我会留下来，大公要找的是我，不是你们。只要我留下，他就不会追你们。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他走到莉亚身边，俯下身，光洁的额头轻轻贴了贴她的额角，静默着许久没动。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "替我照顾她，告诉她......哥哥一直带着那只布偶，从来没有离开过。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他重新站起身，这次坚定了许多。你站在房间里，莉亚微弱的呼吸落在空气里，冰凉的铁盒安安稳稳卧在你掌心。"
    },
    {
      "type": "effect",
      "addItems": {
        "unfinishedWing": 1
      }
    },
    {
      "type": "jump",
      "goto": "warmth"
    }
  ],
  "warmth": [
    {
      "type": "title",
      "chapter": "第五幕",
      "subtitle": "余温"
    },
    {
      "type": "narrator",
      "text": "那天深夜，地下室的门还是被敲响了。格里姆打开门,门外站着的是一名地精，正是黑市那个你见过的老地精。他半边脸颊肿起留着伤口，灰旧的实验袍下摆被撕开了一道破口。"
    },
    {
      "type": "char",
      "speaker": "老地精",
      "text": "大公知道你们在这里了，他派了晶化卫兵，半小时后就到。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "格里姆转过身看向你，脸上一片平静。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你走吧，带着莉亚，我留下来挡他们。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "你挡不住的。",
      "role": "player"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我知道。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他扭过头笑了笑。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "但你也说过，总要试一试的对不对？我沉溺过去太久，也该往前看了。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他走到工作台前，拿起那只小铁盒，把它塞进你手里。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "带她走吧，跑的越远越好，如果她醒了......告诉她，哥哥......很想她。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他把你推向暗道入口，你抱着莉亚，她轻得像一捧随风就要散掉的灰烬。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "走，别回头。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你走进暗道，身后传来铁门被撞开的声音，格里姆的炼金炸弹在黑暗中炸开，一道蓝光闪过，之后便只剩沉默。"
    },
    {
      "type": "narrator",
      "text": "你抱着莉亚在暗道里走了很久，暗道尽头透出一道光，通向锁神装置的裂缝。你走出去，站在裂缝前。"
    },
    {
      "type": "narrator",
      "text": "你回头望了一眼，暗道深处没有光，也没有声音，只有你怀里的莉亚还在微微呼吸。"
    },
    {
      "type": "jump",
      "goto": "freedom3"
    }
  ],
  "chapter4": [
    {
      "type": "title",
      "chapter": "第四章",
      "subtitle": "灰烬之下"
    },
    {
      "type": "narrator",
      "text": "你重新回到了那处裂缝，因为你想起格里姆曾对你说过裂缝下面有奇怪的东西。那是大公的秘密，格里姆被抓走了，你们也不能坐以待毙。"
    },
    {
      "type": "narrator",
      "text": "裂缝看着很深，但实际上并没有多高，你抱着莉亚爬下裂缝，终于看到了格里姆口中困着神明的容器。"
    },
    {
      "type": "title",
      "chapter": "第一幕",
      "subtitle": "裂缝之前"
    },
    {
      "type": "narrator",
      "text": "你站在锁神装置前，巨大的黑色晶石柱阵矗立在地下深处的巨型空腔中。索尔温的碎片在晶柱里缓缓蠕动，像无数被囚缚着、正在疯狂挣扎的影子。装置留有一处核心缺口，缺口里透出缕缕金色的光，微弱却始终稳定。"
    },
    {
      "type": "narrator",
      "text": "你怀里抱着莉亚，她依旧没有醒，呼吸浅得几乎看不见，只有手指微微动了一下——仅此而已。"
    },
    {
      "type": "narrator",
      "text": "你身后传来脚步声，你转过头，一道身影从暗道里走出来。他的翅膀收拢在背后，右翼残缺，左翼布满黑色结晶。半边脸覆盖着和风脉之心一样的黑色纹路。他头发花白如霜，身形瘦得像一株风干的古木，可眼睛却和你一样，深邃锐利，仿佛能看穿谎言。"
    },
    {
      "type": "narrator",
      "text": "他是艾德蒙，你的父亲。"
    },
    {
      "type": "narrator",
      "text": "他站在几步开外，没有看你怀里的莉亚，目光直直落在你身上。"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "你终于来了，我等了很久。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他拖着步子向前挪近一寸，脚步放得极慢，每动一下都像是在抽尽身体里残存的最后一丝力气。"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "我是艾德蒙·风行者，是你的父亲，也是二十年前激活锁神装置的人。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "你知道锁神装置是什么吗？它囚禁了一位神——索尔温。三千年前，羽人皇室将祂锁在这地底，又把祂的牺牲化作了囚禁祂的牢笼。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他停下话语，抬起头看向你。"
    },
    {
      "type": "char",
      "speaker": "艾德蒙说",
      "text": "二十年前，我找到这个装置，想要毁掉它。我原以为只要毁了装置，索尔温就能重获自由，但我错了。祂已经疯了，三千年的囚禁把祂熬得只剩下满腔恨意，我放出来的根本不是神，是一个被折磨了三千年的囚徒。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "于是我逃了，把自己关在锁神装置里研究了二十年，试图找到一个两全的办法，既不释放祂，也不用永远囚禁祂，但我失败了。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他看向你。"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "我释放出了污染，却没有办法解决它。现在，就在我们脚底下，囚神装置也快要失效了。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "只是......我一生都没有找到的办法，你却找到了，你找到了格里姆，找到了他的妹妹，也找到了这座地底城市里所有被遗忘的人。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他又走近一步，声音轻得像风，可每个字都清晰得敲在人心上。"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "现在轮到你做选择了，对于我这个罪魁凶手，你现在打算怎么做？",
      "role": "npc"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "A. 杀父",
          "next": "father_kill"
        },
        {
          "label": "B. 与他合作",
          "next": "father_cooperate"
        },
        {
          "label": "C. 放他走",
          "next": "father_release"
        }
      ]
    }
  ],
  "father_kill": [
    {
      "type": "narrator",
      "text": "你缓缓拔出武器，艾德蒙没有分毫躲闪，只是静静望着你，眼神里没有半分恐惧，只有一种积蓄了太久的异样释然。"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "你比我勇敢太多。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你动手了，他倒在锁神装置的边缘，那对残破的翅膀在锁神装置溢出的金光里，缓缓完成了最后一次张开。你从他身上取下一根【染血的羽毛】。"
    },
    {
      "type": "effect",
      "addItems": {
        "bloodFeather": 1
      },
      "companionAffection": 15,
      "flags": {
        "fatherFate": "kill"
      }
    },
    {
      "type": "jump",
      "goto": "lia_wakes"
    }
  ],
  "father_cooperate": [
    {
      "type": "narrator",
      "text": "你朝他伸出手，他的目光落在你手上，沉默了很久，最终还是抬起手，缓缓握了上来。"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "你要与我合作？好。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "那我们一起下去，我带你去找装置。但你要答应我一件事——如果到时候必须做出选择，别因为我犹豫。",
      "role": "npc"
    },
    {
      "type": "effect",
      "addStatuses": [
        "父亲的同行"
      ],
      "companionAffection": -30,
      "flags": {
        "fatherFate": "cooperate"
      }
    },
    {
      "type": "jump",
      "goto": "lia_wakes"
    }
  ],
  "father_release": [
    {
      "type": "narrator",
      "text": "你向后退了一步，指向暗道出口，他看了你很久。"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "你要放我走？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "你比我聪明，但你也会付出代价——那些信任你的人不会原谅你。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他转身消失在暗道深处，你站在原地，听到他的声音从远处飘来，微弱得几乎听不清：“谢谢你。”"
    },
    {
      "type": "effect",
      "addItems": {
        "fatherTalisman": 1
      },
      "companionAffection": -5,
      "flags": {
        "fatherFate": "release"
      }
    },
    {
      "type": "jump",
      "goto": "lia_wakes"
    }
  ],
  "lia_wakes": [
    {
      "type": "title",
      "chapter": "第二幕",
      "subtitle": "莉亚醒了"
    },
    {
      "type": "narrator",
      "text": "你站在锁神装置前，怀里抱着莉亚，听到她动了一下，接着她睁开了眼睛。"
    },
    {
      "type": "narrator",
      "text": "她的眼睛是暗绿色的，和她哥哥一模一样。恢复肉身的右手慢慢从你怀里抬起，攥住了你的衣领，左手还维持着半透明的结晶状态，刚刚苏醒的右手带着活人特有的温热触感。"
    },
    {
      "type": "char",
      "speaker": "莉亚",
      "text": "……你，你是谁？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "我是你哥哥的朋友。",
      "role": "player"
    },
    {
      "type": "char",
      "speaker": "莉亚",
      "text": "我的哥哥，格里姆……他在哪？",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你没有回答，只是看着她的眼睛。她似乎是意识到了什么，瞳孔骤然亮起，像是刚从一场跨越数年的漫长沉眠中猛地挣脱出来。"
    },
    {
      "type": "char",
      "speaker": "莉亚",
      "text": "他还在下面对不对？还在大公的实验室里。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "她松开你的衣领，看向锁神装置，绿色的眼睛在金光里浮着一层朦胧的光。"
    },
    {
      "type": "char",
      "speaker": "莉亚",
      "text": "我听到了，他在叫我，从那个东西里面。祂让我告诉你——你知道该怎么做。",
      "role": "npc"
    },
    {
      "type": "title",
      "chapter": "第三幕",
      "subtitle": "父亲的真相"
    },
    {
      "type": "narrator",
      "text": "你站在锁神装置前，莉亚站在你身侧，右手紧紧攥着那只布偶，左手早已凝成结晶，可她自始至终没有低头看过那只手一眼。"
    },
    {
      "type": "narrator",
      "text": "你忽然又想起来你的父亲对你说过的一段话。"
    },
    {
      "type": "narrator",
      "text": "那时，艾德蒙站在几步之外静静望着你，他的翅膀在金光里投下一道轮廓扭曲的暗影。"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "你知道我为什么激活这个装置吗？",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "你之前说过——你想毁掉它。",
      "role": "player"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "不。我真正想毁掉的是索尔温。我曾以为，只要祂死了，污染就会停止。但祂没有死，只是被炸成了碎片，碎片从装置的缝隙里慢慢渗溢出来，最终蔓延成了吞噬一切的羽蚀。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他走近一步。"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "所以你现在要做的选择，和我二十年前要面对的一模一样：释放祂？继续囚禁祂？还是彻底毁掉祂？",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他微微停顿，似乎是在等你思考。"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "当初我没能做成的事，你或许能做到。因为你已经找到了格里姆，找到了他的妹妹，也找到了这座地底城市里所有被遗忘的人。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他伸出手，你握住了它。"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "放手去做吧，不管你选哪条路——我会看着你。",
      "role": "npc"
    },
    {
      "type": "title",
      "chapter": "第四幕",
      "subtitle": "最后的决定"
    },
    {
      "type": "narrator",
      "text": "你站在锁神装置的核心缺口前，缺口里翻涌溢出的金光，和索尔温的碎片缠绕交织，像两只绷紧了胳膊、正在死斗的手，你身后站着莉亚。"
    },
    {
      "type": "narrator",
      "text": "你听见一个声音从缺口深处传上来，是格里姆的声音。"
    },
    {
      "type": "char",
      "speaker": "格里姆（从缺口深处）",
      "text": "莉亚？你醒了？",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "莉亚向前走了一步，把手按在缺口边缘，金光在她指尖停留了一瞬。"
    },
    {
      "type": "char",
      "speaker": "莉亚",
      "text": "哥哥，你出来吧，不要呆在里面，里面很危险。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "格里姆（从缺口深处）",
      "text": "……我不能出来，这个装置需要一个锚点，要是我不在里面，它就会碎裂，碎片会全部涌出来，地底的所有人都会死。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "莉亚转过身看向你，她的眼睛亮得惊人。"
    },
    {
      "type": "char",
      "speaker": "莉亚",
      "text": "他说他不能出来，你们不是好朋友吗？求求你，想想办法好不好。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "她把手从缺口边缘收回来，静静地看着你，等了很久。"
    },
    {
      "type": "char",
      "speaker": "莉亚",
      "text": "你......你做决定吧，我哥哥信你，我也信你。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "终局之日，你究竟会选择亲近的同伴，失序的正义，还是仅随自我的野心？"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "A. 献祭自己",
          "next": "ending_self"
        },
        {
          "label": "B. 让格里姆留在里面",
          "next": "ending_prisoner"
        },
        {
          "label": "C. 拒绝献祭，摧毁装置",
          "next": "final_destroy"
        }
      ]
    }
  ],
  "final_destroy": [
    {
      "type": "narrator",
      "text": "你举起武器，格里姆从缺口深处冲出来，一把拉住你的手臂。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你疯了！要是砸碎它，碎片会全部涌出来，地底所有人都会死！",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "你",
      "text": "那就让他们自己选，没有人活该被献祭，也没有人活该被永远囚禁。",
      "role": "player"
    },
    {
      "type": "narrator",
      "text": "你砸向装置核心，黑色晶石轰然碎裂，索尔温的碎片从裂缝中涌出，凝成一只可怕的巨兽。"
    },
    {
      "type": "narrator",
      "text": "进入最终战斗。"
    },
    {
      "type": "narrator",
      "text": "格里姆站在你身边，莉亚站在他身旁，老地精站在他们身后，矿道里的地精工人们也纷纷涌出来，攥着镐头、扳手，揣着呲呲作响的炼金炸弹，一齐朝着巨兽冲了上去。"
    },
    {
      "type": "battle",
      "id": "final_battle",
      "url": "game3.html?mode=under",
      "success": "resolve_destroy",
      "fail": "ending_prisoner",
      "dead": "ending_dawn"
    }
  ],
  "resolve_destroy": [
    {
      "type": "endingauto"
    }
  ],
  "ending_self": [
    {
      "type": "title",
      "chapter": "结局",
      "subtitle": "灰烬共生"
    },
    {
      "type": "narrator",
      "text": "你走向装置核心，听到格里姆在身后喊你的名字，你没有回头。"
    },
    {
      "type": "narrator",
      "text": "你把手放在核心的缺口上，黑色光芒将你包裹，随即你感觉到——索尔温的碎片在触碰你，它问你：“你愿意承载我吗？”"
    },
    {
      "type": "narrator",
      "text": "你缓缓点头，凛冽的光芒顷刻将你吞没，意识顺着光流坠进一片无边无际的黑暗空间。你看见索尔温——不是疯狂的神，只是一个蜷缩在黑暗深处、被千年时光耗尽了所有力气的疲惫轮廓。祂看着你，声音轻得像远方的风。"
    },
    {
      "type": "char",
      "speaker": "索尔温",
      "text": "终于有人来了......三千年了，没有人愿意承载我，他们都只想利用我、抽取我、囚禁我、杀死我，你是第一个问我想不想被释放的人。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你的意识融入了祂，污染停止了，地下古堡的裂纹开始愈合，世界重新恢复平衡，但你不再是人，你成了索尔温新的载体。"
    },
    {
      "type": "cg",
      "bg": "../images/underending/1.jpg",
      "text": "你从锁神装置中走出，格里姆站在远处，他想跑过来，可你的身体正在发光。你缓缓朝他伸出手，他最终还是没有上前，站在原地哭了。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你还在吗？",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你点了头，可他知道，你已经不再是原来的你了。"
    },
    {
      "type": "narrator",
      "text": "结局名称： 灰烬共生"
    },
    {
      "type": "narrator",
      "text": "结局类型： 特殊结局"
    },
    {
      "type": "narrator",
      "text": "成就解锁：【灰烬共生】"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "返回游戏主菜单",
          "next": "end"
        }
      ]
    }
  ],
  "ending_prisoner": [
    {
      "type": "title",
      "chapter": "结局",
      "subtitle": "灰烬囚徒"
    },
    {
      "type": "narrator",
      "text": "你抬眼看向站在装置边的格里姆，他也正望着你，四目相对间没有人开口说话，他只是对着你，轻轻点了一下头。"
    },
    {
      "type": "narrator",
      "text": "他转身一步步走向轰鸣震动的装置核心，你站在原地看着他逐渐远去的背影，自始至终，他都没有回过头，干瘦的手掌里，还紧紧攥着那只莉亚做的旧布偶。"
    },
    {
      "type": "narrator",
      "text": "他的身影最终被装置核心亮起的刺眼光芒完全吞没，原本狂跳不止的锁神装置慢慢停下了震动，弥漫在古堡各处的异化污染顺着岩壁的裂纹缓缓退去，沉寂已久的熔岩炉重新亮起了温暖稳定的光。他成了异污染新的封印，自己的意识彻底融入了索尔温的碎片，永远留在了这地底深处。"
    },
    {
      "type": "cg",
      "bg": "../images/underending/2.jpg",
      "text": "你站在熔岩炉前，它已经恢复了光亮，格里姆不在了，他的实验袍还静静挂在墙上，那只布偶塞在口袋里，像一幅定格的画，又像一座无人题字的墓碑。"
    },
    {
      "type": "narrator",
      "text": "你走出熔岩炉，地下古堡的矿道里传来人们的欢呼，城市获救了，他们不知道是谁拯救了这里。"
    },
    {
      "type": "narrator",
      "text": "你抬起头，地底的熔岩光漫下来，暖融融裹着你，你听到一个声音——轻得像要散在风里，像远方过山的风，那是格里姆在说话。"
    },
    {
      "type": "char",
      "speaker": "格里姆（画外音）",
      "text": "……别哭，我妹妹醒过来了，你帮我照顾一下她。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "结局名称： 灰烬囚徒"
    },
    {
      "type": "narrator",
      "text": "结局类型： 牺牲结局"
    },
    {
      "type": "narrator",
      "text": "成就解锁：【灰烬囚徒】"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "返回游戏主菜单",
          "next": "end"
        }
      ]
    }
  ],
  "ending_molten": [
    {
      "type": "title",
      "chapter": "结局",
      "subtitle": "熔岩王座"
    },
    {
      "type": "narrator",
      "text": "你举起武器砸向装置核心，黑色晶石应声碎裂，索尔温的碎片从裂缝中涌出，凝成一只可怕的巨兽。"
    },
    {
      "type": "narrator",
      "text": "进入最终战斗，判定。"
    },
    {
      "type": "narrator",
      "text": "格里姆的炼金炸弹在战斗中爆发出前所未有的光芒，符文能量从炸弹中涌出，化作一道护盾挡在你面前。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "跑！我来挡住它！",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你冲向核心，索尔温的碎片触碰到你后便消散了。你听到一个极其微弱的声音，像远方的风，那是索尔温在说话：“……谢谢。”"
    },
    {
      "type": "narrator",
      "text": "污染停止，熔岩炉恢复稳定。格里姆从废墟中爬出来，他的实验袍还冒着烟，脸上却带着笑意。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "我们成功了。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你看向他，又望向躺在工作台上的莉亚，她的手指动了一下，缓缓睁开了眼睛。"
    },
    {
      "type": "char",
      "speaker": "莉亚",
      "text": "……哥哥？",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "格里姆踉跄着冲过去，跪在工作台前把莉亚紧紧抱住，压抑了许久的情绪彻底溃决，像个终于找回失物的孩子一样哭了出来。"
    },
    {
      "type": "cg",
      "bg": "../images/underending/3.jpg",
      "text": "多年后，地下古堡中，熔岩炉重新燃起火焰。格里姆站在工作台前，莉亚坐在他身侧，她的半个身体仍维持着结晶状态，但眼中满是光亮，正帮格里姆整理实验数据。你站在门口，格里姆抬头看向你。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "你来啦......莉亚，这就是我跟你说起过的那个人。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "莉亚抬起头，对你露出了笑容。"
    },
    {
      "type": "narrator",
      "text": "结局名称： 熔岩王座"
    },
    {
      "type": "narrator",
      "text": "结局类型： 地下古堡线最佳结局"
    },
    {
      "type": "narrator",
      "text": "成就解锁：【熔岩王座】"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "返回游戏主菜单",
          "next": "end"
        }
      ]
    }
  ],
  "ending_after": [
    {
      "type": "title",
      "chapter": "结局",
      "subtitle": "地底之后"
    },
    {
      "type": "narrator",
      "text": "你举起武器砸向装置核心，黑色晶石碎裂，索尔温的碎片从裂缝中涌出，凝成一只可怕的巨兽。"
    },
    {
      "type": "narrator",
      "text": "进入最终战斗。判定。"
    },
    {
      "type": "narrator",
      "text": "格里姆在战斗中身受重伤，实验袍被豁开一道裂口，手臂上添了一道深可见骨的狰狞伤口，但你成功活了下来。"
    },
    {
      "type": "cg",
      "bg":"../images/underending/4.jpg",
      "text": "污染停止，熔岩炉重新亮起。格里姆靠在工作台上，莉亚站在他对面，有些无措的抱着玩偶。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "妹妹，你回来了。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "莉亚哇的一声哭了出来，跑上去抱住了格里姆。"
    },
    {
      "type": "char",
      "speaker": "莉亚",
      "text": "哥......我好想你。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "没事了......虽然很辛苦很艰难。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他看向你，眼底满是疲惫，却没有半分遗憾。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "但我们都活下来了。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他伸出手，你握住了。"
    },
    {
      "type": "narrator",
      "text": "结局名称： 地底之后"
    },
    {
      "type": "narrator",
      "text": "结局类型： 悲情结局"
    },
    {
      "type": "narrator",
      "text": "成就解锁：【地底之后】"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "返回游戏主菜单",
          "next": "end"
        }
      ]
    }
  ],
  "ending_dawn": [
    {
      "type": "title",
      "chapter": "结局",
      "subtitle": "拂晓的消散"
    },
    {
      "type": "narrator",
      "text": "你举起武器砸向装置核心，黑色晶石碎裂，索尔温的碎片从裂缝中涌出，凝成一只可怕的巨兽。"
    },
    {
      "type": "narrator",
      "text": "进入最终战斗。判定。"
    },
    {
      "type": "narrator",
      "text": "格里姆挡在你身前，他的炼金炸弹爆发出最后一道蓝光后彻底碎裂，巨兽的漆黑利爪狠狠穿透了他的胸膛。"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "……跑。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你冲向他，他却已经倒下，手里还攥着那只布偶。他的眼睛没有闭上，看着你，嘴唇动了动，却没能发出声音。"
    },
    {
      "type": "narrator",
      "text": "你击退巨兽后，索尔温的碎片从裂缝涌出，随后渐渐消散。"
    },
    {
      "type": "narrator",
      "text": "污染停止了，但索尔温彻底消失，所有从他身上抽取的能量也一同消散。熔岩炉冷却，符文科技全部失效，世界进入了全新的时代——没有魔法，没有符文，没有熔岩，只有人类、精灵、地精、羽人，只有他们靠自己劳作的双手开拓新生。"
    },
    {
      "type": "narrator",
      "text": "多年后，你站在一片废墟之上，远处有人耕作，有人建造，不再依赖符文的地精正躬着身子用双手挖矿。世界一片安宁，而你活下来了，所有人都靠着自己的方式活了下来。"
    },
    {
      "type": "cg",
      "bg":"../images/underending/5.jpg",
      "text": "你一步步走到那座静静立在废墟边的墓碑前，莉亚已经在那里了，粗糙的碑面上，清清楚楚刻着格里姆的名字，墓碑一旁，摆着一只歪歪扭扭的旧布偶，针脚还带着几分生涩。"
    },
    {
      "type": "narrator",
      "text": "莉亚看见了你，轻轻向你点了点头，没有说话。"
    },
    {
      "type": "narrator",
      "text": "你慢慢将手放在微凉的石面上，风从远处的旷野吹过来，你自始至终什么都没有说，但你知道他一定清楚——你来了。"
    },
    {
      "type": "narrator",
      "text": "结局名称： 拂晓的消散"
    },
    {
      "type": "narrator",
      "text": "结局类型： 新时代结局"
    },
    {
      "type": "narrator",
      "text": "成就解锁：【拂晓的消散·地下古堡】"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "查看彩蛋【余烬之火】",
          "next": "ember_epilogue"
        },
        {
          "label": "返回游戏主菜单",
          "next": "end"
        }
      ]
    }
  ],
  "ending_father": [
    {
      "type": "title",
      "chapter": "结局",
      "subtitle": "父与子"
    },
    {
      "type": "narrator",
      "text": "你举起武器砸向装置核心，黑色晶石碎裂，索尔温的碎片从裂缝中涌了出来。"
    },
    {
      "type": "narrator",
      "text": "但碎片并没有消散，反而朝着同一个方向涌去。你的父亲站在装置边缘，张开了双臂。"
    },
    {
      "type": "char",
      "speaker": "艾德蒙",
      "text": "“索尔温，我来了。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "无数碎片蜂拥涌入他的躯体，他背后的翅膀猛地完全展开——左翼附着的黑色结晶顺着肢体脉络飞快蔓延至全身，他的眼眸变成金色，声音也不再是原本的模样。"
    },
    {
      "type": "char",
      "speaker": "索尔温（借由艾德蒙的身体开口）",
      "text": "你囚禁了我三千年，现在——你成了我。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "艾德蒙，或者说索尔温，转过身看向你，他伸出手，你握住了那只手。"
    },
    {
      "type": "narrator",
      "text": "你们一同走出锁神装置，地下古堡的裂缝开始愈合，污染彻底停止。但你的父亲，已经不再是你的父亲了，他成了索尔温的载体。"
    },
    {
      "type": "cg",
      "bg": "../images/underending/6.jpg",
      "text": "你和艾德蒙站在熔岩炉前，他——或者说祂——望着远方的矿道，声音是两个人的声线重叠在一起。"
    },
    {
      "type": "char",
      "speaker": "艾德蒙/索尔温",
      "text": "你自由了，去做你想做的事吧，我会一直看着你。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "结局名称： 父与子"
    },
    {
      "type": "narrator",
      "text": "结局类型： 黑暗结局"
    },
    {
      "type": "narrator",
      "text": "成就解锁：【父与子·地下古堡】"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "返回游戏主菜单",
          "next": "end"
        }
      ]
    }
  ],
  "ending_four": [
    {
      "type": "title",
      "chapter": "结局",
      "subtitle": "四族盟约"
    },
    {
      "type": "narrator",
      "text": "你举起武器砸向装置核心，黑色晶石应声碎裂，索尔温的碎片从崩开的裂缝中翻涌涌出，在空中渐渐凝聚成一只骇人巨兽。"
    },
    {
      "type": "narrator",
      "text": "进入最终战斗：塞琳、奥德里克、艾拉瑞亚、格里姆站在你身边，四族代表并肩对抗强敌。"
    },
    {
      "type": "narrator",
      "text": "你们成功击败巨兽，索尔温的碎片从裂缝涌出后，渐渐消散开去。"
    },
    {
      "type": "narrator",
      "text": "污染停止了，世界重归平静，但索尔温消失后留下了权力真空，四族之间的平衡被彻底打破。"
    },
    {
      "type": "narrator",
      "text": "你站在废墟驿站，四位同伴站在你的身后。"
    },
    {
      "type": "char",
      "speaker": "塞琳",
      "text": "天空之城失去了悬浮能力，但它还留存着。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "奥德里克",
      "text": "帝国失去了符文能源，但技术依旧保留。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "艾拉瑞亚",
      "text": "森林失去了根脉共鸣，但树木仍在生长。",
      "role": "npc"
    },
    {
      "type": "char",
      "speaker": "格里姆",
      "text": "地底失去了熔岩炉，但我们还有双手。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "他们看向你。"
    },
    {
      "type": "char",
      "speaker": "塞琳",
      "text": "你说吧，我们该怎么做？",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你写下了四个字：“四族盟约。”"
    },
    {
      "type": "narrator",
      "text": "四族代表在废墟驿站签署盟约：这里没有神，没有献祭，没有囚禁，只有四个种族——各有残缺，亦各得完整。"
    },
    {
      "type": "narrator",
      "text": "结局名称： 四族盟约"
    },
    {
      "type": "narrator",
      "text": "结局类型： 隐藏最佳结局"
    },
    {
      "type": "narrator",
      "text": "成就解锁：【四族盟约·地下古堡】"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "返回游戏主菜单",
          "next": "end"
        }
      ]
    }
  ],
  "ending_hero": [
    {
      "type": "title",
      "chapter": "结局",
      "subtitle": "无名英雄"
    },
    {
      "type": "narrator",
      "text": "你举起武器砸向装置核心，黑色晶石碎裂，索尔温的碎片从裂缝涌出后渐渐消散。"
    },
    {
      "type": "narrator",
      "text": "污染停止了，世界得救了，但没有人知道这份功劳属于你，没有同伴站在你身后，没有城市为你欢呼，没有史书记载你的名字。"
    },
    {
      "type": "narrator",
      "text": "你走出锁神装置，熔岩炉的裂缝在愈合，地下古堡在恢复，地精们正在庆祝——他们只当是自己拯救了世界。"
    },
    {
      "type": "narrator",
      "text": "你站在悬崖边缘，烧掉了机械义翼，脱下斗篷，赤着脚走向远方。"
    },
    {
      "type": "narrator",
      "text": "结局名称： 无名英雄"
    },
    {
      "type": "narrator",
      "text": "结局类型： 悲情结局"
    },
    {
      "type": "narrator",
      "text": "成就解锁：【无名英雄·地下古堡】"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "返回游戏主菜单",
          "next": "end"
        }
      ]
    }
  ],
  "ending_unchanged": [
    {
      "type": "title",
      "chapter": "结局",
      "subtitle": "未变之局"
    },
    {
      "type": "narrator",
      "text": "一切仍旧按照神秘商人预言的轨迹前行，你缓缓闭上了眼睛。"
    },
    {
      "type": "narrator",
      "text": "结局名称： 未变之局"
    },
    {
      "type": "narrator",
      "text": "结局类型： 失败结局"
    },
    {
      "type": "narrator",
      "text": "成就解锁：【未变之局·地下古堡】"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "返回游戏主菜单",
          "next": "end"
        }
      ]
    }
  ],
  "ember_epilogue": [
    {
      "type": "title",
      "chapter": "彩蛋",
      "subtitle": "余烬之火"
    },
    {
      "type": "narrator",
      "text": "你走出锁神装置，地下古堡的矿道正轻轻震颤——不是崩塌前的晃荡，是新生般的愈合，细碎的裂纹一点点向内收缩弥合，熔岩炉重新亮起暖光，澄澈的蓝色火焰从炉口翻涌着喷涌而出，地精们拥挤在矿道中，爆发出阵阵响亮的欢呼。他们不知道是谁做到了这一切，只知道——熔岩回来了。"
    },
    {
      "type": "narrator",
      "text": "你站在熔岩炉前，手里攥着格里姆给你的那只小铁盒。铁盒贴在掌心带着触手可及的微凉，可你分明清楚，里面安安静静躺着那只格里姆挂怀了一辈子的布偶。"
    },
    {
      "type": "narrator",
      "text": "你走到工作台边，把铁盒放在台面上打开，布偶还是那副歪歪扭扭的模样：耳朵斜着，眼睛是线缝的，但它好好待在里面。"
    },
    {
      "type": "narrator",
      "text": "你抬起头，看见莉亚站在门口。她右手攥着另一只布偶，和铁盒里这只一模一样，左手已经结晶，可她没有低头去看，只是静静地望着你。"
    },
    {
      "type": "char",
      "speaker": "莉亚",
      "text": "我哥哥呢？",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "你没有回答，只是看着她。她的眼睛是暗绿色的——和格里姆一模一样。她在等，你也在等。"
    },
    {
      "type": "narrator",
      "text": "随后你听到一个声音，从熔岩炉的方向漫过来，轻得像隔着山海吹过来的风。"
    },
    {
      "type": "char",
      "speaker": "格里姆（画外音）",
      "text": "……别哭，我就在这儿，在熔岩里，在根脉里，在你们身边。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "莉亚听到了，她抬起头望向熔岩炉，眼眶湿了，脸上却带着笑。"
    },
    {
      "type": "char",
      "speaker": "莉亚",
      "text": "哥哥，你还在说废话。",
      "role": "npc"
    },
    {
      "type": "narrator",
      "text": "她走到工作台前，拿起铁盒里的布偶，将两只布偶并排放在一起：一只歪着耳朵，一只斜着眼睛。她坐在工作台边，望着熔岩炉，蓝色火焰在炉口晃着，把她的影子拉得又细又长。"
    },
    {
      "type": "narrator",
      "text": "你站在她身旁，手搭在工作台上。铁盒已经空了，可你知道——这里曾经装着一个人全部的温柔。"
    },
    {
      "type": "choice",
      "options": [
        {
          "label": "返回游戏主菜单",
          "next": "end"
        }
      ]
    }
  ]
};

/* ==================== 存档恢复 ==================== */
if (save && save.story === "under" && (mode === "continue" || navigationType === "reload" || navigationType === "back_forward"))
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
  currentNode = fromNodeMap[from] ?? "loc_under_" + from;
  pos = 0;
  freedomDay = cnt;
  underFlags.freedomDay = freedomDay;
  underFlags.freedomTime = time;
  saveUnderFlags();

  if (save && save.story === "under")
  {
    haogandu = Number(save.haogandu ?? 5);
  }

  /* from 只消费一次，避免刷新跳回自由行动最后节点 */
  const url = new URL(window.location.href);
  url.searchParams.delete("from");
  history.replaceState(null, "", url.pathname + url.search);
}

/* ==================== 游戏返回 ==================== */
function resultKind(value)
{
  if (value === null || value === undefined) return null;

  const v = String(value).toLowerCase();
  if (["true","win","success","1","pass"].includes(v)) return "success";
  if (["grim_dead","grimdead","dead"].includes(v)) return "dead";
  if (["false","lose","fail","failure","0"].includes(v)) return "fail";
  return null;
}

function resolvePendingResult(storageKey, rawResult)
{
  const raw = sessionStorage.getItem(storageKey);
  if (!raw || rawResult === null || rawResult === undefined) return false;

  try
  {
    const pending = JSON.parse(raw);
    if (pending.bg && !currentBackground)
    {
      currentBackground = pending.bg;
      storyBg.style.backgroundImage = `url("${pending.bg}"), url("${FALLBACK_BG}")`;
    }
    if (pending.freedomDay !== undefined) freedomDay = pending.freedomDay;

    if ((rawResult === "cancel" || rawResult === "flee") && pending.cancel)
    {
      currentNode = pending.cancel;
      pos = 0;
      sessionStorage.removeItem(storageKey);
      return true;
    }

    const kind = resultKind(rawResult);
    if (!kind) return false;

    if (kind === "dead" && pending.dead)
    {
      currentNode = pending.dead;
      underFlags.grimAlive = false;
      saveUnderFlags();
    }
    else if (kind === "success")
    {
      currentNode = pending.success;
    }
    else
    {
      currentNode = pending.fail;
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

/* game3 战斗返回 */
const battleResult = iswin3 !== null ? iswin3 : battleResultParam;
if (battleResult !== null)
{
  let battleId = null;
  try
  {
    const pendingRaw = sessionStorage.getItem("under_pending_battle");
    if (pendingRaw) battleId = JSON.parse(pendingRaw).id || null;
  }
  catch (error) {}

  const hpNum = hpParam !== null ? Number(hpParam) : null;
  const isFinalBattle = ["sky_final","final","forest_final","final_battle"].indexOf(battleId) !== -1;
  const isNoLossBattle = battleId === "haggle";

  if (hpNum !== null && hpNum <= 0 && !isFinalBattle && !isNoLossBattle)
  {
    sessionStorage.removeItem("under_pending_battle");
    currentNode = "ending_unchanged";
    pos = 0;
    resultResolved = true;
    underFlags.hp = MAX_HP;
    saveUnderFlags();
    updateHP();
  }
  else
  {
    resultResolved = resolvePendingResult("under_pending_battle", battleResult);

    if (hpParam !== null)
    {
      underFlags.hp = Math.max(0, Math.min(MAX_HP, Number(hpParam)));
      saveUnderFlags();
      updateHP();
    }
  }
  const url = new URL(window.location.href);
  url.searchParams.delete("iswin3");
  url.searchParams.delete("battleResult");
  url.searchParams.delete("hp");
  history.replaceState(null, "", url.pathname + url.search);
}

/* game4 渗透返回（自由行动日） */
if (!resultResolved && game4Result !== null)
{
  resultResolved = resolvePendingResult("under_pending_infiltration", game4Result);
}

/* skillcheck 判定返回（game5 用 checkResult） */
if (!resultResolved && checkResultParam !== null)
{
  resultResolved = resolvePendingResult("under_pending_check", checkResultParam);
  if (resultResolved && feather !== null)
  {
    const n = Number(feather) || 0;
    addItem("windCrystal", n >= 6 ? 9 : n >= 3 ? 6 : 3);
  }
}

/* 地下古堡专属小游戏返回。兼容当前项目常见参数名。 */
const minigameResult =
  underResult !== null ? underResult :
  minigameResultParam !== null ? minigameResultParam :
  gameResultParam !== null ? gameResultParam :
  genericResultParam !== null ? genericResultParam :
  iswin2 !== null ? iswin2 :
  iswin;

if (!resultResolved && minigameResult !== null)
{
  resultResolved = resolvePendingResult("under_pending_minigame", minigameResult);
}

/* game1/game2 的 skillcheck 用 result=success 返回，未被小游戏消费时回退到 check */
if (!resultResolved && genericResultParam !== null)
{
  resultResolved = resolvePendingResult("under_pending_check", genericResultParam);
}
if (!resultResolved && iswin2 !== null)
{
  resultResolved = resolvePendingResult("under_pending_check", iswin2);
}

/* game2 通过 referrer 返回（视为成功） */
if (!resultResolved && document.referrer.includes("game2.html"))
{
  const raw = sessionStorage.getItem("under_pending_check");
  if (raw)
  {
    try
    {
      const pending = JSON.parse(raw);
      currentNode = pending.success;
      pos = 0;
      sessionStorage.removeItem("under_pending_check");
      resultResolved = true;
    }
    catch (error)
    {
      console.error(error);
    }
  }
}

if (resultResolved)
{
  const url = new URL(window.location.href);
  ["iswin3","battleResult","game4Result","checkResult","underResult","minigameResult","gameResult","result","iswin2","iswin"].forEach(function (key)
  {
    url.searchParams.delete(key);
  });
  history.replaceState(null, "", url.pathname + url.search);

  if (save && save.story === "under")
  {
    haogandu = Number(save.haogandu ?? 5);
  }
}

clampAffection();
updateAffection();
loadOtherAffection();
updateOtherAffection();
updateHP();
renderInventory();
renderStatus();
renderIntel();
let nodeData = nodes[currentNode];

/* -------------------- 隐藏效果 -------------------- */
function applyEffect(item)
{
  if (item.flags) { Object.assign(underFlags, item.flags); saveUnderFlags(); }
  if (item.addItems) Object.entries(item.addItems).forEach(function([id,count]){ addItem(id,count); });
  if (item.removeItems) Object.entries(item.removeItems).forEach(function([id,count]){ removeItem(id,count); });
  if (item.addStatuses) item.addStatuses.forEach(addStatus);
  if (item.removeStatuses) item.removeStatuses.forEach(removeStatus);
  if (item.addIntels) item.addIntels.forEach(addIntel);
  if (item.removeIntels) item.removeIntels.forEach(removeIntel);
  if (item.memoryDelta !== undefined)
  {
    underFlags.memoryFragments = memoryFragments() + Number(item.memoryDelta);
    saveUnderFlags();
    renderInventory();
  }
  if (item.hpDelta !== undefined)
  {
    underFlags.hp = Math.max(0, Math.min(MAX_HP, currentHP() + Number(item.hpDelta)));
    saveUnderFlags();
    updateHP();
  }
  if (item.dailyFlag)
  {
    underFlags[item.dailyFlag + freedomDay] = true;
    saveUnderFlags();
  }
  if (item.incFlag)
  {
    underFlags[item.incFlag] = (underFlags[item.incFlag] || 0) + 1;
    saveUnderFlags();
  }
  if (item.setAffection !== undefined) setAffection(item.setAffection);
  else if (item.affection !== undefined) applyAffection(item.affection);
  if (item.companionAffection !== undefined) applyCompanionAffection(item.companionAffection);
  if (item.otherAffection) Object.entries(item.otherAffection).forEach(function([faction,delta]){ applyOtherAffection(faction, delta); });
  clampAffection(); updateAffection();
  pos++;
  saveGame("under", currentNode, pos, haogandu);
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
  if (underFlags.fatherFate === "cooperate") { goToNode("ending_father"); return; }
  if (isFourClansReady()) { goToNode("ending_four"); return; }
  if (underFlags.grimAlive === false) { goToNode("ending_dawn"); return; }
  if (haogandu >= 60) { goToNode("ending_molten"); return; }
  if (haogandu <= 50) { goToNode("ending_after"); return; }
  goToNode("ending_hero");
}

/* 任务揭示：正文出现「主线任务」时记录，供 task.js 精确控制任务栏显示时机 */
const TASK_REVEAL_NODES =
{
  "start": "ch1",
  "chapter2": "ch2",
  "chapter3": "ch3",
  "chapter4": "ch4"
};

function revealTasksForNode(nodeId)
{
  const taskId = TASK_REVEAL_NODES[nodeId];
  if (!taskId) return;
  if (underFlags.taskRevealed && underFlags.taskRevealed[taskId]) return;
  underFlags.taskRevealed = underFlags.taskRevealed || {};
  underFlags.taskRevealed[taskId] = true;
  saveUnderFlags();
}

/* 老存档一次性补录：按当前节点所在章节，把已走过的章节标记为已揭示 */
function migrateTaskReveals()
{
  if (underFlags.taskRevealed) return;
  underFlags.taskRevealed = {};
  const node = currentNode || "start";
  let cur = 1;
  if (/^chapter2/.test(node)) cur = 2;
  else if (/^chapter3/.test(node)) cur = 3;
  else if (/^chapter4/.test(node) || /^ending/.test(node) || /^final/.test(node) || /ember_epilogue/.test(node)) cur = 4;
  else if (/^(freedom|mainmap_|loc_)/.test(node)) cur = Math.max(1, Number(underFlags.freedomDay || 1));
  for (let n = 1; n <= cur; n++) underFlags.taskRevealed["ch" + n] = true;
  saveUnderFlags();
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

  if (item.type === "jump") { mapClickable=false; updateMapState(); goToNode(item.goto); return; }
  if (item.type === "effect") { applyEffect(item); return; }
  if (item.type === "auto")
  {
    mapClickable=false; updateMapState();
    for (const opt of item.options)
    {
      if (haogandu >= Number(opt.min) && haogandu <= Number(opt.max)) { goToNode(opt.next); return; }
    }
    console.warn("auto 没有匹配分支：", currentNode, haogandu); return;
  }
  if (item.type === "flagauto")
  {
    mapClickable=false; updateMapState();
    const value = underFlags[item.flag];
    const next = item.routes[value] || item.default;
    goToNode(next);
    return;
  }
  if (item.type === "dayauto")
  {
    mapClickable=false; updateMapState();
    goToNode(item.routes[freedomDay] || item.default);
    return;
  }
  if (item.type === "otherauto")
  {
    mapClickable=false; updateMapState();
    const val = otherHaogandu[item.faction] ?? 0;
    goToNode(val >= Number(item.min) ? item.pass : item.fail);
    return;
  }
  if (item.type === "dailyauto")
  {
    mapClickable=false; updateMapState();
    const done = underFlags[item.flag + freedomDay];
    goToNode(done ? item.done : item.notDone);
    return;
  }
  if (item.type === "chance")
  {
    mapClickable=false; updateMapState();
    goToNode(Math.random() < Number(item.prob) ? item.pass : item.fail);
    return;
  }
  if (item.type === "hasitems")
  {
    mapClickable=false; updateMapState();
    let ok = true;
    for (const [id, n] of Object.entries(item.need || {}))
    {
      if ((underFlags.inventory?.[id] || 0) < n) { ok = false; break; }
    }
    goToNode(ok ? item.pass : item.fail);
    return;
  }
  if (item.type === "freedomReturn")
  {
    mapClickable=false; updateMapState();
    goToNode("mainmap_" + freedomDay);
    return;
  }
  if (item.type === "endingauto") { resolveDestroyEnding(); return; }

  saveGame("under", currentNode, pos, haogandu);
  choiceDom.style.display = "none";
  textDom.style.display = "none";
  if (silhouetteDom) silhouetteDom.style.display = "none";
  textDom.classList.remove("char-mode");
  hint.textContent = "点击画面 / Enter / Space / ▸键 继续";

  /* game3 战斗 */
  if (item.type === "battle")
  {
    mapClickable = false;
    updateMapState();
    sessionStorage.setItem("under_pending_battle", JSON.stringify(
    {
      id:item.id,
      success:item.success,
      fail:item.fail,
      dead:item.dead || null,
      cancel:item.cancel || null,
      freedomDay: freedomDay,
      bg: currentBackground
    }));
    fadeNav(item.url + "&battle=" + item.id + "&hp=" + currentHP());
  }

  /* game4 渗透 */
  else if (item.type === "infiltration")
  {
    mapClickable = false;
    updateMapState();
    sessionStorage.setItem("under_pending_infiltration", JSON.stringify(
    {
      id:item.id,
      success:item.success,
      fail:item.fail,
      freedomDay: freedomDay,
      bg: currentBackground
    }));
    fadeNav(item.url);
  }

  /* 技能判定（game2/game5/game1） */
  else if (item.type === "skillcheck")
  {
    mapClickable = false;
    updateMapState();
    sessionStorage.setItem("under_pending_check", JSON.stringify(
    {
      id:item.id,
      success:item.success,
      fail:item.fail,
      freedomDay: freedomDay,
      bg: currentBackground
    }));

    const gameUrl = new URL(item.url || "game2.html?mode=under", window.location.href);
    const currentPage = window.location.pathname.split("/").pop() || "story-under.html";
    gameUrl.searchParams.set("return", currentPage);
    fadeNav(gameUrl.href);
  }

  /* 地下古堡专属小游戏 */
  else if (item.type === "minigame")
  {
    mapClickable = false;
    updateMapState();
    sessionStorage.setItem("under_pending_minigame", JSON.stringify(
    {
      id:item.id,
      success:item.success,
      fail:item.fail,
      dead:item.dead || null,
      bg: currentBackground
    }));
    fadeNav(item.url);
  }

  /* 一次自由行动结束 */
  else if (item.type === "freedomEnd")
  {
    mapClickable = false;
    updateMapState();

    time = Number(underFlags.freedomTime ?? time ?? 0);
    time++;
    underFlags.freedomDay = freedomDay;
    underFlags.freedomTime = time;
    saveUnderFlags();

    if (time < 4)
    {
      fadeNav(`map.html?mode=under&cnt=${item.day}&time=${time}`);
      return;
    }

    underFlags.freedomTime = 0;
    saveUnderFlags();
    goToNode(item.next);
  }
  else if (item.type === "title")
  {
    playTurn(); mapClickable=false; updateMapState();
    const box=document.createElement("div"); const h1=document.createElement("h1"); const orn=document.createElement("div");
    box.className="seg-title"; h1.className="title-chapter"; h1.textContent=item.chapter; box.appendChild(h1);
    orn.className="title-ornament"; orn.textContent="◆"; box.appendChild(orn);
    if (item.subtitle) { const sub=document.createElement("div"); sub.className="title-sub"; sub.textContent=item.subtitle; box.appendChild(sub); }
    textDom.innerHTML=""; textDom.appendChild(box); textDom.style.display="block";
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
    textDom.innerHTML=""; const scene=document.createElement("div"); scene.className="scene"; scene.textContent=displayText; textDom.appendChild(scene); textDom.style.display="block";
    if (/^freedom[123]$/.test(currentNode) && pos === 0)
    {
      mapClickable = true;
      freedomDay = Number(currentNode.slice(-1));
      underFlags.freedomDay = freedomDay;
      if (!from)
      {
        time = 0;
        underFlags.freedomTime = 0;
      }
      saveUnderFlags();
    }
    else mapClickable = false;
    updateMapState();
  }
  /* 结局 CG（静态图作为背景，替代原“结局动画”文字；bg 填图片路径，留空则用节点默认背景） */
  else if (item.type === "cg")
  {
    const displayText = unlockAchievementsFromText(item.text);
    mapClickable=false; updateMapState();
    if (item.bg)
    {
      storyBg.style.backgroundImage=`url("${item.bg}"), url("${FALLBACK_BG}")`;
      currentBackground=item.bg;
      endingBg=item.bg;
      endingBgNode=currentNode;
    }
    textDom.classList.remove("char-mode");
    textDom.innerHTML=""; const scene=document.createElement("div"); scene.className="scene"; scene.textContent=displayText; textDom.appendChild(scene); textDom.style.display="block";
  }
  else if (item.type === "char")
  {
    mapClickable=false; updateMapState(); textDom.classList.add("char-mode");
    const box=document.createElement("div"); const name=document.createElement("div"); const line=document.createElement("p");
    box.className="dialog"; name.className="speaker"; name.textContent=(item.speaker==="你"||item.speaker==="我")?getPlayerDisplayName():item.speaker; line.className="dialog-text";
    box.appendChild(name); box.appendChild(line); textDom.innerHTML=""; textDom.appendChild(box); textDom.style.display="block";
    typeText(line,item.text,40);
    const charImg=getCharacterImage(item);
    if (charImg)
    {
      silhouetteDom.style.backgroundImage=`url("${charImg}")`; silhouetteDom.classList.remove("player","npc");
      if (item.role === "npc") silhouetteDom.classList.add("npc"); else silhouetteDom.classList.add("player");
      silhouetteDom.style.display="block";
    }
  }
  else if (item.type === "choice")
  {
    mapClickable=false; updateMapState(); hint.textContent=""; choiceDom.innerHTML="";
    choiceDom.classList.toggle("multi", item.options.length >= 5);
    item.options.forEach(function(opt)
    {
      const a=document.createElement("a"); a.textContent=opt.label;
      a.addEventListener("click",function()
      {
        if (opt.affection !== undefined) applyAffection(opt.affection);
        if (opt.flags) { Object.assign(underFlags,opt.flags); saveUnderFlags(); }
        if (opt.cost)
        {
          for (const [key, val] of Object.entries(opt.cost))
          {
            const have = key === "memoryFragments" ? memoryFragments() : (underFlags.inventory?.[key] || 0);
            if (have < val) { hint.textContent = "资源不足，无法兑换/购买"; return; }
          }
          for (const [key, val] of Object.entries(opt.cost))
          {
            if (key === "memoryFragments") underFlags.memoryFragments = memoryFragments() - val;
            else removeItem(key, val);
          }
          if (opt.give) Object.entries(opt.give).forEach(function ([id, c]) { addItem(id, c); });
          saveUnderFlags();
          renderInventory();
        }
        if (opt.next === "end")
        {
          saveGame("under", currentNode, pos, haogandu, true);
          resetUnderFlags();
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

/* -------------------- 剧情推进（键盘/点击共用） -------------------- */
function advanceStory()
{
  if (settingsOpen) return;
  if (/^freedom[123]$/.test(currentNode) && pos === 0) return;
  if (choiceDom.style.display !== "none") return;
  if (istyping)
  {
    currentElement.textContent=currentText; clearInterval(timer); timer=null; istyping=false;
    setTimeout(function(){cannext=true;},300); return;
  }
  if (!cannext) return;
  pos++; render();
}

document.addEventListener("keydown", function(e)
{
  if (e.key === " " || e.key === "ArrowRight" || e.key === "Enter")
  {
    e.preventDefault();
    if (e.repeat) return;
    advanceStory();
  }
});

/* 手机端：点击画面推进（排除交互元素） */
document.addEventListener("click", function(e)
{
  if (e.target.closest("button, a, #mapMini, #bagMini, .achievement-mini, #inventoryPanel, #itemDetail, #settingsOverlay, #choiceDom, #exit-game-button")) return;
  advanceStory();
});

render();

exitGameButton.addEventListener("click", openSettings);

settingsContinue.addEventListener("click", closeSettings);
settingsSaveExit.addEventListener("click", function ()
{
  saveGame("under", currentNode, pos, haogandu);
  saveUnderFlags();
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
  turnNav(`map.html?mode=under&cnt=${day}&time=0`);
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
