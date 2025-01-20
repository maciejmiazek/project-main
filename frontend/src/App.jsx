import React from "react";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import Planning from "./components/Planning";
import Workers from "./components/Workers";
import NoPage from "./components/NoPage";

const Maszyny = () => <h2>Maszyny</h2>;
const Magazyn = () => <h2>Magazyn</h2>;
const Finanse = () => <h2>Finanse</h2>;

function App() {
	return (
		<>
			<Sidebar />
			<main style={{ flex: 1}}>
				<Routes>
					<Route
						path='/'
						element={<Planning />}
					/>
					<Route
						path='/planowanie'
						element={<Planning />}
					/>
					<Route
						path='/pracownicy'
						element={<Workers />}
					/>
					<Route
						path='/maszyny'
						element={<Maszyny />}
					/>
					<Route
						path='/magazyn'
						element={<Magazyn />}
					/>
					<Route
						path='/finanse'
						element={<Finanse />}
					/>
					<Route
						path='/wyloguj'
						element={<NoPage />}
					/>
					<Route
						path='*'
						element={<NoPage />}
					/>
				</Routes>
			</main>
		</>
	);
}

export default App;
