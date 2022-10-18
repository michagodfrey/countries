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
  const [search, setSearch] = useState("");

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

  // region set for select input
  const allRegions = [
    "All",
    ...new Set(countries.map((country) => country.region)),
  ];

  // filter by region
  const handleSelect = (e) => {
    const regions = Array.from(
      document.querySelectorAll(".container__region span")
    );
    regions.forEach((region) => {
      const country = region.innerHTML.toLowerCase();
      if (e.target.value === "All") {
        region.closest(".container__item").classList.remove("hidden");
      } else if (country !== e.target.value.toLocaleLowerCase()) {
        region.closest(".container__item").classList.add("hidden");
      } else {
        region.closest(".container__item").classList.remove("hidden");
      }
    });
  };

  // reset region filter for better search
  const resetFilter = () => {
    const containerItems = document.querySelectorAll(".container__item");
    containerItems.forEach((item) => {
      item.classList.remove("hidden");
    });
  };

  // search country
  const handleSearch = (e) => {
    const select = document.querySelector("select");
    select.value = "All";
    resetFilter();
    setSearch(e.target.value);
  };
  
  // display search results or all countries if search is empty
  const filterCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(search.toLowerCase());
  });

  // loading and error displays
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
          <form>
            {<FaSearch />}
            <input
              type="text"
              name="search"
              placeholder="Search for a country..."
              onChange={handleSearch}
            />
            <select name="filter" onChange={handleSelect}>
              <option value="" disabled selected>
                Filter by Region
              </option>
              {allRegions.map((region) => {
                return <option>{region}</option>;
              })}
            </select>
          </form>
        </section>
        <div className="container">
          {filterCountries.map((country) => {
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
                  <div className="container__region">
                    <b>Region: </b>
                    <span>{region}</span>
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