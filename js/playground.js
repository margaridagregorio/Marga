/* Infinite draggable grid.
   A fixed pool of tiles covers the screen; as the grid moves, tiles that
   leave one edge wrap around to the other and pick up the next project,
   so the projects repeat forever in every direction. */
(() => {
  const stage = document.getElementById("playground");
  const label = document.getElementById("cursorLabel");
  const viewer = document.getElementById("viewer");
  const viewerMedia = document.getElementById("viewerMedia");
  const items = window.PROJECTS;
  const n = items.length;

  let tileW, tileH, gap, cellW, cellH, cols, rows, tiles = [];
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };

  const mod = (a, b) => ((a % b) + b) % b;

  // Which project goes in world cell (c, r). Shifting each row by 3 keeps
  // the same image from lining up with itself in neighbouring rows.
  const projectAt = (c, r) => mod(c + r * 3, n);

  function mediaFor(item, className) {
    let el;
    if (item.type === "video") {
      el = document.createElement("video");
      Object.assign(el, { muted: true, loop: true, autoplay: true, playsInline: true });
      if (item.poster) el.poster = item.poster;
    } else {
      el = new Image();
      el.alt = item.title || "";
      el.decoding = "async";
      el.draggable = false;
    }
    el.src = item.src;
    if (className) el.className = className;
    return el;
  }

  function build() {
    const vw = innerWidth;
    tileW = vw < 768 ? Math.round(vw * 0.24) : Math.round(Math.max(100, vw * 0.08));
    tileH = Math.round(tileW * 4 / 3);
    gap = Math.round(tileW * 0.2);
    cellW = tileW + gap;
    cellH = tileH + gap;
    cols = Math.ceil(vw / cellW) + 2;
    rows = Math.ceil(innerHeight / cellH) + 2;

    stage.innerHTML = "";
    tiles = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const el = document.createElement("div");
        el.className = "tile";
        el.style.width = tileW + "px";
        el.style.height = tileH + "px";
        stage.appendChild(el);
        tiles.push({ el, c, r, index: -1 });
      }
    }
    render(true);
  }

  function render(force) {
    const totalW = cols * cellW;
    const totalH = rows * cellH;
    for (const t of tiles) {
      const rawX = t.c * cellW + current.x;
      const rawY = t.r * cellH + current.y;
      const wrapX = Math.floor(rawX / totalW);
      const wrapY = Math.floor(rawY / totalH);
      const x = rawX - wrapX * totalW - cellW;
      const y = rawY - wrapY * totalH - cellH;
      t.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      const index = projectAt(t.c - wrapX * cols, t.r - wrapY * rows);
      if (force || index !== t.index) {
        t.index = index;
        t.el.dataset.index = index;
        t.el.replaceChildren(mediaFor(items[index]));
      }
    }
  }

  function loop() {
    current.x += (target.x - current.x) * 0.09;
    current.y += (target.y - current.y) * 0.09;
    render(false);
    requestAnimationFrame(loop);
  }

  // ---- drag ----
  let dragging = false, moved = 0, last = null, vel = { x: 0, y: 0 };

  stage.addEventListener("pointerdown", (e) => {
    dragging = true;
    moved = 0;
    last = { x: e.clientX, y: e.clientY };
    vel = { x: 0, y: 0 };
    stage.setPointerCapture(e.pointerId);
    stage.classList.add("is-dragging");
  });

  stage.addEventListener("pointermove", (e) => {
    label.style.transform = `translate(${e.clientX + 14}px, ${e.clientY - 6}px)`;
    if (!dragging) {
      label.textContent = e.target.closest(".tile") ? "Open project" : "Drag to explore";
      return;
    }
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    moved += Math.abs(dx) + Math.abs(dy);
    target.x += dx * 1.4;
    target.y += dy * 1.4;
    vel = { x: dx, y: dy };
    last = { x: e.clientX, y: e.clientY };
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove("is-dragging");
    target.x += vel.x * 12; // throw
    target.y += vel.y * 12;
    if (moved < 6) {
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const tile = hit && hit.closest(".tile");
      if (tile) openViewer(items[+tile.dataset.index]);
    }
  }
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);
  stage.addEventListener("pointerleave", () => (label.style.transform = "translate(-200px,-200px)"));

  // ---- wheel / trackpad ----
  addEventListener("wheel", (e) => {
    e.preventDefault();
    target.x -= e.deltaX;
    target.y -= e.deltaY;
  }, { passive: false });

  // ---- keyboard ----
  addEventListener("keydown", (e) => {
    const step = cellW;
    if (e.key === "Escape") return closeViewer();
    if (e.key === "ArrowLeft") target.x += step;
    if (e.key === "ArrowRight") target.x -= step;
    if (e.key === "ArrowUp") target.y += step;
    if (e.key === "ArrowDown") target.y -= step;
  });

  // ---- project viewer ----
  function openViewer(item) {
    const full = mediaFor({ ...item, src: item.full || item.src });
    if (item.type === "video") full.controls = true;
    viewerMedia.replaceChildren(full);
    document.getElementById("viewerTitle").textContent = item.title || "";
    document.getElementById("viewerYear").textContent = item.year || "";
    viewer.classList.add("is-open");
  }
  function closeViewer() {
    viewer.classList.remove("is-open");
    setTimeout(() => viewerMedia.replaceChildren(), 500);
  }
  viewer.addEventListener("click", closeViewer);

  let resizeTimer;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 150);
  });

  build();
  requestAnimationFrame(loop);
})();
