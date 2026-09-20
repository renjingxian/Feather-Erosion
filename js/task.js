/*任务系统*/
(function () {
    "use strict";
    function readCurrentUser() {
        try { return localStorage.getItem("feather_erosion_current_user") || null; }
        catch (e) { return null; }
    }

    function storageFor(user) {
        return (!user || user === "guest") ? sessionStorage : localStorage;
    }

    function readSave() {
        try {
            const user = readCurrentUser();
            if (user) {
                const raw = localStorage.getItem("feather_erosion_saves");
                if (!raw) return null;
                const saves = JSON.parse(raw);
                return (saves && saves[user]) || null;
            }
            const raw = sessionStorage.getItem("feather_erosion_guest_save");
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    }

    function readFlags(mode) {
        try {
            const user = readCurrentUser() || "guest";
            const key = "feather_erosion_" + mode + "_flags_" + user;
            const raw = storageFor(user).getItem(key);
            if (!raw) return {};
            const d = JSON.parse(raw);
            return (d && typeof d === "object" && !Array.isArray(d)) ? d : {};
        } catch (e) { return {}; }
    }

    const MAIN_OBJECTIVES = {
        sky: [
            { title: "第一章 选择之地", desc: "在天空之城安顿下来，结识赛琳。" },
            { title: "第二章 灰烬与根", desc: "潜入审判穹顶，查明风脉之心的异变。" },
            { title: "第三章 风雨欲来", desc: "争取长老会与赛琳的信任，应对审判危机。" },
            { title: "第四章 新天新地", desc: "做出最终抉择，决定天空之城的命运。" }
        ],
        empire: [
            { title: "第一章 钢铁与齿轮", desc: "找到奥德里克，在帝国城邦立足。" },
            { title: "第二章 齿轮之下", desc: "前往蒸汽议会厅，阻止议案通过。" },
            { title: "第三章 残响", desc: "争取科研派与商业派的同盟。" },
            { title: "第四章 铁与火的尽头", desc: "在铁与火的尽头做出最终抉择。" }
        ],
        forest: [
            { title: "第一章 黑根之女", desc: "查明黑根与祭品的真相。" },
            { title: "第二章 腐根之心", desc: "深入根脉深处，封堵根脉裂隙。" },
            { title: "第三章 根与誓", desc: "立下根脉之誓，取得女王的信任。" },
            { title: "第四章 古树之下", desc: "在古树之下完成最终献祭抉择。" }
        ],
        under: [
            { title: "第一章 地底交易", desc: "前往地下古堡找到格里姆。" },
            { title: "第二章 熔岩之心", desc: "在灰烬实验室与大公宫殿间求生。" },
            { title: "第三章 灰烬之子", desc: "救出莉亚，做出灰烬之誓的抉择。" },
            { title: "第四章 灰烬之下", desc: "在灰烬之下做出最后的决定。" }
        ]
    };

    // 支线任务：
    const SIDE_TASKS = [
        { title: "科研派的任务", desc: "说服科研派领袖。", mode: "empire", status: "科研派的任务", doneFlag: "scienceAlliance" },
        { title: "商业派的任务", desc: "清理污染隔离区的私人仓库。", mode: "empire", status: "商业派的任务", doneFlag: "businessSupport" },
        { title: "救出莉亚", desc: "把莉亚从矿道深处带回来。", mode: "under", doneFlag: "liaRescued", fromChapter: 3 },
        { title: "她听过自己的名字", desc: "在精灵之森让艾拉瑞亚记住你的名字。", mode: "*", doneFlag: "dongElarriaDone" }
    ];

    const MOSS_TASK = { title: "采集苔藓", desc: "在古树根系与腐根沼泽采集野生苔藓。", threshold: 3 };

    function freedomDayOf(node, flags) {
        const m = /^(?:freedom|mainmap_)([123])$/.exec(node || "");
        if (m) return Number(m[1]);
        return Number(flags && flags.freedomDay ? flags.freedomDay : 1);
    }

    //返回当前进度
    function computeState(save, flags) {
        const mode = save && save.story;
        const finished = save && save.finished === true;
        const node = (save && save.node) || "";

        if (!mode || !MAIN_OBJECTIVES[mode]) {
            return { mode: null, doneUpTo: 0, activeChapter: 0, chapterReached: 0, finished: false, inFreedom: false };
        }

        let doneUpTo = 0;
        let activeChapter = 0;
        let inFreedom = false;

        if (finished || /^ending/.test(node) || /^final/.test(node) || /ember_epilogue/.test(node)) {
            doneUpTo = 4;
        } else if (/^start$/.test(node) || /^chapter1/.test(node)) {
            activeChapter = 1;
        } else if (/^chapter2/.test(node)) {
            activeChapter = 2; doneUpTo = 1;
        } else if (/^chapter3/.test(node)) {
            activeChapter = 3; doneUpTo = 2;
        } else if (/^chapter4/.test(node)) {
            activeChapter = 4; doneUpTo = 3;
        } else {
            inFreedom = true;
            doneUpTo = freedomDayOf(node, flags);
        }

        const chapterReached = activeChapter > 0 ? activeChapter : doneUpTo;
        return { mode: mode, doneUpTo: doneUpTo, activeChapter: activeChapter, chapterReached: chapterReached, finished: finished, inFreedom: inFreedom };
    }

    function computeMainTasks(state, flags) {
        if (!state.mode) return [];
        const revealed = (flags && flags.taskRevealed) || {};
        return MAIN_OBJECTIVES[state.mode].map(function (obj, i) {
            const n = i + 1;
            let s = "locked";
            if (n <= state.doneUpTo) s = "done";
            else if (n === state.doneUpTo + 1 && revealed["ch" + n]) s = "active";
            return { title: obj.title, desc: obj.desc, state: s };
        });
    }

    function computeSideTasks(state, flags) {
        const active = [];
        const done = [];
        const statuses = Array.isArray(flags.statuses) ? flags.statuses : [];

        SIDE_TASKS.forEach(function (t) {
            if (t.mode !== "*" && t.mode !== state.mode) return;
            if (t.doneFlag && flags[t.doneFlag]) {
                done.push({ title: t.title, desc: t.desc });
            } else if (t.status && statuses.indexOf(t.status) !== -1) {
                active.push({ title: t.title, desc: t.desc });
            } else if (t.fromChapter && state.chapterReached >= t.fromChapter) {
                active.push({ title: t.title, desc: t.desc });
            }
        });

        const inv = flags.inventory || {};
        const moss = Number(inv.wildMoss || 0);
        if (moss >= MOSS_TASK.threshold) {
            done.push({ title: MOSS_TASK.title, desc: MOSS_TASK.desc });
        } else if (moss > 0) {
            active.push({ title: MOSS_TASK.title, desc: MOSS_TASK.desc });
        }

        return { active: active, done: done };
    }

    /*渲染*/

    function esc(s) {
        return String(s == null ? "" : s)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    function itemHtml(t, state) {
        const icon = state === "done" ? "✓" : "◆";
        return '<div class="task-item ' + state + '">' +
            '<span class="task-item-icon">' + icon + '</span>' +
            '<div class="task-item-text">' +
            '<div class="task-item-title">' + esc(t.title) + '</div>' +
            (t.desc ? '<div class="task-item-desc">' + esc(t.desc) + '</div>' : '') +
            '</div></div>';
    }

    function render() {
        const body = document.getElementById("taskPanelBody");
        if (!body) return;

        const save = readSave();
        const mode = save ? save.story : null;

        if (!mode || !MAIN_OBJECTIVES[mode]) {
            body.innerHTML = '<div class="task-empty">尚未开始旅程，先去主菜单开启一局吧。</div>';
            return;
        }

        const flags = readFlags(mode);
        const state = computeState(save, flags);
        const main = computeMainTasks(state, flags);
        const side = computeSideTasks(state, flags);

        const activeMain = main.filter(function (i) { return i.state === "active"; });
        const doneMain = main.filter(function (i) { return i.state === "done"; });

        const activeList = [];
        if (state.inFreedom) {
            activeList.push({ title: "自由行动", desc: "前往各地图地点行动，或前往主线入口继续。" });
        }
        activeMain.forEach(function (t) { activeList.push(t); });
        side.active.forEach(function (t) { activeList.push(t); });

        const doneList = doneMain.concat(side.done);

        let html = "";
        html += '<div class="task-section-title">进行中</div>';
        if (activeList.length) {
            activeList.forEach(function (t) { html += itemHtml(t, "active"); });
        } else {
            html += '<div class="task-empty">暂无进行中的任务。</div>';
        }

        html += '<div class="task-section-title">已完成</div>';
        if (doneList.length) {
            doneList.forEach(function (t) { html += itemHtml(t, "done"); });
        } else {
            html += '<div class="task-empty">暂无已完成的任务。</div>';
        }

        body.innerHTML = html;
    }

    /*注入UI与交互*/
    const SVG_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
        '<rect x="5" y="3.5" width="14" height="18" rx="2"/>' +
        '<path d="M9 2.5a2 2 0 0 1 2-1h2a2 2 0 0 1 2 1"/>' +
        '<path d="M9 9.5h6M9 13h6M9 16.5h3.5"/></svg>';

    function init() {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "../css/task.css";
        document.head.appendChild(link);

        const btn = document.createElement("div");
        btn.className = "task-mini";
        btn.id = "taskMini";
        btn.innerHTML = SVG_ICON + '<div class="task-tip">任务</div>';
        document.body.appendChild(btn);

        const panel = document.createElement("div");
        panel.className = "task-panel";
        panel.id = "taskPanel";
        panel.hidden = true;
        panel.innerHTML =
            '<div class="task-panel-header">' +
            '<span class="task-panel-title">任务</span>' +
            '<button class="task-panel-close" id="taskPanelClose" type="button" aria-label="关闭">×</button>' +
            '</div>' +
            '<div class="task-panel-body" id="taskPanelBody"></div>';
        document.body.appendChild(panel);

        const ach = document.querySelector(".achievement-mini, .btn-ach");
        let top = 260;
        if (ach) {
            const r = ach.getBoundingClientRect();
            top = r.top + r.height + 12;
        }
        btn.style.top = top + "px";
        panel.style.top = top + "px";

        const closeBtn = document.getElementById("taskPanelClose");
        let open = false;

        function openPanel() { render(); panel.hidden = false; open = true; }
        function closePanel() { panel.hidden = true; open = false; }

        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (open) closePanel(); else openPanel();
        });
        panel.addEventListener("click", function (e) { e.stopPropagation(); });
        closeBtn.addEventListener("click", function (e) { e.stopPropagation(); closePanel(); });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closePanel();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
