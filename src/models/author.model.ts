import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bookId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

export const Author = mongoose.model('Author', authorSchema);
