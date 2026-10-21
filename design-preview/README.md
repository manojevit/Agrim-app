# Design preview — one tailored app per role

The web **dashboard** keeps all management, analytics and setup. The **mobile
app** only carries on-the-ground actions, and **each role gets its own focused
app**. Built on React Native Paper + Plus Jakarta Sans, with a distinctive
indigo identity (hero header + progress ring), not templated card-soup.

### Which roles get a mobile app
| # | Role | App? | Status |
|---|------|------|--------|
| 1 | **Cleaner** | ✅ | **Built — `1-Cleaner (app)/`** |
| 2 | **Facility operator** | ✅ | **Built — `2-Facility operator (app)/`** |
| 3 | Block coordinator | ✅ light | next |
| — | District / Regional / Central / System | dashboard only | — |

### Login (shared)
Clean, professional sign-in. **It does not expose roles** — the account (email)
decides the role, like a real backend. For this prototype, switch roles from
inside the app with the **Switch** button (top-right / Me tab).

### `1-Cleaner (app)/`
My jobs (hero + progress ring) · clean-now alert · job open · log with photo
(required) · cleaned · done history · me.

### `2-Facility operator (app)/`
Looks after one building. Home (ring of toilets good + what needs attention +
open-alerts banner) · toilets (filterable) · toilet detail (plain Smell/Air
meters, send cleaner / mark cleaned, science on tap) · offline sensor ·
alerts · alert detail (progress + acknowledge / send cleaner / pass up) · me.

### `_earlier-concept (v0.2 unified app)/`
The earlier single-app-with-role-menus version. Reference only.
