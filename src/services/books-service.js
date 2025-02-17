class BooksService {
    constructor(booksRepository) {
      this.booksRepository = booksRepository;
    }
  
    getBookById(id) {
      return this.booksRepository.findById(id);
    }

    getBookByTitle(title) {
      return this.booksRepository.findByTitle(title);
    }
  
    addBook(book) {
      return this.booksRepository.create(book);
    }
  
    deleteBook(id) {
      return this.booksRepository.delete(id);
    }
  }
  
  module.exports = BooksService;
  