import React,{useState,useEffect} from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from 'react-hot-toast'
import axios from 'axios';
const Profile = () => {
  const[auth,setAuth] = useAuth()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
   const [password, setPassword] = useState("");
  // const[answer,setAnswer] = useState("");


  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.put("http://localhost:8080/api/v1/auth/profile",{
        name,
        email,
         password,
        phone,
        address
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data.updatedUser });
        let localStorageData = localStorage.getItem("auth");
        localStorageData = JSON.parse(localStorageData);
        localStorageData.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(localStorageData));
        toast.success("Profile Updated Successfully");
      }
      
    
    }catch(err){
      console.log(err);
      toast.error("something Went Wrong");
    }
  }
  // useEffect(()=>{
  //   const{email,name,phone,address} = auth.user
  //   setName(name)
  //   setPhone(phone)
  //   setEmail(email)
  //   setAddress(address)
  // },[auth.user])

  useEffect(() => {
    if (auth.user) {
      const { email, name, phone, address } = auth.user;
      setName(name);
      setPhone(phone);
      setEmail(email);
      setAddress(address);
    }
  }, [auth.user]);
  
  return (
    <Layout title={"Your Profile"}>

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
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-5 align-center">
        <div className="form-container">

        

          <form onSubmit={handleSubmit}>
                  <div className="row gy-3 gy-md-4 overflow-hidden">
                    <h4 className="title">User Profile</h4>
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
                        disabled
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
                        
                        disabled
                      />
                    </div>
                    {/* <div className="col-12">
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
                        
                      />
                    </div> */}

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
                        
                      />
                    </div>
                    {/* <div className="col-12">
                      <label htmlFor="address" className="form-label">
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
                        
                      />
                    </div> */}
                    <div className="col-12"></div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          className="btn bsb-btn-xl btn-primary"
                          type="submit"
                        >
                          UPDATE
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
          </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Profile;
