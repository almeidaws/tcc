import React from 'react';

const parseToTime = time => {
    const minutes = Math.floor(time % 3600 / 60);
    const seconds = Math.floor(time % 3600 % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
};

const progressBarWidth = (currentTime, duration) => {
    const width = currentTime / duration;
    return (Number.isNaN(width) ? 0 : width) * 100;
};

const MusicProgress = props => (

    <div className={props.className}>
        <div className="jp-time-holder">
            <span className="jp-current-time" role="timer" aria-label="time">{parseToTime(props.currentTime)}</span>
            <span className="jp-duration" role="timer" aria-label="duration">{parseToTime(props.duration)}</span>
        </div>
        <div className="jp-progress">
            <div className="jp-seek-bar" id="progress-bar">
                <div className="jp-play-bar" id="progress" style={{width: progressBarWidth(props.currentTime, props.duration) + "%"}}>
                    <div className="bullet" onMouseMove={props.onTimeChange}>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default MusicProgress;