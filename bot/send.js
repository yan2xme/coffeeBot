import axios from "axios";

async function sendId(id,text) {
  await axios
    .post(
      "https://graph.facebook.com/v25.0/me/messages?access_token=" +
        process.env.PAGE_ACCESS_TOKEN,
      {
        recipient: { id: id },
        message: {
          text: text,
        },
      },
    )
    .catch((error) => {
      console.log(JSON.stringify(error.response.data));
    })
    .finally(() => {
      console.log("Request completed");
    });
}

export default { sendId };
