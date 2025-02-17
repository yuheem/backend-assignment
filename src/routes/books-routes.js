const express = require('express');
const BooksRepository = require('../repositories/books-repository')
const BooksService = require('../services/books-service');
const BooksController = require('../controllers/books-controller');

const router = express.Router();
const booksRepository = new BooksRepository();
const booksService = new BooksService(booksRepository);
const booksController = new BooksController(booksService);

// GET /:id - Retrieve a book by its ID
router.get('/:id', (req, res) => booksController.getBookById(req, res));
// POST / - Add a new book
router.post('/', (req, res) => booksController.addBook(req, res));
// DELETE /:id - Delete a book by its ID
router.delete('/:id', (req, res) => booksController.deleteBook(req, res));

module.exports = router;
