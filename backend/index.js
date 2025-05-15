import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

const { urlencoded } = bodyParser;

const app = express();
const port  = process.env.PORT || 5000;
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }))

connectDB();

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/results", resultRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);    
})