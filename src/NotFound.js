import React from 'react';
import { Link } from "react-router-dom";
import Header from "./Header";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "./Footer";

const NotFound = () => {
  return (
    <>
      <Header />
      <main>
        <section>
          <Link to={"/"} className="back-btn">
            <FaArrowLeft /> Home
          </Link>
        </section>
        <div className="error-msg">Not Found</div>
      </main>
      <Footer />
    </>
  );
}

export default NotFound