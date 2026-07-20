import supabase from './client.js';

// for creating new order
export async function saveOrder(sender_id,name,drink,milk,sweetness,building,status,price) {
  const { error } = await supabase
  .from('orders')
  .insert({ //inserting when the defined columns and its values are not existent
    sender_id: sender_id,
    name: name,
    drink: drink,
    milk: milk,
    sweetness: sweetness,
    building: building,
    status: status,
    price: price
  });

  return console.log(JSON.stringify(error))
}

export async function countTodayOrders() {
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


export async function getTodayOrders() {
  const dateNow = new Date(Date.now()).toISOString().split('T')[0];
  const dateToms = new Date(Date.now()+86400000).toISOString().split('T')[0];

  const { data, error } = await supabase
    .from ('orders')
    .select('*')
    .lt('created_at', dateToms) //less than dateToms
    .gte('created_at', dateNow); //greater than or equal to dateNow

    if (error) throw error;
    return data;
}

export async function getOrders(prompt) {
  const { data, error } = await supabase
    .from ('orders')
    .select('*')
    .eq('status', prompt)

    if (error) throw error;
    return data;
}

export async function getTodayOrdersByCustomer(sender_id) {
  const dateNow = new Date(Date.now()).toISOString().split('T')[0];
  const dateToms = new Date(Date.now()+86400000).toISOString().split('T')[0];

  const { data, error } = await supabase
    .from ('orders')
    .select('*')
    .eq('sender_id', sender_id)
    .lt('created_at', dateToms) //less than dateToms
    .gte('created_at', dateNow); //greater than or equal to dateNow

    if (error) throw error;
    return data;
}



//for updating status of specific id drink
export async function updateStatus(id, status) {
  const dateNow = new Date(Date.now()).toISOString().split('T')[0];
  const dateToms = new Date(Date.now()+86400000).toISOString().split('T')[0];

  const { data, error} = await supabase
    .from ('orders')
    .update({status: status})
    .eq('id', id)

    if (error) throw error;
    return console.log("is updated successfully");
}

