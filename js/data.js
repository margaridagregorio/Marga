/* ==========================================================
   EDIT YOUR CONTENT HERE
   ----------------------------------------------------------
   PLAYGROUND: every item becomes a tile in the infinite grid.
     type:  "image" or "video"
     src:   small file shown in the grid (thumbs load fast)
     full:  larger file shown when the tile is clicked
     poster (videos only, optional): still image shown while loading

   JEWELRY: every item is one product.
     slug:   used in the link → product.html?item=<slug>
     images: list of photos on the product page.
             A string = one big image. ["a.jpg","b.jpg"] = two side by side.
   ========================================================== */

const PG = "assets/images/playground/";
const JW = "assets/images/jewelry/";

// playground tile from pg-<n>.jpg (thumb in the grid, full size when opened)
const pg = (n, title) => ({
  type: "image", title, year: "2026",
  src: PG + "thumbs/pg-" + n + ".jpg", full: PG + "pg-" + n + ".jpg",
});

window.PROJECTS = [
  pg(1, "Study 01"),
  pg(2, "Study 02"),
  pg(3, "Study 03"),
  pg(4, "Study 04"),
  pg(5, "Study 05"),
  pg(6, "Study 06"),
  pg(7, "Opulent Hand"),
  pg(8, "Kissy Portrait"),
  pg(9, "Slim Melted Ring"),
  // Example video tile:
  // { type: "video", title: "Casting", year: "2026", src: "assets/video/casting.mp4", full: "assets/video/casting.mp4" },
];

window.PRODUCTS = [
  {
    slug: "square-ring",
    name: "Square Ring",
    material: "Silver",
    status: "Available",
    thumb: JW + "thumbs/square-1.jpg",
    description: ["Silver ring. Lost wax method."],
    images: [JW + "square-1.jpg", [JW + "square-2.jpg", JW + "square-3.jpg"]],
  },
  {
    slug: "organic-ring",
    name: "Organic Ring",
    material: "Silver",
    status: "Available",
    thumb: JW + "thumbs/organic-1.jpg",
    description: ["Silver ring. The first ring I made. Lost wax method."],
    images: [JW + "organic-1.jpg", JW + "organic-2.jpg"],
  },
  {
    slug: "uno-ring",
    name: "Uno Ring",
    material: "Silver plated",
    status: "Available",
    thumb: JW + "thumbs/uno-1.jpg",
    description: ["Silver plated ring. Lost wax method, plus a rubber mould made to replicate it."],
    images: [JW + "uno-1.jpg", [JW + "uno-2.jpg", JW + "uno-3.jpg"], JW + "uno-5.jpg", JW + "uno-4.jpg"],
  },
  {
    slug: "nienke-ring",
    name: "Nienke Ring",
    material: "Gold plated",
    status: "Available",
    thumb: JW + "thumbs/nienke-1.jpg",
    description: ["Gold plated ring. Custom made for Nienke. Lost wax method, plus a rubber mould made to replicate it."],
    images: [JW + "nienke-1.jpg", [JW + "nienke-2.jpg", JW + "nienke-3.jpg"], JW + "nienke-4.jpg"],
  },
  {
    slug: "green-gem",
    name: "Green Gem",
    material: "Silver, green crystal",
    status: "Available",
    thumb: JW + "thumbs/greengem-1.jpg",
    description: ["Silver ring with a green crystal gem. Lost wax method. Manual gem casting. My first ring with a gem."],
    images: [JW + "greengem-1.jpg", JW + "greengem-2.jpg"],
  },
];

// Used on the About page and for "Inquire" links on products
window.CONTACT = {
  email: "margaridagregorio.design@gmail.com",
  instagram: "https://www.instagram.com/margaridagregorio/",
};
