import express from "express";
import dotenv from "dotenv";

const router = express.Router();

router.use('/',(req,res,next) => {
    if (req.headers['x-admin-secret'] == process.env.ADMIN_SECRET){
        next();
    } else {
        res.status(401).send()
    }
})

export default router;