import { useState, useEffect } from "react";
// import "./WeatherApp.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [unit, setUnit] = useState("metric"); // metric = Celsius, imperial = Fahrenheit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchCity = async (searchCity) => {
    if (!searchCity) return;
    setLoading(true);
    setError(null);

    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=${unit}&appid=${API_KEY}`
      );

      if (!weatherRes.ok) throw new Error("City not found");

      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=${unit}&appid=${API_KEY}`
      );

      const forecastData = await forecastRes.json();

      const dailyForecast = forecastData.list.filter((_, index) => index % 8 === 0);
      setForecast(dailyForecast);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = () => {
    if (weather && !favorites.includes(weather.name)) {
      setFavorites([...favorites, weather.name]);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
    if (weather) searchCity(weather.name);
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => searchCity(city)}>Search</button>
      </div>

      <button className="unit-btn" onClick={toggleUnit}>
        {unit === "metric" ? "Switch to °F" : "Switch to °C"}
      </button>

      {loading && <p className="info">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="current-weather">
          <h2>{weather.name}</h2>
          <p className="temp">
            {Math.round(weather.main.temp)}°
            {unit === "metric" ? "C" : "F"}
          </p>
          <p>{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <button onClick={addFavorite}>⭐ Add to Favorites</button>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="forecast">
          <h3>5-Day Forecast</h3>
          <div className="forecast-list">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-card">
                <p>{new Date(day.dt_txt).toDateString()}</p>
                <p>{Math.round(day.main.temp)}°</p>
                <p>{day.weather[0].main}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="favorites">
          <h3>Favorites</h3>
          {favorites.map((fav) => (
            <button key={fav} onClick={() => searchCity(fav)}>
              {fav}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
