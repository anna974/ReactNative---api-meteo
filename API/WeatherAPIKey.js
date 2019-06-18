const API_KEY = "eac9183d241e44b91b0fca3f4a818575";

export function getLocationWeather (location) {
  const url = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + API_KEY + '&units=metric&q=' + location
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}