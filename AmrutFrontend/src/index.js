import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/Search";
 import "@fortawesome/fontawesome-free/css/all.min.css";
import { CartProvider } from "./context/cart";
import { WishlistProvider } from "./context/wish";
// import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <WishlistProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);

reportWebVitals();
