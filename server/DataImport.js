import express from "express";
import User from "./Models/UserModel.js";
import users from "./data/users.js";
import Products from "./Models/ProductModel.js";
import products from "./data/Products.js";
import asyncHandler from "express-async-handler";


const ImportData = express.Router();

ImportData.post("/user", asyncHandler(async(req, res) => {
    await User.deleteMany({});
    const importUser = await User.insertMany(users)
    res.send({importUser})
}));

ImportData.post("/products", asyncHandler(async(req, res) => {
    await Products.deleteMany({});
    const importProducts = await Products.insertMany(products)
    res.send({importProducts})
}));

export default ImportData;