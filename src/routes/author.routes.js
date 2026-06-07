import { Router } from 'express';
import { listAuthors, findAuthorByID, newAuthor, updateAuthor, deleteAuthor } from '../controllers/author.controller.js';
import { authorValidatationRules, authorUpdateValidationRules } from '../validators/author.validator.js';
import { verifyErrors } from '../validators/validation.middleware.js';
import { validateIdParam } from '../validators/idValidation.middleware.js';
import { authorize } from '../validators/auth.middleware.js';

const router = Router();

router.get('/', authorize(['admin', 'client']), listAuthors);
router.get('/:id', validateIdParam, authorize(['admin', 'client']), findAuthorByID);
router.post('/', authorize(['admin']), authorValidatationRules, verifyErrors, newAuthor);
router.put('/:id', validateIdParam, authorize(['admin']), authorUpdateValidationRules, verifyErrors, updateAuthor);
router.delete('/:id', validateIdParam, authorize(['admin']), deleteAuthor);

export default router;
