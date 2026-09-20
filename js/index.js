const developersButton = document.getElementById("developers-button");
const registerButton = document.getElementById("register-button");
const loginButton = document.getElementById("login-button");


developersButton.addEventListener("click", function ()
{
    clickNav("html/group.html");
});

registerButton.addEventListener("click", function ()
{
    clickNav("html/register.html");
});

loginButton.addEventListener("click", function ()
{
    clickNav("html/login.html");
});