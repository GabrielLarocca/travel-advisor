import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles.js';
import './styles.css';


const Header = ({ onPlaceChanged, onLoad }) => {
	const classes = useStyles();

	return (
		<div className='header'>
			<Toolbar className={classes.toolbar}>
				<h1 className='titulo'>Travel Advisor</h1>

				<Box display="flex">
					<Typography variant="h6" className={classes.title}>
						Explore new places
					</Typography>

					<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>

							<InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
						</div>
					</Autocomplete>
				</Box>
			</Toolbar>
		</div>
	);
};

export default Header;