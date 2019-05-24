import React from 'react';

const InfoMusicPlaying = props => (
    <div className={props.className}>
        <div className="play_song_name">
            <a href="javascript:void(0);" id="playlist-text">
                <div className="jp-now-playing flex-item">
                    <div className='jp-track-name'>
                        <span className='que_img'>
                            <img src={props.music ? (props.music.posterURL ? props.music.posterURL : './images/weekly/song1.jpg')
                                : './images/weekly/song1.jpg' }/>
                        </span>
                        <div className='que_data'>
                            {props.music ? props.music.name : "No Music"}
                            <div className='jp-artist-name'>{props.music ? props.music.authors[0].name : "No Artist"}</div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
);
export default InfoMusicPlaying;
