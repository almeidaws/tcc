import React from 'react';
import R from '../js/Requisition.js';

const favorite = musicID => {
    R.addFavorite(musicID, () => {
        console.log('Successfully added');
        //DOES NOTHING
    }, statusCode => {
        //DOES NOTHING
    });
};

const unfavorite = musicID => {
    R.removeFavorite(musicID, () => {
        console.log('Successfully removed');
        //DOES NOTHING
    }, statusCode => {
        //DOES NOTHING
    });
};

const handleFavorite = props => {
    if (props.music.favorited === false) {
        favorite(props.music.id);
        props.changeFavorite(props.music, true);
    } else if (props.music.favorited === true) {
        unfavorite(props.music.id);
        props.changeFavorite(props.music, false);
    } else 
        $('#myModal').modal('show');
};

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
                            <li><a href="javascript:;" onClick={() => handleFavorite(props)}><span className="opt_icon"><span
                                className="icon icon_fav"/></span>{props.music.favorited ? 'Remove Favourite' : 'Add To Favourites'}</a></li>
                        </ul>
                        <div className="ms_play_icon" onClick={() => props.onPlayPause(props.music)}>
                            <img src={`./images/svg/${props.paused ? 'play.svg' : 'pause.svg'}`} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="ms_rcnt_box_text">
                    <h3><a href="javascript:;">{props.music.name}</a></h3>
                    <p>{props.music.authors[0].name}</p>
                </div>
            </div>
        </div>
    );
};
export default Music;
