import { getWeather } from "./API";

let defaultWeather = await getWeather("new york city");

const currentConditions = document.querySelector(".current-conditions");
currentConditions.textContent = defaultWeather.current.condition.text;

const currentTemp = document.querySelector(".current-temp");
currentTemp.textContent = defaultWeather.current.temp_f;

const location = document.querySelector(".location");
location.textContent = defaultWeather.location.name;

const date = document.querySelector(".date");
date.textContent = defaultWeather.location.localtime;

export default currentConditions;

// set up function to fill in page with weather data, call it again on every search
