import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate()

	const handleLogin = async () => {
		const success = await actions.loginUser(email, password);
		if (success) {
            alert("Usuario logado com sucesso!");
			navigate("/prepriv");
		} else {
			alert("Login failed. Please check your credentials and try again.");
		}
	};

    return (
       <>
       <h1 className="text-center"> Log in </h1>
     <div className="container card" style={{ width: '30rem' }}>
          <div className="mb-3 mt-3 row">
          <label className="col-sm-3 col-form-label">Email</label>
            <div className="col-sm-9">
            <input 
            type="text" 
            className="form-control mt-3" 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="email" 
            />
            </div>
        </div>
        <div className="mb-3 row">
            <label for="inputPassword" className="col-sm-3 col-form-label">Password</label>
            <div className="col-sm-9">
            <input 
            type="password" 
            className="form-control mt-3" 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Contraseña" 
            />
            </div>
            
        </div>
        <button type="button" className="btn btn-outline-primary mb-3" onClick={handleLogin}>LOG IN</button>
         <Link to="/register">
         <a  className="d-flex justify-content-center">If you are not registered, click here</a>
         </Link>
         </div>
        </>
    );
};