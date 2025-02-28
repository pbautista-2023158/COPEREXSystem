//Validacion de errores
import { body } from "express-validator"
import { validateErrors } from "./validate.errors.js"

export const CompanyValidator = [
    body('name', 'Name cannot be empty')
    .isLength({ max: 35 })
    .toUpperCase()
    .notEmpty(),
    body('prestige', 'Prestige cannot be empty')
    .isLength({ max: 150 })
    .notEmpty(),   
    body('trajectory', 'Trajectory cannot be empty')
    .notEmpty(),
    body('category', 'Category cannot be empty')
    .isLength({ max: 50 })
    .notEmpty(),   
    validateErrors
]
