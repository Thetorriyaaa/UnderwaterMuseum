const startBtn = document.getElementById("startBtn");
const overlay = document.querySelector(".overlay");
const finalText = document.getElementById("finalText");

const counterBox = document.getElementById("artifactCounter");
const collectibles = document.querySelectorAll(".collectible");

let collected = 0;


function showCounter() {
    if (!counterBox) return;

    counterBox.textContent = `✨ ${collected} / ${collectibles.length} артефактов найдено`;
    counterBox.classList.add("show");

    clearTimeout(showCounter._t);
    showCounter._t = setTimeout(() => {
        counterBox.classList.remove("show");
    }, 2200);
}


function checkFinal() {
    if (!finalText) return;

    const done = collected === collectibles.length;

    if (done) {
        finalText.innerText = "🔥 Все артефакты собраны!";
        document.body.classList.add("all-found");
    } else {
        finalText.innerText = "Найди все артефакты";
        document.body.classList.remove("all-found");
    }
}


if (startBtn) {
    startBtn.addEventListener("click", () => {
        const first = document.getElementById("depth1");
        if (first) first.scrollIntoView({ behavior: "smooth" });
    });
}


collectibles.forEach((item) => {
    item.addEventListener("click", () => {
        if (item.classList.contains("found")) return;

        
        if (item.classList.contains("artifact-50") && !item.classList.contains("glow")) return;

        item.classList.add("found");
        collected += 1;

        showCounter();
        checkFinal();

        const infoId = item.dataset.info;
        if (!infoId) return;

        const info = document.getElementById(infoId);
        if (info) info.classList.add("show");
    });
});


function restart() {
    collected = 0;
    document.body.classList.remove("all-found");

   
    document.querySelectorAll(".collectible").forEach((item) => {
        item.classList.remove("found", "glow", "revealed");
        item.style.pointerEvents = "";
        item.style.opacity = "";
        item.style.transform = "";
        item.style.filter = "";
    });

   
    document.querySelectorAll("#ruins15 .column").forEach((col) => {
        col.classList.remove("cleared");
    });

    
    document.querySelectorAll(".artifact-info").forEach((box) => {
        box.classList.remove("show");
    });

    
    const box = document.getElementById("artifactCounter");
    if (box) {
        box.textContent = "";
        box.classList.remove("show");
    }

    
    const ft = document.getElementById("finalText");
    if (ft) ft.innerText = "Найди все артефакты";

    
    if (window.resetPuzzle25) window.resetPuzzle25();

    
    window.scrollTo({ top: 0, behavior: "smooth" });
}

window.restart = restart;


window.addEventListener(
    "scroll",
    () => {
        if (!overlay) return;

        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const depth = maxScroll > 0 ? window.scrollY / maxScroll : 0;

        overlay.style.opacity = depth * 0.7;
    },
    { passive: true }
);


window.addEventListener(
    "scroll",
    () => {
        const hero = document.getElementById("hero");
        if (!hero) return;
        hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    },
    { passive: true }
);


const depth4 = document.getElementById("depth4");
const light = document.querySelector("#depth4 .light");
const amphora = document.querySelector("#depth4 .artifact-50");

function isDepth4Visible() {
    if (!depth4) return false;
    const r = depth4.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
}

function handlePointer(x, y) {
    if (!light || !amphora) return;
    if (!isDepth4Visible()) return;

    light.style.left = x + "px";
    light.style.top = y + "px";

    const rect = amphora.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = cx - x;
    const dy = cy - y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 200) amphora.classList.add("glow");
    else amphora.classList.remove("glow");
}

window.addEventListener("mousemove", (e) => {
    handlePointer(e.clientX, e.clientY);
});

window.addEventListener(
    "touchmove",
    (e) => {
        if (!e.touches || !e.touches[0]) return;
        handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: true }
);


const heroBubbles = document.querySelector(".hero-bubbles");
if (heroBubbles && heroBubbles.children.length === 0) {
    for (let i = 0; i < 25; i++) {
        const bubble = document.createElement("span");
        bubble.style.left = Math.random() * 100 + "%";
        bubble.style.animationDuration = 4 + Math.random() * 6 + "s";
        bubble.style.animationDelay = Math.random() * 5 + "s";
        bubble.style.width = 4 + Math.random() * 6 + "px";
        bubble.style.height = bubble.style.width;
        heroBubbles.appendChild(bubble);
    }
}


const globalBubbles = document.querySelector(".global-bubbles");
if (globalBubbles && globalBubbles.children.length === 0) {
    for (let i = 0; i < 40; i++) {
        const bubble = document.createElement("span");
        bubble.style.left = Math.random() * 100 + "%";
        bubble.style.width = 3 + Math.random() * 7 + "px";
        bubble.style.height = bubble.style.width;
        bubble.style.animationDuration = 5 + Math.random() * 8 + "s";
        bubble.style.animationDelay = Math.random() * 5 + "s";
        globalBubbles.appendChild(bubble);
    }
}


if (depth4) {
    depth4.classList.add("is-active");

    const obs = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) depth4.classList.add("is-active");
                else depth4.classList.remove("is-active");
            });
        },
        { threshold: 0.35 }
    );

    obs.observe(depth4);
}


document.addEventListener("DOMContentLoaded", () => {
    const ruins = document.getElementById("ruins15");
    const mask = document.getElementById("mask15");
    if (!ruins) return;

    const columns = ruins.querySelectorAll(".column");
    const rightmost = ruins.querySelector(".column.rightmost");

    columns.forEach((col) => {
        col.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            col.classList.add("cleared");

            if (rightmost && col === rightmost && mask) {
                mask.classList.add("revealed");
            }
        });
    });
});


const depth2 = document.getElementById("depth2");
if (depth2) {
    const obs2 = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) depth2.classList.add("is-active");
            else depth2.classList.remove("is-active");
        });
    },
    { threshold: 0.35 }
);

obs2.observe(depth2);
}


(function () {
    const board = document.getElementById("puzzleBoard");
    if (!board) return;

    const pieces = Array.from(board.querySelectorAll(".puzzle-piece"));
    const slots = Array.from(board.querySelectorAll(".puzzle-slot"));
    const finalArtifact = document.getElementById("artifact25");

    const correct = new Map([
        ["0", "0"],
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
    ]);

    const snapped = new Map();

    function getSlotCenter(slotEl) {
        const r = slotEl.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }

    function snapToSlot(pieceEl, slotEl) {
        const br = board.getBoundingClientRect();
        const sr = slotEl.getBoundingClientRect();

        pieceEl.style.left = sr.left - br.left + "px";
        pieceEl.style.top = sr.top - br.top + "px";
        pieceEl.classList.remove("dragging");
    }

    function scatterPieces() {
        const br = board.getBoundingClientRect();

        pieces.forEach((p) => {
            p.style.left = Math.random() * (br.width * 0.5) + "px";
            p.style.top = Math.random() * (br.height * 0.5) + "px";
        });
    }

    function checkSolved() {
        if (snapped.size !== pieces.length) return false;

        for (const [pieceId, slotId] of snapped.entries()) {
            if (correct.get(pieceId) !== slotId) return false;
        }

        return true;
    }

    function revealFinal() {
        if (!finalArtifact) return;

        pieces.forEach((p) => {
            p.style.opacity = "0";
            p.style.pointerEvents = "none";
        });

        finalArtifact.classList.add("revealed");
    }

    let active = null;
    let offsetX = 0;
    let offsetY = 0;

    function onDown(e) {
        const piece = e.currentTarget;
        if (piece.classList.contains("locked")) return;

        active = piece;
        active.classList.add("dragging");

        const r = active.getBoundingClientRect();
        offsetX = e.clientX - r.left;
        offsetY = e.clientY - r.top;

        if (active.setPointerCapture) active.setPointerCapture(e.pointerId);
    }

    function onMove(e) {
        if (!active) return;

        const br = board.getBoundingClientRect();
        active.style.left = e.clientX - br.left - offsetX + "px";
        active.style.top = e.clientY - br.top - offsetY + "px";
    }

    function onUp(e) {
        if (!active) return;

        let bestSlot = null;
        let bestDist = Infinity;

        slots.forEach((s) => {
            const c = getSlotCenter(s);
            const dx = c.x - e.clientX;
            const dy = c.y - e.clientY;
            const d = Math.sqrt(dx * dx + dy * dy);

            if (d < bestDist) {
                bestDist = d;
                bestSlot = s;
            }
        });

        const SNAP_RADIUS = 120;

        if (bestSlot && bestDist < SNAP_RADIUS) {
            const pieceId = active.dataset.piece;
            const slotId = bestSlot.dataset.slot;

            snapToSlot(active, bestSlot);
            snapped.set(pieceId, slotId);

            active.classList.add("locked");
            active.style.pointerEvents = "none";
        } else {
            active.classList.remove("dragging");
        }

        active = null;

        if (checkSolved()) revealFinal();
    }

    pieces.forEach((p) => {
        p.addEventListener("pointerdown", onDown);
    });

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    scatterPieces();

    window.resetPuzzle25 = function () {
        snapped.clear();

        pieces.forEach((p) => {
            p.classList.remove("locked", "dragging");
            p.style.opacity = "1";
            p.style.pointerEvents = "auto";
        });

        if (finalArtifact) finalArtifact.classList.remove("revealed");
        scatterPieces();
    };
})();


(function () {
    const kelpLayer = document.querySelector(".kelp-layer");
    const kelps = document.querySelectorAll(".kelp");
    if (!kelpLayer || kelps.length === 0) return;

    let mx = 0;
    let my = 0;
    let targetMX = 0;
    let targetMY = 0;

    let deep = 0;
    let sway = 0;

    function updateDepth() {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        deep = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        deep = Math.min(1, Math.max(0, deep));
    }

    function onPointerMove(x, y) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        targetMX = x - cx;
        targetMY = y - cy;
    }

    window.addEventListener("mousemove", (e) => onPointerMove(e.clientX, e.clientY));
    window.addEventListener(
        "touchmove",
        (e) => {
            if (!e.touches || !e.touches[0]) return;
            onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
        },
        { passive: true }
    );

    window.addEventListener("scroll", updateDepth, { passive: true });
    updateDepth();

    function tick() {
        mx += (targetMX - mx) * 0.08;
        my += (targetMY - my) * 0.08;

        sway += ((mx / window.innerWidth) * 8 - sway) * 0.06;

        kelps.forEach((k, i) => {
            const side = k.classList.contains("kelp-right") ? -1 : 1;
            const factor = 1 + i * 0.08;

            k.style.setProperty("--mx", (mx * side * factor).toFixed(2) + "px");
            k.style.setProperty("--my", (my * factor).toFixed(2) + "px");
            k.style.setProperty("--deep", deep.toFixed(3));
            k.style.setProperty("--sway", (sway * side).toFixed(3));

            const opacity = 0.46 - deep * 0.2;
            const bright = 0.95 - deep * 0.55;
            const sat = 0.95 - deep * 0.55;
            const blur = 0.15 + deep * 0.35;

            k.style.opacity = String(Math.max(0.18, opacity));
            k.style.filter = `brightness(${bright}) saturate(${sat}) blur(${blur}px)`;
        });

        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
})();


(() => {
    const bg = document.querySelector(".bg-objects");
    if (!bg) return;

    const BG = {
        fishRight: "images/bg/fish-right.png",
        fishLeft: "images/bg/fish-left-small.png",
        sil15: "images/bg/statue-portrait.png",
        sil25: "images/bg/ruins-statue.png",    
        sil50: "images/bg/statue-arms.png",     
    };

    function rand(a, b) {
        return a + Math.random() * (b - a);
    }

    function clamp01(x) {
        return Math.min(1, Math.max(0, x));
    }

    function depth01() {
        const max = document.body.scrollHeight - window.innerHeight;
        return max > 0 ? clamp01(window.scrollY / max) : 0;
    }


    function spawnFish(direction) {
        const d = depth01();

        const el = document.createElement("img");
        el.className = "bg-obj";
        el.src = direction === "right" ? BG.fishRight : BG.fishLeft;

        const size = Math.round(60 + d * 160);
        el.style.width = size + "px";
        el.style.height = "auto";

        
        el.style.top = Math.round(rand(12, 70)) + "vh";

    
        if (direction === "right") {
            el.style.left = "-30vw";
        } else {
            el.style.left = "100vw";
        }

        el.style.opacity = (0.20 + d * 0.25).toFixed(2);
        el.style.filter = `blur(${(d * 2).toFixed(2)}px)`;

        
        const dur = Math.max(10, rand(16, 28) - d * 6);
        el.style.animation = `${direction === "right" ? "swimRight" : "swimLeft"} ${dur}s linear forwards`;

        bg.appendChild(el);
        setTimeout(() => el.remove(), (dur + 1) * 1000);
    }


    setInterval(() => {
        const d = depth01();
        const fishChance = d < 0.35 ? 0.8 : 0.45;

        if (Math.random() < fishChance) {
            spawnFish(Math.random() < 0.5 ? "right" : "left");
        }
    }, 1400);


    function makeSilhouette(src, extraClass = "") {
        const el = document.createElement("img");
        el.src = src;
        el.className = "bg-statue" + (extraClass ? " " + extraClass : "");
        document.body.appendChild(el);
        return el;
    }

    const sil15 = makeSilhouette(BG.sil15);          
    const sil25 = makeSilhouette(BG.sil25, "bg-ruins"); 
    const sil50 = makeSilhouette(BG.sil50);          

    function isSectionVisible(id, pad = 0.38) {
        const sec = document.getElementById(id);
        if (!sec) return false;

        const r = sec.getBoundingClientRect();
        const h = window.innerHeight;

        return r.top < h * (1 - pad) && r.bottom > h * pad;
    }

    function updateSilhouettes() {
      
        if (isSectionVisible("depth2", 0.38)) sil15.classList.add("show");
        else sil15.classList.remove("show");

      
        if (isSectionVisible("depth3", 0.38)) sil25.classList.add("show");
        else sil25.classList.remove("show");

        
        if (isSectionVisible("depth4", 0.38)) sil50.classList.add("show", "deep");
        else sil50.classList.remove("show", "deep");
    }

    window.addEventListener("scroll", updateSilhouettes, { passive: true });
    window.addEventListener("resize", updateSilhouettes);
    updateSilhouettes();
})();