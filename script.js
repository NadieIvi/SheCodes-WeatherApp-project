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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return `${days[day]},`;
}
function formatMonth(timestamp) {
  let date = new Date(timestamp * 1000);
  let month = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Nov",
    "Dec",
  ];
  dateNumber = date.getDate();
  return `${months[month]} ${dateNumber} `;
}

//to show city and its weather
function search(city) {
  let apiKey = "31be422c13c4e30e5166b078a65d2565";
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(cityUrl).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  search(searchInput.value);
}

let form = document.querySelector("#searching-form");
form.addEventListener("submit", handleSubmit);

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response);
  let forecastElement = document.querySelector(".forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col weather-dayly">
            <div class="forecast__date">
              ${formatDay(forecastDay.dt)} <br />
             ${formatMonth(forecastDay.dt)}
            </div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" class="forecast__img "/>
            <div class="forecast__temp">
            <span class="forecast__temp_max">${Math.round(
              forecastDay.temp.max
            )}</span>° /
            <span class="forecast__temp_min">${Math.round(
              forecastDay.temp.min
            )}</span>°</div>
             <div class="forecast__indicator">Humidity</div>
            <div class="forecast__indicator_humidity">${Math.round(
              forecastDay.humidity
            )}%</div>
            <div class="forecast__indicator">Wind</div>
            <div class="forecast__indicator_wind">${Math.round(
              forecastDay.wind_speed
            )}Km/H</div>
           
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "31be422c13c4e30e5166b078a65d2565";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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
  // let sunrise = document.querySelector(".sunrise");
  // let sunset = document.querySelector(".sunset");

  cTemp = response.data.main.temp;
  temperature.innerHTML = Math.round(cTemp);
  cityName.innerHTML = response.data.name;
  currentWeatherDescription.innerHTML = response.data.weather[0].description;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}Km/H`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  date.innerHTML = formatDate(response.data.dt * 1000);
  // sunrise.innerHTML = showHours(response.data.sys.sunrise * 1000);
  // sunset.innerHTML = showHours(response.data.sys.sunset * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  getForecast(response.data.coord);
}

// to show weather of current position

function showPosition(position) {
  let apiKey = "31be422c13c4e30e5166b078a65d2565";
  let currentPositionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(currentPositionUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
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

search("Zhytomyr");
