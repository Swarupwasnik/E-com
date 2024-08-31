// import { useState, useEffect } from "react";
// import { useAuth } from "../context/auth";
// import { Outlet, useNavigate } from "react-router-dom"; // Import useNavigate hook
// import axios from "axios";
// import Spinner from "../components/Spinner";

// export default function AdminRoute() {
//   const [ok, setOk] = useState(false);
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate(); // Use navigate hook

//   useEffect(() => {
//     const authCheck = async () => {
//       try {
//         const res = await axios.get(" http://localhost:8080/api/v1/auth/admin-auth", {
//         });
//         if (res.data.ok) {
//           setOk(true);
//         } else {
//           setOk(false);
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           // Redirect to login page if unauthorized
//           navigate('/login');
//         } else {
//           console.error('Error occurred:', error);
//           // Optionally, you can set a state to indicate error and display an error message
//         }
//       }
//     };
//     if (auth?.token) authCheck();
//   }, [auth?.token, navigate]);

//   return ok ? <Outlet /> : <Spinner path="/" />;
// }


import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet, useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios";
import Spinner from "../components/Spinner";

export default function AdminRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate(); // Use navigate hook

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/auth/admin-auth");
        if (res.data.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Redirect to login page if unauthorized
          navigate('/login');
        } else {
          console.error('Error occurred:', error);
          // Optionally, you can set a state to indicate error and display an error message
        }
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };
    
    if (auth?.token) {
      authCheck();
    } else {
      setLoading(false); // Set loading to false if there's no token
    }
  }, [auth?.token, navigate]);

  if (loading) {
    return <Spinner />;
  }

  return authenticated ? <Outlet /> : null; // Render Outlet only if authenticated
}
