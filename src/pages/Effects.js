import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import * as ActionType from './redux/ActionTypes';
import { Select, MenuItem, ListItemText } from '@material-ui/core';

const Effects = (props) => {
    const [localState, setLocalState] = useState(null);
    const myRef = React.createRef();

    useEffect(()=>{
        setLocalState({enablePreview:false, selectedEffect:props.obj.effect})
    }, [props.obj]);

    const onHoverHandler = (value, evt) => {
        if(localState.enablePreview){
            //props.hoverHandler(value, evt.target.id);
        }
    }
    
    const onSelectHandler = (value) => {
        setLocalState({...localState, enablePreview:value});
        props.selectHandler({enablePreview:value});
    }

    const onChangeHandler = (evt) => {
        setLocalState({...localState, selectedEffect:evt.target.value});
        props.onChange({name:evt.target.name, value:evt.target.value});
    }

    return (
        localState && <Select name="effect" style={{width:140, paddingLeft:5, fontSize:'14px'}} value={localState.selectedEffect}
            onChange={(evt)=>onChangeHandler(evt)} onOpen = {()=>onSelectHandler(true)} onClose = {()=>onSelectHandler(false)} >
            { 
                props.effect.map(name=>
                    <MenuItem ref={myRef} id={name} key={name} value={name}
                        onMouseOver={(event)=>onHoverHandler(true, event)} onMouseOut={(event)=>onHoverHandler(false, event)} >
                            <ListItemText primary={name} />
                    </MenuItem>
                )
            }
        </Select>
    )
}

const mapPropsToState = state => {
    return {
        showPreviewButton:state.showPreviewButton,
        itemSelectedIndex:state.itemSelectedIndex
    }
}

const mapDispatchToProps = dispatch =>{
	return {
		hoverHandler:(show, effect, ref)=>{
			dispatch({type:ActionType.SHOW_PREVIEW, payload:{show:show, effect:effect, ref:ref}});
		},

		selectHandler:()=>{
            dispatch({type:ActionType.SHOW_PREVIEW, payload:{show:false, event:null}});
		}
	}
}

export default connect(mapPropsToState, mapDispatchToProps) (Effects);