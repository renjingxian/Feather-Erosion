const SAVE_KEY = "feather_erosion_saves";
const GUEST_SAVE_KEY = "feather_erosion_guest_save";//游客玩家临时存档
//读取所有存档
function loadSaves()
{
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return {};
    try
    {
        return JSON.parse(raw);
    }
    catch (error)
    {
        return {};
    }
}

//保存所有存档
function saveSaves(saves)
{
    localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
}

// 保存当前游戏进度
function saveGame(story, node, index, haogandu, finished = false)
{
    const username = getCurrentUser();
    const saveData =
    {
        story: story,
        node: node,
        index: index,
        haogandu: haogandu,
        finished: finished
    };
    // 游客玩家：临时存档
    if (!username)
    {
        sessionStorage.setItem(GUEST_SAVE_KEY,JSON.stringify(saveData));
        console.log("游客游戏已临时保存", saveData);
        return;
    }
    // 登录玩家：正常永久存档
    const saves = loadSaves();
    saves[username] = saveData;
    saveSaves(saves);
}

//读取当前用户存档
function loadGame()
{
    const username = getCurrentUser();
    /* 游客 */
    if (!username)
    {
        const raw = sessionStorage.getItem(GUEST_SAVE_KEY);
        if (!raw) return null;
        try
        {
            return JSON.parse(raw);
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }
    /* 登录用户 */
    const saves = loadSaves();
    return saves[username] || null;
}

// 重新开始：删除当前玩家存档与四条线剧情标记，回序章重开
function resetGame()
{
    const username = getCurrentUser();

    // 删除存档
    if (!username)
    {
        sessionStorage.removeItem(GUEST_SAVE_KEY);
    }
    else
    {
        const saves = loadSaves();
        delete saves[username];
        saveSaves(saves);
    }

    // 删除四条线剧情标记与未结算的小游戏结果
    const suffix = username || "guest";
    const storage = username ? localStorage : sessionStorage;
    ["sky", "empire", "forest", "under"].forEach(function (line)
    {
        storage.removeItem("feather_erosion_" + line + "_flags_" + suffix);
        sessionStorage.removeItem(line + "_pending_battle");
        sessionStorage.removeItem(line + "_pending_infiltration");
        sessionStorage.removeItem(line + "_pending_check");
        sessionStorage.removeItem(line + "_pending_minigame");
    });
}