async function getWeather(location) {
  const data = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=816471dde35e41b9b0a62442241202&q=${location}`,
    { mode: "cors" }
  );
  const WeatherData = await data.json();
  console.log(WeatherData);
  return WeatherData;
}

export { getWeather };
