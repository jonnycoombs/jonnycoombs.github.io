// Images links for "No" button (replace with your own links)
const randomImages = [
    "image1.jpg", // Replace with your links
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg"
];

// Celebration Image for "Yes" (replace with your link)
const celebrationImage = "celebration.gif"; // Replace with your link

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const randomImageContainer = document.getElementById("randomImage");
const celebration = document.getElementById("celebration");

let isTouchDevice = 'ontouchstart' in document.documentElement;

// Get positions of "Yes" and "No" buttons
const yesBtnArea = yesBtn.getBoundingClientRect();
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// Define the movement boundary for the "No" button (relative to "Yes" button)
const moveBoundary = 150; // Max distance the "No" button can move from "Yes" button

// Initial position of the "No" button (start next to "Yes" button)
noBtn.style.left = `${yesBtnArea.left - 300}px`; // Place next to the "Yes" button

document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Get position of "No" button
    const noBtnArea = noBtn.getBoundingClientRect();

    // Calculate distance between mouse cursor and "No" button
    const distX = Math.abs(mouseX - (noBtnArea.left + noBtnArea.width / 2));
    const distY = Math.abs(mouseY - (noBtnArea.top + noBtnArea.height / 2));
    const threshold = 150; // Increase distance threshold to make the button move more freely

    if (distX < threshold && distY < threshold) {
        // Calculate new position within the restricted boundary around the "Yes" button
        const maxX = Math.min(yesBtnArea.left + moveBoundary, screenWidth - noBtn.offsetWidth - 10); // Boundary on the right (don't go past the screen)
        const minX = Math.max(yesBtnArea.left - moveBoundary, 10); // Boundary on the left (don't go off-screen)
        const maxY = Math.min(yesBtnArea.top + moveBoundary, screenHeight - noBtn.offsetHeight - 10); // Boundary on the bottom
        const minY = Math.max(yesBtnArea.top - moveBoundary, 10); // Boundary on the top (don't go off-screen)

        // Randomize new position within the allowed area
        const randomX = Math.random() * (maxX - minX) + minX;
        const randomY = Math.random() * (maxY - minY) + minY;

        noBtn.style.transform = `translate(${randomX - noBtnArea.left}px, ${randomY - noBtnArea.top}px)`;
    }
});

// Handle "No" button click or touch
noBtn.addEventListener("click", () => {
    if (isTouchDevice) {
        // Show random image on touch
        let randomIndex = Math.floor(Math.random() * randomImages.length);
        let img = document.createElement("img");
        img.src = randomImages[randomIndex];
        img.style.maxWidth = "100%";
        img.style.borderRadius = "10px";
        randomImageContainer.innerHTML = "";
        randomImageContainer.appendChild(img);
        randomImageContainer.style.display = "block";
    }
});

// Handle "Yes" button click
yesBtn.addEventListener("click", () => {
    // Display fireworks animation (this will stay)
    celebration.style.display = "block";

    // Fade out the celebratory image
    let img = document.createElement("img");
    img.src = celebrationImage;
    img.style.maxWidth = "100%";
    img.style.borderRadius = "10px";
    randomImageContainer.innerHTML = "";
    randomImageContainer.appendChild(img);
    randomImageContainer.style.display = "block";

    // Apply fade-out effect on the celebratory image
    img.classList.add("fadeOut");
});
