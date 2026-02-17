# TradeCheck

A mobile-first trading journal PWA for tracking and reviewing trades.

## What It Is
TradeCheck was a personal trading journal that let users log trades, attach screenshots, and review them against their trading rules. Built as a PWA so it works offline and feels like a native app on mobile.

## Features
- **Trade Logging** — Quick entry with screenshot attachments
- **Review System** — Turn trades into lessons learned
- **Calendar View** — Visualize trading activity
- **Auth** — Supabase-backed email/password auth
- **PWA** — Installable, works offline

## Tech Stack
- **HTML/CSS/JS** — Vanilla with Tailwind CSS
- **Supabase** — Auth + backend
- **Service Worker** — Offline capability (sw.js)
- **PWA** — Manifest + mobile-optimized UI

## Status
**Work in progress** — Ultimately the TAM (Total Addressable Market) for a solo-built trading journal app was too small. Competing against established platforms like TradeJournalPro, Edgewonk, and TraderSync is tough without a unique angle. Fun project to build, but paused for now.

## Files
| File | Purpose |
|------|---------|
| `index.html` | Main app (single-page) |
| `sw.js` | Service worker for offline |
| `manifest.webmanifest` | PWA manifest |
| `icons/` | App icons |
