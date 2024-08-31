import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../pictures/logo.png"
const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password", // Remove the extra "/"
        {
          email,
          newpassword,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate(location.state || "/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot-password - Amrut Food Services"}>
      <div className="container contact_container">
        <div className="row">
          <div className="col">
            {/* <!-- Breadcrumbs --> */}
            <div className="breadcrumbs d-flex flex-row align-items-center">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li className="active">
                  <a href="/contact">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    Login
                  </a>
                </li>
                <li className="active">
                  <a href="/contact">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    Forgot Password
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
          <div
            class="hidden bg-cover lg:block lg:w-1/2"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')`,
            }}
          ></div>

          <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div class="flex justify-center mx-auto">
              <img
                class="w-auto h-7 sm:h-8"
                src={logo}
                alt=""
              />
            </div>

            <p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
              Forgot Password
            </p>

            {/* <div class="flex items-center justify-between mt-4">
              <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

              <a
                href="#"
                class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                or login with email
              </a>

              <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div> */}
            <form onSubmit={handleSubmit}>
              <div class="mt-4">
                <label
                  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  for="LoggingEmailAddress"
                >
                  Email Address
                </label>
                <input
                  id="LoggingEmailAddress"
                  class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                  placeholder="Enter your Registered Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div class="mt-4">
                <div class="flex justify-between">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    for="loggingPassword"
                  >
                    Answer
                  </label>
                  {/* <a
                    href="#"
                    class="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                  >
                    Forget Password?
                  </a> */}
                </div>

                <input
                  id="loggingPassword"
                  class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                  name="answer"
                  placeholder="What is your Last school name?"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
              </div>

              <div class="mt-4">
                <label
                  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  for="LoggingEmailAddress"
                >
                New Password
                </label>
                <input
                  id="LoggingEmailAddress"
                  class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="Answer"
                  name="password"
                  placeholder="Enter Your new Password"
                  value={newpassword}
                  onChange={(e) =>
                    setnewPassword(e.target.value)
                  }
                  required
                  
                />
              </div>

              <div class="mt-6">
                <button class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Reset Password
                </button>
              </div>
            </form>

            <div class="flex items-center justify-between mt-4">
              <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

              <a
                href="#"
                class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                or sign up
              </a>

              <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Forgotpassword;
