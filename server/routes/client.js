import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getApplications,
} from "../controllers/client.js";

const router = express.Router();

router.get("/Products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/Applications", getApplications);

export default router;
