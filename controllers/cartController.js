import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'

// @desc    Create new cart
// @route   POST /api/carts
// @access  Private
const addCartItems = asyncHandler(async (req, res) => {
  const {
    cartItems,
  } = req.body

  if (cartItems && cartItems.length === 0) {
    res.status(400)
    throw new Error('No cart items')
    return
  } else {
    const cart = new Cart({
      cartItems,
      customer: req.customer._id,
    })

    const createdCart = await cart.save()

    res.status(201).json(createdCart)
  }
})


// @desc    Get logged in user carts
// @route   GET /api/carts/mycarts
// @access  Private
const getMyCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find({ customer: req.customer._id })
  res.json(carts)
})


export {
  addCartItems,
  getMyCarts
}
