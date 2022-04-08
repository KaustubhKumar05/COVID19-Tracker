import "../App.css";
import { useEffect, useState } from "react";
import Search from "./Search";
import TileArray from "./TileArray";
import Table from "./Table";
import Modal from "./Modal";
import arraySetter from "../utils/arraySetter";
import URL from "../assets/URL";
import today from "../utils/yesterday";

const Dashboard = () => {
	const [viewConfirmed, setViewConfirmed] = useState(0);
	const [viewDeceased, setViewDeceased] = useState(0);
	const [viewRecovered, setViewRecovered] = useState(0);

	const data = [viewConfirmed, viewDeceased, viewRecovered];

	const [title, setTitle] = useState("Global data");

	const [viewModal, setViewModal] = useState(0);

	const [fromDate, setFromDate] = useState("2020-01-22");
	const [toDate, setToDate] = useState(today());

	const toggleModal = () => setViewModal(!viewModal);

	const handleSetTitle = (country = "") => {
		if (country !== "Global data") {
			setTitle(country);
		} else {
			setTitle("Global data");
		}
	};

	useEffect(() => {
		const pruningObject = (data) => {
			for (let i = 0; i < 194; i++) {
				if (data[i].Country === title) {
					return [
						data[i].TotalConfirmed,
						data[i].TotalDeaths,
						data[i].TotalRecovered,
					];
				}
			}
		};

		fetch(URL, {
			method: "GET",
			redirect: "follow",
		})
			.then((response) => response.text())
			.then((result) => JSON.parse(result))
			.then((data) => {
				const dataArray = [
					data.Global.TotalConfirmed,
					data.Global.TotalDeaths,
					data.Global.TotalRecovered,
				];

				const setArray = [setViewConfirmed, setViewDeceased, setViewRecovered];

				//global summary and country details have different structures

				if (title === "Global data") {
					arraySetter(setArray, dataArray);
				} else {
					const countryData = pruningObject(data.Countries);
					arraySetter(setArray, countryData);
				}
			})
			.catch((error) => console.log("Something went wrong", error));
	}, [title]);

	return (
		<div className="App">
			{viewModal ? <Modal hideModal={toggleModal} /> : ""}
			<Search
				handleSetTitle={handleSetTitle}
				viewModal={toggleModal}
				fromDate={fromDate}
				setFromDate={setFromDate}
				toDate={toDate}
				setToDate={setToDate}
			/>
			<div className="main">
				<TileArray data={data} />
				<Table title={title} fromDate={fromDate} toDate={toDate} data={data} />
			</div>
		</div>
	);
};

export default Dashboard;
