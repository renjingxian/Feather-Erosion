const playerInfo = document.getElementById("player-info");
const startButton = document.getElementById("start-button");
const continueButton = document.getElementById("continue-button");
const achievementButton = document.getElementById("achievement-button");
const settingsButton = document.getElementById("settings-button");
const logoutButton = document.getElementById("logout-button");
const save = loadGame();

if (!save||save.finished) continueButton.disabled = true;
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
    if (!getCurrentUser()) sessionStorage.removeItem(GUEST_SAVE_KEY);
    clickNav("prologue.html");
});

//继续游戏
continueButton.addEventListener("click",function ()
{
    if (save.story=="empire") clickNav("story-empire.html?mode=continue");
    if (save.story=="sky") clickNav("story-sky.html?mode=continue");
    if (save.story=="under") clickNav("story-under.html?mode=continue");
    if (save.story=="forest") clickNav("story-forest.html?mode=continue");
    if (save.story=="prologue") clickNav("prologue.html?mode=continue");
});

//成就系统
achievementButton.addEventListener("click",function ()
{
    clickNav("achievement.html");
});

//攻略
settingsButton.addEventListener("click",function ()
{
    clickNav("walkthrough.html");
});

//退出登录
logoutButton.addEventListener("click",function ()
{
    if (!getCurrentUser()) sessionStorage.removeItem(GUEST_SAVE_KEY);
    logoutUser();
    clickNav("login.html");
});