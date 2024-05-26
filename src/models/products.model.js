import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collectionName = "products";

const productsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: Array,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  code: {
    type: Number,
    required: true,
    unique: true
  },
  status: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  }
});

productsSchema.plugin(mongoosePaginate)
const productsModel = model(collectionName, productsSchema);
export default productsModel;