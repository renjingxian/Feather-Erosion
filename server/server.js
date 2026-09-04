const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();

const PORT = 3000;


// =============================
// 数据库
// =============================

const databasePath = path.join(
    __dirname,
    "..",
    "database",
    "game.db"
);

const db = new Database(databasePath);


// 创建用户表
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();


// =============================
// Express 中间件
// =============================

// 读取 JSON
app.use(express.json());


// Session
app.use(
    session({
        secret: "feather-erosion-secret-key",

        resave: false,

        saveUninitialized: false,

        cookie: {
            httpOnly: true,

            maxAge:
                1000 * 60 * 60 * 24
        }
    })
);


// 提供前端网页
app.use(
    express.static(
        path.join(__dirname, "..", "public")
    )
);


// =============================
// 注册
// =============================

app.post(
    "/api/register",
    async function (req, res) {

        const username =
            req.body.username;

        const password =
            req.body.password;


        // 检查数据
        if (!username || !password) {

            return res.status(400).json({
                success: false,
                message: "用户名和密码不能为空"
            });

        }


        // 检查用户名是否存在
        const oldUser =
            db.prepare(
                "SELECT * FROM users WHERE username = ?"
            ).get(username);


        if (oldUser) {

            return res.status(409).json({
                success: false,
                message: "用户名已存在"
            });

        }


        // 密码哈希
        const passwordHash =
            await bcrypt.hash(password, 12);


        // 写入数据库
        db.prepare(`
            INSERT INTO users
            (username, password_hash)
            VALUES (?, ?)
        `).run(
            username,
            passwordHash
        );


        res.json({
            success: true,
            message: "注册成功"
        });

    }
);


// =============================
// 登录
// =============================

app.post(
    "/api/login",
    async function (req, res) {

        const username =
            req.body.username;

        const password =
            req.body.password;


        if (!username || !password) {

            return res.status(400).json({
                success: false,
                message: "请输入用户名和密码"
            });

        }


        // 查找用户
        const user =
            db.prepare(
                "SELECT * FROM users WHERE username = ?"
            ).get(username);


        if (!user) {

            return res.status(401).json({
                success: false,
                message: "用户名或密码错误"
            });

        }


        // 对比密码
        const passwordCorrect =
            await bcrypt.compare(
                password,
                user.password_hash
            );


        if (!passwordCorrect) {

            return res.status(401).json({
                success: false,
                message: "用户名或密码错误"
            });

        }


        // 保存登录状态
        req.session.userId =
            user.id;

        req.session.username =
            user.username;


        res.json({
            success: true,
            message: "登录成功"
        });

    }
);


// =============================
// 查询当前登录用户
// =============================

app.get(
    "/api/me",
    function (req, res) {

        if (!req.session.userId) {

            return res.status(401).json({
                success: false,
                message: "尚未登录"
            });

        }


        res.json({
            success: true,

            user: {
                id:
                    req.session.userId,

                username:
                    req.session.username
            }
        });

    }
);


// =============================
// 退出登录
// =============================

app.post(
    "/api/logout",
    function (req, res) {

        req.session.destroy(
            function (error) {

                if (error) {

                    return res.status(500).json({
                        success: false,
                        message: "退出登录失败"
                    });

                }


                res.json({
                    success: true,
                    message: "已经退出登录"
                });

            }
        );

    }
);


// =============================
// 启动服务器
// =============================

app.listen(
    PORT,
    function () {

        console.log(
            "羽蚀纪服务器已启动"
        );

        console.log(
            "http://localhost:" + PORT
        );

    }
);