import dotenv from 'dotenv';
import express from 'express';
import webhook from './routes/webhook.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/dashboard", express.static("dashboard"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.get("/test", (req, res) => {
  res.json({
    message: "Express is running",
    env_loaded: !!process.env.ADMIN_SECRET,
  });
});


console.log(process.env.VERIFY_TOKEN);

app.use('/webhook', webhook)

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));




