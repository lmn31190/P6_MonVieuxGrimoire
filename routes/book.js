import express from 'express';

import {addBook, getBook, getBooks} from '../controllers/books.js';
import upload, { resizeImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', upload, resizeImage, addBook);


export default router;
