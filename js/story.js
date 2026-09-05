/* ============================================================
   羽蚀纪 · 帝国城邦单线 · 纯剧情阅读器
   说明：仅推进剧情，不含任何游戏机制（无物品/好感度/战斗）。
   数据写在 STORIES 中，页面通过 <body data-story="..."> 指定读取哪一段。
   ============================================================ */

/*打字机效果*/
function typeText(element, text, speed)
{
    element.textContent = "";

    let i = 0;

    var timer = setInterval(function ()
    {
        element.textContent += text[i];

        i++;

        if (i >= text.length)
        {
            clearInterval(timer);
        }

    }, speed);
}

/*剧本输入规范*/
function escapeHtml(s)
  {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  

/*程序运行*/
(function () {
  "use strict";

  /* ------------------------------------------------------------
     剧情数据
     段类型：
       title     章节标题屏（chapter 主标题 / subtitle 副标题）
       scene     画面 / 场景说明
       monologue 内心独白
       narrate   旁白 / 叙述
       dialog    对白（speaker 说话人 / text 台词）
       end       结束 / 跳转（text 收尾 / label 按钮文字 / href 跳转地址）
     ------------------------------------------------------------ */
  var STORIES = {

    /* —— 序幕：羽落之时 —— */
    prologue: [
      { type: "title", chapter: "羽蚀纪 · 帝国城邦线", subtitle: "序章 · 羽落之时" },
      { type: "scene", text: "黑屏。风声。坠落感。" },
      { type: "monologue", text: "羽人出生时，第一声啼哭会震动云层。我出生时，接生婆沉默了很久。母亲说：‘他没有翅膀，但他有一双能看穿所有谎言的眼睛。’二十年后，那场从天空坠落的黑雨证明了她的话。谎言？不。是整个天空都在撒谎。" },
      { type: "scene", text: "你砸进泥泞地面，浑身是血。一只戴着黑色手套的手伸向你。" },
      { type: "dialog", speaker: "神秘商人", text: "醒来吧，无翼者。你有三天时间决定——是成为救世主，还是成为下一块结晶。" },
      { type: "narrate", text: "你接过他递来的东西：一只破旧的行囊，一张商人的地图，五枚记忆碎片。" },
      { type: "narrate", text: "他摊开一张泛黄的地图。四条道路在你面前铺开——四条通往不同命运的路。" },
      { type: "narrate", text: "「我要回去，掀翻那些坐在云端的骗子。」\n—— 通往天空之城。\n「地面才是真实的，我要在这里建立新秩序。」\n—— 通往帝国城邦。\n「我想去森林，那里没有谎言，只有回声。」\n—— 通往精灵之森。\n「地底下藏着一切问题的答案。」\n—— 通往地下古堡。" },
      { type: "narrate", text: "你想起那座用钢铁与蒸汽撑起的城邦。在地面，无翼不是耻辱——是可以握紧的筹码。你指向那条通往帝国的路。" },
      { type: "dialog", speaker: "神秘商人", text: "帝国不相信奇迹——他们只相信铁和火。但你身上恰好有他们无法解释的东西。好好利用这一点。" },
      { type: "narrate", text: "他递给你两瓶基础治疗药剂，和一张帝国通行证。" },
      { type: "narrate", text: "夜深了。明天，你将走进那座钢铁与蒸汽的城市。" },
      { type: "end", text: "序章 · 完", label: "进入第一幕 →", href: "empire.html" }
    ],

    /* 帝国城邦 —— 第一幕 ~ 第四幕 —— */
    empire: [

      /* ================= 第一幕：帝国城邦线 ================= */
      { type: "title", chapter: "第一幕", subtitle: "帝国城邦线" },

      { type: "scene", text: "帝国城邦正门。巨大的钢铁闸门，蒸汽从两侧管道中喷出。卫兵身穿符文装甲。" },
      { type: "dialog", speaker: "卫兵", text: "站住。非帝国公民需出示通行证。" },
      { type: "narrate", text: "你取出那张帝国通行证。闸门在沉闷的蒸汽声中缓缓升起。" },

      { type: "scene", text: "符文工坊。奥德里克正在工作台前调试符文装置。" },
      { type: "dialog", speaker: "奥德里克", text: "你就是那个无翼者？议会已经传开了——有个抗性体质的人到了帝国。" },
      { type: "narrate", text: "他举起断臂上的符文义肢，蓝光在金属上流转。" },
      { type: "dialog", speaker: "奥德里克", text: "我需要测试一件新装甲。它会提取你血液中的抗性因子。成功率75%，剩下25%会损伤你的神经。你敢吗？" },
      { type: "narrate", text: "你看着他那条断臂，没有回答他的问题，反而问：‘你的断臂，也是实验造成的吗？’他沉默了。良久，他抬起头，眼里第一次有了温度。" },
      { type: "dialog", speaker: "奥德里克", text: "你和其他人不一样。你问问题之前，先看了我的眼睛。那就……试试吧。" },
      { type: "narrate", text: "实验成功了。他交给你一套符文装甲原型，和一张工坊通行证。" },

      { type: "scene", text: "城郊的老兵墓地。墓碑排列整齐，大部分刻着同一个年份——二十年前「晶骸战争」的年份。" },
      { type: "narrate", text: "奥德里克坐在一块墓碑前。碑上刻着一个名字，那是一个在晶骸战争中阵亡的士兵。" },
      { type: "dialog", speaker: "奥德里克", text: "这支小队是我的。我是唯一活下来的。他们死后，我接受了符文义肢实验——不是为了更强大。是为了惩罚自己。" },
      { type: "dialog", speaker: "奥德里克", text: "你也会做这种选择吗？为了赎罪，把自己变成武器？" },
      { type: "narrate", text: "‘不会。’你说，‘活着比赎罪重要。’他愣了一下，没再说话。" },

      { type: "scene", text: "污染隔离区。这里曾是帝国的居民区，二十年前被羽蚀污染后废弃。墙壁上覆盖着黑色结晶。" },
      { type: "narrate", text: "你绕过守卫，潜入一间废弃实验室，在抽屉深处找到一份档案——帝国过去十年间，对羽人抗性体质的活体实验记录。" },

      { type: "scene", text: "蒸汽议会厅 · 侧厅。奥德里克神情严肃。" },
      { type: "dialog", speaker: "奥德里克", text: "军派提交了一份议案——「净化行动」。他们要对天空之城发动先发制人的打击。理由是「消除污染源头」。" },
      { type: "dialog", speaker: "奥德里克", text: "这是议案副本。我需要知道他们真正的计划——不只是议会里说的那些。" },
      { type: "narrate", text: "你潜入议会档案室，取回了军派的完整作战计划。" },

      { type: "scene", text: "帝国边缘 · 熔炉区。巨大的蒸汽熔炉已经停止运转，黑色结晶从炉口蔓延出来。晶骸生物在废墟中游荡。" },
      { type: "dialog", speaker: "奥德里克", text: "熔炉被污染了。如果让它完全晶化，半个帝国都会变成隔离区。我需要在炉心安放符文炸弹——但我的义肢在污染环境中会暴走。" },
      { type: "narrate", text: "他举起右臂：‘符文金属会对污染产生共鸣。到时候我会失去控制。’" },
      { type: "dialog", speaker: "奥德里克", text: "你确定要替我去？那里面的污染浓度……可能会要你的命。哪怕你有抗性。" },
      { type: "narrate", text: "你点头。他沉默了片刻：‘那我们一起下去。’" },
      { type: "narrate", text: "你们并肩进入熔炉。爆炸的火光从身后升起时，他第一次叫了你的名字。" },

      { type: "scene", text: "帝国中央实验室。冷藏柜中存放着羽人的血液样本，旁边是实验记录——「抗性因子提取实验 · 第47号样本」。" },
      { type: "narrate", text: "你翻到最后一页。上面写着：‘下一阶段：活体提取。对象：无翼者。’" },
      { type: "narrate", text: "奥德里克站在你身后。他看到那页记录。" },
      { type: "dialog", speaker: "奥德里克", text: "我不知道……他们已经到了这个地步。" },
      { type: "narrate", text: "‘把真相公之于众。’你说。他沉默后点头：‘我会的。’" },
      { type: "dialog", speaker: "奥德里克", text: "我不配求你原谅。但如果我帮你——把这份记录公之于众，然后我们一起逃出帝国——你愿意吗？" },
      { type: "narrate", text: "你点头。他第一次露出释然的表情。" },

      { type: "scene", text: "深夜，工坊。军派已经知道了你的存在。" },
      { type: "dialog", speaker: "奥德里克", text: "他们要求我「采集你的血液样本」。如果我不交，他们会强制行动——甚至会对你动手。" },
      { type: "narrate", text: "他坐在工作台前，义肢的光芒忽明忽暗。" },
      { type: "dialog", speaker: "奥德里克", text: "我欠你的。所以这次——你选。" },
      { type: "narrate", text: "你把手放到工作台上，直视他的眼睛：‘拿去吧，我相信你。’他却轻轻推开了你的手，摇了摇头。他做出了自己的选择——站在你这边。" },

      /* ================= 第二幕：灰烬与根 ================= */
      { type: "title", chapter: "第二幕", subtitle: "灰烬与根" },

      { type: "scene", text: "工坊。奥德里克摊开从实验室偷出的完整档案。" },
      { type: "dialog", speaker: "奥德里克", text: "帝国对羽蚀的研究……不只是为了防御。他们一直在寻找「控制污染」的方法。而所有的实验数据，都指向同一个坐标。" },
      { type: "narrate", text: "他指向地图上的一个点——四大区域交界处下方的「锁神装置」。" },
      { type: "dialog", speaker: "奥德里克", text: "那个装置……不是意外泄露的。有人故意激活了它。而帝国——早就知道。" },

      { type: "scene", text: "工坊顶楼。奥德里克俯瞰整座钢铁城市。蒸汽从无数管道中升起，在月光下像一层薄纱。" },
      { type: "dialog", speaker: "奥德里克", text: "二十年前，我从这栋楼出发，去参加晶骸战争。回来的时候，少了这只手，多了这座坟墓。" },
      { type: "dialog", speaker: "奥德里克", text: "这次出去，我不知道还能不能回来。但至少……这次我是自愿的。" },

      { type: "scene", text: "废墟驿站。四族代表首次同席。奥德里克站在你身边——他的义肢外露，符文光芒在昏暗中清晰可见。" },
      { type: "narrate", text: "各族互相指责。天空之城被指为污染源头。帝国军派提出「彻底净化」方案。" },
      { type: "narrate", text: "奥德里克拍桌而起，反对军派的方案。随后，你公开了帝国的实验记录。全场哗然。他站在你身旁，没有退后一步。" },

      /* ================= 第三幕：背叛者之影 ================= */
      { type: "title", chapter: "第三幕", subtitle: "背叛者之影" },

      { type: "scene", text: "深夜，废墟驿站房间。你父亲坐在窗台上。奥德里克在隔壁房间。" },
      { type: "dialog", speaker: "父亲", text: "你选择了帝国。一个靠铁和谎言维持的城邦。有意思。" },
      { type: "narrate", text: "他向你伸出手。" },
      { type: "dialog", speaker: "父亲", text: "我是艾德蒙。二十年前，我激活了锁神装置——为了杀死那座城市里被囚禁的神。但装置出了错。污染开始扩散。" },
      { type: "dialog", speaker: "父亲", text: "现在，帝国想要控制污染。他们想把它变成武器。如果你跟我合作——我们可以抢在他们之前毁掉装置。" },
      { type: "narrate", text: "你看着他——这个曾把你从天空抛下的人，这个让整个世界坠落的人。你缓缓摇头：‘不。这一次，我不会再听你的。’" },
      { type: "narrate", text: "他没有动怒，只是笑了一下，转身消失在窗外的夜色里。" },

      /* ================= 第四幕：新天新地 ================= */
      { type: "title", chapter: "第四幕", subtitle: "新天新地" },

      { type: "scene", text: "深暗裂隙。锁神装置的核心在黑暗中嗡鸣。" },
      { type: "narrate", text: "晶骸巨兽从裂隙中爬出，帝国军派的机械化污染兵器在它身后列阵。" },
      { type: "narrate", text: "奥德里克的符文觉醒，义肢迸发出耀眼的光芒。你们并肩冲入战场。" },
      { type: "narrate", text: "最终，锁神装置被摧毁。蔓延二十年的污染，第一次止息。" },

      { type: "title", chapter: "结局", subtitle: "钢铁纪元" },
      { type: "scene", text: "帝国议会厅。你站在讲台上，身后是奥德里克。你面前是曾经想解剖你的军派议员——现在他们低下了头。" },
      { type: "narrate", text: "污染不再是威胁。它是能源。这座城市……是你的。" },

      { type: "end", text: "帝国城邦线 · 完", label: "返回主菜单 →", href: "mainmenu.html" }
    ]
  };

  /* ------------------------------------------------------------
     渲染引擎
     ------------------------------------------------------------ */
  var storyKey = document.body.getAttribute("data-story") || "prologue";
  var story = STORIES[storyKey] || [];

  var reader = document.getElementById("reader");
  var stage = document.getElementById("stage");
  var bar = document.getElementById("progress-bar");
  var hint = document.getElementById("hint");

  var index = 0;

/*辅助函数*/

/*剧本读取*/
  function render()
  {
    var seg = story[index];
    if (!seg) return;

    /*创建新盒子、处理文本类型 */
    stage.innerHTML = "";
    var wrap = document.createElement("div");
    wrap.className = "segment seg-" + seg.type;

    if (seg.type === "title")
    {
      var h1 = document.createElement("h1");
      h1.className = "title-chapter";
      h1.textContent = seg.chapter;
      wrap.appendChild(h1);

      var orn = document.createElement("div");
      orn.className = "title-ornament";
      orn.textContent = "◆";
      wrap.appendChild(orn);

      if (seg.subtitle)
      {
        var sub = document.createElement("div");
        sub.className = "title-sub";
        sub.textContent = seg.subtitle;
        wrap.appendChild(sub);
      }
    } 

    else if (seg.type === "dialog")
    {
      var name = document.createElement("div");
      name.className = "speaker";
      name.textContent = seg.speaker;
      wrap.appendChild(name);

      var d = document.createElement("p");
      d.className = "dialog-text";
      typeText(d,seg.text,40);/*打字机效果实现 */
      wrap.appendChild(d);
    } 

    else if (seg.type === "end")
    {
      var e = document.createElement("div");
      e.className = "end-text";
      e.textContent = seg.text;
      wrap.appendChild(e);
    } 
    
    else
    {
      var p = document.createElement("p");
      p.className = "text-" + seg.type;
      p.innerHTML = escapeHtml(seg.text);
      wrap.appendChild(p);
    }

    stage.appendChild(wrap);

    // 进度条
    var pct = story.length > 1 ? (index / (story.length - 1)) * 100 : 100;
    bar.style.width = pct + "%";

    // 控制区文案
    if (seg.type === "end") {
      continueBtn.textContent = seg.label || "继续";
      hint.textContent = "";
    } else {
      continueBtn.textContent = "继续 ▸";
      hint.textContent = "点击Enter/ Space/ ▸键 继续";
    }
  }

  /*剧本推进*/
  function next()
  {
    var seg = story[index];
    if (seg && seg.type === "end" && seg.href) {
      window.location.href = seg.href;
      return;
    }
    if (index < story.length - 1) {
      index++;
      render();
    }
  }

  // 剧情跳转
  document.addEventListener("keydown", function (e) {
    if (e.key === "Space" || e.key === "ArrowRight" || e.key === "Enter")
    {
      e.preventDefault();
      if (e.repeat) 
      {
        return ;
      }
      next();
    }
  });

  render();
})();
