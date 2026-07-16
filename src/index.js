const form = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const cityElement = document.querySelector("#current-city");
const dateElement = document.querySelector("#current-date");
const descriptionElement = document.querySelector("#current-description");
const humidityElement = document.querySelector("#current-humidity");
const windElement = document.querySelector("#current-wind");
const temperatureElement = document.querySelector("#current-temperature");
const iconElement = document.querySelector("#current-icon");
const statusElement = document.querySelector("#status-message");

const weatherDescriptions = {
  0: ["clear sky", "☀️"],
  1: ["mainly clear", "🌤️"],
  2: ["partly cloudy", "⛅"],
  3: ["overcast", "☁️"],
  45: ["fog", "🌫️"],
  48: ["depositing rime fog", "🌫️"],
  51: ["light drizzle", "🌦️"],
  53: ["moderate drizzle", "🌦️"],
  55: ["dense drizzle", "🌧️"],
  61: ["slight rain", "🌧️"],
  63: ["moderate rain", "🌧️"],
  65: ["heavy rain", "🌧️"],
  71: ["slight snow", "🌨️"],
  73: ["moderate snow", "🌨️"],
  75: ["heavy snow", "❄️"],
  80: ["slight rain showers", "🌦️"],
  81: ["moderate rain showers", "🌧️"],
  82: ["violent rain showers", "⛈️"],
  95: ["thunderstorm", "⛈️"],
};

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function setStatus(message) {
  statusElement.textContent = message;
}

function getWeatherDescription(code) {
  return weatherDescriptions[code] || ["current weather", "☀️"];
}

async function searchCity(city) {
  setStatus("Loading weather...");

  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1&language=en&format=json`;
  const geoResponse = await fetch(geoUrl);
  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found. Please try another city.");
  }

  const place = geoData.results[0];
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  if (!weatherData.current) {
    throw new Error("Weather is unavailable for this city right now.");
  }

  const current = weatherData.current;
  const [description, icon] = getWeatherDescription(current.weather_code);
  const cityName = place.country
    ? `${place.name}, ${place.country}`
    : place.name;

  cityElement.textContent = cityName;
  dateElement.textContent = formatDate(new Date(current.time));
  descriptionElement.textContent = description;
  humidityElement.textContent = `${Math.round(current.relative_humidity_2m)}%`;
  windElement.textContent = `${current.wind_speed_10m.toFixed(1)}km/h`;
  temperatureElement.textContent = Math.round(current.temperature_2m);
  iconElement.textContent = icon;
  setStatus("");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = searchInput.value.trim();

  if (!city) {
    return;
  }

  try {
    await searchCity(city);
  } catch (error) {
    setStatus(error.message);
  }
});

searchCity("Paris").catch((error) => setStatus(error.message));
