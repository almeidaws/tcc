import React from 'react';
import TypePlayList from './TypePlayList.jsx';

import AudioPlay from './AudioPlay.jsx';


class AudioPlayerBar extends React.Component {
    
    render() {
        return (
            <div className="ms_player_wrapper">
                <div className="ms_player_close">
                    <i className="fa fa-angle-up" aria-hidden="true"></i>
                </div>
                <div className="player_mid"></div>
                <AudioPlay className="audio-player"/>
                <TypePlayList className="jp-type-playlist"/>
            </div>
        );
    }
}
export default AudioPlayerBar;