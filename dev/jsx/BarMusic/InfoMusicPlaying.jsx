import React from 'react';

const InfoMusicPlaying = props => (
    <div className={props.className}>
        <div className="play_song_name">
            <a href="javascript:void(0);" id="playlist-text">
                <div className="jp-now-playing flex-item">
                    <div className="jp-track-name"></div>
                    <div className="jp-artis-name"></div>
                </div>
            </a>
        </div>
    </div>
)
export default InfoMusicPlaying;