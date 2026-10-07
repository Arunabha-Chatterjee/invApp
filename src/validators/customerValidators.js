import { body, param } from 'express-validator';

export const customerValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Name must not exceed 100 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Enter a valid email")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Email must not exceed 100 characters"),

    body("mobile")
        .notEmpty()
        .withMessage("Mobile number is required")
        .bail()
        .isNumeric()
        .withMessage("Mobile number must contain only numbers")
        .bail()
        .isLength({ min: 10, max: 10 })
        .withMessage("Mobile number must be exactly 10 digits"),

    body("address")
        .optional()
        .trim()
        .isLength({ max: 150 })
        .withMessage("Address must not exceed 150 characters"),

    body("city")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("City must not exceed 100 characters"),

    body("pin")
        .optional()
        .isNumeric()
        .withMessage("PIN must contain only numbers")
        .bail()
        .isLength({ min: 6, max: 6 })
        .withMessage("PIN must be exactly 6 digits")
];

export const customerIdValidator = [
    param('id')
    .notEmpty().withMessage("Customer ID is required")
]