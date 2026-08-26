/* =========================================================
   WEBFORGE STUDIO
   SCRIPT.JS
   PART 1 OF 9

   Corresponds directly with:
   - index.html
   - style.css
========================================================= */


/* =========================================================
   DOM REFERENCES
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");

const contactForm =
    document.getElementById("contactForm");

const selectedPackage =
    document.getElementById("selectedPackage");

const contactMessageStatus =
    document.getElementById("contactMessageStatus");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuToggle && mainNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mainNav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );

}


/* =========================================================
   CLOSE MOBILE NAVIGATION
   WHEN A NAVIGATION LINK IS SELECTED
========================================================= */

if (mainNav) {

    const navigationLinks =
        mainNav.querySelectorAll("a");

    navigationLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove(
                        "active"
                    );

                    if (menuToggle) {

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   PACKAGE BUTTONS
========================================================= */

const packageButtons =
    document.querySelectorAll(
        ".package-btn"
    );


packageButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const packageName =
                    button.dataset.selectedPackage;

                if (
                    packageName &&
                    selectedPackage
                ) {

                    selectedPackage.value =
                        packageName;

                }

            }
        );

    }
);


/* =========================================================
   CONTACT FORM VALIDATION
========================================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "contactName"
                );

            const email =
                document.getElementById(
                    "contactEmail"
                );

            const phone =
                document.getElementById(
                    "contactPhone"
                );

            const message =
                document.getElementById(
                    "contactMessage"
                );


            if (!name || !email || !message) {
                return;
            }


            const nameValue =
                name.value.trim();

            const emailValue =
                email.value.trim();

            const phoneValue =
                phone
                    ? phone.value.trim()
                    : "";

            const messageValue =
                message.value.trim();


            if (
                !nameValue ||
                !emailValue ||
                !messageValue
            ) {

                if (contactMessageStatus) {

                    contactMessageStatus.textContent =
                        "Please complete the required fields.";

                }

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(emailValue)
            ) {

                if (contactMessageStatus) {

                    contactMessageStatus.textContent =
                        "Please enter a valid email address.";

                }

                email.focus();

                return;

            }


            if (contactMessageStatus) {

                contactMessageStatus.textContent =
                    "Your enquiry is ready to be sent.";

            }


            /*
             * The form data is prepared here.
             * No external service is assumed.
             */

            const enquiryData = {

                name: nameValue,

                email: emailValue,

                phone: phoneValue,

                package:
                    selectedPackage
                        ? selectedPackage.value
                        : "",

                message: messageValue

            };


            console.log(
                "WebForge Studio enquiry:",
                enquiryData
            );

        }
    );

}
/* =========================================================
   PACKAGE SELECTION
========================================================= */

if (selectedPackage) {

    selectedPackage.addEventListener(
        "change",
        () => {

            const selectedValue =
                selectedPackage.value;

            if (
                contactMessageStatus &&
                selectedValue
            ) {

                contactMessageStatus.textContent =
                    `Selected package: ${selectedValue}`;

            }

        }
    );

}


/* =========================================================
   PACKAGE BUTTON → CONTACT FORM
========================================================= */

packageButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const packageName =
                    button.dataset.selectedPackage;

                if (
                    !packageName ||
                    !selectedPackage
                ) {
                    return;
                }


                selectedPackage.value =
                    packageName;


                /*
                 * Allow the browser to move to
                 * the Contact section after the
                 * package has been selected.
                 */

                const contactSection =
                    document.getElementById(
                        "contact"
                    );


                if (contactSection) {

                    setTimeout(
                        () => {

                            const form =
                                document.getElementById(
                                    "contactForm"
                                );

                            if (form) {

                                form.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });

                            }

                        },
                        100
                    );

                }

            }
        );

    }
);
/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

const allNavigationLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


allNavigationLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const targetSection =
                    document.querySelector(
                        targetId
                    );


                if (!targetSection) {
                    return;
                }


                event.preventDefault();


                const navbar =
                    document.querySelector(
                        ".navbar"
                    );


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    targetSection.getBoundingClientRect()
                        .top
                    +
                    window.pageYOffset
                    -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });


                /*
                 * Close the mobile menu
                 * after navigation.
                 */

                if (mainNav) {

                    mainNav.classList.remove(
                        "active"
                    );

                }


                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }
);
/* =========================================================
   ACTIVE NAVIGATION STATE
========================================================= */

const pageSections =
    document.querySelectorAll(
        "main section[id]"
    );

const navigationItems =
    document.querySelectorAll(
        '#mainNav a[href^="#"]'
    );


const updateActiveNavigation =
    () => {

        const scrollPosition =
            window.scrollY;

        const navbar =
            document.querySelector(
                ".navbar"
            );

        const navbarHeight =
            navbar
                ? navbar.offsetHeight
                : 0;


        let currentSection = "";


        pageSections.forEach(
            (section) => {

                const sectionTop =
                    section.offsetTop -
                    navbarHeight -
                    80;

                const sectionBottom =
                    sectionTop +
                    section.offsetHeight;


                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionBottom
                ) {

                    currentSection =
                        section.id;

                }

            }
        );


        navigationItems.forEach(
            (link) => {

                const linkTarget =
                    link.getAttribute("href");


                link.classList.toggle(
                    "active",
                    linkTarget ===
                    `#${currentSection}`
                );

            }
        );

    };


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


window.addEventListener(
    "load",
    updateActiveNavigation
);
/* =========================================================
   HEADER / NAVIGATION STATE
========================================================= */

const handleNavigationState = () => {

    if (!mainNav || !menuToggle) {
        return;
    }

    const isMobile =
        window.innerWidth <= 768;

    if (!isMobile) {

        mainNav.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

};


/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    handleNavigationState
);


/* =========================================================
   INITIAL NAVIGATION STATE
========================================================= */

window.addEventListener(
    "load",
    handleNavigationState
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key !== "Escape" ||
            !mainNav ||
            !menuToggle
        ) {
            return;
        }


        mainNav.classList.remove(
            "active"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }
);
/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-feature, " +
        ".service-card, " +
        ".package-card, " +
        ".portfolio-card, " +
        ".contact-information, " +
        ".contact-form, " +
        ".policy-links"
    );


revealElements.forEach(
    (element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(24px)";

        element.style.transition =
            "opacity 0.6s ease, " +
            "transform 0.6s ease";

    }
);


/* =========================================================
   INTERSECTION OBSERVER
========================================================= */

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";


                    observer.unobserve(
                        entry.target
                    );

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);
/* =========================================================
   PACKAGE LINK PROTECTION
========================================================= */

packageButtons.forEach(
    (button) => {

        button.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key !== "Enter" &&
                    event.key !== " "
                ) {
                    return;
                }


                event.preventDefault();


                const packageName =
                    button.dataset.selectedPackage;


                if (
                    packageName &&
                    selectedPackage
                ) {

                    selectedPackage.value =
                        packageName;

                }


                const contactSection =
                    document.getElementById(
                        "contact"
                    );


                if (contactSection) {

                    contactSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }
);


/* =========================================================
   CONTACT FORM PACKAGE CHECK
========================================================= */

if (contactForm && selectedPackage) {

    contactForm.addEventListener(
        "change",
        () => {

            if (
                !selectedPackage.value &&
                contactMessageStatus
            ) {

                contactMessageStatus.textContent =
                    "Please select a package.";

            }

        }
    );

}
/* =========================================================
   FINAL INITIALISATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * Keep the mobile navigation closed
         * when the page first loads.
         */

        if (mainNav) {

            mainNav.classList.remove(
                "active"
            );

        }


        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /*
         * Keep the contact status area empty
         * until the user interacts with the form.
         */

        if (contactMessageStatus) {

            contactMessageStatus.textContent =
                "";

        }


        /*
         * Make sure the package selector starts
         * with its default option.
         */

        if (selectedPackage) {

            selectedPackage.selectedIndex = 0;

        }


        /*
         * Run the existing navigation state
         * calculation once the page is ready.
         */

        updateActiveNavigation();

    }
);


/* =========================================================
   FINAL WINDOW LOAD CHECK
========================================================= */

window.addEventListener(
    "load",
    () => {

        handleNavigationState();

        updateActiveNavigation();

    }
);