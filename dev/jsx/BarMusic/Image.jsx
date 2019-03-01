import React from 'react';

const Image = props => (
    <div className="round">
        <img
          src={props.src}
          alt={props.alt}/>
    </div>
);

export default Image;