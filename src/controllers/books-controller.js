class BooksController {
  constructor(booksService) {
    this.booksService = booksService;
  }

  getBookById(req, res) {
    const id = parseInt(req.params.id, 10);
    const book = this.booksService.getBookById(id);
    if (!book) {
      console.log(book);
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json(book);
  }

  addBook(req, res) {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }
    
    const titleExists = this.booksService.getBookByTitle(title);
    if (titleExists) {
      return res.status(400).json({ error: 'Title already exists' });
    }

    const newBook = this.booksService.addBook({ title, author });
    return res.status(201).json(newBook);
  }

  deleteBook(req, res) {
    const id = parseInt(req.params.id, 10);
    const deletedBook = this.booksService.deleteBook(id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json(deletedBook);
  }
}

module.exports = BooksController;
