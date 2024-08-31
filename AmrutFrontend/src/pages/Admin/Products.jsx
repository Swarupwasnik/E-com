import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async (req, res) => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      console.log("Data from API:", data);
      console.log("Products from API:", data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3 className="text-center text-secondary">Product List</h3>
            <div className="d-flex ">

            
            {products.map((item) => (
                <Link key={item._id} to={`/dash/admin/product/${item.slug}`} className="product-link">
              <div className="card m-2" style={{ width: "18rem" }} key={item._id}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                  className="card-img-top "
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
              </div>
              </Link>
            ))}
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
