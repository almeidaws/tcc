import React from 'react';
import Button from './Button.jsx';
import Selector from './Selector.jsx';
import Image from './Image.jsx';

class AudioPlayerBar extends React.Component {
    
    render() {
        return (
            <div className="ms_player_wrapper">
                <div className="ms_player_close">
				    <i className="fa fa-angle-up" aria-hidden="true"></i>
			    </div>
                <div className="player_mid"></div>
                <div className="audio-player">
                    <div id="jquery_jplayer_1" className="jp-jplayer"></div>
                    <div id="jp_container_1" className="jp-audio" role="application" aria-label="media player">
                    <div className="player_left">
                    <div className="ms_play_song">
                        <div className="play_song_name">
                            <a href="javascript:void(0);" id="playlist-text">
                                <div className="jp-now-playing flex-item">
                                    <div className="jp-track-name"></div>
                                    <div className="jp-artist-name"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="play_song_options">
                        <ul>
                            <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_fav"></i></span>Add To Favourites</a></li>
                            <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_playlist"></i></span>Add To Playlist</a></li>
                        </ul>
                    </div>
                    <span className="play-left-arrow"><i className="fa fa-angle-right" aria-hidden="true"></i></span>
                </div>
                            </div>
                            <div className="jp-type-playlist">
                                <div className="jp-gui jp-interface flex-wrap">
                                    <div className="jp-controls flex-item">
                                        <Button className="jp-previous"/>
                                        <Button className="jp-play"/>
                                        <Button className="jp-next"/>
                                    </div>
                                    <div className="jp-progress-container flex-item">
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
                                    <div className="jp-volume-controls flex-item">
                                        <div className="widget knob-container">
                                            <div className="knob-wrapper-outer">
                                                <div className="knob-wrapper">
                                                    <div className="knob-mask">
                                                        <div className="knob d3"><span></span></div>
                                                        <div className="handle"></div>
                                                        <Image src="images/svg/volume.svg" alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="jp-toggles flex-item">
                                        <Button className="jp-shuffle" title="Shuffle">
                                            <i className="ms_play_control"></i>
                                        </Button>
                                        <Button className="jp-repeat" title="Repeat">
                                            <i className="ms_play_control"></i>
                                        </Button>
                                    </div>
                                    <Selector/>
                                </div>
                            </div>
                        </div>
                </div>
        );
    }
}
export default AudioPlayerBar;