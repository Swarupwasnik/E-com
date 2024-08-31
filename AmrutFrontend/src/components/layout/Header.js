import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { useWishlist } from "../../context/wish";
export default function Header() {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [wishlist] = useWishlist();
  const categories = useCategory();
  const [showSearch, setShowSearch] = useState(false); // State to manage the visibility of the search bar

  const handleLogout = (e) => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <div className="super_container">
      <header className="header trans_300">
        <div className="top_nav">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="top_nav_left">
                  free shipping on all u.s orders over $50
                </div>
              </div>
              <div className="col-md-6 text-right">
                <div className="top_nav_right">
                  <ul className="top_nav_menu">
                    <li className="currency">
                      <Link to={"/categories"}>
                        Categories
                        <i className="fa fa-angle-down"></i>
                      </Link>

                      <ul className="currency_selection">
                        <li>
                          <Link to={"/categories"}>All Categories</Link>
                        </li>

                        {Array.isArray(categories) &&
                          categories.map((c) => (
                            <li key={c.id}>
                              <Link to={`/category/${c.name}`}>{c.name}</Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                    <li className="language">
                      <Link to="#">
                        English
                        <i className="fa fa-angle-down"></i>
                      </Link>
                      <ul className="language_selection">
                        <li>
                          <Link to="#">French</Link>
                        </li>
                        <li>
                          <Link to="#">Italian</Link>
                        </li>
                        <li>
                          <Link to="#">German</Link>
                        </li>
                        <li>
                          <Link to="#">Spanish</Link>
                        </li>
                      </ul>
                    </li>
                    {!auth.user ? (
                      <li className="account">
                        <Link to="#">
                          My Account
                          <i className="fa fa-angle-down"></i>
                        </Link>
                        <ul className="account_selection">
                          <li>
                            <Link to="/login">
                              <i
                                className="fa fa-sign-in"
                                aria-hidden="true"
                              ></i>
                              Sign In
                            </Link>
                          </li>
                          <li>
                            <Link to="/register">
                              <i
                                className="fa fa-user-plus"
                                aria-hidden="true"
                              ></i>
                              Register
                            </Link>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      <li className="account">
                        <Link to="#">
                          {auth.user.name}
                          <i className="fa fa-angle-down"></i>
                        </Link>
                        <ul className="account_selection">
                          <li>
                            <Link
                              to={`/dash/${
                                auth.user.role === 1 ? "admin" : "user"
                              }`}
                            >
                              <i
                                className="fa fa-sign-in"
                                aria-hidden="true"
                              ></i>
                              My Account
                            </Link>
                          </li>
                          <li>
                            <Link to="/login" onClick={handleLogout}>
                              <i
                                className="fa fa-user-plus"
                                aria-hidden="true"
                              ></i>
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main_nav_container">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-right">
                <div className="logo_container">
                  <Link to="#">
                    colo<span>shop</span>
                  </Link>
                </div>
                <nav className="navbar">
                  <ul className="navbar_menu">
                    <li>
                      <Link to="/">home</Link>
                    </li>
                    <li>
                      <Link to="/shop">shop</Link>
                    </li>
                    <li>
                      <Link to="/blogpage">Blog</Link>
                    </li>
                    <li>
                      <Link to="/carrer">Career</Link>
                    </li>
                    <li>
                      <Link to="/market">Market</Link>
                    </li>
                    <li>
                      <Link to="/contact">contact</Link>
                    </li>
                  </ul>
                  <ul className="navbar_user">
                    <li>
                      {/* Search Icon */}
                      <Link to="#" onClick={() => setShowSearch(!showSearch)}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li className="wishlist">
            <Link to="/wishlist">
            
              <i className="fa fa-heart" aria-hidden="true"></i>
              <span
                count={wishlist?.length}
                id="wishlist_items"
                className="checkout_items"
              >
                {wishlist?.length}
              </span>
            </Link>
          </li>
                    <li className="checkout">
                      <Link to="/cart1">
                        <i
                          className="fa fa-shopping-cart"
                          aria-hidden="true"
                        ></i>
                        <span
                          to="/cart1"
                          count={cart?.length}
                          id="checkout_items"
                          className="checkout_items"
                        >
                          {cart?.length}
                        </span>
                      </Link>
                    </li>
                  </ul>
                  <div className="hamburger_container">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* Search Input */}
        {showSearch && (
          <div className="search_bar">
            <div className="container">
              <div className="row">
                <div className="col">
                  <SearchInput />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <div class="fs_menu_overlay"></div>
      <div class="hamburger_menu">
        <div class="hamburger_close">
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div class="hamburger_menu_content text-right">
          <ul class="menu_top_nav">
            <li class="menu_item has-children">
              <a href="#">
                usd
                <i class="fa fa-angle-down"></i>
              </a>
              <ul class="menu_selection">
                <li>
                  <a href="#">cad</a>
                </li>
                <li>
                  <a href="#">aud</a>
                </li>
                <li>
                  <a href="#">eur</a>
                </li>
                <li>
                  <a href="#">gbp</a>
                </li>
              </ul>
            </li>
            <li class="menu_item has-children">
              <a href="#">
                English
                <i class="fa fa-angle-down"></i>
              </a>
              <ul class="menu_selection">
                <li>
                  <a href="#">French</a>
                </li>
                <li>
                  <a href="#">Italian</a>
                </li>
                <li>
                  <a href="#">German</a>
                </li>
                <li>
                  <a href="#">Spanish</a>
                </li>
              </ul>
            </li>
            <li class="menu_item has-children">
              <a href="#">
                My Account
                <i class="fa fa-angle-down"></i>
              </a>
              <ul class="menu_selection">
                <li>
                  <a href="#">
                    <i class="fa fa-sign-in" aria-hidden="true"></i>Sign In
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-user-plus" aria-hidden="true"></i>Register
                  </a>
                </li>
              </ul>
            </li>
            <li class="menu_item">
              <a href="#">home</a>
            </li>
            <li class="menu_item">
              <a href="#">shop</a>
            </li>
            <li class="menu_item">
              <a href="#">promotion</a>
            </li>
            <li class="menu_item">
              <a href="#">pages</a>
            </li>
            <li class="menu_item">
              <a href="#">blog</a>
            </li>
            <li class="menu_item">
              <Link to="/contact">contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
