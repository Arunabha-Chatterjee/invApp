import db from "../config/db.js";

export const getCustomerById = async (customerId) => {
    try {
        const [customer] = await db.query(
            'SELECT * FROM customers WHERE id = ?',
            [customerId]
        );

        if (customer.length === 0) {
            throw new Error('Customer not found');
        }

        return customer[0];

    } catch (error) {
        throw new Error(error.message || 'Error fetching customer');
    }
};


export const getAllCustomers = async () => {
    try {
        const [customers] = await db.query('SELECT * FROM customers');
        return customers;
    } catch (error) {
        throw new Error(error.message || 'Error fetching customers');
    }
};


export const addCustomer = async (customerData) => {
    try {
        const { name, email, mobile, address, city, pin } = customerData;
        const [existingEmail] = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
        if (existingEmail.length > 0) {
            throw new Error('Customer with this email already exists');
        }

        const [existingMobile] = await db.query('SELECT * FROM customers WHERE mobile = ?', [mobile]);
        if (existingMobile.length > 0) {
            throw new Error('Customer with this mobile number already exists');
        }

        const [result] = await db.query(`INSERT INTO customers 
            (name, email, mobile, address, city, pin)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [name, email, mobile, address, city, pin]);

        return result[0];

    } catch (error) {
        throw new Error(error.message || 'Error adding customer');
    }
};


export const updateCustomer = async (customerId, customerData) => {
    try {
        await getCustomerById(customerId); // Check if customer exists
        const { name, email, mobile, address, city, pin } = customerData;

        const [result] = await db.query(`UPDATE customers 
            SET name = ?, email = ?, mobile = ?, address = ?, city = ?, pin = ? 
            WHERE id = ?`,
            [name, email, mobile, address, city, pin, customerId]);
        return result[0];

    } catch (error) {
        throw new Error(error.message || 'Error updating customer');
    }
};


export const deleteCustomer = async (customerId) => {
    try {
        await getCustomerById(customerId); // Check if customer exists
        const [result] = await db.query('DELETE FROM customers WHERE id = ?', [customerId]);
        return result[0];
    } catch (error) {
        throw new Error(error.message || 'Error deleting customer');
    }
};


export const getCustomerInvoices = async (customerId) => {
    try {
        await getCustomerById(customerId); // Check if customer exists
        const [invoices] = await db.query(`SELECT id, totalAmount as amount, status,
                                        createdAt as date FROM 
                                        invoices WHERE customerId = ?`, [customerId]);
        return invoices;
    } catch (error) {
        throw new Error(error.message || 'Error fetching customer invoices');
    }
}


export const getCustomerProducts = async (customerId) => {
    try {
        await getCustomerById(customerId); // Check if customer exists
        const [products] = await db.query(`select p.id as 
            ,
                                            p.name as productName,
                                            sum(ii.quantity) as totalQuantity,
                                            sum(ii.unitPrice *ii.quantity) as totalPrice from 
                                            invoices as i
                                            join invoiceitems as ii
                                            on i.id = ii.invoiceId
                                            join products as p
                                            on p.id = ii.productId
                                            where customerId = ?
                                            group by ii.productId;`, [customerId]);
        return products;
    }catch (error) {
        throw new Error(error.message || 'Error fetching customer products');
    }
}


export const getCustomerSummary = async (customerId) => {
    try {
        await getCustomerById(customerId); // Check if customer exists
        const [summary] = await db.query(`select 
                        count(id) totalInvoices,
                        sum(totalAmount) as totalBiled,
                        sum(totalItems) as totalItems,
                        sum(case when status = 'due' then totalAmount else 0 end) as totalDue
                        from invoices
                        where customerId = ?`, [customerId])
        return summary[0];
        }catch (error) {
        throw new Error(error.message || 'Error fetching customer summary');
    }
}