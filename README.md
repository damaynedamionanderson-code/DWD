# Damayne Web Design - Management Guide

This guide shows how to run, update, and maintain your website.

## 1. Project Structure

- `frontend/` - website pages and assets
  - `frontend/index.html` - home page
  - `frontend/services.html` - services/pricing page
  - `frontend/about.html` - about page
  - `frontend/contact.html` - contact page
  - `frontend/assets/css/main.css` - all site styles
  - `frontend/assets/js/` - modular frontend JavaScript
- `backend/` - Express server and API
  - `backend/src/server.js` - server entry point
  - `backend/src/app.js` - app setup and routing
  - `backend/src/routes/inquiries.js` - API routes
  - `backend/src/services/inquiryService.js` - inquiry storage logic
  - `backend/src/utils/validation.js` - inquiry validation
  - `backend/data/inquiries.jsonl` - saved form submissions
- `legacy/` - older files kept as backup/reference

## 2. Start the Website Locally

From project root:

```bash
cd "/home/damaynedamionanderson/code/Side Hustle"
npm start
```

Open:

- `http://localhost:3000`

Stop server with `Ctrl + C`.

## 3. How to Update Website Content

### Home/About/Services/Contact text

Edit the HTML pages in `frontend/`:

- `frontend/index.html`
- `frontend/services.html`
- `frontend/about.html`
- `frontend/contact.html`

### Prices and package details

Edit the pricing cards in:

- `frontend/services.html`

### Contact links (PayPal, email, phone)

Edit in:

- `frontend/contact.html`

## 4. How to Change Design / Layout

All styling is centralized in:

- `frontend/assets/css/main.css`

Use existing reusable classes when possible:

- layout: `.container`, `.grid-3`, `.stack-sm`, `.stack-md`, `.stack-lg`
- surfaces/cards: `.surface`, `.card`
- buttons: `.btn`, `.btn-ghost`, `.btn-small`, `.btn-block`

If editing responsive behavior, update the media query section near the bottom of `main.css`.

## 5. JavaScript Overview

### Frontend modules

- `frontend/assets/js/site.js` - shared page behavior
- `frontend/assets/js/contact-page.js` - contact page behavior
- `frontend/assets/js/modules/header.js` - sticky header state
- `frontend/assets/js/modules/reveal.js` - reveal animations
- `frontend/assets/js/modules/contact-form.js` - form submit flow
- `frontend/assets/js/modules/api.js` - API requests

### Backend modules

- `backend/src/routes/inquiries.js` handles API endpoints
- `backend/src/utils/validation.js` validates request data
- `backend/src/services/inquiryService.js` writes submissions to file

## 6. Contact Form and Inquiry Management

Form submissions are saved line-by-line JSON in:

- `backend/data/inquiries.jsonl`

View submissions:

```bash
cat backend/data/inquiries.jsonl
```

Clear submissions:

```bash
: > backend/data/inquiries.jsonl
```

## 7. API Endpoints

- `GET /api/health` - health check
- `POST /api/inquiries` - submit inquiry

Example request:

```bash
curl -X POST http://localhost:3000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Owner",
    "email": "alex@example.com",
    "business": "Alex Fitness",
    "package": "growth",
    "details": "Need a conversion-focused website."
  }'
```

## 8. Maintenance Checklist

Before pushing updates:

1. Start server with `npm start`.
2. Test all pages: Home, Services, About, Contact.
3. Submit a test contact form.
4. Check mobile layout in browser dev tools.
5. Confirm no text overlap or broken buttons.

## 9. Deployment Notes

- Production runs by starting `backend/src/server.js` (already wired to `npm start`).
- Server statically serves files from `frontend/`.
- Keep `backend/data/inquiries.jsonl` writable in production.

## 10. Troubleshooting

### Port already in use

Use another port:

```bash
PORT=3001 npm start
```

### Styles not updating

Hard refresh browser:

- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### Form not submitting

Check:

1. Server is running.
2. Browser console for JS errors.
3. `backend/data/inquiries.jsonl` write permissions.

---

If you want, I can also add a short non-technical `OWNER_GUIDE.md` for day-to-day edits without code details.
