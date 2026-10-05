const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let books = [];
let currentId = 1;

app.get('/books', (req, res) => {
    res.status(200).json(books);
});

app.post('/books', (req, res) => {
    const { title, author, status, notes, totalPages } = req.body;
    
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required.' });
    }

    const newBook = {
        id: currentId++,
        title,
        author,
        status: status || 'To Read',
        notes: notes || '',
        totalPages: parseInt(totalPages) || 0,
        readPages: 0
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author, status, notes, readPages, totalPages } = req.body;
    
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex === -1) return res.status(404).json({ error: 'Book not found.' });

    books[bookIndex].title = title || books[bookIndex].title;
    books[bookIndex].author = author || books[bookIndex].author;
    books[bookIndex].status = status || books[bookIndex].status;
    books[bookIndex].notes = notes !== undefined ? notes : books[bookIndex].notes;
    
    if (totalPages !== undefined) books[bookIndex].totalPages = parseInt(totalPages);
    if (readPages !== undefined) books[bookIndex].readPages = parseInt(readPages);

    // Auto-update status based on page count
    if (books[bookIndex].readPages >= books[bookIndex].totalPages && books[bookIndex].totalPages > 0) {
        books[bookIndex].status = 'Completed';
    } else if (books[bookIndex].readPages > 0 && books[bookIndex].status === 'To Read') {
        books[bookIndex].status = 'Reading';
    }

    res.status(200).json(books[bookIndex]);
});

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) return res.status(404).json({ error: 'Book not found.' });

    books.splice(bookIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});