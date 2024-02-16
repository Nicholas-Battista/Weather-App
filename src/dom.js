import { getWeather } from "./API";
import { format, parseISO } from "date-fns";

let defaultWeather = await getWeather("new york city");

const currentConditions = document.querySelector(".current-conditions");
currentConditions.textContent = defaultWeather.current.condition.text;

const currentTemp = document.querySelector(".current-temp");
currentTemp.textContent = defaultWeather.current.temp_f;

const location = document.querySelector(".location");
location.textContent = defaultWeather.location.name;

const date = document.querySelector(".date");
const unformattedDate = defaultWeather.location.localtime;
const dateObject = parseISO(unformattedDate);
const formattedDate = format(dateObject, "eeee, do MMM ''yy h:mm a");
console.log(formattedDate);

date.textContent = formattedDate;

export default currentConditions;

// set up function to fill in page with weather data, call it again on every search
