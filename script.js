// Images links for "No" button (replace with your own links)
const randomImages = [
    "image1.jpg", // Replace with your links
    "image2.jpg",
    "image3.jpg",
    "image4.png",
    "image5.jpg"
];

// Celebration Image for "Yes" (replace with your link)
const celebrationImage = "celebration.gif"; // Replace with your link

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const randomImageContainer = document.getElementById("randomImage");
const celebration = document.getElementById("celebration");

let isTouchDevice = 'ontouchstart' in document.documentElement;

// Move the "No" button away when the mouse gets close
noBtn.addEventListener("mouseenter", () => {
    noBtn.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
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
    // Display fireworks animation
    celebration.style.display = "block";
    randomImageContainer.style.display = "none"; // Hide random image if it was displayed

    // Show celebratory image
    let img = document.createElement("img");
    img.src = celebrationImage;
    img.style.maxWidth = "100%";
    img.style.borderRadius = "10px";
    randomImageContainer.innerHTML = "";
    randomImageContainer.appendChild(img);
    randomImageContainer.style.display = "block";
});