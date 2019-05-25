import React from 'react';
import RecentlyPlayedMusic from '../RecentlyPlayed/RecentlyPlayedMusic.jsx';
import Header from '../Header.jsx';

const parseToTime = time => {
    const minutes = Math.floor(time % 3600 / 60);
    const seconds = Math.floor(time % 3600 % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
};

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
            <ul className={props.paused === false ? "play_active_song" : ""}
                onClick={() => props.onPlayPause(props.music)} >
                <li><a href="javascript:;"><span className="play_no">{props.number}</span><span className="play_hover"></span></a></li>
                <li><a href="javascript:;">{props.music.name}</a></li>
                <li className="text-center"><a href="javascript:;">{props.music.authors[0].name}</a></li>
                <li className="text-center"><a href="javascript:;">{props.music.duration ? parseToTime(props.music.duration) : "0:00"}</a></li>
                <li className="text-center"><a href="javascript:;"><span className="ms_close">
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
                        { props.musics.map((music, index) => {
                            const number = index < 9 ? "0" + (index + 1) : "" + (index + 1);
                            return <Row number={number} 
                                        key={music.id}
                                        onPlayPause={props.onPlayPause}
                                        music={music} 
                                        paused={props.pausedMusic.music ? music.id !== props.pausedMusic.music.id : true}/>
                        })}
					</div>
				</div>
            </div>
        )
};

const Favourites = props => {
    return (
        <div className="ms_content_wrapper padder_top80">
            <Header />
            <FavouritesList 
                musics={props.musics}
                onPlayPause={props.onPlayPause}
                pausedMusic={props.pausedMusic} />
            <RecentlyPlayedMusic
                pausedMusic={props.pausedMusic}
                musics={props.musics} 
                onPlayPause={props.onPlayPause}/>
        </div>
    )
};

export default Favourites;
