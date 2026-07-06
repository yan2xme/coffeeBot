// bot/handler.js
import { STATES } from './states.js'
import { getConfig } from '../db/config.js'
import { countTodayOrders } from '../db/orders.js'
import { sendId } from './send.js'  // or whatever you named it

const sessions = {}

export async function handleMessage(senderId, text) {
  const session = sessions[senderId] ?? { state: STATES.IDLE, data: {} }

  switch (session.state) {

    case STATES.IDLE: {
        getConfig();

        const todayOrders = countTodayOrders();

        if (todayOrders >= getConfig.daily_limit){
            console.log(getConfig.cutoff_message);
            return
        } else {
            sessions[senderId] = STATES.ASK_NAME;
            console.log("What's your name?");
        }
        break
      // 1. call getConfig()
      // 2. call countTodayOrders()
      // 3. if not accepting OR count >= limit → send cutoff message, return
      // 4. otherwise → set sessions[senderId] to ASK_NAME state
      // 5. send "what's your name?"
  

    }

    case STATES.ASK_NAME: {
        const text = session.data.name;
        session.state = ASK_DRINK;
        sessions[senderId] = session;
        console.log("What would you like to drink?");
      // 1. save `text` as session.data.name
      // 2. advance session.state to ASK_DRINK
      // 3. sessions[senderId] = session  ← don't forget to save it back
      // 4. send the drink menu question

      break
    }

  }
}
