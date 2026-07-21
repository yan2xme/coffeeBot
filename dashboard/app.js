async function getCards(type) {
  const cardContainer = document.getElementById("card");
  const cardContainer2 = document.getElementById("card2");
  const cardContainer3 = document.getElementById("card3");


  try {
    switch (type) {
      case "getOrdersToday":
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
                                    <h1 class="font-[Apple_Garamond_Light] pt-1 pl-2 text-xl mr-5">${building}</h1>
                            </div>

                            <div class="border-l sticky left-10">
                                    <h1 class="font-[Apple_Garamond_Light] ml-7 pl-2 text-2xl">₱${price}</h1>
                            </div>
                        </div>
                </div>
                        <footer>
                                <button data-id="${id}" class="complete cursor-pointer bg-[#008F6B] hover:bg-blue-700 h-13 w-80 p-2.5 inline-flex">
                                    <h1 class="font-[Apple_Garamond_Light] pl-2 text-white text-2xl">Mark as Completed</h1>
                                    <div class="h-8.5 w-8.5 bg-white relative -right-20">
                                        <img src="../src/check.svg" alt="coffee icon" height="35" width="35">
                                    </div>
                                </button>
                                <br>
                                <button data-id="${id}" class="voided cursor-pointer bg-black hover:bg-blue-700 h-13 w-80 p-2.5 inline-flex">
                                    <h1 class="font-[Apple_Garamond_Light] pl-2 text-white text-2xl">Mark as Void</h1>
                                    <div class="h-8.5 w-8.5 bg-white relative -right-33.5">
                                        <img src="../src/exit.svg" alt="coffee icon" height="35" width="35">
                                    </div>
                                </button>
                        </footer>
                        `;
          cardContainer.appendChild(div);
          const complete = div.querySelector(".complete");
          const voided = div.querySelector(".voided");

          complete.addEventListener("click", () => {
            setStatus(id, "Completed");
          });
          voided.addEventListener("click", () => {
            setStatus(id, "Voided");
          });
        });
        break;

      case "completeOrders":
        const res2 = await fetch("http://localhost:3000/api/orders/completed", {
          headers: {
            "x-admin-secret": "coffeebotadmin2025",
          },
        });
        const result2 = await res2.json();

        cardContainer2.innerHTML = "";

        result2.forEach((card) => {
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
                                    <h1 class="font-[Apple_Garamond_Light] pt-1 pl-2 text-xl mr-5">${building}</h1>
                            </div>

                            <div class="border-l sticky left-10">
                                    <h1 class="font-[Apple_Garamond_Light] ml-7 pl-2 text-2xl">₱${price}</h1>
                            </div>
                        </div>
                </div>
                        `;
          cardContainer2.appendChild(div);
        });
        break;

      case "Voided":
        const res3 = await fetch("http://localhost:3000/api/orders/voided", {
          headers: {
            "x-admin-secret": "coffeebotadmin2025",
          },
        });
        const result3 = await res3.json();

        cardContainer3.innerHTML = "";

        result3.forEach((card) => {
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
                                    <h1 class="font-[Apple_Garamond_Light] pt-1 pl-2 text-xl mr-5">${building}</h1>
                            </div>

                            <div class="border-l sticky left-10">
                                    <h1 class="font-[Apple_Garamond_Light] ml-7 pl-2 text-2xl">₱${price}</h1>
                            </div>
                        </div>
                </div>
                        `;
          cardContainer3.appendChild(div);
        });
        break;
    }
  } catch (error) {
    console.error("Supaabase fetch failed:", error);
  }
}

async function setStatus(id, prompt) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/orders/${id}/status/${prompt}`,
      {
        method: "PATCH",
        headers: {
          "x-admin-secret": "coffeebotadmin2025",
        },
      },
    );
    const result = await res.json();

    console.log("clicked");
  } catch (error) {
    console.log(error);
  }
}


const pageName = window.location.pathname.split('/').pop();

if (pageName === 'gettodayorders.html') {
  getCards("getOrdersToday");
}

if (pageName === 'completedorders.html') {
  getCards("completeOrders");
}


if (pageName === 'voidedorders.html') {
  getCards("Voided");
}


