const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const registerButton = document.getElementById("register-button");
const backButton = document.getElementById("back-button");
const homeButton = document.getElementById("home-button");
const message = document.getElementById("message");

registerButton.addEventListener("click", function ()
{
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const gender = document.querySelector('input[name="gender"]:checked');

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

    if (!gender)
    {
        message.textContent = "请选择性别";
        return;
    }

    const gendervalue = gender.value;
    const result = registerUser(username, password,gendervalue);

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
    clickNav("login.html");
});

homeButton.addEventListener("click", function ()
{
    clickNav("../index.html");
});
