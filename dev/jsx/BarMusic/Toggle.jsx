import React from 'react';
import Button from './Button.jsx';

const Toggle = props => (
    <div className={props.className}>
        <Button className="jp-shuffle" title="Shuffle">
            <i className="ms_play_control"></i>
        </Button>
        <Button className="jp-repeat" title="Repeat">
            <i className="ms_play_control"></i>
        </Button>
    </div>
)

export default Toggle