import { ProductController } from "../controllers/API.controllers/product.controller";

const express = require('express');
export const APIRouter = express.Router();

APIRouter.post('/product/create', ProductController.addNewProduct);
APIRouter.put('/product/:id/update', ProductController.updateProductByID);
APIRouter.delete('/product/:id/delete', ProductController.deleteProductByID);
APIRouter.get('/product', ProductController.getAllProduct);
APIRouter.get('/product/:id', ProductController.getDetailProduct);