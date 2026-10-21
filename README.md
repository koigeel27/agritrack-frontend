# AgriTrack — Harvest Logbook

A web-based harvest logbook for small farmers, developed for the **ITE 18 Full Stack project**. AgriTrack helps farmers manage crop records and harvest logs through a responsive web interface.

## Project Overview

AgriTrack uses a full-stack architecture:

- **Frontend:** Nuxt 3, Vue 3, Pinia, and TypeScript
- **Backend:** NestJS and TypeORM
- **Database:** PostgreSQL
- **Hosting:** Render for the deployed API and database

The frontend communicates with the backend through a REST API. Crop and harvest operations are persisted in PostgreSQL.

## Features

- Farmer and administrator login
- Dashboard for viewing agricultural records and summaries
- Crop listing, creation, editing, and deletion
- Harvest listing, creation, editing, and deletion
- Role-aware interfaces
- Form validation and reusable Vue components
- Responsive user interface
- API error handling

## Repositories

- **Frontend:** https://github.com/koigeel27/agritrack-frontend
- **Backend:** https://github.com/koigeel27/agritrack-api

## Requirements

Install the following before running the frontend locally:

- Node.js 20 or newer
- npm
- Git (optional if downloading ZIP files)

Check your versions:

```bash
node -v
npm -v
```

## Getting Started — Frontend

### Option A: Download the ZIP

1. Open the frontend repository on GitHub.
2. Click **Code → Download ZIP**.
3. Extract the ZIP file.
4. Open a terminal in the extracted project folder.

### Option B: Clone the repository

```bash
git clone https://github.com/koigeel27/agritrack-frontend.git
cd agritrack-frontend
```

### Install dependencies

From the frontend project directory, run:

```bash
npm install
```

### Configure the API URL

Create a `.env` file in the frontend project root, alongside `package.json`.

For the deployed backend, add:

```dotenv
NUXT_PUBLIC_API_BASE=https://agritrack-api-syhb.onrender.com/api
```

This URL points the frontend to the deployed AgriTrack API.

Do not add database passwords, JWT secrets, or other private credentials to the frontend environment file. Do not commit `.env` files to GitHub.

### Start the frontend

```bash
npm run dev
```

Open:

http://localhost:3000

Keep the terminal running while using the application.

> **Note:** The frontend can use the deployed API without installing PostgreSQL locally, provided the deployed backend and database are available and the API accepts the request. Changes made through the connected application may affect shared demo data.

## Demo Accounts

Use the following project demonstration accounts when they are available in the deployed backend:

| Role | Email | Password |
|---|---|---|
| Farmer | `farmer@agritrack.test` | `Farmer123!` |
| Farmer | `farmer2@agritrack.test` | `Farmer123!` |
| Admin | `admin@agritrack.test` | `Admin123!` |

Account availability depends on the backend database configuration. If an account cannot log in, contact the project maintainer rather than changing production data.

These are demonstration credentials, not accounts for real personal information.

## Backend API

**Base URL:**

```text
https://agritrack-api-syhb.onrender.com/api
```

**API documentation:**

```text
https://agritrack-api-syhb.onrender.com/api/docs
```

The backend provides authentication, crop, harvest, and user-related endpoints.

The frontend uses the API base URL configured through `NUXT_PUBLIC_API_BASE`.

## Running the Backend Locally

To develop the backend locally:

1. Download or clone the backend repository:

   https://github.com/koigeel27/agritrack-api

2. Follow the backend repository's README for prerequisites and installation.
3. Configure the required environment variables using its environment example or setup instructions.
4. Configure a PostgreSQL database that you are authorized to use.
5. Start the backend using the documented development command.
6. Update the frontend `.env` file to point to the local API URL, including its `/api` prefix.

For example, if the local API runs on port 3000, use the actual port configured by the backend rather than assuming the example port is correct.

Do not copy production database credentials into shared files or commit secrets to GitHub.

## Application Routes

| Route | Purpose |
|---|---|
| `/login` | Login |
| `/` | Dashboard |
| `/crops` | Crop list |
| `/crops/new` | Create a crop |
| `/crops/[id]/edit` | Edit a crop |
| `/harvests` | Harvest list |
| `/harvests/new` | Create a harvest |
| `/harvests/[id]/edit` | Edit a harvest |

Available actions depend on the authenticated user's role and backend permissions.

## Integration Verification

The following integration checks were performed against the deployed API and PostgreSQL database:

- Successful login through the application for farmer and administrator accounts
- Crop creation verified in PostgreSQL
- Crop editing verified in PostgreSQL
- Harvest creation verified in PostgreSQL
- Harvest editing verified in PostgreSQL
- Harvest deletion verified by checking that the deleted record was absent from PostgreSQL
- Crop and harvest records returned by the API

These checks verify the tested workflows. They do not constitute a complete security audit or guarantee that every authorization and error-handling scenario has been tested.

## Troubleshooting

### Frontend cannot connect to the API

- Verify that `.env` exists in the frontend project root.
- Confirm `NUXT_PUBLIC_API_BASE` contains the correct API base URL.
- Restart the development server after changing `.env`.
- Check the browser's Network tab and the terminal for errors.
- Confirm the deployed API is reachable.

### Login fails

- Check that you are using the correct demo account.
- Confirm the backend is available.
- Check the Network tab for the login request and response status.
- Do not share authentication tokens or passwords in screenshots or support messages.

### Changes do not appear

- Refresh the page and check the API response.
- Inspect the relevant request in the browser's Network tab.
- Confirm the operation succeeded before checking PostgreSQL.
- If you have database access, verify the affected record in the correct database.

### Port 3000 is already in use

Run the development server on another port:

```bash
npx nuxt dev --port 3001
```

Then open:

http://localhost:3001

## Project Information

- **Project:** AgriTrack — Harvest Logbook
- **Course:** ITE 18 — Application Development and Emerging Technologies
- **Track:** Full Stack
- **Frontend:** Nuxt 3
- **Backend:** NestJS
- **Database:** PostgreSQL

AgriTrack is a student project intended for educational and demonstration purposes.