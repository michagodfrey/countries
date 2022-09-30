import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const Country = () => {
    const params = useParams();
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      setLoading(true);
      setError(false);
      axios
        .get(`https://restcountries.com/v3.1/alpha/${params.cca3}`)
        .then((res) => {
          setLoading(false);
          setCountry(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          console.log(error);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>error</div>

    }

  return (
    <>
      <Header />
      <section>
        <Link to={'/'}>Back</Link>
      </section>
      <main>
        {country.map((state) => {
          const {
            cca3,
            flags,
            name,
            population,
            region,
            subregion,
            capital,
            tld,
            currencies,
            languages,
            neigbours,
          } = state;
          return (
            <div key={cca3}>
              <div>
                <img src={flags.png} alt={name.common} />
              </div>
              <div>
                <h2>{name.common}</h2>
                <div>Population: {population.toLocaleString()}</div>
                <div>Region: {region}</div>
                <div>Subregion: {subregion}</div>
                <div>Capital: {capital}</div>
                <div>Top level domain: {tld}</div>
                <div>Currency: ?</div>
                <div>Languages: ?</div>
                <div>Border Countries: ?</div>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
    }
export default Country;