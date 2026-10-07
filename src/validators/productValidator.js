import { body } from "express-validator";

export const productValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Product name must not exceed 100 characters"),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 150 })
        .withMessage("Description must not exceed 150 characters"),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .bail()
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than 0")
];