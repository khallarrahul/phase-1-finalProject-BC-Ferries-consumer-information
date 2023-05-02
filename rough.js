function filterFerrybyTime(sailings) {
    const form = document.querySelector(".search-ferry");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const timeInput = e.target["time"].value;  // it would access the string value of time from API. i would have to turn the string to timestamp. How do i do that?
      const filteredSailings = sailings.sailings.filter((sailing) => {
        return sailing.time >= timeInput;
      }); // i need to account for AM/PM, since how would JS know that in reference for today, AM from next day > PM for this day(8am> 9pm respectively)
      ferryCollection.innerText = ""; 
      if (filteredSailings.length > 0) {
        renderFerry({ sailings: filteredSailings });
      } else {
        ferryCollection.textContent = "No ferries available at that time.";
      }
    });
  }
