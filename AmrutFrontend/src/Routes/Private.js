import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import axios from 'axios';
import Spinner from '../components/Spinner';

// Renamed function to start with uppercase letter and added `props` parameter
function PrivateRoute(props) {
    const [ok, setOk] = useState();
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('http://localhost:3000/api/v1/auth/user-auth');
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }
        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner />;
}

export default PrivateRoute;

