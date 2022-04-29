import React from 'react';
import  Input  from '@material-ui/core/Input';

const InputBtn = (props)=>{
	const {variant, color, value, id, type} = props.value;
	return (
		<Input style={{width:'300px',opacity:'0'}}
			variant={variant}
			color={color} 
            id={id}
            type={type}	           	
			onChange={()=>props.onChange(id)}>
				{value}
		</Input>
	)
}
export default InputBtn;