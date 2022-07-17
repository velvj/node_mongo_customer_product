import mongoose from 'mongoose'

const cartSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Customer',
    },
    cartItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        amount: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ]
  },
  {
    timestamps: true,
  }
)

const Cart = mongoose.model('Cart', cartSchema)

export default Cart
