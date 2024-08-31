import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../components/layout/Layout";
//  import "../styles/carrer.css";
import cv_bg from "../pictures/img/gallery/cv_bg.jpg";
// import job-list1 from "../pictures/img/icon/job-list1.png";
import how_applybg from "../pictures/img/gallery/how_applybg.png";
import carrer from "../pictures/carrer.jpg";
import logo from "../pictures/logo.png";
import { isLowercase } from 'validator';
import { Navigate, useNavigate } from 'react-router-dom';
const Carrer = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/carrer/jobs');
      console.log(response.data); // Log the fetched data to the console
      setJobPostings(response.data.jobPostings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
                    Shop
                  </a>
                </li>
                <li className="active">
                  <a href="#">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    Cartpage
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="slider-area ">
            {/* <!-- Mobile Menu --> */}
            <div class="slider-active">
                <div class="single-slider slider-height d-flex align-items-center" data-background="pictures/img/gallery/cv_bg.jpg"    style={{ backgroundImage: `url(${carrer})` }}
 >
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-6 col-lg-9 col-md-10">
                                <div class="hero__caption">
                                    <h1>Find the most exciting Job Opportunity</h1>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Search Box --> */}
                        <div class="row">
    <div class="col-xl-5">
        <form action="#" class="search-box d-flex align-items-center">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Job Title or keyword"/>
                <div class="input-group-append">
                    <button class="btn btn-primary" type="submit">Find job</button>
                </div>
            </div>
        </form>
    </div>
</div>

                    </div>
                </div>
            </div>
        </div>

        <div class="our-services section-pad-t30">
            <div class="container">
                {/* <!-- Section Tittle --> */}
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center">
                            <span>FEATURED TOURS Packages</span>
                            <h2>Browse Top Categories </h2>
                        </div>
                    </div>
                </div>
                <div class="row d-flex justify-contnet-center">
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-tour"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Design & Creative</a></h5>
                                <span>(0)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-cms"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Design & Development</a></h5>
                                <span>(0)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-report"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Sales & Marketing</a></h5>
                                <span>(0)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-app"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Mobile Application</a></h5>
                                <span>(0)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-helmet"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Production Department</a></h5>
                                <span>(0)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-high-tech"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Safety Management</a></h5>
                                <span>(0)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-real-estate"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Project Management</a></h5>
                                <span>(0)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-content"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Content Writer</a></h5>
                                <span>(0)</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- More Btn --> */}
                {/* <!-- Section Button --> */}
                <div class="row">
                    <div class="col-lg-12">
                        <div class="browse-btn2 text-center mt-50">
                            <a href="job_listing.html" class="border-btn2">Browse All Jobs</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="online-cv cv-bg section-overly pt-90 pb-120"  data-background="pictures/img/gallery/cv_bg.jpg"  style={{ backgroundImage: `url(${cv_bg})` }}>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-10">
                        <div class="cv-caption text-center">
                            <p class="pera1">FEATURED TOURS Packages</p>
                            <p class="pera2"> Make a Difference with Your Online Resume!</p>
                            <a href="#" class="border-btn2 border-btn4">Upload your cv</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Online CV Area End--> */}
        {/* <!-- Featured_job_start --> */}
        <section class="featured-job-area feature-padding">
            <div class="container">
                {/* <!-- Section Tittle --> */}
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center">
                            <span>Recent Job</span>
                            <h2>Featured Jobs</h2>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-xl-10">
                        {/* <!-- single-job-content --> */}
                        {jobPostings.map((job)=> ( <div key={job._id} class="single-job-items mb-30">
    <div class="job-items">
        <div class="company-img">
            <a href="job_details.html">
                <img src={logo} alt="" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </a>
        </div>
        <div class="job-tittle">
            <a onClick={() => navigate(`/carrer/${job.jobTitle}`)}><h4>{job.jobTitle}</h4></a>
            <ul>
                <li>{job.company}</li>
                <li style={{wordSpacing:"5px",isLowercase}}><i class="fas fa-map-marker-alt"> {job.location} </i></li>
                <li>{job.status}</li>
            </ul>
        </div>
    </div>
    <div class="items-link f-right">
        <a onClick={() => navigate(`/carrer/${job.jobTitle}`)}>view details</a>
        <span>{new Date(job.postedOn).toLocaleDateString()}</span>
    </div>
</div>
))}
                        {/* <!-- single-job-content --> */}
                        <div class="single-job-items mb-30">
                            <div class="job-items">
                                <div class="company-img">
                                    <a href="job_details.html"><img src="assets/img/icon/job-list2.png" alt=""/></a>
                                </div>
                                <div class="job-tittle">
                                    <a href="job_details.html"><h4>Digital Marketer</h4></a>
                                    <ul>
                                        <li>Creative Agency</li>
                                        <li><i class="fas fa-map-marker-alt"></i>Athens, Greece</li>
                                        <li>$3500 - $4000</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="items-link f-right">
                                <a href="job_details.html">Full Time</a>
                                <span>7 hours ago</span>
                            </div>
                        </div>
                         {/* <!-- single-job-content --> */}
                        <div class="single-job-items mb-30">
                            <div class="job-items">
                                <div class="company-img">
                                    <a href="job_details.html"><img src="assets/img/icon/job-list3.png" alt=""/></a>
                                </div>
                                <div class="job-tittle">
                                    <a href="job_details.html"><h4>Digital Marketer</h4></a>
                                    <ul>
                                        <li>Creative Agency</li>
                                        <li><i class="fas fa-map-marker-alt"></i>Athens, Greece</li>
                                        <li>$3500 - $4000</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="items-link f-right">
                                <a href="job_details.html">Full Time</a>
                                <span>7 hours ago</span>
                            </div>
                        </div>
                         {/* <!-- single-job-content --> */}
                        <div class="single-job-items mb-30">
                            <div class="job-items">
                                <div class="company-img">
                                    <a href="job_details.html"><img src="assets/img/icon/job-list4.png" alt=""/></a>
                                </div>
                                <div class="job-tittle">
                                    <a href="job_details.html"><h4>Digital Marketer</h4></a>
                                    <ul>
                                        <li>Creative Agency</li>
                                        <li><i class="fas fa-map-marker-alt"></i>Athens, Greece</li>
                                        <li>$3500 - $4000</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="items-link f-right">
                                <a href="job_details.html">Full Time</a>
                                <span>7 hours ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="apply-process-area apply-bg pt-150 pb-150" style={{backgroundImage:`url(${how_applybg})`}}>
            <div class="container">
                {/* <!-- Section Tittle --> */}
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle white-text text-center">
                            <span>Apply process</span>
                            <h2> How it works</h2>
                        </div>
                    </div>
                </div>
                {/* <!-- Apply Process Caption --> */}
                <div class="row">
                    <div class="col-lg-4 col-md-6">
                        <div class="single-process text-center mb-30">
                            <div class="process-ion">
                                <span class="flaticon-search"></span>
                            </div>
                            <div class="process-cap">
                               <h5>1. Search a job</h5>
                               <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-process text-center mb-30">
                            <div class="process-ion">
                                <span class="flaticon-curriculum-vitae"></span>
                            </div>
                            <div class="process-cap">
                               <h5>2. Apply for job</h5>
                               <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-process text-center mb-30">
                            <div class="process-ion">
                                <span class="flaticon-tour"></span>
                            </div>
                            <div class="process-cap">
                               <h5>3. Get your job</h5>
                               <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>

</div>


{/*         
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>


          <h2>Job Postings</h2>
          {jobPostings.map((job) => (
            <div key={job._id}>
              <h3>{job.jobTitle}</h3>
              <p>Company: {job.company}</p>
              <p>Location: {job.location}</p>
              <p>Description: {job.description}</p>
              <p>Status: {job.status}</p>
              <p>Posted On: {new Date(job.postedOn).toLocaleDateString()}</p>
              <p>Applied On: {new Date(job.appliedOn).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div> */}
    </Layout>
  );
};

export default Carrer;
 {/* <!-- Password Reset 8 - Bootstrap Brain Component -->
      <section class="bg-light p-3 p-md-4 p-xl-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-xxl-11">
              <div class="card border-light-subtle shadow-sm">
                <div class="row g-0">
                  <div class="col-12 col-md-6">
                    <img
                      class="img-fluid rounded-start w-100 h-100 object-fit-cover"
                      loading="lazy"
                      src="https://bootstrapbrain.com/demo/components/password-resets/password-reset-8/assets/img/logo-img-1.webp"
                      alt="Welcome back you've been missed!"
                    />
                  </div>
                  <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div class="col-12 col-lg-11 col-xl-10">
                      <div class="card-body p-3 p-md-4 p-xl-5">
                        <div class="row">
                          <div class="col-12">
                            <div class="mb-5">
                              <div class="text-center mb-4">
                                <a href="#!">
                                  <img
                                    src=""
                                    alt="Amrut Food Services"
                                    width="175"
                                    height="57"
                                  />
                                </a>
                              </div>
                              <h2 class="h4 text-center">Password Reset</h2>
                              <h3 class="fs-6 fw-normal text-secondary text-center m-0">
                                Provide the email address associated with your
                                account to recover your password.
                              </h3>
                            </div>
                          </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div class="row gy-3 overflow-hidden">
                            <div class="col-12">
                              <div class="form-floating mb-3">
                                <input
                                  type="email"
                                  class="form-control"
                                  name="email"
                                  id="email"
                                  placeholder="Enter your Registered Email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                                <label for="email" class="form-label">
                                  Email
                                </label>
                              </div>
                       
                              <div class="form-floating mb-3">
                                <input
                                  type="answer"
                                  class="form-control"
                                  name="answer"
                                  id="answer"
                                  placeholder="What is your Last school name?"
                                  value={answer}
                                  onChange={(e) => setAnswer(e.target.value)}
                                  required
                                />
                                <label for="answer" class="form-label">
                                  answer
                                </label>
                              </div>
                              <div class="form-floating mb-3">
                                <input
                                  type="password"
                                  class="form-control"
                                  name="password"
                                  id="password"
                                  placeholder="Enter Your new Password"
                                  value={newpassword}
                                  onChange={(e) =>
                                    setnewPassword(e.target.value)
                                  }
                                  required
                                />
                                <label for="password" class="form-label">
                                  New Password
                                </label>
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="d-grid">
                                <button
                                  class="btn btn-dark btn-lg"
                                  type="submit"
                                >
                                  Reset Password
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                        <div class="row">
                          <div class="col-12">
                            <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                              <Link
                                to="/login"
                                class="link-secondary text-decoration-none"
                              >
                                Login
                              </Link>
                              <Link
                                to="/register"
                                class="link-secondary text-decoration-none"
                              >
                                Register
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}