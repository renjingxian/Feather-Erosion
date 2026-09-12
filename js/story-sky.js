const cgDom = document.getElementById("cgDom");
const hint = document.getElementById("hint");
const textDom = document.getElementById("textDom");
const choiceDom = document.getElementById("choiceDom");
const silhouetteDom = document.getElementById("silhouetteDom");
const mode = new URLSearchParams(window.location.search).get("mode");
const save = loadGame();
const exitGameButton = document.getElementById("exit-game-button");
const mapMini = document.getElementById("mapMini");
const from = new URLSearchParams(window.location.search).get("from");
const cnt = new URLSearchParams(window.location.search).get("cnt");
let time = new URLSearchParams(window.location.search).get("time");


let istyping = false;
let timer = null;
let currentElement = null;
let currentText = "";
let cannext = true;
let mapClickable = false;

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

/*当前剧情节点*/
let currentNode = "firstfreedom";
let pos = 0;

//所有剧情节点
const nodes = 
{
  firstfreedom:
  [
    {
      type:"narrator",
      text:"【系统提示】\n在正式踏上归途之前，你有一整天可以自由探索。黄昏之前，你必须决定从哪里开始。\n点击左上角小地图开启自由探索。"
    },
    //yun
    {
      type:"narrator",
      text:"集市悬浮在云层中，风晶石摊位随气流漂移。羽人商贩用哨音叫卖。你走在人群中，有人投来异样的目光——他们注意到了你的后背。"
    },
    {
      type:"choice",
      options:
      [
        {
          label:"购买风晶石",
          next:"yun1"
        },
        {
          label:"寻找记忆羽毛",
          next:"yun2"
        },
        {
          label:"在边缘平台独坐",
          next:"yun3"
        },
        {
          label:"打听长老会的消息",
          next:"yun4"
        }
      ]
    },
    {
      type:"jump",
      goto:"start"
    }
  ],
  yun1:
  [
    {
      type:"narrator",
      text:"你购买了风晶石"
    },
    {
      type:"jump",
      goto:"mainmap"
    }
  ],
  yun2:
  [
    {
      type:"minigame",
      label:"2"
    },
    {
      type:"jump",
      goto:"mainmap"
    }
  ],
  yun3:
  [
    {
      type:"narrator",
      text:"你在边缘平台独坐"
    },
    {
      type:"jump",
      goto:"mainmap"
    }
  ],
  yun4:
  [
    {
      type:"narrator",
      text:"你打听了长老会的消息"
    },
    {
      type:"jump",
      goto:"mainmap"
    }
  ],
  mainmap:
  [
    {
      type:"minigame",
      label:"0"
    }
  ],


  start: 
  [
    {
      type:"narrator",
      text:"自由行动日结束\n【试翼之塔｜天空之城底部入口】两座白晶高塔之间，一道光门闪烁。两名羽人守卫持矛而立，翅膀收拢在背后，目光锐利。"
    },
    {
      type:"char",
      speaker:"守卫A",
      text:"无翼者？流放之人不得返回。这是长老会的法令。"
    },
    {
      type:"char",
      speaker:"守卫B",
      text:"除非……你有赦免令。你有吗？"
    },
    {
      type:"choice",
      options:
      [
        {
          label:"A1.出示【商人的信物】（伪造文书）",
          next:"a1"
        },
        {
          label:"A2.硬闯",
          next:"a2"
        },
        {
          label:"A3.说出真名：“我是艾德蒙长老之子。”",
          next:"a3"
        }
      ]
    }
  ],
  a1: 
  [
    {
      type:"narrator",
      text:"守卫皱眉，但信物质地确实像长老会印章。犹豫后放行。"
    },
    {
      type:"jump",
      goto:"common_enter_city"
    }
  ],
  a2: 
  [
    {
      type:"narrator",
      text:"触发战斗。胜利后进入，但被通缉。塞琳好感‑10。获得【通缉】状态（天空之城部分区域封锁）"
    },
    {
      type:"jump",
      goto:"common_enter_city"
    }
  ],
  a3: 
  [
    {
      type:"narrator",
      text:"守卫听到你的名字，满脸震惊，面面相觑。"
    },
    {
      type:"char",
      speaker:"守卫",
      text:"艾德蒙……之子？那个……无翼的孩子？二十年前的……"
    },
    {
      type:"char",
      speaker:"守卫B",
      text:"让他进去。这事我们管不了。"
    },
    {
      type:"narrator",
      text:"获得【长老会关注】状态，塞琳好感+5。"
    },
    {
      type:"jump",
      goto:"common_enter_city"
    }
  ],
  common_enter_city:
  [
    {
      type:"narrator",
      text:"你踏入天空之城。 街道由白色晶石铺成，建筑悬浮在空中，风在缝隙中穿行，发出低沉的嗡鸣。你感觉到脚底的震颤——这座城市还活着。"
    },
    {
      type:"narrator",
      text:"任务目标： 进入禁塔，偷取【机械义翼设计图】。你穿过回廊，避开巡逻，来到城市最高处的“试翼之塔”。这座塔专门存放上古羽人技术，传说最早的义翼就是从这里诞生的。"
    },
    {
      type:"narrator",
      text:"你推开塔顶的雕花晶门时，看到了她——塞琳站在塔顶中央，背对着门。她展开双翼，准备试飞。但她展开的姿态很别扭——她的右翼明显比左翼短了一截，骨节扭曲。她用力扇动翅膀，但身体不平衡，摇晃着跌倒在地。她猛地回头，看见了你。"
    },
    {
      type:"char",
      speaker:"塞琳",
      text:"（脸色惨白）你……看到了。"
    },
    {
      type:"choice",
      options:
      [
        {
          label:"保守秘密，假装没看见",
          next:"sel1"
        },
        {
          label:"上前帮她矫正飞行姿势",
          next:"sel2"
        },
        {
          label:"公开揭穿她的伪装",
          next:"sel3"
        }
      ]
    }
  ],
  sel1:
  [
    {
      type:"narrator",
      text:"她沉默许久，低声说：“谢谢。”塞琳好感+15。"
    },
    {
      type:"jump",
      goto:"ending_exit"
    }
  ],
  sel2:
  [
    {
      type:"narrator",
      text:"你走过去，用手扶住她畸形的右翼骨节。她浑身僵硬，然后哭了出来。塞琳好感+25。"
    },
    {
      type:"char",
      speaker:"塞琳",
      text:"从小到大，没人碰过我的翅膀。所有人都在假装看不见——包括我自己。"
    },
    {
      type:"narrator",
      text:"她站起身，再次展开翅膀。这一次，虽然仍不完全平衡，但至少没有摔倒。"
    },
    {
      type:"char",
      speaker:"塞琳",
      text:"你来这里……是为了义翼的设计图吧。跟我来。"
    },
    {
      type:"narrator",
      text:"她带你走到塔顶的暗格前，取出一卷泛黄的图纸。"
    },
    {
      type:"char",
      speaker:"塞琳",
      text:"这是上古羽人留下的。他们曾经为受伤的战士制造过机械翅膀。但长老会把它封存了——因为他们害怕‘不完美者’也能飞。"
    },
    {
      type:"char",
      speaker:"塞琳",
      text:"拿去吧。也许你能做到他们做不到的事。"
    },
    {
      type:"narrator",
      text:"【任务奖励】\n·【机械义翼设计图】（关键道具）\n·【试翼塔暗格钥匙】（后续可用）\n·塞琳好感已调整"
    },
    {
      type:"jump",
      goto:"ending_exit"
    }
  ],
  sel3:
  [
    {
      type:"narrator",
      text:"你大声说：“圣女是个残翼！”她眼中只剩下恨意。塞琳好感‑20。"
    },
    {
      type:"jump",
      goto:"ending_exit"
    }
  ],
  ending_exit:
  [
    {
      type:"choice",
      options:
      [
        {
          label:"返回世界大地图",
          next:"backmap"
        }
      ]
    }
  ]
};

/*读取保存进度*/
if (mode === "continue" || from)
{
  currentNode = save.node;
  pos = save.index;
  cgDom.style.display = "none";
  if (from)
  {
    if (from==="yun")
    {
      pos=1;
      currentNode="firstfreedom";
    }
  }
}

if (time==4)
{
  currentNode="start";
  pos=0;
}

/*当前节点数据*/
let nodeData = nodes[currentNode];

/*剧情渲染*/
function render()
{
  if (pos >= nodeData.length) return;
  const item = nodeData[pos];

  /*jump*/
  if (item.type === "jump")
  {
    mapClickable=false;
    currentNode = item.goto;
    nodeData = nodes[currentNode];
    pos = 0;
    render();
    return;
  }

  saveGame("sky", currentNode, pos);

  /* 每次渲染前先隐藏旧内容 */
  choiceDom.style.display = "none";
  textDom.style.display = "none";
  if (silhouetteDom) silhouetteDom.style.display = "none";
  textDom.classList.remove("char-mode");

  hint.textContent ="点击Enter/ Space/ ▸键 继续";

  /*标题*/
  if (item.type === "title")
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

  /*旁白 / 场景*/
  else if (item.type === "narrator")
  {
    textDom.innerHTML = "";
    const scene = document.createElement("div");
    scene.className = "scene";
    scene.textContent = item.text;
    textDom.appendChild(scene);
    textDom.style.display = "block";
    if (currentNode === "firstfreedom" && cgDom.style.display === "none")
    {
      mapMini.style.display = "block";
      if (pos==0) mapClickable=true;
    }
    if (currentNode!="firstfreedom"||pos!=0) mapClickable=false;
  }

  /*人物对白*/
  else if (item.type === "char")
  {
    mapClickable=false;
    textDom.classList.add("char-mode");
    const box = document.createElement("div");
    const name = document.createElement("div");
    const line = document.createElement("p");
    box.className = "dialog";
    name.className = "speaker";
    name.textContent = item.speaker;
    box.appendChild(name);
    line.className = "dialog-text";
    box.appendChild(line);
    textDom.innerHTML = "";
    textDom.appendChild(box);
    textDom.style.display = "block";
    typeText(line,item.text,40);
    if (item.charImg)
    {
      silhouetteDom.style.backgroundImage =`url("${item.charImg}")`;
      silhouetteDom.classList.remove("player", "npc");
      if (item.role === "npc") silhouetteDom.classList.add("npc");
      else silhouetteDom.classList.add("player");
      silhouetteDom.style.display = "block";
    }
  }

  /*选择*/
  else if (item.type === "choice")
  {
    mapClickable=false;
    hint.textContent = "";
    choiceDom.innerHTML = "";
    item.options.forEach(function (opt)
    {
      const a = document.createElement("a");
      a.textContent = opt.label;
      a.addEventListener("click",function ()
      {
        if (opt.next === "backmap")
        {
          window.location.href = "map.html";
          return;
        }

        currentNode = opt.next;
        nodeData = nodes[currentNode];
        pos = 0;
        render();
      });
      choiceDom.appendChild(a);
    });
    choiceDom.style.display = "block";
  }
  
  else if (item.type==="minigame")
  {
    time++;
    if (item.label==2) window.location.href = `game2.html?mode=sky&cnt=1&time=${time}`;
    if (item.label==0&&time<4) window.location.href = `map.html?mode=sky&cnt=1&time=${time}`;
    if (item.label==0&&time==4)
    {
      currentNode="start";
      pos=0;
      nodeData = nodes[currentNode];
      render();
    }
  }
}

/*键盘推进剧情*/
document.addEventListener("keydown",function (e)
{
  if (currentNode==="firstfreedom"&&pos==0) return;
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
    pos++;
    render();
  }
});

/*点击 CG 开始剧情*/
if (cgDom)
{
  cgDom.addEventListener("click",function ()
  {
    cgDom.style.display = "none";
    render();
  });
}

/*第一次渲染*/
render();

/*退出游戏*/
exitGameButton.addEventListener("click", function ()
{
  window.location.href = "mainmenu.html";
});

mapMini.addEventListener("click", function () 
{
  if (!mapClickable) return;
  if (currentNode==="firstfreedom") window.location.href = "map.html?mode=sky&cnt=1&time=0";
});