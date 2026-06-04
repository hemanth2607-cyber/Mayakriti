/* ═══════════════════════════════════════════════════
   MAYAKRITI — projects.js
   ═══════════════════════════════════════════════════ */

// Flat image collections. Drop more paths inside the arrays below to add new photos.
const projectsData = [
    {
        id: "3BHK basic Residential Project",
        title: "3BHK Basic Residence",
        images: [
            "3BHK_Basic_Residential_Project/0.jpg",
            "3BHK_Basic_Residential_Project/1.jpg",
            "3BHK_Basic_Residential_Project/2.jpg",
            "3BHK_Basic_Residential_Project/3.jpg",
            "3BHK_Basic_Residential_Project/4.jpg",
            "3BHK_Basic_Residential_Project/5.jpg",
            "3BHK_Basic_Residential_Project/6.jpg",
            "3BHK_Basic_Residential_Project/7.jpg",
            "3BHK_Basic_Residential_Project/8.jpg",
            "3BHK_Basic_Residential_Project/9.jpg",
            "3BHK_Basic_Residential_Project/10.jpg",
            "3BHK_Basic_Residential_Project/11.jpg",
            "3BHK_Basic_Residential_Project/12.jpg",
        ]
    },
    {
        id: "3BHK premium Residential Project",
        title: "3BHK Premium Residence",
        images: [
            "3BHK_Premium_Residential_Project/1.jpeg",
            "3BHK_Premium_Residential_Project/2.jpeg",
            "3BHK_Premium_Residential_Project/3.jpeg",
            "3BHK_Premium_Residential_Project/4.jpeg",
            "3BHK_Premium_Residential_Project/5.jpeg",
            "3BHK_Premium_Residential_Project/6.jpeg",
            "3BHK_Premium_Residential_Project/7.jpeg",
            "3BHK_Premium_Residential_Project/0.jpeg",
            "3BHK_Premium_Residential_Project/8.jpeg",
            "3BHK_Premium_Residential_Project/9.jpeg",
            "3BHK_Premium_Residential_Project/10.jpeg",
            "3BHK_Premium_Residential_Project/11.jpeg",
            "3BHK_Premium_Residential_Project/12.jpeg",
            "3BHK_Premium_Residential_Project/13.jpeg",
            "3BHK_Premium_Residential_Project/14.jpeg",
        ]
    },
    {
        id: "3BHK standard Residential Project",
        title: "3BHK Standard Residence",
        images: [
            "3BHK_Standard_Residential_Project/0.jpg",
            "3BHK_Standard_Residential_Project/1.jpg",
            "3BHK_Standard_Residential_Project/2.jpg",
            "3BHK_Standard_Residential_Project/3.jpg",
            "3BHK_Standard_Residential_Project/4.jpg",
            "3BHK_Standard_Residential_Project/5.jpg",
            "3BHK_Standard_Residential_Project/6.jpg",
            "3BHK_Standard_Residential_Project/7.jpg",
            "3BHK_Standard_Residential_Project/8.jpg",
            "3BHK_Standard_Residential_Project/9.jpg",
            "3BHK_Standard_Residential_Project/10.jpg",
            "3BHK_Standard_Residential_Project/11.jpg",
            "3BHK_Standard_Residential_Project/12.jpg",
        ]
    },
    {
        id: "Hospitality Project",
        title: "Hospitality Project",
        images: [
            "Hospitality_Project/0.jpg",
            "Hospitality_Project/1.jpg",
            "Hospitality_Project/2.jpg",
            "Hospitality_Project/3.jpg",
            "Hospitality_Project/4.jpg",
            "Hospitality_Project/5.jpg",
            "Hospitality_Project/6.jpg",
            "Hospitality_Project/7.jpg",
            "Hospitality_Project/8.jpg",
            "Hospitality_Project/9.jpg",
        ]
    },
    {
        id: "outdoor camp house",
        title: "Outdoor Camp House Project",
        images: [
            "outdoor_camp_house/0.jpeg",
            "outdoor_camp_house/1.jpeg",
            "outdoor_camp_house/3.jpeg",
            "outdoor_camp_house/4.jpeg",
            "outdoor_camp_house/5.jpeg",
            "outdoor_camp_house/6.jpeg",
            "outdoor_camp_house/7.jpeg",
            "outdoor_camp_house/8.jpeg",
        ]
    },
    {
        id: "Premium Design",
        title: "Premium Design Project",
        images: [
            "Premium_Design/0.png",
            "Premium_Design/1.png",
            "Premium_Design/2.png",
            "Premium_Design/3.png",
            "Premium_Design/4.png",
            "Premium_Design/5.png",
            "Premium_Design/6.png",
            "Premium_Design/7.png",
            "Premium_Design/8.png",
            "Premium_Design/9.png",
            "Premium_Design/10.png",
        ]
    },
    {
        id: "Hospitality Project",
        title: "Hospitality Project",
        images: [
            "Hospitality_Project/0.jpg",
            "Hospitality_Project/1.jpg",
            "Hospitality_Project/2.jpg",
            "Hospitality_Project/3.jpg",
            "Hospitality_Project/4.jpg",
            "Hospitality_Project/5.jpg",
            "Hospitality_Project/6.jpg",
            "Hospitality_Project/7.jpg",
            "Hospitality_Project/8.jpg",
            "Hospitality_Project/9.jpg",
        ]
    }
];

let overlayLenis = null;
let overlayRafId = null;

document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("projectsGrid");
    const overlay = document.getElementById("projectOverlay");
    const closeBtn = document.querySelector(".overlay-close");

    if (!gridContainer || !overlay) return;

    // ── 1. Scroll Hover Fix: Force real-time hover calculations on scroll ──
    let lastX = 0;
    let lastY = 0;

    function updateHoverState(x, y) {
        if (x <= 0 || y <= 0) return;

        // Resolve the exact element sitting under the cursor coordinates
        const targetElement = document.elementFromPoint(x, y);
        const activeCard = targetElement ? targetElement.closest('.project-card') : null;

        // Dynamically toggle hover classes based on spatial intersection
        const allCards = document.querySelectorAll('.project-card');
        allCards.forEach(card => {
            if (card === activeCard) {
                card.classList.add('is-hovered');
            } else {
                card.classList.remove('is-hovered');
            }
        });
    }

    window.addEventListener('mousemove', (e) => {
        lastX = e.clientX;
        lastY = e.clientY;
        updateHoverState(lastX, lastY);
    }, { passive: true });

    window.addEventListener('scroll', () => {
        updateHoverState(lastX, lastY);
    }, { passive: true });

    // Cleanly strip active states when cursor leaves the viewport bounds
    document.addEventListener('mouseleave', () => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.remove('is-hovered');
        });
    });

    // ── 2. Populates Catalog Grid ────────────────
    projectsData.forEach(proj => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.setAttribute("data-id", proj.id);
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `View ${proj.title}`);

        card.innerHTML = `
            <div class="project-card-img-wrap">
                <img src="${proj.images[0]}" alt="${proj.title} Cover" loading="lazy">
                <div class="project-card-hover-overlay">
                    <h3 class="project-card-hover-title">${proj.title}</h3>
                </div>
            </div>
            <div class="project-card-meta">
                <span class="project-card-sub-title">${proj.title}</span>
            </div>
        `;

        card.addEventListener("click", () => openProject(proj));
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openProject(proj);
            }
        });

        gridContainer.appendChild(card);
    });

    // ── 3. Open Project Gallery ───────────────────
    function openProject(proj) {
        // Reset the native container scroll position to the top
        overlay.scrollTop = 0;

        const galleryArea = document.getElementById("overlayGallery");
        galleryArea.innerHTML = ""; // Clear existing images

        // Build flat image list containers
        proj.images.forEach(imgSrc => {
            const imgContainer = document.createElement("div");
            imgContainer.className = "gallery-img-container";
            imgContainer.innerHTML = `<img src="${imgSrc}" alt="${proj.title} image" loading="lazy">`;
            galleryArea.appendChild(imgContainer);
        });

        overlay.classList.add("active");
        overlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        // Stop the global window scroll instance
        if (typeof lenis !== "undefined") {
            lenis.stop();
        }

        // Initialize dedicated smooth scrolling behavior inside the overlay
        initOverlayScroll();

        // Lock keyboard focus to the close action
        closeBtn.focus();
    }

    // ── 4. Active Smooth Scroll Instance Loop ─────
    function initOverlayScroll() {
        overlayLenis = new Lenis({
            wrapper: overlay, // Targets the fixed element container
            content: document.getElementById("overlayContent"),
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1.05
        });

        function raf(time) {
            if (overlayLenis) {
                overlayLenis.raf(time);
                overlayRafId = requestAnimationFrame(raf);
            }
        }
        overlayRafId = requestAnimationFrame(raf);
    }

    // ── 5. Close Project Gallery ──────────────────
    function closeProject() {
        overlay.classList.remove("active");
        overlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        // Destroy sub-instance animation frames
        if (overlayRafId) {
            cancelAnimationFrame(overlayRafId);
            overlayRafId = null;
        }
        if (overlayLenis) {
            overlayLenis.destroy();
            overlayLenis = null;
        }

        // Reset the native container scroll position back to the top on exit
        overlay.scrollTop = 0;

        // Resume main page smooth scrolling
        if (typeof lenis !== "undefined") {
            lenis.start();
        }
    }

    // Bind event listeners cleanly
    closeBtn.addEventListener("click", closeProject);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("active")) {
            closeProject();
        }
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            closeProject();
        }
    });
});