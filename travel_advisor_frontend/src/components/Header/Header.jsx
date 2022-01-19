import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Toolbar, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles.js';
import './styles.css';


const Header = ({ onPlaceChanged, onLoad }) => {
	const classes = useStyles();

	return (
		<div className='header'>
			<Toolbar className={`${classes.toolbar} toolbar-header`}>
				<h1 className='titulo'>Travel Advisor</h1>

				<div className='seach-container'>
					<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
						<div className={`${classes.search} search-input`}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>

							<InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
						</div>
					</Autocomplete>
				</div>
			</Toolbar>
		</div>
	);
};

export default Header;