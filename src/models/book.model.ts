import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  chapters: { type: Number, required: true },
  pages: { type: Number, required: true },
  authorId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }]
});

export const Book = mongoose.model('Book', bookSchema);
