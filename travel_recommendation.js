let url = "./travel_recommendation_api.json"; // Ensure the path to your JSON file is correct

// show countries
function showCountries(countries) {
  console.log(countries);
  let cities = [];
  countries.forEach((country) => {
    Object.values(country["cities"]).forEach((city) => {
      cities.push(city);
    });
  });

  cities.forEach((city) => {
    displayItems(city["imageUrl"], city["name"], city["description"]);
  });
}

// show temples
function showTemples(templeData) {
  templeData.forEach((temple) => {
    displayItems(temple["imageUrl"], temple["name"], temple["description"]);
  });
}

// show beaches
function showBeaches(beachData) {
  beachData.forEach((beach) => {
    displayItems(beach["imageUrl"], beach["name"], beach["description"]);
  });
}

function search() {
  const userInput = document.getElementById("destination").value.trim();
  console.log(userInput);

  // fetch data
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON from the response
    })
    .then((data) => {
      const { countries, temples, beaches } = data; // Destructure the data
      const countriesRegex = /^(country|countries)$/i;
      const templesRegex = /^(temple|temples)$/i;
      const beachesRegex = /^(beach|beaches)$/i;

      if (countriesRegex.test(userInput)) {
        showCountries(countries);
      } else if (templesRegex.test(userInput)) {
        showTemples(temples);
      } else if (beachesRegex.test(userInput)) {
        showBeaches(beaches);
      } else {
        console.log("No matching destination type found.");
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

document.getElementById("search-btn").addEventListener("click", search);
document.getElementById("clear-btn").addEventListener("click", clear);

function clear() {
  document.getElementById("destination").value = "";
  const destinationList = document.getElementById("destination-lists");
  destinationList.innerHTML = "";
}

function displayItems(imgSrc, name, desc) {
  const destinationList = document.getElementById("destination-lists");

  const itemElement = document.createElement("div");

  itemElement.innerHTML = `
    <div class="destination-card" >
        <img src="${imgSrc}" alt="${name}" />
        <br />
        <h2>${name}</h2>
        <br />
        <p>${desc}</p>
    </div>
  `;

  destinationList.appendChild(itemElement);
}
