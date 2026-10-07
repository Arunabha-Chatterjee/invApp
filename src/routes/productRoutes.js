import express from "express";

import {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductSummary,
    getProductInvoices
} from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { productValidator } from "../validators/productValidator.js";
import validate from "../validators/validate.js";

const router = express.Router();

router.get("/get-all", authMiddleware, getProducts);

router.get("/get/:id", authMiddleware, getProductById);

router.post(
    "/add",
    productValidator,
    authMiddleware,
    validate,
    addProduct
);

router.put(
    "/update/:id",
    productValidator,
    authMiddleware,
    validate,
    updateProduct
);

router.delete("/delete/:id", authMiddleware, deleteProduct);

router.get("/summary/:id", authMiddleware, getProductSummary);

router.get("/invoices/:id", authMiddleware, getProductInvoices);

export default router;