import React from 'react';
import { connect } from 'react-redux';
import { Grid,makeStyles } from '@material-ui/core';

import * as Action from './redux/ActionTypes';
import '../assets/css/options.scss';

const useStyles = makeStyles({
	main:{
		height:'40px',
		fontSize:14,
		background:'white'
	},
	sliderHolder:{
		display:'flex',
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	}
})

const Options = (props) => {
	const classes = useStyles();
	return(
		<Grid container justifyContent="space-evenly" direction="row" alignItems="center" className={classes.main}>
			<div>
				Number of objects:
				<input style={{marginLeft:10}} type="number" value={props.items.length} 
					onChange={(evt)=>props.changeHandler(Number(evt.target.value), props.items)} />
			</div>

			<div className={classes.sliderHolder}>
				<span className="thick">Other</span>
				<label className="switch">
					<input type="checkbox" checked={props.isMobile} onChange={props.platformChanged} />
					<span className="slider round"></span>
				</label>
				<span className="thick">Responsive</span>
			</div>
		</Grid>
	)
}

const mapStateToProps = state => {
	return {
		items:state.items,
		isMobile:state.isMobile
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		platformChanged:(evt)=>{
			dispatch({type:Action.PLATFORM_CHANGED, payload:{platform:evt.target.checked}})
		},
		changeHandler:function(totalObjects, items){
			if(totalObjects<=0 || totalObjects>=50) return;
			
			const arrItems = [...items];
			if(arrItems.length > totalObjects){ arrItems.length = totalObjects; };

			let title = "";
			for(var j=arrItems.length; j<Number(totalObjects); j++){
				title = "anim_"+j;
				if(j>=1 && !isNaN(Number(arrItems[j-1].title.split('_')[1]))) {
					title = "anim_"+Number(Number(arrItems[j-1].title.split('_')[1])+1);
				}

				let obj = {title:title, anims:[{ipos:10, effect:'fadeInUp', distance:100, duration:500, delay:100}], loop:0}
				arrItems.push(obj);
			}

			dispatch({type:Action.UDPATE_ITEM_ARRAY, payload:arrItems});
			dispatch({type:Action.ITEM_SELECTED_INDEX, payload:arrItems.length-1});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (Options);