import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Paper } from '@material-ui/core';

import '../assets/css/container.scss';

const useStyles = makeStyles({
    preview:{
        position:'absolute',
        width:300,
        height:200,
        zIndex:1,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
})

const Preview = (props)=> {
    const classes = useStyles();
    const [pos, setPos] = useState({x:0, y:0});

    useEffect(()=>{
        if(props.preview.effect && props.preview.show){
            var ele = document.querySelector("#"+props.preview.effect);
            setPos({x:ele?ele.parentNode.parentNode.getBoundingClientRect().right+90:0, y:ele?ele.getBoundingClientRect().top>=660?660:ele.getBoundingClientRect().top:0});
            let abox = document.querySelector("#animate_box");
            if(abox != null  || abox !== undefined){
                abox.classList.forEach(val=>{
                    if(val.indexOf("animate")!== -1){ abox.classList.remove(val)  };
                });
                
                abox.classList.add('animate__animated', 'animate__'+props.preview.effect);
                abox.style.setProperty('--animate-delay', '.25s');
                abox.style.setProperty('--animate-duration', '.5s');
            }
        };
    }, [props.preview]);

    return (
        <>
            {
                props.preview.show && <Paper className={classes.preview} style={{marginTop:pos.y-120, marginLeft:pos.x-120}} >
                    <div id="animate_box" className='preview-box'></div>
                </Paper>
            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        preview:state.preview
    }
}

export default connect(mapStateToProps, null)(Preview);