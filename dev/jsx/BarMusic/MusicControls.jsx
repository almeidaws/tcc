import React from 'react';
import Button from '../Button.jsx';

const PlayPauseButton = props => {
    return (
        <button
            className={props.className}
            tabIndex={props.tabIndex}
            title={props.title}>
            <i className={props.paused ? "ms_play_control" : "ms_pause_control" } onClick={props.onClick} />
        </button>
    );
}

const MusicControls = props => (
    <div className={props.className}>
     <Button className="jp-previous" onClick={props.onPrevious}/>
     <PlayPauseButton paused={props.paused} className="jp-play" onClick={props.onPlayPause}/>
     <Button className="jp-next" onClick={props.onNext}/>
    </div>
);
export default MusicControls;