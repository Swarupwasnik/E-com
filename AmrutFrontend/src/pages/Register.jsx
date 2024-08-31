// import React, { useState } from "react";
// import Layout from "../components/layout/Layout";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [answer, setAnswer] = useState("");

//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:8080/api/v1/auth/register",
//         {
//           name,
//           email,
//           password,
//           phone,
//           address,
//           answer,
//         }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/login");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something Went Wrong");
//     }
//   };
//   return (
//     <Layout title={"Register"}>
//       <div className="container contact_container">
//         <div className="row">
//           <div className="col">
//             {/* <!-- Breadcrumbs --> */}

//             <div className="breadcrumbs d-flex flex-row align-items-center">
//               <ul>
//                 <li>
//                   <a href="/">Home</a>
//                 </li>
//                 <li className="active">
//                   <a href="/contact">
//                     <i className="fa fa-angle-right" aria-hidden="true"></i>
//                     Register
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         {/* <!-- Registration 3 - Bootstrap Brain Component --> */}
//         <section className="p-3 p-md-4 p-xl-5">
//           <div className="container">
//             <div className="row">
//               <div className="col-12 col-md-6 bsb-tpl-bg-platinum">
//                 <div className="d-flex flex-column justify-content-between h-100 p-3 p-md-4 p-xl-5">
//                   <h3 className="m-0">Welcome!</h3>
//                   <img
//                     className="img-fluid rounded-start w-100 h-100 object-fit-cover m-2"
//                     loading="lazy"
//                     src="https://bootstrapbrain.com/demo/components/abouts/about-1/assets/img/about-img-1.jpg"
//                     // width="245"
//                     // height="80"
//                     alt="BootstrapBrain Logo"
//                   />
//                   <p className="mb-0">
//                     Not a member yet?{" "}
//                     <Link
//                       to="/register"
//                       className="link-secondary text-decoration-none"
//                     >
//                       Register now
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//               <div className="col-12 col-md-6 bsb-tpl-bg-lotion">
//                 <div className="p-3 p-md-4 p-xl-5">
//                   <div className="row">
//                     <div className="col-12">
//                       <div className="mb-5">
//                         <h2 className="h3">Registration</h2>
//                         <h3 className="fs-6 fw-normal text-secondary m-0">
//                           Enter your details to register
//                         </h3>
//                       </div>
//                     </div>
//                   </div>
//                   <form onSubmit={handleSubmit}>
//                     <div className="row gy-3 gy-md-4 overflow-hidden">
//                       <div className="col-12">
//                         <label htmlFor="name" className="form-label">
//                           Name <span className="text-danger">*</span>
//                         </label>
//                         <input
//                           type="name"
//                           value={name}
//                           className="form-control"
//                           name="name"
//                           id="name"
//                           placeholder="First Name"
//                           onChange={(e) => setName(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="col-12">
//                         <label htmlFor="email" className="form-label">
//                           Email <span className="text-danger">*</span>
//                         </label>
//                         <input
//                           type="email"
//                           value={email}
//                           className="form-control"
//                           name="email"
//                           id="email"
//                           placeholder="email"
//                           onChange={(e) => setEmail(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="col-12">
//                         <label htmlFor="password" className="form-label">
//                           Password<span className="text-danger">*</span>
//                         </label>
//                         <input
//                           type="password"
//                           value={password}
//                           className="form-control"
//                           name="password"
//                           id="password"
//                           placeholder="Password"
//                           onChange={(e) => setPassword(e.target.value)}
//                           required
//                         />
//                       </div>

//                       <div className="col-12">
//                         <label htmlFor="phone" className="form-label">
//                           Mobile No <span className="text-danger">*</span>
//                         </label>
//                         <input
//                           type="number"
//                           placeholder="Mobile No"
//                           className="form-control"
//                           name="phone"
//                           id="phone"
//                           value={phone}
//                           onChange={(e) => setPhone(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="col-12">
//                         <label htmlFor="address" className="form-label">
//                           Address<span className="text-danger">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="address"
//                           id="address"
//                           value={address}
//                           placeholder="Address"
//                           onChange={(e) => setAddress(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="col-12">
//                         <label htmlFor="address" className="form-label">
//                           Answer<span className="text-danger">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="answer"
//                           id="answer"
//                           value={answer}
//                           placeholder="What is your Last School Name?"
//                           onChange={(e) => setAnswer(e.target.value)}
//                           required
//                         />
//                       </div>
                     
//       <div class="form-check d-flex mb-2">

//       <label class="form-check-label" for="registerCheck">
//           I have remember all this 
//         </label>
//         <input
//           class="form-check-input me-1"
//           type="checkbox"
//           value=""
//           id="registerCheck"
//           aria-describedby="registerCheckHelpText"
//         />
         
//       </div>
//                       <div className="col-12"></div>
//                       <div className="col-12">
//                         <div className="d-grid">
//                           <button
//                             className="btn bsb-btn-xl btn-primary"
//                             type="submit"
//                           >
//                             Sign up
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                   <div className="row">
//                     <div className="col-12">
//                       <hr className="mt-5 mb-4 border-secondary-subtle" />
//                       <p className="m-0 text-secondary text-end">
//                         Already have an account?{" "}
//                         <Link
//                           to="/login"
//                           className="link-primary text-decoration-none"
//                         >
//                           Sign in
//                         </Link>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-12">
//                       <p className="mt-5 mb-4">Or sign in with</p>
//                       <div className="d-flex gap-3 flex-column flex-xl-row">
//                         <a
//                           href="#!"
//                           className="btn bsb-btn-xl btn-outline-primary"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="16"
//                             height="16"
//                             fill="currentColor"
//                             className="bi bi-google"
//                             viewBox="0 0 16 16"
//                           >
//                             <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
//                           </svg>
//                           <span className="ms-2 fs-6">Google</span>
//                         </a>
//                         <a
//                           href="#!"
//                           className="btn bsb-btn-xl btn-outline-primary"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="16"
//                             height="16"
//                             fill="currentColor"
//                             className="bi bi-facebook"
//                             viewBox="0 0 16 16"
//                           >
//                             <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
//                           </svg>
//                           <span className="ms-2 fs-6">Facebook</span>
//                         </a>
//                         <a
//                           href="#!"
//                           className="btn bsb-btn-xl btn-outline-primary"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="16"
//                             height="16"
//                             fill="currentColor"
//                             className="bi bi-twitter"
//                             viewBox="0 0 16 16"
//                           >
//                             <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
//                           </svg>
//                           <span className="ms-2 fs-6">Twitter</span>
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </Layout>
//   );
// };

// export default Register;
import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!privacyPolicyAccepted) {
      toast.error("Form is incomplete. You must remember all this to proceed.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
    privacyPolicyAccepted

        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout title={"Register"}>
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
                    Register
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- Registration 3 - Bootstrap Brain Component --> */}
        <section className="p-3 p-md-4 p-xl-5">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 bsb-tpl-bg-platinum">
                <div className="d-flex flex-column justify-content-between h-100 p-3 p-md-4 p-xl-5">
                  <h3 className="m-0">Welcome!</h3>
                  <img
                    className="img-fluid rounded-start w-100 h-100 object-fit-cover m-2"
                    loading="lazy"
                    src="https://bootstrapbrain.com/demo/components/abouts/about-1/assets/img/about-img-1.jpg"
                    alt="BootstrapBrain Logo"
                  />
                  <p className="mb-0">
                    Not a member yet?{" "}
                    <Link
                      to="/register"
                      className="link-secondary text-decoration-none"
                    >
                      Register now
                    </Link>
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6 bsb-tpl-bg-lotion">
                <div className="p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h2 className="h3">Registration</h2>
                        <h3 className="fs-6 fw-normal text-secondary m-0">
                          Enter your details to register
                        </h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-3 gy-md-4 overflow-hidden">
                      <div className="col-12">
                        <label htmlFor="name" className="form-label">
                          Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="name"
                          value={name}
                          className="form-control"
                          name="name"
                          id="name"
                          placeholder="First Name"
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="email" className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="password" className="form-label">
                          Password<span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          value={password}
                          className="form-control"
                          name="password"
                          id="password"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label htmlFor="phone" className="form-label">
                          Mobile No <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          placeholder="Mobile No"
                          className="form-control"
                          name="phone"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="address" className="form-label">
                          Address<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          id="address"
                          value={address}
                          placeholder="Address"
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="answer" className="form-label">
                          Answer<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="answer"
                          id="answer"
                          value={answer}
                          placeholder="What is your Last School Name?"
                          onChange={(e) => setAnswer(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <div className="form-check d-flex mb-2">
                          <input
                            className="form-check-input me-1"
                            type="checkbox"
                            value={privacyPolicyAccepted}
                            id="registerCheck"
                            onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
                          />
                          <label className="form-check-label" htmlFor="registerCheck">
                            I have remembered all this
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className="btn bsb-btn-xl btn-primary"
                            type="submit"
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <hr className="mt-5 mb-4 border-secondary-subtle" />
                      <p className="m-0 text-secondary text-end">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="link-primary text-decoration-none"
                        >
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p className="mt-5 mb-4">Or sign in with</p>
                      <div className="d-flex gap-3 flex-column flex-xl-row">
                        <a
                          href="#!"
                          className="btn bsb-btn-xl btn-outline-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-google"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                          </svg>
                          <span className="ms-2 fs-6">Google</span>
                        </a>
                        <a
                          href="#!"
                          className="btn bsb-btn-xl btn-outline-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-facebook"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                          </svg>
                          <span className="ms-2 fs-6">Facebook</span>
                        </a>
                        <a
                          href="#!"
                          className="btn bsb-btn-xl btn-outline-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-twitter"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                          </svg>
                          <span className="ms-2 fs-6">Twitter</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- END: Registration 3 - Bootstrap Brain Component --> */}
      </div>
    </Layout>
  );
};

export default Register;
 {/* <section className="vh-100 vw-100-" style={{ backgroundColor: "white" }}>
       <div className="container py-5 h-100"> 
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className="img-fluid"
                      // style="border-radius: 1rem 0 0 1rem;"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleLogin}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#FF6819" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">Logo</span>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="email"
                            placeholder="enter your email "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label className="form-label" for="form2Example17">
                            Email address
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            name="password"
                            placeholder="enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label className="form-label" for="form2Example27">
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>

                        <a type="button" className="small text-muted" onClick={()=>{navigate("/forgot-password")}}>
                          Forgot password?
                        </a>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: " #393f81" }}
                        >
                          Don't have an account?{" "}
                          <Link to="/register" style={{ color: "#393f81;" }}>
                            Register here
                          </Link>
                        </p>
                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>  */}