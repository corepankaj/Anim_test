import React from 'react';

import { Grid, makeStyles, IconButton, Paper } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import Help from './Help';

const useStyle = makeStyles({
    helpHeader:{
		paddingLeft:10,
		background:'#4488c0',
		color:'white',
		fontSize:21
	},
	helpNote:{
		paddingLeft:20,
		fontSize:16,
		paddingBottom:20
	}
})

const ModalHelp = (props) => {
    const classes = useStyle();
    return (
        <Paper>
            <Grid container justifyContent="space-between" alignItems="center" className={classes.helpHeader}>
                <label>How to use</label>
                <IconButton aria-label="x" onClick={()=>props.click()}>
                    <ClearIcon color="secondary" />
                </IconButton>
            </Grid>

            <Help />

            <div className={classes.helpNote}>
                <label>
                    If you find any issue or you have any suggestion. please drop a mail on techlead group.
                </label>
            </div>
        </Paper>
    )
}

export default ModalHelp;