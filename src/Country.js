import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const Country = () => {
    const params = useParams();
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // console.log(params)

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
            borders,
          } = state;
          const currencyObj = Object.keys(currencies);
          const currencyList = currencyObj.map((currency) => currencies[currency].name);
          const languageList = Object.values(languages);
          console.log(currencyObj)
          return (
            <div key={cca3} className="country">
              <div className="country__flag">
                <img src={flags.png} alt={name.common} />
              </div>
              <div className="country__details-wrapper">
                <div className="country__details">
                  <div>
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
                      <b>Subregion: </b>
                      {subregion}
                    </div>
                    <div>
                      <b>Capital: </b>
                      {capital}
                    </div>
                  </div>
                  <div>
                    <div>
                      <b>Top level domain: </b>
                      {tld}
                    </div>
                    <div>
                      <b>Currencies: </b>
                      {currencyList.map((currency) => {
                        // currency.replace(/,\s*$/, "");
                        return <>{currency},</>;
                      })}
                    </div>
                    <div>
                      <b>Languages: </b>
                      {languageList.map((language) => {
                        // language.slice(0, -1);
                        return <>{language},</>;
                      })}
                    </div>
                  </div>
                </div>
                <h3>Border Countries</h3>
                <ul className="country__borders">
                  {borders
                    ? borders.map((border) => {
                        return (
                          <li>
                            <Link key={border} to={`/${border.toUpperCase()}`}>
                              {border}
                            </Link>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
    }
export default Country;