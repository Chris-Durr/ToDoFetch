import React from "react";
import { useState, useEffect } from "react";

const Home = () => {
	const [tarea, addTarea] = useState("");
	const [tareas, addNuevaTarea] = useState([]);

	useEffect(() => {
		grabarDatos();
	}, [tareas]);

	useEffect(() => {
		conseguirDatos();
	}, []);

	function grabarDatos() {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(tareas);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			redirect: "follow",
			body: raw,
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/phherten",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
			})
			.catch((error) => console.log("error", error));
	}

	function conseguirDatos() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/phherten")
			.then((response) => response.json())
			.then((result) => addNuevaTarea(result))
			.catch((error) => console.log("error", error));
	}

	const borrar = (index) => {
		let newArray = tareas.filter((valor, indice) => indice != index + 1);

		addNuevaTarea(newArray);
	};
	const arraySinSt = tareas.filter((valor, indice) => indice != 0);
	const arrayTareas = arraySinSt.map((tareaIndividual, index) => {
		return (
			<div
				key={index}
				className="d-flex justify-content-between pb-2 ps-3"
				id="firstline">
				{tareaIndividual.label}
				<button
					className="borrar"
					id="papelera"
					onClick={() => borrar(index)}>
					<i className="fas fa-trash"></i>
				</button>
			</div>
		);
	});
	return (
		<div className="container d-flex flex-column align-items-center">
			<div className="row">
				<div className="col-12 mt-5">
					<h1>tareas</h1>
				</div>
			</div>
			<div className="row d-flex flex-column align-items-center mt-5">
				<div className="works pb-5" id="tareas">
					<div className="lineaInput d-flex justify-content-between">
						<input
							type="text"
							className="form-control-lg border-0"
							placeholder="introduce tarea"
							id="tarea"
							onChange={(e) => addTarea(e.target.value)}
							value={tarea}
							autoComplete="off"
						/>
						<button
							className="agregarTarea"
							onClick={() => {
								tarea
									? addNuevaTarea([
											...tareas,
											{ label: tarea, done: false },
									  ])
									: alert("introduce tarea");
								addTarea("");
							}}>
							<i className="fas fa-plus-circle"></i>
						</button>
					</div>
					<div className="texto">{arrayTareas}</div>
				</div>
				<div className="2ndsheet" id="second"></div>
				<div className="3rdsheet" id="three"></div>
			</div>
		</div>
	);
};

export default Home;
