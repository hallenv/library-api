import { Router } from 'express';
import { listBooks, findBookByID, newBook, updateBook, deleteBook } from '../controllers/book.controller.js';
import { bookValidatationRules, bookUpdateValidationRules } from '../validators/book.validator.js';
import { verifyErrors } from '../validators/validation.middleware.js';
import { validateIdParam } from '../validators/idValidation.middleware.js';

const router = Router();

router.get('/', listBooks);
router.get('/:id', validateIdParam, findBookByID);
router.post('/', bookValidatationRules, verifyErrors, newBook);
router.put('/:id', validateIdParam, bookUpdateValidationRules, verifyErrors, updateBook);
router.delete('/:id', validateIdParam, deleteBook);

export default router;