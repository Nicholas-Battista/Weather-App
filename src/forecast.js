import { getForecast } from "./API";
import { format, parseISO } from "date-fns";

let defaultForecast = await getForecast("flagstaff");

function displayForcast(forecastData) {
  const forecastContainer = document.querySelector(".forecast");
  forecastData.forecast.forecastday.forEach((day) => {
    console.log(day);
    const card = document.createElement("div");
    card.classList.add("daily-card");

    card.appendChild(appendDayofWeek(day.date));
    card.appendChild(appendAvgTemp(day.day.avgtemp_f));
    card.appendChild(appendLowTemp(day.day.mintemp_f));

    forecastContainer.appendChild(card);
  });
}

function appendDayofWeek(date) {
  const parsedDate = parseISO(date);
  const dayOfWeek = format(parsedDate, "EEEE");
  const dayElement = document.createElement("h3");
  dayElement.classList.add("day");
  dayElement.textContent = dayOfWeek;
  return dayElement;
}

function appendAvgTemp(avgTemp) {
  const avgTempElement = document.createElement("p");
  avgTempElement.classList.add("avgTemp");
  avgTempElement.textContent = avgTemp;
  return avgTempElement;
}

function appendLowTemp(lowTemp) {
  const lowTempElement = document.createElement("p");
  lowTempElement.classList.add("lowTemp");
  lowTempElement.textContent = lowTemp;
  return lowTempElement;
}

displayForcast(defaultForecast);

export default displayForcast;
