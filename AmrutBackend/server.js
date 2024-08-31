// server.js
import express from 'express';
import bodyParser from 'body-parser';
import twilio from 'twilio';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from "./routes/authRoutes.js"
import connectDB from './config/db.js'; // Adjust the path if necessary
import cors from "cors"
import blogRoutes from "./routes/blogRoutes.js";
import CommentRoutes from "./routes/CommentRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js" // Adjust the path if necessary
import productRoutes from "./routes/ProductRoutes.js"; // Adjust the path if necessary
import marketRoutes from "./routes/MarketRoutes.js"
import otpRoutes from "./routes/otpRoutes.js";
import carrerRoutes from "./routes/carrerRoutes.js"; // Adjust the path if necessary
dotenv.config();

// Database config
connectDB();

// Rest object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('./uploads'))
app.use(morgan('dev'));

app.use(bodyParser.json());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/market", marketRoutes);
app.use("/api/v1/blog", blogRoutes);
 app.use("/api/v1/comment",CommentRoutes);
 app.use("/api/v1/carrer",carrerRoutes);
 app.use("./api/v1/otp",otpRoutes)

// Rest API
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Ecommerce </h1>');
});

// PORT
const PORT = process.env.PORT || 8080;

// Run listen
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}.`);
});
