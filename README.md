# AgriTrack: Harvest Logbook (Frontend)

AgriTrack is a web-based harvest logbook developed for the ITE 18 midterm project under the Agriculture sector. It helps farmers manage crop records and harvest logs through a responsive web interface.

The application is built with **Nuxt 3, Vue 3, and Pinia**. The current frontend demonstration uses a mock API. Backend integration is planned as a future step.

## Features

- Dashboard for viewing agricultural records and summary information
- Farmer and administrator login flows
- Crop listing, creation, and editing
- Harvest listing, creation, and editing
- Role-based interface: farmers manage their own records, while administrators have a view-only interface
- Reusable Vue components and Pinia stores
- Responsive styling and form validation

## Technology Stack

- Nuxt 3
- Vue 3
- Pinia
- TypeScript
- CSS

## Requirements

- Node.js 20 or newer
- npm

Check your installed versions:

```bash
node -v
npm -v
```

## Getting Started

Clone the repository and enter the project directory:

```bash
git clone https://github.com/koigeel27/agritrack-frontend.git
cd agritrack-frontend
```

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Accounts

The mock authentication system provides the following demo accounts:

| Role | Email | Password |
|---|---|---|
| Farmer | `farmer@agritrack.test` | `Farmer123!` |
| Farmer | `farmer2@agritrack.test` | `Farmer123!` |
| Admin | `admin@agritrack.test` | `Admin123!` |

Use these credentials only with the local mock application.

## Application Routes

| Route | Purpose |
|---|---|
| `/login` | Login page |
| `/` | Dashboard |
| `/crops` | Crop list |
| `/crops/new` | Create a crop |
| `/crops/[id]/edit` | Edit a crop |
| `/harvests` | Harvest list |
| `/harvests/new` | Create a harvest |
| `/harvests/[id]/edit` | Edit a harvest |

Some actions are restricted according to the user's role.

## Mock API and Data

The current demonstration uses mock API handlers located in `server/api` and related server utilities.

- Mock records are stored in memory and reset when the server restarts.
- The mock application is intended for frontend development and demonstration.
- Mock authentication and data should not be treated as production security or persistent storage.

## Connecting the Real Backend

The frontend can be configured to use a backend API through the `NUXT_PUBLIC_API_BASE` runtime configuration.

For example, a local `.env` file may contain:

```dotenv
NUXT_PUBLIC_API_BASE=https://your-api-host.example/api
```

Replace the example URL with the actual backend API base URL.

Before switching from mock data to the real backend:

1. Verify the backend URL and API endpoints.
2. Confirm authentication and role permissions.
3. Check for differences between frontend and backend field names.
4. Test loading, creating, updating, and error handling.
5. Retain the mock API until the real integration has been verified.

Do not commit `.env` files or credentials to GitHub.

## Project Structure

```text
assets/css/       Global styles and images
components/       Reusable Vue components
composables/      Shared composables, including API access
layouts/          Application layouts
middleware/       Route and authentication guards
pages/            Application pages and routes
server/api/       Mock API handlers
stores/           Pinia state management
utils/             Shared utility functions
docs/              Project documentation and design materials
```

## Troubleshooting

**Dependency installation fails**

Try the recommended dependency resolution approach for your project before changing package versions. Use `npm install --legacy-peer-deps` only if an `ERESOLVE` conflict requires it.

**Port 3000 is already in use**

```bash
npx nuxt dev --port 3001
```

Then open [http://localhost:3001](http://localhost:3001).

**Changes do not appear**

Refresh the browser and check the development server terminal for errors.

## Project Information

- **Project:** AgriTrack — Harvest Logbook
- **Course:** ITE 18
- **Track:** Frontend
- **Repository:** [koigeel27/agritrack-frontend](https://github.com/koigeel27/agritrack-frontend)

AgriTrack is a student project intended for educational and demonstration purposes.