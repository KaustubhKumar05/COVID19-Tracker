import { useState, useEffect } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import formatDate from "../utils/formatDate";
import lineChartOptions from "../assets/lineChartOptions";
import lineChartData from "../assets/lineChartData";
import doughnutChartOptions from "../assets/doughnutChartOptions";
import doughnutChartData from "../assets/doughnutChartData";
import labels from "../assets/labels";

import {
	Chart as ChartJS,
	CategoryScale,
	ArcElement,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	ArcElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const Table = ({ title, toDate, fromDate, data }) => {
	const [dateLabels, setDateLabels] = useState([]);
	const [dailyConfirmed, setDailyConfirmed] = useState([]);
	const [dailyDeceased, setDailyDeceased] = useState([]);
	const [dailyRecovered, setDailyRecovered] = useState([]);
	const [startIndex, setStartIndex] = useState(-1);
	const [endIndex, setEndIndex] = useState(-1);

	//Collecting the entire data and slicing it based on the dates specified
	//Might write a function to convert dates to indices

	useEffect(() => {
		const collectData = (data) => {
			let tempDateLabels = [];
			let tempDailyConfirmed = [];
			let tempDailyDeceased = [];
			let tempDailyRecovered = [];

			for (let i = 0; i < data.length; i++) {
				if (data[i].Date.slice(0, 10) === fromDate) setStartIndex(i);
				else if (data[i].Date.slice(0, 10) === toDate) setEndIndex(i);

				tempDateLabels.push(data[i].Date.slice(0, 10));
				tempDailyConfirmed.push(data[i].Confirmed);
				tempDailyDeceased.push(data[i].Deaths);
				tempDailyRecovered.push(data[i].Recovered);
			}

			setDateLabels(tempDateLabels);
			setDailyConfirmed(tempDailyConfirmed);
			setDailyDeceased(tempDailyDeceased);
			setDailyRecovered(tempDailyRecovered);
		};

		if (title !== "Global data") {
			fetch(`https://api.covid19api.com/country/${title}`, {
				method: "GET",
				redirect: "follow",
			})
				.then((response) => response.text())
				.then((result) => JSON.parse(result))
				.then((data) => {
					collectData(data);
				})
				.catch((error) => console.log("Possible network error!", error));
		}
	}, [title, fromDate, toDate]);

	return (
		<div className="graph-table">
			{title === "Global data" ? (
				<div className="graph-table-container">
					<div className="graph-table-title">{title}</div>
					<div className="doughnut-graph">
						<Doughnut
							options={doughnutChartOptions}
							data={doughnutChartData(labels, data)}
							width="100"
						/>
					</div>
				</div>
			) : (
				<div className="graph-table-container">
					<div className="graph-table-title">
						{title}: {formatDate(fromDate)} to {formatDate(toDate)}
					</div>
					<div className="line-graph">
						<Line
							options={lineChartOptions}
							data={lineChartData(
								dateLabels,
								dailyConfirmed,
								dailyDeceased,
								dailyRecovered,
								startIndex,
								endIndex
							)}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Table;
