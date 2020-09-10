import React, { useEffect } from "react";
import Weather from "./Weather";
import axios from "axios";

const SingleResult = ({ singleResult, weatherData, setWeatherData }) => {
  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const weatherAppRequest = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${singleResult.capital}`;
    axios.get(weatherAppRequest).then(response => {
      setWeatherData(response.data);
      console.log("weatherresp", response.data);
    });
  }, []);

  return (
    <div>
      <h1>{singleResult.name}</h1>
      <p>Capital {singleResult.capital}</p>
      <p>Population {singleResult.population}</p>
      <h2>Languages</h2>
      <ul>
        {singleResult.languages.map((language, index) => (
          <li key={index}>{language.name}</li>
        ))}
      </ul>
      <img src={singleResult.flag} alt={`Flag of ${singleResult.name}`} className="country-image"></img>
      {weatherData.length !== 0 && <Weather weatherData={weatherData} capital={singleResult.capital} />}
    </div>
  );
};

export default SingleResult;
