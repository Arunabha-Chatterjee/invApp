# Inventory & Sales Management System

A RESTful API for managing customers, products, invoices, and sales using **Node.js, Express.js, and MySQL**.

The application provides secure authentication, role-based authorization, request validation, and structured APIs for efficient inventory and sales management.

## 🚀 Features

### 🔐 Authentication & Authorization

- User registration and login
- JWT-based authentication
- Password hashing
- Protected routes
- Role-based access control
- Token-based authorization

### 👥 Customer Management

- Add customers
- Get customer details
- Update customer information
- Delete customers
- Validate customer information
- Prevent duplicate email and mobile numbers

### 📦 Product Management

- Add products
- Get product details
- Update product information
- Delete products
- Manage product prices
- Manage product stock

### 🧾 Invoice Management

- Create invoices
- Add multiple products to an invoice
- Manage invoice items
- Calculate total amount
- Calculate total items
- Track payment status
- Retrieve invoice details
- Retrieve all invoices

### ✅ Validation & Error Handling

- Request validation using Express Validator
- Feature-specific validation rules
- Structured success and error responses
- Proper HTTP status codes
- Centralized validation middleware

---

## 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **MySQL**
- **MySQL2**
- **JSON Web Token (JWT)**
- **bcrypt**
- **Express Validator**
- **dotenv**
- **Postman**
- **Git & GitHub**

---

## 📁 Project Structure

```text
invApp/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── customerController.js
│   │   ├── productController.js
│   │   └── invoiceController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validate.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── productRoutes.js
│   │   └── invoiceRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── customerService.js
│   │   ├── productService.js
│   │   └── invoiceService.js
│   │
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── customerValidator.js
│   │   ├── productValidator.js
│   │   └── invoiceValidator.js
│   │
│   └── app.js
│
├── server.js
├── package.json
├── package-lock.json
├── .env
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Arunabha-Chatterjee/inventory-sales-management-system.git
```

Navigate to the project directory:

```bash
cd inventory-sales-management-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=invapp

JWT_SECRET=your_jwt_secret
```

Replace the values with your MySQL and JWT configuration.

### 4. Create the Database

Create the MySQL database:

```sql
CREATE DATABASE invapp;
```

Create the required tables for:

- Users
- Customers
- Products
- Invoices
- Invoice Items

### 5. Start the Application

```bash
node server.js
```

The application will run on:

```text
http://localhost:5000
```

---

## 🔐 Authentication

The application uses **JWT (JSON Web Token)** for authentication.

After successful login, a JWT token is returned:

```json
{
    "success": true,
    "message": "Login successful",
    "token": "your-jwt-token"
}
```

The token should be included in the `Authorization` header when accessing protected endpoints:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login user |

### Customers

| Method | Endpoint | Description |
|---|---|---|
| POST | `/customer/add` | Add a customer |
| GET | `/customer/get/:id` | Get customer by ID |
| PUT | `/customer/update/:id` | Update customer |
| DELETE | `/customer/delete/:id` | Delete customer |

### Products

| Method | Endpoint | Description |
|---|---|---|
| POST | `/product/add` | Add a product |
| GET | `/product/get/:id` | Get product by ID |
| PUT | `/product/update/:id` | Update product |
| DELETE | `/product/delete/:id` | Delete product |

### Invoices

| Method | Endpoint | Description |
|---|---|---|
| POST | `/invoice/add` | Create an invoice |
| GET | `/invoice/get/:id` | Get invoice by ID |
| GET | `/invoice/get-all` | Get all invoices |

> Update the endpoints above according to the final route configuration of the project.

---

## 🧪 API Testing

The APIs can be tested using **Postman**.

For protected endpoints, include the JWT token:

```text
Authorization: Bearer <JWT_TOKEN>
```

### Example Success Response

```json
{
    "success": true,
    "message": "Customer added successfully"
}
```

### Example Error Response

```json
{
    "success": false,
    "message": "Invalid email or password"
}
```

---

## 🏗️ Application Architecture

The project follows a layered architecture to keep responsibilities separated and the codebase maintainable.

```text
Client
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
MySQL Database
```

### Routes

Responsible for defining API endpoints and connecting requests to the appropriate controllers.

### Controllers

Responsible for handling HTTP requests, calling services, and returning responses.

### Services

Contain the application's business logic and database operations.

### Validators

Validate incoming request data before it reaches the application logic.

### Middleware

Handles common request-processing tasks such as authentication and validation.

### Database

MySQL is used for storing and managing application data.

---

## 🗄️ Database

The application uses **MySQL** as its relational database.

Main entities include:

```text
Users
 │
 ├── Customers
 │
 ├── Products
 │
 └── Invoices
        │
        └── Invoice Items
                │
                └── Products
```

### Main Tables

- `users`
- `customers`
- `products`
- `invoices`
- `invoice_items`

Invoices and invoice items are related to products and customers through relational database keys.

---

## 🔄 Request Flow

A typical request follows this flow:

```text
HTTP Request
     │
     ▼
   Route
     │
     ▼
 Validator / Middleware
     │
     ▼
 Controller
     │
     ▼
  Service
     │
     ▼
   MySQL
     │
     ▼
HTTP Response
```

This structure separates request handling, validation, business logic, and database operations.

---

## 📚 Key Concepts Demonstrated

- RESTful API development
- Node.js
- Express.js
- MySQL database integration
- CRUD operations
- JWT authentication
- Role-based authorization
- Password hashing
- Request validation
- Middleware
- Layered architecture
- SQL queries
- Relational database design
- Error handling
- HTTP status codes
- API testing with Postman
- Git & GitHub

---

## 🔮 Future Improvements

- Pagination for large datasets
- Product search and filtering
- Low-stock notifications
- Sales reports and analytics
- PDF invoice generation
- Advanced dashboard statistics
- CSV/Excel report export
- Swagger/OpenAPI documentation
- Automated API testing

---

## 👨‍💻 Author

**Arunabha Chatterjee**

GitHub:  
https://github.com/Arunabha-Chatterjee

---

## 📄 License

This project is developed for learning and portfolio purposes.
