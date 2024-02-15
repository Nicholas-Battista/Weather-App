async function getWeather() {
  const weatherData = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=816471dde35e41b9b0a62442241202&q=flagstaff",
    { mode: "cors" }
  );

  const flagstaffData = await weatherData.json();
  console.log(flagstaffData);
}

getWeather();

export default getWeather;
