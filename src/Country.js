import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import uuid from "react-uuid";
import Header from "./Header";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "./Footer";

const Country = () => {
    const params = useParams();
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // const [borders, setBorders] = useState([]);

    const navigate = useNavigate();

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

    // const getName = (e) => {
    //   const borderCountry = `https://restcountries.com/v3.1/name/${e.target.innerHTML}`;
    //   console.log(borderCountry)
    // }

    if (loading) {
        return (
          <>
            <Header />
            <Link to={"/"} className="back-btn">
              <FaArrowLeft /> Back
            </Link>
            <div className="loader"></div>
            <Footer />
          </>
        );
    }

    if (error) {
        return (
          <>
            <Header />
            <section>
              <Link to={"/"} className="back-btn">
                <FaArrowLeft /> Back
              </Link>
            </section>
            <div className="error-msg">Error loading data :(</div>
            <Footer />
          </>
        );

    }

  return (
    <>
      <Header />
      <section>
        <div onClick={() => navigate(-1)} className="back-btn">
            <FaArrowLeft /> Back
        </div>
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
          const currencyList = currencyObj.map(
            (currency) => currencies[currency].name
          );
          const languageList = Object.values(languages);
          
          // const borderList = borders.map(
          //   (border) => `https://restcountries.com/v3.1/name/${border}`
          // );

          // console.log(borderList)

          // const borderNames = () => {
          //   fetch(borderList[0])
          //   .then(response => response.json())
          //   .then(data => {
          //     data.borders.map(country => {
          //       return console.log(country)
          //     })
          //   })
          // }

          return (
            <div key={cca3} className="country">
              <div className="country__flag">
                <img src={flags.png} alt={name.common} />
              </div>
              <div className="country__info">
                <div className="country__info-wrapper">
                  <h2>{name.common}</h2>
                  <div className="country__details">
                    <div>
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
                    <br></br>
                    <div>
                      <div>
                        <b>Top level domain: </b>
                        {tld}
                      </div>
                      <div>
                        <b>Currencies: </b>
                        {currencyList.map((currency) => {
                          return <span key={uuid()}>{currency} </span>;
                        })}
                      </div>
                      <div>
                        <b>Languages: </b>
                        {languageList.map((language) => {
                          return <span key={uuid()}>{language}, </span>;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="country__borders">
                    <b>{borders ? "Border Countries:" : null}</b>
                    <ul>
                      {borders
                        ? borders.map((border) => {
                            return (
                              <li key={border}>
                                <Link to={border}>{border}</Link>
                              </li>
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
    }
export default Country;