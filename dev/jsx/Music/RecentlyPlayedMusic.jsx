import React, { Component } from 'react';
import Music from './Music.jsx';
import R from '../../js/Requisition';

export default class RecentlyPlayedMusic extends Component {

    constructor() {
        super(props);

        this.setState({musics: R.getAllMusics()});
    }

    render() {
        const musics = [];
        this.state.musics.map((music) => {
            musics.push(<Music musicName={music.name} musicArtist={'Renan Alves'}/>);
        });

        return(
            <div className="ms_weekly_wrapper">
                <div className="ms_rcnt_slider">
                    <div className="ms_heading">
                        <h1>Recently Played</h1>
                        <span className="veiw_all"><a href="#">view more</a></span>
                    </div>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {musics.map((music) => {return music})}
                        </div>
                    </div>
                    <div className="swiper-button-next slider_nav_next"></div>
                    <div className="swiper-button-prev slider_nav_prev"></div>
                </div>
            </div>
        );
    }

}