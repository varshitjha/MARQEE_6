const menuButton = document.querySelector("#menu-item");
const talkButton = document.querySelector("#talk-item");
const cursorVideo = document.querySelector(".cursor-follower-video-container");
const heroSection = document.querySelector(".hero-container");
const themeButton = document.querySelector("#dark-mode-item");
const menuOverlay = document.querySelector(".menubar-overlay-container");

let darkModeEnabled = false;

menuButton.addEventListener("mouseenter", () => {
    const menuIsVisible = menuOverlay.classList.contains("show");
    menuButton.textContent = menuIsVisible ? "CLOSE" : "OPEN";
});

menuButton.addEventListener("mouseleave", () => {
    const menuIsVisible = menuOverlay.classList.contains("show");
    menuButton.textContent = menuIsVisible ? "CLOSE" : "MENU";
});

menuButton.addEventListener("click", () => {
    menuOverlay.classList.toggle("show");

    const menuIsVisible = menuOverlay.classList.contains("show");

    document.body.classList.toggle("menu-open", menuIsVisible);
    menuButton.textContent = menuIsVisible ? "CLOSE" : "MENU";
});

talkButton.addEventListener("mouseenter", () => {
    talkButton.textContent = "CONTACT US";
});

talkButton.addEventListener("mouseleave", () => {
    talkButton.textContent = "LET'S TALK";
});

document.addEventListener("mousemove", (event) => {
    if (!cursorVideo || !heroSection.matches(":hover")) return;

    cursorVideo.style.left = `${event.clientX}px`;
    cursorVideo.style.top = `${event.clientY}px`;
    cursorVideo.style.display = "block";
});

heroSection.addEventListener("mouseenter", () => {
    cursorVideo.style.opacity = "1";
});

heroSection.addEventListener("mouseleave", () => {
    cursorVideo.style.opacity = "0";
});

themeButton.addEventListener("click", () => {
    darkModeEnabled = !darkModeEnabled;

    document.body.classList.toggle("dark", darkModeEnabled);

    themeButton.textContent = darkModeEnabled
        ? "LIGHT MODE"
        : "DARK MODE";
});

const navigationItems = document.querySelectorAll(".menubar_items");

navigationItems.forEach((item) => {
    const previewImage = item.parentElement.querySelector("img");

    item.addEventListener("mouseenter", () => {
        item.style.transform = "translateX(50px)";

        if (previewImage) {
            previewImage.style.width = "100px";
        }
    });

    item.addEventListener("mouseleave", () => {
        item.style.transform = "translateX(0)";

        if (previewImage) {
            previewImage.style.width = "0px";
        }
    });
});

function refreshClock() {
    const clockElement = document.querySelector("#current_time");

    if (!clockElement) return;

    const currentDate = new Date();

    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

refreshClock();
setInterval(refreshClock, 1000);

const hoverAreas = document.querySelectorAll(".hover-trigger");

hoverAreas.forEach((area) => {
    const stackImages = area.querySelectorAll(".stack-image");

    let currentImage = 0;
    let layerIndex = 10;
    let animationTimer = null;

    const resetStack = () => {
        clearInterval(animationTimer);
        animationTimer = null;

        stackImages.forEach((image) => {
            image.style.opacity = "0";
            image.style.zIndex = "1";
        });

        currentImage = 0;
        layerIndex = 10;
    };

    area.addEventListener("mouseenter", () => {
        if (animationTimer || stackImages.length === 0) return;

        animationTimer = setInterval(() => {
            const activeImage = stackImages[currentImage];

            activeImage.style.opacity = "1";
            activeImage.style.zIndex = layerIndex++;

            currentImage = (currentImage + 1) % stackImages.length;
        }, 300);
    });

    area.addEventListener("mouseleave", resetStack);
});

const playgroundText = document.querySelector(".playground-text");
const portfolioPreview = document.querySelector("#portfolio");

if (playgroundText && portfolioPreview) {
    playgroundText.addEventListener("mousemove", (event) => {
        portfolioPreview.style.left = `${event.clientX}px`;
        portfolioPreview.style.top = `${event.clientY}px`;
        portfolioPreview.style.opacity = "1";
    });

    playgroundText.addEventListener("mouseleave", () => {
        portfolioPreview.style.opacity = "0";
    });
}

const serviceOptions = document.querySelectorAll(".service-items");
const serviceImage = document.querySelector("#service-img");
const serviceDescription = document.querySelector(".description-text");

serviceOptions.forEach((service) => {
    service.addEventListener("mouseenter", () => {
        const imagePath = service.dataset.image;
        const description = service.dataset.description;
        const verticalPosition = service.offsetTop;

        if (imagePath) {
            serviceImage.src = imagePath;
        }

        serviceDescription.textContent = description;

        if (serviceImage && serviceDescription) {
            serviceImage.parentElement.style.top = `${verticalPosition}px`;
            serviceDescription.parentElement.style.top = `${verticalPosition}px`;

            serviceImage.classList.add("show");
            serviceDescription.classList.add("show");
        }
    });

    service.addEventListener("mouseleave", () => {
        if (serviceImage && serviceDescription) {
            serviceImage.classList.remove("show");
            serviceDescription.classList.remove("show");
        }
    });
});
