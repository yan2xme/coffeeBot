import express from "express";
import dotenv from "dotenv";
import {getTodayOrders} from '../db/orders.js';
import supabase from '../db/client.js';

const router = express.Router();

router.use('/',(req,res,next) => {
    if (req.headers['x-admin-secret'] == process.env.ADMIN_SECRET){
        next();
    } else {
        res.status(401).send()
    }
})


router.get('/orders/today',async (req,res,next) => {
    const data = await getTodayOrders();
    res.send(data)
})

export default router;