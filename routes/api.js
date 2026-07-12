import express from "express";
import dotenv from "dotenv";
import { getTodayOrders } from "../db/orders.js";
import { updateStatus } from "../db/orders.js";
import supabase from "../db/client.js";

const router = express.Router();

router.use("/", (req, res, next) => {
  if (req.headers["x-admin-secret"] == process.env.ADMIN_SECRET) {
    next();
  } else {
    res.status(401).send();
  }
});

router.get("/orders/today", async (req, res) => {
  const data = await getTodayOrders();
  res.send(data);
});

router.patch("/orders/:id/status/:status", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const status = req.params.status;

    const data = updateStatus(id,status);
    res.json(data);
  } catch (error) {
    return res.status(404).json({message:'User not found'})
  }
  res.send(data);
});

export default router;
