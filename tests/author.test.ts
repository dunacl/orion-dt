import request from 'supertest';
import app from '../src/app';
import { Author } from '../src/models/author.model';

describe('Author Endpoints with MongoDB', () => {
  beforeAll(async () => {
    await Author.deleteMany({});
  });

  it('should create a new author', async () => {
    const res = await request(app).post('/authors').send({
      name: 'Isaac Asimov',
      bookId: []
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'Isaac Asimov');
  });

  it('should return authors with books', async () => {
    const res = await request(app).get('/authors');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
