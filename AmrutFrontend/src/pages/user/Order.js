// import React, { useState, useEffect } from "react";
// import Layout from "../../components/layout/Layout";
// import UserMenu from "../../components/layout/UserMenu";
// import axios from "axios";
// import { useAuth } from "../../context/auth";
// // import { stringify } from "querystring";
// const Order = () => {
//   const [orders, setOrders] = useState([]);
//   const [auth, setAuth] = useAuth();
//   const getOrders = async (req,res) => {
//     try {
//       const { data } = await axios.get("http://localhost:8080/api/v1/auth/orders");
//       setOrders(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     if (auth?.token) getOrders();
//   }, [auth?.token]);
//   return (
//     <Layout title={"Your Orders"}>
//       <div className="container-fluic p-3 m-3">
//         <div className="row">
//           <div className="col-md-3">
//             <UserMenu />
//           </div>
//           <div className="col-md-9">
//             <h1 className="text-center">All Orders</h1>
//             {
//               orders?.map((item)=>{
//                 return(
//                 <div className="border-shadow">
// <table className="table">
// <thead>
//   <tr>
//     <td scope="col">#</td>
//     <td scope="col">Status</td> 
//     <td scope="col">Buyer</td>
//     <td scope="col">Order</td>
//     <td scope="col">Payment</td>
//     <td scope="col">Quantity</td>
//   </tr>
// </thead>
// <tbody>
//   <tr>
//     <th>{i+1}</th>
//   </tr>
// </tbody>
// </table>
//                 </div>
//                 )
            
//               })
//             }
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Order;

import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from 'moment';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/orders");
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    if (auth?.token) 
      getOrders();
    
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
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


      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            <div className="border-shadow">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Order Details</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.map((order, index) => (
                    <tr key={order.id}>
                      <td>{index + 1}</td>
                      <td>{order.status}</td>
                      <td>{order.buyer && order.buyer.name}</td>
                      <td>{moment(order.createdAt).fromNow()}</td>
                      <td>{order.orderDetails}</td>
                      <td>{order.payment && order.payment.success ? "Success" : "Failed"}</td>
                      <td>{order.products.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Order;
