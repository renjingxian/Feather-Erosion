const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const registerButton = document.getElementById("register-button");
const backButton = document.getElementById("back-button");
const homeButton = document.getElementById("home-button");
const message = document.getElementById("message");

registerButton.addEventListener("click", function ()
{
    const username = usernameInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

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

    if (password !== confirmPassword)
    {
        message.textContent = "两次输入的密码不一致";
        return;
    }

    const result = registerUser(username, password);

    message.textContent = result.message;

    if (result.success)
    {
        setTimeout(function ()
        {
            window.location.href = "login.html";
        }, 1000);
    }
});

backButton.addEventListener("click", function ()
{
    window.location.href = "login.html";
});

homeButton.addEventListener("click", function ()
{
    window.location.href = "index.html";
});
