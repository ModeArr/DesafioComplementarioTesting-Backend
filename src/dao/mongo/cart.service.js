import cartsModel from '../../models/carts.model.js'
import ticketModel from '../../models/ticket.model.js'
import productsModel from '../../models/products.model.js';
import TicketDTO from '../../dto/ticket.dto.js'

class CartServiceManager {

    async getCarts() {
        try {
            const allCarts = await cartsModel.find({}).lean()
            return allCarts
        } catch (error) {
            throw Error(error)
        }
    }

    async addCart(){
        try {
            const cart = await cartsModel.create({products: []})
            .then((res) => {
                return res._id 
            })
            .catch((error) => {
                throw Error(error)
            })

            return cart
        } catch (error) {
            throw Error(error)
        }
    }

    async getCartProducts(id){
        try {
            console.log(id)
           const findCart = await cartsModel.findById(id).lean()
           .then((res) => {
            return res.products
           })
           .catch((error) => {
            throw Error(error)
           })

           return findCart
        } catch (error) {
            throw Error(error)
        }
    }

    async addProductToCart(idCart, idProduct){
        try {
            const cart = await cartsModel.findById(idCart)
            const productExist = await cartsModel.find( {"_id": idCart, "products":{ 
                $elemMatch:{"product": idProduct}
             } } ).lean()

            if (!cart){
                throw Error("Cant find Cart ID")
            }

            if (!productExist.length){
                const productAdd = await cartsModel.findByIdAndUpdate( idCart,
                { $push: 
                    { products: { product: idProduct, quantity: 1 } } 
                })
                .then((res) => {
                    return `Se agrego el producto con id: ${idProduct} al carrito con id: ${idCart}` 
                })
                .catch((error) => {
                    throw Error(error)
                })
                return productAdd
            } else {
                const productAddQuant = await cartsModel.findOneAndUpdate({_id: idCart, 'products.product': idProduct}, {$inc : {
                    'products.$.quantity': 1
                }})
                .then((res) => {
                    return `Se aumento el producto con id: ${idProduct} al carrito con id: ${idCart}`
                })
                .catch((error) => {
                    throw Error(error)
                })
                return productAddQuant
            }
        } catch (error) {
            throw Error(error)
        }
    }

    async deleteProductCart(idCart, idProduct){
        try{
            const cart = await cartsModel.findById(idCart)
            const productExist = await cartsModel.find( {"_id": idCart, "products":{ 
                $elemMatch:{"product": idProduct}
             } } ).lean()

            if (!cart){
                throw Error("Cant find Cart ID")
            }

            if (!productExist.length){
                throw Error("Producto no existe")
            } 

            const deleteProduct = await cartsModel.updateOne({_id: idCart},     
                {$pull: {
                    products: {product: idProduct},
                }})
                .then((res) => {
                return `Se borro correctamente del carrito con id:${idCart} el producto con id: ${idProduct}`
                })
                .catch((error) => {
                throw Error(error)
                })

            return deleteProduct
        } catch (error) {
            throw Error(error)
        }
    }

    async editProductQuantity(idCart, idProduct, quantity){
        try {
            const cart = await cartsModel.findById(idCart)
            const productExist = await cartsModel.find( {"_id": idCart, "products":{ 
                $elemMatch:{"product": idProduct}
             } } ).lean()

            if (!cart){
                throw Error("Cant find Cart ID")
            }

            if (!productExist.length){
                throw Error("Producto no existe")
            }

            const productAddQuant = await cartsModel.findOneAndUpdate({_id: idCart, 'products.product': idProduct}, {$set : {
                'products.$.quantity': quantity
            }})
            .then((res) => {
                return `Se ajusto el producto con id: ${idProduct} a la cantidad ${quantity}, esto al carrito con id: ${idCart}`
            })
            .catch((error) => {
                throw Error(error)
            })

            return productAddQuant
        } catch (error) {
            throw Error(error)
        }
    }

    async deleteAllCartProducts(idCart){
        try {
            const cart = await cartsModel.findById(idCart)

            if (!cart){
                throw Error("Cant find Cart ID")
            }

            const deleteCartProducts = await cartsModel.findOneAndUpdate({_id: idCart}, {$set : {
                'products': []
            }})
            .then((res) => {
                return `Se borraron todos lo productos del carrito con id: ${idCart}`
            })
            .catch((error) => {
                throw Error(error)
            })

            return deleteCartProducts
        } catch (error) {
            throw Error(error)
        }
    } 

    async getCartTotalAmount(user){
        return this.getCartProducts(user.cart)
        .then((res) => {
            if (!res){
                return "No tiene productos"
            }
            return res.reduce( ( sum, p ) => sum + (p.product.price * p.quantity) , 0)
        })
        .catch((error) => {
            throw Error(error)
        })        
    }

    async updateProductStock(pId, quantity){
        try {
            const updatedProduct =  productsModel.findOneAndUpdate({_id: pId}, {$set : {
                'stock': quantity
            }})
            .then((res) => {
                return res
            })
            .catch((error) => {
                throw Error(error)
            })
            
            return updatedProduct
        } catch (error) {
            throw Error(error)
        }
    }

    async buyCart(user){
        const cartProducts = await this.getCartProducts(user.cart)
        const totalAmount = await this.getCartTotalAmount(user)
        const validStockProducts = cartProducts.filter((p) => p.quantity <= p.product.stock)
        const invalidStockProducts = cartProducts.filter((p) => p.quantity > p.product.stock)
        console.log(totalAmount)
        
        const newTicket = new TicketDTO({totalAmount, user})
        const ticket = await ticketModel.create(newTicket)
        .then((res) => {
            //remover stock
            validStockProducts.forEach((p) => this.updateProductStock(p.product._id, ( p.product.stock - p.quantity )))
            
            //Se actualiza el carrito y si quedan si hay productos sin suficente stock
            cartsModel.findOneAndUpdate({_id: user.cart}, {$set : {
                'products': invalidStockProducts
            }})
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                throw Error(error)
            })

            return res
        })
        .catch((error) => {
            throw Error(error)
        })

        return ticket
    }
}
export default CartServiceManager