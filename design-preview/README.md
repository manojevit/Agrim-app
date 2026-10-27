# Design preview — Agrim Suchak app

One **unified app** that reproduces the existing app's design faithfully — same
structure, same content, **all device parameters kept** — only made smoother and
cleaner. The role is decided at login (Facility operator, Block coordinator,
District / Regional / Central). **No cleaner app** — the client only asked for
the supervisor roles. English + Hindi.

Bottom tabs: **Home · Devices · Alerts · Map · Menu.** Blue identity, soft white
cards, AQI/Odour gauges, the full sensor parameter set.

## `App (current — matches original app)/`
The current build, screen by screen:

| # | Screen | What it shows |
|---|--------|---------------|
| 01 | Login | "Welcome back", email/password, OTP, create account, language toggle |
| 02 | Home / Summary | Dashboard·Map toggle, greeting, metric cards (Devices online, Active alerts·critical, Avg AQI, Odour index) with sparklines, summary line, newest alerts, AI mic |
| 03 | Devices | Search + filter, Add device / Scan QR, device list (LS-xxxx · ward · online/offline) |
| 04 | Device detail · Live | AQI & Odour gauges + **every parameter** — NH₃, H₂S, Trimethylamine, Methyl Mercaptan, CO, PM1/PM2.5/PM10, TVOC |
| 05 | Device detail · Trend | AQI 24h chart + average |
| 06 | Device detail · Info | Block path, Serial, Model (EnviroSense-ST), Hardware rev, Firmware, Last seen, Labels |
| 07 | Device · offline | Offline state + unit info |
| 08 | Alerts | Filter chips (Active/Critical/Resolved, Threshold/Offline/Smoke, Handed upward) |
| 09 | Map | Clustered pins + units on this map |
| 10 | Menu / Profile | Edit profile, password, notifications, AI credits, language, settings, sign out |
| 11 | Add device | Serial, claim code, label, choose block, add a new block |
| 12 | Scan QR | Camera frame + paste-code fallback |
| 13 | Search | By device ID or place |
| 14 | Use of this block | Footfall (visits/hour) + privacy note |
| 15 | AI credits | Spend this month, limits, people in your area |
| 16–18 | Hindi | Home, device detail, menu in हिन्दी (toggle in Menu) |

## `0-Onboarding/`
First-run intro. **Copy is pending a refresh** to match this design — the
screenshots here are from the earlier version.

## `_earlier-concept (v0.2 unified app)/`
Archive of an earlier concept. Reference only.

> Note: the per-role app concept (Cleaner / Facility / Block) was dropped after
> review — the client wanted the existing app's design and data preserved, not a
> new structure. Those previews were removed; see git history if needed.
