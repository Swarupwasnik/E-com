import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import logo from "../pictures/logo.png";
import COD from "../pictures/COD.png";
import "../index.css";
import Modal from "react-modal";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Online Payment");
  const [showPaymentGateway, setShowPaymentGateway] = useState(true);
  const [value, setValue] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(
    () => localStorage.getItem("hasShownPopup") === "true"
  );
  //Otp verification
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  //popup

  useEffect(() => {
    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        setHasShownPopup(true);
        localStorage.setItem("hasShownPopup", "true"); // Persist state in localStorage
      }, 10000);

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [hasShownPopup]);

  const closeModal = () => {
    setShowPopup(false);
  };

  //cart items
  useEffect(() => {
    const updatedCart = cart.map((item) => {
      if (!item.quantity) {
        return { ...item, quantity: 1 }; // Default quantity to 1 if not set
      }
      return item;
    });
    setCart(updatedCart);
  }, []);
  // [cart, setCart]);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });
      total = total * (1 - discountAmount);
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const applyDiscountCode = () => {
    if (discountCode === "DISCOUNT20") {
      setDiscountAmount(0.2); // 20% discount
      toast.success("Discount code applied!");
    } else {
      setDiscountAmount(0);
      toast.error("Invalid discount code");
    }
  };

  const handleQuantityChange = (pid, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item._id === pid) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error("Failed to remove item from cart");
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080c/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     let response;
  //     if (paymentMethod === "Online Payment") {
  //       const { nonce } = await instance.requestPaymentMethod();
  //       response = await axios.post(
  //         "http://localhost:8080/api/v1/product/braintree/payment",
  //         {
  //           nonce,
  //           cart,
  //         }
  //       );
  //     } else {
  //       response = await axios.post(
  //         "http://localhost:8080/api/v1/product/order",
  //         {
  //           cart,
  //           paymentMethod,
  //         }
  //       );
  //     }

  //     setLoading(false);
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     if (paymentMethod === "Online Payment") {
  //       toast.success("Payment Successfully");
  //     } else {
  //       toast.success("Thank you for your order!");
  //     }
  //     navigate("/dash/user/order");
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //     toast.error("Payment failed. Please try again.");
  //   }
  // };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_Nhy8gLo4p9zLnz",
      amount: data.amount,
      currency: data.currency,
      oredr_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL = "http://localhost:8080/api/v1/product/razor/verify";
          const { data } = await axios.post(verifyURL, response);
        } catch (err) {
          console.log(err);
        }
      },
    };
    const rzpl = new window.Razorpay(options);
    rzpl.open();
  };
  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:8080/api/v1/product/razor/orders";
      const { data } = await axios.post(orderUrl, { amount: cart.price });
      console.log(data);
    } catch (err) {}
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method === "Online Payment") {
      setShowPaymentGateway(true);
    } else if (method === "Cash on Delivery") {
      if (!auth.token) {
        toast.error("Please login to select Cash on Delivery");
        navigate("/login", { state: "/cart" });
      } else {
        setShowPaymentGateway(false);
      }
    }
  };

  //otp send
  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/otp/send-otp", {
        mobile,
      });
      if (response.data.success) {
        setOtpSent(true);
        alert("OTP sent successfully");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:3000/verify-otp", {
        mobile,
        otp,
      });
      if (response.data.success) {
        setVerified(true);
        alert("OTP verified successfully");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <Layout>
      <div className="container single_product_container">
        <div className="row">
          <div className="col">
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
        <div>
          <Modal
            isOpen={showPopup}
            onRequestClose={closeModal}
            contentLabel="Special Discount"
            ariaHideApp={false}
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
              },
            }}
          >
            <h2>{`Special Discount for ${auth?.token && auth?.user?.name}`}</h2>
            <p>
              Stay with us Apply this code "DISCOUNT20" and get a 20% discount
              on your purchase.
            </p>
            <a href="/cart1">
              <button onClick={closeModal}>Ok</button>
            </a>
            <a href="/contact">
              <button onClick={closeModal}>Leave</button>
            </a>
          </Modal>
        </div>

        <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
          <a href="#" className="text-3xl font-bold text-gray-800">
            {" "}
            {/* Increased font size */}
            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <div className="flex justify-center mx-auto">
                <img className="w-25 h-25 sm:w-24 sm:h-24" src={logo} alt="" />{" "}
                {/* Increased logo size */}
              </div>
            </div>
          </a>
          <div className="mt-4 py-2 text-base sm:mt-0 sm:ml-auto sm:text-lg">
            {" "}
            {/* Increased font size */}
            <div className="relative">
              <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </a>
                  <span className="font-semibold text-gray-900 font-3xl">
                    Shop
                  </span>
                </li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                    href="#"
                  >
                    2
                  </a>
                  <span className="font-semibold text-gray-900">Shipping</span>
                </li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                    href="#"
                  >
                    3
                  </a>
                  <span className="font-semibold text-gray-500">Payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div>
              <p class="mb-0 text-left">
                {`Hello ${auth?.token && auth?.user?.name}`}

                <h6 className="text-center">
                  {cart?.length
                    ? `You Have ${cart.length} items in your cart ${
                        auth?.token ? "" : "please login to checkout !"
                      }`
                    : " Your Cart Is Empty"}
                </h6>
              </p>
            </div>
            {cart?.map((p) => (
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-25 w-25 rounded-md border object-cover object-center"
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />

                <div className="flex w-full flex-col px-4 py-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{p.name}</span>
                    <a
                      href="#!"
                      type="button"
                      onClick={() => removeCartItem(p._id)}
                      style={{ color: "red" }}
                      className="ml-2"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </a>
                  </div>
                  <span className="text-gray-400">
                    {p.description.substring(0, 30)}
                  </span>
                  <p className="text-lg font-bold">${p.price}</p>
                  <p className="text-gray-400">Total: {p.price * p.quantity}</p>
                  <label className="font-2xl" htmlFor={`quantity-${p._id}`}>
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id={`quantity-${p._id}`}
                    name="quantity"
                    min="1"
                    Value={p.quantity}
                    onChange={(e) =>
                      handleQuantityChange(p._id, parseInt(e.target.value))
                    }
                    required
                    className="w-16"
                  />
                </div>
              </div>
            ))}
            {/* <div className="relative">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  id="discount-code"
                  name="discount-code"
                  className="w-full rounded-md border border-gray-200 px-4 py-4 pl-11 text-md uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Apply Discount Coupon Code"
                />
                <button
                  
                  className="mt-2 w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Apply Code
                </button>
              </div> */}

            <div className="flex flex-row sm:flex-row items-center">
              <div className="flex-shrink-0 w-8/12">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  id="discount-code"
                  name="discount-code"
                  className="w-full rounded-md border border-gray-200 px-4 py-4 pl-11 text-md uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Apply Discount Coupon Code"
                />
              </div>
              <div className="flex-shrink-0 ml-4">
                <button
                  onClick={applyDiscountCode}
                  className="btn btn-outline-warning"
                  type="button"
                >
                  APPLY CODE
                </button>
              </div>
            </div>
            <div className="mt-8 rounded-lg border bg-white px-2 py-4">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Total Amount:</p>
                <p className="font-semibold text-gray-700">{totalPrice()}</p>
              </div>
            </div>
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>

            <div class="">
              <label for="email" class="mt-4 mb-2 block  font-2xl">
                Email
              </label>
              <div class="relative">
                <input
                  type="text"
                  value={auth.user?.email}
                  id="email"
                  name="email"
                  class="w-full rounded-md border border-gray-200 px-4 py-4 pl-11 text-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"></div>
              </div>
              <label for="card-holder" class="mt-4 mb-2 block font-3xl">
                User Name
              </label>
              <div class="relative">
                <input
                  type="text"
                  value={auth.user?.name}
                  id="card-holder"
                  name="card-holder"
                  class="w-full rounded-md border border-gray-200 px-4 py-4 pl-11 text-md uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"></div>
              </div>
              <label for="card-no" class="mt-4 mb-2 block  font-3xl">
                Mobile number
              </label>
              {/* <div class="relative">
                <input
                  type="text"
                  value={auth.user?.phone}
                  id="card-holder"
                  name="card-holder"
                  class="w-full rounded-md border border-gray-200 px-4 py-4 pl-11 text-md uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  
                </div>
              </div> */}
              <div className="flex flex-row sm:flex-row items-center">
                <div className="flex-shrink-0 w-8/12">
                  <input
                    type="number"
                    id="mobile number"
                    name="Mobile number"
                    className="w-full rounded-md border border-gray-200 px-4 py-4 text-md uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Updated Mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="flex-shrink-0 ml-4">
                  <button
                    onClick={sendOtp}
                    className="btn btn-outline-warning"
                    type="button"
                    disabled={otpSent}
                  >
                    SEND OTP
                  </button>
                </div>
                {otpSent && (
                  <div>
                    <label>
                      OTP:
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </label>
                    <button onClick={verifyOtp} disabled={verified}>
                      Verify OTP
                    </button>
                  </div>
                )}
                {verified && <div>Mobile number verified successfully!</div>}
              </div>
              <label for="billing-address" class="mt-4 mb-2 block font-3xl">
                Billing Address
              </label>

              {auth?.user?.address ? (
                <div className="flex flex-row sm:flex-row items-center">
                  <div className="flex-shrink-0 w-8/12">
                    <input
                      type="text"
                      id="billing-address"
                      name="billing-address"
                      className="w-full rounded-md border border-gray-200 px-4 py-4 text-md uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Street Address"
                      value={auth.user.address}
                      readOnly
                    />
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <button
                      onClick={() => navigate(`/dash/user/profile`)}
                      className="btn btn-outline-warning"
                      type="button"
                    >
                      Update Address
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                    type="button"
                  >
                    Please Login to Checkout
                  </button>
                </div>
              )}
            </div>
            <div className="">
              <label className="block mb-2 font-3xl text-gray-600">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => handlePaymentMethodChange(e.target.value)}
                className="block w-full px-4 py-4 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value="Online Payment">Online Payment</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>
            {paymentMethod === "Cash on Delivery" && (
              <div className="flex justify-center mt-4">
                <img className="w-50 h-50 sm:h-8" src={COD} alt="COD" />
              </div>
            )}
            {showPaymentGateway && (
              <div>
                {!clientToken || !auth?.token ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="mt-4 w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                      onClick={handlePayment}
                      disabled={loading || !instance}
                    >
                      {loading ? "Processing..." : "Pay Now"}
                    </button>
                  </>
                )}
              </div>
            )}
            <button
              className="mt-4 w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
