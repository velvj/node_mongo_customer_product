import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)

export default router
