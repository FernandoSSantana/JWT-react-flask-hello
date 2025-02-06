import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom";
import { TermsAndCondition } from "../component/termsAndCondition";
import { Context } from "../store/appContext";



export const Register = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()
  console.log(actions);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await actions.registerUser(formData); // Asume que devuelve `true` o lanza error
      if (success) {
        alert("Usuario creado con éxito, inicia sesion");
        navigate("/");
      }
    } catch (error) {
      // Mostrar el mensaje de error del servidor
      alert(error.message || "Error al registrar el usuario");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateEmptyInput = (inputElement) => {
    const value = inputElement.value.trim();
    if (value === "") {
      return "El campo no puede estar vacío.";
    }

    return null
  };

  

  return (
    <>
      <form className="row g-2 justify-content-center" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label for="validationServerEmail" className="form-label">email</label>
          <div className="input-group has-validation">
            <input type="text" className="form-control"
              id="email"
              aria-describedby="inputGroupPrepend3 validationServerEmailFeedback"
              placeholder="email@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required />
          </div>
        </div>
        <p> </p>
        <div className="col-md-6">
          <label for="inputPassword5" className="form-label">Password</label>
          <input type="password"
            id="password"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            value={formData.password}
            onChange={handleChange}
            required />
          <div id="passwordHelpBlock" className="form-text">
          </div>
        </div>
        <p> </p>
        <div className="col-6">
          <div className="form-check">
            <input className="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" aria-describedby="invalidCheck3Feedback" required />
            <label className="form-check-label" for="invalidCheck3">
              Agree to terms and conditions
            </label>
            <div id="invalidCheck3Feedback" className="invalid-feedback">

              <p><a className="link-opacity-50-hover" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">Read terms and conditions</a></p>


              <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">terms and conditions</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body"> {TermsAndCondition} </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p> </p>
        <div className="col-6 d-flex justify-content-center">
          <button className="btn btn-secondary me-5" type="submit">Back to Home</button>
          <button className="btn btn-primary" type="submit">Confirmar registro</button>
        </div>
      </form>

    </>
  );
};

