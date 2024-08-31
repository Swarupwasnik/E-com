import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import banner_1 from "../pictures/banner_1.jpg";
import banner_2 from "../pictures/banner_2.jpg";
import banner_3 from "../pictures/banner_3.jpg";
import blog_1 from "../pictures/blog_1.jpg";
import blog_2 from "../pictures/blog_2.jpg";
import blog_3 from "../pictures/blog_3.jpg";
import slider_1 from "../pictures/slider_1.jpg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useWishlist } from "../context/wish";
import axios from "axios";
import { Checkbox } from "antd";
import { Link } from "react-router-dom";
import "../styles/home.css";
// import toast from "react-hot-toast";
import homeSpinner from "../functionality/homeSpinner";

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [categoryChecked, setCategoryChecked] = useState({});
  const [err, setError] = useState([]);
  const [wish, setWish] = useWishlist([]);
  // const {blogs} = blogData;
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilter = async (isChecked, id) => {
    if (isChecked) {
      setChecked((prevChecked) => [...prevChecked, id]);
    } else {
      setChecked((prevChecked) =>
        prevChecked.filter((categoryId) => categoryId !== id)
      );
    }

    const newCategories = {
      ...categoryChecked,
      [id]: isChecked,
    };

    setCategoryChecked(newCategories);

    const selectedCategories = Object.keys(newCategories).filter(
      (category) => newCategories[category]
    );

    filterProducts(selectedCategories);
  };

  const filterProducts = async (selectedCategories) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filter",
        {
          categories: selectedCategories,
        }
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log("Error filtering products", error);
      setLoading(false);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      const data = response.data;
      if (Array.isArray(data)) {
        setCategories(data);
      } else if (Array.isArray(data.category)) {
        setCategories(data?.category);
      } else {
        console.log("Fetched data is not in the expected format:", data);
      }
    } catch (error) {
      console.log("Error fetching categories", error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log("Error fetching products", error);
      setLoading(false);
    }
  };

  const getAllBlogs = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/blog/get-blog"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const sortedBlogs = data.blogs.sort((a, b) => {
        // Sort by time (date) in descending order
        return new Date(b.date) - new Date(a.date);
      });

      // Select the first three blogs, including the latest one
      const selectedBlogs = sortedBlogs.slice(0, 3);

      console.log("Fetched data:", data);
      setBlogData(selectedBlogs);
    } catch (err) {
      console.log("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
    getTotal();
    getAllBlogs(); // Added parentheses to call the function
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  if(loading){
    return <homeSpinner/>;
  }

  return (
    <div>
      {/* <!-- Slider --> */}
      <Layout title={"New Raw Era"}>
        <div
          className="main_slider"
          style={{ backgroundImage: `url(${slider_1})` }}
        >
          <div className="container fill_height">
            <div className="row align-items-center fill_height">
              <div className="col">
                <div className="main_slider_content">
                  <h6>Spring / Summer Collection 2017</h6>
                  <h1>Get up to 30% Off New Arrivals</h1>
                  <div className="red_button shop_now_button">
                    <a href="/shop">shop now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div
                  className="banner_item align-items-center"
                  style={{ backgroundImage: `url(${banner_1})` }}
                >
                  <div className="banner_category">
                    <a href="categories.html">{categories[0]?.name}</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="banner_item align-items-center"
                  style={{ backgroundImage: `url(${banner_2})` }}
                >
                  <div className="banner_category">
                    <a href="categories.html">{categories[1]?.name}</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="banner_item align-items-center"
                  style={{ backgroundImage: `url(${banner_3})` }}
                >
                  <div className="banner_category">
                    <a href="categories.html">{categories[2]?.name}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="new_arrivals">
            <div className="container">
              <div className="row">
                <div className="col text-center">
                  <div className="section_title new_arrivals_title">
                    <h2>New Arrivals</h2>
                  </div>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col text-center">
                  {categories &&
                    categories.slice(0, 3).map((c) => (
                      <div className="new_arrivals_sorting" key={c._id}>
                        <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
                          <Checkbox
                            onChange={(e) =>
                              handleFilter(e.target.checked, c._id)
                            }
                            className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center active is-checked"
                            data-filter="*"
                          >
                            {c.name}
                          </Checkbox>
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div
                    className="product-grid row"
                    data-isotope='{ "itemSelector": ".product-item", "layoutMode": "fitRows" }'
                  >
                    {products.slice(0, 4).map((item) => (
                      <div class="wrapper" key={item._id}>
                        <div class="container">
                          <div
                            class="top"
                            style={{
                              backgroundImage: `url(http://localhost:8080/api/v1/product/product-photo/${item._id})`,
                            }}
                          >
                            <div className="icon">
                              <a
                                onClick={() => {
                                  setWish([...wish, item]);
                                  toast.success("Item Added to Wishlist");
                                }}
                              >
                                <i
                                  className="fa-solid fa-heart fs-3 mt-3"
                                  style={{ color: "red" }}
                                ></i>
                              </a>
                            </div>
                          </div>
                          <div class="bottom">
                            <div className="d-flex justify-content-center align-items-center"></div>

                            <div class="left">
                              <div class="details">
                                <h5>{item.name}</h5>
                                <p>${item.price}</p>
                              </div>
                              <div class="buy">
                                {" "}
                                <a
                                  onClick={() => {
                                    setCart([...cart, item]);
                                    toast.success("item Added to Cart");
                                  }}
                                >
                                  <i
                                    style={{ fontSize: "30px" }}
                                    className="fa-solid fa-cart-plus"
                                  ></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="inside">
                          <div className="icon">
                            <a
                              className=""
                              onClick={() =>
                                navigate(`/productdetail/${item.slug}`)
                              }
                            >
                              <i
                                className="fa-solid fa-circle-info fs-3"
                                style={{ color: "skyblue" }}
                              ></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Blogs --> */}

        <div className="blogs">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="section_title">
                  <h2>Latest Blogs</h2>
                </div>
              </div>
            </div>

            <div
              className="row blogs_container"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {blogData &&
                blogData.length > 0 &&
                blogData.map((item, index) => (
                  <div
                    key={index}
                    className="col-lg-4 blog_item_col"
                    style={{ flex: "0 0 100%", marginBottom: "20px" }}
                  >
                    <div className="blog_item">
                      <div
                        className="blog_background"
                        style={{
                          backgroundImage: `url(http://localhost:8080/api/v1/blog/post-photo/${item._id})`,
                        }}
                      ></div>
                      <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
                        <h4 className="blog_title">{item.title}</h4>
                        <span className="blog_meta">
                          {item.name} | {item.day} | {formatDate(item.date)}
                        </span>
                        <p className="blog_description">
                          {item.description.length > 20
                            ? `${item.description.slice(0, 20)}...`
                            : item.description}
                          {item.description.length > 20 && (
                            <button
                              style={{ color: "red" }}
                              onClick={() => navigate(`/blog/${item.title}`)}
                            >
                              Read More
                            </button>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
