import supabase from './client.js';


// for creating new order
async function saveOrder(
  id,
  sender_id,
  names,
  drink,
  milk,
  sweetness,
  building,
  statuss,
  price,
  timestamptz,
) {
  const { error } = await supabase
  .from('orders')
  .upsert({ //inserting when the defined columns and its values are not existent
    id: id,
    sender_id: sender_id,
    name: names,
    drink: drink,
    milk: milk,
    sweetness: sweetness,
    building: building,
    status: statuss,
    price: price,
    created_at: timestamptz,
  });

  return console.log(error);
}

async function countTodayOrders() {
  const dateNow = new Date(Date.now()).toISOString().split('T')[0]; ///dateNow, splitting the T separator and selecting the first part
  const dateToms = new Date(Date.now()+86400000).toISOString().split('T')[0]; /// same from the previous but added 1day apart

  const { count, error} = await supabase
    .from ('orders')
    .select('*', { count: 'exact', head: true })
    .lt('created_at', dateToms)
    .gte('created_at', dateNow);

    if (error) throw error;
    return count; //return count
}


async function getTodayOrders() {
  const dateNow = new Date(Date.now()).toISOString().split('T')[0];
  const dateToms = new Date(Date.now()+86400000).toISOString().split('T')[0];

  const { data, error} = await supabase
    .from ('orders')
    .select('*')
    .lt('created_at', dateToms) //less than dateToms
    .gte('created_at', dateNow); //greater than or equal to dateNow

    if (error) throw error;
    return console.log(data);
}



//for updating status of specific id drink
async function updateStatus(id, status) {
  const dateNow = new Date(Date.now()).toISOString().split('T')[0];
  const dateToms = new Date(Date.now()+86400000).toISOString().split('T')[0];

  const { data, error} = await supabase
    .from ('orders')
    .update({status: status})
    .eq('id', id)

    if (error) throw error;
    return console.log("is updated successfully");
}

export default { saveOrder, countTodayOrders, getTodayOrders, updateStatus };
