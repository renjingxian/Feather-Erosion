const USERS_KEY =
    "feather_erosion_users";

const CURRENT_USER_KEY =
    "feather_erosion_current_user";


//读取用户
function loadUsers()
{
    const raw = localStorage.getItem(USERS_KEY);


    if (!raw)
    {
        return [];
    }

    try
    {
        return JSON.parse(raw);
    }

    catch (error)
    {
        console.error(error);

        return [];
    }
}


//保存用户
function saveUsers(users)
{
    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}


//注册用户
function registerUser(username, password)
{
    const users = loadUsers();

    const exists = users.some(
        function (user)
        {
            return user.username === username;
        }
    );


    if (exists)
    {
        return {
            success: false,
            message: "用户名已存在"
        };
    }


    users.push({
        username: username,
        password: password,
        createdAt:
            new Date().toISOString()
    });

    saveUsers(users);


    return {
        success: true,
        message: "注册成功"
    };
}



//登录
function loginUser(username, password)
{
    const users = loadUsers();
    const user = users.find
        (
            function (item)
            {
                return item.username === username;
            }
        );


    if (!user)
    {
        return {
            success: false,
            message: "用户名或密码错误"
        };
    }


    if (user.password !== password)
    {
        return {
            success: false,
            message: "用户名或密码错误"
        };
    }


    localStorage.setItem(
        CURRENT_USER_KEY,
        username
    );


    return {
        success: true,
        message: "登录成功"
    };
}


//当前登录用户
function getCurrentUser()
{
    return localStorage.getItem(
        CURRENT_USER_KEY
    );
}


//退出登录
function logoutUser()
{
    localStorage.removeItem(
        CURRENT_USER_KEY
    );
}
