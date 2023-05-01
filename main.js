
let addFerry = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector(".showFerryList");
  const ferryCollection = document.querySelector("#ferryCollection");
  const list = document.querySelector("#showFerryList");

  function getFerry() {
    fetch("https://www.bcferriesapi.ca/api/TSA/SWB/")
      .then(response => response.json())
      .then(sailings => {
        renderFerry(sailings)
      })
  }

  function renderFerry(sailings) {
    sailings.sailings.forEach(sailing => {
      console.log(sailing)
      const card = document.createElement("div");
      card.classList.add("card");
      const h2 = document.createElement("h2");
      h2.textContent = sailing.vesselName;
      const p1 = document.createElement("p");
      p1.textContent = `Departing at ${sailing.time}`;
      const p2 = document.createElement("p");
      p2.textContent = `Percentage occupied is ${sailing.fill} %`;
      const btn = document.createElement("button");
      btn.textContent = "Add to calendar";

      card.appendChild(h2);
      card.appendChild(p1);
      card.appendChild(p2);
      card.append(btn);
      ferryCollection.appendChild(card);
    });
  }
});

