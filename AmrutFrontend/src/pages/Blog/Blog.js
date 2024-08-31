import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "../../styles/blog.css";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import homeSpinner from "../../functionality/homeSpinner";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogData, setBlogData] = useState(null);
const[loading,setLoading] = useState(true)

  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook
const[error,setError] = useState([]);
  const handleLike = () => {
    // Toggle the liked state
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/blog/get-blog"
      );
      if(!response.ok){
        throw new Error("failed to fetch Data")
      }
      const data = await response.json();
      const sortedBlogs = data.blogs.sort((a, b) => {
        // Sort by time (date) in descending order
        return new Date(b.date) - new Date(a.date);
      });
      const selectedBlogs = sortedBlogs.slice(0, 10);
  
      console.log("Fetched data:", data);
      setBlogData(selectedBlogs);
    
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to fetch data. Please try again later.");
    }
  };
 
  //  if (loading) {
  //    return <homeSpinner />; // Show spinner while loading
  //  }


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <Layout title={"Blog - Amrut Food Services"}>
      <div className="container single_product_container">
      <div className="row">
            <div className="col">
              {/* <!-- Breadcrumbs --> */}

              <div className="breadcrumbs d-flex flex-row align-items-center">
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/shop">
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                      Blog
                    </a>
                  </li>
                  <li className="active">
                    <a href="#">
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                      All Blog Page
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        <section className="cards">
          {blogData && blogData.length >0 && blogData.map((item,index) => (
            <article
              className="card card--1"
              style={{
                backgroundImage: `url(http://localhost:8080/api/v1/blog/post-photo/${item._id})`,
              }}
              key={item._id}
            >
              <div className="card__info-hover">
                <svg
                  className={`card__like ${isLiked ? "liked" : ""}`}
                  viewBox="0 0 24 24"
                  onClick={handleLike}
                >
                  <path
                    fill={isLiked ? "red" : "#000000"}
                    d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
                  />
                </svg>

                <div className="card__clock-info">
                  <span className="card__time">{formatDate(item.date)}</span>
                </div>
              </div>
              <div className="card__img"></div>
              <a href="#" className="card_link">
                <div className="card__img--hover"></div>
              </a>
              <div className="card__info">
                <span className="card__category">{item?.category.name}</span>
                {/* Use navigate function to navigate */}
                <h3 className="card__title" onClick={() => navigate(`/blog/${item.title}`)}>
                  {item?.title}
                </h3>
                <span className="card__by">
                  by{" "}
                  <a href="#" className="card__author" title="author">
                    {item.name}
                  </a>
                </span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </Layout>
  );
};

export default Blog;
