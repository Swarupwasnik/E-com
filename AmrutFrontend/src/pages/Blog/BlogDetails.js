import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { title } = useParams();
  const [blog, setBlogData] = useState({});
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  // Fetch blog details
  useEffect(() => {
    const getBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/blog/get-blog/${title}`
        );
        setBlogData(data.Blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    getBlog();
  }, [title]);

  // Fetch related blogs
  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        if (blog && blog._id && blog.categoryId) {
          const response = await axios.get(
            `http://localhost:8080/api/v1/blog/related/${blog._id}/${blog.categoryId}`
          );
          setRelatedBlogs(response.data.relatedBlogs);
        } else {
          console.error("Invalid blog data:", blog);
        }
      } catch (error) {
        console.error("Error fetching related blogs:", error);
      }
    };

    fetchRelatedBlogs();
  }, [blog]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <Layout>
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
                      Blog Details Page
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        <div className="card px-3 mx-auto pt-3" style={{ maxWidth: "32rem" }}>
          {Object.keys(blog).length > 0 && (
            <div className="mx-auto">
              <div className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4">
                <img
                  src={`http://localhost:8080/api/v1/blog/post-photo/${blog._id}`}
                  alt={blog.name}
                  className="img-fluid"
                />
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <a href="" className="text-info">
                    {blog.category?.name}
                  </a>
                </div>
                <div className="col-6 text-end">
                  <u>
                    {blog.name} | {blog.day} | {formatDate(blog.date)}
                  </u>
                </div>
              </div>
              <a href="" className="text-dark">
                <h4 className="uppercase text-warning">{blog?.title}</h4>
                <p>
                  by{" "}
                  <q className="lowercase text-primary">{blog?.name}</q>
                </p>
                <p>{blog.description}</p>
              </a>
            </div>
          )}
          <hr />
          {relatedBlogs.map((relatedBlog) => (
            <div key={relatedBlog._id} className="row mb-4 border-bottom pb-2">
              <div className="col-3">
                <img
                  src={`http://localhost:8080/api/v1/blog/post-photo/${relatedBlog._id}`}
                  alt={relatedBlog.name}
                  className="img-fluid shadow-1-strong rounded"
                />
              </div>
              <div className="col-9">
                <p className="mb-2">
                  <strong>{relatedBlog.title}</strong>
                </p>
                <p>
                  <u>
                    {relatedBlog.name} | {relatedBlog.day} |{" "}
                    {formatDate(relatedBlog.date)}
                  </u>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetails;