async function fetchBooks() {
    const res = await fetch('/books');
    const books = await res.json();
    const list = document.getElementById('book-list');
    list.innerHTML = '';
    
    books.forEach(book => {
        const isCompleted = book.status === 'Completed' ? 'completed' : '';
        
        // Calculate progress percentage
        const total = book.totalPages || 0;
        const read = book.readPages || 0;
        let percent = 0;
        if (total > 0) {
            percent = Math.min(Math.round((read / total) * 100), 100);
        }
        
        list.innerHTML += `
            <li class="book-item ${isCompleted}">
                <div class="book-header">
                    <div class="book-info">
                        <h3>${book.title}</h3>
                        <p>By ${book.author}</p>
                        <span class="status-badge">${book.status}</span>
                    </div>
                </div>
                
                ${total > 0 ? `
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${percent}%;"></div>
                    </div>
                    <div class="progress-text">${read} / ${total} Pages (${percent}%)</div>
                ` : ''}

                ${book.notes ? `<div class="notes-display">${book.notes}</div>` : ''}
                
                <div class="actions">
                    <button class="edit-btn" onclick="updateProgress(${book.id}, ${read}, ${total})">Log Pages</button>
                    <button class="edit-btn" onclick="editBook(${book.id}, '${book.status}', \`${book.notes}\`)">Edit Info</button>
                    <button class="delete-btn" onclick="deleteBook(${book.id})">Delete</button>
                </div>
            </li>
        `;
    });
}

async function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const status = document.getElementById('status').value;
    const totalPages = document.getElementById('totalPages').value;
    const notes = document.getElementById('notes').value;
    
    if(!title || !author) return alert("Title and author are required.");

    await fetch('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, status, totalPages, notes })
    });
    
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('totalPages').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('status').value = 'To Read';
    fetchBooks();
}

async function updateProgress(id, currentRead, total) {
    const newRead = prompt(`Update pages read (out of ${total}):`, currentRead);
    if (newRead === null || newRead === "") return;

    await fetch(`/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ readPages: newRead })
    });
    fetchBooks();
}

async function editBook(id, oldStatus, oldNotes) {
    const newStatus = prompt("Update Status (To Read, Reading, Completed):", oldStatus) || oldStatus;
    const newNotes = prompt("Update Reflections:", oldNotes) || oldNotes;
    
    await fetch(`/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes: newNotes })
    });
    fetchBooks();
}

async function deleteBook(id) {
    if(confirm("Are you sure you want to delete this book?")) {
        await fetch(`/books/${id}`, { method: 'DELETE' });
        fetchBooks();
    }
}

fetchBooks();