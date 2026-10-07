import db from "../config/db.js";
import {getCustomerById} from "./customerService.js";

export const getInvoiceById = async (invoiceId) => {
    try {
        const [invoice] = await db.query(
            'SELECT * FROM invoices WHERE id = ?',
            [invoiceId]
        );
        if (invoice.length === 0) {
            throw new Error('Invoice not found');
        }

        return invoice[0];
    } catch (error) {
        throw new Error(error.message || "Error fetching invoice");
    }
};

export const getAllInvoices = async () => {
    try {
        const [invoices] = await db.query('SELECT * FROM invoices');
        return invoices;
    } catch (error) {
        throw new Error(error.message || "Error fetching invoices");
    }
};

export const addInvoice = async (invoiceData) => {

    const {
        customerId,
        status,
        items
    } = invoiceData;

    // Check customer
    await getCustomerById(customerId);

    if (items.length === 0) {
        throw new Error("No product in the invoice");
    }

    let totalItems = 0;
    let totalAmount = 0;

    // Calculate total
    for (const item of items) {

        const [products] = await db.query(
            "SELECT price FROM products WHERE id = ?",
            [item.productId]
        );

        if (products.length === 0) {
            throw new Error(`${item.productId} product not found`);
        }

        totalItems += item.quantity;
        totalAmount += products[0].price * item.quantity;
    }

    // Add invoice
    const [result] = await db.query(
        `INSERT INTO invoices
        (customerId, totalAmount, totalItems, status)
        VALUES (?, ?, ?, ?)`,
        [
            customerId,
            totalAmount,
            totalItems,
            status
        ]
    );

    const invoiceId = result.insertId;

    // Add invoice items
    await addInvoiceItems(items, invoiceId);

    return invoiceId;
};


export const addInvoiceItems = async (items, invoiceId) => {

    if (items.length === 0) {
        throw new Error("No product in the invoice");
    }

    const invoiceItemList = [];

    for (const item of items) {

        if (item.quantity < 1) {
            throw new Error(
                `${item.productId} product quantity should be greater than zero`
            );
        }

        const [products] = await db.query(
            "SELECT id, price FROM products WHERE id = ?",
            [item.productId]
        );

        if (products.length === 0) {
            throw new Error(`${item.productId} product not found`);
        }

        const product = products[0];

        const [existingItems] = await db.query(
            `SELECT id, quantity
             FROM invoiceItems
             WHERE invoiceId = ? AND productId = ?`,
            [invoiceId, item.productId]
        );

        if (existingItems.length > 0) {

            const newQuantity =
                existingItems[0].quantity + item.quantity;

            await db.query(
                "UPDATE invoiceItems SET quantity = ? WHERE id = ?",
                [newQuantity, existingItems[0].id]
            );

        } else {

            const [result] = await db.query(
                `INSERT INTO invoiceItems
                (invoiceId, productId, quantity, unitPrice)
                VALUES (?, ?, ?, ?)`,
                [
                    invoiceId,
                    item.productId,
                    item.quantity,
                    product.price
                ]
            );

            invoiceItemList.push(result.insertId);
        }
    }

    return invoiceItemList;
};


export const getInvoiceProducts = async (invoiceId) => {
    try {
        const [products] = await db.query(`select
                        ii.productId as productId,
                        p.name as productName,
                        ii.quantity as quantity,
                        ii.unitPrice as unitPrice,
                        (ii.unitPrice * ii.quantity) totalPrice
                        from invoiceitems as ii
                        join invoices as i
                        on i.id = ii.invoiceId
                        join products as p
                        on p.id = ii.productId
                        where i.id = ?`, [invoiceId]);
        return products;
    } catch (error) {
        throw new Error(error.message || "Error fetching invoice products");
    }
};

export const deleteInvoice = async (invoiceId) => {
    try {
        await getInvoiceById(invoiceId); // Check if invoice exists
        const [result] = await db.query('DELETE FROM invoices WHERE id = ?', [invoiceId]);
        return result[0];
    } catch (error) {
        throw new Error(error.message || 'Error deleting invoice');
    }
};