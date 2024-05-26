import { Router } from "express"
import { authMdw, cartMdwPremium } from "../middleware/auth.middleware.js"
import { addCartCtrl,
    getCartProductsCtrl,
    addProductToCartCtrl,
    deleteProductCartCtrl,
    editProductQuantityCtrl,
    deleteAllCartProductsCtrl,
    buyCartCtrl } from "../controllers/carts.controller.js"

const router = Router()

router.post("/", authMdw(['PUBLIC']), addCartCtrl)

router.get("/:cid", authMdw(['PUBLIC']), getCartProductsCtrl)

router.post("/:cid/product/:pid", cartMdwPremium, addProductToCartCtrl)

router.delete("/:cid/product/:pid", authMdw(['USER', 'ADMIN', 'PREMIUM']), deleteProductCartCtrl)

router.put("/:cid/product/:pid", authMdw(['USER', 'ADMIN', 'PREMIUM']), editProductQuantityCtrl)

router.post("/:cid/purchase", authMdw(['USER', 'ADMIN', 'PREMIUM']), buyCartCtrl)

router.delete("/:cid", authMdw(['USER', 'ADMIN', 'PREMIUM']), deleteAllCartProductsCtrl)

export default router