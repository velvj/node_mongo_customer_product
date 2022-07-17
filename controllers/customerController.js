import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Customer from '../models/customerModel.js'

// @desc    Auth customer & get token
// @route   POST /api/customers/login
// @access  Public
const authCustomer = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const customer = await Customer.findOne({ email })

  if (customer && (await customer.matchPassword(password))) {
    res.json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      token: generateToken(customer._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new customer
// @route   POST /api/customers
// @access  Public
const registerCustomer = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body

  const customerExists = await Customer.findOne({ email })

  if (customerExists) {
    res.status(400)
    throw new Error('Customer already exists')
  }

  const customer = await Customer.create({
    name,
    email,
    password,
    phone
  })

  if (customer) {
    res.status(201).json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      token: generateToken(customer._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid customer data')
  }
})


// @desc    Get all customers
// @route   GET /api/customers
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({})
  res.json(customers)
})

// @desc    Delete customer
// @route   DELETE /api/customers/:id
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (customer) {
    await customer.remove()
    res.json({ message: 'Customer removed' })
  } else {
    res.status(404)
    throw new Error('Customer not found')
  }
})

// @desc    Get customer by ID
// @route   GET /api/customers/:id
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id).select('-password')

  if (customer) {
    res.json(customer)
  } else {
    res.status(404)
    throw new Error('Customer not found')
  }
})

// @desc    Update customer
// @route   PUT /api/customers/:id
const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (customer) {
    customer.name = req.body.name || customer.name
    customer.email = req.body.email || customer.email

    const updatedCustomer = await customer.save()

    res.json({
      _id: updatedCustomer._id,
      name: updatedCustomer.name,
      email: updatedCustomer.email
    })
  } else {
    res.status(404)
    throw new Error('Customer not found')
  }
})

export {
  authCustomer,
  registerCustomer,
  getCustomers,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
}
