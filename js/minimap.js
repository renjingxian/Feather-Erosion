const mode = new URLSearchParams(window.location.search).get("mode");
const cnt = new URLSearchParams(window.location.search).get("cnt");
let time = Number (new URLSearchParams(window.location.search).get("time"));
const backmap = document.getElementById("backmap");
//sky
const yun = document.getElementById("yun");
const feng = document.getElementById("feng");
const shi = document.getElementById("shi");
const yu = document.getElementById("yu");
//empire
const fu = document.getElementById("fu");
const wu = document.getElementById("wu");
const lao = document.getElementById("lao");
const hei = document.getElementById("hei");
const trial = document.getElementById("trial");
//under
const hui = document.getElementById("hui");
const kuang = document.getElementById("kuang");
const tong = document.getElementById("tong");
const jiu = document.getElementById("jiu");
const di = document.getElementById("di");
const shen = document.getElementById("shen");
const hu = document.getElementById("hu");
//forest
const de = document.getElementById("de");
const chen = document.getElementById("chen");
const gen = document.getElementById("gen");
const sheng = document.getElementById("sheng");
const dong = document.getElementById("dong");
const zhao = document.getElementById("zhao");

const apText = document.getElementById("apText");
const place = [yun, feng, shi, yu, trial, fu, wu, lao, hei, hui, kuang, tong, jiu, di, shen, hu, de, chen, gen, sheng, dong, zhao];

apText.textContent = 4-time;//剩余行动点显示

//回主地图重选
backmap.addEventListener("click", function () 
{
    turnNav(`map.html?mode=${mode}&cnt=${cnt}&time=${time}`);
});

//回剧情
place.forEach(function(place) {
    if (place==null) return;
    place.addEventListener("click", function ()
    {
        turnNav(`story-${mode}.html?from=${place.id}&cnt=${cnt}&time=${time}`);
    });
});

BGM.play();

