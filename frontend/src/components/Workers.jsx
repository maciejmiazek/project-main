import { React, useState, useEffect } from "react";
import WorkersPanel from "./WorkersPanel";
import "./Workers.css";
import axios from "axios";
import {
	IconUser,
} from "@tabler/icons-react";

function Workers() {
	const [users, setUsers] = useState([]);
	const [activeButton, setActiveButton] = useState(0);
	const [buttonText, setButtonText] = useState('Dodaj');
	const [message, setMessage] = useState('');
	const [alertText, setAlertText] = useState('');
	const [alertIsVisible, setAlertIsVisible] = useState(false);

	const buttonChangeClick = (index) => {
		setButtonText(index === 0 ? 'Dodaj' : 'Edytuj');
		if (activeButton === null || activeButton !== index) {
			setActiveButton(index);
		}
	};

	const fetchAPI = async () => {
		axios
		.get("/api/pracownicy")
		.then((users) => {
			setUsers(users.data)
		})
		.catch((err) => console.log(err));
	};

	const deleteWorker = async (i) => {
		if (activeButton !== 1) {
			return
		}

		const objectId = users[i]._id

		try {
			// Wysyłanie danych do serwera za pomocą axios
			const response = await axios.post('/api/pracownicy', {objectId: objectId});
	  
			// Obsługa odpowiedzi z serwera
			if (response.status === 200) {
			  console.log(response.data);
			  setAlertText(response.data.message);
			  setAlertIsVisible(true);
			  fetchAPI();
			  setTimeout(() => {
				setAlertIsVisible(false);
			  }, 3000);
			}

		  } catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAPI();
	}, []);

	const buttonStyle = {
		display: activeButton === 1 ? 'block' : 'none'
	};

	return (
		<div className='workers'>
			<div className='workers-main'>
				{users.map((item, i) => {
					return (
					<div key={i} className='card-board'>
						<div className="worker-avatar">
							<div className="status-box">Aktywny</div>
							<div className="circle">
								<IconUser stroke={2} />
							</div>
							<p>{item.name}</p>
						</div>
						<div className="worker-items">
							<div className="item-option"><p>Czas Pracy</p><p>{`${item.startWorkTime} - ${item.endWorkTime}`}</p></div>
							<div className="item-option"><p>Pensja</p><p>{`${item.salary} PLN`}</p></div>
							<div className="item-option"><p>Telefon</p><p>{item.phone}</p></div>
							<div className="item-option"><p>Przydzielona Maszyna</p><p>{item.machine}</p></div>
							<button className="delete-option" onClick={() => {deleteWorker(i)} } style={buttonStyle}>Delete</button>
						</div>
					</div>)
				})}
			</div>
			<WorkersPanel activeButton={activeButton} buttonChangeClick={buttonChangeClick} buttonText={buttonText} fetchAPI={fetchAPI} setAlertText={setAlertText} setAlertIsVisible={setAlertIsVisible}/>
			<div className={`workers-alert ${alertIsVisible ? 'show' : ''}`}><p>{alertText}</p></div>
		</div>
	);
}

export default Workers;
