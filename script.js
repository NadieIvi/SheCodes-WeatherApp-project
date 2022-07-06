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

function showHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
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

function displayForecast() {
  let forecastElement = document.querySelector(".forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col weather-dayly">
            <div class="forecast__date">
              ${day} <br />
              23.05
            </div>
            <img src="" alt="" class=" forecast__img "/>
            <div class="forecast__temp">
            <span class="forecast__temp_max">+8</span>° / 
            <span class="forecast__temp_min">+4</span>°</div>
            <div class="forecast__description">Cloudy
            </div>
            <div class="forecast__indicator">Humidity</div>
            <div class="forecast__indicator_humidity">86%</div>
            <div class="forecast__indicator">Sunrise</div>
            <div class="forecast__indicator_sunrise">2:21 am</div>
            <div class="forecast__indicator">Sunset</div>
            <div class="forecast__indicator_sunset">11:23 am</div>
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
  let sunrise = document.querySelector(".sunrise");
  let sunset = document.querySelector(".sunset");

  displayForecast();

  cTemp = response.data.main.temp;
  temperature.innerHTML = Math.round(cTemp);
  cityName.innerHTML = response.data.name;
  currentWeatherDescription.innerHTML = response.data.weather[0].description;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}Km/H`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  date.innerHTML = formatDate(response.data.dt * 1000);
  sunrise.innerHTML = showHours(response.data.sys.sunrise * 1000);
  sunset.innerHTML = showHours(response.data.sys.sunset * 1000);
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
