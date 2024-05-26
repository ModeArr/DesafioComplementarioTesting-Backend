import { Schema, model } from "mongoose";

const collectionName = "carts";

const cartsSchema = new Schema({
    products: [
      {
          product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true
          },
          quantity:{
              type: Number,
              required: true
          }
      },
  ],
 });

cartsSchema.pre('findOne', function () {
    this.populate('products.product')
})

const cartsModel = model(collectionName, cartsSchema);
export default cartsModel;