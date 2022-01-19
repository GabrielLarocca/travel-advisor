/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress, CssBaseline } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { getPlacesData, getWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import './app.css';

function App() {
	const [type, setType] = useState('restaurants');
	const [rating, setRating] = useState('');

	const [coords, setCoords] = useState({});
	const [bounds, setBounds] = useState(null);

	const [weatherData, setWeatherData] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [places, setPlaces] = useState([]);

	const [autocomplete, setAutocomplete] = useState(null);
	const [childClicked, setChildClicked] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [generalLoading, setGeneralLoading] = useState(true);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
			setCoords({ lat: latitude, lng: longitude });
		});
	}, []);

	useEffect(() => {
		const filtered = places.filter((place) => Number(place.rating) > rating);

		setFilteredPlaces(filtered);
	}, [rating, places]);

	useEffect(() => {
		if (bounds) {
			setIsLoading(true);

			getWeatherData(coords.lat, coords.lng)
				.then((data) => setWeatherData(data));

			getPlacesData(type, bounds.sw, bounds.ne)
				.then((data) => {
					console.log(data)
					setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
					setFilteredPlaces([]);
					setRating('');
					setIsLoading(false);
				});
		}
	}, [bounds, type]);

	const onLoad = (autoC) => setAutocomplete(autoC);

	const onPlaceChanged = () => {
		const lat = autocomplete.getPlace().geometry.location.lat();
		const lng = autocomplete.getPlace().geometry.location.lng();

		setCoords({ lat, lng });
	};

	const loadScript = (url, callback) => {
		let script = document.createElement("script");
		script.type = "text/javascript";

		if (script.readyState) {
			script.onreadystatechange = function () {
				if (script.readyState === "loaded" || script.readyState === "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			script.onload = () => callback();
		}

		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	};

	useEffect(() => {
		const google = window.google;

		if (typeof google === 'undefined') {
			loadScript(`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
				() => setGeneralLoading(false)
			);
		} else {
			setGeneralLoading(false)
		}
	})


	return (
		<div className='body'>
			{!generalLoading ?
				<>
					<CssBaseline />

					<Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />

					<div className="innerContainer">
						<div className='results'>
							<List isLoading={isLoading} childClicked={childClicked} type={type}
								places={filteredPlaces.length ? filteredPlaces : places}
								setType={setType} rating={rating} setRating={setRating}
							/>
						</div>

						<div className='containerMap' id="map">
							<Map setChildClicked={setChildClicked} setBounds={setBounds} setCoords={setCoords}
								coords={coords} places={filteredPlaces.length ? filteredPlaces : places} weatherData={weatherData}
							/>
						</div>
					</div>
				</>
				:
				<div className='general-loading'>
					<p>Travel Advisor</p>

					<CircularProgress color='#3a3b3c' size="5rem" />
				</div>
			}

		</div>
	);
}

export default App;
