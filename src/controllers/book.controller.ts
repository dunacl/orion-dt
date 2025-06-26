import { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';

export const getBooksWithAuthors = async (_: Request, res: Response) => {
  const books = await Book.find().populate('authorId');
  res.json(books);
};

export const getBook = async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id).populate('authorId');
  book ? res.json(book) : res.status(404).send('Book not found');
};

export const createBook = async (req: Request, res: Response) => {
  const newBook = new Book(req.body);
  await newBook.save();

  // Asociar libro a autores
  await Author.updateMany(
    { _id: { $in: newBook.authorId } },
    { $addToSet: { bookId: newBook._id } }
  );

  res.status(201).json(newBook);
};

export const updateBook = async (req: Request, res: Response) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  updatedBook ? res.json(updatedBook) : res.status(404).send('Book not found');
};

export const deleteBook = async (req: Request, res: Response) => {
  const deleted = await Book.findByIdAndDelete(req.params.id);
  if (deleted) {
    await Author.updateMany(
      { bookId: deleted._id },
      { $pull: { bookId: deleted._id } }
    );
    res.status(204).send();
  } else {
    res.status(404).send('Book not found');
  }
};

export const getPagesPerChapter = async (_: Request, res: Response) => {
  const books = await Book.find();
  const result = books.map(book => ({
    id: book._id,
    averagePagesPerChapter: parseFloat((book.pages / book.chapters).toFixed(2))
  }));
  res.json(result);
};
