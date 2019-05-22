import React from 'react';
import MusicControls from './MusicControls.jsx';
import MusicProgress from './MusicProgress.jsx';
import Toogle from './Toggle.jsx';
import Selector from './Selector.jsx';

const AudioControls = props => (
    <div className={props.className}>
        <div className="jp-gui jp-interface flex-wrap">
            <MusicControls className="jp-controls flex-item"/>
            <MusicProgress className="jp-progress-container flex-item"/>
            <Toogle className="jp-toggles flex-item"/>
            <Selector/>
        </div>
    </div>
)
export default AudioControls;