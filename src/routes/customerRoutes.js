import express from 'express';
const router = express.Router();
import validate from '../validators/validate.js';
import { customerValidator, customerIdValidator } from '../validators/customerValidators.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import { 
    addCustomer as addCustomerController,
     updateCustomer as updateCustomerController,
     getCustomerById as getCustomerByIdController,
     getAllCustomers as getAllCustomersController,
     deleteCustomer as deleteCustomerController,
     getCustomerInvoices as getCustomerInvoicesController,
     getCustomerProducts as getCustomerProductsController,
     getCustomerSummary as getCustomerSummaryController
 } from '../controllers/customerController.js';


router.post('/add', customerValidator, authMiddleware, validate, addCustomerController);
router.put('/update/:id', customerValidator, authMiddleware, validate, updateCustomerController);
router.get('/get/:id', customerIdValidator, authMiddleware, validate, getCustomerByIdController);
router.delete('/delete/:id', customerIdValidator, authMiddleware, validate, deleteCustomerController);
router.get('/get-all', authMiddleware, getAllCustomersController);
router.get('/invoices/:id', customerIdValidator, authMiddleware, validate, getCustomerInvoicesController);
router.get('/products/:id', customerIdValidator, authMiddleware, validate, getCustomerProductsController);
router.get('/summary/:id', customerIdValidator, authMiddleware, validate, getCustomerSummaryController);

export default router;