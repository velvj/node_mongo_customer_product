import express from "express";
const router = express.Router();
import {
  authCustomer,
  registerCustomer,
  getCustomers,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
} from "../controllers/customerController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/customer").post(registerCustomer).get(protect, getCustomers);
router.post("/login", authCustomer);
router
  .route("/customer/:id")
  .delete(protect, deleteCustomer)
  .get(protect, getCustomerById)
  .put(protect, updateCustomer);

export default router;
