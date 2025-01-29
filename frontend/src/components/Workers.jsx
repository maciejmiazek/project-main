import { React, useState } from "react";
import useCrud from "./hooks/UseCrud";
import EditPanel from "./EditPanel/EditPanel";
import { IconUser } from "@tabler/icons-react";
import "./Workers.css";

function Workers() {
	const [buttonText, setButtonText] = useState('Dodaj');

	const { data: itemData, createHandle, deleteData, activeButton, setActiveButton, alertText, alertIsVisible, formData, setFormData, cardId, setCardId, endpoint} = useCrud('/api/pracownicy');

	const buttonChangeClick = (index) => {
		setButtonText(index === 0 ? 'Dodaj' : 'Edytuj');
		if (activeButton === null || activeButton !== index) {
			setActiveButton(index);
			
			setFormData((prev) => ({
				...prev,
				pracownicy: {
				  ...prev.pracownicy,
				},
			}));
			console.log(formData);
			setCardId(null)
		}
	};

	const editInsert = (i) => {
		if (activeButton !== 1) {
			return
		}

		setFormData((prev) => ({
			...prev,
			pracownicy: {
			  	...prev.pracownicy,
			  	name: itemData[i].name,
				phone: itemData[i].phone,
				machine: itemData[i].machine,
				salary: itemData[i].salary,
				startWorkTime: itemData[i].startWorkTime,
				endWorkTime: itemData[i].endWorkTime,
			},
		}));

		setCardId(i)
	};

	return (
		<>
			<div className='data'>
				{typeof(itemData) === 'object' ? itemData.map((item, i) => {
					return (
					<div key={i} className={`card-board ${activeButton === 1 ? 'edit' : ''}`} style={{border: cardId === i && activeButton === 1 ? '3px solid whitesmoke' : ''}} onClick={() => {editInsert(i)}}>
						<div className="worker-avatar">
							<div className="status-box">Aktywny</div>
							<div className="circle">
								<IconUser stroke={2} />
							</div>
							<p>{item.name}</p>
						</div>
						<div className="worker-items">
							<div className="item-option">
								<div className="item-option-name">
									<p>Czas Pracy</p>
								</div>
								<div className="item-option-value">
									<p>{`${item.startWorkTime} - ${item.endWorkTime}`}</p>
								</div>
							</div>
							<div className="item-option">
								<div className="item-option-name">
									<p>Pensja</p>
								</div>
								<div className="item-option-value">
									<p>{`${item.salary} PLN`}</p>
								</div>
							</div>
							<div className="item-option">
								<div className="item-option-name">
									<p>Telefon</p>
								</div>
								<div className="item-option-value">
									<p>{item.phone != '' ? item.phone : '-'}</p>
								</div>
							</div>
							<div className="item-option">
								<div className="item-option-name">
									<p>Maszyna</p>
								</div>
								<div className="item-option-value">
									<p>{item.machine != '' ? item.machine : 'brak'}</p>
								</div>
							</div>
							<button className="delete-option" onClick={() => {deleteData(i)} } style={{display: activeButton === 1 ? 'block' : 'none'}}>Delete</button>
						</div>
					</div>)
				}): console.log('server error')}
			</div>
			<EditPanel activeButton={activeButton} buttonChangeClick={buttonChangeClick} buttonText={buttonText} formData={formData} setFormData={setFormData} createHandle={createHandle} endpoint={endpoint}/>
			<div className={`alert ${alertIsVisible ? 'show' : ''}`}><p>{alertText}</p></div>
		</>
	);
}

export default Workers;
