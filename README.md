# Online Barber — Website

Static site: home/booking page (`index.html`) + shop page (`shop.html`).
No backend — orders and bookings are sent via WhatsApp.

## Run locally

```
python3 -m http.server 8080
```
Then open `http://localhost:8080`. (Opening the HTML file directly with
`file://` will NOT load the product catalog — `fetch()` needs a server.)

## Deploy to GitHub Pages

1. Push this folder to a repo named `<username>.github.io`, or any repo
   with GitHub Pages enabled on the `main` branch, root folder.
2. Site goes live at `https://<username>.github.io/` (or the repo's Pages URL).

## MUST DO before launch

- [ ] **WhatsApp number** — open `assets/js/cart.js`, replace `WHATSAPP_NUMBER`
      with the real number (country code + number, no spaces/+/leading 0).
      This one variable powers both shop checkout and booking submissions.
- [ ] **Real product photos + prices** — see `assets/catalog/README.md`.
      All prices are currently R0 placeholders.
- [ ] **Services & prices** — edit the Services section in `index.html` and
      the matching `<select>` options in the booking form to match what you
      actually offer.
- [ ] **Team section** — replace the three "Name / Role" founder slots in
      `index.html` (`#team` section) with real names, roles and a short bio
      for each founder, plus your studio's origin story.
- [ ] **Testimonials** — edit `testimonials.json` with real client reviews.
- [ ] **Contact section** — add your real address, hours and WhatsApp number
      in `index.html` (`#contact` section).

## Nice-to-have later

- Swap the WhatsApp-only booking flow for a real backend (e.g. a Google
  Apps Script + Google Sheets/Calendar, like many salon sites use) if you
  want bookings to land automatically in a calendar instead of a chat.
- Add more product photos per item (the current setup shows one image per
  product; a small gallery is a straightforward addition later).

## File map

```
index.html              Home: hero, services, team/about, testimonials, booking, contact
shop.html                Shop: category tabs + product grid
data/products.json       All product info — edit this to manage the catalog
testimonials.json        Client reviews shown on the homepage
assets/css/style.css     All styling
assets/js/cart.js        Cart state + WhatsApp checkout (WHATSAPP_NUMBER lives here)
assets/js/shop.js        Renders the shop page from products.json
assets/js/booking.js     Booking form + WhatsApp submission
assets/js/testimonials.js  Renders testimonials.json on the homepage
assets/catalog/          Product photos, organized by category/product
assets/images/           Logo + team photo
```
