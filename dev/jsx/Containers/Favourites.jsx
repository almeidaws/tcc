import React from 'react';
import RecentlyPlayedMusic from '../RecentlyPlayed/RecentlyPlayedMusic.jsx';
import Header from '../Header.jsx';

const ListHeader = props => {
    return (
            <ul className="album_list_name">
                <li>#</li>
                <li>Song Title</li>
                <li className="text-center">Author</li>
                <li className="text-center">Duration</li>
                <li className="text-center">remove</li>
            </ul>
     )
};

const Row = props => {
    return (
            <ul className={props.active ? "play_active_song" : ""}>
                <li><a href="#"><span className="play_no">{props.number}</span><span className="play_hover"></span></a></li>
                <li><a href="#">{props.songTitle}</a></li>
                <li className="text-center"><a href="#">{props.duration}</a></li>
                <li className="text-center"><a href="#"><span className="ms_icon1 ms_fav_icon"></span></a></li>
                <li className="text-center"><a href="#"><span className="ms_close">
                        <img src="images/svg/close.svg" alt="" /></span></a></li>
            </ul>
     );
};

const FavouritesList = props => {
    return (
            <div className="ms_free_download ms_purchase_wrapper">
                <div className="ms_heading">
                    <h1>Your Favourites</h1>
                </div>
				<div className="album_inner_list">
					<div className="album_list_wrapper">
						<ListHeader />
                        <Row active={true} number="01" songTitle="Bloodlust" duration="5:25" />
                        <Row number="01" songTitle="Bloodlust" duration="5:25" />
                        <Row number="02" songTitle="Bloodlust" duration="5:25" />
                        <Row number="03" songTitle="Bloodlust" duration="5:25" />
                        <Row number="04" songTitle="Bloodlust" duration="5:25" />
                        <Row number="05" songTitle="Bloodlust" duration="5:25" />
					</div>
				</div>
            </div>
        )
};

const Favourites = props => {
    return (
        <div className="ms_content_wrapper padder_top80">
            <Header />
            <FavouritesList />
            <RecentlyPlayedMusic
                paused={props.paused} 
                musics={props.musics} 
                playPause={props.onPlayPauseMusic} 
                play={props.onPlay} />
        </div>
    )
};

export default Favourites;
