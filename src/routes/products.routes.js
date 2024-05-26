import { Router } from "express"
import { authMdw, productMdwPremium } from "../middleware/auth.middleware.js"
import { getProductsCtrl,
    getProductsByIdCtrl,
    addProductCtrl,
    updateProductCtrl,
    deleteProductCtrl } from "../controllers/products.controller.js"

const productsRoutes = Router()

productsRoutes.get("/", authMdw(['PUBLIC']), getProductsCtrl)

productsRoutes.get("/:pid", authMdw(['PUBLIC']), getProductsByIdCtrl)

productsRoutes.post("/", authMdw(['ADMIN', 'PREMIUM']), addProductCtrl)

productsRoutes.put("/:pid", productMdwPremium, updateProductCtrl)

productsRoutes.delete("/:pid", productMdwPremium, deleteProductCtrl)

export default productsRoutes