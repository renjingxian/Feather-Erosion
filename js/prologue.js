const cgDom = document.getElementById("cgDom");
const hint = document.getElementById("hint");
const textDom = document.getElementById("textDom");
const choiceDom = document.getElementById("choiceDom");
const silhouetteDom = document.getElementById("silhouetteDom");
const mode = new URLSearchParams(window.location.search).get("mode");
const save = loadGame();
const exitGameButton = document.getElementById("exit-game-button");
const gender=getCurrentGender();
const playerImg = gender==="male" ? "../images/male-lead.jpg" : "../images/female-lead.jpg";

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

let isCgShowing = true;
let isShowingChoice = false;
let curIndex = 0;

const storyScript = [
    {
        type:"char",
        role:"player",
        speaker:"内心独白",
        text:"在羽族的传说中，第一代羽人因为渴望天空的拥抱，才生出羽翼飞翔。但美丽而包容的天空啊，请你告诉我，为什么没有翅膀的人会坠落。",
        charImg:playerImg
    },
    {
        type:"char",
        role:"player",
        speaker:"内心独白",
        text:"那一天，渴望天空拥抱的我被他们从塔顶推了下来，坠落的瞬间，仿佛我也学会了飞翔。如果死前是这样的风声，这就是天空给我的答案吗？",
        charImg:playerImg
    },
    {
        type:"char",
        role:"player",
        speaker:"我",
        text:"咳...咳..咳",
        charImg:playerImg
    },
    {
        type:"narrator",
        text:"我用了很长一段时间，才确认自己还活着。首先涌上来的，是身体里那股挥之不去的铁锈味，然后是雨后泥土混着青草地的味道，最后是天空和阳光刺激我眼膜的感受。",
        charImg:""
    },
    {
        type:"narrator",
        text:"那是我第一次离开天空，却真实的感受到了活着的滋味。",
        charImg:""
    },
    {
        type:"char",
        role:"player",
        speaker:"我",
        text:"好难受，但我居然还活着。",
        charImg:playerImg
    },
    {
        type:"char",
        role:"npc",
        speaker:"神秘商人",
        text:"不错啊，居然还活着。",
        charImg:""
    },
    {
        type:"char",
        role:"player",
        speaker:"我",
        text:"你......是谁？",
        charImg:playerImg
    },
    {
        type:"char",
        role:"npc",
        speaker:"神秘商人",
        text:"这个问题很重要吗？比起这个，你难道不想知道‘你是谁’吗？",
        charImg:""
    },
    {
        type:"char",
        role:"player",
        speaker:"我",
        text:"......",
        charImg:playerImg
    },
    {
        type:"char",
        role:"npc",
        speaker:"神秘商人",
        text:"这个世界线不久后就将毁灭，你是唯一能拯救它的人......很奇怪，那些羽蚀似乎并不会伤害你......",
        charImg:""
    },
    {
        type:"char",
        role:"npc",
        speaker:"神秘商人",
        text:"不过这都是后话了，为了保全这条世界线，我可做了不少努力才找到你，不过我并不是强买强卖的主，我更喜欢看你们自己选择未来。",
        charImg:""
    },
    {
        type:"char",
        role:"npc",
        speaker:"神秘商人",
        text:"所以，‘无翼者’，现在你有一天时间来探索这片你从未来过的大陆，不过在这之前，请告诉我，你更倾向于去往哪里呢？",
        charImg:""
    },
    {
        type:"choice",
        options:[
            {label:"天空，你是否知晓一切？",tag:"sky"},
            {label:"我现在所站立的地面才是真实，我将在这废墟之上建立新的秩序。",tag:"empire"},
            {label:"听说东方有森林，那里没有谎言，只有回声。",tag:"forest"},
            {label:"泥土之下，埋藏着一切的答案。",tag:"under"}
        ]
    }
];

/*读取保存进度*/
if (mode === "continue" )
{
  curIndex = save.index;
  cgDom.style.display = "none";
  isCgShowing = false;
  renderCurrentLine();
}

cgDom.addEventListener("click",()=>{
    cgDom.style.display = "none";
    isCgShowing = false;
    renderCurrentLine();
})

function renderCurrentLine(){
    const item = storyScript[curIndex];
    choiceDom.style.display = "none";
    silhouetteDom.style.display = "none";
    textDom.style.display = "none";
    textDom.classList.remove("char-mode");
    isShowingChoice = false;
    hint.textContent = "点击Enter/ Space/ ▸键 继续";

    saveGame("prologue", "storyScript", curIndex);

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
        name.textContent = item.speaker;
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
}

/*键盘推进剧情*/
document.addEventListener("keydown",function (e)
{
  if (e.key === " "||e.key === "ArrowRight"||e.key === "Enter")
  {
    e.preventDefault();
    if (e.repeat) return;//防止长按连续触发
    if (cgDom && cgDom.style.display !== "none") return;//CG 还没有关闭时不能推进
    if (choiceDom.style.display === "block") return;//正在选择时不能通过 Enter 跳过
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
    curIndex++;
    renderCurrentLine();
  }
});

function handlePick(tag){
    const pages = {sky: "story-sky.html",empire: "story-empire.html",forest: "story-forest.html",under: "story-under.html"};
    window.location.href = pages[tag];
}

/*退出游戏*/
exitGameButton.addEventListener("click", function ()
{
    window.location.href = "mainmenu.html";
});