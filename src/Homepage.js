import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Homepage = () => {
  const [countries, setCountries] = useState([]);

  const url = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCountries(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <header>
        <h1>Where in the World?</h1>
        <div>Dark mode button</div>
      </header>
      
        {countries.map((country) => {
          const { cca3, flags, name, population, region, capital } = country;
          return (
            
              <div key={cca3}>
                <Link to={`/${cca3}`}>
                <img src={flags.png} alt={name.common} />
                <div>{name.common}</div>
                <div>Population: {population}</div>
                <div>Region: {region}</div>
                <div>capital: {capital}</div>
                <div>{cca3}</div>
                 </Link>
              </div>
               
          );
        })}
      
    </div>
  );
}

export default Homepage