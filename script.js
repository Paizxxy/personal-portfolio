const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}));
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && !card.dataset.category.split(" ").includes(filter));
    });
  });
});
document.querySelector("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
});
document.querySelector("#year").textContent = new Date().getFullYear();
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal, .project-card").forEach(el => observer.observe(el));
const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-links a")];
window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
}, {passive:true});