# Catalog folder structure

Each product gets its own folder with its image(s) inside. The site reads
product info (name, price, description, sizes) from `/data/products.json` —
that file just points at the image path inside these folders.

```
assets/catalog/
├── hair-products/
│   ├── product-1/   → main.svg (placeholder — replace with main.jpg)
│   ├── product-2/
│   └── product-3/
├── brushes/
│   └── brush-1/
└── clothing/
    ├── tshirts/
    ├── hoodies/
    └── tracksuits/
```

## Adding a real photo

1. Drop your photo into the matching folder, e.g. `hair-products/product-1/main.jpg`
2. Open `data/products.json`
3. Update that product's `"image"` field to point at the new file, e.g.
   `"image": "assets/catalog/hair-products/product-1/main.jpg"`
4. Update `"name"`, `"price"`, and `"description"` while you're there

## Adding a brand new product

1. Create a new folder, e.g. `assets/catalog/hair-products/product-4/`
2. Add your photo inside it
3. Copy an existing product entry in `data/products.json`, paste it into the
   same category array, and edit the id/name/price/description/image path

## Clothing sizes

Clothing items have a `"sizes"` array, e.g. `["S", "M", "L"]`. Add or remove
sizes there — the shop page renders whatever sizes you list. Hair products
and brushes should keep `"sizes": null` since they don't need sizing.

Recommended photo size: roughly square, at least 800×800px, JPG or PNG.
