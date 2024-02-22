import { getWeather } from "./API";
import { format, parseISO } from "date-fns";
import { measurementFlags } from "./forecast";

let defaultWeather = await getWeather("flagstaff");
let degrees;
let feelsLike;
let wind;

const weatherElements = {
  currentConditions: document.querySelector(".current-conditions"),
  currentTemp: document.querySelector(".current-temp"),
  location: document.querySelector(".location"),
  date: document.querySelector(".date"),
  icon: document.querySelector(".todays-icon"),

  feelsLike: document.querySelector(".feel"),
  humid: document.querySelector(".humid"),
  precip: document.querySelector(".chance-of-prep"),
  wind: document.querySelector(".wind"),
};

function displayWeatherData(weatherData) {
  if (measurementFlags.f) {
    degrees = [weatherData.current.temp_f, " °F"];
    feelsLike = [weatherData.current.feelslike_f, " °F"];
    wind = [weatherData.current.wind_mph, "mph Wind"];
  } else {
    degrees = [weatherData.current.temp_c, " °C"];
    feelsLike = [weatherData.current.feelslike_c, " °C"];
    wind = [weatherData.current.wind_kph, "kph Wind"];
  }

  weatherElements.currentConditions.textContent =
    weatherData.current.condition.text;

  weatherElements.currentTemp.textContent = degrees[0] + degrees[1];

  weatherElements.location.textContent = `${weatherData.location.name}, ${weatherData.location.region}`;

  weatherElements.feelsLike.textContent =
    feelsLike[0] + feelsLike[1] + " Real Feel";

  weatherElements.humid.textContent =
    weatherData.current.humidity + "% Humidity";

  weatherElements.wind.textContent = wind[0] + wind[1];

  weatherElements.icon.src = weatherData.current.condition.icon;

  formateDate(weatherData);
}

function formateDate(weather) {
  const unformattedDate = weather.location.localtime;
  const dateObject = parseISO(unformattedDate);
  const formattedDate = format(dateObject, "eeee, do MMM ''yy h:mm a");
  weatherElements.date.textContent = formattedDate;
}

document.getElementById("search").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getSearchedLocation(document.getElementById("search").value)
      .then((data) => {
        displayWeatherData(data);
      })
      .catch(() => {
        console.log("failed");
      });
  }
});

document.querySelector(".searchBtn").addEventListener("click", () => {
  getSearchedLocation(document.getElementById("search").value)
    .then((data) => {
      displayWeatherData(data);
    })
    .catch(() => {
      console.log("failed");
    });
});

async function getSearchedLocation(value) {
  return await getWeather(value);
}

displayWeatherData(defaultWeather);

export default displayWeatherData;
