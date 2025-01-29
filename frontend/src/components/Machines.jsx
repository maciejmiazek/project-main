import { React, useState, useEffect } from "react";
import useCrud from "./hooks/UseCrud";
import EditPanel from "./EditPanel/EditPanel";
import { IconUser, IconCar } from "@tabler/icons-react";
import "./Machines.css";

function Machines() {
	const [buttonText, setButtonText] = useState("Dodaj");

	const {
		data: itemData,
		createHandle,
		deleteData,
		activeButton,
		setActiveButton,
		alertText,
		alertIsVisible,
		formData,
		setFormData,
		cardId,
		setCardId,
		endpoint,
	} = useCrud("/api/maszyny");

	const buttonChangeClick = (index) => {
		setButtonText(index === 0 ? "Dodaj" : "Edytuj");
		if (activeButton === null || activeButton !== index) {
			setActiveButton(index);

			setFormData((prev) => ({
				...prev,
				maszyny: {
				  ...prev.maszyny,
				},
			}));

			setCardId(null);
		}
	};

	const editInsert = (i) => {
		if (activeButton !== 1) {
			return;
		}
		console.log(i);

		setFormData((prev) => ({
			...prev,
			maszyny: {
			  	...prev.maszyny,
				name: itemData[i].name,
				isUsingSince: itemData[i].isUsingSince,
				capacity: itemData[i].capacity,
				usingWorker: itemData[i].usingWorker,
				description: itemData[i].description,
				imgUrl: itemData[i].imgUrl,
			},
		}));

		setCardId(i);
	};

	return (
		<>
			<div className='data'>
				{typeof itemData === "object"
					? itemData.map((item, i) => {
							return (
								<div
									key={i}
									className={`card-board ${activeButton === 1 ? "edit" : ""}`}
									style={{
										border:
											cardId === i && activeButton === 1
												? "3px solid whitesmoke"
												: "",
									}}
									onClick={() => {
										editInsert(i);
									}}
								>
									<div className='worker-avatar'>
										<div className='status-box'>Aktywny</div>
										<div className='img-box'>
											{item.imgUrl ? (
												<img
													src={item.imgUrl}
													alt=''
												/>
											) : (
												<IconCar stroke={2} />
											)}
										</div>
										<div className='avatar-text'>
											<p>{item.name}</p>
										</div>
									</div>
									<div className='worker-items'>
										<div className='item-option'>
											<div className='item-option-name'>
												<p>W uzyciu od</p>
											</div>
											<div className='item-option-value'>
												<p>{item.isUsingSince}</p>
											</div>
										</div>
										<div className='item-option'>
											<div className='item-option-name'>
												<p>Ladownosc</p>
											</div>
											<div className='item-option-value'>
												<p>{`${item.capacity} KG`}</p>
											</div>
										</div>
										<div className='item-option'>
											<div className='item-option-name'>
												<p>Uzywany Przez</p>
											</div>
											<div className='item-option-value'>
												<p>{item.usingWorker}</p>
											</div>
										</div>
										<div className='item-option'>
											<div className='item-option-name'>
												<p>Opis Pracy</p>
											</div>
											<div className='item-option-value'>
												<p>
													{item.description != "" ? item.description : "brak"}
												</p>
											</div>
										</div>
										<button
											className='delete-option'
											onClick={() => {
												deleteData(i);
											}}
											style={{ display: activeButton === 1 ? "block" : "none" }}
										>
											Delete
										</button>
									</div>
								</div>
							);
					  })
					: console.log("server error")}
			</div>
			<EditPanel
				activeButton={activeButton}
				buttonChangeClick={buttonChangeClick}
				buttonText={buttonText}
				formData={formData}
				setFormData={setFormData}
				createHandle={createHandle}
				endpoint={endpoint}
			/>
			<div className={`alert ${alertIsVisible ? "show" : ""}`}>
				<p>{alertText}</p>
			</div>
		</>
	);
}

export default Machines;
