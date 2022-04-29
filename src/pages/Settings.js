import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles, Grid, Input, Button, IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteIcon from '@material-ui/icons/Delete';
import Effects from './Effects';
import * as ActionType from './redux/ActionTypes';
import Btn from './Button';

const useStyles = makeStyles({
    main:{
        fontSize:14,
		padding:10
    },
    animHolder:{
        padding:'0px 50px',
        marginTop:10
    },
    preview:{
        height:260,
        marginTop:10,
        background:'white'
    },
    animBox:{
        width:40,
        height:40,
        background:'red'
    },
	space:{
		paddingLeft:5
	}
})

const Settings = (props) => {

     
   let my_arr = [
        {name:"Add Animation +",fname:"addAnimation",variant:"contained",color:"primary"},
        {name:"Play >",fname:"playAnimation",variant:"contained",color:"primary"}
      ];
 
    
    const classes = useStyles();
    let itemSelected = props.items[props.itemSelectedIndex];
    const [arrAnim, setArrAnim] = useState([]);

    let animIndex = 0;
    let disableAnimBtn = arrAnim.length>=3 && true;
    let boxRef = React.createRef();

    useEffect(()=>{
        setArrAnim(itemSelected.anims);
    }, [itemSelected]);

    const disabled = (obj) => {
        if(obj.effect.search('Up')!==-1 || obj.effect.search('Down')!==-1 || obj.effect.search('Left')!==-1 || obj.effect.search('Right')!==-1){
            if(obj.effect.search('bounce')===-1){
                return false;
            }
        }
        return true;
    }

    const getAnimItem = (obj, index) => {
        return (
            <Grid container direction="row" className={classes.animHolder} justifyContent='space-between' alignItems='center' key={index}>
                <div>
                    <label>Effect:</label>
                    <Effects className={classes.space} obj={obj} effect={props.effects} 
                        onChange={(ttobj)=>changeHandler({name:ttobj.name, value:ttobj.value}, index)}/>
                </div>

                <div>
                    <label>Distance:</label>
                    <Input disabled={disabled(obj)} 
                        className={classes.space} style={{width:50, fontSize:'14px'}} type="number" value={obj.distance} name="distance"
                        onChange={(evt)=>changeHandler({name:evt.target.name, value:evt.target.value}, index)} step="1"></Input>%
                </div>

                <div>
                    <label>Duration:</label>
                    <Input className={classes.space} style={{width:50, fontSize:'14px'}} type="number" value={obj.duration} name="duration"
                        onChange={(evt)=>changeHandler({name:evt.target.name, value:evt.target.value}, index)} step="1"></Input>ms
                </div>
                
                <div>
                    <label>Delay:</label>
                    <Input className={classes.space} style={{width:50, textAlign:'center', fontSize:'14px'}} type="number" value={obj.delay} name="delay"
                    onChange={(evt)=>changeHandler({name:evt.target.name, value:evt.target.value}, index)} step="1" ></Input>ms
                </div>

                {
                    arrAnim.length>=2 && <IconButton color="secondary" fontSize="small" style={{height:'30px', width:'30px'}} onClick={()=>deleteHandler(index)}>
                        <DeleteIcon />
                    </IconButton>
                }
            </Grid>
        )
    }

    const changeHandler = (obj, index) => {
        itemSelected.anims[index] = {...itemSelected.anims[index], [obj.name]:obj.value};
		props.optionChangeHandler(itemSelected, props.itemSelectedIndex);
	}

    const deleteHandler = (index) => {
        itemSelected.anims.splice(index, 1);
        props.optionChangeHandler(itemSelected, props.itemSelectedIndex);
    }

    const addAnimation = () => {
        let tarr = [...itemSelected.anims, {ipos:10, effect:'fadeInUp', distance:100, duration:500, delay:100*(arrAnim.length+1)}];
        let titem = { ...itemSelected, anims:tarr }
        props.addAnimation(titem, props.itemSelectedIndex);
        setArrAnim(tarr);
    }

    const animationEnd = () => {
        setTimeout(removeStyle, 400);
        animIndex = 0;
    }

    const searchAddAndPlayAnimation=(args) => {
        
       if(args == "addAnimation"){
         console.log("add Animation");
         addAnimation();
        
       }else{
           console.log("paly anaim");
           playAnimation();
       }
    }

    const playAnimation = () => {
        removeStyle();
        let distance = 'translate3d(0, -'+arrAnim[animIndex].distance+'%, 0)';
        if(arrAnim[animIndex].effect.search('Up')!==-1){
            distance = 'translate3d(0, '+arrAnim[animIndex].distance+'%, 0)';
        }else if(arrAnim[animIndex].effect.search('Left')!==-1){
            distance = 'translate3d(-'+arrAnim[animIndex].distance+'%, 0, 0)';
        }else if(arrAnim[animIndex].effect.search('Right')!==-1){
            distance = 'translate3d('+arrAnim[animIndex].distance+'%, 0, 0)';
        }

        setTimeout(()=>{
            boxRef.current.style.setProperty('--animate-duration', arrAnim[animIndex].duration+'ms');
            boxRef.current.style.setProperty('--animate-distance', distance);
            boxRef.current.style.setProperty('animation-delay', arrAnim[animIndex].delay+'ms');
            boxRef.current.style.setProperty('-webkit-animation-delay', arrAnim[animIndex].delay+'ms');
            boxRef.current.classList.add('animate__animated', 'animate__'+arrAnim[animIndex].effect);
        }, 10);

        function handleAnimationEnd(){
            if(boxRef.current===null){ return; };
            boxRef.current.removeEventListener('animationend', handleAnimationEnd);
            
            animIndex++;
            animIndex<arrAnim.length ? playAnimation() : animationEnd();
        };

        boxRef.current.addEventListener('animationend', handleAnimationEnd);
    }

    const removeStyle = ()=>{
        boxRef.current.classList.forEach(cls=>cls.search('animate')!==-1 && boxRef.current.classList.remove(cls));
        boxRef.current.style.removeProperty('animation-delay');
        boxRef.current.style.removeProperty('-webkit-animation-delay');
        boxRef.current.style.removeProperty('--animate-duration');
        boxRef.current.style.removeProperty('--animate-distance');

    }

    return(
        itemSelected ? <Grid container direction="column" className={classes.main}>
            <Grid container direction="row" justifyContent='space-between' alignItems="center">
                <label>{itemSelected.title}</label>
                <Grid container direction='row' justifyContent='space-between' style={{width:300}}>
                             
                <div>
                    {my_arr.map((my_arr, x) => (
                        <div key={x}>  
                        <Btn value={{id:0, variant:my_arr.variant, color:my_arr.color, value:my_arr.name}} 
                        click={()=>searchAddAndPlayAnimation(my_arr.fname)} /> 
                        </div>
                    ))}
                </div>

                </Grid>
            </Grid>
            
            
            <div style={{overflowY:'auto', height:165}}>
                { arrAnim.map((obj,index)=>getAnimItem(obj, index)) }
            </div>

            <Grid container className={classes.preview} justifyContent="center" alignItems="center">
                <div ref={boxRef} className={classes.animBox}></div>
            </Grid>
        </Grid> : null
    )
}

const stateToProps = state => {
    return {
        items:state.items,
        effects:state.effects,
        itemSelectedIndex:state.itemSelectedIndex
    }
}

const dispatchToState = dispatch => {
    return {
        optionChangeHandler:(obj, index)=>{
			dispatch({type:ActionType.UDPATE_ITEM, payload:{data:obj, index:index}});
        },
        addAnimation:(item, index)=>{
            dispatch({type:ActionType.ADD_ANIMATION, payload:{items:item, index:index}});
        }
    }
}

export default connect(stateToProps, dispatchToState)(Settings);