import db from "../config/db.js";

export const getProductById = async (productId) => {
    try {
        const [product] = await db.query(
            'SELECT * FROM products WHERE id = ?',
            [productId]
        );
        if (product.length === 0) {
            throw new Error("Product not found");
        }
        return product;
    } catch (error) {
        throw new Error(error.message || "Error fetching product");
    }
};

export const getAllProducts = async () => {
    try {
        const [products] = await db.query('SELECT * FROM products');
        return products;
    } catch (error) {
        throw new Error(error.message || "Error fetching products");
    }
};

export const addProduct = async (productData) => {
    try {
        const { name, price, description } = productData;

        const [result] = await db.query(
            'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
            [name, price, description]
        );
        return result;
    } catch (error) {
        throw new Error(error.message || "Error adding product");
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        await getProductById(productId); // Check if product exists
        const { name, price, description } = productData;
        const [result] = await db.query(
            'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
            [name, price, description, productId]
        );
        return result;
    } catch (error) {
        throw new Error(error.message || "Error updating product");
    }
};

export const deleteProduct = async (productId) => {
    try {
        await getProductById(productId); // Check if product exists
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [productId]);
        return result;
    } catch (error) {
        throw new Error(error.message || "Error deleting product");
    }
};

export const getProductSummary = async (productId) => {
    try {
        await getProductById(productId); // Check if product exists
        const [summary] = await db.query(
            `select 
            sum(ii.quantity) as totalUnitSale,
            sum(ii.quantity * ii.unitPrice) as totalSales,
            count(distinct i.customerId) as totalCustomers,
            count(i.id) as totalInvoices
            from invoiceitems as ii
            join invoices as i
            on ii.invoiceId = i.id
            where ii.productId = ?`,
            [productId]
        );
        return summary;
    } catch (error) {
        throw new Error(error.message || "Error fetching product summary");
    }
};

export const getProductInvoices = async (productId) => {
    try {
        await getProductById(productId); // Check if product exists
        const [invoices] = await db.query(`select i.id,
            sum(ii.quantity * ii.unitPrice) as amount,
            i.status as status,
            c.name as customerName,
            i.createdAt as date
            from invoiceItems as ii
            join invoices as i
            on i.id = ii.invoiceId
            join customers as c
            on c.id = i.customerId
            where ii.productId = ?
            group by i.id`, [productId]);
        return invoices;
    } catch (error) {
        throw new Error(error.message || "Error fetching product invoices");
    }
}