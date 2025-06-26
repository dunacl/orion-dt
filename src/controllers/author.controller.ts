import { Request, Response } from 'express';
import { Author } from '../models/author.model';

export const getAuthorsWithBooks = async (_: Request, res: Response) => {
  const authors = await Author.find().populate('bookId');
  res.json(authors);
};

export const getAuthor = async (req: Request, res: Response) => {
  const author = await Author.findById(req.params.id).populate('bookId');
  author ? res.json(author) : res.status(404).send('Author not found');
};

export const createAuthor = async (req: Request, res: Response) => {
  const newAuthor = new Author(req.body);
  await newAuthor.save();
  res.status(201).json(newAuthor);
};

export const updateAuthor = async (req: Request, res: Response) => {
  const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  updatedAuthor ? res.json(updatedAuthor) : res.status(404).send('Author not found');
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const deleted = await Author.findByIdAndDelete(req.params.id);
  deleted ? res.status(204).send() : res.status(404).send('Author not found');
};
