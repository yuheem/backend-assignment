const express = require('express');
const morgan = require('morgan');
const booksRoutes = require('./routes/books-routes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to log HTTP requests
app.use(morgan('combined'));

// Mount books routes at /api/books
app.use('/api/books', booksRoutes);

module.exports = app;
