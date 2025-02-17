const express = require('express');
const BooksRepository = require('../repositories/books-repository')
const BooksService = require('../services/books-service');
const BooksController = require('../controllers/books-controller');

const router = express.Router();
const booksRepository = new BooksRepository();
const booksService = new BooksService(booksRepository);
const booksController = new BooksController(booksService);

router.get('/:id', (req, res) => booksController.getBookById(req, res));
router.post('/', (req, res) => booksController.addBook(req, res));
router.delete('/:id', (req, res) => booksController.deleteBook(req, res));

module.exports = router;
