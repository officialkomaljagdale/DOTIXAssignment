document.addEventListener("DOMContentLoaded", () => {
  const locationInput = document.getElementById("locationInput");
  const getWeatherBtn = document.getElementById("getWeatherBtn");
  const weatherData = document.getElementById("weatherData");

  getWeatherBtn.addEventListener("click", () => {
    const location = locationInput.value;
    if (location.trim() === "") {
      alert("Please enter a location.");
      return;
    }

    // My (komal Jagdale) OpenWeatherMap API key.
    const apiKey = "0a461e140fcb1a24c2410dd574004172";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.main) {
          const temperature = data.main.temp;
          const humidity = data.main.humidity;
          const windSpeed = data.wind.speed;
          const weatherDescription = data.weather[0].description;

          const weatherHTML = `
                    <h2>Weather in ${location}</h2>
                    <p>Temperature: ${temperature} &#8451;</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                    <p>Condition: ${weatherDescription}</p>
                `;

          weatherData.innerHTML = weatherHTML;
        } else {
          weatherData.innerHTML =
            "Weather data not available for this location.";
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        weatherData.innerHTML =
          "Error fetching weather data. Please try again.";
      });
  });
});