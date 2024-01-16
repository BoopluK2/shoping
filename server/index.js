import express from "express";
import dotenv from "dotenv";
import coonectDatebase from "./config/mongoDb.js";

import ImportData from "./DataImport.js";

import productRoute from "./Routes/ProductRoutes.js";
import userRouter from "./Routes/UserRoutes.js";
import products from "./data/Products.js";
import {notFound, errorHandler } from "./Middleware/Errors.js"
import orderRouter from "./Routes/orederRoutes.js";


dotenv.config();
coonectDatebase();
const app = express();
app.use(express.json());


app.use("/api/import", ImportData);

app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);


app.use(notFound);
app.use(errorHandler)

app.get("/", (req, res) => {
    res.send("API работает...")
})


const PORT = process.env.PORT || 3000;
app.listen(PORT,console.log(`сервер работает порт ${PORT}`))