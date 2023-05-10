let addFerry = true;
// hides and render whole list of ferries
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector(".showFerryList");
  const ferryCollection = document.querySelector("#ferryCollection");
  const list = document.querySelector("#showFerryList");
  addBtn.addEventListener("click", () => {
    addFerry = !addFerry;
    if (!addFerry) {
      ferryCollection.style.display = "none";
      list.textContent = "Open Ferries";
      // getFerry();
    } else {
      ferryCollection.style.display = "block";
      list.textContent = "Close Ferries";
    }
  });

  // asynchronously GETs ferry data from BC ferry API
  async function getFerry() {
    try {
      const response = await fetch("https://www.bcferriesapi.ca/api/TSA/SWB/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const sailings = await response.json();
      filterFerrybyTime(sailings);
      renderFerry(sailings.sailings);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  setInterval(getFerry, 5000)

  // Converts the string time data from API to comparable time format
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

    const timestamp = date.getTime();
    return timestamp;
  }

  // Uses the time input from web to filter the ferries departing after the searched time
  function filterFerrybyTime(sailings) {
    const form = document.querySelector(".search-ferry");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ferryCollection = document.querySelector("#ferryCollection");
      ferryCollection.querySelectorAll(".card").forEach((c) => c.remove());
      const timeInput = e.target["time"].value;
      const [hours, minutes] = timeInput.split(":");
      let date = new Date();
      date.setHours(parseInt(hours));
      date.setMinutes(parseInt(minutes));
      const timeStamp = date.getTime();
      const filterTimeArray = sailings.sailings.filter((sailing) => {
        return convertToTimestamp(sailing.time) >= timeStamp;
      });
      renderFerry(filterTimeArray);
    });
  }

  // makes search icon hover when mouse is on top
  function hoverSubmit() {
    const submitBtn = document.querySelector(".submit");
    submitBtn.addEventListener("mouseover", () => {
      submitBtn.style.transform = "scale(1.2)";
      submitBtn.style.zIndex = "1";
    });
    submitBtn.addEventListener("mouseout", () => {
      submitBtn.style.transform = "scale(1)";
      submitBtn.style.zIndex = "0";
    });
  }
  hoverSubmit();

  // make BC ferry logo hover when mouse comes on top | also refreshes the page when logo is clicked
  function logoRefresh() {
    const refreshLogo = document.querySelector("#bcFerriesImage");
    refreshLogo.addEventListener("mouseover", () => {
      refreshLogo.style.transform = "scale(1.1)";
      refreshLogo.style.zIndex = "1";
    });
    refreshLogo.addEventListener("mouseout", () => {
      refreshLogo.style.transform = "scale(1)";
      refreshLogo.style.zIndex = "0";
    });
    refreshLogo.addEventListener("click", () => location.reload());
  }
  logoRefresh();

  //Footer button which takes you to top when clicked
  function takeMeToTop() {
    const topBtn = document.querySelector(".topBtn");
    topBtn.addEventListener("click", () => {
      document.body.scrollTo({
        top: 0,
      });
    });
  }
  takeMeToTop();
  // Renders ferry data in cards into DOM
  function renderFerry(sailings) {
    ferryCollection.replaceChildren()
    sailings.forEach((sailing) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const h2 = document.createElement("h2");
      h2.textContent = sailing.vesselName;
      const p1 = document.createElement("p");
      p1.textContent = `Departing at : `;
      const timeSpan = document.createElement("span");
      timeSpan.textContent = sailing.time;
      timeSpan.style.color = "blue"; // Set the color of the timeSpan
      p1.appendChild(timeSpan);
      const p2 = document.createElement("p");
      p2.textContent = `Percentage occupied : ${sailing.fill} %`;
      const p3 = document.createElement("p");
      p3.textContent = `Departing date : ${new Date(
        Date.now()
      ).toLocaleDateString()}`;
      // const btn = document.createElement("button");
      // btn.textContent = "Add to calendar";

      card.appendChild(h2);
      card.appendChild(p1);
      card.appendChild(p2);
      card.append(p3); // date append
      // card.append(btn);
      ferryCollection.appendChild(card);

      // renders extra information when mouse is hovered over the cards
      let isAppended = false;

      card.addEventListener("mouseover", () => {
        card.style.transform = "scale(1.1)";
        card.style.zIndex = "1";

        if (!isAppended) {
          const p4 = document.createElement("h4");
          p4.textContent = `Car occupancy : ${sailing.carFill} %`;
          const p5 = document.createElement("h4");
          p5.textContent = `Heavy vehile occupancy : ${sailing.oversizeFill} %`;
          card.append(p4);
          card.append(p5);
          isAppended = true;
        }
      });

      card.addEventListener("mouseout", () => {
        card.style.transform = "scale(1)";
        card.style.zIndex = "0";

        if (isAppended) {
          const p4 = card.querySelector("h4");
          p4.remove();
          const p5 = card.querySelector("h4");
          p5.remove();
          isAppended = false;
        }
      });
    });
  }
});
