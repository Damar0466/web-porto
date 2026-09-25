const projects = [
  {
    meta: "roblox / game development",
    title: "Di Balik Meja Otopsi",
    description:
      "A psychological horror game about an autopsy doctor and the secrets hidden inside a quiet morgue.",
    stack: "Lua / Roblox Studio / Particles",
  },
  {
    meta: "web / development",
    title: "Zotaro Devs",
    description:
      "A web experience built to showcase digital projects, experiments, and things I've created.",
    stack: "HTML / CSS / JavaScript",
  },
  {
    meta: "experiment / solo",
    title: "Notif Scrap",
    description:
      "A Discord bot built to collect, organize, and present notifications in a cleaner format.",
    stack: "JavaScript / Discord API",
  },
];

const projectImages = [
  "https://tr.rbxcdn.com/180DAY-ffd99c11f58f704d345a4774aaa918d4/768/432/Image/Webp/noFilter",
  "https://cdn.phototourl.com/member/2026-09-25-3da2893e-1b8d-4363-bb9a-cf597bdce9ca.png",
  "https://cdn.phototourl.com/member/2026-09-25-ac487e08-9423-48f9-b389-ff9bf6a4d3d3.png",
];

const projectTabs = document.querySelectorAll(".project-tab");
const visuals = document.querySelectorAll(".project-visual");
const visualImages = document.querySelectorAll(".project-visual-image");
const projectMeta = document.querySelector("#project-meta");
const projectTitle = document.querySelector("#project-title");
const projectDescription = document.querySelector("#project-description");
const projectStack = document.querySelector("#project-stack");

visualImages.forEach((image, imageIndex) => {
  image.src = projectImages[imageIndex];
});

function selectProject(index) {
  const project = projects[index];
  projectTabs.forEach((tab, tabIndex) => {
    const isActive = tabIndex === index;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", isActive);
  });
  visuals.forEach((visual, visualIndex) => {
    visual.hidden = visualIndex !== index;
  });
  projectMeta.textContent = project.meta;
  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;
  projectStack.textContent = project.stack;
}

projectTabs.forEach((tab) =>
  tab.addEventListener("click", () =>
    selectProject(Number(tab.dataset.project)),
  ),
);

const commandDialog = document.querySelector("[data-command-dialog]");
const commandTrigger = document.querySelector("[data-command-trigger]");
const commandCloseButtons = document.querySelectorAll("[data-command-close]");

function setCommandMenu(open) {
  commandDialog.hidden = !open;
  document.body.style.overflow = open ? "hidden" : "";
  if (open) commandDialog.querySelector(".command-options a").focus();
}

commandTrigger.addEventListener("click", () => setCommandMenu(true));
commandCloseButtons.forEach((button) =>
  button.addEventListener("click", () => setCommandMenu(false)),
);
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    setCommandMenu(true);
  }
  if (event.key === "Escape" && !commandDialog.hidden) setCommandMenu(false);
  if (
    !commandDialog.hidden &&
    ["w", "n", "h"].includes(event.key.toLowerCase())
  ) {
    const targets = { w: "#work", n: "#notes", h: "#contact" };
    setCommandMenu(false);
    document
      .querySelector(targets[event.key.toLowerCase()])
      .scrollIntoView({ behavior: "smooth" });
  }
});
