import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categories) {
      setLoading(false);
    }
  }, [categories]);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while categories are being fetched
  }

  if (!Array.isArray(categories)) {
    return <div>Error: Categories data is not an array</div>; // Handle unexpected data format
  }

  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div key={c._id} className="col-md-6 m-3">
              <Link to={`/category/${c.name}`} className="btn-btn-danger">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
