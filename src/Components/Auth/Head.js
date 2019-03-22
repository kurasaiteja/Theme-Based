import React from 'react';

const headStyle={
	fontSize: '35px',
	color: 'black',
	fontWeight: 'bold'
}

const head = (props) => {
	return(
		<h1 style={headStyle}>Hey {props.name}, Register now!</h1>
	)
}

export default head;