import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		<h1 className="text-center">Wellcome</h1>
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-sm-4 mb-3 mb-sm-0">
					<div className="card">
						<div className="card-body justify-content-center">
							<h5 className="card-title">ARE YOU ALREADY REGISTERED?</h5>
							<p className="card-text">It's a pleasure to have you back</p>
							<Link to="/login">
							<a className="btn btn-primary justify-content-center">Log in</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="col-sm-4">
					<div className="card">
						<div className="card-body justify-content-center">
							<h5 className="card-title">NOT REGISTERED?</h5>
							<p className="card-text">We look forward to having you with us!</p>
							<Link to="/register">
							<a href="#" className="btn btn-primary justify-content-center">Register now</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
			</div>
			{/* <p>
				<img src={rigoImageUrl} />
			</p> */}
			{/* <div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div> */}
			{/* <p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p> */}
		
		</>
	);
};
