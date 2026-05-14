import { body } from "express-validator";
import { verifyErrors } from "./validation.middleware.js";

export const authorValidatationRules = [
    body('nome')
        .trim()
        .notEmpty().withMessage('CAMPO VAZIO')
        .isLength({ min: 1 }).withMessage('MINIMO 1 CARACTERE'),

    verifyErrors
];

// checar se update eh valido
export const authorUpdateValidationRules = [
    body('nome')
        .optional()
        .trim()
        .notEmpty().withMessage('CAMPO VAZIO')
        .isLength({ min: 1 }).withMessage('MINIMO 1 CARACTERE'),

    verifyErrors
];
