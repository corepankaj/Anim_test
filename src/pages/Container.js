import React from 'react';
import { connect } from 'react-redux';

import {Grid, makeStyles, Paper} from '@material-ui/core';
import Modal from 'react-modal';

import Header from './Header';
import Options from './Options';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

import "../assets/css/container.scss";

const useStyles = makeStyles({
	container:{
		overflow:'hidden',
		height:'100vh',
		width:'100vw',
		display:'flex',
		justifyContent:'center',
		alignItems:'center'
	},
	modal:{
		position:'absolute',
		width:300,
		height:150,
		top:(window.innerHeight-300)/2,
		left:(window.innerWidth-150)/2
	}
})

const Container = ({animCode, isMobile, designerApi, designerApiLoaded, showLoader, animCodeLoaded})=>{
	const classes = useStyles();
	const lstyle = '<link rel="stylesheet" href="./assets/motion-effect.css"></link>';
	const stag = '<script type="text/javascript" src="assets/ScrollView.js"></script>';
	
	return (
		<Grid container direction="column" justifyContent="center" className={classes.container}>
			<div style={{width:'99%', height:'97vh'}}>
				<Header content='Motion Effect' />
				<Options />
				
				<Grid container direction="row" justifyContent="space-between" className="panel">
					<LeftPanel />
					<RightPanel />
				</Grid>
				
				<Grid container className="footer" alignItems="center" justifyContent="space-between">
					<div style={{padding:'0px 10px 0px 10px'}}>
						<div style={{fontSize:16}}>How to use:</div>
						<div style={{marginLeft:10}}>- Create html object in your muse file and drag it outside of the stage</div>
						<div style={{marginLeft:10}}>- Copy and paste the code(in right) in the html object</div>
					</div>

					<div className="code">
						<div> {lstyle} </div>
					</div>
				</Grid>
			</div>

			<Modal isOpen={showLoader}  contentLabel="Example Modal" className={classes.modal}>
				<Paper style={{width:300, height:150}}>
					<Grid container justifyContent='center' alignItems='center' style={{height:150}}>
						<label>loading...</label>
					</Grid>
				</Paper>
			</Modal>
		</Grid>
	)
}

const stateToProps = state => {
	return {
		showLoader:state.showLoader,
		isMobile:state.isMobile,
		animCode:state.animCode,
		designerApi:state.designerApi
	}
}

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(stateToProps, mapDispatchToProps)(Container);