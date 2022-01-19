import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import './styles.css';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
	const matches = useMediaQuery('(min-width:600px)');

	const onMoveMap = e => {
		setCoords({ lat: e.center.lat, lng: e.center.lng });
		setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
	}

	return (
		<GoogleMapReact bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }} defaultCenter={coords}
			center={coords} defaultZoom={14} margin={[50, 50, 50, 50]} options={{ disableDefaultUI: true, zoomControl: true }}
			onChange={(e) => onMoveMap(e)} onChildClick={(child) => setChildClicked(child)}>
			{places.length && places.map((place, i) => (
				<div className='markerContainer' lat={Number(place.latitude)} lng={Number(place.longitude)} key={i}>
					{!matches ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
						:
						<div className='paper'>
							<div className='shadow' />

							<p className='typography'>{place.name}</p>

							<div className='pointer' style={{ backgroundImage: `url(${place?.photo?.images?.large?.url})` ?? `url('https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg')` }} />
						</div>
					}
				</div>
			))}

			{weatherData?.list?.length && weatherData.list.map((data, i) =>
				<div key={i} lat={data.coord.lat} lng={data.coord.lon}>
					<img alt="weather" src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
				</div>
			)}
		</GoogleMapReact>
	);
};

export default Map;