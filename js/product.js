/* Product page (cathydolle.com/shop/<item>): title / material / status on one
   line, description below, a column of photos, and a mini map on the right
   that highlights the photos currently on screen. */
(() => {
  const slug = new URLSearchParams(location.search).get("item");
  const p = window.PRODUCTS.find((x) => x.slug === slug) || window.PRODUCTS[0];

  document.title = `${p.name} — Marga`;
  document.getElementById("pName").textContent = p.name;
  document.getElementById("pMaterial").textContent = p.material;

  const status = document.getElementById("pStatus");
  if (/sold/i.test(p.status)) {
    status.textContent = p.status;
  } else {
    const subject = encodeURIComponent(`Marga — ${p.name}`);
    status.innerHTML = `<a href="mailto:${window.CONTACT.email}?subject=${subject}">Inquire</a>`;
  }

  document.getElementById("pDesc").innerHTML = p.description.map((t) => `<p>${t}</p>`).join("");

  const wrap = document.getElementById("pImages");
  const map = document.getElementById("minimap");
  const pairs = []; // [bigImg, miniImg]

  const make = (src, cls) => {
    const img = new Image();
    img.src = src;
    img.alt = p.name;
    if (cls) img.className = cls;
    return img;
  };

  p.images.forEach((entry) => {
    if (Array.isArray(entry)) {
      const row = document.createElement("div");
      row.className = "pair";
      const mini = document.createElement("div");
      mini.className = "mm-pair";
      entry.forEach((src) => {
        const big = make(src);
        const small = make(src);
        row.appendChild(big);
        mini.appendChild(small);
        pairs.push([big, small]);
      });
      wrap.appendChild(row);
      map.appendChild(mini);
    } else {
      const big = make(entry, "single");
      big.addEventListener("load", () => {
        if (big.naturalHeight > big.naturalWidth) big.classList.add("is-portrait");
      });
      const small = make(entry);
      wrap.appendChild(big);
      map.appendChild(small);
      pairs.push([big, small]);
    }
  });

  // highlight minimap thumbs for photos in view
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const pair = pairs.find(([big]) => big === e.target);
      if (pair) pair[1].classList.toggle("is-visible", e.isIntersecting);
    });
  }, { threshold: 0.15 });
  pairs.forEach(([big]) => io.observe(big));

  // click a mini thumb to jump to its photo
  pairs.forEach(([big, small]) => {
    small.addEventListener("click", () => big.scrollIntoView({ behavior: "smooth", block: "center" }));
  });
})();
