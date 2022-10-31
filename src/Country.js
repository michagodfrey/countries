import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import uuid from "react-uuid";
import Header from "./Header";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "./Footer";

//TO DO: sort border links

const Country = ({ allCountries }) => {
  const params = useParams();
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(`https://restcountries.com/v3.1/name/${params.name}`)
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

  if (loading) {
    return (
      <>
        <Header />
        <div onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft /> Back
        </div>
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
            <FaArrowLeft /> Home
          </Link>
        </section>
        <div className="error-msg">Error loading data. Sorry about that.</div>
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Header />
      <main className="country">
        <section>
          <div onClick={() => navigate(-1)} className="back-btn">
            <FaArrowLeft /> Back
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
          const borderList = borders ? borders : null;


          const getBorderCountries = () => {
            allCountries.forEach((country) => {
              // console.log(country.cca3);
              borderList.forEach((border) => {
                if (country.cca3 === border) {
                  borderCountries.push(country.name.common);
              }
            })
              })
              
          }

          getBorderCountries();

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
                        {tld
                          ? tld.map((item) => {
                              return <span key={uuid()}>{item}, </span>;
                            })
                          : null}
                      </div>
                      <div>
                        <b>Currencies: </b>
                        {currencies
                          ? Object.keys(currencies).map((currency) => {
                              return <span key={uuid()}>{currency} </span>;
                            })
                          : null}
                      </div>
                      <div>
                        <b>Languages: </b>
                        {languages
                          ? Object.values(languages).map((language) => {
                              return <span key={uuid()}>{language}, </span>;
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                  <div className="country__borders">
                    <b>
                      {borders ? "Border Countries:" : "Border Countries: none"}
                    </b>
                    <ul>
                      {borders ? 
                      borderCountries.map((neighbor) => {
                        return (
                          <li
                            key={neighbor}
                          >
                            <Link to={`${neighbor}`}>{neighbor}</Link>
                          </li>
                        );
                      }) : null}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </main>
      <Footer />
    </div>
  );
}
export default Country;