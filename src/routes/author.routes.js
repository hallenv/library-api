import { Router } from 'express';
import { listAuthors, findAuthorByID, newAuthor, updateAuthor, deleteAuthor } from '../controllers/author.controller.js';
import { authorValidatationRules, authorUpdateValidationRules } from '../validators/author.validator.js';
import { verifyErrors } from '../validators/validation.middleware.js';
import { validateIdParam } from '../validators/idValidation.middleware.js';

const router = Router();

router.get('/', listAuthors);
router.get('/:id', validateIdParam, findAuthorByID);
router.post('/', authorValidatationRules, verifyErrors, newAuthor);
router.put('/:id', validateIdParam, authorUpdateValidationRules, verifyErrors, updateAuthor);
router.delete('/:id', validateIdParam, deleteAuthor);

export default router;
