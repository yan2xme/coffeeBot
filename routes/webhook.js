import express from "express";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();

//this is for GET in Messenger's callback url challenge;

router.get("/", (req, res) => {
  console.log(process.env.VERIFY_TOKEN);

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

//send data (POST)
router.post("/", (req, res) => {
  let body = req.body;
  console.log(req.body);
  res.send('messenger')
});


export default router;
