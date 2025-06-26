"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const book_model_1 = require("../src/models/book.model");
const author_model_1 = require("../src/models/author.model");
describe('Book Endpoints with MongoDB', () => {
    let authorId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield book_model_1.Book.deleteMany({});
        yield author_model_1.Author.deleteMany({});
        const author = new author_model_1.Author({ name: 'GRRM', bookId: [] });
        yield author.save();
        authorId = author._id.toString();
    }));
    it('should create a new book', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post('/books').send({
            title: 'Winds of winter',
            chapters: 20,
            pages: 400,
            authorId: [authorId]
        });
        console.log(res.body);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('title', 'Winds of winter');
    }));
    /*
    This is not working as expected
    */
    it('should return books with authors', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/books');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        console.log(res.body);
        expect(res.body[0]).toHaveProperty('authorId');
    }));
    it('should return average pages per chapter', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/books/avg-pages');
        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toHaveProperty('averagePagesPerChapter');
    }));
});
