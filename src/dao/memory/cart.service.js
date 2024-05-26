import { readFile, writeFile } from "fs/promises"

class CartManager {
    constructor(path) {
        this.pathDB = path
    }

    async getCarts() {
        try {
            const allCarts = await readFile(this.pathDB)
            return JSON.parse(allCarts)
        } catch (error) {
            throw Error(error)
        }
    }

    async addCart(){
        try {
            const allCarts = await this.getCarts()

            const newCart = {
                products: []
            }

            if (allCarts.length === 0) {
                newCart.id = 1
            } else {
                newCart.id = allCarts.length + 1
            }

            allCarts.push(newCart)
            await writeFile(this.pathDB, JSON.stringify(allCarts));
            return `Se creo un nuevo carrito con id ${newCart.id}` 
        } catch (error) {
            throw Error(error)
        }
    }

    async getCartProducts(id){
        try {
            const allCarts = await this.getCarts()
            const cart = allCarts.find(e => e.id === id)
            if (!cart){
                throw Error("No existe ese id")
            }else{
                return cart.products
            }
        } catch (error) {
            throw Error(error)
        }
    }

    async addProductToCart(idCart, idProduct){
        const allCarts = await this.getCarts()
        const cart = allCarts.find(e => e.id === idCart)
        if (!cart){
            throw Error("No se contro ese id de Cart")
        } 
        const index = allCarts.indexOf(cart);
        const product = allCarts[index].products.find(e => e.id === idProduct)
        const quantity = 1
        
        if (!product){
            const newProduct = {
                id: idProduct,
                quantity
            } 
            allCarts[index].products.push(newProduct)
            await writeFile(this.pathDB, JSON.stringify(allCarts));
            return `Se agrego el producto con id: ${idProduct} al carrito con id: ${idCart}` 
        }else{
            const pIndex = allCarts[index].products.indexOf(product)
            allCarts[index].products[pIndex].quantity++
            await writeFile(this.pathDB, JSON.stringify(allCarts));
            return `Se aumento el producto con id: ${idProduct} al carrito con id: ${idCart}` 
        }
    }

}

export default CartManager