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

// Create the endpoint for your webhook
router.post("/", (req, res) => {
  let body = req.body;

  console.log(`\u{1F7EA} Received webhook:`);
  console.log("from PSID: "+body.entry[0].messaging[0].sender.id);
  console.log("Message: "+body.entry[0].messaging[0].message.text);

  res.status(200).send("fuck it! kinda works..")
});

export default router;
