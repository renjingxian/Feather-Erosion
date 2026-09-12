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
        window.location.href = `${map.id}.html?mode=${mode}&cnt=${cnt}&time=${time}`;
    });
});