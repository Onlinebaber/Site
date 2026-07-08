# Online Barber site

This repository now uses a GitHub Pages-friendly structure with the main pages at the repository root and the supporting assets in dedicated folders.

## Structure

```
.
├── index.html
├── shop.html
├── .nojekyll
├── assets/
│   ├── css/style.css
│   ├── images/online-barber-logo.webp
│   ├── images/team-photo.jpg
│   └── js/{booking,cart,shop,testimonials}.js
├── data/
│   ├── products.json
│   └── testimonials.json
└── assets/catalog/...
```

## Run locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## GitHub Pages

1. Push the repository to GitHub.
2. Open the repository settings and enable GitHub Pages.
3. Choose the main branch and the root folder.
4. The site will be published at the repository Pages URL.

## Content updates

- Edit [data/products.json](data/products.json) to update products, prices, and images.
- Edit [data/testimonials.json](data/testimonials.json) to add client reviews.
- Replace placeholder WhatsApp details in [assets/js/cart.js](assets/js/cart.js) and [assets/js/booking.js](assets/js/booking.js).
- Replace the placeholder brand assets in [assets/images](assets/images) and [assets/catalog](assets/catalog) with real files.

## Catalog image layout

Each product uses its own folder under [assets/catalog](assets/catalog) with a main image file such as main.jpg or main.svg.

Example:

```text
assets/catalog/hair-products/product-1/main.jpg
```
