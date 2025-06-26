import request from 'supertest';
import app from '../src/app';
import { Book } from '../src/models/book.model';
import { Author } from '../src/models/author.model';

describe('Book Endpoints with MongoDB', () => {
  let authorId: string;

  beforeAll(async () => {
    await Book.deleteMany({});
    await Author.deleteMany({});

    const author = new Author({ name: 'GRRM', bookId: [] });
    await author.save();
    authorId = author._id.toString();
  });

  it('should create a new book', async () => {
    const res = await request(app).post('/books').send({
      title: 'Winds of winter',
      chapters: 20,
      pages: 400,
      authorId: [authorId]
    });
    console.log(res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'Winds of winter');
  });

  /*
  This is not working as expected
  */
  it('should return books with authors', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    console.log(res.body);
    expect(res.body[0]).toHaveProperty('authorId');
  });

  it('should return average pages per chapter', async () => {
    const res = await request(app).get('/books/avg-pages');
    expect(res.statusCode).toBe(200);
    expect(res.body[0]).toHaveProperty('averagePagesPerChapter');
  });
});
