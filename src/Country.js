import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Country = () => {
    const params = useParams();
    const [country, setCountry] = useState([]);

    useEffect(() => {
    //   setLoading(true);
    //   setError(false);
      axios
        .get(`https://restcountries.com/v3.1/alpha/${params.cca3}`)
        // .get(`https://restcountries.com/v3.1/alpha/bel`)
        .then((res) => {
          //   setLoading(false);
          setCountry(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          //   setError(true);
          //   setLoading(false);
          console.log(error);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <>
        {country.map((state) => {
          const { cca3, flags, name, population, region, subregion, capital, tld, currencies } = state;
          return (
            <div key={cca3}>
              <img src={flags.png} alt={name.common} />
              <div>{name.common}</div>
              <div>Population: {population}</div>
              <div>Region: {region}</div>
              <div>Subregion: {subregion}</div>
              <div>Capital: {capital}</div>
              <div>Top level domain: {tld}</div>
              <div>Currency: {currencies.name}</div>
              {/* <div>Languages: {lang}</div> */}
              <div>{cca3}</div>
            </div>
          );
        })}
    </>
  )
    }
export default Country;