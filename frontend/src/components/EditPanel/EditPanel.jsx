import { React, useState, useEffect } from "react";
import EditPanelWorkers from "./EditPanelWorkers";
import EditPanelMachines from "./EditPanelMachines";
import "./EditPanel.css";

function EditPanel({activeButton, buttonChangeClick, buttonText, formData, setFormData, createHandle, endpoint}) {

	const handleChange = (e) => {
		const clearEndpoint = endpoint.split('/')[2]
		
		if (clearEndpoint === 'pracownicy') {
			setFormData((prev) => ({
				...prev,
				'pracownicy': {
					  ...prev.pracownicy,
					  [e.target.name]: e.target.value
				},
			}));
		}else if(clearEndpoint === 'maszyny'){
			setFormData((prev) => ({
				...prev,
				'maszyny': {
					  ...prev.maszyny,
					  [e.target.name]: e.target.value
				},
			}));
		}
	};

	return (
		<div className='panel-box'>
			<div className='panel-action-buttons'>
				<button
					onClick={() => {
						buttonChangeClick(0);
					}}
					className={activeButton === 0 ? "active" : ""}
				>
					Dodaj
				</button>
				<button
					onClick={() => {
						buttonChangeClick(1);
					}}
					className={activeButton === 1 ? "active" : ""}
				>
					Edytuj
				</button>
			</div>
			<form onSubmit={createHandle}>
				{endpoint === "/api/pracownicy" ? 
				<EditPanelWorkers formData={formData['pracownicy']} handleChange={handleChange} /> : 
				endpoint === "/api/maszyny" ?
				<EditPanelMachines formData={formData['maszyny']} handleChange={handleChange} /> :
				endpoint === "/api/pracownicy" ? 
				<EditPanelMachines formData={formData['planowanie']} handleChange={handleChange} /> : null }
				<button type='submit'>{buttonText}</button>
			</form>
		</div>
	);
}

export default EditPanel;
