# AgriTrack: Harvest Logbook (Frontend)

ITE 18 midterm project, Agriculture sector, frontend track.
Nuxt 3 + Vue 3 + Pinia. Farmers log their crops and harvests; an admin can view everything (read-only).
The data comes from a mock API in `server/api` until the real backend is ready.

## Requirements
- Node.js 20 or newer (check with `node -v`)

## Run it
```
npm install
npm run dev
```
Open http://localhost:3000

## Demo accounts (mock)
| Role   | Email                   | Password    |
| ------ | ----------------------- | ----------- |
| Farmer | farmer@agritrack.test   | Farmer123!  |
| Farmer | farmer2@agritrack.test  | Farmer123!  |
| Admin  | admin@agritrack.test    | Admin123!   |

Mock data lives in memory: it resets whenever the server restarts.

## Screens
`/login` · `/` Dashboard · `/crops` · `/crops/new` (farmer) · `/harvests` · `/harvests/new` (farmer)

## Troubleshooting
- `npm install` fails with `ERESOLVE`: run `npm install --legacy-peer-deps`.
- Half-finished install: delete `node_modules` and `package-lock.json`, then run `npm install` again.
- Permission errors (`EPERM`/`EACCES`): move the folder out of OneDrive or a protected folder.
- Port 3000 busy: `npx nuxt dev --port 3001`.
- `npm warn deprecated` lines are normal.

## Connecting the real backend (Final)
1. Set `NUXT_PUBLIC_API_BASE` (for example in a `.env` file) to the backend URL, such as `https://your-api.onrender.com/api`.
2. Delete `server/api` and `server/utils` (the mock).
3. Fix any field-name differences in `stores/*.ts` and `composables/useApi.ts`.

## Where things are
- `pages/` screens · `components/` reusable parts · `stores/` Pinia state
- `composables/useApi.ts` the only code that calls the API
- `middleware/auth.global.ts` route guard (sign-in and role)
- `assets/css/main.css` colors, spacing, breakpoints
- `docs/` wireframes and screenshots
