import { Schema, model } from "mongoose";

const collectionName = "messages";

const messagesSchema = new Schema({
  user: String,
  message: String,
});

const messagesModel = model(collectionName, messagesSchema);
export default messagesModel;