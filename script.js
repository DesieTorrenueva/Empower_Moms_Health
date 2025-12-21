const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
const content = document.getElementById("content");
const links = document.querySelectorAll("#menu a");

let open = false;

menuBtn.addEventListener("click", () => {
  open = !open;
  menu.classList.toggle("show");
  menuBtn.textContent = open ? "✕" : "☰";
});

function loadSection(section) {
  fetch(`sections/${section}.html`)
    .then(res => res.text())
    .then(data => {
      content.innerHTML = data;
      setActive(section);
      closeMenu();
      content.scrollTop = 0;
    });
}

function setActive(section) {
  links.forEach(link => {
    link.classList.toggle("active", link.dataset.section === section);
  });
}

function closeMenu() {
  open = false;
  menu.classList.remove("show");
  menuBtn.textContent = "☰";
}

links.forEach(link => {
  link.addEventListener("click", () => {
    loadSection(link.dataset.section);
  });
});

// Default section
loadSection("care");