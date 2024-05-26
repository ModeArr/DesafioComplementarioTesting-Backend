export default class CartRepository {
    constructor(dao){
        this.dao = dao
    }

    getCarts = async () => {
        return this.dao.getCarts()
    }

    addCart = async () => {
        return this.dao.addCart()
    }

    getCartProducts = async (id) => {
        return this.dao.getCartProducts(id)
    }

    addProductToCart = async (idCart, idProduct) => {
        return this.dao.addProductToCart(idCart, idProduct)
    }

    deleteProductCart = async (idCart, idProduct) => {
        return this.dao.deleteProductCart(idCart, idProduct)
    }

    editProductQuantity = async (idCart, idProduct, quantity) => {
        return this.dao.editProductQuantity(idCart, idProduct, quantity)
    }

    deleteAllCartProducts = async (idCart) => {
        return this.dao.deleteProductCart(idCart)
    }

    buyCart = async (user) => {
        return this.dao.buyCart(user)
    }
}