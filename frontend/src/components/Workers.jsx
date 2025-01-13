import { React, useState, useEffect } from "react";
import "./Workers.css";
import axios from "axios";

function Workers() {
	const [users, setUsers] = useState([]);

	const fetchAPI = async () => {
		axios
			.get("/api")
			.then((users) => setUsers(users.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchAPI();
	}, []);

	function minutesToTime(minutes) {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
	}

	return (
		<div className='workers'>
			
			{users.map((item, i) => {
				return (
				<div key={i} className='card-board'>
					<p>{item.name}</p>
					<p>{`${minutesToTime(item.startWorkTime)} - ${minutesToTime(item.endWorkTime)}`}</p>
					<p>{item.phone}</p>
					<p>{`${item.salary} PLN`}</p>
					<p>{item.machine}</p>
				</div>)
			})}
			
		</div>
	);
}

export default Workers;
