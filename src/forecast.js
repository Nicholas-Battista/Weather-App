import { getForecast } from "./API";
import { format, parseISO } from "date-fns";
import displayWeatherData from "./dom";

let defaultForecast = await getForecast("flagstaff");
let previousCast = defaultForecast;

function displayDailyForcast(forecastData) {
  const forecastContainer = document.querySelector(".forecast");
  forecastContainer.innerHTML = "";
  forecastData.forecast.forecastday.slice(1).forEach((day) => {
    const card = document.createElement("div");
    card.classList.add("daily-card");

    card.appendChild(appendDayofWeek(day.date));
    card.appendChild(appendAvgTemp(determineMeasurementDailyAvg(day)));
    card.appendChild(appendLowTemp(determineMeasurementDailyMin(day)));
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

  let counter = 23;
  const today = forecastData.forecast.forecastday[0].hour;
  const nextDay = forecastData.forecast.forecastday[1].hour;

  for (let i = currentTime + 1; i <= today.length - 1; i++) {
    counter--;
    const hour = today[i];

    const hourCard = document.createElement("div");
    hourCard.classList.add("card-hour");

    const time = document.createElement("p");
    time.textContent = format(new Date().setHours(i), "ha");

    const condition = document.createElement("p");
    condition.textContent = hour.condition.text;

    const temp = document.createElement("p");
    temp.textContent =
      determineMeasurement(hour)[0] + determineMeasurement(hour)[1];

    const icon = document.createElement("img");
    icon.src = hour.condition.icon;

    hourCard.appendChild(time);
    hourCard.appendChild(condition);
    hourCard.appendChild(temp);
    hourCard.appendChild(icon);
    forecastContainer.appendChild(hourCard);
  }
  for (let i = 0; i <= counter; i++) {
    const hour = nextDay[i];
    const hourCard = document.createElement("div");
    hourCard.classList.add("card-hour");

    const time = document.createElement("p");
    time.textContent = format(new Date().setHours(i), "ha");

    const condition = document.createElement("p");
    condition.textContent = hour.condition.text;

    const temp = document.createElement("p");
    temp.textContent =
      determineMeasurement(hour)[0] + determineMeasurement(hour)[1];

    const icon = document.createElement("img");
    icon.src = hour.condition.icon;
    hourCard.appendChild(time);
    hourCard.appendChild(condition);
    hourCard.appendChild(temp);
    hourCard.appendChild(icon);
    forecastContainer.appendChild(hourCard);
  }
}

document.querySelector(".hourly").addEventListener("click", () => {
  const forecastContainer = document.querySelector(".forecast");
  forecastContainer.innerHTML = "";
  document.querySelector(".hourly").classList.add("is-active");
  document.querySelector(".daily").classList.remove("is-active");
  forecastContainer.classList.add("hourlyForecast");

  document.querySelector(".current").textContent = "Hourly Forecast ";

  displayHourlyForecast(defaultForecast);
});

document.querySelector(".daily").addEventListener("click", () => {
  const forecastContainer = document.querySelector(".forecast");
  forecastContainer.innerHTML = "";
  document.querySelector(".daily").classList.add("is-active");
  document.querySelector(".hourly").classList.remove("is-active");
  forecastContainer.classList.remove("hourlyForecast");

  document.querySelector(".current").textContent = "Daily Forecast ";
  displayDailyForcast(defaultForecast);
});

document.querySelector(".searchBtn").addEventListener("click", () => {
  const errmsg = document.querySelector(".errMsg");
  errmsg.textContent = "";
  document
    .querySelector(".spinner-content")
    .classList.remove("spinner-inactive");
  getForecast(document.getElementById("search").value)
    .then((data) => {
      document.getElementById("search").value = "";
      displayDailyForcast(data);
      document
        .querySelector(".spinner-content")
        .classList.add("spinner-inactive");
      previousCast = data;
      document.querySelector(".hourly").addEventListener("click", () => {
        const forecastContainer = document.querySelector(".forecast");
        forecastContainer.innerHTML = "";
        displayHourlyForecast(data);
      });
      document.querySelector(".daily").addEventListener("click", () => {
        const forecastContainer = document.querySelector(".forecast");
        forecastContainer.innerHTML = "";
        displayDailyForcast(data);
      });
    })
    .catch(() => {
      document.getElementById("search").value = "";
      errmsg.textContent = "Please enter a valid city";
      displayDailyForcast(previousCast);
      document
        .querySelector(".spinner-content")
        .classList.add("spinner-inactive");
    });
});

document.getElementById("search").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const errmsg = document.querySelector(".errMsg");
    errmsg.textContent = "";
    document
      .querySelector(".spinner-content")
      .classList.remove("spinner-inactive");
    getForecast(document.getElementById("search").value)
      .then((data) => {
        document.getElementById("search").value = "";
        displayDailyForcast(data);
        document
          .querySelector(".spinner-content")
          .classList.add("spinner-inactive");
        previousCast = data;
        document.querySelector(".hourly").addEventListener("click", () => {
          const forecastContainer = document.querySelector(".forecast");
          forecastContainer.innerHTML = "";
          displayHourlyForecast(data);
        });
        document.querySelector(".daily").addEventListener("click", () => {
          const forecastContainer = document.querySelector(".forecast");
          forecastContainer.innerHTML = "";
          displayDailyForcast(data);
        });
      })
      .catch(() => {
        document.getElementById("search").value = "";
        errmsg.textContent = "Please enter a valid city";
        displayDailyForcast(previousCast);
        document
          .querySelector(".spinner-content")
          .classList.add("spinner-inactive");
      });
  }
});

let measurementFlags = {
  f: true,
  c: false,
};

document.querySelector(".f").addEventListener("click", () => {
  measurementFlags.f = true;
  measurementFlags.c = false;

  const forecastContainer = document.querySelector(".forecast");
  forecastContainer.innerHTML = "";

  document.querySelector(".f").classList.add("is-active");
  document.querySelector(".c").classList.remove("is-active");

  displayWeatherData(previousCast);
  determineRerun();
});

document.querySelector(".c").addEventListener("click", () => {
  measurementFlags.f = false;
  measurementFlags.c = true;

  const forecastContainer = document.querySelector(".forecast");
  forecastContainer.innerHTML = "";

  document.querySelector(".f").classList.remove("is-active");
  document.querySelector(".c").classList.add("is-active");

  displayWeatherData(previousCast);
  determineRerun();
});

function determineMeasurement(hour) {
  if (measurementFlags.f) {
    const f = [hour.temp_f, " °F"];
    return f;
  } else {
    const c = [hour.temp_c, " °C"];
    return c;
  }
}

function determineMeasurementDailyAvg(day) {
  if (measurementFlags.f) {
    const f = day.day.avgtemp_f + " °F";
    return f;
  } else {
    const c = day.day.avgtemp_c + " °C";
    return c;
  }
}

function determineMeasurementDailyMin(day) {
  if (measurementFlags.f) {
    const f = day.day.mintemp_f + " °F";
    return f;
  } else {
    const c = day.day.mintemp_c + " °C";
    return c;
  }
}

function determineRerun() {
  if (document.querySelector(".hourly").classList.contains("is-active")) {
    return displayHourlyForecast(previousCast);
  } else {
    return displayDailyForcast(previousCast);
  }
}

displayDailyForcast(defaultForecast);
document.querySelector(".current").textContent = "Daily Forecast ";

export default displayDailyForcast;
export { measurementFlags };
