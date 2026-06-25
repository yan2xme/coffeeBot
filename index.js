import dotenv from 'dotenv';
import express from 'express';
import webhook from './routes/webhook.js';
import send from './bot/send.js'

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

app.use('/webhook', webhook) //opening webhooks to be invoked


send.sendId('27433220483030486','yanyan gwapo pero yawa nga life ni');

app.listen(PORT, () => console.log(`http://localhost:${PORT}`)); //listening the server at port 3000




