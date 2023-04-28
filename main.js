document.addEventListener("DOMContentLoaded", e => e.preventDefault());

const url = "https://www.bcferriesapi.ca/api/TSA/SWB/";
fetch(url)
  .then(response => response.json())
  .then(photos => {
    console.log(photos)
  })
  .catch(error => {
    console.error(error);
  })