const projects = [
    {
        title: "Project 1",
        logo: "assets/logos/project-1.svg",
        accent: "#8aa0b8",
        accentSoft: "rgba(138, 160, 184, 0.18)",
        stageTint: "rgba(90, 120, 150, 0.12)",
        frames: [
            ["assets/projects/p1-0.svg", "assets/projects/p1-1.svg", "assets/projects/p1-2.svg", "assets/projects/p1-3.svg"],
            ["assets/projects/p1-4.svg", "assets/projects/p1-5.svg", "assets/projects/p1-6.svg", "assets/projects/p1-7.svg"],
        ],
    },
    {
        title: "Project 2",
        logo: "assets/logos/project-2.svg",
        accent: "#d4a574",
        accentSoft: "rgba(212, 165, 116, 0.2)",
        stageTint: "rgba(180, 120, 60, 0.14)",
        frames: [
            ["assets/projects/p2-0.svg", "assets/projects/p2-1.svg", "assets/projects/p2-2.svg", "assets/projects/p2-3.svg"],
            ["assets/projects/p2-4.svg", "assets/projects/p2-5.svg", "assets/projects/p2-6.svg", "assets/projects/p2-7.svg"],
        ],
    },
    {
        title: "Project 3",
        logo: "assets/logos/project-3.svg",
        accent: "#7ea89a",
        accentSoft: "rgba(126, 168, 154, 0.2)",
        stageTint: "rgba(80, 140, 120, 0.12)",
        frames: [
            ["assets/projects/p3-0.svg", "assets/projects/p3-1.svg", "assets/projects/p3-2.svg", "assets/projects/p3-3.svg"],
            ["assets/projects/p3-4.svg", "assets/projects/p3-5.svg", "assets/projects/p3-6.svg", "assets/projects/p3-7.svg"],
        ],
    },
];

const root = document.documentElement;
const slotImages = [...document.querySelectorAll("[data-slot]")];
const logoEl = document.getElementById("project-logo");
const logoWrap = document.querySelector(".stage__logo");
const buttons = [...document.querySelectorAll(".project-btn")];
const yearEl = document.getElementById("year");
const nameLink = document.getElementById("name-link");
const preview = document.getElementById("about-preview");

let activeIndex = 0;
let frameIndex = 0;
let cycleTimer;

function applyTheme(project) {
    root.style.setProperty("--accent", project.accent);
    root.style.setProperty("--accent-soft", project.accentSoft);
    root.style.setProperty("--stage-tint", project.stageTint);
}

function setFrame(project, nextFrame, { fade } = { fade: false }) {
    const sources = project.frames[nextFrame];
    slotImages.forEach((img, i) => {
        const apply = () => {
            img.src = sources[i];
            img.alt = `${project.title} still ${i + 1}`;
            img.parentElement.classList.remove("is-fading");
        };
        if (!fade) {
            apply();
            return;
        }
        img.parentElement.classList.add("is-fading");
        window.setTimeout(apply, 320);
    });
}

function setLogo(project) {
    if (!logoEl || !logoWrap) return;
    logoWrap.classList.add("is-swapping");
    window.setTimeout(() => {
        logoEl.src = project.logo;
        logoEl.alt = project.title;
        logoWrap.classList.remove("is-swapping");
    }, 220);
}

function startCycle() {
    window.clearInterval(cycleTimer);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    cycleTimer = window.setInterval(() => {
        const project = projects[activeIndex];
        frameIndex = (frameIndex + 1) % project.frames.length;
        setFrame(project, frameIndex, { fade: true });
    }, 4200);
}

let hasPainted = false;

function selectProject(index) {
    window.clearInterval(cycleTimer);
    activeIndex = index;
    frameIndex = 0;
    const project = projects[index];
    applyTheme(project);
    setLogo(project);
    setFrame(project, 0, { fade: hasPainted });
    hasPainted = true;
    buttons.forEach((btn, i) => {
        const on = i === index;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-selected", String(on));
    });
    startCycle();
}

if (yearEl) yearEl.textContent = String(new Date().getFullYear());

if (buttons.length) {
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            selectProject(Number(btn.dataset.project));
        });
    });
    selectProject(0);
}

if (nameLink && preview) {
    nameLink.setAttribute("aria-describedby", "about-preview");
    nameLink.addEventListener("focus", () => preview.classList.add("is-open"));
    nameLink.addEventListener("blur", () => preview.classList.remove("is-open"));
}
