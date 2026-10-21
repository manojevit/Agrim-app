# Design preview — one tailored app per role

**New direction:** the web **dashboard** keeps all management, analytics and
setup. The **mobile app** only carries the on-the-ground actions, and **each
role gets its own focused app** — not one shared app with menus hidden.

### Which roles get a mobile app
| # | Role | App? | Status |
|---|------|------|--------|
| 1 | **Cleaner** | ✅ app | **Built — `1-Cleaner (app)/`** |
| 2 | Facility operator | ✅ app | next |
| 3 | Block coordinator | ✅ light app | after facility |
| — | District / Regional / Central | dashboard only | — |
| — | System administrator | dashboard only | — |

We build **one role at a time, by priority**. Started with the Cleaner.

### `1-Cleaner (app)/` — what the cleaner sees
English, medium/clean sizing. Flow:
1. **My jobs** — count summary, "Clean now" urgent jobs on top, then the rest.
2. **Clean now alert** — the loud takeover when a toilet needs cleaning now.
3. **Job open** — what & why, where to go, directions.
4. **Start cleaning** → 5. **Log with photo** (proof + note) → 6. **Cleaned & logged**.
7. **Done** — today's finished jobs with photo + note.
8. **Me** — building, number, language, help, sign out.

Cleaner can: see today's jobs · get clean-now alerts · mark cleaned with a photo ·
get directions. (All four you asked for.)

### `_earlier-concept (v0.2 unified app)/`
The earlier single-app-with-role-menus version. Kept for reference only — the
per-role apps above replace it.
