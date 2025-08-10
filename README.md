
# Himlay — Complete Static Site (Image-ready)

This package is wired for **local, realistic images** with responsive sizes and a subtle "Himlay" watermark.

## What’s included
- Multi-page static site (HTML/CSS/JS) — offline-ready
- Responsive image wiring with `srcset` for hero, categories, products, artisans, blog, map
- `/image-manifest.json` → prompts & filenames for each required image
- `/assets/images/credits.txt` → license & notes

## How to add images (best workflow)
1. Generate images using the prompts in `image-manifest.json` (via your preferred AI or a photographer brief).
2. Save each generated image to the **exact target filenames** listed (e.g. `assets/images/hero-lg.jpg`, `assets/images/products/tx-001-md.jpg`, etc.).
3. Keep aspect ratios the same and ensure realistic, high-quality output.
4. Open `index.html` with a local server (e.g., `python -m http.server 5500`) and verify responsive loading.

### Watermark
A subtle CSS watermark (`.wm::after`) is applied to key images. Remove by deleting `.wm` classes or the CSS block in `styles.css`.

### Data
- `products.json`: product info with local image paths (sm/md/lg)
- `artisans.json`: artisan profiles with local image paths
- `blog.json`: blog covers with local image paths
- `currency.json`: editable static conversion rates

### Deploy
Drag-drop to Netlify or serve from any static host. All paths are relative and offline-friendly.
