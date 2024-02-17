import { getForecast } from "./API";
import { format, parseISO } from "date-fns";

let defaultForecast = await getForecast("flagstaff");

function displayDailyForcast(forecastData) {
  const forecastContainer = document.querySelector(".forecast");
  forecastData.forecast.forecastday.slice(1).forEach((day) => {
    console.log(day);
    const card = document.createElement("div");
    card.classList.add("daily-card");

    card.appendChild(appendDayofWeek(day.date));
    card.appendChild(appendAvgTemp(day.day.avgtemp_f));
    card.appendChild(appendLowTemp(day.day.mintemp_f));
    card.appendChild(appendIcon(day.day.condition.icon));

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

function appendIcon(iconPath) {
  const icon = document.createElement("img");
  icon.src = iconPath;
  return icon;
}

function displayHourlyForecast(forecastData) {
  const forecastContainer = document.querySelector(".forecast");
  const currentTime = parseInt(
    forecastData.location.localtime.split(" ")[1].slice(0, -3)
  );
  console.log(currentTime);
  let counter = 23;
  const today = forecastData.forecast.forecastday[0].hour;
  const nextDay = forecastData.forecast.forecastday[1].hour;
  console.log(today);

  for (let i = currentTime + 1; i <= today.length - 1; i++) {
    counter--;
    const hour = today[i];
    console.log(hour);
    const hourCard = document.createElement("div");
    hourCard.classList.add("card-hour");

    const condition = document.createElement("p");
    condition.textContent = hour.condition.text;

    const temp = document.createElement("p");
    temp.textContent = hour.temp_f;

    const icon = document.createElement("img");
    icon.src = hour.condition.icon;

    hourCard.appendChild(condition);
    hourCard.appendChild(temp);
    hourCard.appendChild(icon);
    forecastContainer.appendChild(hourCard);
  }
  for (let i = 0; i <= counter; i++) {
    const hour = nextDay[i];
    const hourCard = document.createElement("div");
    hourCard.classList.add("card-hour");

    const condition = document.createElement("p");
    condition.textContent = hour.condition.text;

    const temp = document.createElement("p");
    temp.textContent = hour.temp_f;

    const icon = document.createElement("img");
    icon.src = hour.condition.icon;

    hourCard.appendChild(condition);
    hourCard.appendChild(temp);
    hourCard.appendChild(icon);
    forecastContainer.appendChild(hourCard);
  }
}

document.querySelector(".hourly").addEventListener("click", () => {
  const forecastContainer = document.querySelector(".forecast");
  forecastContainer.innerHTML = "";
  displayHourlyForecast(defaultForecast);
});

displayDailyForcast(defaultForecast);
// displayHourlyForecast(defaultForecast);

export default displayDailyForcast;
