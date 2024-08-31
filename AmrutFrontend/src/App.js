import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Cart from "./pages/Cart.js";
import Dashboard from "./pages/user/Dashboard";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import PrivateRoute from "./Routes/Private";
import Forgotpassword from "./pages/Forgotpassword";
import AdminDash from "./pages/Admin/AdminDash";
import AdminRoute from "./Routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import User from "./pages/Admin/User";
import Profile from "./pages/user/Profile";
import Order from "./pages/user/Order";
import Products from "./pages/Admin/Products";
import Updateproduct from "./pages/Admin/Updateproduct";
import SearchProduct from "./pages/SearchProduct";
// import ProductDetail from "./textfiles/ProductDetail1.js";
import Categories from "./pages/Categories";
import CartPage from "./textfiles/Cart.jsx";
import CategoryProductList from "./pages/CategoryProductList";
import AdminOrder from "./pages/Admin/AdminOrder";
import BlogDetails from "./pages/Blog/BlogDetails.js";
import Shop from "./pages/Shop";
import Productdetail2 from "./pages/Productdetail2";
import Blog from "./pages/Blog/Blog.js";
// import { CartProvider } from "./context/cart";
import Carrer from "./pages/Carrer.js";
import CarrerDetails from "./pages/CarrerDetails.js";
import Wishlist from "./pages/WishlIst.js";
import Market from "./pages/Market.jsx";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/category/:slug" element={<CategoryProductList />} />
      {/* <Route path="/product/:slug" element={<ProductDetail />} /> */}
      <Route path="/categories" element={<Categories />} />
      <Route path="/search" element={<SearchProduct />} />
      {/* <Route path="/cart" element={<CartPage />} /> */}
      <Route path="/shop" element={<Shop />} />
      <Route path="/productdetail/:slug" element={<Productdetail2 />} />
      {/* //Blog Routes */}
      <Route path="/blog/:title" element={<BlogDetails />} />
      <Route path="/blogpage" element={<Blog />} />

      {/* Carrer */}

      <Route path="/carrer" element={<Carrer />} />
      <Route path="/carrer/:jobTitle" element={<CarrerDetails />} />

      <Route path="/cart1" element={<Cart />} />
      <Route path="/cartdump" element={<CartPage />} />

      {/* Private routes */}
      <Route path="/dash/*" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/order" element={<Order />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>
      {/* Admin routes */}
      <Route path="/dash/*" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDash />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/product/:slug" element={<Updateproduct />} />

        <Route path="admin/products" element={<Products />} />

        <Route path="admin/user" element={<User />} />
        <Route path="admin/orders" element={<AdminOrder />} />
      </Route>
      <Route path="/market" element={<Market />} />

      <Route path="/forgot-password" element={<Forgotpassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* Catch all route for 404 */}
      <Route path="*" element={<PageNotFound />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  );
};

export default App;
