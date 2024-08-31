import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/Search";

const SearchProduct = () => {
  const [values, setValues] = useSearch();
  return (
    <div>
      <Layout title={"Search Product"}>
        <div className="container">
          <div className="text-center">
            <h1>Search Results</h1>
            <h6>
              {values?.results.length < 1
                ? "no Products Found"
                : `Found ${values?.results.length}`}
            </h6>
            <div className="row">
            {values.results.map((item) => (
              <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card border-light mb-3">
                  <img src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} className="card-img-top" alt={item.name} />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h4 mb-0 text-gray">${item.price}</span>
                      <a href="#" className="btn btn-primary">Add to Cart</a>
                    </div>
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

export default SearchProduct;
