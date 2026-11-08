(() => {
  const name = document.getElementById("bigName");
  const span = name.querySelector("span");
  const video = document.getElementById("homeVideo");

  // Fit "Marga" so the letters themselves touch both screen edges.
  // The text box includes empty side-space around the M and the a, so we
  // measure the visible ink with a canvas and scale/shift by that instead.
  const ctx = document.createElement("canvas").getContext("2d");
  function fit() {
    const cs = getComputedStyle(name);
    ctx.font = `${cs.fontWeight} 100px ${cs.fontFamily}`;
    if ("letterSpacing" in ctx) ctx.letterSpacing = parseFloat(cs.letterSpacing) / parseFloat(cs.fontSize) * 100 + "px";
    const m = ctx.measureText(span.dataset.text);
    const ink = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
    const size = (100 * innerWidth) / ink;
    name.style.fontSize = size + "px";
    span.style.marginLeft = (m.actualBoundingBoxLeft * size) / 100 + "px";
  }

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

  (document.fonts ? document.fonts.ready : Promise.resolve()).then(fit);
  fit();
  addEventListener("resize", fit);
})();
