import { Router } from 'express';
import * as bookController from '../controllers/book.controller';

const router = Router();

router.get('/', bookController.getBooksWithAuthors);
router.get('/avg-pages', bookController.getPagesPerChapter);
router.get('/:id', bookController.getBook);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
