import express from "express";
import dotenv from "dotenv";
import { handleMessage } from "../bot/handler.js";

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

  let messaging_events = body.entry[0].messaging;

  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i];
    let senderId = event.sender.id;

    if (event.message && event.message.text) {
      let text = event.message.text;

      console.log(`\n\u{1F7EA} Received webhook:`);
      console.log("from PSID: " + senderId);
      console.log("Message: " + text);
      handleMessage(senderId, text);
      continue;
    }

    if (event.postback) {
      let postback = event.postback.payload;
      console.log(`\n\u{1F7EA} Received postback:`);
      console.log("Message: " + postback);
      handleMessage(senderId, postback);
      continue;
    }
  }

  res.status(200).send("fuck it! kinda works..");
});

export default router;
