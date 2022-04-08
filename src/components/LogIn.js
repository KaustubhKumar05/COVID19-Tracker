import React, { useState, useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Error from "./Error";

const LogIn = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const auth = getAuth();

	const signIn = async () => {
		setLoading(true);
		signInWithEmailAndPassword(
			auth,
			emailRef.current.value,
			passwordRef.current.value
		)
			.then((response) => {
				console.log(response);
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
				setError("Please enter correct credentials");
				setLoading(false);
			});
	};
	return (
		<div className="sign-up-container">
			<div className="sign-up-module">
				<p>Log in to gain access </p>
				{error ? <Error error={error} /> : ""}
				<input type="email" placeholder="Email ID" ref={emailRef} required />
				<input
					type="password"
					placeholder="Password"
					ref={passwordRef}
					required
				/>
				<button disabled={loading} onClick={signIn}>
					Log in
				</button>
				<div className="register-query">
					<Link to="/signup">Create an account</Link>
				</div>
			</div>
		</div>
	);
};

export default LogIn;
