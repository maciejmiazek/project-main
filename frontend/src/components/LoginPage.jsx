import React from "react";
import "./LoginPage.css";

function LoginPage() {

	return (
		<div className='login-page'>
			<h1>Logowanie</h1>
			<form action="/" method="post">
				<input type="text" name="login" id="login" placeholder="Login" />
				<input type="password" name="password" id="password" placeholder="Hasło" />
				<button type="submit">Zaloguj</button>
			</form>
		</div>
	);
}

export default LoginPage;
