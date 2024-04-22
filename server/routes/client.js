import express from "express";
import {
  getproducts,
  getCustomers,
  getTransactions,
  getApplications,
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getproducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/Applications", getApplications);

export default router;
