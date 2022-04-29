import React from 'react';
import Button from '@material-ui/core/Button';

const Btn = (props)=>{
	const {variant, color, value, id} = props.value;
	return (
		<Button 
			variant={variant}
			color={color} 			
			onClick={()=>props.click(id)}>
				{value}
		</Button>
	)
}

export default Btn;