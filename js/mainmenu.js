const playerInfo = document.getElementById("player-info");
const startButton = document.getElementById("start-button");
const continueButton = document.getElementById("continue-button");
const achievementButton = document.getElementById("achievement-button");
const developerButton = document.getElementById("developer-button");
const settingsButton = document.getElementById("settings-button");
const logoutButton = document.getElementById("logout-button");


//当前玩家
function loadPlayer()
{
    const username =
        getCurrentUser();


    if (username)
    {
        playerInfo.textContent =
            "玩家：" +
            username;
    }

    else
    {
        playerInfo.textContent =
            "游客模式";
    }
}


loadPlayer();


//开始游戏
startButton.addEventListener("click",function ()
    {
        window.location.href =
            "game.html";
    }
);



//继续游戏
continueButton.addEventListener("click",function ()
    {
        window.location.href = "game.html";
    }
);



//成就系统
achievementButton.addEventListener("click",function ()
    {
        window.location.href = "achievements.html";
    }
);



//开发者介绍
developerButton.addEventListener("click",function ()
    {
        window.location.href = "developers.html";
    }
);



//设置
settingsButton.addEventListener("click",function ()
    {
        window.location.href = "settings.html";
    }
);



//返回登录
logoutButton.addEventListener("click",function ()
    {
        logoutUser();
        window.location.href = "../index.html";
    }
);