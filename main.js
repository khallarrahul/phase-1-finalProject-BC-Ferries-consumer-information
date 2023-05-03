let addFerry = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector(".showFerryList");
  const ferryCollection = document.querySelector("#ferryCollection");
  const list = document.querySelector("#showFerryList");
  addBtn.addEventListener("click", () => {
    addFerry = !addFerry;
    if (addFerry) {
      ferryCollection.style.display = "block";
      list.textContent = "Close Ferries";
      // getFerry();
    } else {
      ferryCollection.style.display = "none";
      list.textContent = "Open Ferries";
    }
  });

  function getFerry() {
    fetch("https://www.bcferriesapi.ca/api/TSA/SWB/")
      .then((response) => response.json())
      .then((sailings) => {
        filterFerrybyTime(sailings);
        renderFerry(sailings.sailings);
      });
    // .catch(error => console.log(error), 1000)
  }
  getFerry();

  function convertToTimestamp(time) {
    const [hours, minutes] = time.split(":");
    let date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    if (date.getHours() < 12 && time.includes("PM")) {
      date.setHours(date.getHours() + 12);
    } else if (date.getHours() === 12 && time.includes("AM")) {
      date.setHours(date.getHours() - 12);
    }
    // const timeIn24HourFormat = `${date
    //   .getHours()
    //   .toString()
    //   .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    const timestamp = date.getTime();
    return timestamp;
  }

  function filterFerrybyTime(sailings) {
    const form = document.querySelector(".search-ferry");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ferryCollection = document.querySelector("#ferryCollection");
      ferryCollection.querySelectorAll(".card").forEach((c) => c.remove());
      const timeInput = e.target["time"].value;
      // const timeValue = timeInput;
      const [hours, minutes] = timeInput.split(":");
      let date = new Date();
      date.setHours(parseInt(hours));
      date.setMinutes(parseInt(minutes));
      const timeStamp = date.getTime();
      // const filteredSailings = sailings.sailings.filter((sailing) => {
      // return sailing.time >= timeInput;
      // Output: "02:00 PM"
      const filterTimeArray = sailings.sailings.filter((sailing) => {
        return convertToTimestamp(sailing.time) >= timeStamp;
      });
      renderFerry(filterTimeArray);
      // }); // i need to account for AM/PM, since how would JS know that in reference for today, AM from next day > PM for this day(8am> 9pm respectively)
      // ferryCollection.innerText = "";
      // if (filteredSailings.length > 0) {
      //   renderFerry({ sailings: filteredSailings });
      // } else {
      //   ferryCollection.textContent = "No ferries available at that time.";
      // }
    });
  }

  function logoRefresh(){
    const refreshLogo = document.querySelector("#bcFerriesImage");
    refreshLogo.addEventListener("click", () => location.reload());
  }
  logoRefresh()

  function renderFerry(sailings) {
    sailings.forEach((sailing) => {
      console.log(sailing);
      // ferryCollection.innerHTML = null;

      const card = document.createElement("div");
      card.classList.add("card");

      const h2 = document.createElement("h2");
      h2.textContent = sailing.vesselName;
      const p1 = document.createElement("p");
      p1.textContent = `Departing at ${sailing.time}`;
      const p2 = document.createElement("p");
      p2.textContent = `Percentage occupied is ${sailing.fill} %`;
      const p3 = document.createElement("p");
      p3.textContent = `Departing date is ${new Date(
        Date.now()
      ).toLocaleDateString()}`; // how to add date of departure?
      const btn = document.createElement("button");
      btn.textContent = "Add to calendar";

      card.appendChild(h2);
      card.appendChild(p1);
      card.appendChild(p2);
      card.append(p3); // date append
      card.append(btn);
      ferryCollection.appendChild(card);

      card.addEventListener("mouseover", () => {
        card.style.transform = "scale(1.1)";
        card.style.zIndex = "1";
      });

      card.addEventListener("mouseout", () => {
        card.style.transform = "scale(1)";
        card.style.zIndex = "0";
      });
    });
  }
});
