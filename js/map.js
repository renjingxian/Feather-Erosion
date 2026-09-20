const mode = new URLSearchParams(window.location.search).get("mode");
const cnt = new URLSearchParams(window.location.search).get("cnt");
const time = Number (new URLSearchParams(window.location.search).get("time"));
const mapsky = document.getElementById("map-sky");
const mapempire = document.getElementById("map-empire");
const mapforest = document.getElementById("map-forest");
const mapunder = document.getElementById("map-under");
const maps = [mapsky, mapempire, mapforest, mapunder];
const apText = document.getElementById("apText");

apText.textContent = 4-time;//剩余行动点显示

maps.forEach(function(map) {
    map.addEventListener("click", function ()
    {
        turnNav(`${map.id}.html?mode=${mode}&cnt=${cnt}&time=${time}`);
    });
});

// 废墟驿站（中央）：自由行动日 1/2 关闭，日 3 开放
const mapruins = document.getElementById("map-ruins");
if (mapruins)
{
    mapruins.addEventListener("click", function ()
    {
        const day = Number(cnt);
        if (day < 3)
        {
            const factionName = { sky: "天空之城", empire: "帝国城邦", forest: "精灵之森", under: "地下古堡" }[mode] || "";
            alert((factionName || "各阵营") + "的巡逻兵在巡逻，看起来难以接近，还是不要过去了吧。");
            return;
        }
        turnNav(`story-${mode}.html?from=ruins&cnt=${cnt}&time=${time}`);
    });
}

BGM.play();