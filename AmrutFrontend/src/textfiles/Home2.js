import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/prices";
import { useCart } from "../context/cart";
// import CartContext from "../context/cart"
const Home = () => {
  const navigate = useNavigate();
  const [cart,setCart] = useCart([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categoryChecked, setCategoryChecked] = useState({});

  // gettotal

  const handleCheckboxChange = (isChecked, id) => {
    setCategoryChecked((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));
  };

  // console.log("handle==",handleCheckboxChange);
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
        // `https://fakestoreapi.com/products`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log("Error fetching products", error);
      setLoading(false);
    }
  };
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
    <Layout title={"New Raw era"}>
      <div className="row">
        <div className="col-md-2">
          <h6 className="text-center">Filter by Category</h6>
          <div className="d-flex flex-column">
            {categories &&
              categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
          </div>

          <h6 className="text-center">Filter by Prices</h6>
          <div className="d-flex flex-row">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column">
            <button
              className="btn-btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="col-md-10">
          <h3 className="text-center m-2">All Products</h3>
          <div className="row">
            {products.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card border-light mb-3">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h4 mb-0 text-gray">${item.price}</span>
                      <button
                        className="btn btn-primary ms-1"
                      onClick ={()=>{setCart([...cart,item  ])
                      toast.success("Item Added to Cart");
                      }}
                     
                    
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => navigate(`/product/${item.slug}`)}
                        className="btn btn-primary ms-1"
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="m-2 p-3">
          {products && products.length < total && (
            <button
              className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
