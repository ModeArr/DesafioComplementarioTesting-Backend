import mongoose from "mongoose";
import { PERSISTANCE, MONGO_URL, DB_NAME } from "../config/config.js";

export let Products, Cart, Messages, User

switch (PERSISTANCE) {
  case "MONGO":
    mongoose
      .connect(MONGO_URL, {
        dbName: DB_NAME,
      })
      .then((conn) => {
        console.log("CONNECTED TO MONGODB")
      })
      .catch((err) => {
        console.log("ERROR CONNECTING TO DB", err);
      });
    const { default: ProductServiceDao } = await import(
      "./mongo/product.service.js"
    );
    const { default: CartServiceDao } = await import(
      "./mongo/cart.service.js"
    );
    const { default: MessagesServiceDao } = await import(
      "./mongo/messages.service.js"
    );
    const { default: UserServiceDao } = await import(
      "./mongo/user.service.js"
    );
    Products = ProductServiceDao;
    Cart = CartServiceDao;
    Messages = MessagesServiceDao;
    User = UserServiceDao;
    break;
  case "MEMORY":
    console.log("LOAD MEMORY");
    const { default: ProductMemServiceDao } = await import(
      "./memory/product.service.js"
    );
    const { default: CartMemServiceDao } = await import(
      "./memory/cart.service.js"
    );
    const { default: MessagesMemServiceDao } = await import(
      "./memory/messages.service.js"
    );
    const { default: UserMemServiceDao } = await import(
      "./memory/user.service.js"
    );
    Products = ProductMemServiceDao;
    Cart = CartMemServiceDao;
    Messages = MessagesMemServiceDao;
    User = UserMemServiceDao;
    break;
}