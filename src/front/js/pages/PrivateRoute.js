import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../store/appContext";

const PrivateRoute = () => {
    const { store } = useContext(Context);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token); // Actualiza el estado cuando el token cambia
        console.log("Verificando autenticación:", token);
    }, [store.token]); // Se ejecuta cada vez que cambia el token en el store

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;