import { cartService } from "../repository/index.js";

const addCartCtrl = async(req, res) => {
    cartService.addCart().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
}

const getCartProductsCtrl = async(req, res) => {
    const id = req.params.cid
    cartService.getCartProducts(id).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
}

const addProductToCartCtrl = async(req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    cartService.addProductToCart(idCart, idProduct).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
}

const deleteProductCartCtrl = async(req,res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid

    cartService.deleteProductCart(idCart, idProduct).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
}

const editProductQuantityCtrl = async(req,res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const quantity = req.query.quantity

    cartService.editProductQuantity(idCart, idProduct, quantity).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
}

const deleteAllCartProductsCtrl = async(req,res) => {
    const idCart = req.params.cid

    cartService.deleteAllCartProducts(idCart).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
}

const buyCartCtrl = async(req,res) => {
    const user = req.user
    const cartId = req.params.cid

    if (user.cart !== cartId) {
        throw Error("Cart dont match user cart")
    }

    cartService.buyCart(user).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
}


export {
    addCartCtrl,
    getCartProductsCtrl,
    addProductToCartCtrl,
    deleteProductCartCtrl,
    editProductQuantityCtrl,
    deleteAllCartProductsCtrl,
    buyCartCtrl
}