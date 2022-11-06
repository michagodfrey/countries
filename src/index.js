import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvidor } from "./context";
import { BrowserRouter } from "react-router-dom";
import './styles/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AppProvidor>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvidor>
  </React.StrictMode>
);
