import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../store/appContext";

const PrivateRoute = () => {
    const { store } = useContext(Context);
    const [isAuthenticated, setIsAuthenticated] = useState(() => {    const token = localStorage.getItem("authToken");    return !!token});

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        console.log("Verificando autenticación:", token);
        setIsAuthenticated(!!token); 
        console.log("isAuthenticated ?",!!token);
    }, [] ); 
        console.log("isAuthenticated ?", isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;