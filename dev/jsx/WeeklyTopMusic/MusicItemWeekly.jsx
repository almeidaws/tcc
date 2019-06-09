import React from 'react';
import R from '../../js/Requisition.js';

const parseToTime = time => {
    const minutes = Math.floor(time % 3600 / 60);
    const seconds = Math.floor(time % 3600 % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
};

const favorite = musicID => {
    R.addFavorite(musicID, () => {
        console.log('Successfully added');
        //DOES NOTHING
    }, statusCode => {
        
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

const MusicItemWeekly = props => {

    return(
        <div className="col-lg-4 col-md-12 padding_right40">
            <div className="ms_weekly_box">
                <div className="weekly_left">
                            <span className="w_top_no">
                                {props.count < 10 ? `0${props.count}` : props.count}
                            </span>
                    <div className="w_top_song">
                        <div className="w_tp_song_img">
                            <img src={props.music.posterURL ? props.music.posterURL : './images/weekly/song1.jpg'}
                                 alt="" className="img-fluid"/>
                            <div className="ms_song_overlay">
                            </div>
                            <div className="ms_play_icon" onClick={() => props.onPlayPause(props.music)}>
                                <img src={`./images/svg/${props.paused ? 'play.svg' : 'pause.svg'}`} alt=""/>
                            </div>
                        </div>
                        <div className="w_tp_song_name">
                            <h3><a href="#">{props.music.name}</a></h3>
                            <p>{props.music.authors[0].name}</p>
                        </div>
                    </div>
                </div>
                <div className="weekly_right">
                    <span className="w_song_time">{parseToTime(props.music.duration)}</span>
                    <span className="ms_more_icon" data-other="1">
                        <img src="./images/svg/more.svg" alt=""/>
                    </span>
                </div>
                <ul className="more_option">
                    <li><a href="javascript:;" onClick={() => handleFavorite(props)}><span className="opt_icon"><span
                        className="icon icon_fav"/></span>{props.music.favorited ? 'Remove Favourite' : 'Add To Favourites'}</a></li>
                </ul>
            </div>
        </div>
    );
};

export default MusicItemWeekly;
