import Layout from "../components/layout/Layout";
import React, { useState, useEffect } from "react";
import single_2 from "../pictures/single_2.jpg";
import "../styles/shop.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { useWishlist } from "../context/wish";
import { Prices } from "../components/prices";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
const Shop = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categoryChecked, setCategoryChecked] = useState({});
  const [wish, setWish] = useWishlist([]);

  const handleCheckboxChange = (isChecked, id) => {
    setCategoryChecked((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));
  };

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

  useEffect(() => {
    getAllCategories();
    getAllProducts();
    getTotal();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData(); // Calling the fetchData function immediately
  }, []);
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
        // `https://fakestoreapi.com/products/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log("Error fetching products", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);
  
  const loadMore = async () => {
    try {
      setLoading(false);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setProducts([...products, ...data?.products]);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const handleFilter = (isChecked, id) => {
    if (isChecked) {
      setChecked((prevChecked) => [...prevChecked, id]);
    } else {
      setChecked((prevChecked) =>
        prevChecked.filter((categoryId) => categoryId !== id)
      );
    }
  };
  useEffect(() => {
    filterProducts();
  }, [checked, radio]);
  const filterProducts = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/product/product-filter",
        {
          checked,
          radio,
        }
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log("Error filtering products", error);
    }
  };
  return (
    <div>
      <Layout>
        <div className="container product_section_container">
          <div className="row">
            <div className="col product_section clearfix">
              {/* <!-- Breadcrumbs --> */}

              <div className="breadcrumbs d-flex flex-row align-items-center">
                <ul>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li className="active">
                    <a href="index.html">
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                      Shop
                    </a>
                  </li>
                </ul>
              </div>

              {/* <!-- Sidebar --> */}

              <div className="sidebar">
                <div className="sidebar_section">
                  <div className="sidebar_title">
                    <h5>Product Category</h5>
                  </div>
                  <ul className="sidebar_categories">
                    {categories &&
                      categories.map((c) => (
                        <li key={c._id}>
                          <Checkbox
                            onChange={(e) =>
                              handleFilter(e.target.checked, c._id)
                            }
                          >
                            <a href="#">{c.name}</a>
                          </Checkbox>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* <!-- Sizes --> */}
                <div className="sidebar_section">
                  <div className="sidebar_title">
                    <h5>Prices</h5>
                  </div>
                  <ul className="checkboxes">
                    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                      {Prices.map((p) => (
                        <div key={p._id}>
                          <Radio value={p.array}>
                            <li className="active">
                              {/* <i className="fa fa-square" aria-hidden="true"></i> */}
                              <span>{p.name}</span>
                            </li>
                          </Radio>
                        </div>
                      ))}
                    </Radio.Group>
                  </ul>
                </div>
                <div class="filter_button">
                  <span onClick={() => window.location.reload()}>
                    Reset Filters
                  </span>
                </div>
              </div>

              {/* <!-- Main Content --> */}

              <div className="main_content">
                {/* <!-- Products --> */}

                <div className="products_iso">
                  <div className="row">
                    <div className="col">
                      {/* <!-- Product Sorting --> */}

                      <div className="product_sorting_container product_sorting_container_top">
                        <div className="pages d-flex flex-row align-items-center">
                          <div className="page_current">
                            <span>1</span>
                            <ul className="page_selection">
                              <li>
                                <a href="#">1</a>
                              </li>
                              <li>
                                <a href="#">2</a>
                              </li>
                              <li>
                                <a href="#">3</a>
                              </li>
                            </ul>
                          </div>
                          <div className="page_total">
                            <span>of</span> 3
                          </div>
                          <div id="next_page" className="page_next">
                            <a href="#">
                              <i
                                className="fa fa-long-arrow-right"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* <!-- Product Grid --> */}

                      <div className="product-grid">
  <div className="row">
    {/* <!-- Product 1 --> */}
    {products.map((item) => (
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
                           <div class="left">
                             <div class="details">
                               <h5>{item.name}</h5>
                               <p>${item.price}</p>
                             </div>
                             <div class="buy">
                               {" "}
                               <a  onClick={() => {
                                     setCart([...cart, item]);
                                     toast.success("item Added to Cart");
                                   }}>
                               
                               <i style={{fontSize:"30px"}} className="fa-solid fa-cart-plus"></i>
                               </a>
                             </div>
                           </div>
                           <div class="right">
                             {/* <div class="done">
                               <i class="material-icons">done</i>
                             </div> */}
                     {/*         
                             <div class="remove">
                               <i class="material-icons">clear</i>
                             </div> */}
                           </div>
                         </div>
                       </div>
                       <div className="inside">
                             <div className="icon">
                               <a className="" onClick={() => navigate(`/productdetail/${item.slug}`)}>
                               <i className="fa-solid fa-circle-info fs-3" style={{color:"skyblue"}}></i>
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
            </div>
          </div>
          <div className="benefit">
            <div className="container">
              <div className="row benefit_row">
                <div className="col-lg-3 benefit_col">
                  <div className="benefit_item d-flex flex-row align-items-center">
                    <div className="benefit_icon">
                      <i className="fa fa-truck" aria-hidden="true"></i>
                    </div>
                    <div className="benefit_content">
                      <h6>free shipping</h6>
                      <p>Suffered Alteration in Some Form</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 benefit_col">
                  <div className="benefit_item d-flex flex-row align-items-center">
                    <div className="benefit_icon">
                      <i className="fa fa-money" aria-hidden="true"></i>
                    </div>
                    <div className="benefit_content">
                      <h6>cash on delivery</h6>
                      <p>The Internet Tend To Repeat</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 benefit_col">
                  <div className="benefit_item d-flex flex-row align-items-center">
                    <div className="benefit_icon">
                      <i className="fa fa-undo" aria-hidden="true"></i>
                    </div>
                    <div className="benefit_content">
                      <h6>45 days return</h6>
                      <p>Making it Look Like Readable</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 benefit_col">
                  <div className="benefit_item d-flex flex-row align-items-center">
                    <div className="benefit_icon">
                      <i className="fa fa-clock-o" aria-hidden="true"></i>
                    </div>
                    <div className="benefit_content">
                      <h6>opening all week</h6>
                      <p>8AM - 09PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Shop;
