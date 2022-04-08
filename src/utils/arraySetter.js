//To prevent the cards from being stuck at "Loading" when a value is 0

const arraySetter = (setArray, dataArray) => {
	setArray.forEach((setFunc, index) => {
		if (dataArray[index] === 0) setFunc(-1);
		else setFunc(dataArray[index]);
	});
};

export default arraySetter;
