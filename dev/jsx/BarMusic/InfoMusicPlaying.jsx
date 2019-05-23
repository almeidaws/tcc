import React from 'react';

const InfoMusicPlaying = props => (
    <div className={props.className}>
        <div className="play_song_name">
            <a href="javascript:void(0);" id="playlist-text">
                <div className="jp-now-playing flex-item">
                    <div className='jp-track-name'>
                        <span className='que_img'>
                            {/*<img src='"+obj.image+"'/>*/}
                        </span>
                        <div className='que_data'>
                            {props.musicName}
                            <div className='jp-artist-name'>{props.artistName}</div>
                        </div>
                    </div>"
                </div>
            </a>
        </div>
    </div>
);
export default InfoMusicPlaying;
