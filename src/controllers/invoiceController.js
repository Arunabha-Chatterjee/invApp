import {getInvoiceById as getInvoiceByIdService, 
    getAllInvoices as getAllInvoicesService, 
    addInvoice as addInvoiceService, 
    getInvoiceProducts as getInvoiceProductsService, 
    deleteInvoice as deleteInvoiceService} from '../services/invoiceService.js';

export const getInvoiceById = async (req, res) => {
    try {
        const invoice = await getInvoiceByIdService(req.params.id);
        res.status(200).json({
            success: true,
            data: invoice
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await getAllInvoicesService();
        res.status(200).json({
            success: true,
            data: invoices
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const addInvoice = async (req, res) => {
    try {
        const invoiceId = await addInvoiceService(req.body);
        res.status(201).json({
            success: true,
            data: { id: invoiceId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getInvoiceProducts = async (req, res) => {
    try {
        const products = await getInvoiceProductsService(req.params.id);
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteInvoice = async (req, res) => {
    try {
        await deleteInvoiceService(req.params.id);
        res.status(200).json({
            success: true,
            message: "Invoice deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};