

document.addEventListener("DOMContentLoaded", () => {

  const menuButton = document.querySelector(".menu-toggle");

  const nav = document.querySelector(".nav-links");

  const themeButton = document.querySelector("#themeToggle");

  const yearElement = document.querySelector("#year");

  // Mobile navigation

  function closeMenu() {

    if (!menuButton || !nav) return;

    nav.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.setAttribute("aria-label", "Open navigation menu");

    menuButton.textContent = "☰";

  }

  if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

      const open = nav.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(open));

      menuButton.setAttribute(

        "aria-label",

        open ? "Close navigation menu" : "Open navigation menu"

      );

      menuButton.textContent = open ? "×" : "☰";

    });

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", closeMenu);

    });

    document.addEventListener("keydown", event => {

      if (event.key === "Escape") closeMenu();

    });

    document.addEventListener("click", event => {

      if (

        !nav.contains(event.target) &&

        !menuButton.contains(event.target)

      ) {

        closeMenu();

      }

    });

  }

  // Project filters

  const filterButtons = [

    ...document.querySelectorAll(".filter")

  ];

  const projectCards = [

    ...document.querySelectorAll(".project-card")

  ];

  filterButtons.forEach(button => {

    button.setAttribute(

      "aria-pressed",

      String(button.classList.contains("active"))

    );

    button.addEventListener("click", () => {

      filterButtons.forEach(item => {

        const active = item === button;

        item.classList.toggle("active", active);

        item.setAttribute("aria-pressed", String(active));

      });

      const filter = button.dataset.filter || "all";

      projectCards.forEach(card => {

        const categories = (

          card.dataset.category || ""

        ).split(/\s+/);

        const show =

          filter === "all" || categories.includes(filter);

        card.classList.toggle("hidden", !show);

      });

    });

  });

  // Light / dark theme

  if (themeButton) {

    themeButton.setAttribute("aria-pressed", "false");

    themeButton.addEventListener("click", () => {

      const light = document.body.classList.toggle("light");

      themeButton.setAttribute("aria-pressed", String(light));

      themeButton.setAttribute(

        "aria-label",

        light ? "Switch to dark theme" : "Switch to light theme"

      );

    });

  }

  // Current year

  if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

  }

  // Reveal animation with browser fallback

  const revealElements = document.querySelectorAll(

    ".reveal, .project-card"

  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));

  } else {

    revealElements.forEach(element => {

      element.classList.add("visible");

    });

  }

  // Active navigation while scrolling

  const sections = [

    ...document.querySelectorAll("main section[id]")

  ];

  const navLinks = [

    ...document.querySelectorAll(".nav-links a")

  ];

  function updateActiveSection() {

    let current = "home";

    sections.forEach(section => {

      if (window.scrollY >= section.offsetTop - 150) {

        current = section.id;

      }

    });

    navLinks.forEach(link => {

      const active =

        link.getAttribute("href") === `#${current}`;

      link.classList.toggle("active", active);

      if (active) {

        link.setAttribute("aria-current", "location");

      } else {

        link.removeAttribute("aria-current");

      }

    });

  }

  window.addEventListener("scroll", updateActiveSection, {

    passive: true

  });

  updateActiveSection();

});
