import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import {store} from "./Redux/Store";
import App from './App';
import './index.css';

axios.defaults.baseURL = import.meta.env.VITE_APP_API || "http://localhost:3001";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
