import { React, useState, useEffect } from "react";
import "./WorkersPanel.css";
import axios from "axios";

function WorkersPanel({activeButton, buttonChangeClick, buttonText, fetchAPI, setAlertText, setAlertIsVisible}) {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		machine: [],
		salary: 0,
		startWorkTime: '6:00',
		endWorkTime: '16:00',
	});
	const [message, setMessage] = useState('');
	
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (activeButton !== 0) {
			return;
		}
	
		try {
		  // Wysyłanie danych do serwera za pomocą axios
		  const response = await axios.post('/api/pracownicy', formData);
	
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
		  // Obsługa błędów
		  if (error.response) {
			setMessage(`Błąd: ${error.response.data.message}`);
		  } else {
			setMessage('Błąd podczas łączenia z serwerem.');
		  }
		}
	};

	return (
		<div className="workers-panel-box">
			<div className="workers-panel-action-buttons">
				<button onClick={() => {buttonChangeClick(0)}} className={activeButton === 0 ? 'active' : ''}>Dodaj</button>
				<button onClick={() => {buttonChangeClick(1)}} className={activeButton === 1 ? 'active' : ''}>Edytuj</button>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="form-bulk">
					<div className="input-name"><p>Imię i Nazwisko</p></div>
					<div className="input-choose">
						<input type="text" name="name" value={formData.name} onChange={handleChange} required/>
					</div>
				</div>
				<div className="form-bulk">
					<div className="input-name"><p>Czas Pracy</p></div>
					<div className="input-choose">
						OD
						<select name="startWorkTime" value={formData.startWorkTime} onChange={handleChange} required>
							<option value="6:00">6:00</option>
							<option value="7:00">7:00</option>
							<option value="8:00">8:00</option>
						</select>
						DO
						<select name="endWorkTime" value={formData.endWorkTime} onChange={handleChange} required>
							<option value="16:00">16:00</option>
							<option value="17:00">17:00</option>
							<option value="18:00">18:00</option>
						</select>
					</div>
				</div>	
				<div className="form-bulk">
					<div className="input-name"><p>Pensja</p></div>
					<div className="input-choose">
						<input type="number" name="salary" value={formData.salary} onChange={handleChange} required/>PLN
					</div>
				</div>
				<div className="form-bulk">
					<div className="input-name"><p>Telefon</p></div>
					<div className="input-choose">
						<input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" value={formData.phone} onChange={handleChange}/>
					</div>
					{/* <small>np. 666-666-666</small> */}
				</div>
				<div className="form-bulk">
					<div className="input-name"><p>Maszyna</p></div>
					<div className="input-choose">
						<select name="machine" value={formData.machine} onChange={handleChange}>
							<option value="">Wybierz maszynę</option>
							<option value="machine1">Maszyna 1</option>
							<option value="machine2">Maszyna 2</option>
							<option value="machine3">Maszyna 3</option>
						</select>
					</div>
				</div>	
				<button type="submit">{buttonText}</button>
			</form>
		</div>
	)
}

export default WorkersPanel;