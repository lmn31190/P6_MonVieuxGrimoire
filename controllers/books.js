import Book from "../models/book.js";
import fs from "fs";

// POST => add new Book
export const addBook = (req, res) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    imageUrl: `${process.env.URL}/images/resized_${req.file.filename}`,
    averageRating: bookObject.ratings[0].grade,
  });
  // Add in MongoDB BDD
  book
    .save()
    .then(() => {
      res.status(201).json({ message: "Votre livre à bien été crée !" });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

// GET => get All Books
export const getBooks = (req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((err) => res.status(404).json({ err }));
};

// GET => get ONE Book
export const getBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((err) => res.status(404).json({ err }));
};

export const deleteBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
     const filename = book.imageUrl.split("/images/")[1];
      //Delete img
      fs.unlink(`images/${filename}`, () => {
        Book.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Objet supprimé !" });
          })
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
      console.log(error);
    });
};
