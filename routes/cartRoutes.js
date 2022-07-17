import express from "express";
const router = express.Router();
import {
  addCartItems,
  getMyCarts,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addCartItems);
router.route("/mycarts").get(protect, getMyCarts);

export default router;
