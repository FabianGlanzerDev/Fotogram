
const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const titleEl = document.getElementById("lightbox-title");
const counterEl = document.getElementById("lightbox-counter");

let currentIndex = 0;

function updateLightbox() {
  const currentImg = images[currentIndex];

  // Bild setzen
  lightboxImg.src = currentImg.src;
  lightboxImg.alt = currentImg.alt || "";

  // Titel setzen (Dateiname oder alt)
  if (titleEl) {
    const filename = currentImg.src.split("/").pop(); // z.B. Alaska-810433_1280.jpg
    titleEl.textContent = currentImg.alt || filename;
  }

  // Counter setzen
  if (counterEl) {
    counterEl.textContent = `${currentIndex + 1}/${images.length}`;
  }
}

function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  updateLightbox();
}

function closeLightbox() {
  lightbox.style.display = "none";
}

// Galerie-Klick
images.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

// Buttons
nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
});

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});

// Klick in Hintergrund schließt
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// ESC=schließen
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.style.display === "flex") {
    closeLightbox();
  }
});

//Pfeiltasten Weiterschalten//
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display !== "flex") return; // nur wenn Lightbox offen

  if (e.key === "Escape") {
    closeLightbox();
  }

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }

  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }
});