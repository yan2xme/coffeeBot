import axios from "axios";

//for sending text in a specific PSID
export async function sendId(id, text) {
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

export async function sweetSend(id, texts) {
  await axios
    .post(
      "https://graph.facebook.com/v25.0/me/messages?access_token=" +
        process.env.PAGE_ACCESS_TOKEN,
      {
        recipient: { id: id },
        message: {
          text: texts,
          quick_replies: [
            {
              content_type: "text",
              title: "0%",
              payload: "zero",
            },
            {
              content_type: "text",
              title: "50%",
              payload: "fifty",
            },
            {
              content_type: "text",
              title: "100%",
              payload: "hundred",
            },
          ],
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

export async function selectionSend(id, texts) {
  await axios
    .post(
      "https://graph.facebook.com/v25.0/me/messages?access_token=" +
        process.env.PAGE_ACCESS_TOKEN,
      {
        recipient: { id: id },
        message: {
          text: texts,
          quick_replies: [
            {
              content_type: "text",
              title: "Start Order",
              payload: "Start Order",
            },
            {
              content_type: "text",
              title: "Check Order",
              payload: "Check Order",
            }
          ],
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


export async function confirmSend(id, texts) {
  await axios
    .post(
      "https://graph.facebook.com/v25.0/me/messages?access_token=" +
        process.env.PAGE_ACCESS_TOKEN,
      {
        recipient: { id: id },
        message: {
          text: texts,
          quick_replies: [
            {
              content_type: "text",
              title: "Yes",
              payload: "Yes",
            },
            {
              content_type: "text",
              title: "No",
              payload: "No",
            },
          ],
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

export async function flavorsSend(id) {
  await axios
    .post(
      "https://graph.facebook.com/v25.0/me/messages?access_token=" +
        process.env.PAGE_ACCESS_TOKEN,
      {
        recipient: { id: id },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [
                {
                  title: "Matcha Latte",
                  image_url:
                    "https://curry-mardi-semantic.ngrok-free.dev/flavors/matcha.jpeg",
                  subtitle: "₱20",
                  buttons: [
                    {
                      type: "postback",
                      title: "Matcha Latte",
                      payload: "Matcha Latte",
                    },
                  ],
                },
                {
                  title: "Spanish Latte",
                  image_url:
                    "https://curry-mardi-semantic.ngrok-free.dev/flavors/spanish.jpg",
                  subtitle: "₱10",
                  buttons: [
                    {
                      type: "postback",
                      title: "Spanish Latte",
                      payload: "Spanish Latte",
                    },
                  ],
                },
              ],
            },
          },
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

export async function milkSend(id, texts) {
  await axios
    .post(
      "https://graph.facebook.com/v25.0/me/messages?access_token=" +
        process.env.PAGE_ACCESS_TOKEN,
      {
        recipient: { id: id },
        message: {
          text: texts,
          quick_replies: [
            {
              content_type: "text",
              title: "Cow Milk",
              payload: "Cow Milk",
            },
            {
              content_type: "text",
              title: "Oatside",
              payload: "Oatside",
            },
          ],
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


export async function areaSend(id, texts) {
  await axios
    .post(
      "https://graph.facebook.com/v25.0/me/messages?access_token=" +
        process.env.PAGE_ACCESS_TOKEN,
      {
        recipient: { id: id },
        message: {
          text: texts,
          quick_replies: [
            {
              content_type: "text",
              title: "Arrupe Hall",
              payload: "Arrupe Hall",
            },
            {
              content_type: "text",
              title: "Wiemann Building",
              payload: "Wiemann Building",
            },
            {
              content_type: "text",
              title: "Bapa Benny",
              payload: "Bapa Benny",
            }
          ],
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
