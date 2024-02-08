import { Router } from "express"
import {
    createCarts, getCartsById, addProductToCarts, getCarts, deleteCarts, deleteProductInCarts,
    updateCarts, updateQuantityProductsInCarts, deleteAllProductsinCarts, purchaseCart
} from "../controllers/carts.controller.js"

import { checkRole } from "../middlewares/checkRole.js"

export const router = Router()

router.get("/", getCarts)
router.get("/:cid", async (req, res) => {
    const cartData = await getCartsById(req, res);
    res.json(cartData)
})

router.put("/:cid", updateCarts)
router.put("/:cid/products/:pid", updateQuantityProductsInCarts)
router.put("/products/:cid", deleteAllProductsinCarts)


router.post("/", createCarts)
router.post("/:cid/products/:pid",  checkRole(['user']), addProductToCarts)

router.delete("/delete/:cid", deleteCarts)
router.delete("/:cid/products/:pid", deleteProductInCarts)

router.post("/:cid/purchase", purchaseCart);
