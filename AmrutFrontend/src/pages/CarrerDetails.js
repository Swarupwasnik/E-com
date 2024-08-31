import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from  "../components/layout/Layout"; // Assuming you have a Layout component

const CarrerDetails = () => {
  const { _id } = useParams();
  console.log("Fetched _id from URL:", _id); // Add this line to check _id

  const [job, setJob] = useState({});

  useEffect(() => {
    const getJob = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/carrer/single-job/${_id}`
        );
        setJob(data.jobPosting); // Assuming your response data structure has a key named 'jobPosting'
        console.log('Fetched job:', data.jobPosting);
      } catch (error) {
        console.error('Error Fetching Carrer Details:', error);
      }
    };

    getJob();
  }, [_id]);
  

  return (
    <Layout>
      <div className="container single_product_container">
        <div className="row">
          <div className="col">
            {/* Breadcrumbs */}
            <div className="breadcrumbs d-flex flex-row align-items-center">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/shop">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    Carrer
                  </a>
                </li>
                <li className="active">
                  <a href="#">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    Job Details
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {Object.keys(job).length > 0 && (
          <main>
            {/* Hero Area Start */}
            <div className="slider-area ">
              <div
                className="single-slider section-overly slider-height2 d-flex align-items-center"
                data-background="assets/img/hero/about.jpg"
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="hero-cap text-center">
                        <h2>{job.jobTitle}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Hero Area End */}
            {/* job post company Start */}
            <div className="job-post-company pt-120 pb-120">
              <div className="container">
                <div className="row justify-content-between">
                  {/* Left Content */}
                  <div className="col-xl-7 col-lg-8">
                    {/* job single */}
                    <div className="single-job-items mb-50">
                      <div className="job-items">
                        <div className="company-img company-img-details">
                          <a href="#">
                            <img src="assets/img/icon/job-list1.png" alt="" />
                          </a>
                        </div>
                        <div className="job-tittle">
                          <a href="#">
                            <h4>{job.jobTitle}</h4>
                          </a>
                          <ul>
                            <li>{job.company}</li>
                            <li>
                              <i className="fas fa-map-marker-alt"></i>Athens, Greece
                            </li>
                            <li>{job.salary}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* job single End */}

                    <div className="job-post-details">
                      <div className="post-details1 mb-50">
                        {/* Small Section Tittle */}
                        <div className="small-section-tittle">
                          <h4>Job Description</h4>
                        </div>
                        <p>{job.description}</p>
                      </div>
                      <div className="post-details2 mb-50">
                        {/* Small Section Tittle */}
                        <div className="small-section-tittle">
                          <h4>Required Knowledge, Skills, and Abilities</h4>
                        </div>
                        <ul>
                          <li>System Software Development</li>
                          <li>Mobile Application in iOS/Android/Tizen or other platform</li>
                          <li>Research and code, libraries, APIs and frameworks</li>
                          <li>Strong knowledge on software development life cycle</li>
                          <li>Strong problem solving and debugging skills</li>
                        </ul>
                      </div>
                      <div className="post-details2 mb-50">
                        {/* Small Section Tittle */}
                        <div className="small-section-tittle">
                          <h4>Education + Experience</h4>
                        </div>
                        <ul>
                          <li>{job.description}</li>
                          <li>Direct response email experience</li>
                          <li>Ecommerce website design experience</li>
                          <li>Familiarity with mobile and web apps preferred</li>
                          <li>Experience using Invision a plus</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Right Content */}
                  <div className="col-xl-4 col-lg-4">
                    <div className="post-details3 mb-50">
                      {/* Small Section Tittle */}
                      <div className="small-section-tittle">
                        <h4>Job Overview</h4>
                      </div>
                      <ul>
                        <li>
                          Posted date: <span>{job.postedOn}</span>
                        </li>
                        <li>
                          Location: <span>{job.location}</span>
                        </li>
                        <li>
                          Vacancy: <span>02</span>
                        </li>
                        <li>
                          Job nature: <span>{job.jobNature}</span>
                        </li>
                        <li>
                          Salary: <span>{job.salary}</span>
                        </li>
                        <li>
                          Application date: <span>{job.appliedOn}</span>
                        </li>
                      </ul>
                      <div className="apply-btn2">
                        <a href="#" className="btn">
                          Apply Now
                        </a>
                      </div>
                    </div>
                    <div className="post-details4 mb-50">
                      {/* Small Section Tittle */}
                      <div className="small-section-tittle">
                        <h4>Company Information</h4>
                      </div>
                      <span>Colorlib</span>
                      <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                      <ul>
                        <li>
                          Name: <span>Colorlib </span>
                        </li>
                        <li>
                          Web: <span> colorlib.com</span>
                        </li>
                        <li>
                          Email: <span>carrier.colorlib@gmail.com</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* job post company End */}
          </main>
        )}
      </div>
    </Layout>
  );
};

export default CarrerDetails;
