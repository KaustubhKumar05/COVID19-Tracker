const lineChartData = (
	dateLabels,
	dailyConfirmed,
	dailyDeceased,
	dailyRecovered,
	startIndex,
	endIndex
) => {
	const data = {
		labels: dateLabels.slice(startIndex, endIndex),
		datasets: [
			{
				label: "Confirmed cases",
				data: dailyConfirmed.slice(startIndex, endIndex),
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
			{
				label: "Deceased",
				data: dailyDeceased.slice(startIndex, endIndex),
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
			{
				label: "Recovered cases",
				data: dailyRecovered.slice(startIndex, endIndex),
				borderColor: "rgb(99, 235, 100)",
				backgroundColor: "rgba(100, 235, 100, 0.5)",
			},
		],
	};
	return data;
};

export default lineChartData;
