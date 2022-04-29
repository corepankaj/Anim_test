import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { GenerateWholeCode } from './utils/FetchTextCode';

const Code = ({tabSelected, isMobile, items, components, designerApi})=>{
	const [codeGenerated, setCode] = useState('');
	
	const getCode = async() => {
		if(tabSelected === 2){
			let code = await GenerateWholeCode(isMobile, components, items, designerApi);
			setCode(code);
		}
	}
	getCode();

	return (
		<SyntaxHighlighter language="javascript" style={docco} showLineNumbers={true}>
			{ codeGenerated }
		</SyntaxHighlighter>
	)
}

const mapStateToProps = state => {
	return {
		tabSelected:state.tabSelected,
		isMobile:state.isMobile,
		components:state.components,
		items:state.items,
		designerApi:state.designerApi
	 };
}

Code.propTypes = {
	tabSelected:PropTypes.number,
	isMobile:PropTypes.bool,
	items:PropTypes.array,
	components:PropTypes.array
}

export default connect(mapStateToProps, null)(Code);