import mongoose from 'mongoose';

// Schéma Book
const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [
    {
        userId: { type: String },
        grade: { type: Number },
    }
  ],
  averageRating: { type: Number },
});

export default mongoose.model('Book', bookSchema);