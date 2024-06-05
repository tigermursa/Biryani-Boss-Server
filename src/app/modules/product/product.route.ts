import express from "express";
import { ProductController } from "./product.controller";


//router 
const router = express.Router()


//crud end points
router.post("/create", ProductController.createProduct);
router.get("/get", ProductController.getAllProducts)
router.get("/:id", ProductController.getSingleProduct)
router.delete("/:id", ProductController.deleteProduct)
router.put("/:id", ProductController.isAvailable)
router.patch("/:id", ProductController.updateProduct)


export const ProductRoutes = router;