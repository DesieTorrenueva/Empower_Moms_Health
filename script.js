const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
const content = document.getElementById("content");

const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
const submenus = document.querySelectorAll(".submenu");
const mainLinks = document.querySelectorAll("nav > a[data-section]");
const subsectionLinks = document.querySelectorAll(".submenu a");

let menuOpen = false;

/* ===============================
   MENU TOGGLE
=============================== */
menuBtn.addEventListener("click", () => {
  menuOpen = !menuOpen;
  menu.classList.toggle("show", menuOpen);
  menuBtn.textContent = menuOpen ? "✕" : "☰";
});

/* ===============================
   CLOSE MENU WHEN CLICKING CONTENT
=============================== */
content.addEventListener("click", () => {
  if (menuOpen) {
    closeMenu();
  }
});

/* ===============================
   DROPDOWN TOGGLES (MULTIPLE)
=============================== */
dropdownToggles.forEach((toggle, index) => {
  const caret = toggle.querySelector(".caret");
  const submenu = submenus[index];

  // Caret click → open/close submenu
  caret.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = submenu.style.display === "block";
    submenu.style.display = isOpen ? "none" : "block";
    toggle.classList.toggle("open", !isOpen);
  });

  // Main title click → load main section
  toggle.addEventListener("click", () => {
    loadMainSection(toggle.dataset.section, toggle);
  });
});

/* ===============================
   LOAD MAIN SECTIONS
=============================== */
mainLinks.forEach(link => {
  link.addEventListener("click", () => {
    loadMainSection(link.dataset.section, link);
  });
});

/* ===============================
   LOAD SUBSECTIONS
=============================== */
subsectionLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.stopPropagation();

    fetch(`${link.dataset.subsection}.html`)
      .then(res => res.text())
      .then(data => {
        content.innerHTML = data;
        setActiveSubsection(link);
        closeMenu();
        content.scrollTop = 0;
      })
      .catch(() => {
        content.innerHTML = "<p>Content not available.</p>";
      });
  });
});

/* ===============================
   MAIN CONTENT LOADER
=============================== */
function loadMainSection(section, activeLink) {
  fetch(`sections/${section}.html`)
    .then(res => res.text())
    .then(data => {
      content.innerHTML = data;
      setActiveMain(activeLink);
      closeMenu();
      content.scrollTop = 0;
    })
    .catch(() => {
      content.innerHTML = "<p>Content not available.</p>";
    });
}

/* ===============================
   ACTIVE STATES
=============================== */
function setActiveMain(activeLink) {
  mainLinks.forEach(l => l.classList.remove("active"));
  subsectionLinks.forEach(l => l.classList.remove("active"));
  dropdownToggles.forEach(l => l.classList.remove("active"));

  activeLink.classList.add("active");
}

function setActiveSubsection(activeLink) {
  subsectionLinks.forEach(l => l.classList.remove("active"));
  mainLinks.forEach(l => l.classList.remove("active"));
  dropdownToggles.forEach(l => l.classList.remove("active"));

  activeLink.classList.add("active");
  activeLink.closest(".submenu").previousElementSibling.classList.add("active");
}

/* ===============================
   CLOSE MENU
=============================== */
function closeMenu() {
  menuOpen = false;
  menu.classList.remove("show");
  menuBtn.textContent = "☰";
}

/* ===============================
   DEFAULT LOAD
=============================== */
loadMainSection("care", dropdownToggles[0]);