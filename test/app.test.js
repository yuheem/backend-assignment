const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

let initialBooks = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
  ];
  
describe('Books API Endpoints', () => {

  beforeEach(() => {
    // Reset the books array to its initial state before each test.
    books = [...initialBooks];
  });

  describe('GET /api/books/:id', () => {
    it('should return a book for a valid id', (done) => {
      request(app)
        .get('/api/books/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).to.have.property('id', 1);
          expect(response.body).to.have.property('title', '1984');
          expect(response.body).to.have.property('author', 'George Orwell');
          done();
        })
        .catch(err => done(err));
    });
    
    it('should return 404 for a non-existent book', (done) => {
      request(app)
        .get('/api/books/0')
        .expect(404, done);
    });
  });

  describe('POST /api/books', () => {
    it('should create a new book when valid data is provided', (done) => {
      const newBook = { title: 'Atomic Habits', author: 'James Clear' };
      request(app)
        .post('/api/books')
        .send(newBook)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(response => {
          expect(response.body).to.have.property('id');
          expect(response.body.title).to.equal(newBook.title);
          expect(response.body.author).to.equal(newBook.author);
          done();
        })
        .catch(err => done(err));
    });
    
    it('should return 400 if title is missing', (done) => {
      const invalidBook = { author: 'James Clear' };
      request(app)
        .post('/api/books')
        .send(invalidBook)
        .expect(400, done);
    });
    
    it('should return 400 if title already exists', (done) => {
      const duplicateBook = { title: '1984', author: 'George Orwell' };
      request(app)
        .post('/api/books')
        .send(duplicateBook)
        .expect(400, done);
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should delete a book when a valid id is provided', (done) => {
      request(app)
        .delete('/api/books/2')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).to.have.property('id', 2);
          expect(response.body).to.have.property('title', 'Brave New World');
          // Optionally verify that the book is no longer available:
          request(app)
            .get('/api/books/2')
            .expect(404, done);
        })
        .catch(err => done(err));
    });
    
    it('should return 404 when attempting to delete a non-existent book', (done) => {
      request(app)
        .delete('/api/books/0')
        .expect(404, done);
    });
  });
});
