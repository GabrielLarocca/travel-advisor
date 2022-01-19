// import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
// import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import './styles.css';

const PlaceDetails = ({ place, selected, refProp }) => {
	if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

	return (
		<div className='outercontainer'>
			<div className='card'>
				<div className='mh0 containerRow'>
					<div className='containerImage' style={{ backgroundImage: `url(${place?.photo?.images?.large?.url})` ?? `url('https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg')` }} />

					<div className='containerCard'>
						<div className='containerHeader'>
							<p className='cardTitle'>{place.name}</p>
						</div>

						<div className='cardBody'>
							<div className='ratingSession'>
								<Rating name="read-only" value={Number(place.rating)} readOnly />

								<p className='rating-small'>({place.num_reviews} review{place.num_reviews > 1 && 's'})</p>
							</div>

							<div className='assets'>
								<p className='assets-label'>Price</p>
								<p className='assets-value'>{place.price_level}</p>
							</div>

							<div className='assets'>
								<p className='assets-label'>Ranking</p>
								<p className='assets-value'>{place.ranking}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		// <Card id="placeDetails" elevation={6}>
		// 	<CardContent>
		// 		{place?.awards?.map((award) =>
		// 			<Box display="flex" justifyContent="space-between" my={1} alignItems="center">
		// 				<img alt="awards" src={award.images.small} />

		// 				<Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
		// 			</Box>
		// 		)}

		// 		{place?.cuisine?.map(({ name }) => <Chip key={name} size="small" label={name} className='chip' />)}

		// 		{place.address &&
		// 			<Typography gutterBottom variant="body2" color="textSecondary" className='subtitle'>
		// 				<LocationOnIcon />{place.address}
		// 			</Typography>
		// 		}

		// 		{place.phone &&
		// 			<Typography variant="body2" color="textSecondary" className='spacing'>
		// 				<PhoneIcon /> {place.phone}
		// 			</Typography>
		// 		}
		// 	</CardContent>

		// 	<CardActions>
		// 		<Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
		// 			Trip Advisor
		// 		</Button>

		// 		<Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
		// 			Website
		// 		</Button>
		// 	</CardActions>
		// </Card> 
	);
};

export default PlaceDetails;