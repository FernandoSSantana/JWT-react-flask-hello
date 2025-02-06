import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


export const PrePriv = () => {

return(
    <div className="container">
        <Link to="/private">
    <button > Acceder a la pagina privada</button>
    </Link>
    </div>
)
}