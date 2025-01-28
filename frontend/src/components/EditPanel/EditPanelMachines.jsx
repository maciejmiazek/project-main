import { React, useState, useEffect } from "react";
import useCrud from "../hooks/UseCrud";
import "./EditPanel.css";

function EditPanelItems( {formData, handleChange} ) {

	const { data: itemData} = useCrud('/api/pracownicy');

	return (
		<>
			<div className="form-bulk">
				<div className="input-name"><p>Nazwa</p></div>
				<div className="input-choose">
					<input type="text" name="name" value={formData.name} onChange={handleChange} required/>
				</div>
			</div>
			<div className="form-bulk">
				<div className="input-name"><p>W uzyciu od</p></div>
				<div className="input-choose">
					<input type="date" name="isUsingSince" value={formData.isUsingSince} onChange={handleChange}/>
				</div>
			</div>
			<div className="form-bulk">
				<div className="input-name"><p>Ladownosc</p></div>
				<div className="input-choose">
					<input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required/>KG
				</div>
			</div>
			<div className="form-bulk">
				<div className="input-name"><p>Uzywany Przez</p></div>
				<div className="input-choose">
					<select name="usingWorker" value={formData.usingWorker} onChange={handleChange}>
						<option value="">Wybierz Pracownika</option>
						{itemData.map((item, index) => (
							<option key={index} value={item.name}>{item.name}</option>
						))}
					</select>
				</div>
			</div>	
			<div className="form-bulk">
				<div className="input-name"><p>Opis</p></div>
				<div className="input-choose">
					<input type="String" name="description" value={formData.description} onChange={handleChange}/>
				</div>
			</div>
			<div className="form-bulk">
				<div className="input-name"><p>Img URL</p></div>
				<div className="input-choose">
					<input type="string" name="imgUrl" value={formData.imgUrl} onChange={handleChange}/>
				</div>
			</div>
		</>
	)
}

export default EditPanelItems;