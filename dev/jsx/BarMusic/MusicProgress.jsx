import React from 'react';

const MusicProgress = props => (
    <div className={props.className}>
        <div className="jp-time-holder">
            <span className="jp-current-time" role="timer" aria-label="time">&nbsp;</span>
            <span className="jp-duration" role="timer" aria-label="duration">&nbsp;</span>
        </div>
        <div className="jp-progress">
            <div className="jp-seek-bar">
                <div className="jp-play-bar">
                    <div className="bullet">
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default MusicProgress;