# Personal Library REST API (T3.BookManagementAPI)

A REST API built with Node.js and Express to manage a personal reading library. It includes a custom minimalist frontend (Sage & Mauve theme) to track reading progress, completion status, and personal reflections.

**Live demo:** [https://shri-library-api.onrender.com](https://shri-library-api.onrender.com) *(Update this link to your actual Render URL)*

## Features

* **Full CRUD Operations:** Create, read, update, and delete books.
* **Progress Tracking:** Log pages read against total pages; dynamic progress bars.
* **Status Automation:** Automatically shifts status from 'To Read' to 'Reading' or 'Completed' based on page count.
* **Reflections:** Store custom notes and reviews for each book.
* **Integrated UI:** Frontend served directly from the Express backend via `express.static`.

## Tech Stack

Node.js, Express, HTML/CSS/Vanilla JavaScript. Deployed on Render.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/innocentshri/T3.BookManagementAPI.WebDevIntern.git](https://github.com/innocentshri/T3.BookManagementAPI.WebDevIntern.git)
   cd T3.BookManagementAPI.WebDevIntern

2. Install Dependencies:
    npm install

3. Run the server:
    npm start

4. View the App:
    Open http://localhost:3000 in your browser.

## API Endpoints

| Method | Endpoint | Description | Success |
| :--- | :--- | :--- | :--- |
| GET | `/books` | Retrieve all books in the library | 200 |
| POST | `/books` | Add a new book to the library | 201 |
| PUT | `/books/:id` | Update an existing book's details or progress | 200 |
| DELETE | `/books/:id` | Remove a book from the library | 204 |

Request Body (POST & PUT)
When sending a POST or PUT request, send a JSON payload. title and author are required for POST.
{
  "title": "Meditations",
  "author": "Marcus Aurelius",
  "status": "Reading",
  "totalPages": 254,
  "readPages": 105,
  "notes": "Practical stoic philosophy."
}

Error Handling
Missing fields or targeting a non-existent ID returns appropriate HTTP status codes (400, 404) with a JSON error message:
{ "error": "Book not found." }

Project Structure
T3.BookManagementAPI.WebDevIntern/
├── server.js             # Express server API routing and data logic
├── package.json          # Project metadata and dependencies
└── public/               # Static frontend directory
    ├── index.html        # UI Layout
    ├── style.css         # Minimalist Sage/Mauve styling
    └── script.js         # Frontend fetch logic and DOM manipulation


Note
Data is currently stored in-memory using an array. All data resets when the Node server restarts or when Render spins down the free-tier instance after inactivity.
