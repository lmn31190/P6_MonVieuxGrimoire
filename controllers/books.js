import Book from '../models/book.js';

// POST => add new Book
export const addBook = (req, res) => {
    const book = new Book({
        ...bookObject,
        imageUrl: `${process.env.URL}/images/${req.file.filename}`,
        averageRating: bookObject.ratings[0].grade
    });
    // Add in MongoDB BDD
    book.save()
        .then(() => { res.status(201).json({ message: 'Votre livre à bien été crée !' }) })
        .catch(error => { res.status(400).json( { error }) })
};


// GET => get All Books
export const getBooks = (req, res) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(404).json({ error }));
};