import express from 'express';

import {addBook, getBooks} from '../controllers/books.js';
import upload, { resizeImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getBooks);
router.post('/', upload, resizeImage, addBook);


export default router;
