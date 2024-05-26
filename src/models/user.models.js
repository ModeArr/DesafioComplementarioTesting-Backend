import { Schema, model } from "mongoose";

const collection = "users";

const roleType = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  PUBLIC: 'PUBLIC',
  PREMIUM: 'PREMIUM',
}

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  age: Number,
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'carts',
    required: true
  },
  role: { 
    type: String,
    enum: Object.values(roleType),
    default: 'USER'
  },
  resetLink: {
    type: String, 
    default: ''
  }
});

userSchema.pre('findOne', function () {
  this.populate('cart.carts')
})

const userModel = model(collection, userSchema);
export default userModel;