const yesterday = () => {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);

	let dd = yesterday.getDate();
	let mm = yesterday.getMonth() + 1;
	let yyyy = yesterday.getFullYear();

	if (dd < 10) dd = "0" + dd;
	if (mm < 10) mm = "0" + mm;

	return `${yyyy}-${mm}-${dd}`;
};

export default yesterday;
