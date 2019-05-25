import React from 'react';

const Music = props => {
    return (
        <div className="swiper-slide">
            <div className="ms_rcnt_box">
                <div className="ms_rcnt_box_img">
                    <img src={props.music.posterURL ? props.music.posterURL :"./images/music/r_music1.jpg"} alt=""/>
                    <div className="ms_main_overlay">
                        <div className="ms_box_overlay"/>
                        <div className="ms_more_icon">
                            <img src={"./images/svg/more.svg"} alt=""/>
                        </div>
                        <ul className="more_option">
                            <li><a href="#"><span className="opt_icon"><span
                                className="icon icon_fav"/></span>Add To Favourites</a></li>
                            <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"/></span>Add
                                To Queue</a></li>
                            <li><a href="#"><span className="opt_icon"><span
                                className="icon icon_playlst"/></span>Add To Playlist</a></li>
                        </ul>
                        <div className="ms_play_icon" onClick={() => props.onPlayPause(props.music)}>
                            <img src={`./images/svg/${props.paused ? 'play.svg' : 'pause.svg'}`} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="ms_rcnt_box_text">
                    <h3><a href="#">{props.music.name}</a></h3>
                    <p>{props.music.authors[0].name}</p>
                </div>
            </div>
        </div>
    );
};
export default Music;
