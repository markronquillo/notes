import React from 'react';

const ShowCard = (show) => (
	<div className="show-card">
		<img alt={`{$show.title} Show Poster`}
		<div>
			<h3>{show.title}</h3>
			<h4>({show.year})</h4>
			<p>{show.description}</p>
		</div>
	</div>
)

export default ShowCard;
