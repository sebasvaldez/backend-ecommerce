import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  findProducts,
} from "../controllers/products.controllers.js";

const router = Router();

//CRUD para los productos

router.get("/products", getProducts);

router.post("/products", createProduct);

router.patch("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

router.get("/products/search", findProducts);

router.get("/products/:id", getProduct);


export default router;
