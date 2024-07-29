import express from 'express';

import {addBook, getBooks} from '../controllers/books.js';

const router = express.Router();

router.get('/', getBooks);
router.post('/', addBook);


export default router;
