import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Grid, makeStyles, Tabs, Tab} from '@material-ui/core';

import * as ActionTypes from './redux/ActionTypes';
import Code from './Code';
import Settings from './Settings';
import ButtonHolder from './ButtonHolder';
import Components from './Components';
import "../assets/css/container.scss";

const useStyles = makeStyles({
    main:{
        width:'72%',
        padding:10
    },
    header:{
        background:'#a0d4f7',
        height:35,
        fontSize:16,
        paddingLeft:10
    },
    tab:{
        width:'100%',
        height:'60vh',
        overflowX:'hidden',
        overflowY:'auto',
        background:'#F0F0F0',
        paddingLeft:'10px',
        overflow:'hidden'
    }
})

const RightPanel = ({items, tabSelected, tabHandler}) => {
    const classes = useStyles();

    return (
        <Grid container direction="column" className={classes.main}>
            <Tabs value={tabSelected} onChange={tabHandler} aria-label="simple tabs example">
                <Tab label="Settings" />
                <Tab label="Components" />
                <Tab label="Code" />
            </Tabs>

            <div role="tabpanel" className={classes.tab} value={tabSelected} hidden={tabSelected!==0}>
                {items && items.length>=1 ? <Settings /> : <label>select object to adjust options</label>}
            </div>

            <div role="tabpanel" className={classes.tab} value={tabSelected} hidden={tabSelected!==1}>
                <Components />
            </div>

            <div role="tabpanel" className={classes.tab} value={tabSelected} hidden={tabSelected!==2}>
                <Code />
            </div>

            <ButtonHolder />
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        items:state.items,
        tabSelected:state.tabSelected
    }
}

const mapDispatchToProps = dispatch => {
	return {
		tabHandler:(evt, val)=>{
            dispatch({type:ActionTypes.TAB_SELECTED, payload:val});
        }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);