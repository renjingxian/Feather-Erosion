const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const guestButton = document.getElementById("guest-button");
const message = document.getElementById("message");
const registerButton = document.getElementById("register-button");

loginButton.addEventListener("click",async function () 
{
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username === "")
    {
        message.textContent = "请输入用户名";
        return;
    }

    if (password === "")
    {
        message.textContent = "请输入密码";
        return;
    }

    try
    {
        const response = await fetch
            (
                "/api/login",
                {
                    method: "POST",
                    headers:
                    {
                        "Content-Type":
                            "application/json"
                    },
                    body:
                        JSON.stringify({
                            username:
                                username,
                            password:
                                password
                        })
                }
            );

        const data = await response.json();

        message.textContent = data.message;

        if (data.success)
        {
            setTimeout(
                function ()
                {
                    window.location.href = "html/mainmenu.html";
                },1000);

        }
    }

    catch (error)
    {
        console.error(error);
        message.textContent = "无法连接服务器";
    }

});

guestButton.addEventListener("click", function ()
{
    window.location.href = "html/mainmenu.html";

});

registerButton.addEventListener("click", function ()
{
    window.location.href = "html/register.html";
});
