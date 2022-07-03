let apiKey = "31be422c13c4e30e5166b078a65d2565";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Zhytomyr&appid=${apiKey}&&units=metric`;

axios.get(apiUrl).then(showWeather);

// Current date
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
  }
  return `${day}, ${hours}:${minutes}`;
}

//to show city and its weather

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  let cityName = document.querySelector(".current-weather__city_title");
  cityName.innerHTML = searchInput.value;
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&&units=metric`;
  axios.get(cityUrl).then(showWeather);
}
let searchInput = document.querySelector(".search-input");
let form = document.querySelector("#searching-form");
form.addEventListener("submit", showCity);

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
  let icon = document.querySelector(".current-weather__icon");

  cTemp = response.data.main.temp;
  temperature.innerHTML = Math.round(cTemp);
  cityName.innerHTML = response.data.name;
  currentWeatherDescription.innerHTML = response.data.weather[0].description;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}Km/H`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

//Celsius and Fahrenheit
function showFTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fTemp = (cTemp * 9) / 5 + 32;

  temperature.innerHTML = Math.round(fTemp);
}

function showCTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  temperature.innerHTML = Math.round(cTemp);
}

let fahrenheitLink = document.querySelector(".f-temp");
fahrenheitLink.addEventListener("click", showFTemp);

let celsiusLink = document.querySelector(".c-temp");
celsiusLink.addEventListener("click", showCTemp);

let cTemp = null;

let button = document.querySelector(".current-position-button");
button.addEventListener("click", getCurrentPosition);
