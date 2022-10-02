import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const Homepage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
     setLoading(true);
     setError(false);
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setLoading(false);
        setCountries(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log(error);
      });
  }, []);

    if (loading) {
    return <div>loading...</div>;
    }

    if (error) {
    return <div>error</div>;
    }

  return (
    <>
      <Header />
      <section>
        <div>Search</div>
        <div>Filter</div>
      </section>
      <main className="container">
        {countries.map((country) => {
          const { cca3, flags, name, population, region, capital } = country;
          return (
            <div className="container__item" key={cca3}>
              <Link to={`/${cca3}`}>
                <img className="container__flag" src={flags.png} alt={name.common} />
              </Link>
              <h2>{name.common}</h2>
              <div>Population: {population.toLocaleString()}</div>
              <div>Region: {region}</div>
              <div>capital: {capital}</div>
            </div>
          );
        })}
      </main>
    </>
  );
}

export default Homepage