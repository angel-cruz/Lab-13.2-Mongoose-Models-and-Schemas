# Digital Bookshelf API

A beginner-friendly REST API for managing a library's book inventory.

## Requirements
- Node.js (LTS recommended)
- A MongoDB Atlas cluster or local MongoDB instance

## Setup
1. Extract this project folder.
2. Open a terminal in the `digital-bookshelf-api` directory.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env`.
5. Replace the `MONGO_URI` value in `.env` with your MongoDB connection string.
6. Start the development server:

   ```bash
   npm run dev
   ```

   Or run `npm start` for the normal server.

The API runs at `http://localhost:5000` by default.

## Endpoints

| Method | URL | Purpose |
|---|---|---|
| POST | `/api/books` | Create a book |
| GET | `/api/books` | List all books |
| GET | `/api/books/:id` | Get one book by MongoDB ID |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

## Example request body

Send this as raw JSON to `POST /api/books`:

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565",
  "publishedDate": "1925-04-10",
  "inStock": true
}
```

`title` and `author` are required. `inStock` defaults to `true`. ISBN values must be unique when provided.

## Notes
- `.env` is intentionally not included. Create it from `.env.example`.
- Do not commit `.env` or share your MongoDB credentials.
- MongoDB creates the collection when the first book is inserted.
