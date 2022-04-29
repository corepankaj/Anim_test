import React from 'react';
import { connect } from 'react-redux';
import {Grid, makeStyles} from '@material-ui/core';

import Item from './Item';
import Preview from './Preview';
import * as ActionTypes from './redux/ActionTypes';

const useStyles = makeStyles({
    main:{
        width:'28%',
        padding:'0px 10px 10px 10px',
        marginTop:10,
        minWidth:350
    },
    container:{
        height:'69vh',
        backgroundColor:'#FFFFFF'
    }
})

const LeftPanel = ({items, isMobile, code, effects, itemSelectedIndex, generateCode, settingHandler, optionHandler, deleteHandler}) => {
    const classes = useStyles();
    
    /*let tcode = (items.length>=1) && AllCode(isMobile, code, items);
    useEffect(()=>{
        tcode && generateCode(tcode);
    });*/

    const optionChangeHandler = (evt, index) => {
        let data = {...items[index]};
        data[evt.target.name] = evt.target.value;
        optionHandler(data, index);
    }

    const itemDelteHandler = (index) => {
        let tarr = [...items];
        tarr.splice(index, 1);
        /*tarr.forEach((obj,tindex)=>{ obj.title = "anim_"+tindex; })*/
        deleteHandler(tarr);
    }

    return (
        <Grid container direction="column" className={classes.main}>
            <div className={classes.container} style={{overflowX:'hidden', padding:10}}>
                { 
                    items.map((item, index)=><Item key={index} obj={item} id={index} 
                                                effect={effects} selected={itemSelectedIndex===index} 
                                                onSettingChange={()=>settingHandler(index)} 
                                                onOptionChange={(evt)=>optionChangeHandler(evt, index)} 
                                                onItemDelete = {()=>itemDelteHandler(index)}/>)
                }
            </div>
            <Preview />
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        code:state.code,
		items:state.items,
        effects:state.effects,
        isMobile:state.isMobile,
        itemSelectedIndex:state.itemSelectedIndex
    }
}

const mapDispatchToProps = dispatch => {
	return {
        optionHandler:(data, index)=>{
			dispatch({type:ActionTypes.UDPATE_ITEM, payload:{data:{...data}, index:index}});
		},
		settingHandler:(index)=>{
			dispatch({type:ActionTypes.ITEM_SELECTED_INDEX, payload:index});
			dispatch({type:ActionTypes.TAB_SELECTED, payload:0});
		},
        deleteHandler:(arr)=>{
            dispatch({type:ActionTypes.UDPATE_ITEM_ARRAY, payload:arr});
			dispatch({type:ActionTypes.ITEM_SELECTED_INDEX, payload:arr.length-1});
        }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);