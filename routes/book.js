import express from 'express';

import {addBook, getBook, getBooks} from '../controllers/books.js';
import upload, { resizeImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getBooks); //All Books
router.get('/:id', getBook); //One Book
router.post('/', upload, resizeImage, addBook); // Create


export default router;
