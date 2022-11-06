import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Homepage from "./Homepage";
import Country from "./Country";
import NotFound from "./NotFound";

function App() {
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setAllCountries(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path=":name" element={<Country allCountries={allCountries} />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
