import { Products, Cart, Messages, User } from "../dao/factory.js"
import ProductRepository from "./product.repository.js"
import CartRepository from "./cart.repository.js"
import MessagesRepository from "./messages.repository.js"
import UserRepository from "./user.repository.js"

export const productService = new ProductRepository(new Products())
export const cartService = new CartRepository(new Cart())
export const messagesService = new MessagesRepository(new Messages())
export const userService = new UserRepository(new User())