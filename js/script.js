"use strict";

const headerToggle = document.querySelector(".header__toggle");
const mobileLayout = window.matchMedia("(width <= 59em)");
const background = document.querySelectorAll(
    ".skip-link, .header__brand, main, footer",
);

function setMenuOpen(isOpen) {
    headerToggle.setAttribute("aria-expanded", String(isOpen));
    headerToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation",
    );

    background.forEach((element) => {
        element.inert = isOpen;
    });
}

headerToggle.addEventListener("click", () => {
    const isOpen = headerToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
});

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        headerToggle.getAttribute("aria-expanded") === "true"
    ) {
        setMenuOpen(false);
        headerToggle.focus();
    }
});

mobileLayout.addEventListener("change", (event) => {
    if (!event.matches && headerToggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        document.querySelector(".header__brand").focus();
    }
});
