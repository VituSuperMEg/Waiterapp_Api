import multer from 'multer';
import path from 'node:path';
import { Router, Request, Response } from "express";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategories } from "./app/useCases/categories/createCategories";
import { listProducts } from "./app/useCases/products/listProducts";
import { createProduct } from "./app/useCases/products/createProduct";
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listOrders } from './app/useCases/order/listOrders';
import { createOrder } from './app/useCases/order/createOrder';
import { deleteOrder } from './app/useCases/order/deleteOrder';
import { changeOrderStatus } from './app/useCases/order/changeOrderStatus';

export const router = Router();

const upload = multer({
  storage : multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
     callback(null, `${Date.now()}-${file.originalname}`)
    }
    })
});

// List categories
router.get('/categories', listCategories);
// Create categories
router.post('/categories', createCategories);
// List products
router.get('/products', listProducts);
// Create product
router.post('/products', upload.single('image'), createProduct);
// Get prodcuts by category
router.get('/categories/:categoryId/products', listProductsByCategory);
// List orders
router.get('/orders', listOrders);
// Create order
router.post('/orders', createOrder);
// Change order status
router.patch('/orders/:orderId', changeOrderStatus)
//  Delete/cancel order
router.delete('/orders/:orderId', deleteOrder);
