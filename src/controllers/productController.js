import {
    getAllProducts as getProductsService,
    getProductById as getProductByIdService,
    addProduct as addProductService,
    updateProduct as updateProductService,
    deleteProduct as deleteProductService,
    getProductSummary as getProductSummaryService,
    getProductInvoices as getProductInvoicesService,
} from '../services/productService.js';

export const getProducts = async (req, res) => {
    try {
        const products = await getProductsService();
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

export const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await getProductByIdService(productId);
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const addProduct = async (req, res) => {
    try {
        const newProduct = await addProductService(req.body);
        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: newProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;
    try {
        const updatedProduct = await updateProductService(productId, updatedData);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        await deleteProductService(productId);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getProductSummary = async (req, res) => {
    const productId = req.params.id;
    try {
        const summary = await getProductSummaryService(productId);
        res.status(200).json({
            success: true,
            data: summary
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getProductInvoices = async (req, res) => {
    const productId = req.params.id;
    try {
        const invoices = await getProductInvoicesService(productId);
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