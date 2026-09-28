# DogsLub 🐾

DogsLub is a friendly marketplace for **adopting, hiring, and responsibly selling dogs**. The public landing page is a React-powered experience with search, filters, dog cards, interest actions, and a working listing form.

## Live website

The root `index.html` runs directly on GitHub Pages (React is loaded from public CDNs), so visitors can open the repository's Pages URL and use the website without a build step.

## Features

- Browse six sample dog listings with breed, age, location, availability, and price
- Search by dog name, breed, or city
- Filter listings by Adopt, Hire, or Sell
- Submit a new listing from the UI; it immediately appears in the pack
- Interest confirmation flow for prospective owners
- Responsive, accessible layout for phones and desktop screens
- Express API with health check, dog search, and listing creation endpoints

## Tech stack

- **Frontend:** React 18, JSX, responsive CSS
- **Backend:** Node.js, Express, CORS
- **Hosting:** The static frontend is GitHub Pages compatible

## Run the Express API locally

Requires Node.js 18+.

```bash
npm install
npm start
```

The API and static website run at `http://localhost:5000`.

### API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Check that the API is running |
| GET | `/api/dogs?q=labrador&mode=Adopt` | Search/filter dogs |
| POST | `/api/dogs` | Add a listing |

Example request:

```bash
curl -X POST http://localhost:5000/api/dogs \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Nala","breed":"Indie","city":"Mumbai","mode":"Adopt"}'
```

## Publish on GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Choose **Deploy from a branch**, select `main`, and select `/ (root)`.
3. Save and open the Pages URL shown by GitHub.

The static React page works on Pages. The Express API is intended for deployment on a Node host such as Render, Railway, or Fly.io; set the frontend API URL there when connecting persistent data.

## Responsible use

Please verify ownership, health records, living conditions, and local animal-welfare requirements before any adoption, sale, or hire. DogsLub is a connection tool and does not replace a shelter, veterinarian, or legal agreement.

## License

MIT
