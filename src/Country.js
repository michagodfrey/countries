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
        .get(`https://restcountries.com/v3.1/name/${params.name}`)
        .then((res) => {
          setLoading(false);
          setCountry(res.data);
          // setBorders(res.data.borders)
          // console.log(res.data);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          console.log(error);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

     // get the common name from the API with the border name somehow
      // the border name is the same as cca3
    // const borderCountries = country.borders;
    // console.log(borderCountries)

     const border = country?.borders !== undefined ? country?.borders : null;

     //To filter the bordered countries
     const bord = country.filter((all) => border?.includes(all.cca3));
     
    const borders = () => {
      return (
        <>
          {country?.borders !== undefined &&
            bord.map((border) => (
              <div key={border?.name?.official}>
                <Link to={`/${border.name.common}`}>
                  <div>
                    {border?.name?.common}
                  </div>
                </Link>
              </div>
            ))}
        </>
      );
    };

    console.log(bord)
  

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
          
          
          // or do the above here
          // const borderCountries = borders.map((borderCountry) => {
          //   axios.get(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
          //   .then((res) => {
          //     setBorders(res.data);
          //   })
            
            
          // });

          // console.log(borders)

          return (
            <div key={cca3} className="country">
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
                          return <span key={uuid()}>{item}, </span>
                        }) : null}
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
                    <b>{borders ? "Border Countries:" : null}</b>
                    <ul>
                      {borders
                        ? 
                        borders.map((border) => {
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