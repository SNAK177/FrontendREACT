# Cosa è stato corretto

Sostituisci questi file nel progetto con quelli di questo zip (stessi path relativi a `bblt-zen/`).

1. **src/App.jsx** — rimossi i `<Link>` passati come children a `<Navigation>` (non venivano mai renderizzati e `Link` non era nemmeno importato → `ReferenceError` che rompeva l'app).

2. **src/components/QRScanner.jsx** + **src/utils/qrDetector.js** — il rilevamento QR non catturava mai un frame reale: ora `qrDetector.js` disegna il frame del video su un canvas (`drawImage` + `getImageData`) prima di chiamare `jsQR`. In `QRScanner.jsx`:
   - la chiamata `handleQRCodeDetected(result)` non era più commentata;
   - sostituito il vecchio `setCurrentPage("menu")` (mai passato come prop, causava un crash su inserimento manuale tavolo) con `useNavigate()` di react-router;
   - corretto `setTableNumber` (proprietà inesistente nel context) in `setCurrentTable`, quella vera esposta da `useCart`.

3. **src/pages/HomePage.jsx** — rimosso il prop `setCurrentPage`, non più necessario con react-router.

4. **src/pages/MenuPage.jsx** — corretto l'import `'../components/productcard.jsx'` (minuscolo) in `'../components/ProductCard.jsx'`: il mismatch di case funzionava solo su filesystem case-insensitive (Windows/Mac), rompeva la build su Linux/Vercel/Netlify.

5. **src/pages/CustomPage.jsx** — rimossi i campi morti `id`/`name`/`price` nello stato iniziale (valori letterali `String | Number`, mai effettivamente usati).

6. **src/context/CartContext.jsx** — `addToCart` e `updateQuantity` ora creano un nuovo oggetto item invece di mutare quello già in `cart` (anti-pattern di immutabilità).

7. **src/server/server.js** — aggiunta persistenza reale degli ordini su `orders.json` (prima c'era solo un `console.log` e un TODO), più un endpoint `GET /api/orders` per leggerli.

8. **vite.config.js** (nuovo) — aggiunto `server.proxy` per instradare `/api/*` al backend Express sulla porta 5000 in sviluppo. Se hai già un vite.config.js, uniscici solo il blocco `server.proxy`.

9. **.env.example** (nuovo) — variabili necessarie: `VITE_STRIPE_PUBLIC_KEY` (frontend) e `STRIPE_SECRET_KEY` + `PORT` (backend). Copialo in `.env` e inserisci le tue chiavi Stripe di test.

# Da fare manualmente

- **Cancella questi file**, sono duplicati morti del context reale e non sono referenziati da nessuna parte:
  - `src/hooks/CartContext.js`
  - `src/hooks/CartProvider.js`
  - `src/hooks/YourComponent.js`
- Verifica che `src/assets/qrframe.png` esista davvero nel progetto (usato da QRScanner).
- Popola `.env` con le tue chiavi Stripe di test prima di provare il pagamento.
