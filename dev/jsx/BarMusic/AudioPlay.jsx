import React from 'react';
import InfoMusicPlaying from './InfoMusicPlaying.jsx';

const AudioPlay = props => (
    <div className={props.className}>
        <div id="jquery_jplayer_1" className="jp-jplayer"></div>
        <div id="jp_container_1" className="jp-audio" role="application" aria-label="media player">
            <div className="player_left">
                <InfoMusicPlaying className="ms_play_song"
                                  musicName={props.currentMusic.name !== null ? props.currentMusic.name : ''}
                                  artistName={props.currentMusic.authors[0].name !== null ? props.currentMusic.authors[0].name : ''}/>
                <div className="play_song_options">
                    <ul>
                        <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_fav"></i></span>Add To Favourites</a></li>
                        <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_playlist"></i></span>Add To Playlist</a></li>
                    </ul>
                </div>
                <span className="play-left-arrow"><i className="fa fa-angle-right" aria-hidden="true"></i></span>
            </div>
        </div>
    </div>

)
export default AudioPlay;