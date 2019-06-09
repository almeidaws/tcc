import React from 'react';
import Music from '../Music.jsx';
import R from '../../js/Requisition.js';

class RecentlyPlayedMusic extends React.Component {
    constructor(props) {
        super(props);
        this.state = { lastListenedMusics: [] };
        this.requestLastListenedMusics();
    }
    
    requestLastListenedMusics() {
        R.lastListenedMusics(musics => {
            const ids = musics.map(music => music.id);
            const uniqueMusics = musics.filter((music, i) => {
                console.log(ids.indexOf(music.id) + ", " + i);
                return ids.indexOf(music.id) >= i;
            });

            console.log(uniqueMusics);
            this.setState({ lastListenedMusics: uniqueMusics });
        }, errorCode => {
            console.log(errorCode);
        });
    }

    render() {
        if (!this.props.musics) return null;
        if (this.props.musics.length === 0) return null;

        const musics = [];
        this.state.lastListenedMusics.map(music => {
            musics.push(<Music key={music.id}
                               paused={this.props.pausedMusic.music ? music.id !== this.props.pausedMusic.music.id : true}
                               music={music}
                               onPlayPause={this.props.onPlayPause}
                               changeFavorite={this.props.changeFavorite} />
           );
        });

        return(
            <div className="ms_weekly_wrapper">
                <div className="ms_rcnt_slider">
                    <div className="ms_heading">
                        <h1>{this.props.title}</h1>
                    </div>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {musics}
                        </div>
                    </div>
                    <div className="swiper-button-next slider_nav_next"></div>
                    <div className="swiper-button-prev slider_nav_prev"></div>
                </div>
            </div>
        );
    }
};
export default RecentlyPlayedMusic;
