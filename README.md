# SynapseDevs portfolio (MEAN)

Portfolio site for **SynapseDevs** — Code. Connect. Create. Built from the portfolio PRD with MongoDB, Express, Angular, and Node.

The PRD suggested Next.js; this repo follows the requested **MEAN** stack instead, with the same information architecture, branding, and project cards.

## What you get

- Dark UI aligned to the SynapseDevs logo (cyan → purple gradient, neural glow)
- Home, About, Work, Services, Skills, Contact
- Four project cards (Fixt, Real Bearings, Nordic Nook, LPS) with consistent fields and **Visit live site**
- Contact form emails **synapsedevs94@gmail.com** (FormSubmit by default, or Gmail SMTP if you set an app password)
- Testimonials omitted on purpose until real reviews exist
- Open Graph / meta tags for link previews

## Run locally

You need Node.js 18+.

```powershell
cd C:\Users\ANUPAMA\source\repos\synapsedevs-portfolio
npm install
npm run install:all
npm start
```

- Site: http://localhost:4200
- API: http://localhost:3000/api/health

Optional MongoDB (recommended):

```powershell
docker compose up -d
```

Or install MongoDB locally and use `backend/.env` copied from `backend/.env.example`. If Mongo is down, the API still serves seed data so you can demo the UI.

## Contact form

Submissions are emailed to `synapsedevs94@gmail.com`. That is more useful than only storing them in MongoDB.

By default the API uses [FormSubmit](https://formsubmit.co/). The **first** send asks you to confirm the address — check inbox/spam for FormSubmit and click Activate. After that, new enquiries land in Gmail with Reply-To set to the visitor.

Optional, more reliable: create a Gmail App Password and put it in `backend/.env`:

```
CONTACT_EMAIL=synapsedevs94@gmail.com
GMAIL_USER=synapsedevs94@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
```

Then restart the API. Do not commit that password.

## Swap in real content

Edit `backend/src/data/seed.js`:

- Partner name and bios
- Email, WhatsApp, Instagram, LinkedIn
- Each project’s `liveUrl` (replace `/live/...` demo pages with production Netlify URLs)

If Mongo already has documents, update them in the database or drop the `projects` collection and restart the API to re-seed.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/site` | Brand, team, services, skills |
| GET | `/api/projects` | Portfolio grid |
| POST | `/api/contact` | Contact form |
