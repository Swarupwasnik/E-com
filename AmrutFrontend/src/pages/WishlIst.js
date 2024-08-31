import Layout from "../components/layout/Layout";
import React, { useEffect, useState } from "react";
import { useWishlist } from "../context/wish";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from 'axios';
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
export default function Wishlist() {
    const navigate = useNavigate();

    const[wish,setWish] =useWishlist();
    const [auth, setAuth] = useAuth();
    const[cart,setCart] = useCart()
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [product, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `http://localhost:8080/api/v1/product/product-list/${page}`
          );
          setLoading(false);
          setProducts(data.products);
        } catch (error) {
          console.log("Error fetching products", error);
          setLoading(false);
        }
      };

      const removeWishItem = (pid) => {
        console.log("Removing item with ID:", pid);
        try {
          const updatedWish = wish.filter((item) => item._id !== pid);
          setWish(updatedWish);
          localStorage.setItem("Wish", JSON.stringify(updatedWish)); // Update localStorage with filtered cart
          console.log("Updated Wish:", updatedWish);
    
          toast.success("Item removed from Wishlist");
        } catch (err) {
          console.error("Error removing item from WishList:", err);
          toast.error("Failed to remove item from Wishlist");
        }
      };
      useEffect(()=>{
        getAllProducts();
      },[])

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
                    Wishlist
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
  <div className="flex flex-col justify-start items-start">
    <div>
      <p className="text-sm leading-4 text-gray-600">Wishlist</p>
    </div>
    <div className="mt-3">
      <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 text-center">
        Wishlist
      </h1>
    </div>
    <div className="mt-4">
      <p className="text-2xl tracking-tight leading-6 text-gray-600 ">
        Hello {auth?.token && auth?.user?.name}
        <h5 className="text-start">
          {wish?.length
            ? `You Have ${wish.length} items in your Wishlist ${
                auth?.token ? "" : "please login to checkout !"
              }`
            : "Your Wishlist is Empty"}
        </h5>
      </p>
    </div>
    <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
      {wish.map((item) => (
        <div className="flex flex-col" key={item._id}>
          <div className="wrapper">
            <div className="container">
              <div
                className="top"
                style={{
                  backgroundImage: `url(http://localhost:8080/api/v1/product/product-photo/${item._id})`,
                }}
              >
                <div className="icon">
                  <a type="button"
                    onClick={() => {
                      removeWishItem(item._id)
                      
                    }}
                    style={{ color: "red" }}

                  >
               <i class="fa fa-trash-alt positon-absolute top-5 left-5"></i>

                    {/* <i
                      className="fa-solid fa-heart fs-3 mt-3"
                      style={{ color: "red" }}
                    ></i> */}
                  </a>
                </div>
              </div>
              <div className="bottom">
                <div className="d-flex justify-content-center align-items-center"></div>
                <div className="left">
                  <div className="details">
                    <h5>{item.name}</h5>
                    <p>${item.price}</p>
                  </div>
                  <div className="buy">
                    <a
                      onClick={() => {
                        setCart([...cart, item]);
                        toast.success("Item Added to Cart");
                      }}
                    >
                      <i
                        style={{ fontSize: "30px" }}
                        className="fa-solid fa-cart-plus"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="inside">
              <div className="icon">
                <a
                  className=""
                  onClick={() => navigate(`/productdetail/${item.slug}`)}
                >
                  <i
                    className="fa-solid fa-circle-info fs-3"
                    style={{ color: "skyblue" }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
</div>
        </Layout>
    );
}
 