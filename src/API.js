async function getWeather(location) {
  const data = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=816471dde35e41b9b0a62442241202&q=${location}`,
    { mode: "cors" }
  );
  const WeatherData = await data.json();
  return WeatherData;
}

async function getForecast(location) {
  const data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=816471dde35e41b9b0a62442241202&q=${location}&days=8`,
    { mode: "cors" }
  );
  const forecastData = await data.json();
  return forecastData;
}

export { getWeather, getForecast };
