import mongoose, { Schema } from 'mongoose';

const cartItemSchema = new Schema(
  {
    cart: { type: Schema.Types.ObjectId, ref: 'Carts' },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    age: { type: Number },
    password: { type: String },
    cart: {
      type: [cartItemSchema],
      default: [],
    },
    rol: { type: String, default: 'user', enum: ['user', 'seller', 'admin'] },
    provider: { type: String, default: 'local' },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('User', userSchema);
