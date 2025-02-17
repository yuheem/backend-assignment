class BookRepository {
  constructor() {
    this.books = [
      { id: 1, title: '1984', author: 'George Orwell' },
      { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
    ];
  }

  findById(id) {
    return this.books.find(book => book.id === id);
  }

  findByTitle(title) {
    return this.books.find(book => book.title === title);
  }

  create(book) {
    const maxId = books.length > 0 ? Math.max(...this.books.map(b => b.id)) : 0;
    const newBook = { id: maxId + 1, ...book };
    this.books.push(newBook);
    return newBook;
  }

  delete(id) {
    const index = this.books.findIndex(book => book.id === id);
    if (index !== -1) {
      return this.books.splice(index, 1)[0];
    }
    return null;
  }
}

module.exports = BookRepository;
