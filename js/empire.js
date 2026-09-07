const cgDom = document.getElementById("cgDom");
const hint = document.getElementById("hint");
const textDom = document.getElementById("textDom");
const choiceDom = document.getElementById("choiceDom");
const silhouetteDom = document.getElementById("silhouetteDom");

/*打字机效果*/
function typeText(element, text, speed)
{
    element.textContent = "";
    let i = 0;
    const timer = setInterval(function ()
    {
        element.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(timer);
    }, speed);
}

/*当前剧情节点*/
let currentNode = "start";

const nodes =
{
  /*第一幕*/
  start:
  [
    {
      type:"title",
      chapter:"第一幕",
      subtitle:"帝国城邦线"
    },

    {
      type:"narrator",
      text:"【主线任务1：断臂的符文】\n帝国城邦正门。巨大的钢铁闸门，蒸汽从两侧管道中喷出。卫兵身穿符文装甲。"
    },

    {
      type:"char",
      speaker:"卫兵",
      text:"站住。非帝国公民需出示通行证。"
    },

    {
      type:"choice",
      options:
      [
        {
          label:"出示【帝国通行证】",
          next:"gate_pass"
        },

        {
          label:"硬闯",
          next:"gate_force"
        },

        {
          label:"说是来见奥德里克的",
          next:"gate_meet"
        }
      ]
    }
  ],

  /*城门选择*/
  gate_pass:
  [
    {
      type:"narrator",
      text:"你出示【帝国通行证】。卫兵确认后放行。"
    },

    {
      type:"jump",
      goto:"workshop"
    }
  ],

  gate_force:
  [
    {
      type:"narrator",
      text:"你选择硬闯。触发战斗，胜利后进入帝国城邦。\n奥德里克好感 -10，获得【通缉】状态。"
    },

    {
      type:"jump",
      goto:"workshop"
    }
  ],

  gate_meet:
  [
    {
      type:"narrator",
      text:"你说明自己是来见奥德里克的。卫兵通报后放行。\n奥德里克好感 +3。"
    },

    {
      type:"jump",
      goto:"workshop"
    }
  ],

  /*符文工坊*/
  workshop:
  [
    {
      type:"narrator",
      text:"你进入符文工坊。奥德里克正在工作台前调试符文装置。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"你就是那个无翼者？议会已经传开了——有个抗性体质的人到了帝国。"
    },

    {
      type:"narrator",
      text:"他举起断臂上的符文义肢，蓝光在金属上流转。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"我需要测试一件新装甲。它会提取你血液中的抗性因子。成功率75%，剩下25%会损伤你的神经。你敢吗？"
    },

    {
      type:"choice",
      options:
      [
        {
          label:"接受实验",
          next:"experiment_accept"
        },

        {
          label:"拒绝，提出其他合作方式",
          next:"experiment_refuse"
        },

        {
          label:"反问：“你的断臂也是实验造成的吗？”",
          next:"experiment_question"
        }
      ]
    }
  ],

  experiment_accept:
  [
    {
      type:"narrator",
      text:"你接受了实验。\n获得【符文装甲原型】，奥德里克好感 +10。"
    },

    {
      type:"narrator",
      text:"任务奖励：【符文工坊通行证】、【抗性数据档案】。"
    },

    {
      type:"jump",
      goto:"task2"
    }
  ],

  experiment_refuse:
  [
    {
      type:"narrator",
      text:"你拒绝实验，并提出其他合作方式。奥德里克失望，但尊重你的决定。\n奥德里克好感 -5。"
    },

    {
      type:"narrator",
      text:"任务奖励：【符文工坊通行证】、【抗性数据档案】。"
    },

    {
      type:"jump",
      goto:"task2"
    }
  ],

  experiment_question:
  [
    {
      type:"narrator",
      text:"你没有回答实验的问题，而是反问他的断臂是否也是实验造成的。奥德里克沉默了。\n奥德里克好感 +15。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"你和其他人不一样。你问问题之前，先看了我的眼睛。那就……试试吧。"
    },

    {
      type:"narrator",
      text:"任务奖励：【符文工坊通行证】、【抗性数据档案】。"
    },

    {
      type:"jump",
      goto:"task2"
    }
  ],

  /*主线任务2：议会密谋*/
  task2:
  [
    {
      type:"narrator",
      text:"【主线任务2：议会密谋】\n蒸汽议会厅·侧厅。奥德里克神情严肃。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"军派提交了一份议案——“净化行动”。他们要对天空之城发动先发制人的打击。理由是“消除污染源头”。"
    },

    {
      type:"narrator",
      text:"他递给你一份文件。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"这是议案副本。我需要知道他们真正的计划——不只是议会里说的那些。"
    },

    {
      type:"choice",
      options:
      [
        {
          label:"答应并执行",
          next:"task2_accept"
        },

        {
          label:"拒绝，建议劝阻军派",
          next:"task2_peace"
        },

        {
          label:"将军派计划举报给科研派",
          next:"task2_report"
        }
      ]
    }
  ],

  task2_accept:
  [
    {
      type:"narrator",
      text:"你潜入议会档案室，成功取得【军派作战计划】。\n奥德里克好感 +15。"
    },

    {
      type:"jump",
      goto:"task3"
    }
  ],

  task2_peace:
  [
    {
      type:"narrator",
      text:"你拒绝潜入，并建议通过政治方式劝阻军派。奥德里克欣赏你的和平立场。\n奥德里克好感 +5。"
    },

    {
      type:"jump",
      goto:"task3"
    }
  ],

  task2_report:
  [
    {
      type:"narrator",
      text:"你将军派计划举报给科研派，获得科研派支持。"
    },

    {
      type:"jump",
      goto:"task3"
    }
  ],

  /*主线任务3：污染熔炉*/
  task3:
  [
    {
      type:"narrator",
      text:"【主线任务3：污染熔炉】\n帝国边缘·熔炉区。巨大的蒸汽熔炉已经停止运转，黑色结晶从炉口蔓延出来。晶骸生物在废墟中游荡。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"熔炉被污染了。如果让它完全晶化，半个帝国都会变成隔离区。我需要在炉心安放符文炸弹——但我的义肢在污染环境中会暴走。"
    },

    {
      type:"narrator",
      text:"他举起右臂。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"符文金属会对污染产生共鸣。到时候我会失去控制。"
    },

    {
      type:"choice",
      options:
      [
        {
          label:"替他操作引爆器",
          next:"furnace_self"
        },

        {
          label:"让他去，你从旁掩护",
          next:"furnace_cover"
        },

        {
          label:"找借口留在后方",
          next:"furnace_back"
        }
      ]
    }
  ],

  furnace_self:
  [
    {
      type:"narrator",
      text:"你决定深入炉心安置炸弹。\n奥德里克好感 +20。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"你确定要替我去？那里面的污染浓度……可能会要你的命。哪怕你有抗性。"
    },

    {
      type:"narrator",
      text:"你点头。他沉默了片刻。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"那我们一起下去。"
    },

    {
      type:"narrator",
      text:"你们并肩进入熔炉。爆炸的火光从身后升起时，他第一次叫了你的名字。"
    },

    {
      type:"jump",
      goto:"task4"
    }
  ],

  furnace_cover:
  [
    {
      type:"narrator",
      text:"你让奥德里克进入炉心，自己从旁掩护。他冒险完成了任务。\n奥德里克好感 +10。"
    },

    {
      type:"jump",
      goto:"task4"
    }
  ],

  furnace_back:
  [
    {
      type:"narrator",
      text:"你找借口留在后方。奥德里克没有多说什么，但明显十分失望。\n奥德里克好感 -20。"
    },

    {
      type:"jump",
      goto:"task4"
    }
  ],

  /*主线任务4：铁与血*/
  task4:
  [
    {
      type:"narrator",
      text:"【主线任务4：铁与血】\n帝国中央实验室。冷藏柜中存放着羽人的血液样本，旁边是实验记录——“抗性因子提取实验·第47号样本”。"
    },

    {
      type:"narrator",
      text:"你翻到最后一页。上面写着：“下一阶段：活体提取。对象：无翼者。”"
    },

    {
      type:"narrator",
      text:"奥德里克站在你身后。他也看到了那页记录。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"我不知道……他们已经到了这个地步。"
    },

    {
      type:"choice",
      options:
      [
        {
          label:"谴责他并要求公开真相",
          next:"blood_condemn"
        },

        {
          label:"替他保密",
          next:"blood_hide"
        },

        {
          label:"威胁要举报他",
          next:"blood_threat"
        }
      ]
    }
  ],

  blood_condemn:
  [
    {
      type:"narrator",
      text:"你要求奥德里克公开真相。他沉默后点头。\n奥德里克好感 +15。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"我会的。"
    },

    {
      type:"jump",
      goto:"resonance"
    }
  ],

  blood_hide:
  [
    {
      type:"narrator",
      text:"你选择替他保密。但这让奥德里克更加厌恶自己的懦弱。\n奥德里克好感 -10。"
    },

    {
      type:"jump",
      goto:"resonance"
    }
  ],

  blood_threat:
  [
    {
      type:"narrator",
      text:"你威胁要举报他。他的眼神逐渐冷下来。\n奥德里克好感 -25。"
    },

    {
      type:"jump",
      goto:"resonance"
    }
  ],

  /*好感锁定事件：残响*/
  resonance:
  [
    {
      type:"narrator",
      text:"【好感锁定事件：残响】\n深夜，符文工坊。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"军派已经知道你的存在了。他们要求我“采集你的血液样本”。如果我不交，他们会强制行动——甚至会对你动手。"
    },

    {
      type:"narrator",
      text:"他坐在工作台前，义肢的光芒忽明忽暗。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"我欠你的。所以这次——你选。"
    },

    {
      type:"choice",
      options:
      [
        {
          label:"自愿交出样本，相信他会保护你",
          next:"resonance_a"
        },

        {
          label:"拒绝，说服他一起叛逃",
          next:"resonance_b"
        },

        {
          label:"伪造样本应付",
          next:"resonance_c"
        }
      ]
    }
  ],

  resonance_a:
  [
    {
      type:"narrator",
      text:"你选择相信奥德里克，把样本交给他。"//能否选择后期决定
    },

    {
      type:"jump",
      goto:"act2"
    }
  ],

  resonance_b:
  [
    {
      type:"narrator",
      text:"你拒绝交出样本，并试图说服奥德里克与你一起叛逃。"//能否选择后期决定
    },

    {
      type:"jump",
      goto:"act2"
    }
  ],

  resonance_c:
  [
    {
      type:"narrator",
      text:"你决定伪造样本应付军派。"//成功概率后期更改
    },

    {
      type:"jump",
      goto:"act2"
    }
  ],

  /*第二幕*/
  act2:
  [
    {
      type:"title",
      chapter:"第二幕",
      subtitle:"灰烬与根"
    },

    {
      type:"narrator",
      text:"【主线任务1：实验记录的指向】\n工坊。奥德里克摊开从实验室偷出的完整档案。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"帝国对羽蚀的研究……不只是为了防御。他们一直在寻找“控制污染”的方法。而所有的实验数据，都指向同一个坐标。"
    },

    {
      type:"narrator",
      text:"他指向地图上的一个点——四大区域交界处下方的“锁神装置”。"
    },

    {
      type:"char",
      speaker:"奥德里克",
      text:"那个装置……不是意外泄露的。有人故意激活了它。而帝国——早就知道。"
    },

    {
      type:"narrator",
      text:"获得：【锁神装置坐标】、【帝国实验档案】。"
    },

    {
      type:"jump",
      goto:"summit"
    }
  ],

  /*三方峰会*/
  summit:
  [
    {
      type:"narrator",
      text:"【三方峰会】\n废墟驿站。四族代表首次同席。奥德里克站在你身边——他的义肢外露，符文光芒在昏暗中清晰可见。"
    },

    {
      type:"narrator",
      text:"各族互相指责。天空之城被指为污染源头。"
    },

    {
      type:"narrator",
      text:"帝国军派提出“彻底净化”方案。奥德里克拍桌反对。"
    },

    {
      type:"narrator",
      text:"你公开帝国实验记录。全场哗然。奥德里克站在你身旁，没有退后一步。"
    },

    {
      type:"jump",
      goto:"act3"
    }
  ],

  /*第三幕*/
  act3:
  [
    {
      type:"title",
      chapter:"第三幕",
      subtitle:"背叛者之影"
    },

    {
      type:"narrator",
      text:"【主线任务1：父亲的真相】\n深夜，废墟驿站房间。你父亲坐在窗台上。奥德里克在隔壁房间。"
    },

    {
      type:"char",
      speaker:"父亲",
      text:"你选择了帝国。一个靠铁和谎言维持的城邦。有意思。"
    },

    {
      type:"narrator",
      text:"他向你伸出手。"
    },

    {
      type:"char",
      speaker:"父亲",
      text:"我是艾德蒙。二十年前，我激活了锁神装置——为了杀死那座城市里被囚禁的神。但装置出了错。污染开始扩散。"
    },

    {
      type:"char",
      speaker:"父亲",
      text:"现在，帝国想要控制污染。他们想把它变成武器。如果你跟我合作——我们可以抢在他们之前毁掉装置。"
    },

    {
      type:"choice",
      options:
      [
        {
          label:"杀父",
          next:"father_kill"
        },

        {
          label:"与他合作",
          next:"father_cooperate"
        },

        {
          label:"放他走",
          next:"father_release"
        },

        {
          label:"献祭父亲",
          next:"father_sacrifice"
        }
      ]
    }
  ],

  father_kill:
  [
    {
      type:"narrator",
      text:"你选择杀死父亲。奥德里克帮你处理了现场。\n奥德里克好感 +15。"
    },

    {
      type:"jump",
      goto:"act4"
    }
  ],

  father_cooperate:
  [
    {
      type:"narrator",
      text:"你选择与父亲合作。奥德里克得知后十分愤怒。\n奥德里克好感 -30。"
    },

    {
      type:"jump",
      goto:"act4"
    }
  ],

  father_release:
  [
    {
      type:"narrator",
      text:"你选择放父亲离开。奥德里克是否接受你的解释，取决于此前的发展。"
    },

    {
      type:"jump",
      goto:"act4"
    }
  ],

  father_sacrifice:
  [
    {
      type:"narrator",
      text:"你选择献祭父亲。他自愿融入装置。\n奥德里克好感 +20。"
    },

    {
      type:"jump",
      goto:"act4"
    }
  ],

  /*第四幕*/
  act4:
  [
    {
      type:"title",
      chapter:"第四幕",
      subtitle:"新天新地"
    },

    {
      type:"narrator",
      text:"【最终决战】\n深暗裂隙。锁神装置的核心在黑暗中嗡鸣。"
    },

    {
      type:"narrator",
      text:"晶骸巨兽从裂隙中爬出，帝国军派的机械化污染兵器在它身后列阵。"
    },

    /*{
      type:"narrator",
      text:"原剧本中的战斗支援条件包括：奥德里克好感≥80、完成【符文装甲原型】、取得【完整实验记录】。这些数值判定暂未接入。"
    },后期更改*/

    {
      type:"narrator",
      text:"最终，锁神装置的命运被决定，蔓延二十年的污染迎来转折。"
    },

    {
      type:"jump",
      goto:"ending_choice"
    }
  ],

  /*结局选择*/
  ending_choice:
  [
    {
      type:"narrator",
      text:"【帝国城邦线·结局】\n请选择对应结局。"//后期更改
    },

    {
      type:"choice",
      options:
      [
        {
          label:"【钢铁纪元】留在帝国",
          next:"ending_steel"
        },

        {
          label:"【四族盟约】拒绝留城，促成联军",
          next:"ending_alliance"
        },

        {
          label:"【无名英雄】独自毁灭装置",
          next:"ending_hero"
        },

        {
          label:"【父与子】与父亲合作",
          next:"ending_father"
        }
      ]
    }
  ],

  ending_steel:
  [
    {
      type:"title",
      chapter:"结局",
      subtitle:"钢铁纪元"
    },

    {
      type:"narrator",
      text:"帝国议会厅。你站在讲台上，身后是奥德里克。你面前是曾经想解剖你的军派议员——现在他们低下了头。"
    },

    {
      type:"narrator",
      text:"污染不再是威胁。它是能源。这座城市……是你的。"
    },

    {
      type:"jump",
      goto:"ending_exit"
    }
  ],

  ending_alliance:
  [
    {
      type:"title",
      chapter:"结局",
      subtitle:"四族盟约"
    },

    {
      type:"narrator",
      text:"你拒绝留在帝国，选择促成四族联军。奥德里克以盟友的身份站在你身边。"
    },

    {
      type:"jump",
      goto:"ending_exit"
    }
  ],

  ending_hero:
  [
    {
      type:"title",
      chapter:"结局",
      subtitle:"无名英雄"
    },

    {
      type:"narrator",
      text:"你独自毁灭了装置。奥德里克留在帝国，终身未再提起你的名字。"
    },

    {
      type:"jump",
      goto:"ending_exit"
    }
  ],

  ending_father:
  [
    {
      type:"title",
      chapter:"结局",
      subtitle:"父与子"
    },

    {
      type:"narrator",
      text:"你选择与父亲合作。奥德里克最终站在了你的对立面。"
    },

    {
      type:"jump",
      goto:"ending_exit"
    }
  ],

  /*结束*/
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

/*当前节点数据*/
let nodeData = nodes[currentNode];
let pos = 0;

/*剧情渲染*/
function render()
{
  if (pos >= nodeData.length) return;
  const item = nodeData[pos];

  /*jump*/
  if (item.type === "jump")
  {
    currentNode = item.goto;
    nodeData = nodes[currentNode];
    pos = 0;
    render();
    return;
  }

  /* 每次渲染前先隐藏旧内容 */
  choiceDom.style.display = "none";
  textDom.style.display = "none";
  if (silhouetteDom) silhouetteDom.style.display = "none";

  hint.textContent ="点击Enter/ Space/ ▸键 继续";

  /*标题*/
  if (item.type === "title")
  {
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
  }

  /*人物对白*/
  else if (item.type === "char")
  {
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
  }

  /*选择*/
  else if (item.type === "choice")
  {
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