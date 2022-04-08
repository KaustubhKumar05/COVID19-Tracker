import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Error from "./Error";

const SignUp = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const auth = getAuth();

	const signIn = async () => {
		setLoading(true);
		if (passwordConfirmRef.current.value !== passwordRef.current.value) {
			setLoading(false);
			return setError("The passwords do not match ");
		}
		createUserWithEmailAndPassword(
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
				setError("Password must have at least 6 characters");
				setLoading(false);
			});
	};
	return (
		<div className="sign-up-container">
			<div className="sign-up-module">
				<p>Create an account</p>
				{error && <Error error={error} />}
				<input type="email" placeholder="Email ID" ref={emailRef} required />
				<input
					type="password"
					placeholder="Password"
					ref={passwordRef}
					required
				/>
				<input
					type="password"
					placeholder="Password confirmation"
					ref={passwordConfirmRef}
					required
				/>
				<button disabled={loading} onClick={() => signIn()}>
					Sign up
				</button>
				<div className="register-query">
					<Link to="/login">Already have an account? Log in</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
