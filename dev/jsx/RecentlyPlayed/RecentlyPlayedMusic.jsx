import React from 'react';
import Music from '../Music.jsx';
import R from '../../js/Requisition.js';
const uuidv4 = require('uuid/v4');

class RecentlyPlayedMusic extends React.Component {
    constructor(props) {
        super(props);
        this.state = { lastListenedMusics: [] };
        if (props.musics && props.musics.length > 0) {
            this.state = { lastListenedMusics: this.props.musics, uuid: uuidv4() };
            this.installSlider();
        } else {
            this.requestLastListenedMusics();
        }
    }
    
    requestLastListenedMusics() {
        R.lastListenedMusics(musics => {
            const ids = musics.map(music => music.id);
            const uniqueMusics = musics.filter((music, i) => {
                return ids.indexOf(music.id) >= i;
            });
            this.setState({ lastListenedMusics: uniqueMusics }, () => {
                this.installSlider();
            });
        }, errorCode => {
            // DOES NOTHING
            console.log(errorCode);
        });
    }

    installSlider() {
        var swiper = new Swiper('.swiper-container', {
                slidesPerView: 6,
                spaceBetween: 30,
                loop: true,
                speed: 1500,
                navigation: {
                    nextEl: `.${this.state.uuid}`,
                    prevEl: `.${this.state.uuid}`,
                },
                breakpoints: {
                    1800: {
                        slidesPerView: 4,
                    },
                    1400: {
                        slidesPerView: 4,
                    },
                    992: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 15,
                    },
                    480: {
                        slidesPerView: 1,
                    },
                    375: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    }
                },
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

       return (
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
                    <div className={"swiper-button-next slider_nav_next " + this.state.uuid}></div>
                    <div className={"swiper-button-prev slider_nav_prev " + this.state.uuid}></div>
                </div>
            </div>
        );
    }
};
export default RecentlyPlayedMusic;
