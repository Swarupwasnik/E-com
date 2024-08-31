// import React, { useState, useEffect } from "react";
// import Layout from "../components/layout/Layout";
// import { useAuth } from "../context/auth";
// import { useCart } from "../context/cart";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import DropIn from "braintree-web-drop-in-react";
// import axios from "axios";

// function CartPage() {
//   const [auth, setAuth] = useAuth();
//   const [cart, setCart] = useCart();
//   const navigate = useNavigate();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Online Payment");
//   const [showPaymentGateway, setShowPaymentGateway] = useState(true);
//   //total price
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total = total + item.price;
//       });
//       return total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const removeCartItem = (pid) => {
//     console.log("Removing item with ID:", pid);
//     try {
//       const updatedCart = cart.filter((item) => item._id !== pid);
//       setCart(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage with filtered cart
//       console.log("Updated cart:", updatedCart);

//       toast.success("Item removed from cart");
//     } catch (err) {
//       console.error("Error removing item from cart:", err);
//       toast.error("Failed to remove item from cart");
//     }
//   };

//   // get payment gatway token

//   const getToken = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:3000/api/v1/product/braintree/token"
//       );
//       setClientToken(data?.clientToken);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   // const handlePayment = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const { nonce } = await instance.requestPaymentMethod();
//   //     const { data } = await axios.post(
//   //       "http://localhost:3000/api/v1/product/braintree/payment",
//   //       {
//   //         nonce,
//   //         cart,
//   //       }
//   //     );
//   //     setLoading(false);
//   //     localStorage.removeItem("cart");
//   //     setCart([]);
//   //     navigate("/dash/user/order");
//   //     toast.success("Payment Sucessfully");
//   //   } catch (err) {
//   //     console.log(err);
//   //     setLoading(false);
//   //   }
//   // };
//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       let response;
//       if (paymentMethod === "Online Payment") {
//         const { nonce } = await instance.requestPaymentMethod();
//         response = await axios.post(
//           "http://localhost:3000/api/v1/product/braintree/payment",
//           {
//             nonce,
//             cart,
//           }
//         );
//       } else {
//         // For Cash on Delivery, just proceed with no transaction
//         response = { data: { ok: true } };
//       }
//       setLoading(false);
//       localStorage.removeItem("cart");
//       setCart([]);
//       if(paymentMethod === "online Payment"){
//         navigate("/dash/user/order");
//         toast.success("Payment Successfully");
//       }else{
//         toast.success("Thank you for your order!");

//       }
    
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };
//   const handleCashOnDelivery = () => {
//     if (!auth.token) {
//       navigate("/login", { state: "/cart" });
//     } else {
//       setPaymentMethod("Cash on Delivery");
//       setShowPaymentGateway(false);
//     }
//   };
//   return (
//     <Layout>
//       <div className="container single_product_container">
//         <div className="row">
//           <div className="col">
//             {/* <!-- Breadcrumbs --> */}

//             <div className="breadcrumbs d-flex flex-row align-items-center">
//               <ul>
//                 <li>
//                   <a href="/">Home</a>
//                 </li>
//                 <li>
//                   <a href="/shop">
//                     <i className="fa fa-angle-right" aria-hidden="true"></i>
//                     Shop
//                   </a>
//                 </li>
//                 <li className="active">
//                   <a href="#">
//                     <i className="fa fa-angle-right" aria-hidden="true"></i>
//                     Cartpage
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         <section class="h-100 h-custom w-100" style={{ backgroundColor: "#eee" }}>
//           <div class="container py-5 h-100">
//             <div class="row d-flex justify-content-center align-items-center h-100">
//               <div class="col">
//                 <div class="card">
//                   <div class="card-body p-4">
//                     <div class="row">
//                       <div class="col-lg-7">
//                         <h5 class="mb-3">
//                           <a href="/shop" class="text-body">
//                             <i class="fas fa-long-arrow-alt-left me-2"></i>
//                             Continue shopping
//                           </a>
//                         </h5>
//                         <hr />

//                         <div class="d-flex justify-content-between align-items-center mb-4">
//                           <div>
//                             <p class="mb-1">Shopping cart</p>
//                             <p class="mb-0">
//                               {`Hello ${auth?.token && auth?.user?.name}`}

//                               <h6 className="text-center">
//                                 {cart?.length
//                                   ? `You Have ${
//                                       cart.length
//                                     } items in your cart ${
//                                       auth?.token
//                                         ? ""
//                                         : "please login to checkout !"
//                                     }`
//                                   : " Your Cart Is Empty"}
//                               </h6>
//                             </p>
//                           </div>
//                           <div>
//                             <p class="mb-0">
//                               {" "}
//                               <a href="#!" class="text-body">
//                                 price <i class="fas fa-angle-down mt-1"></i>
//                               </a>
//                             </p>
//                           </div>
//                         </div>

//                         {cart?.map((p) => (
//                           <div class="card mb-3" key={p._id}>
//                             <div class="card-body">
//                               <div class="d-flex justify-content-between">
//                                 <div class="d-flex flex-row align-items-center">
//                                   <div>
//                                     <img
//                                       src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
//                                       class="img-fluid rounded-3"
//                                       alt={p.name}
//                                       style={{ width: " 65px" }}
//                                     />
//                                   </div>
//                                   <div class="ms-3">
//                                     <h5>{p.name}</h5>
//                                     <p class="small mb-0">
//                                       {p.description.substring(0, 30)}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div class="d-flex flex-row align-items-center">
//                                   <div style={{ width: "50px" }}>
//                                     <h5 class="fw-normal mb-0">{p.quantity}</h5>
//                                   </div>
//                                   <div style={{ width: "80px" }}>
//                                     <h5 class="mb-0">${p.price}</h5>
//                                   </div>
//                                   <a
//                                     href="#!"
//                                     type="button"
//                                     onClick={() => removeCartItem(p._id)}
//                                     style={{ color: "#cecece" }}
//                                   >
//                                     <i class="fas fa-trash-alt"></i>
//                                   </a>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                       <div class="col-lg-5">
//                         <div class="card bg-muted text-white rounded-3">
//                           <div class="card-body">
//                             <div class="d-flex justify-content-between align-items-center mb-4">
//                               <h5 class="mb-0 text-center">Cart Summary</h5>
//                               <img
//                                 src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
//                                 class="img-fluid rounded-3"
//                                 style={{ width: "45px" }}
//                                 alt="Avatar"
//                               />
//                             </div>

//                             <h4 class=" mb-2 text-center text-purple-600">
//                               TOTAL || CHECKOUT || PAYMENT
//                             </h4>
//                             <a href="#!" type="submit" class="text-white">
//                               <i class="fab fa-cc-mastercard fa-2x me-2"></i>
//                             </a>
//                             <a href="#!" type="submit" class="text-white">
//                               <i class="fab fa-cc-visa fa-2x me-2"></i>
//                             </a>
//                             <a href="#!" type="submit" class="text-white">
//                               <i class="fab fa-cc-amex fa-2x me-2"></i>
//                             </a>
//                             <a href="#!" type="submit" class="text-white">
//                               <i class="fab fa-cc-paypal fa-2x"></i>
//                             </a>
//                             <div className="d-flex justify-content-center mb-3">
//                   <button
//                     className="btn btn-outline-success"
//                     onClick={() => {
//                       setPaymentMethod("Online Payment");
//                       setShowPaymentGateway(true);
//                     }}
//                     disabled={loading}
//                   >
//                     Online Payment
//                   </button>
//                   <button
//                     className="btn btn-outline-warning mx-3"
//                     onClick={handleCashOnDelivery}
//                     disabled={loading}
//                   >
//                     Cash on Delivery
//                   </button>
//                 </div>

                        

//                             <hr class="my-4" />

//                             <div class="d-flex justify-content-between">
//                               <p class="mb-2">Total</p>
//                               <p class="mb-2">${totalPrice()}</p>
//                             </div>

//                             <div class="d-flex justify-content-between">
//                               {auth?.user?.address ? (
//                                 <div className="mb-3 text-center">
//                                   {/* <div>
//                                   <p>Current Address</p>
//                                   <h6>{auth.user.address}</h6>
//                                 </div> */}
//                                   <div class="d-flex justify-content-center">
//                                     <p class="mb-2">Current Address <span>:</span></p>
//                                     <p class="mb-2 mx-6"><span>{auth.user.address}</span></p>
//                                   </div>

//                                   <button
//                                     onClick={() =>
//                                       navigate(`/dash/user/profile`)
//                                     }
//                                     className="btn btn-outline-warning"
//                                     type="button"
//                                   >
//                                     Update Address
//                                   </button>
//                                 </div>
//                               ) : (
//                                 <div className="mb-3">
//                                   {auth.token ? (
//                                     <button
//                                       type="button"
//                                       onClick={() =>
//                                         navigate(`/dash/user/profile`)
//                                       }
//                                       className="btn btn-outline-warning"
//                                     >
//                                       Update Address
//                                     </button>
//                                   ) : (
//                                     <>
//                                       <button
//                                         className="btn btn-outline-warning"
//                                         onClick={() =>
//                                           navigate("/login", {
//                                             state: "/cart",
//                                           })
//                                         }
//                                         type="button"
//                                       >
//                                         Please Login to Checkout
//                                       </button>
//                                     </>
//                                   )}
//                                 </div>
//                               )}
//                             </div>

       


//                             {showPaymentGateway &&(
//                             <div className="mt-2">
//                               {!clientToken || !cart?.length ? (
//                                 ""
//                               ) : (
//                                 <>
//                                   <DropIn
//                                     options={{
//                                       authorization: clientToken,
//                                       paypal: {
//                                         flow: "vault",
//                                       },
//                                     }}
//                                     onInstance={(instance) =>
//                                       setInstance(instance)
//                                     } // Corrected callback
//                                   />
//                                   <div className="text-center">
//                                     <button
//                                       className="btn btn-primary btn"
//                                       onClick={handlePayment}
//                                       // disabled={!loading || !instance || !auth?.user?.address}
//                                     >
//                                       {loading ? "Processing" : "Make Payment"}
//                                     </button>
//                                   </div>
//                                 </>
//                               )}
//                             </div>)}
//                           </div>
//                         </div>
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
// }
// export default CartPage;





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
import cash from "../pictures/cash.png";
const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Online Payment");
  const [showPaymentGateway, setShowPaymentGateway] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Fedex Delivery");

  useEffect(() => {
    const updatedCart = cart.map((item) => {
      if (!item.quantity) {
        return { ...item, quantity: 1 }; // Default quantity to 1 if not set
      }
      return item;
    });
    setCart(updatedCart);
  }, []);

  // Debugging logs
  useEffect(() => {
    console.log("Cart state on mount:", cart);
  }, [cart]);

  // const totalPrice = () => {
  //   try {
  //     let total = 0;
  //     cart?.map((item) => {
  //       total = total + item.price;
  //     });
  //     return total.toLocaleString("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
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
    console.log("Updated cart:", updatedCart);
  };

  //remove cart itsm
  const removeCartItem = (pid) => {
    console.log("Removing item with ID:", pid);
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage with filtered cart
      console.log("Updated cart:", updatedCart);

      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Error removing item from cart:", err);
      toast.error("Failed to remove item from cart");
    }
  };
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      let response;
      if (paymentMethod === "Online Payment") {
        const { nonce } = await instance.requestPaymentMethod();
        response = await axios.post(
          "http://localhost:3000/api/v1/product/braintree/payment",
          {
            nonce,
            cart,
          }
        );
      } else {
        // For Cash on Delivery, just proceed with no transaction
        response = { data: { ok: true } };
      }
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      if (paymentMethod === "online Payment") {
        navigate("/dash/user/order");
        toast.success("Payment Successfully");
      } else {
        toast.success("Thank you for your order!");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleCashOnDelivery = () => {
    if (!auth.token) {
      navigate("/login", { state: "/cart" });
    } else {
      setPaymentMethod("Cash on Delivery");
      setShowPaymentGateway(false);
    }
   };
  const handlePaymentMethodChange = (method) => {
    setSelectedOption(method);
    if (method === "Online Payment") {
      setShowPaymentGateway(true);
    } else if (method === "Cash on Delivery") {
      handleCashOnDelivery();
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

        <div class="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
          <a href="#" class="text-2xl font-bold text-gray-800">
            <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <div class="flex justify-center mx-auto">
                <img class="w-50 h-50 sm:h-8" src={logo} alt="" />
              </div>
            </div>
          </a>
          <div class="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
            <div class="relative">
              <ul class="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                <li class="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </a>
                  <span class="font-semibold text-gray-900">Shop</span>
                </li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <li class="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                    href="#"
                  >
                    2
                  </a>
                  <span class="font-semibold text-gray-900">Shipping</span>
                </li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <li class="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                    href="#"
                  >
                    3
                  </a>
                  <span class="font-semibold text-gray-500">Payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div class="px-4 pt-8">
            <p class="text-xl font-medium">Order Summary</p>

            <p class="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div>
              <p class="mb-0">
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
            <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {cart?.map((p) => (
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
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
                    <p className="text-gray-400">
                      Total: {p.price * p.quantity}
                     </p>
                    <label htmlFor={`quantity-${p._id}`}>Quantity:</label>
                    <input
                      type="number"
                      id={`quantity-${p._id}`}
                      name="quantity"
                      min="1"
                      Value={p.quantity}
                      required
                      className="w-16"
                    />
                    
                  </div>
                </div>
              ))}
            </div>

            <p class="mt-8 text-lg font-medium">Payment Methods</p>
           
            <div>
    <form className="mt-5 grid gap-6">
      <div className="relative">
        <input
          className="peer hidden"
          id="radio_1"
          type="radio"
          name="payment"
          value="Online Payment"
          checked={selectedOption === "Online Payment"}
          onChange={() => handlePaymentMethodChange("Online Payment")}
        />
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label
          className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
          htmlFor="radio_1"
        >
          <img
            className="w-14 object-contain"
            src={cash}
            alt="Online Payment"
          />
          <div className="ml-5">
            <span className="mt-2 font-semibold">Online Payment</span>
            <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
            <p className="text-slate-500 text-sm leading-6">Payment Method: Online Payment</p>
          </div>
        </label>
      </div>
      <div className="relative">
        <input
          className="peer hidden"
          id="radio_2"
          type="radio"
          name="payment"
          value="Cash on Delivery"
          checked={selectedOption === "Cash on Delivery"}
          onChange={() => handlePaymentMethodChange("Cash on Delivery")}
        />
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label
          className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
          htmlFor="radio_2"
        >
          <img
            className="w-14 object-contain"
            src={COD}
            alt="Cash on Delivery"
          />
          <div className="ml-5">
            <span className="mt-2 font-semibold">Cash on Delivery</span>
            <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
            <p className="text-slate-500 text-sm leading-6">Payment Method: Cash on Delivery</p>
          </div>
        </label>
      </div>
    </form>
   
  </div>
          </div>
          <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p class="text-xl font-medium">User Details</p>
            <p class="text-gray-400">
              Complete your order Details your payment details.
            </p>

            <div class="">
              <label for="email" class="mt-4 mb-2 block text-sm font-medium">
                Email
              </label>
              <div class="relative">
                <input
                  type="text"
                  value={auth.user?.email}
                  id="email"
                  name="email"
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                 
                </div>
              </div>
              <label
                for="card-holder"
                class="mt-4 mb-2 block text-sm font-medium"
              >
                User Name
              </label>
              <div class="relative">
                <input
                  type="text"
                  value={auth.user?.name}
                  id="card-holder"
                  name="card-holder"
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  
                </div>
              </div>
              <label for="card-no" class="mt-4 mb-2 block text-sm font-medium">
                Mobile number
              </label>
              <div class="relative">
                <input
                  type="text"
                  value={auth.user?.phone}
                  id="card-holder"
                  name="card-holder"
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  
                </div>
              </div>
              <label
                for="billing-address"
                class="mt-4 mb-2 block text-sm font-medium"
              >
                Billing Address
              </label>

              {auth?.user?.address ? (
                <div className="flex flex-row sm:flex-row items-center">
                  <div className="flex-shrink-0 w-8/12">
                    <input
                      type="text"
                      id="billing-address"
                      name="billing-address"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
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
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">{totalPrice()}</p>
            </div>
            <div className="d-flex justify-content-center mb-3 mt-5">
      <button
        className={`btn btn-outline-success ${selectedOption === "Online Payment" ? "active" : ""}`}
        onClick={() => handlePaymentMethodChange("Online Payment")}
        disabled={loading}
      >
        Online Payment
      </button>
      <button
        className={`btn btn-outline-warning mx-3 ${selectedOption === "Cash on Delivery" ? "active" : ""}`}
        onClick={() => handlePaymentMethodChange("Cash on Delivery")}
        disabled={loading}
      >
        Cash on Delivery
      </button>
    </div>
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
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
                    onInstance={(instance) => setInstance(instance)} // Corrected callback
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    // disabled={!loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "processing" : "Make Payment"}
                  </button>
                </>
              )}
            </div>
            <button class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;