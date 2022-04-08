import Tile from "./Tile";
import labels from '../assets/labels'
import {tileIcons} from '../assets/icons'


const TileArray = ({ data }) => {
	
	return (
		<div className="tile-array">
			{labels.map((label, index) => (
				<Tile
					key={index}
					label={label}
					count={data[index]}
					icon={tileIcons[index]}
				/>
			))}
		</div>
	);
};

export default TileArray;
