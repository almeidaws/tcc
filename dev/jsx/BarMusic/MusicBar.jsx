import React from 'react';
import AudioPlay from './AudioPlay.jsx';
import AudioControls from './AudioControls.jsx';

class MusicBar extends React.Component {
    
    render() {
        return (
            <div className="ms_player_wrapper">
                <div className="ms_player_close">
                    <i className="fa fa-angle-up" aria-hidden="true"></i>
                </div>
                <div className="player_mid"></div>
                <AudioPlay className="audio-player"/>
                <AudioControls className="jp-type-playlist"/>
            </div>
        );
    }
}
export default MusicBar;