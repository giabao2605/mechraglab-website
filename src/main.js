const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#nav-links");
if (menuButton && navigation) {
  const closeNavigation = () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };
  menuButton.addEventListener("click", () => {
    const opening = menuButton.getAttribute("aria-expanded") !== "true";
    navigation.classList.toggle("is-open", opening);
    menuButton.setAttribute("aria-expanded", String(opening));
    menuButton.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
  });
  for (const link of navigation.querySelectorAll("a")) link.addEventListener("click", closeNavigation);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeNavigation();
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeNavigation();
  });
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 811px)").matches) closeNavigation();
  });
}
const year = document.querySelector("#copyright-year");
if (year) year.textContent = String(new Date().getFullYear());
