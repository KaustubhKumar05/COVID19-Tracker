//YYYY-MM-DD to DD-MM-YYYY
const formatDate = (date) => {
	return `${date.slice(-2)}-${date.slice(5, 7)}-${date.slice(0, 4)}`;
};

export default formatDate;
