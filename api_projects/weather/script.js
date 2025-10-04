const temperatureEle = document.querySelector(".temperature");
const descriptionEle = document.querySelector(".description");
const formEle = document.getElementById("weatherForm");
const cityInputEle = document.getElementById("cityInput");
const humidityEle = document.querySelector(".humidityPercent");
const windEle = document.querySelector(".windSpeed");
const resultEle = document.getElementById("weatherResult");
const myApiKey = "ad6335bc5d01d1c3f3e5b4aeda92dada";

const fetchWeatherData = async (city) => {
  try {
    resultEle.classList.add("d-none");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    displayWeatherData(data);
  } catch (error) {
    console.error("Fetch error: ", error);
    alert("Failed to fetch weather data. Please try again later.");
  }
};
const displayWeatherData = (data) => {
  resultEle.classList.remove("d-none");
  let temperature = (data.main.temp - 273.15).toFixed(2);
  let description = data.weather[0].description;
  let humidity = data.main.humidity;
  let windSpeed = data.wind.speed;
  // console.table([temperature, description, humidity, windSpeed]);
  temperatureEle.textContent = `${temperature} °C`;
  descriptionEle.textContent = description;
  humidityEle.textContent = `${humidity} %`;
  windEle.textContent = `${windSpeed} m/s`;
  resultEle.style.display = "block";
};

formEle.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = cityInputEle.value.trim();
  if (cityName === "") {
    alert("Please enter a city name.");
    return;
  } else {
    fetchWeatherData(cityName);
  }
});
