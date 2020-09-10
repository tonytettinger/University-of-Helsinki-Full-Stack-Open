import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import SingleResult from "./components/SingleResult";
import Results from "./components/Results";
import "./App.css";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [results, setResults] = useState([]);
  const [singleResult, setSingleResult] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setAllCountries(response.data);
    });
  }, []);

  const handleSearch = event => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredCountries = allCountries.filter(country => {
      return country.name.toLowerCase().includes(searchTerm);
    });
    console.log("Filtered", filteredCountries);
    if (filteredCountries.length >= 10) {
      setResults(["Too many results"]);
      setSingleResult([]);
    } else if (filteredCountries.length === 1) {
      setResults([]);
      setSingleResult(filteredCountries[0]);
    } else {
      setResults(filteredCountries);
      setSingleResult([]);
    }
    console.log(results);
  };

  return (
    <div>
      <Search handleSearch={handleSearch} />
      {results.length !== 0 && results[0] !== "Too many results" && <Results results={results} setSingleResult={setSingleResult} />}
      {singleResult.length !== 0 && <SingleResult singleResult={singleResult} weatherData={weatherData} setWeatherData={setWeatherData} />}
    </div>
  );
};

export default App;
