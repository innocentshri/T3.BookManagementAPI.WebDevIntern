const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// In-memory data store for books
let books = [];
let currentId = 1;

// GET /books - Return all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required.' });
    }

    const newBook = {
        id: currentId++,
        title,
        author
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;
    
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found.' });
    }

    // Update the fields if provided, otherwise keep existing
    books[bookIndex].title = title || books[bookIndex].title;
    books[bookIndex].author = author || books[bookIndex].author;

    res.status(200).json(books[bookIndex]);
});

// DELETE /books/:id - Remove a book
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found.' });
    }

    books.splice(bookIndex, 1);
    res.status(204).send(); // 204 No Content for successful deletion
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});