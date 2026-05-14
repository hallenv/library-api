import { body } from "express-validator";
import { verifyErrors } from "./validation.middleware.js";

export const bookValidatationRules = [
    body('titulo')
        .trim()
        .notEmpty().withMessage('CAMPO VAZIO')
        .isLength({ min: 3 }).withMessage('MINIMO 3 CARACTERES'),

    body('ano')
        .notEmpty().withMessage('CAMPO VAZIO'),

    body('genero')
        .isInt({ min: 0 }).withMessage('DEVE SER NUMERO INTEIRO POSITIVO'),

    verifyErrors
];

// checar se update eh valido 
export const bookUpdateValidationRules = [
    body('titulo')
        .optional()
        .trim()
        .notEmpty().withMessage('CAMPO VAZIO')
        .isLength({ min: 3 }).withMessage('MINIMO 3 CARACTERES'),

    body('ano')
        .optional()
        .notEmpty().withMessage('CAMPO VAZIO'),

    body('genero')
        .optional()
        .isInt({ min: 0 }).withMessage('DEVE SER NUMERO INTEIRO POSITIVO'),

    body('writerId')
        .optional()
        .isInt({ min: 0 }).withMessage('DEVE SER NUMERO INTEIRO POSITIVO'),

    verifyErrors
];


