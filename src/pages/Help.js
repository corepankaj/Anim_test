import React from 'react';
import "../assets/css/container.scss";

import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	main:{
		padding:20
	},
	list:{
		paddingBottom:10,
		fontSize:13
	}
})

const Help = ()=>{
	const classes = useStyles();
	return(
		<Grid container direction="column" className={classes.main}>
			<label className={classes.list}>- Choose number of objects to add animation.</label>
			<label className={classes.list}>- For Mobile Expandable unit please ensure to select “responsive” for all other ad-formats  choose other.</label>
			<label className={classes.list}>- Add title of object in left panel and copy-paste the title name in muse hyperlink options. <a href="https://snipboard.io/2Kqeji.jpg" target="blank">screenshot.</a></label>
			<label className={classes.list}>- To stop animation in peek-a-boo state, add "vid" in object's title on the video tab.</label>
			<label className={classes.list}>- Place the downloaded files (designer-config.js and motion-effect.css) inside the assets folder of main unit.</label>
			<label className={classes.list}>- To make any modification in the generated code, upload the scrollView.js file and it will pre-populate the properties in the left panel.</label>
			<label className={classes.list}>- Value of delay can not exceed above 5 seconds.</label>
		</Grid>
	)
}

export default Help;