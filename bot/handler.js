// bot/handler.js
import { STATES } from "./states.js";
import { getConfig } from "../db/config.js";
import { countTodayOrders } from "../db/orders.js";
import { saveOrder } from "../db/orders.js";
import { sendId } from "./send.js"; // or whatever you named it
import { sweetSend } from "./send.js"; // or whatever you named it
import { flavorsSend } from "./send.js"; // or whatever you named it
import { milkSend } from "./send.js"; // or whatever you named it
import { areaSend } from "./send.js"; // or whatever you named it


const sessions = {};

export async function handleMessage(senderId, text) {
  const session = sessions[senderId] ?? { state: STATES.IDLE, data: {} };

  switch (session.state) {
    case STATES.IDLE: {
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

      session.state = STATES.ASK_MILK;
      sessions[senderId] = session;

      milkSend(senderId, "What milk would you like me to use?");
      // same pattern as before
      break;
    }

    case STATES.ASK_MILK: {
      session.data.milk = text;

      session.state = STATES.ASK_SWEET;
      sessions[senderId] = session;

      sweetSend(senderId, "How sweet would you like it to be?");
      // same pattern as before
      break;
    }

    case STATES.ASK_SWEET: {
      session.data.sweet = text;

      session.state = STATES.ASK_BUILD;
      sessions[senderId] = session;

      areaSend(senderId, "Which building are you located?");

      // same pattern as before
      break;
    }

    case STATES.ASK_BUILD: {
      session.data.building = text;

      session.state = STATES.DONE;
      sessions[senderId] = session;
      sendId(senderId, `Are your order details correct?\n\nName: ${session.data.name}\nDrink: ${session.data.drink}\nMilk: ${session.data.milk}\nSweet: ${session.data.sweet}\nBuilding: ${session.data.building}`);
      // same pattern as before
      break;
    }

    case STATES.DONE: {
        session.data.price = 100; // for mock only

        await saveOrder(
          senderId,
          session.data.name,
          session.data.drink,
          session.data.milk,
          session.data.sweet,
          session.data.building,
          session.data.status,
          session.data.price
        );

        sendId(senderId, "ORDER PLACED");
        session.state = STATES.IDLE;
        sessions[senderId] = session;
        break;
      }
  }
}
