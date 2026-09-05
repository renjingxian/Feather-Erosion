const cgDom = document.getElementById("cgDom");
const hint = document.getElementById("hint");
const textDom = document.getElementById("textDom");
const choiceDom = document.getElementById("choiceDom");
const silhouetteDom = document.getElementById("silhouetteDom");

/*打字机效果：逐字显示对白（与帝国线一致）*/
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

let isCgShowing = true;
let isShowingChoice = false;

const storyScript = [
    {
        type:"narrator",
        text:"羽人出生时，第一声啼哭会震动云层。我出生时，接生婆沉默了很久。母亲说：“他没有翅膀，但他有一双能看穿所有谎言的眼睛。”二十年后，那场从天空坠落的黑雨证明了她的话。谎言？不。是整个天空都在撒谎。",
        charImg:""
    },
    {
        type:"narrator",
        text:"我重重砸进泥泞的地面，浑身淌着血。昏沉之间，一只戴着黑色手套的手，朝我伸了过来。",
        charImg:""
    },
    {
        type:"char",
        speaker:"神秘商人",
        text:"醒来吧，无翼者。你有三天时间决定——是成为救世主，还是成为下一块结晶。",
        charImg:"../images/silhouette_merchant.png"
    },
    {
        type:"narrator",
        text:"你得到一件破旧的行囊，一张商人递来的旧地图，还有五片零碎的记忆碎片。前路的一切，从这一刻开始铺开。",
        charImg:""
    },
    {
        type:"narrator",
        text:"商人站在一旁，安静等待你的答复。你要选择接下来要走的道路。",
        charImg:"../images/silhouette_merchant.png"
    },
    {
        type:"choice",
        options:[
            {label:"我要回去，掀翻那些坐在云端的骗子。",tag:"sky"},
            {label:"地面才是真实的，我要在这里建立新秩序。",tag:"ground"},
            {label:"我想去森林，那里没有谎言，只有回声。",tag:"forest"},
            {label:"地底下藏着一切问题的答案。",tag:"underground"}
        ]
    }
];

let curIndex = 0;

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
    isShowingChoice = false;
    hint.textContent = "点击Enter/ Space/ ▸键 继续";

    if(item.type === "narrator"){
        textDom.innerHTML = `<div class="scene">${item.text}</div>`;
        textDom.style.display = "block";
        if(item.charImg){
            silhouetteDom.style.backgroundImage = `url(${item.charImg})`;
            silhouetteDom.style.display = "block";
        }
    }else if(item.type === "char"){
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
        if(item.charImg){
            silhouetteDom.style.backgroundImage = `url(${item.charImg})`;
            silhouetteDom.style.display = "block";
        }
    }else if(item.type === "choice"){
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

document.addEventListener("keydown",function(e){
    if(e.key === "Space" || e.key === "ArrowRight" || e.key === "Enter"){
        e.preventDefault();
        if(e.repeat) return;
        if(isCgShowing) return;
        if(isShowingChoice) return;
        curIndex++;
        if(curIndex >= storyScript.length){
            return;
        }
        renderCurrentLine();
    }
})

function handlePick(tag){
    localStorage.setItem("player_route", tag);
    localStorage.setItem("item_bag", "1");
    localStorage.setItem("item_merchant_map", "1");
    localStorage.setItem("mem_fragment", "5");
    localStorage.setItem("first_free_day", "1");
    window.location.href = "map.html";
}

renderCurrentLine();
