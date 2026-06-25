import dotenv from 'dotenv';
import express from 'express';
import webhook from './routes/webhook.js';
import send from './bot/send.js'
import orders from "./db/orders.js"
import * as readline from 'node:readline/promises';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; //setting port

app.use(express.json());

app.use("/dashboard", express.static("dashboard")); //for dashboard

app.get("/health", (req, res) => { //health of the server
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.get("/test", (req, res) => { //testing whether env is GET successfully
  res.json({
    message: "Express is running",
    env_loaded: !!process.env.ADMIN_SECRET,
  });
});


//opening webhooks to be invoked
app.use('/webhook', webhook)

const dateNow = new Date(Date.now()).toISOString().split('T')[0];

// example upserting of data when creating new orders
orders.saveOrder(52,'usr_69420','klent','matcha latte','oatside','sweet','wiemann','processing',67,dateNow) 


//listening the server at port 3000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));




