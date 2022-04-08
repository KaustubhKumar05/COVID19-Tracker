import CountUp from "react-countup";

const Tile = ({ label, count, icon, total }) => {
	return (
		<div className="tile">
			<div className="tile-container">
				<div className="bar">
					<h3>{label}</h3> {/* Countup converts strings to 0 */}
					{count ? (
						<h3 className="count">
							{count === -1 ? (
								<span>Not available</span>
							) : (
								<CountUp end={count} separator="," />
							)}
							{icon}
						</h3>
					) : (
						<h3>Fetching...</h3>
					)}
				</div>
			</div>
		</div>
	);
};

export default Tile;
