import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import './styles.css';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }) => {
	const [elRefs, setElRefs] = useState([]);

	useEffect(() => {
		setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
	}, [places]);

	return (
		<div className="container-list">
			<h4 className='title-list'>Search something to do</h4>

			{isLoading ?
				<div className={'loading'}>
					<CircularProgress color='#3a3b3c' size="5rem" />
				</div>
				:
				<>
					<div className='input-container'>
						<FormControl className={'formControl'}>
							<InputLabel id="type">Type</InputLabel>

							<Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
								<MenuItem value="restaurants">Restaurants</MenuItem>
								<MenuItem value="hotels">Hotels</MenuItem>
								<MenuItem value="attractions">Attractions</MenuItem>
							</Select>
						</FormControl>

						<FormControl className={'formControl'}>
							<InputLabel id="rating">Rating</InputLabel>

							<Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
								<MenuItem value="">All</MenuItem>
								<MenuItem value="3">Above 3.0</MenuItem>
								<MenuItem value="4">Above 4.0</MenuItem>
								<MenuItem value="4.5">Above 4.5</MenuItem>
							</Select>
						</FormControl>
					</div>

					<div>
						{places?.map((place, i) =>
							<Grid ref={elRefs[i]} key={i} item xs={12}>
								<PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
							</Grid>
						)}
					</div>
				</>
			}
		</div>
	);
};

export default List;