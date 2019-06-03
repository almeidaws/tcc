import React from 'react';
import RecentlyPlayedMusic from '../RecentlyPlayed/RecentlyPlayedMusic.jsx';
import Header from '../Header.jsx';
import R from '../../js/Requisition.js';

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
            <ul className={props.paused === false ? "play_active_song" : ""}>
                <li onClick={() => props.onPlayPause(props.music)}><a href="javascript:;"><span className="play_no">{props.number}</span><span className="play_hover"></span></a></li>
                <li><a href="javascript:;">{props.music.name}</a></li>
                <li className="text-center"><a href="javascript:;">{props.music.authors[0].name}</a></li>
                <li className="text-center"><a href="javascript:;">{props.music.duration ? parseToTime(props.music.duration) : "0:00"}</a></li>
                <li className="text-center"><a href="javascript:;" onClick={() => props.removeFavorite(props.music)}><span className="ms_close">
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
                                        paused={props.pausedMusic.music ? music.id !== props.pausedMusic.music.id : true}
                                        removeFavorite={props.removeFavorite} />
                        })}
					</div>
				</div>
            </div>
        )
};

class Favourites extends React.Component {
    constructor(props) {
        super(props);
        this.state = { favoritedMusics: [] };
        this.removeFavorite = this.removeFavorite.bind(this);
        this.changeFavorite = this.changeFavorite.bind(this);
        this.requestFavoritedMusics();
    }

    requestFavoritedMusics() {
        R.favoritedMusics(musics => {
            this.setState({ favoritedMusics: musics });
        }, errorCode => {
            console.log(errorCode);
        });
    }

    removeFavorite(music) {
        R.removeFavorite(music.id, () => {
            this.setState(state => {
                return { favoritedMusics: state.favoritedMusics.filter(m => m.id !== music.id) };
            });
        }, errorCode => {
            console.log(errorCode);
        });
    }

    changeFavorite(music, favorited) {
        if (favorited) {
            const favoriteds = this.state.favoritedMusics;
            favoriteds.push(music);
            this.setState({ favoritedMusics: favoriteds });
        } else {
            const favoriteds = this.state.favoritedMusics.filter(m => m.id !== music.id);
            this.setState({ favoritedMusics: favoriteds });
        }
        this.props.changeFavorite(music, favorited);
    }

    render() {
        return (
            <div className="ms_content_wrapper padder_top80">
                <Header />
                <FavouritesList 
                    musics={this.state.favoritedMusics}
                    onPlayPause={this.props.onPlayPause}
                    pausedMusic={this.props.pausedMusic}
                    removeFavorite={this.removeFavorite} />
                <RecentlyPlayedMusic
                    pausedMusic={this.props.pausedMusic}
                    musics={this.props.musics} 
                    onPlayPause={this.props.onPlayPause}
                    changeFavorite={this.changeFavorite} />
            </div>
        )
    }
};

export default Favourites;
