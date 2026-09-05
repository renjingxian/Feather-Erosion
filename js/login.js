const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const guestButton = document.getElementById("guest-button");
const message = document.getElementById("message");
const registerButton = document.getElementById("register-button");
const homeButton = document.getElementById("home-button");


loginButton.addEventListener("click", function ()
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

    const result = loginUser(username, password);

    message.textContent = result.message;

    if (result.success)
    {
        setTimeout(
            function ()
            {
                window.location.href = "mainmenu.html";
            }, 1000);
    }
});

guestButton.addEventListener("click", function ()
{
    window.location.href = "mainmenu.html";
});

registerButton.addEventListener("click", function ()
{
    window.location.href = "register.html";
});

homeButton.addEventListener("click", function ()
{
    window.location.href = "index.html";
});
