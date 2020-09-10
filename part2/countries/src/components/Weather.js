import React from "react";

const Weather = ({ weatherData, capital }) => {
  console.log(weatherData);
  if (capital.length === 0) {
    return;
  }
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        <b>Temperature: </b> {weatherData.current.temperature} Celsius
      </p>
      <img src={weatherData.current.weather_icons[0]} alt="Weather icon" className="country-image"></img>
      <p>
        <b>Wind: </b> {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}
      </p>
    </div>
  );
};

export default Weather;
