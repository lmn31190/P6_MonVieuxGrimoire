import express from 'express';

import {addBook, deleteBook, getBook, getBooks} from '../controllers/books.js';
import upload, { resizeImage } from '../middleware/upload.js';


const router = express.Router();

router.get('/', getBooks); //All Books
router.get('/:id', getBook); //One Book
router.post('/', upload, resizeImage, addBook); // Create
router.delete('/:id', deleteBook); // Create


export default router;
