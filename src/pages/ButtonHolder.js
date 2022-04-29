import React from 'react';
import { connect } from 'react-redux';

import {Grid, makeStyles, Button} from '@material-ui/core';
import Btn from './Button';
import InputBtn from './InputBtn';

import * as ActionType from './redux/ActionTypes';

import DownloadFile from './utils/DownloadFile';
import UploadFile from './utils/UploadFile';

const useStyles = makeStyles({
	btn:{
		display:'flex',
		justifyContent:'center',
		alignItems:'center',
		background:'#303F9F',
		borderRadius:'4px',
		color:'white',
		width:'102px',
		height:'37px'
		
	},
	btnUpload:{
		position:'absolute', 
		opacity:0, 
		width:'120px', 
		height:'37px'
	}
})

const arrBtns = [{id:1, variant:"contained", color:"primary", value:"Download"}];
const getDapi = (mobile, str) => {
	let dstr = '';
	let tstr = '';
	let left = 0;
	if(mobile){
		left = 2;
		dstr = str.split('onCardChange')[0];
		dstr += 'onCardChange';
		tstr = str.split('onCardChange')[1];

		for(let j=0; j<tstr.length; j++){
			dstr += tstr[j];
			if(tstr[j] === '{'){ left += 1; }
			if(tstr[j] === '}'){ left -= 1; }

			if(left === 0){ break; }
		}
	}else{
		left = 2;
		dstr = str.split('videoCarouselPrev')[0];
		dstr += 'videoCarouselPrev';
		tstr = str.split('videoCarouselPrev')[1];

		for(let k=0; k<tstr.length; k++){
			dstr += tstr[k];
			if(tstr[k] === '{'){ left += 1; }
			if(tstr[k] === '}'){ left -= 1; }

			if(left === 0){ break; }
		}
	}

	return dstr+'\n~\n]}';
}

const BtnHolder = (props)=>{
    const classes = useStyles();
	const fileDownloaded = () => {
		console.log('fileDownloaded');
	}

	const fileUploaded = (arrVal, isMobile, dapi) => {
		props.components.forEach(obj => {
			let str = isMobile && obj.key==="scrollbar" ? dapi.split('"'+obj.key+'"')[2] : dapi.split('"'+obj.key+'"')[1];
			let tstr = '';

			if(str !== undefined){				
				tstr += '{ name:"'+obj.key+'"';
				let left = 1;
				let index = 0;
				obj.selected = true;
	
				while(index<str.length){
					tstr += str[index];
					if(str[index] === '{'){ left += 1; }
					if(str[index] === '}'){ left -= 1; }
					index++;
					if(left === 0){ break; }
				}

				dapi = dapi.replace(tstr, '');
			}

			obj.code = tstr;
		});


		dapi = getDapi(isMobile, dapi);
		props.fileUploaded(arrVal, isMobile, dapi, [...props.components]);
	}

	return (
		<Grid container alignItems="center" justifyContent="center" spacing={2} style={{marginTop:'5px'}}>
			{
				arrBtns.map((obj)=>{
					return (
						<Grid item key={obj.id}>
							
							<Btn value={{id:1, variant:"contained", color:"primary", value:"Download"}} 
						    click={()=>DownloadFile(props.isMobile, props.components, props.items, props.designerApi, fileDownloaded)} />

						</Grid>
					)
				})
			}
			<div className={classes.btn}>	
					
			<InputBtn  value={{id:"my_files", type:"file", variant:"contained", color:"primary", value:"UPLOAD"}}  onChange={()=>UploadFile(props.clearArray, fileUploaded)}/>
			UPLOAD
			</div>
		</Grid>
	)
}

const matStateToProps = state => {
	return {
		items:state.items,
		isMobile:state.isMobile,
		components:state.components,
		codeGenerated:state.codeGenerated,
		designerApi:state.designerApi
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fileUploaded:(data, isMobile, dapi, arr)=>{
			dispatch({type:ActionType.FILE_UPLOADED, payload:{value:data, dapi:dapi, arr:arr}});

			setTimeout(function(){
				dispatch({type:ActionType.PLATFORM_CHANGED, payload:{platform:isMobile}})
			},100);
		},

		clearArray:()=>{
			dispatch({type:ActionType.CLEAR_ARRAY, payload:{}})
		}
	}
}

export default connect(matStateToProps, mapDispatchToProps) (BtnHolder);