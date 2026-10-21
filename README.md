# Agrim Suchak — Mobile App Prototype

A **redesigned, simpler** mobile app for Agrim Suchak (the toilet air-quality
monitoring platform). This is a **frontend / design prototype** built in
**React Native + Expo** with **dummy data**. No backend, no real sensors —
the goal is to agree on *how the app should look and how content is shown*
before the full app is built.

## The core idea of the redesign

The current app shows **scientist data** (`AQI 497`, `NH₃ 7.06 ppm`,
`PM2.5 µg/m³`, `Handed upward`) and **device serials** (`LS-0001`). A normal
user or a cleaner cannot tell what any of it means or what to do next.

This prototype fixes that with four rules:

1. **Plain language first.** `AQI 497 Severe` → **"Smells bad — clean now"**.
   The science is still there, tucked under a *"Show the detailed readings"* tap.
2. **Real places, not serials.** `LS-0001` → **"Gents toilet 2 · CTC Saket Block A"**.
3. **Every screen answers "what do I do?"** — one clear button
   (*Send a cleaner*, *Mark as cleaned*, *I'm on it*, *Pass to my senior*).
4. **One status scale everyone learns in 5 seconds:**
   🟢 Good · 🟡 Keep an eye · 🔴 Clean now · ⚪ No signal.

## Roles

Six roles, each sees only their own area. The app adapts per role:

| Role | Home shows | Extra menu |
|------|-----------|-----------|
| **Facility operator** | Your toilets + today's jobs | — |
| **Block coordinator** | Blocks that need you | Alert rules |
| **District coordinator** | District overview | Reports, Voice assistant, AI credits |
| **Regional supervisor** | Region overview | Reports, Assistant |
| **Central manager** | Whole estate | + People & roles, Hierarchy |
| **System administrator** | Platform health | + Device registry, Billing |

> **Reviewing all six roles:** On the login screen tap any role under
> **"Preview as a role"**, or use the **Switch** button (top-right of Home,
> or in Menu) any time. This is a prototype shortcut, not a real login.

## Run it

```bash
cd agrim-suchak-app
npm install        # first time only
npx expo start     # then press 'a' (Android), 'i' (iOS), or 'w' (web)
```

Or scan the QR code with **Expo Go** on your phone.

## What's built (v0.1)

- Login / role picker
- Home (role-aware dashboard)
- Toilets list (filter by plain status) + Toilet detail (plain meters + science)
- Alerts list + Alert detail (with a 6-step progress line and actions)
- Cleaning (jobs, mark-as-cleaned, call a cleaner, recent log)
- Menu (role-gated) + Switch role
- Admin: People & roles, Estate hierarchy

## Not built yet (next, after your review)

Reports, Alert rules editor, Staff & calls, Voice assistant, AI credits,
Device registry, Billing, Map. These are stubbed in the Menu so you can see
where they live. We'll build them once the design direction is approved.

## Project structure

```
src/
  app/            # screens (Expo Router — file-based routing)
    (tabs)/       # Home, Toilets, Alerts, Cleaning, Menu
    toilet/[id]   # toilet detail
    alert/[id]    # alert detail
    admin/        # users, hierarchy
  components/      # reusable UI (Card, StatusBadge, ToiletRow, LevelMeter…)
  data/            # ALL dummy data lives here (toilets, alerts, cleaning, roles…)
  context/         # session (current role)
  theme/           # colours, spacing, the one status scale
  i18n/            # English strings — structured so Hindi drops in later
```

All dummy data is in `src/data/` — easy to swap for real API calls later.
All UI text goes through `t()` in `src/i18n/` so Hindi can be added without
touching the screens.
