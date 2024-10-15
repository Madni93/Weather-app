async function getWeather(city) {
  const location = city;
  const apiKey = "7461d820debb769b1ea8e2f730c6f56a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const { temp, feels_like } = data.main;
    const description = data.weather[0].description;
    const cityName = data.name;
    const country = data.sys.country;
    const wind = Number(data.wind.speed);
    const Weather = data.weather[0].main;
    const weatherDisplay = `Current weather in ${cityName}, ${country}: ${description}, ${temp}°C (feels like ${feels_like}°C), ${wind}m/s ${Weather}`;
    console.log(weatherDisplay);
    return { temp, feels_like, description, cityName, country, wind, Weather };
  } catch (error) {
    return -1;
  }
}

const search_button = document.getElementById("search_button");
function weather() {
    document.getElementById("card").style.height = "max-content";
    document.getElementById("card").style.justifyContent = "flex-start";
    let city = document.getElementById("input").value;
    getWeather(city).then((weatherData) => {
      if (weatherData != -1) {
        document.getElementById("error").style.display = "none";
        document.getElementById("info").classList.remove("dnone");
        const temperature = weatherData.temp;
        console.log(temperature);
        const city = weatherData.cityName;
        console.log(city);
        const speed = Number(weatherData.wind);
        const cloud = weatherData.description;
        const sky = weatherData.Weather;
        console.log(sky);
        const weatherIcon = document.getElementById("weatherIcon");
        document.getElementById("temp").innerHTML = `${temperature}°C`;
        document.getElementById("city").innerHTML = city;
        document.getElementById("cloud").innerHTML = cloud;
        document.getElementById("speed").innerHTML =
          "Wind: " + `${speed} m/s`;
        if (sky == "Clouds") {
          weatherIcon.src = "images/clouds.png";
        } else if (sky == "Clear") {
          weatherIcon.src = "images/clear.png";
        } else if (sky == "Rain") {
          weatherIcon.src = "images/rain.png";
        } else if (sky == "Drizzle") {
          weatherIcon.src = "images/drizzle.png";
        } else if (sky == "Mist") {
          weatherIcon.src = "images/mist.png";
        }
      } else if (weatherData == -1) {
        document.getElementById("info").classList.add("dnone");
        document.getElementById("error").style.display = "flex";
      }
    });
  };
search_button.addEventListener("click", weather);
document.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    document.getElementById("search_button").click();
    search_button.addEventListener("click", weather);
  }
});
