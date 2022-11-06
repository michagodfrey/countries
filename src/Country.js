import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "./Footer";

const Country = ({ allCountries }) => {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(`https://restcountries.com/v3.1/name/${params.name}?fullText=true`)
      .then((res) => {
        setLoading(false);
        setCountry(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // todo
  // remove %20 from urls

  if (loading) {
    return (
      <>
        <Header />
        <main>
          <section className="loading">
            <Link to={"/"} className="back-btn">
              <FaArrowLeft /> Home
            </Link>
            <div className="loader"></div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main>
          <section className="loading">
            <Link to={"/"} className="back-btn">
              <FaArrowLeft /> Home
            </Link>
          </section>
          <div className="error-msg">Error loading data. Sorry about that.</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="country">
        <section>
          <div
            onClick={() => {
              navigate("/");
            }}
            className="back-btn"
          >
            <FaArrowLeft /> Home
          </div>
        </section>
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

          // get border names
          const borderCountries = [];

          if (borders) {
            allCountries.forEach((country) => {
              borders.forEach((border) => {
                if (country.cca3 === border) {
                  borderCountries.push(country.name.common);
                }
              });
            });
          }

          const getTld = (obj) => {
            if (!obj) return "";
            return Object.values(obj).join(", ");
          };

          const getCurrencies = (obj) => {
            if (!obj) return "";
            return Object.keys(obj).join(", ");
          };

          const getLanguages = (obj) => {
            if (!obj) return "";
            return Object.values(obj).join(", ");
          };

          // reload page when border clicked because url changes onclick but no re-rendering occurs
          function reload() {
            window.location.reload(false);
          }

          return (
            <div key={cca3} className="country__wrapper">
              <div className="country__flag">
                <img src={flags.png} alt={`Flag of ${name.common}`} />
              </div>
              <div className="country__info">
                <div className="country__info-wrapper">
                  <h2>{name.common}</h2>
                  <div className="country__details">
                    <div>
                      <div>
                        <b>Population: </b>
                        {population ? population.toLocaleString() : null}
                      </div>
                      <div>
                        <b>Region: </b>
                        {region}
                      </div>
                      <div>
                        <b>Subregion: </b>
                        {subregion ? subregion : null}
                      </div>
                      <div>
                        <b>Capital: </b>
                        {capital ? capital : null}
                      </div>
                    </div>
                    <br></br>
                    <div>
                      <div>
                        <b>Top level domain: </b>
                        {getTld(tld)}
                      </div>
                      <div>
                        <b>Currencies: </b>
                        {getCurrencies(currencies)}
                      </div>
                      <div>
                        <b>Languages: </b>
                        {getLanguages(languages)}
                      </div>
                    </div>
                  </div>
                  <div className="country__borders">
                    <b>{borders ? "Border Countries:" : null}</b>
                    <ul onClick={reload}>
                      {borders
                        ? borderCountries.map((neighbor) => {
                            return (
                              <Link key={neighbor} to={`/${neighbor}`}>
                                <li>{neighbor}</li>
                              </Link>
                            );
                          })
                        : null}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </main>
      <Footer />
    </>
  );
};
export default Country;