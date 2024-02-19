import { getWeather, getForecast } from "./API";
import { format, parseISO } from "date-fns";
import displayForcast from "./forecast";
import { measurementFlags } from "./forecast";

let defaultWeather = await getWeather("flagstaff");
let degrees;

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
  } else {
    degrees = [weatherData.current.temp_c, " °C"];
  }

  weatherElements.currentConditions.textContent =
    weatherData.current.condition.text;

  weatherElements.currentTemp.textContent = degrees[0] + degrees[1];

  weatherElements.location.textContent = `${weatherData.location.name}, ${weatherData.location.region}`;

  weatherElements.feelsLike.textContent = weatherData.current.feelslike_f;
  weatherElements.humid.textContent = weatherData.current.humidity;
  // weatherElements.precip.textContent = weatherData.current.
  weatherElements.wind.textContent = weatherData.current.wind_mph;

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

async function getSearchedLocation(value) {
  return await getWeather(value);
}

displayWeatherData(defaultWeather);

export default displayWeatherData;
