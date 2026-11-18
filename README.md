# tekxone

A React + Vite agency website with an interactive Three.js neural hero, a static service catalog, and WhatsApp-based service orders. No database or backend server is used.

## Run locally

1. Install dependencies:

   ```sh
   npm install
   ```

2. Set `VITE_WHATSAPP_NUMBER` in `.env` to the business WhatsApp number in international format using digits only (country code included, no `+`, spaces, or dashes). The provided `.env.example` is prefilled with the tekxone number.

3. Start the website:

   ```sh
   npm run dev
   ```

Vite runs at `http://localhost:5173`. Service and contact forms open WhatsApp with a prefilled message; the customer sends the message from WhatsApp to place the order. The service list is maintained in `src/lib/services.js`.

## Production

Set `VITE_WHATSAPP_NUMBER` in the deployment environment before building with `npm run build`, then host the generated `dist/` directory. Orders are sent directly to WhatsApp and are not stored by the website.

The GitHub Actions workflow deploys the site to GitHub Pages when changes are pushed to `main`. Add `VITE_WHATSAPP_NUMBER` as a repository Actions variable under **Settings → Secrets and variables → Actions → Variables**.

## Checks

```sh
npm run build
npm run lint
```
