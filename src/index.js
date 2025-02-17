const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database" of books (each with an id, title, and author)
let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
];

/**
 * GET /api/books/:id
 * Retrieves a single book by its ID.
 */
app.get('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const book = books.find(book => book.id === id);

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
  }

  res.json(book);
});

/**
 * POST /api/books
 * Adds a new book to the collection.
 */
app.post('/api/books', (req, res) => {
  const maxId = books.length > 0 ? Math.max(...books.map(b => b.id)): 0;
  const newBook = req.body;
  newBook.id = maxId + 1;
  
  books = books.concat(newBook);
  res.status(201).json(newBook);
});

/**
 * DELETE /books/:id
 * Deletes a book from the collection.
 */
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  books = books.filter(book => book.id === id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
