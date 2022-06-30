// Current date
// let now = new Date();
// let days = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];
// let day = days[now.getDay()];
// let hours = now.getHours();
// if (hours < 10) {
//   hours = `0${hours}`;
// }
// let minutes = now.getMinutes();
// if (minutes < 10) {
//   minutes = `0${minutes}`;
// }
// let currentDate = document.querySelector(".current-date");
// currentDate.innerHTML = `${day}, ${hours}:${minutes}`;

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
    return `${day}, ${hours}:${minutes}`;
  }
}

//Celsius and Fahrenheit
// let measure = "c";
// function celsiusToFahrenheit() {
//   if (measure == "f") return;
//   event.preventDefault();
//   let tempContainer = document.querySelector(".temp");
//   let temp = tempContainer.innerText;
//   temp = (temp * 9) / 5 + 32;
//   tempContainer.innerHTML = temp;
//   measure = "f";
// }
// function fahrenheitToCelsius() {
//   if (measure == "c") return;
//   event.preventDefault();
//   let tempContainer = document.querySelector(".temp");
//   let temp = tempContainer.innerText;
//   temp = ((temp - 32) * 5) / 9;
//   tempContainer.innerHTML = temp;
//   measure = "c";
// }

// document
//   .querySelector(".c-temp")
//   .addEventListener("click", fahrenheitToCelsius);
// document
//   .querySelector(".f-temp")
//   .addEventListener("click", celsiusToFahrenheit);

//to show city and its weather

let apiKey = "31be422c13c4e30e5166b078a65d2565";

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  let cityName = document.querySelector(".current-weather__city_title");
  cityName.innerHTML = searchInput.value;
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&&units=metric`;
  axios.get(cityUrl).then(showCityWeather);
}
let searchInput = document.querySelector(".search-input");
let form = document.querySelector("#searching-form");
form.addEventListener("submit", showCity);

function showCityWeather(response) {
  let temperature = document.querySelector(".temp");
  let currentWeatherDescription = document.querySelector(
    ".current-weather__description"
  );
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let date = document.querySelector(".current-date");

  temperature.innerHTML = Math.round(response.data.main.temp);
  currentWeatherDescription.innerHTML = response.data.weather[0].description;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}Km/H`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  date.innerHTML = formatDate(response.data.dt * 1000);
}

//to show weather of current position

function showPosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showWeather(response) {
  let temperature = document.querySelector(".temp");
  let cityName = document.querySelector(".current-weather__city_title");
  let currentWeatherDescription = document.querySelector(
    ".current-weather__description"
  );
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let date = document.querySelector(".current-date");

  temperature.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  currentWeatherDescription.innerHTML = response.data.weather[0].description;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}Km/H`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  date.innerHTML = formatDate(response.data.dt * 1000);
}

let button = document.querySelector(".current-position-button");
button.addEventListener("click", getCurrentPosition);
