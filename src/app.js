const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to log HTTP requests
app.use(morgan('combined'));

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
  const { title, author } = req.body;
  // Validate that required fields are provided
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }
  const titleExists = books.find(book => book.title === title);
  if (titleExists) {
    return res.status(400).json({ error: 'Title already exists' });
  }
  const maxId = books.length > 0 ? Math.max(...books.map(b => b.id)): 0;
  const newBook = req.body;
  newBook.id = maxId + 1;
  
  books.push(newBook);
  res.status(201).json(newBook);
});

/**
 * DELETE /books/:id
 * Deletes a book from the collection.
 */
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const deletedBook = books.splice(index, 1)[0];
  res.json(deletedBook);
});

module.exports = app;