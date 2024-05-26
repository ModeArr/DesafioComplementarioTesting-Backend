import { Schema, model } from "mongoose";

const collection = "ticket";

const ticketSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  amount: Number,
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  purchaser: {
    type: String,
    required: true
  },
});

const ticketModel = model(collection, ticketSchema);
export default ticketModel;