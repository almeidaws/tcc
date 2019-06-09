import React from 'react';
import InfoMusicPlaying from './InfoMusicPlaying.jsx';
import R from '../../js/Requisition.js';

const favorite = musicID => {
    R.addFavorite(musicID, () => {
        console.log('Successfully added');
        //DOES NOTHING
    }, statusCode => {
        //DOES NOTHING
    });
};

const AudioPlay = props => (
    <div className={props.className}>
        <div id="jquery_jplayer_1" className="jp-jplayer"></div>
        <div id="jp_container_1" className="jp-audio" role="application" aria-label="media player">
            <div className="player_left">
                <InfoMusicPlaying className="ms_play_song"
                                  music={props.music}/>
                <div className="play_song_options">
                    <ul>
                        <li><a href="javascript:;" onClick={() => favorite(props.music.id)} ><span className="song_optn_icon"><i className="ms_icon icon_fav"></i></span>Add To Favourites</a></li>
                    </ul>
                </div>
                <span className="play-left-arrow"><i className="fa fa-angle-right" aria-hidden="true"></i></span>
            </div>
        </div>
    </div>

)
export default AudioPlay;
