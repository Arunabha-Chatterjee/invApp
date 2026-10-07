import express from 'express';
const router = express.Router();
import validate from '../validators/validate.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';

import { invoiceValidator } from '../validators/invoiceValidator.js';
import{getInvoiceById, 
    getAllInvoices, 
    addInvoice, 
    getInvoiceProducts, 
    deleteInvoice} from '../controllers/invoiceController.js';

router.get('/get/:id', authMiddleware, getInvoiceById);
router.get('/get-all', authMiddleware, getAllInvoices);
router.post('/add', invoiceValidator, authMiddleware, validate, addInvoice);
router.get('/products/:id', authMiddleware, getInvoiceProducts);
router.delete('/delete/:id', authMiddleware, deleteInvoice);

export default router;