# DogsLub 🐾

DogsLub is a modern dog marketplace where people can browse, hire, adopt, and sell dogs. This project has been rebuilt as a real React frontend and Express backend so it works properly as a web application.

## Features

- Search and filter listings
- Browse dog cards with price, type, and city
- Add a new dog listing from the website form
- Remove listings from the UI
- Responsive design for desktop and mobile
- Express API for dogs data

## Tech stack

- React + Vite + JavaScript
- Express + Node.js
- REST API with in-memory data storage

## Run locally

### 1) Install dependencies

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 2) Start the backend

```bash
npm run dev --prefix backend
```

### 3) Start the frontend

Open a second terminal and run:

```bash
npm run dev --prefix frontend
```

Then open:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api/health

## API routes

- `GET /api/health`
- `GET /api/dogs`
- `POST /api/dogs`
- `DELETE /api/dogs/:id`

## Important note

The repository also contains older static HTML files from the previous version. Those are legacy files and are not part of the new React system. The working app is now built from the `frontend` and `backend` folders.

## License

MIT
