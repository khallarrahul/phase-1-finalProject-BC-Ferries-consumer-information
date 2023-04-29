

document.addEventListener("DOMContentLoaded", (e)=>{
    e.preventDefault()})

const url = "https://www.bcferriesapi.ca/api/TSA/SWB/";
function getFerry(){
fetch(url)
  .then(response => response.json())
  .then(sailings => {
    renderFerry(sailings)
  })
}
getFerry()

function renderFerry(sailings){
    // const ferryCollection = document.querySelector("#ferryCollection");
                sailings.sailings.forEach(sailing => {console.log(sailing)
                    const card = document.createElement("div");
                    card.classList.add("card");
                    const h2 = document.createElement("h2");
                    h2.textContent = sailing.vesselName;
                    const p1 = document.createElement("p");
                    p1.textContent = `Departing at ${sailing.time}`;
                    const p2 = document.createElement("p");
                    p2.textContent = `Percentage occupied is ${sailing.fill} %`;
                    card.appendChild(h2);
                    card.appendChild(p1);
                    card.appendChild(p2);
                    ferryCollection.appendChild(card);
    })
}

// setInterval(() => {
//     location.reload();
//   }, 30000);

