const hint = document.getElementById("hint");
const textDom = document.getElementById("textDom");
const choiceDom = document.getElementById("choiceDom");
const silhouetteDom = document.getElementById("silhouetteDom");
const mode = new URLSearchParams(window.location.search).get("mode");
const navigationType = performance.getEntriesByType("navigation")[0].type;
const save = loadGame();
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
  if (isVideoShowing) storyVideo.pause();
  BGM.pause();
}
function closeSettings()
{
  settingsOpen = false;
  settingsOverlay.hidden = true;
  BGM.resume();
}
const gender=getCurrentGender();
const storyBg = document.getElementById("storyBg");
const videoBlock = document.getElementById("videoBlock");
const storyVideo = document.getElementById("storyVideo");
const storyBgVideo = document.getElementById("storyBgVideo");
const playerImg = gender==="male" ? "../images/malelead.png" : "../images/femalelead.png";
const traderbg = "../images/prologuebg/prologuebg1.jpg";
const sky = "../images/prologuebg/prologuebg2.jpg";

console.log("当前性别：", gender);
console.log("当前用户：", getCurrentUser());

let istyping = false;
let timer = null;
let currentElement = null;
let currentText = "";
let cannext = true;

/*打字机效果*/
function typeText(element, text, speed)
{
  istyping=true;
  cannext=false;
  element.textContent = "";
  let i = 0;
  currentElement=element;
  currentText=text;
  timer = setInterval(function ()
  {
    element.textContent += text[i];
    i++;
    if (i >= text.length) 
    {
      clearInterval(timer);
      timer=null;
      istyping=false;
      setTimeout(function ()
      {
        cannext = true;
      }, 300);
    }
  }, speed);
}

let currentBackground = "";
let isVideoShowing = false;
let currentBgVideo = "";
let isShowingChoice = false;
let curIndex = 0;

//结束视频
function finishVideo()
{
    if (!isVideoShowing) return;
    isVideoShowing = false;
    storyVideo.pause();
    storyVideo.onended = null;
    videoBlock.style.display = "none";
    storyVideo.removeAttribute("src");
    storyVideo.load();
    curIndex++;
    renderCurrentLine();
}

const storyScript = [
    {
        type:"title",
        chapter:"序章",
        subtitle:"",
        bg:"../images/main-bg.png"
    },
    {
        type:"char",
        role:"player",
        speaker:"内心独白",
        text:"在羽族的传说中，第一代羽人因为渴望天空的拥抱，才生出羽翼飞翔。但美丽而包容的天空啊，请你告诉我，为什么没有翅膀的人会坠落。",
        charImg:playerImg,
        bg:"",
        bgVideo:"../video/prologue1.mp4"
    },
    {
        type:"char",
        role:"player",
        speaker:"内心独白",
        text:"那一天，渴望天空拥抱的我被他们从塔顶推了下来，坠落的瞬间，仿佛我也学会了飞翔。如果死前是这样的风声，这就是天空给我的答案吗？",
        charImg:playerImg,
        bg:"",
        bgVideo:"../video/prologue1.mp4"
    },
    {
        type:"video",
        video:"../video/prologue2.mp4"
    },
    {
        type:"char",
        role:"player",
        speaker:"你",
        text:"咳...咳..咳",
        charImg:playerImg,
        bg:"../images/prologuebg/prologuebg3.jpg"
    },
    {
        type:"narrator",
        text:"我用了很长一段时间，才确认自己还活着。首先涌上来的，是身体里那股挥之不去的铁锈味，然后是雨后泥土混着青草地的味道，最后是天空和阳光刺激我眼膜的感受。",
        charImg:"",
        bg:"../images/prologuebg/prologuebg3.jpg"
    },
    {
        type:"narrator",
        text:"那是我第一次离开天空，却真实的感受到了活着的滋味。",
        charImg:"",
        bg:"../images/prologuebg/prologuebg3.jpg"
    },
    {
        type:"video",
        video:"../video/prologue3.mp4"
    },
    {
        type:"char",
        role:"player",
        speaker:"你",
        text:"好难受，但我居然还活着。",
        charImg:playerImg,
        bg:sky
    },
    {
        type:"char",
        role:"npc",
        speaker:"神秘商人",
        text:"不错啊，居然还活着。",
        charImg:"",
        bg:traderbg
    },
    {
        type:"char",
        role:"player",
        speaker:"你",
        text:"你......是谁？",
        charImg:playerImg,
        bg:traderbg
    },
    {
        type:"char",
        role:"npc",
        speaker:"神秘商人",
        text:"这个问题很重要吗？比起这个，你难道不想知道“你是谁”吗？",
        charImg:"",
        bg:traderbg
    },
    {
        type:"char",
        role:"player",
        speaker:"你",
        text:"......",
        charImg:playerImg,
        bg:traderbg
    },
    {
        type:"char",
        role:"npc",
        speaker:"神秘商人",
        text:"这个世界线不久后就将毁灭，你是唯一能拯救它的人......很奇怪，那些羽蚀似乎并不会伤害你......",
        charImg:"",
        bg:traderbg
    },
    {
        type:"char",
        role:"npc",
        speaker:"神秘商人",
        text:"不过这都是后话了，为了保全这条世界线，我可做了不少努力才找到你，不过我并不是强买强卖的主，我更喜欢看你们自己选择未来。",
        charImg:"",
        bg:traderbg
    },
    {
        type:"char",
        role:"npc",
        speaker:"神秘商人",
        text:"所以，“无翼者”，现在你有一天时间来探索这片你从未来过的大陆，不过在这之前，请告诉我，你更倾向于去往哪里呢？",
        charImg:"",
        bg:traderbg
    },
    {
        type:"choice",
        bg:traderbg,
        options:[
            {label:"天空，你是否知晓一切？",tag:"sky"},
            {label:"我现在所站立的地面才是真实，我将在这废墟之上建立新的秩序。",tag:"empire"},
            {label:"听说东方有森林，那里没有谎言，只有回声。",tag:"forest"},
            {label:"泥土之下，埋藏着一切的答案。",tag:"under"}
        ]
    }
];

/*读取保存进度*/
if (save && (mode === "continue" || performance.getEntriesByType("navigation")[0].type === "reload"
||performance.getEntriesByType("navigation")[0].type==="back_forward") ) curIndex = save.index;

function renderCurrentLine(){
    const item = storyScript[curIndex];
    const bg = item.bg;
    if (bg && bg != currentBackground)
    {
        storyBg.style.backgroundImage = `url("${bg}")`;
        currentBackground = bg;
    }
    if (!bg) 
    {
        storyBg.style.backgroundImage = "none";
        currentBackground = "";
    }
    choiceDom.style.display = "none";
    silhouetteDom.style.display = "none";
    textDom.style.display = "none";
    textDom.classList.remove("char-mode");
    isShowingChoice = false;
    hint.textContent = "点击画面 / Enter / Space / ▸键 继续";

    saveGame("prologue", "storyScript", curIndex,0);

    if (item.bgVideo)
    {
        if (item.bgVideo !== currentBgVideo)
        {
            storyBgVideo.src = item.bgVideo;
            storyBgVideo.currentTime = 0;
            storyBgVideo.play();
            currentBgVideo = item.bgVideo;
        }
        storyBgVideo.style.display = "block";
    }
    else
    {
        if (currentBgVideo)
        {
            storyBgVideo.pause();
            storyBgVideo.style.display = "none";
            storyBgVideo.removeAttribute("src");
            storyBgVideo.load();
            currentBgVideo = "";
        }
    }

    if(item.type === "narrator"){
        textDom.innerHTML = `<div class="scene">${item.text}</div>`;
        textDom.style.display = "block";
        if(item.charImg){
            silhouetteDom.style.backgroundImage = `url(${item.charImg})`;
            silhouetteDom.style.display = "block";
        }
    }

    else if(item.type === "char"){
        textDom.classList.add("char-mode");
        const box = document.createElement("div");
        box.className = "dialog";
        const name = document.createElement("div");
        name.className = "speaker";
        name.textContent = (item.speaker === "你" || item.speaker === "我") ? getPlayerDisplayName() : item.speaker;
        box.appendChild(name);
        const line = document.createElement("p");
        line.className = "dialog-text";
        box.appendChild(line);
        textDom.innerHTML = "";
        textDom.appendChild(box);
        textDom.style.display = "block";
        typeText(line, item.text, 40);
        if (item.charImg)
        {
            silhouetteDom.style.backgroundImage =`url("${item.charImg}")`;
            silhouetteDom.classList.remove("player", "npc");
            if (item.role === "npc") silhouetteDom.classList.add("npc");
            else silhouetteDom.classList.add("player");
            silhouetteDom.style.display = "block";
        }
    }
    
    else if(item.type === "choice"){
        textDom.style.display = "none";
        hint.textContent = "";
        choiceDom.innerHTML = "";
        item.options.forEach(opt=>{
            const aTag = document.createElement("a");
            aTag.innerText = opt.label;
            aTag.dataset.tag = opt.tag;
            aTag.addEventListener("click",()=>handlePick(opt.tag));
            choiceDom.appendChild(aTag);
        })
        choiceDom.style.display = "block";
        isShowingChoice = true;
    }

    else if (item.type === "video")
    {
        textDom.style.display = "none";
        silhouetteDom.style.display = "none";
        choiceDom.style.display = "none";
        hint.textContent = "";
        isVideoShowing = true;
        videoBlock.style.display = "block";
        storyVideo.src = item.video;
        storyVideo.currentTime = 0;
        storyVideo.play();
        storyVideo.onended = finishVideo;
        return;
    }
    else if (item.type === "title")
    {
        mapClickable=false;
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
}

/* 剧情推进（键盘/点击共用） */
function advanceStory()
{
  if (settingsOpen) return;
  if (isVideoShowing)//跳过视频
  {
    finishVideo();
    return;
  }
  if (choiceDom.style.display === "block") return;//正在选择时不能跳过
  if (istyping)
  {
    currentElement.textContent=currentText;
    clearInterval(timer);
    timer=null;
    istyping=false;
    setTimeout(function ()
    {
      cannext = true;
    }, 300);
    return;
  }
  if (!cannext) return;
  playTurn();
  curIndex++;
  renderCurrentLine();
}

document.addEventListener("keydown",function (e)
{
  if (e.key === " "||e.key === "ArrowRight"||e.key === "Enter")
  {
    e.preventDefault();
    if (e.repeat) return;//防止长按连续触发
    advanceStory();
  }
});

/* 手机端：点击画面推进（排除交互元素） */
document.addEventListener("click",function (e)
{
  if (e.target.closest("button, a, #choiceDom, #settingsOverlay, #exit-game-button, #videoBlock")) return;
  advanceStory();
});

videoBlock.addEventListener("click", function ()
{
    if (isVideoShowing) finishVideo();
});

function handlePick(tag){
    const pages = {sky: "story-sky.html",empire: "story-empire.html",forest: "story-forest.html",under: "story-under.html"};
    clickNav(pages[tag]);
}

/*退出游戏*/
exitGameButton.addEventListener("click", openSettings);

settingsContinue.addEventListener("click", closeSettings);
settingsSaveExit.addEventListener("click", function ()
{
  saveGame("prologue", "storyScript", curIndex, 0);
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

renderCurrentLine();

if (mode === "continue" || navigationType === "reload" || navigationType === "back_forward")
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