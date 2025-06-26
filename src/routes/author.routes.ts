import { Router } from 'express';
import * as authorController from '../controllers/author.controller';

const router = Router();

router.get('/', authorController.getAuthorsWithBooks);
router.get('/:id', authorController.getAuthor);
router.post('/', authorController.createAuthor);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

export default router;
