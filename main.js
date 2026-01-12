const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close-btn");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const titleEl = document.getElementById("lightbox-title");
const counterEl = document.getElementById("lightbox-counter");
const gallery = document.getElementById("gallery");


const imagesData = [
  { src: "./img/coal-power-plant-6972028_1920.jpg", alt: "Kohlekraftwerk mit Schornsteinen und Rauch" },
  { src: "./img/factory-2813380_1920.jpg", alt: "Industriefabrik mit mehreren Gebäuden" },
  { src: "./img/factory-4338627_1920.jpg", alt: "Große Industrieanlage" },
  { src: "./img/fan-3645379_1920.jpg", alt: "Industrieller Ventilator in einer Fabrikhalle" },
  { src: "./img/ferrybridge-5428427_1920.jpg", alt: "Kohlekraftwerk mit Kühltürmen (Ferrybridge)" },
  { src: "./img/hydroelectric-power-station-1264100_1920.jpg", alt: "Wasserkraftwerk mit Staumauer" },
  { src: "./img/hydropower-plant-6587753_1920.jpg", alt: "Wasserkraftanlage mit fließendem Wasser" },
  { src: "./img/power-plant-1320184_1920.jpg", alt: "Großes Kraftwerk" },
  { src: "./img/power-plant-2918331_1920.jpg", alt: "Kraftwerk mit Dampfwolken" },
  { src: "./img/power-plant-344231_1920.jpg", alt: "Kraftwerksanlage bei Tageslicht" },
  { src: "./img/power-station-2802622_1920.jpg", alt: "Elektrizitätswerk mit Hochspannungsanlagen" },
  { src: "./img/power-station-6579092_1920.jpg", alt: "Moderne Kraftwerksanlage mit Rohrleitungen" }
];

let currentIndex = 0;

// start render //
function render() {
  renderGallery();
  initLightboxEvents();
}


//  render galery//
function renderGallery() {
  gallery.innerHTML = "";

  imagesData.forEach((img, index) => {
    const imageEl = document.createElement("img");
    imageEl.src = img.src;
    imageEl.alt = img.alt;

    // tabfocus//
    imageEl.tabIndex = 0;
    imageEl.setAttribute("role", "button");
    imageEl.setAttribute("aria-label", `Bild öffnen: ${img.alt}`);

    // openlightbox//
    imageEl.onclick = () => openLightbox(index);

    // enter/space opemn//
    imageEl.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    };

    gallery.appendChild(imageEl);
  });
}

// next/back//
function initLightboxEvents() {
  closeBtn.onclick = closeLightbox;

  nextBtn.onclick = (e) => {
    e.stopPropagation();
    nextImage();
  };

  prevBtn.onclick = (e) => {
    e.stopPropagation();
    prevImage();
  };

  // click on background=X//
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // keyboardnav//
  document.addEventListener("keydown", handleKeyNav);
}

// lightbox//
function updateLightbox() {
  const current = imagesData[currentIndex];

  lightboxImg.src = current.src;
  lightboxImg.alt = current.alt;

  if (titleEl) {
    const filename = current.src.split("/").pop();
    titleEl.textContent = current.alt || filename;
  }

  if (counterEl) {
    counterEl.textContent = `${currentIndex + 1}/${imagesData.length}`;
  }
}

function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  lightbox.setAttribute("aria-hidden", "false");

  // Background scroll lock smartphone//
  document.documentElement.classList.add("no-scroll");
  document.body.classList.add("no-scroll");

  updateLightbox();
}

function closeLightbox() {
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");

  document.documentElement.classList.remove("no-scroll");
  document.body.classList.remove("no-scroll");
}

function nextImage() {
  currentIndex = (currentIndex + 1) % imagesData.length;
  updateLightbox();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
  updateLightbox();
}

function handleKeyNav(e) {
  if (lightbox.style.display !== "flex") return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
}