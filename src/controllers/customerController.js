import { getCustomerById as getCustomerByIdService,
        getAllCustomers as getAllCustomersService,
        addCustomer as addCustomerService,
        updateCustomer as updateCustomerService,
        deleteCustomer as deleteCustomerService,
        getCustomerInvoices as getCustomerInvoicesService,
        getCustomerProducts as getCustomerProductsService,
        getCustomerSummary as getCustomerSummaryService
 } from "../services/customerService.js";

export const addCustomer = async (req, res) => {    
    try{
        await addCustomerService(req.body);

        res.status(201).json({
            success: true,
            message: "Customer added successfully",
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateCustomer = async (req, res) => {
    const customerId = req.params.id;
    const updatedData = req.body;

    try {
        await updateCustomerService(customerId, updatedData);
        res.status(200).json({
            success: true,
            message: "Customer updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getCustomerById = async (req, res) => {
    const customerId = req.params.id;
    try {
        const customer = await getCustomerByIdService(customerId);
        res.status(200).json({
            success: true,
            data: customer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllCustomers = async (req, res) => {
    try {
        const customers = await  getAllCustomersService();
        res.status(200).json({
            success: true,
            data: customers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}   

export const deleteCustomer = async (req, res) => {
    const customerId = req.params.id;
    try {
        await deleteCustomerService(customerId);
        res.status(200).json({
            success: true,
            message: "Customer deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const getCustomerInvoices = async (req, res) => {
    const customerId = req.params.id;
    try {
        const invoices = await getCustomerInvoicesService(customerId);
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
}


export const getCustomerProducts = async (req, res) => {
    const customerId = req.params.id;
    try {
        const products = await getCustomerProductsService(customerId);
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
}

export const getCustomerSummary = async (req, res) => {
    const customerId = req.params.id;
    try {
        const summary = await getCustomerSummaryService(customerId);
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
}