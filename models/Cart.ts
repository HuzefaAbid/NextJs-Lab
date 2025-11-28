import mongoose, { Schema, models } from 'mongoose';

export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ICart {
  _id?: string;
  sessionId: string;
  items: ICartItem[];
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const CartItemSchema = new Schema<ICartItem>(
  {
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    image: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const CartSchema = new Schema<ICart>(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    items: [CartItemSchema],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = models.Cart || mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
