import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
	const navigate = useNavigate();

	const handleRedirect = () => {
		navigate("/planowanie")
	};

	return (
		<div className='login-page'>
			<h1>Logowanie</h1>
			<form onSubmit={handleRedirect}>
				<input type="text" id="login" placeholder="Login" />
				<input type="password" id="password" placeholder="Hasło" />
				<button type="submit">Zaloguj</button>
			</form>
		</div>
	);
}

export default LoginPage;
