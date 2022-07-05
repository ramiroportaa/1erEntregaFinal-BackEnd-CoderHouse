import { Router } from "express";
import productsController from "../controllers/productsController.js";
import {authorizeMiddleware} from "../controllers/authorizeMiddleware.js";

const router = Router();

router.get("/", productsController.getAll);
router.get("/:id", productsController.getById);

router.post("/", authorizeMiddleware, productsController.add);

router.put("/:id", authorizeMiddleware, productsController.updateById);

router.delete("/:id", authorizeMiddleware, productsController.deleteById);

export default router;