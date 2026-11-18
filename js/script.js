"use strict";

const header = document.querySelector(".header");
const hero = document.querySelector(".hero");
const headerToggle = document.querySelector(".header__toggle");
const headerNav = document.querySelector(".header__nav");
const mobileLayout = window.matchMedia("(width <= 59em)");
const background = document.querySelectorAll(
    ".skip-link, .header__brand, main, footer",
);

let heroObserver;

function observeHero() {
    heroObserver?.disconnect();

    if (!mobileLayout.matches) {
        header.classList.remove("header--sticky");
        return;
    }

    const headerHeight = header.getBoundingClientRect().height;
    heroObserver = new IntersectionObserver(
        ([entry]) => {
            header.classList.toggle(
                "header--sticky",
                mobileLayout.matches &&
                    !entry.isIntersecting &&
                    entry.boundingClientRect.bottom <= headerHeight,
            );
        },
        { rootMargin: `-${headerHeight}px 0px 0px 0px` },
    );
    heroObserver.observe(hero);
}

observeHero();

function setMenuOpen(isOpen) {
    headerToggle.setAttribute("aria-expanded", String(isOpen));
    headerToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation",
    );
    headerNav.inert = mobileLayout.matches && !isOpen;

    background.forEach((element) => {
        element.inert = isOpen;
    });
}

headerNav.inert = mobileLayout.matches;

headerToggle.addEventListener("click", () => {
    const isOpen = headerToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
});

headerNav.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');

    if (
        !link ||
        headerToggle.getAttribute("aria-expanded") !== "true" ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
    ) {
        return;
    }

    setMenuOpen(false);
    document.getElementById(link.hash.slice(1))?.focus({ preventScroll: true });
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
    observeHero();

    if (!event.matches && headerToggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        document.querySelector(".header__brand").focus();
    } else {
        const navHadFocus = headerNav.contains(document.activeElement);
        headerNav.inert = event.matches;

        if (event.matches && navHadFocus) headerToggle.focus();
    }
});

const signupForm = document.querySelector(".cta__form");
const signupStatus = document.querySelector(".cta__status");

signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    signupStatus.textContent =
        "Online sign-up is not available yet. Your details were not sent.";
});

signupForm.querySelector(".cta__submit").disabled = false;

document.querySelector(".footer__year").textContent = new Date().getFullYear();
