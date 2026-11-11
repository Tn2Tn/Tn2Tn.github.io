// Original Podcast starts with an intentionally empty playlist.
const podcastData = [];
let currentMusic = -1;
let lastPlayedMusic = -1;
let audioSource = new Audio();

document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector("[data-title]");
  const guest = document.querySelector("[data-guest]");
  const summary = document.querySelector("[data-summary]");
  const banner = document.querySelector("[data-player-banner]");
  if (title) title.textContent = "No episodes yet";
  if (guest) guest.textContent = "Original Podcast";
  if (summary) summary.textContent = "New episodes will appear here.";
  if (banner) banner.alt = "Original Podcast — no episodes yet";

  document.querySelectorAll(".player-control button, [data-seek]").forEach(control => {
    control.disabled = true;
    control.setAttribute("aria-disabled", "true");
  });

  const toggleBtn = document.getElementById("toggleBtn");
  const gallery = document.getElementById("galleryContainer");
  if (!toggleBtn || !gallery) return;
  const updateGallery = () => {
    if (window.innerWidth > 900) {
      gallery.style.left = "0";
      toggleBtn.style.display = "none";
    } else {
      gallery.style.left = "calc(-93% - 30px)";
      toggleBtn.style.display = "block";
    }
  };
  toggleBtn.addEventListener("click", event => {
    event.stopPropagation();
    gallery.style.left = gallery.style.left === "0px" || gallery.style.left === "0"
      ? "calc(-93% - 30px)" : "0";
  });
  window.addEventListener("resize", updateGallery);
  updateGallery();
});
