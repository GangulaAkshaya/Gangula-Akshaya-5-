
// ===================================
// GANGULA AKSHAYA PORTFOLIO
// JavaScript Interactions
// ===================================


// 1. SIDEBAR STAGGERED ANIMATION

const headings = document.querySelectorAll(".sidebar-nav a");

// Change this value to control the delay between headings.
// 150 = faster animation
// 250 = medium animation
// 400 = slower animation

const entryDelay = 180;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

headings.forEach((heading, index) => {

    // index * entryDelay controls the starting time
    // of each heading's fade-in and slide-up animation.
    //
    // Heading 1 = 0ms
    // Heading 2 = 180ms
    // Heading 3 = 360ms
    // Heading 4 = 540ms
    // Heading 5 = 720ms
    // Heading 6 = 900ms

    if (reducedMotion) {
        heading.classList.add("show");
        return;
    }

    setTimeout(() => {
        heading.classList.add("show");
    }, index * entryDelay);

});


// 2. ACTIVE SIDEBAR LINK

const sections = document.querySelectorAll(".section");

const navLinks = document.querySelectorAll(".sidebar-nav a");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            navLinks.forEach(link => {

                const isActive =
                    link.getAttribute("href") ===
                    "#" + entry.target.id;

                link.classList.toggle("active", isActive);

            });

        }

    });

}, {
    threshold: 0.25
});

sections.forEach(section => {
    observer.observe(section);
});


// 3. DARK / LIGHT THEME TOGGLE

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const lightMode =
        document.body.classList.contains("light-theme");

    themeToggle.textContent = lightMode ? "☾" : "☀";

    themeToggle.setAttribute(
        "aria-label",
        lightMode ? "Switch to dark theme" : "Switch to light theme"
    );

    // Remember the selected theme on this device.
    try {
        localStorage.setItem(
            "portfolio-theme",
            lightMode ? "light" : "dark"
        );
    } catch (error) {
        // Theme still works if browser storage is unavailable.
    }

});


// Restore previously selected theme

try {

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeToggle.textContent = "☾";
        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark theme"
        );
    }

} catch (error) {
    // Continue with the default dark theme.
}


// 4. CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    formStatus.textContent =
        "Your details are valid, but this form is not connected to a backend or form service. Configure a submission service before sending messages.";

});


// 5. CURRENT YEAR IN FOOTER

const footer = document.querySelector("footer");

if (footer) {
    footer.innerHTML = footer.innerHTML.replace(
        "2026",
        new Date().getFullYear()
    );
}
