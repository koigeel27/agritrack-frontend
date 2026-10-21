# AgriTrack — Harvest Logbook

AgriTrack is a web-based harvest logbook for small farmers, developed as part of the **ITE 18 Full Stack Project**. It provides a responsive interface for managing crop records and harvest logs.

## Project Overview

AgriTrack uses a full-stack architecture consisting of the following technologies:

- **Frontend:** Nuxt 3 and Vue 3
- **State Management:** Pinia
- **Backend:** NestJS
- **ORM:** TypeORM
- **Database:** PostgreSQL
- **Hosting:** Render for the deployed API and database

The frontend communicates with the backend through a REST API. Crop and harvest records are managed through the backend and persisted in the database.


## Features

- Farmer and administrator login
- Dashboard for viewing agricultural records and summaries
- Crop listing, creation, editing, and deletion
- Harvest listing, creation, editing, and deletion
- Role-aware interfaces and access-dependent actions
- Form validation and reusable Vue components
- Responsive user interface
- API error handling
- Confirmation dialogs before deleting crop and harvest records

## Project Repositories

- **Frontend:** https://github.com/koigeel27/agritrack-frontend
- **Backend:** https://github.com/koigeel27/agritrack-api

## Requirements

To run the frontend locally, install:

- Node.js 20 or newer
- npm
- Git (optional if downloading the repository as a ZIP file)

Check your installed versions:

```bash
node -v
npm -v
```

## Getting Started — Frontend

### Option A: Download the ZIP

1. Open the [AgriTrack frontend repository](https://github.com/koigeel27/agritrack-frontend).
2. Select **Code → Download ZIP**.
3. Extract the downloaded archive.
4. Open a terminal in the extracted project directory.

### Option B: Clone the Repository

```bash
git clone https://github.com/koigeel27/agritrack-frontend.git
cd agritrack-frontend
```

### Install Dependencies

From the frontend project directory, run:

```bash
npm install
```

### Configure the API URL

Create a `.env` file in the frontend project root, in the same directory as `package.json`.

For the deployed backend, configure:

```dotenv
NUXT_PUBLIC_API_BASE=https://agritrack-api-syhb.onrender.com/api
```

The frontend must be configured to read `NUXT_PUBLIC_API_BASE` through the application's Nuxt configuration or runtime configuration.

Do not place database passwords, JWT secrets, or other private credentials in the frontend environment file. Do not commit `.env` files containing secrets to GitHub.

After changing environment variables, restart the development server.

### Start the Frontend

```bash
npm run dev
```

Open the local application at:

http://localhost:3000

Keep the terminal running while using the application.

> **Note:** The frontend can communicate with the deployed API without requiring a local PostgreSQL installation, provided the API and database are available. Changes made through the application may affect shared demonstration data.

## Demo Accounts

The following demonstration accounts are provided for project testing, subject to their availability in the deployed backend.

| Role | Email | Password |
|---|---|---|
| Farmer | `farmer@agritrack.test` | `Farmer123!` |
| Farmer | `farmer2@agritrack.test` | `Farmer123!` |
| Administrator | `admin@agritrack.test` | `Admin123!` |

These credentials should be used only if they are intentionally configured as project demonstration accounts. Account availability depends on the backend database configuration.

If an account cannot log in, verify the backend's availability and contact the project maintainer.

Do not use demonstration accounts for real personal information or sensitive data.

## Backend API

**API Base URL**

```text
https://agritrack-api-syhb.onrender.com/api
```

**API Documentation**

```text
https://agritrack-api-syhb.onrender.com/api/docs
```

The backend provides endpoints for authentication, crop management, harvest management, and user-related operations.

The frontend uses the API base URL configured through `NUXT_PUBLIC_API_BASE`.

## Running the Backend Locally

To develop the backend locally:

1. Clone or download the [AgriTrack backend repository](https://github.com/koigeel27/agritrack-api).
2. Follow the backend repository's README for installation instructions and prerequisites.
3. Configure the required environment variables according to the backend's documentation.
4. Set up a PostgreSQL database that you are authorized to use.
5. Start the backend using its documented development command.
6. Update the frontend's `.env` file to point to the local API URL, including the `/api` prefix if required by the backend configuration.

Use the actual port configured by the backend. Do not assume the example port is correct.

Never copy production database credentials into shared files or commit secrets to GitHub.

## Application Routes

The following table lists the primary application routes.

| Route | Purpose |
|---|---|
| `/login` | User login |
| `/` | Dashboard |
| `/crops` | View crop records |
| `/crops/new` | Create a crop record |
| `/crops/[id]/edit` | Edit a crop record |
| `/harvests` | View harvest records |
| `/harvests/new` | Create a harvest record |
| `/harvests/[id]/edit` | Edit a harvest record |

Available actions may depend on the authenticated user's role and the permissions enforced by the backend.

## Integration Verification

The following workflows have been reported as tested against the deployed API:

- Login using farmer and administrator demonstration accounts
- Crop creation and editing
- Harvest creation and editing
- Harvest deletion
- Retrieval of crop and harvest records through the API
- Verification of persisted changes in PostgreSQL for the tested operations

These checks cover selected application workflows. They do not constitute a complete security audit or guarantee that every authorization, validation, or error-handling scenario has been tested.

For repeatable verification, confirm that each operation succeeds in the application, inspect the corresponding API response in the browser's Network tab, and verify persisted changes using authorized database access when available.

## Troubleshooting

### Frontend Cannot Connect to the API

- Confirm that `.env` exists in the frontend project root.
- Verify that `NUXT_PUBLIC_API_BASE` contains the correct API base URL.
- Confirm that the application reads this variable in its Nuxt configuration.
- Restart the development server after changing `.env`.
- Check the browser's Network tab and terminal output for errors.
- Confirm that the deployed API is reachable.

### Login Fails

- Check the demonstration account credentials.
- Confirm that the backend is available.
- Inspect the login request and response status in the browser's Network tab.
- Check whether the account exists in the backend database.
- Do not share authentication tokens or passwords in screenshots or support messages.

### Changes Do Not Appear

- Refresh the page and inspect the API response.
- Check the relevant request in the browser's Network tab.
- Confirm that the operation succeeded before checking the database.
- If authorized database access is available, verify the affected record in the correct database.

### IF Port 3000 Is Already in Use

Run the development server on another port:

```bash
npx nuxt dev --port 3001
```

Then open:

http://localhost:3001

## Project Information

- **Project:** AgriTrack — Harvest Logbook
- **Course:** ITE 18 — Application Development and Emerging Technologies
- **Project Track:** Full Stack
- **Frontend Framework:** Nuxt 3
- **Backend Framework:** NestJS
- **Database:** PostgreSQL

AgriTrack is a student project intended for educational and demonstration purposes.