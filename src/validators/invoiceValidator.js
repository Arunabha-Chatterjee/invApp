import { body } from "express-validator";

export const invoiceValidator = [
    body("customerId")
        .notEmpty()
        .withMessage("Customer ID is required")
        .bail()
        .isInt({ min: 1 })
        .withMessage("Customer ID must be a valid positive integer"),

    body("status")
        .notEmpty()
        .withMessage("Status is required")
        .bail()
        .isIn(["due", "paid"])
        .withMessage("Status must be either due or paid"),

    body("items.*.quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be a positive integer")
];