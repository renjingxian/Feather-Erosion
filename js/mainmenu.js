const playerInfo = document.getElementById("player-info");
const startButton = document.getElementById("start-button");
const continueButton = document.getElementById("continue-button");
const achievementButton = document.getElementById("achievement-button");
const developerButton = document.getElementById("developer-button");
const settingsButton = document.getElementById("settings-button");
const logoutButton = document.getElementById("logout-button");
const save = loadGame();

if (!save) continueButton.disabled = true;
else continueButton.disabled = false;

//当前玩家
function loadPlayer()
{
    const username = getCurrentUser();

    if (username) playerInfo.textContent = "玩家：" + username;
    else playerInfo.textContent = "游客模式";
}
loadPlayer();

//开始游戏
startButton.addEventListener("click",function ()
{
    window.location.href = "prologue.html";
});

//继续游戏
continueButton.addEventListener("click",function ()
{
    if (save.story=="empire") window.location.href = "story-empire.html?mode=continue";
    if (save.story=="sky") window.location.href = "story-sky.html?mode=continue";
    if (save.story=="under") window.location.href = "story-under.html?mode=continue";
    if (save.story=="forest") window.location.href = "story-forest.html?mode=continue";
    if (save.story=="prologue") window.location.href = "prologue.html?mode=continue";
});

//成就系统
achievementButton.addEventListener("click",function ()
{
    window.location.href = "achievements.html";
});

//设置
settingsButton.addEventListener("click",function ()
{
    window.location.href = "settings.html";
});

//返回登录
logoutButton.addEventListener("click",function ()
{
    logoutUser();
    window.location.href = "login.html";
});