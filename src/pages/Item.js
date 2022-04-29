import React from 'react';
import { connect } from 'react-redux';

import { makeStyles, Grid, Input, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
	main:props=>({
		backgroundColor:props.selected?'#cfe8fc':'#e3e6e8',
		height:'40px',
        fontSize:14,
		marginBottom:10,
		padding:'0px 10px',
	}),
	item:props=>({
		paddingLeft:'15px'
	}),
	space:{
		paddingLeft:5
	},
	loop:{
		width:40, 
		height:25, 
		background:'transparent', 
		border:'1px solid black', 
		borderStyle:'none none solid none'
	}
});

function Item(props){
	const classes = useStyles(props);
	const changeHandler = (evt) => {
		props.onOptionChange(evt);
	}


	return (
		<Grid container className={classes.main} justifyContent='space-between' alignItems='center'>
			<div>
				<label>Hyperlink:</label>
				<Input className={classes.space} style={{width:65, fontSize:'14px'}} type="text" name="title" required value={props.obj.title} 
					onChange={changeHandler}></Input>
			</div>

			<div>
				<label>Loop:</label>
				<input className={classes.loop+' '+ classes.space} min="-1" type="number" style={{fontSize:'14px'}} value={props.obj.loop} name="loop"
					onChange={changeHandler} />
			</div>

		<IconButton fontSize="small" style={{height:'300px', width:'30px'}} onClick={props.onSettingChange}>
				<SettingsIcon />
			</IconButton>

			<IconButton disabled={props.items.length<2} color="secondary" fontSize="small" style={{height:'30px', width:'30px'}} onClick={props.onItemDelete}>
				<DeleteIcon />
			</IconButton>
		</Grid>
	)
}


const stateToProps = state => {
    return {
        items:state.items
    }
}

export default connect(stateToProps, null)(Item);