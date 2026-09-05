const developersButton = document.getElementById("developers-button");
const registerButton = document.getElementById("register-button");
const loginButton = document.getElementById("login-button");


developersButton.addEventListener("click", function ()
{
    window.location.href = "group.html";
});

registerButton.addEventListener("click", function ()
{
    window.location.href = "register.html";
});

loginButton.addEventListener("click", function ()
{
    window.location.href = "login.html";
});