# Marga

Portfolio website — plain HTML, CSS and JavaScript. No build step, no installs.

## Pages

| File              | What it is                                                      |
| ----------------- | --------------------------------------------------------------- |
| `index.html`      | Home — full-screen video, one fixed screen                      |
| `jewelry.html`    | Products scattered on the page (click empty space to shuffle)   |
| `product.html`    | One product — opened as `product.html?item=<slug>`              |
| `playground.html` | Infinite grid you drag around with the mouse / trackpad / touch |
| `about.html`      | About text and contact links                                    |

## Editing content

Everything lives in **`js/data.js`**:

- `PROJECTS` — tiles in the playground (images or videos).
- `PRODUCTS` — jewelry pieces: name, price, status, description, photos.
- `CONTACT` — your email and Instagram (used on About and the "Inquire" link).

## Home video

- `assets/video/home.mp4` — landscape video for desktop
- `assets/video/home-mobile.mp4` — portrait video for phones / portrait screens

Use H.264 MP4 (not HEVC `.mov`) so every browser can play it. On a Mac you can
convert with: `avconvert -s in.mov -p Preset1920x1080 -o out.mp4`.
The video plays on a loop, muted.

## Photos

Playground photos live in `assets/images/playground/`, jewelry photos in
`assets/images/jewelry/` — each with a `thumbs/` folder of small versions.
Playground tiles are shown in black & white in the grid and in colour when opened.

## Font

The design uses **Neue Montreal** (free for personal use from Pangram Pangram).
Download it and copy these files into `assets/fonts/`:

- `NeueMontreal-Regular.otf` (or `.woff2`)
- `NeueMontreal-Medium.otf` (or `.woff2`)

Without them the site falls back to Inter, which looks very close.

## Preview locally

Open `index.html` in your browser, or for the most accurate result run a tiny
server from this folder:

```bash
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Publish on GitHub Pages (free, no domain needed)

1. Create a new repository on GitHub, e.g. `marga`.
2. Upload the **contents of this folder** (so `index.html` is at the top level).
3. In the repo go to **Settings → Pages**, choose **Deploy from a branch**,
   branch `main`, folder `/ (root)`, and save.
4. After a minute the site is live at `https://<your-username>.github.io/marga/`.

If you later buy a domain, add it under **Settings → Pages → Custom domain**.
