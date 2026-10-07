import express from "express";
import customerRoutes from "./routes/customerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/customer", customerRoutes);
app.use("/product", productRoutes);
app.use("/invoice", invoiceRoutes);

app.get("/api-checking", (req, res) => {
    res.send("API is working");
});





export default app;