// bot/handler.js
import { STATES } from "./states.js";
import { getConfig } from "../db/config.js";
import { countTodayOrders } from "../db/orders.js";
import { getTodayOrdersByCustomer } from "../db/orders.js";
import { saveOrder } from "../db/orders.js";
import { sendId } from "./send.js"; // or whatever you named it
import { sweetSend } from "./send.js"; // or whatever you named it
import { flavorsSend } from "./send.js"; // or whatever you named it
import { milkSend } from "./send.js"; // or whatever you named it
import { areaSend } from "./send.js"; // or whatever you named it
import { confirmSend } from "./send.js"; // or whatever you named it
import { selectionSend } from "./send.js"; // or whatever you named it

const sessions = {};

export async function handleMessage(senderId, text) {
  const session = sessions[senderId] ?? { state: STATES.START, data: {} };

  switch (session.state) {
    case STATES.START:
      session.data.start = text;
      selectionSend(
        senderId,
        "Welcome to env.coffee!!\n\nWhat would you like to do here?",
      );

      session.state = STATES.IDLE;
      sessions[senderId] = session;

      break;

    case STATES.IDLE: {
      session.data.idle = text;

      const selection = ["Start Order", "Check Order"];

      if (session.data.idle == "Start Order") {
        var result = await getConfig();

        var todayOrders = await countTodayOrders();

        if (!result.accepting_orders || todayOrders >= result.daily_limit) {
          sendId(senderId, result.cutoff_message);
          return;
        } else {
          session.state = STATES.ASK_NAME;
          sessions[senderId] = session;
          sendId(senderId, "What's your name?");
        }
      } else if (session.data.idle == "Check Order") {
        var result = await getTodayOrdersByCustomer(senderId);

        console.log(Object.keys(result));
        console.log(result);

        sendId(senderId, "Your order for today po");

        for (let i = 0; i < result.length; i++) {
          
          const date = result[i].created_at.split("T")[0];
          const time = result[i].created_at.substring(11, 16);

          let idNum = i + 1;

          sendId(
            senderId,
            `\nOrder no. ${idNum}\nName: ${result[i].name}\nOrdered at: ${date} ${time}\n\nDrink: ${result[i].drink}\nStatus: ${result[i].status}`,
          );
        }

        session.state = STATES.IDLE;
        sessions[senderId] = session;
        selectionSend(
          senderId,
          "Welcome to env.coffee!!\n\nWhat would you like to do here?",
        );
        return;
      } else {
        sendId(senderId, "Wrong input, try again");
        selectionSend(
          senderId,
          "Welcome to env.coffee!!\n\nWhat would you like to do here?",
        );
      }
      break;
      // 1. call getConfig()
      // 2. call countTodayOrders()
      // 3. if not accepting OR count >= limit → send cutoff message, return
      // 4. otherwise → set sessions[senderId] to ASK_NAME state
      // 5. send "what's your name?"
    }

    case STATES.ASK_NAME: {
      session.data.name = text;

      session.state = STATES.ASK_DRINK;
      sessions[senderId] = session;

      sendId(senderId, "What would you like to drink?");
      flavorsSend(senderId);

      // 1. save `text` as session.data.name
      // 2. advance session.state to ASK_DRINK
      // 3. sessions[senderId] = session  ← don't forget to save it back
      // 4. send the drink menu question
      break;
    }

    case STATES.ASK_DRINK: {
      session.data.drink = text;
      console.log("from ask drink: ", session.data.drink);

      const drinks = ["Matcha Latte", "Spanish Latte"];

      if (drinks.includes(session.data.drink)) {
        session.state = STATES.ASK_MILK;
        sessions[senderId] = session;
        milkSend(senderId, "What milk would you like me to use?");
      } else {
        sendId(senderId, "Wrong input, try again.");
        sendId(senderId, "What would you like to drink?");
        flavorsSend(senderId);
      }
      // same pattern as before
      break;
    }

    case STATES.ASK_MILK: {
      session.data.milk = text;

      const milks = ["Oatside", "Cow Milk"];

      if (milks.includes(session.data.milk)) {
        session.state = STATES.ASK_SWEET;
        sessions[senderId] = session;
        sweetSend(senderId, "How sweet would you like it to be?");
      } else {
        sendId(senderId, "Wrong input, try again.");
        milkSend(senderId, "What milk would you like me to use?");
      }
      // same pattern as before
      break;
    }

    case STATES.ASK_SWEET: {
      session.data.sweet = text;
      const sweet = ["0%", "50%", "100%"];

      if (sweet.includes(session.data.sweet)) {
        session.state = STATES.ASK_BUILD;
        sessions[senderId] = session;
        areaSend(senderId, "Which building are you located?");
      } else {
        sendId(senderId, "Wrong input, try again.");
        sweetSend(senderId, "How sweet would you like it to be?");
      }
      // same pattern as before
      break;
    }

    case STATES.ASK_BUILD: {
      session.data.building = text;

      const build = ["Wiemann Building", "Bapa Benny", "Arrupe Hall"];
      if (build.includes(session.data.building)) {
        session.state = STATES.DONE;
        sessions[senderId] = session;
        confirmSend(
          senderId,
          `Are your order details correct?\n\nName: ${session.data.name}\nDrink: ${session.data.drink}\nMilk: ${session.data.milk}\nSweet: ${session.data.sweet}\nBuilding: ${session.data.building}`,
        );
      } else {
        sendId(senderId, "Wrong input, try again.");
        areaSend(senderId, "Which building are you located?");
      }
      // same pattern as before
      break;
    }

    case STATES.DONE: {
      session.data.confirm = text;

      if (session.data.confirm == "Yes") {
        session.data.price = 100; // for mock only
        await saveOrder(
          senderId,
          session.data.name,
          session.data.drink,
          session.data.milk,
          session.data.sweet,
          session.data.building,
          session.data.status,
          session.data.price,
        );

        sendId(senderId, "Order placed, thank you for ordering.");
        session.state = STATES.START;
        sessions[senderId] = session;
        selectionSend(
          senderId,
          "Welcome to env.coffee!!\n\nWhat would you like to do here?",
        );
      } else if (session.data.confirm == "No") {
        sendId(senderId, "Order void. Thank you for choosing env.coffee");
        session.state = STATES.START;
        sessions[senderId] = session;
        selectionSend(
          senderId,
          "Welcome to env.coffee!!\n\nWhat would you like to do here?",
        );
      } else {
        sendId(senderId, "Wrong input, try again.");
        confirmSend(
          senderId,
          `Are your order details correct?\n\nName: ${session.data.name}\nDrink: ${session.data.drink}\nMilk: ${session.data.milk}\nSweet: ${session.data.sweet}\nBuilding: ${session.data.building}`,
        );
      }
      break;
    }
  }
}
