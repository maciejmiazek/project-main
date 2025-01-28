import { React, useState, useEffect } from "react";
import useCrud from "../hooks/UseCrud";
import "./EditPanel.css";

function EditPanelItems( {formData, handleChange} ) {

	const { data: itemData} = useCrud('/api/maszyny');

	return (
		<>
			<div className="form-bulk">
				<div className="input-name"><p>Imie i Nazwisko</p></div>
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
						{itemData.map((item, index) => (
							<option key={index} value={item.name}>{item.name}</option>
						))}
					</select>
				</div>
			</div>	
		</>
	)
}

export default EditPanelItems;