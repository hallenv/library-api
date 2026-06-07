import { Router } from 'express';
import { listBooks, findBookByID, newBook, updateBook, deleteBook } from '../controllers/book.controller.js';
import { bookValidatationRules, bookUpdateValidationRules } from '../validators/book.validator.js';
import { verifyErrors } from '../validators/validation.middleware.js';
import { validateIdParam } from '../validators/idValidation.middleware.js';
import { authorize } from '../validators/auth.middleware.js';

const router = Router();

router.get('/', authorize(['admin', 'client']), listBooks);
router.get('/:id', validateIdParam, authorize(['admin', 'client']), findBookByID);
router.post('/', authorize(['admin']), bookValidatationRules, verifyErrors, newBook);
router.put('/:id', validateIdParam, authorize(['admin']), bookUpdateValidationRules, verifyErrors, updateBook);
router.delete('/:id', validateIdParam, authorize(['admin']), deleteBook);

export default router;