const SAVE_KEY = "feather_erosion_saves";

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

//保存当前游戏进度
function saveGame(story, node, index)
{
    const username = getCurrentUser();
    if (!username)
    {
        console.log("当前没有登录用户");
        return;
    }
    const saves = loadSaves();
    saves[username] = {
        story: story,
        node: node,
        index: index
    };
    saveSaves(saves);
    console.log("游戏已保存", saves[username]);
}

//读取当前用户存档
function loadGame()
{
    const username = getCurrentUser();
    if (!username)
    {
        return null;
    }
    const saves = loadSaves();
    return saves[username] || null;
}