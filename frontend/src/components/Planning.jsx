import React, { useState } from "react";
import useCrud from "./hooks/UseCrud";
import {
	IconArrowBigLeftFilled,
	IconArrowBigRightFilled,
} from "@tabler/icons-react";
import "./Planning.css";

function Planning() {
	const { data: itemData } = useCrud("/api/pracownicy");
	const { data: machineData } = useCrud("/api/maszyny");
	const { data: planningData, createHandle, deleteData, activeButton, setActiveButton, alertText, alertIsVisible, formData, setFormData, cardId, setCardId, endpoint } = useCrud("/api/planowanie");

	const [buttonText, setButtonText] = useState('Dodaj');
	const [currentDate, setCurrentDate] = useState(new Date());
	
	const colorPalette = ["#2EA6FC", "#23CE65", "#FCDA51"];

	// Funkcja do generowania 7 kolejnych dni
	const getDaysInRange = (startDate, daysToShow = 7) => {
		const days = [];
		const start = new Date(startDate);

		for (let i = 0; i < daysToShow; i++) {
			const current = new Date(start);
			current.setDate(start.getDate() + i);
			days.push(current);
		}

		return days;
	};

	// Przesuwanie o tydzień (poprzedni lub następny)
	const shiftDays = (direction) => {
		const newDate = new Date(currentDate);
		newDate.setDate(currentDate.getDate() + direction * 7);
		setCurrentDate(newDate);
	};

	// Przygotowanie tablicy 7 dni od aktualnej daty
	const daysToDisplay = getDaysInRange(currentDate);

	// Jeżeli dane jeszcze się ładują, unikamy błędów w .map()
	if (!itemData || !machineData || !planningData) {
		return <div>Ładowanie danych...</div>;
	}

	const handleChange = (e) => {
		const clearEndpoint = endpoint.split('/')[2]
		
		if (clearEndpoint === 'planowanie') {
			setFormData((prev) => ({
				...prev,
				'planowanie': {
					  ...prev.planowanie,
					  [e.target.name]: e.target.value
				},
			}));
		}
	};

	const buttonChangeClick = (index) => {
		setButtonText(index === 0 ? 'Dodaj' : 'Edytuj');
		if (activeButton === null || activeButton !== index) {
			setActiveButton(index);
			
			setFormData((prev) => ({
				...prev,
				planowanie: {
				  ...prev.planowanie,
				},
			}));
			console.log(formData);
			setCardId(null)
		}
	};

	return (
		<>
			{/* Kalendarz */}
			<div className='calendar'>
				<div className='button-bar'>
					<button onClick={() => shiftDays(-1)}>
						<IconArrowBigLeftFilled />
					</button>
					<p>
						{currentDate.toLocaleString("pl-PL", {
							month: "long",
							year: "numeric",
						})}
					</p>
					<button onClick={() => shiftDays(1)}>
						<IconArrowBigRightFilled />
					</button>
				</div>
				<div className='calendar-body'>
					<div className='calendar-table'>
						{/* Wiersz z datami (nagłówek) */}
						<div className='day-row'>
							<div className='grid-box'>Dzień</div>
							{daysToDisplay.map((day, index) => (
								<div
									className='grid-box'
									key={index}
								>
									<p>
										{day?.toLocaleDateString("pl-PL", {
											day: "2-digit",
											month: "2-digit",
										})}
									</p>
								</div>
							))}
						</div>

						{/* Wiersze dla pracowników (itemData) */}
						{itemData.map((item, i) => {
							// 1. Filtrujemy w planningData wszystkie rekordy, które mają workerId == item._id
							const userPlans = planningData.filter(
								(pd) => pd.workerId === item._id
							);
							const userColor = colorPalette[i % colorPalette.length];

							return (
								<div
									className='user-row'
									key={item._id}
								>
									{/* Nazwa pracownika w pierwszej kolumnie */}
									<div className='grid-box'>
										<p>{item.name}</p>
									</div>

									{/* Kolejne kolumny to dni z daysToDisplay */}
									{daysToDisplay.map((day, index) => {
										// Konwertujemy obiekt day na format YYYY-MM-DD (lub Date, zależnie od Twoich potrzeb)
										const dayString = day.toISOString().split("T")[0];

										// 2. Sprawdzamy, czy w userPlans jest JAKIKOLWIEK wpis, w którym day mieści się
										//    pomiędzy startDate i endDate
										const isPlanned = userPlans.some((plan) => {
											// Tu można też użyć dayjs / date-fns / luxon, ale z czystym JS będzie tak:
											const startString = new Date(plan.startDate)
												.toISOString()
												.split("T")[0];
											const endString = new Date(plan.endDate)
												.toISOString()
												.split("T")[0];

											// Porównanie "YYYY-MM-DD" jako stringów działa poprawnie TYLKO gdy to jest ten sam format,
											// i jeśli nie uwzględniasz stref czasowych.
											// Dla prostej aplikacji to często wystarcza.
											return dayString >= startString && dayString <= endString;
										});

										// 3. Jeśli `isPlanned` jest true, renderujemy pasek.
										return (
											<div
												className='grid-box'
												key={index}
												data={userPlans._id}
											>
												{isPlanned && (
													<div
														className='bar'
														style={{ backgroundColor: userColor }}
													></div>
												)}
											</div>
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Panel dodawania/edycji zadań */}
			<div className='planning-panel'>
				<button className='panel-task'>Zadanie</button>
				<button className='new-task' onClick={() => buttonChangeClick(0)}>Dodaj</button>
				<button className='edit-task'onClick={() => buttonChangeClick(1)}>Edytuj</button>

				<form onSubmit={createHandle}>
					<div className='worker-col'>
						<p>Pracownik</p>
						<select
							name='workerId'
							value={formData.workerId}
							onChange={handleChange}
						>
							<option>Wybierz</option>
							{itemData.map((item, index) => (
								<option
									key={index}
									value={item._id}
								>
									{item.name}
								</option>
							))}
						</select>
					</div>

					<div className='start-date-col'>
						<p>Rozpoczęcie</p>
						<input
							type='date'
							value={formData.startDate}
							onChange={handleChange}
							name='startDate'
						/>
					</div>

					<div className='end-date-col'>
						<p>Koniec</p>
						<input
							type='date'
							value={formData.endDate}
							onChange={handleChange}
							name='endDate'
						/>
					</div>

					<div className='machine-col'>
						<p>Maszyna</p>
						<select name='machineId' value={formData.machineId} onChange={handleChange}>
							<option>
								Wybierz
							</option>
							{machineData.map((item, index) => (
								<option
									key={index}
									value={item._id}
								>
									{item.name}
								</option>
							))}
						</select>
					</div>

					<div className='description-col'>
						<p>Opis</p>
						<textarea
							name='description'
							value={formData.description}
							onChange={handleChange}
						></textarea>
					</div>

					<div className='submit-col'>
						<button type='submit'>{buttonText}</button>
					</div>

				</form>
			</div>
		</>
	);
}

export default Planning;
