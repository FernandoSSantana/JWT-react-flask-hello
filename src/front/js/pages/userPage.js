import React, { useContext } from "react";
// import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const UserPage = () => {
    // const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        // limpiar user data del localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        // success message
        alert("You have successfully logged out.");
        navigate("/");
    };

    return (
        <div className="container bodyUserPage">
    
        <h1 className="d-flex justify-content-center"> Pagina privada</h1>
        <h3 className="d-flex justify-content-center text-align-center"> El front es lo que mas me gusta de todo esto, pero actualmente no tengo tiempo para dejar esta pagina bonita. </h3>
        <div className=" d-flex justify-content-center">
        <button className="d-flex justify-content-center" onClick={handleLogout}> Cerrar sesion </button>
        </div>
        </div>
    )
}

