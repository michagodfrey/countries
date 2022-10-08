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
    return (
      <>
        <Header />
        <div>Loading...</div>
      </>
    );
    }

    if (error) {
    return (
      <>
        <Header />
        <div>Error</div>
      </>
    );
    }

  return (
    <div className="homepage">
      <Header />
      <main className="homepage__main">
        <section>
          <form>
            <i className="material-icons search-icon">search</i>
            <input
              type="text"
              placeholder="Search for a country..."
            />
          </form>
          <div>Filter</div>
        </section>
        <div className="container">
          {countries.map((country) => {
            const { cca3, flags, name, population, region, capital } = country;
            return (
              <div className="container__item" key={cca3}>
                <Link to={`/${cca3}`}>
                  <img
                    className="container__flag"
                    src={flags.png}
                    alt={name.common}
                  />
                </Link>
                <div className="container__text">
                  <h2>{name.common}</h2>
                  <div>
                    <b>Population: </b>
                    {population.toLocaleString()}
                  </div>
                  <div>
                    <b>Region: </b>
                    {region}
                  </div>
                  <div>
                    <b>Capital: </b>
                    {capital}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default Homepage