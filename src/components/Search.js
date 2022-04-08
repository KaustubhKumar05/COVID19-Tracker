import { useState } from "react";
import yesterday from "../utils/yesterday";
import countries from "../assets/countries";
import { ExitToAppIcon } from "../assets/icons.js";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";



const Search = ({
	handleSetTitle,
	viewModal,
	setFromDate,
	fromDate,
	setToDate,
	toDate,
}) => {
	const auth = getAuth();
	const [country, setCountry] = useState("0");
	const val = yesterday();

	const navigate = useNavigate();
	const signOutUser = async() => {
		await signOut(auth);
		navigate("/login");
	};

	return (
		<div className="search">
			<div className="title">
				<p>COVID-19 Tracker</p>
				<ExitToAppIcon
					fontSize="large"
					cursor="pointer"
					tooltip="Log out"
					onClick={() => signOutUser()}
				/>
			</div>

			<div className="search-container">
				<div className="text">
					<input
						type="search"
						list="countries"
						id="input-text"
						placeholder="Select a country..."
						onChange={(e) => setCountry(e.target.value)}
					/>

					<datalist id="countries">
						{countries.map((country) => (
							<option key={country} value={country} />
						))}
					</datalist>
				</div>
				<div className="dates">
					<input
						onChange={(e) => setFromDate(e.target.value)}
						id="from-date"
						type="date"
						className="input-date"
						required
						min={"2020-01-22"}
						value={fromDate}
						max={val}
					/>
					<input
						onChange={(e) => setToDate(e.target.value)}
						id="to-date"
						type="date"
						className="input-date"
						required
						min={fromDate}
						value={toDate}
						max={val}
					/>
				</div>
				<div className="search-btn">
					<button
						onClick={() => {
							if (countries.includes(country)) {
								handleSetTitle(country);
							} else if (country === "0" || country === "") {
								handleSetTitle("Global data");
							} else {
								document.getElementById("input-text").value = "";
								viewModal();
							}
						}}
					>
						Fetch
					</button>
				</div>
			</div>
		</div>
	);
};

export default Search;
