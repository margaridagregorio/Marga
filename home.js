(() => {
  const video = document.getElementById("homeVideo");

  // Portrait video on phones / portrait screens, landscape video otherwise
  const portrait = matchMedia("(max-width: 767px), (orientation: portrait)");
  function pickVideo() {
    const src = portrait.matches ? video.dataset.mobile : video.dataset.desktop;
    if (video.getAttribute("src") === src) return;
    video.src = src;
    video.play().catch(() => {});
  }
  portrait.addEventListener("change", pickVideo);
  pickVideo();
})();
