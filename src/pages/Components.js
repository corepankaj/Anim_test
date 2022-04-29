import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import { Grid, makeStyles, Switch } from '@material-ui/core';
import { FetchComponentApi } from './utils/FetchTextCode';
import * as ActionType from './redux/ActionTypes';

const useStyle = makeStyles({
    header:{
        height:'40px',
        paddingLeft:25
    },
    lbl:{
        width:'250px',
        height:'30px',
        display:'inline-block'
    }
})

const Components = ({isMobile, components, addComponent, productChanged, componentCodeGenerated}) => {
    const classes = useStyle();

    const handleChange = (event) => {
        let arr = [];
        components.forEach(obj=>{
            let tobj = {...obj};
            arr.push(tobj);

            if(tobj.key === event.target.name){
                tobj.selected = event.target.checked;
            }
        })
        addComponent(arr);
    };

    const downloadFile = () => {
        let carr = [];
        /*Object.keys(state).forEach(key => {
            if(state[key]){
                carr.push(key);
            }
        });*/

        //props.click();
        //props.addComponent(carr, isMobile);
        //DownloadTemplateCode(carr, props.fileDownloaded, isMobile);
    }

    return (
        <Grid container direction='column' style={{padding:25}}>
            <div>{
                components.map((obj,index)=>
                    <div key={index} style={{display:'block'}}>
                        <label className={classes.lbl}>{obj.val}</label>
                        <Switch checked={obj.selected} onChange={handleChange} 
                            color="primary" name={obj.key} inputProps={{ 'aria-label': 'primary checkbox' }} />
                    </div>
                )
            }</div>
        </Grid>
    )
}

const mapStateToProps = state => {
    return{
        components:state.components,
        isMobile:state.isMobile
    }
}

const mapDispatchToProps = dispatch => {
	return {
		addComponent:(arr)=>{
			dispatch({type:ActionType.COMPONENT_ADD, payload:arr});
		},
        fileDownloaded:()=>{
			dispatch({type:ActionType.FILE_DOWNLAODED});
        },
        productChanged:(isMobile)=>{
            dispatch({type:ActionType.PRODUCT_CHANGED, payload:isMobile?'mobile':'other'});
        }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Components);