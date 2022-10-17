import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { FaSearch } from "react-icons/fa";
import Footer from "./Footer";

const Homepage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

   const [theme, setTheme] = useState("light-theme");

   const toggleTheme = () => {
     if (theme === "light-theme") {
       setTheme("dark-theme");
     } else {
       setTheme("light-theme");
     }
   };

   useEffect(() => {
     document.documentElement.className = theme;
     console.log(theme);
     console.log(document.documentElement);
   }, [theme]);

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

  // filter by region set
  const allRegions = [...new Set(countries.map((country) => country.region))];

  if (loading) {
    return (
      <>
        <Header />
        <div className="loader"></div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="error-msg">Error loading data :(</div>
        <Footer />
      </>
    );
  }

  return (
    <div className="homepage">
      <Header />
      <main className="homepage__main">
        <section>
          <button onClick={toggleTheme}>dark mode</button>
          <form>
            {<FaSearch />}
            <input
              type="text"
              name="search"
              placeholder="Search for a country..."
            />
              <select name="filter">
                <option value="" disabled selected>
                  Filter by Region
                </option>
                {countries.map((country) => {
                  const { region } = country;
                  return (
                    <>
                      <option>{country.region}</option>;
                    </>
                  );
                })}
              </select>
          </form>
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
      <Footer />
    </div>
  );
}

export default Homepage