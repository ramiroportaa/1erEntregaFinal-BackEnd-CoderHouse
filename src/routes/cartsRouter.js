import { Router } from "express";
import cartsController from "../controllers/cartsController.js";

const router = Router();

router.get("/:id/productos", cartsController.getProducts);

router.post("/", cartsController.createCart);
router.post("/:id/productos", cartsController.addProduct);

router.delete("/:id", cartsController.deleteById);
router.delete("/:id/productos/:id_prod", cartsController.deleteProductById);

export default router;