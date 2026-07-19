
async function setStatus(id, status) {
  try {
    const res = await fetch("http://localhost:3000/api/orders/${id}/status/${status}", {
      method: 'PATCH',
      headers: {
        "x-admin-secret": "coffeebotadmin2025",
      },
    });
    const result = await res.json();
    
  } catch (error) {
    console.log(error)
  }
  
}

async function getCards() {
  try {
    const cardContainer = document.getElementById("card");

    const res = await fetch("http://localhost:3000/api/orders/today", {
      headers: {
        "x-admin-secret": "coffeebotadmin2025",
      },
    });
    const result = await res.json();

    cardContainer.innerHTML = "";

    result.forEach((card) => {
      const id = card.id;
      const name = card.name;
      const drink = card.drink;
      const milk = card.milk;
      const sweet = card.sweetness;
      const building = card.building;
      const status = card.status;
      const price = card.price;

      const div = document.createElement("div");

      div.innerHTML = `<div class="border border-gray-300 bg-zinc-50 h-92 w-80 p-5">
                        <h1 class="font-[Apple_Garamond] text-2xl">Order #${id}</h1>

                        <div class="mt-2">
                            <h1 class="font-[Apple_Garamond] text-4xl"><b>Name:</b> ${name}</h1>
                            <h1 class="font-[Apple_Garamond] text-4xl"><b>Drink:</b> ${drink}</h1>
                            <h1 class="font-[Apple_Garamond] text-4xl"><b>Milk:</b> ${milk}</h1>
                            <h1 class="font-[Apple_Garamond] text-4xl"><b>Sweet:</b> ${sweet}</h1>
                            <h1 class="font-[Apple_Garamond] text-4xl"><b>Status:</b> ${status}</h1>
                        </div>

                        <div class="inline-flex mt-10">
                            <div class="inline-flex">
                                    <img src="../src/map.svg" alt="coffee icon" height="35" width="35" class="">
                                    <h1 class="font-[Apple_Garamond_Light] pl-2 text-2xl">${building}</h1>
                            </div>

                            <div class="border-l relative left-10">
                                    <h1 class="font-[Apple_Garamond_Light] ml-7 pl-2 text-2xl">${price}</h1>
                            </div>
                        </div>
                </div>
                        <footer>
                                <button onclick=setStatus(id,completed) class="bg-[#008F6B] hover:bg-blue-700 h-13 w-80 p-2.5 inline-flex">
                                    <h1 class="font-[Apple_Garamond_Light] pl-2 text-white text-2xl">Mark as Completed</h1>
                                    <div class="h-8.5 w-8.5 bg-white relative -right-20">
                                        <img src="../src/check.svg" alt="coffee icon" height="35" width="35">
                                    </div>
                                </button>
                                <br>
                                <button onclick=setStatus(id,completed) class="bg-black hover:bg-blue-700 h-13 w-80 p-2.5 inline-flex">
                                    <h1 class="font-[Apple_Garamond_Light] pl-2 text-white text-2xl">Mark as Void</h1>
                                    <div class="h-8.5 w-8.5 bg-white relative -right-33.5">
                                        <img src="../src/exit.svg" alt="coffee icon" height="35" width="35">
                                    </div>
                                </button>
                        </footer>
                        `;
      cardContainer.appendChild(div);
    });
  } catch (error) {
    console.error("Supaabase fetch failed:", error);
  }
}

getCards();

