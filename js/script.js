// ////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getUTCFullYear();
yearEl.textContent = currentYear;

// ////////////////////////////////////////
// Make mobile navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const sectionHeroEl = document.querySelector(".section-hero");
const mainNavListEl = document.querySelector(".main-nav-list");
let isMenuOpen = false;

// Congelar scroll
let scrollY;

function lockScroll() {
    // Guardamos la posición actual
    scrollY = window.scrollY;

    // Congelamos el body
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden"; // extra seguridad
}

function unlockScroll(options = { goTo: false }) {
    // Turn off scroll behavior
    document.documentElement.style.scrollBehavior = "auto";

    // Restauramos estilos
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.overflow = "";

    // Volvemos al punto donde estaba el usuario
    if (!options.goTo) {
        window.scrollTo(0, scrollY);
    } else {
        const rect = options.element.getBoundingClientRect();
        const moveToCoord = rect.top + scrollY;

        window.scrollTo(0, scrollY);
        document.documentElement.style.scrollBehavior = "smooth";
        window.scrollTo(0, moveToCoord);
    }

    // Turn on scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
}

btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
    isMenuOpen = !isMenuOpen;
    isMenuOpen ? lockScroll() : unlockScroll();
});

mainNavListEl.addEventListener("click", function (e) {
    if (!e.target.href) return;
    headerEl.classList.remove("nav-open");
    const id = e.target.getAttribute("href");
    const sectionEl = document.querySelector(id);

    isMenuOpen = !isMenuOpen;
    unlockScroll({ goTo: true, element: sectionEl });
});

const obs = new IntersectionObserver(
    function (entries) {
        const ent = entries[0];

        if (!ent.isIntersecting) {
            document.body.classList.add("sticky");
            sectionHeroEl.style.paddingTop = "14.4rem";
        } else {
            document.body.classList.remove("sticky");
            sectionHeroEl.style.paddingTop = "4.8rem";
        }
    },
    {
        root: null,
        threshold: 0,
        rootMargin: "-96px",
    }
);

obs.observe(sectionHeroEl);
