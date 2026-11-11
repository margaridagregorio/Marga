/* Products scattered at random across the screen (cathydolle.com/shop).
   Clicking on empty space shuffles them to new positions. */
(() => {
  const shop = document.getElementById("shop");
  const label = document.getElementById("cursorLabel");
  const mobile = matchMedia("(max-width: 767px)");

  const cards = window.PRODUCTS.map((p, i) => {
    const a = document.createElement("a");
    a.className = "product-card";
    a.href = `product.html?item=${encodeURIComponent(p.slug)}`;
    a.setAttribute("aria-label", p.name);
    a.innerHTML = `
      <figure><img src="${p.thumb}" alt="${p.name}"></figure>
      <footer>
        <span>(${String(i + 1).padStart(2, "0")})</span>
        <h3>${p.name}</h3>
      </footer>`;
    shop.appendChild(a);
    return a;
  });

  function scatter() {
    if (mobile.matches) {
      cards.forEach((c) => { c.style.left = c.style.top = ""; });
      return;
    }
    const W = innerWidth;
    const H = innerHeight;
    // keep products clear of the menu at the top and bottom
    const top = document.querySelector(".corner").offsetHeight + 16;
    const bottom = top;
    const placed = [];

    cards.forEach((card) => {
      const w = card.offsetWidth;
      const h = card.offsetHeight || H * 0.25 + 24;
      let best = null;
      // try random spots, keep the first one that doesn't overlap
      for (let tries = 0; tries < 300; tries++) {
        const x = Math.random() * (W - w - 20) + 10;
        const y = top + Math.random() * Math.max(1, H - top - bottom - h);
        const pad = tries < 200 ? 16 : 0;
        const hit = placed.some((p) =>
          x < p.x + p.w + pad && x + w + pad > p.x && y < p.y + p.h + pad && y + h + pad > p.y);
        best = { x, y, w, h };
        if (!hit) break;
      }
      placed.push(best);
      card.style.left = best.x + "px";
      card.style.top = best.y + "px";
    });
  }

  function reveal() {
    cards.forEach((c, i) => setTimeout(() => c.classList.add("is-in"), 120 + i * 90));
  }

  shop.addEventListener("click", (e) => {
    if (!e.target.closest(".product-card")) scatter();
  });

  addEventListener("pointermove", (e) => {
    if (mobile.matches || e.pointerType === "touch") return;
    const onCard = e.target.closest(".product-card");
    const onNav = e.target.closest(".corner");
    label.textContent = onCard ? "View piece" : "Click to randomize";
    label.style.opacity = onNav ? "0" : "1";
    label.style.transform = `translate(${e.clientX + 14}px, ${e.clientY - 6}px)`;
  });

  let t;
  addEventListener("resize", () => { clearTimeout(t); t = setTimeout(scatter, 150); });

  // wait for thumbnails so heights are known before placing
  const imgs = [...shop.querySelectorAll("img")];
  Promise.all(imgs.map((img) => img.complete ? 0 : new Promise((r) => { img.onload = img.onerror = r; })))
    .then(() => { scatter(); reveal(); });
})();
