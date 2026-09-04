const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const registerButton = document.getElementById("register-button");
const backButton = document.getElementById("back-button");
const message = document.getElementById("message");

registerButton.addEventListener("click",async function ()
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

    try
    {
        const response = await fetch(
                "/api/register",
                {
                    method: "POST",
                    headers:
                    {
                        "Content-Type":
                            "application/json"
                    },
                    body:
                        JSON.stringify
                        ({
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
            setTimeout(function ()
            {
                window.location.href = "../index.html";
            },2000);
        }
    }

    catch (error)
    {
        console.error(error);
        message.textContent = "无法连接服务器";
    }    
});

backButton.addEventListener("click", function ()
{
    window.location.href = "../index.html";
});