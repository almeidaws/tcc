import React from 'react';

const Button = props => (
    <button 
        className={props.className}
        tabIndex={props.tabIndex}
        title={props.title}>
    	<i className="ms_play_control" onClick={props.onClick}></i>
    </button>
);
export default Button;