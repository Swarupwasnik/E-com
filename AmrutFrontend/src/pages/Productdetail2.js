// import React, { useEffect, useState } from "react";
// import Layout from "../components/layout/Layout";
// import single_2 from "../pictures/single_2.jpg";
// import "../styles/single.css";
// import { useParams, useNavigate } from "react-router-dom";
// import { useCart } from "../context/cart";
// import axios from "axios";
// import "../../src/style.css";
// import toast from "react-hot-toast";
// import StarRating from "../functionality/StarRating";
// const Productdetail2 = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({});
//   const [cart, setCart] = useCart([]);
//   // const [relatedProducts, setRelatedProducts] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState(null);
//   // const[comment,setComment] = useState([]);
//   //commnet section
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     rating: 0,
//     review: "",
    
//   });
//   const [comments, setComments] = useState([]); // State variable to store comments

//   const { productId } = params;
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/v1/comment/product/${productId}/comments`);
//         setComments(response.data); // Update comments state with fetched comments
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     if (productId) {
//       fetchData();
//     }
//   }, [productId]);

  
   


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {

//       const response = await axios.post(
//         `http://localhost:8080/api/v1/comment/create-review`,
//         formData
//       );
//       console.log("Review data successfully submitted:", response.data);
//       toast.success("Form Submit Sucessfully");
//       setFormData({
//         name: "",
//         email: "",
//          rating: 0,
//         review: "",
//         product
//       });
//       // Handle success, reset form, show success message, etc.
//     } catch (error) {
//       console.error("There was an error submitting the review:", error);
//       // Handle error, show error message, etc
//       toast.error("Error in Submitting in error");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const handleRatingChange = (newRating) => {
//     setFormData({
//       ...formData,
//       rating: newRating,
//     });
//   };


//   //Fetch Cooments
//   ; // Ensure to pass an empty dependency array if productId is not changing
  

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/v1/comment/product/${productId}/comments`);
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     if (productId) {
//       fetchData();
//     }
//   }, [productId]);
//   // Include productId in the dependency array
  


//   // State for quantity
//   // State to track active tab

//   useEffect(() => {
//     if (params?.slug) getProduct();
//   }, [params.slug]);

//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:8080/api/v1/product/get-product/${params.slug}`
//       );
//       setProduct(data.product);
//       console.log(data);
//       const categoryId = data.product.category?._id;
//       if (categoryId) {
//         getSimilarProduct(data.product._id, categoryId);
//       } else {
//         console.log("Category ID not found for the product.");
//       }
//     } catch (err) {
//       console.log("Error fetching product:", err);
//     }
//   };
//   //related proudcts
//   const getSimilarProduct = async (productId, categoryId) => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:8080/api/v1/product/related-product/${productId}/${categoryId}`
//       );
//       setRelatedProducts(data.product);
//     } catch (err) {
//       console.log("Error fetching related products:", err);
//     }
//   };

//   //cart
//   const addToCart = () => {
//     // Logic to add product to cart
//     const updatedCart = [...cart, { ...product, quantity }];
//     setCart(updatedCart);
//     toast.success("Product added to cart!");
//   };

//   const handleTabClick = (tabId) => {
//     if (activeTab === tabId) {
//       // If the tab is already active, double-click will close it
//       setActiveTab(null);
//     } else {
//       // Otherwise, single click will open the tab content
//       setActiveTab(tabId);
//     }
//   };

//   return (
//     <div>
//       <Layout>
//         <div className="container single_product_container">
//           <div className="row">
//             <div className="col">
//               {/* <!-- Breadcrumbs --> */}

//               <div className="breadcrumbs d-flex flex-row align-items-center">
//                 <ul>
//                   <li>
//                     <a href="/">Home</a>
//                   </li>
//                   <li>
//                     <a href="/shop">
//                       <i className="fa fa-angle-right" aria-hidden="true"></i>
//                       Shop
//                     </a>
//                   </li>
//                   <li className="active">
//                     <a href="#">
//                       <i className="fa fa-angle-right" aria-hidden="true"></i>
//                       Single Product
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-lg-7">
//               <div className="single_product_pics">
//                 <div className="row">
//                   <div className="col-lg-3 thumbnails_col order-lg-1 order-2">
//                     <div className="single_product_thumbnails"></div>
//                   </div>
//                   <div className="col-lg-9 image_col order-lg-2 order-1">
//                     <div className="single_product_image">
//                       <div
//                         className="single_product_image_background"
//                         alt={product.name}
//                         style={{
//                           backgroundImage: `url(http://localhost:8080/api/v1/product/product-photo/${product._id})`,
//                         }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-5">
//               <div className="product_details">
//                 <div className="product_details_title">
//                   <h2>{product?.name}</h2>
//                   <p>{product.description}</p>
//                 </div>
//                 <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
//                   <span className="ti-truck"></span>
//                   <span>free delivery</span>
//                 </div>
//                 <div className="original_price">{product?.category?.name}</div>
//                 <div className="product_price">${product.price}</div>
//                 <ul className="star_rating">
//                   <li>
//                     <i className="fa fa-star" aria-hidden="true"></i>
//                   </li>
//                   <li>
//                     <i className="fa fa-star" aria-hidden="true"></i>
//                   </li>
//                   <li>
//                     <i className="fa fa-star" aria-hidden="true"></i>
//                   </li>
//                   <li>
//                     <i className="fa fa-star" aria-hidden="true"></i>
//                   </li>
//                   <li>
//                     <i className="fa fa-star-o" aria-hidden="true"></i>
//                   </li>
//                 </ul>

//                 <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
//                   <span>Quantity:</span>
//                   <div className="quantity_selector">
//                     <span
//                       className="minus"
//                       onClick={() =>
//                         setQuantity(quantity > 1 ? quantity - 1 : 1)
//                       }
//                     >
//                       <i className="fa fa-minus" aria-hidden="true"></i>
//                     </span>
//                     <span id="quantity_value">{quantity}</span>
//                     <span
//                       className="plus"
//                       onClick={() => setQuantity(quantity + 1)}
//                     >
//                       <i className="fa fa-plus" aria-hidden="true"></i>
//                     </span>
//                   </div>
//                   {/* Add to Cart button */}
//                   <div
//                     className="btn btn-danger m-3"
//                     type="button"
//                     // className="red_button add_to_cart_button"
//                     onClick={addToCart}
//                   >
//                     Add to Cart
//                   </div>
//                   {/* <div className="product_favorite d-flex flex-column align-items-center justify-content-center"></div> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="tabs_section_container">
//           <div className="tabs_section_container">
//             <div className="container">
//               <div className="row">
//                 <div className="col">
//                   <div className="tabs_container">
//                     <ul className="tabs d-flex flex-sm-row flex-column align-items-left align-items-md-center justify-content-center">
//                       <li className="tab active" data-active-tab="tab_1">
//                         <button
//                           className={activeTab === "tab1" ? "active" : ""}
//                           onClick={() => handleTabClick("tab1")}
//                           onDoubleClick={() => handleTabClick("tab1")}
//                         >
//                           Description
//                         </button>
//                       </li>
//                       <li className="tab" data-active-tab="tab_2">
//                         <button
//                           className={activeTab === "tab2" ? "active" : ""}
//                           onClick={() => handleTabClick("tab2")}
//                           onDoubleClick={() => handleTabClick("tab2")}
//                         >
//                           Additional Information
//                         </button>
//                       </li>
//                       <li className="tab" data-active-tab="tab_3">
//                         <button
//                           className={activeTab === "tab3" ? "active" : ""}
//                           onClick={() => handleTabClick("tab3")}
//                           onDoubleClick={() => handleTabClick("tab3")}
//                         >
//                           Reviews (2)
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               {activeTab === "tab1" && (
//                 <div>
//                   <div class="tab_container active">
//                     <div class="row">
//                       <div class="col-lg-5 desc_col">
//                         <div class="tab_title">
//                           <h4>Description</h4>
//                         </div>
//                         <div class="tab_text_block">
//                           <h2>{product.name}</h2>
//                           <p>
//                             {product.description}
//                             {/* Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis ut... */}
//                           </p>
//                         </div>
//                         <div class="tab_image">
//                           <img src="images/desc_1.jpg" alt="" />
//                         </div>
//                         <div class="tab_text_block">
//                           <h2>{product?.name}</h2>
//                           <p>
//                             {/* Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis ut... */}
//                             {product.description}
//                           </p>
//                         </div>
//                       </div>
//                       <div class="col-lg-5 offset-lg-2 desc_col">
//                         <div class="tab_image">
//                           <img src="images/desc_2.jpg" alt="" />
//                         </div>
//                         <div class="tab_text_block">
//                           <h2>{product?.name}</h2>
//                           <p>
//                             {product?.description}
//                             {/* Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis ut... */}
//                           </p>
//                         </div>
//                         <div class="tab_image desc_last">
//                           <img src="images/desc_3.jpg" alt="" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div>
//               {activeTab === "tab2" && (
//                 <div>
//                   <div class="container d-flex justify-content-center">
//                     <div class="row">
//                       <div class="col">
//                         <div class="container">
//                           <div class="row">
//                             <div class="col additional_info_col">
//                               <div class="tab_title additional_info_title">
//                                 <h4>Additional Information</h4>
//                               </div>
//                               <p>
//                                 COLOR: <span>Gold, Red</span>
//                               </p>
//                               <p>
//                                 SIZE: <span>L, M, XL</span>
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div>
//               {activeTab === "tab3" && (
//                 <div className="mx-auto">
//                   <div className="container">
//                     <div className="row">
//                       <div className="col-lg-6 reviews_col">

//                         {/* <!-- Reviews --> */}
//                         <div className="tab_title reviews_title">
//                           <h4>Reviews (2)</h4>
//                         </div>
//                         {/* <!-- User Reviews --> */}
//                         {comments.map((review) => (
//   <div key={review._id} className="user_review_container d-flex flex-column flex-sm-row">
//     {/* User */}
//     <div className="user">
//       {/* User Picture */}
//       <div className="user_pic"></div>
//       {/* User Rating */}
//       <div className="user_rating">
//         <ul className="star_rating">
//           {/* Rating Stars */}
//           <li>
//             <i className="fa fa-star" aria-hidden="true"></i>
//             {review.rating}
//           </li>
//         </ul>
//       </div>
//     </div>
//     {/* Review Content */}
//     <div className="review">
//       {/* Review Date */}
//       <div className="review_date">{review.createdAt}</div>
//       {/* User Name */}
//       <div className="user_name">{review.name}</div>
//       {/* Review Text */}
//       <p>
//         {review.description}
//       </p>
//     </div>
//   </div>
// ))}

//                       </div>
//                       <div class="col-lg-6 add_review_col">
//                         <div class="add_review">
//                           <form id="review_form" onSubmit={handleSubmit}>
//                             <div>
//                               <h1>Add Review</h1>
//                               <input
//                                 id="review_name"
//                                 className="form_input input_name"
//                                 type="text"
//                                 name="name" // Corrected name attribute
//                                 placeholder="Name*"
//                                 value={formData.name}
//                                 onChange={(e) => handleChange(e)}
//                                 required
//                                 data-error="Name is required."
//                               />
//                                <input
//                                 id="review_name"
//                                 className="form_input input_name"
//                                 type="text"
//                                 name="name" // Corrected name attribute
//                                 placeholder="Name*"
//                                 value={formData.product}
//                                 onChange={(e) => handleChange(e)}
//                                 required
//                                 data-error="Name is required."
//                               />
//                               <input
//                                 id="review_email"
//                                 className="form_input input_email"
//                                 type="email"
//                                 name="email" // Corrected name attribute
//                                 placeholder="Email*"
//                                 required
//                                 value={formData.email} // Corrected value attribute
//                                 onChange={(e) => handleChange(e)} // Corrected onChange handler
//                                 data-error="Valid email is required."
//                               />
//                             </div>
//                             <div>
//                               <h1>Your Rating:</h1>
//                               <ul className="user_star_rating">
//                                 <StarRating
//                                   initialRating={formData.rating}
//                                   onRatingChange={handleRatingChange}
//                                 />
//                               </ul>
//                               <textarea
//                                 id="review_message"
//                                 className="input_review"
//                                 name="review" // Corrected name attribute
//                                 placeholder="Your Review"
//                                 rows="4"
//                                 value={formData.review} // Corrected access to formData.review
//                                 onChange={(e) =>
//                                   setFormData({
//                                     ...formData,
//                                     review: e.target.value,
//                                   })
//                                 } // Corrected onChange handler
//                                 required
//                                 data-error="Please, leave us a review."
//                               ></textarea>
//                             </div>
//                             <div className="text-left text-sm-right">
//                               <button
//                                 id="review_submit"
//                                 type="submit"
//                                 className="red_button review_submit_btn trans_300"
//                               >
//                                 Submit
//                               </button>
//                             </div>
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="benefit">
//           <div className="container">
//             <div className="row benefit_row">
//               <div className="col-lg-3 benefit_col">
//                 <div className="benefit_item d-flex flex-row align-items-center">
//                   <div className="benefit_icon">
//                     <i className="fa fa-truck" aria-hidden="true"></i>
//                   </div>
//                   <div className="benefit_content">
//                     <h6>free shipping</h6>
//                     <p>Suffered Alteration in Some Form</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-3 benefit_col">
//                 <div className="benefit_item d-flex flex-row align-items-center">
//                   <div className="benefit_icon">
//                     <i className="fa fa-money" aria-hidden="true"></i>
//                   </div>
//                   <div className="benefit_content">
//                     <h6>cach on delivery</h6>
//                     <p>The Internet Tend To Repeat</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-3 benefit_col">
//                 <div className="benefit_item d-flex flex-row align-items-center">
//                   <div className="benefit_icon">
//                     <i className="fa fa-undo" aria-hidden="true"></i>
//                   </div>
//                   <div className="benefit_content">
//                     <h6>45 days return</h6>
//                     <p>Making it Look Like Readable</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-3 benefit_col">
//                 <div className="benefit_item d-flex flex-row align-items-center">
//                   <div className="benefit_icon">
//                     <i className="fa fa-clock-o" aria-hidden="true"></i>
//                   </div>
//                   <div className="benefit_content">
//                     <h6>opening all week</h6>
//                     <p>8AM - 09PM</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     </div>
//   );
// };

// export default Productdetail2;
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import single_2 from "../pictures/single_2.jpg";
import "../styles/single.css";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";
import "../../src/style.css";
import toast from "react-hot-toast";
import StarRating from "../functionality/StarRating";

const Productdetail2 = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    review: "",
  });
  const [comments, setComments] = useState([]);

  const { productId } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/comment/product/${productId}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/comment/create-review`,
        formData
      );
      console.log("Review data successfully submitted:", response.data);
      toast.success("Form submitted successfully");
      setFormData({
        name: "",
        email: "",
        rating: 0,
        review: "",
      });
    } catch (error) {
      console.error("There was an error submitting the review:", error);
      toast.error("Error in submitting the review");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (newRating) => {
    setFormData({
      ...formData,
      rating: newRating,
    });
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data.product);
      const categoryId = data.product.category?._id;
      if (categoryId) {
        getSimilarProduct(data.product._id, categoryId);
      } else {
        console.log("Category ID not found for the product.");
      }
    } catch (err) {
      console.log("Error fetching product:", err);
    }
  };

  const getSimilarProduct = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${productId}/${categoryId}`
      );
      setRelatedProducts(data.product);
    } catch (err) {
      console.log("Error fetching related products:", err);
    }
  };

  const addToCart = () => {
    const productInCart = cart.find((item) => item._id === product._id);
    if (productInCart) {
      productInCart.quantity += quantity;
    } else {
      const updatedCart = [...cart, { ...product, quantity }];
      setCart(updatedCart);
    }
    toast.success("Product added to cart!");
  };

  const handleTabClick = (tabId) => {
    setActiveTab((prevActiveTab) => (prevActiveTab === tabId ? null : tabId));
  };

  return (
    <div>
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
                      Single Product
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-7">
              <div className="single_product_pics">
                <div className="row">
                  <div className="col-lg-3 thumbnails_col order-lg-1 order-2">
                    <div className="single_product_thumbnails"></div>
                  </div>
                  <div className="col-lg-9 image_col order-lg-2 order-1">
                    <div className="single_product_image">
                      <div
                        className="single_product_image_background"
                        alt={product.name}
                        style={{
                          backgroundImage: `url(http://localhost:8080/api/v1/product/product-photo/${product._id})`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="product_details">
                <div className="product_details_title">
                  <h2>{product?.name}</h2>
                  <p>{product.description}</p>
                </div>
                <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
                  <span className="ti-truck"></span>
                  <span>Delivery in 2-4 Days</span>
                </div>
                <div className="original_price">{product?.category?.name}</div>
                <div className="product_price">${product.price}</div>
                <ul className="star_rating">
                  <li>
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </li>
                  <li>
                    <i className="fa fa-star-o" aria-hidden="true"></i>
                  </li>
                </ul>

                <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                  {/* <span>Quantity:</span>
                  <div className="quantity_selector">
                    <span
                      className="minus"
                      onClick={() =>
                        setQuantity(quantity > 1 ? quantity - 1 : 1)
                      }
                    >
                      <i className="fa fa-minus" aria-hidden="true"></i>
                    </span>
                    <span id="quantity_value">{quantity}</span>
                    <span
                      className="plus"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </span>
                  </div> */}
                  <div
                    className="btn btn-danger m-3"
                    type="button"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tabs_section_container">
          <div className="tabs_section_container">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="tabs_container">
                    <ul className="tabs d-flex flex-sm-row flex-column align-items-left align-items-md-center justify-content-center">
                      <li className="tab active" data-active-tab="tab_1">
                        <button
                          className={activeTab === "tab1" ? "active" : ""}
                          onClick={() => handleTabClick("tab1")}
                          onDoubleClick={() => handleTabClick("tab1")}
                        >
                          Description
                        </button>
                      </li>
                      <li className="tab" data-active-tab="tab_2">
                        <button
                          className={activeTab === "tab2" ? "active" : ""}
                          onClick={() => handleTabClick("tab2")}
                          onDoubleClick={() => handleTabClick("tab2")}
                        >
                          Additional Information
                        </button>
                      </li>
                      <li className="tab" data-active-tab="tab_3">
                        <button
                          className={activeTab === "tab3" ? "active" : ""}
                          onClick={() => handleTabClick("tab3")}
                          onDoubleClick={() => handleTabClick("tab3")}
                        >
                          Reviews (2)
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div id="tab1" className={`tab_container ${activeTab === "tab1" ? "active" : ""}`}>
                    <div className="row">
                      <div className="col-lg-5 desc_col">
                        <div className="tab_title">
                          <h4>Description</h4>
                        </div>
                        <div className="tab_text_block">
                          <h2>{product.name}</h2>
                          <p>{product.description}</p>
                        </div>
                      </div>
                      <div className="col-lg-5 offset-lg-2 desc_col">
                        <div className="tab_image">
                          <img
                            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                            alt="product_image"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="tab2" className={`tab_container ${activeTab === "tab2" ? "active" : ""}`}>
                    <div className="row">
                      <div className="col additional_info_col">
                        <div className="tab_title additional_info_title">
                          <h4>Additional Information</h4>
                        </div>
                        <p>Here is the additional information about the product...</p>
                      </div>
                    </div>
                  </div>
                  <div id="tab3" className={`tab_container ${activeTab === "tab3" ? "active" : ""}`}>
                    <div className="row">
                      <div className="col-lg-6 reviews_col">
                        <div className="tab_title reviews_title">
                          <h4>Reviews ({comments.length})</h4>
                        </div>
                        {comments.map((comment, index) => (
                          <div key={index} className="review">
                            <div className="review_user">
                              <div className="review_name">{comment.name}</div>
                              <div className="review_date">{new Date(comment.createdAt).toLocaleDateString()}</div>
                              <div className="rating_r rating_r_4">
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                              </div>
                            </div>
                            <div className="review_text">
                              <p>{comment.review}</p>
                            </div>
                          </div>
                        ))}
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Rating</label>
                            <StarRating
                              rating={formData.rating}
                              onRatingChange={handleRatingChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Review</label>
                            <textarea
                              className="form-control"
                              name="review"
                              rows="5"
                              value={formData.review}
                              onChange={handleChange}
                              required
                            ></textarea>
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Submit Review
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Productdetail2;

